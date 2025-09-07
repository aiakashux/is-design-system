const fs = require('fs');
const path = require('path');

// Convert JSON tokens to SCSS variables
function buildTokens() {
  const tokensDir = __dirname;
  const scssDir = path.join(__dirname, '../scss/tokens');
  
  // Ensure output directory exists
  if (!fs.existsSync(scssDir)) {
    fs.mkdirSync(scssDir, { recursive: true });
  }
  
  // Process each token file
  ['colors', 'typography', 'spacing'].forEach(tokenType => {
    const tokenFile = path.join(tokensDir, `${tokenType}.json`);
    const scssFile = path.join(scssDir, `_${tokenType}.scss`);
    
    if (fs.existsSync(tokenFile)) {
      const tokens = JSON.parse(fs.readFileSync(tokenFile, 'utf8'));
      const scssContent = Object.entries(tokens)
        .map(([key, value]) => `$${tokenType}-${key}: ${value};`)
        .join('\n');
      
      fs.writeFileSync(scssFile, `// ${tokenType} tokens\n${scssContent}\n`);
    }
  });
  
  console.log('Tokens built successfully!');
}

buildTokens();