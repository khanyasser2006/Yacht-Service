const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Production ZIP generator: produces a clean zip well under 50MB
const projectDir = path.resolve(__dirname, '..');
const zipOutputPath = path.join(projectDir, 'Yacht-Services-Bundle.zip');

if (fs.existsSync(zipOutputPath)) {
  fs.unlinkSync(zipOutputPath);
}

console.log('Packaging project into production ZIP archive...');

const psScript = `
$exclude = @('node_modules', 'dist', '.git', 'scratch', 'Yacht-Services-Bundle.zip', '*.log');
$files = Get-ChildItem -Path '${projectDir}' -Exclude $exclude | Where-Object { $_.Name -notin $exclude };
Compress-Archive -Path $files.FullName -DestinationPath '${zipOutputPath}' -CompressionLevel Optimal -Force;
`;

try {
  execSync(`powershell -NoProfile -Command "${psScript.replace(/\n/g, ' ')}"`, { stdio: 'inherit' });
  if (fs.existsSync(zipOutputPath)) {
    const stat = fs.statSync(zipOutputPath);
    const sizeMB = (stat.size / (1024 * 1024)).toFixed(2);
    console.log(`\n========================================`);
    console.log(`ZIP CREATED SUCCESSFULLY!`);
    console.log(`Destination: ${zipOutputPath}`);
    console.log(`Total Size: ${sizeMB} MB (Target: < 50MB)`);
    console.log(`Status: ${sizeMB < 50 ? 'PASSED (STRICT COMPLIANCE)' : 'FAILED'}`);
    console.log(`========================================\n`);
  }
} catch (err) {
  console.error('Packaging error:', err.message);
}
