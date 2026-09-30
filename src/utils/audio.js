// Web Audio API Procedural Luxury Ocean & Hull Wash Ambient Synthesizer
class OceanAmbientSynthesizer {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.gainNode = null;
    this.noiseNode = null;
    this.filterNode = null;
    this.lfo = null;
    this.lfoGain = null;
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    this.ctx = new AudioContext();

    // Master Volume Gain
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.gainNode.connect(this.ctx.destination);

    // Pink / Brown Noise Buffer for Ocean Swell & Hull Wave Spray
    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5; // Gain compensation
    }

    this.noiseBuffer = noiseBuffer;
  }

  start() {
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) return;

    // Buffer Source
    this.noiseNode = this.ctx.createBufferSource();
    this.noiseNode.buffer = this.noiseBuffer;
    this.noiseNode.loop = true;

    // Low-pass filter for deep marine rumble
    this.filterNode = this.ctx.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.setValueAtTime(320, this.ctx.currentTime);
    this.filterNode.Q.setValueAtTime(3.0, this.ctx.currentTime);

    // LFO for rhythmic ocean surge & yacht wave breaks (approx 0.12 Hz = ~8s period)
    this.lfo = this.ctx.createOscillator();
    this.lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime);
    this.lfoGain = this.ctx.createGain();
    this.lfoGain.gain.setValueAtTime(180, this.ctx.currentTime);

    this.lfo.connect(this.lfoGain);
    this.lfoGain.connect(this.filterNode.frequency);

    this.noiseNode.connect(this.filterNode);
    this.filterNode.connect(this.gainNode);

    this.noiseNode.start();
    this.lfo.start();

    // Smooth fade in
    this.gainNode.gain.linearRampToValueAtTime(0.18, this.ctx.currentTime + 2.5);
    this.isPlaying = true;
  }

  stop() {
    if (!this.isPlaying || !this.ctx) return;
    this.gainNode.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 1.2);
    setTimeout(() => {
      try {
        if (this.noiseNode) {
          this.noiseNode.stop();
          this.noiseNode.disconnect();
        }
        if (this.lfo) {
          this.lfo.stop();
          this.lfo.disconnect();
        }
      } catch (e) {
        // ignore already stopped
      }
      this.isPlaying = false;
    }, 1300);
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }
}

export const oceanAudio = new OceanAmbientSynthesizer();
