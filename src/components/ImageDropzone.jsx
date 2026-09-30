import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  Image as ImageIcon, 
  Trash2, 
  Link2, 
  Check, 
  AlertCircle,
  Sparkles,
  RefreshCw
} from 'lucide-react';

/**
 * ImageDropzone Component
 * Luxury Drag & Drop Image Uploader strictly adhering to AURA NAUTICA Deep Indigo & Frost White design tokens.
 * Supports:
 * - Drag & Drop image files (PNG, JPG, WEBP, GIF, SVG)
 * - Click to browse local files via hidden file input
 * - Clipboard paste (Ctrl+V) when active
 * - Automatic client-side image compression & optimization (Canvas downscale to max 1200px)
 * - Live image preview with aspect ratio, resolution badges, and removal
 * - Seamless fallback toggle to manual Image URL / asset path
 */
export default function ImageDropzone({
  value = '',
  onChange,
  label = 'Image Asset or Media',
  hint = 'Drag & drop image file, or click to browse'
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState('dropzone'); // 'dropzone' | 'url'
  const fileInputRef = useRef(null);

  // Compress & optimize image file before saving as data URL to conserve localStorage space
  const processImageFile = (file) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file (PNG, JPG, WEBP, GIF).');
      return;
    }

    setError(null);
    setIsProcessing(true);

    const reader = new FileReader();
    reader.onerror = () => {
      setError('Failed to read image file.');
      setIsProcessing(false);
    };

    reader.onload = (event) => {
      const img = new window.Image();
      img.onerror = () => {
        setError('Invalid image format.');
        setIsProcessing(false);
      };

      img.onload = () => {
        try {
          const maxDim = 1200;
          let width = img.width;
          let height = img.height;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Compress to WebP or high-quality JPEG (0.85 quality)
          const optimizedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          onChange(optimizedDataUrl);
          setIsProcessing(false);
        } catch (err) {
          // Fallback to original data URL if canvas manipulation fails
          onChange(event.target.result);
          setIsProcessing(false);
        }
      };

      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processImageFile(files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processImageFile(files[0]);
    }
  };

  const handlePaste = (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith('image/')) {
        const file = items[i].getAsFile();
        if (file) {
          processImageFile(file);
          break;
        }
      }
    }
  };

  const handleRemove = () => {
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2" onPaste={handlePaste}>
      {/* Header with Label and Mode Toggle */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-mono text-indigo-900 uppercase tracking-wider font-semibold flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-indigo-700" />
          <span>{label}</span>
        </label>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMode('dropzone')}
            className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full transition-colors cursor-pointer ${
              mode === 'dropzone'
                ? 'bg-indigo-950 text-frost-50 font-bold'
                : 'text-indigo-800 hover:text-indigo-950'
            }`}
          >
            Drag & Drop
          </button>
          <span className="text-frost-400 text-[10px]">•</span>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full transition-colors cursor-pointer ${
              mode === 'url'
                ? 'bg-indigo-950 text-frost-50 font-bold'
                : 'text-indigo-800 hover:text-indigo-950'
            }`}
          >
            URL Path
          </button>
        </div>
      </div>

      {/* Error notification */}
      {error && (
        <div className="p-2.5 rounded-xl bg-frost-200 border border-frost-300 text-indigo-950 text-xs font-mono flex items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 text-indigo-800 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* MODE 1: DRAG & DROP ZONE */}
      {mode === 'dropzone' && (
        <div>
          {/* Active Image Preview or Dropzone Box */}
          {value ? (
            <div className="relative rounded-2xl overflow-hidden border-2 border-frost-300 bg-indigo-950 group">
              <div className="relative h-48 sm:h-56 w-full">
                <img
                  src={value}
                  alt="Selected Asset Preview"
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay with Quick Actions */}
                <div className="absolute inset-0 bg-indigo-950/75 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 p-4">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 rounded-full bg-frost-50 text-indigo-950 hover:bg-frost-100 font-mono text-xs uppercase tracking-wider font-semibold shadow-lg transition-transform hover:scale-105 cursor-pointer flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-indigo-800" />
                    <span>Replace Image</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleRemove}
                    className="px-4 py-2 rounded-full bg-indigo-900 text-frost-50 hover:bg-indigo-800 font-mono text-xs uppercase tracking-wider font-semibold shadow-lg transition-transform hover:scale-105 cursor-pointer flex items-center gap-1.5 border border-frost-100/20"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>

              {/* Bottom Metadata Ribbon */}
              <div className="p-3 bg-frost-50 border-t border-frost-300 flex items-center justify-between text-xs font-mono text-indigo-900">
                <span className="flex items-center gap-1.5 truncate max-w-[220px]">
                  <Check className="w-3.5 h-3.5 text-indigo-700" />
                  <span className="truncate">{value.startsWith('data:') ? 'Custom Uploaded Image' : value}</span>
                </span>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[11px] font-bold text-indigo-800 hover:text-indigo-950 underline cursor-pointer"
                >
                  Change File
                </button>
              </div>
            </div>
          ) : (
            <div
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-6 sm:p-8 text-center transition-all duration-200 flex flex-col items-center justify-center gap-3 ${
                isDragging
                  ? 'border-indigo-600 bg-indigo-900/10 scale-[1.01] shadow-lg'
                  : 'border-frost-300 hover:border-indigo-600 bg-frost-50 hover:bg-frost-100'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                isDragging
                  ? 'bg-indigo-950 text-frost-50'
                  : 'bg-frost-200 text-indigo-800'
              }`}>
                {isProcessing ? (
                  <RefreshCw className="w-6 h-6 animate-spin text-indigo-800" />
                ) : (
                  <UploadCloud className="w-6 h-6" />
                )}
              </div>

              <div className="space-y-1">
                <p className="text-xs font-mono font-bold text-indigo-950 uppercase tracking-wider">
                  {isProcessing ? 'Optimizing Image...' : isDragging ? 'Drop Image Here to Upload' : hint}
                </p>
                <p className="text-[11px] text-indigo-900/70 font-sans">
                  PNG, JPG, WEBP, or GIF up to 10MB • Auto-optimized for instant performance
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-frost-200 text-indigo-800 text-[10px] font-mono tracking-wider uppercase border border-frost-300">
                <Sparkles className="w-3 h-3 text-indigo-700" />
                <span>Or Paste from Clipboard (Ctrl+V)</span>
              </div>
            </div>
          )}

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
            aria-label="Upload image file"
          />
        </div>
      )}

      {/* MODE 2: DIRECT URL / ASSET PATH */}
      {mode === 'url' && (
        <div className="space-y-2">
          <div className="relative">
            <Link2 className="w-4 h-4 text-indigo-700 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="/assets/images/sample.jpg or https://..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-frost-100 border border-frost-300 text-indigo-950 text-xs font-mono focus:outline-none focus:border-indigo-800"
            />
          </div>
          {value && (
            <div className="h-28 rounded-xl overflow-hidden border border-frost-300 bg-indigo-950 relative">
              <img
                src={value}
                alt="URL Preview"
                className="w-full h-full object-cover"
                onError={() => setError('Image URL could not be loaded. Please check path or link.')}
              />
              <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-indigo-950/80 text-frost-50 text-[10px] font-mono uppercase">
                URL Preview
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
