const fs = require('fs');
const path = require('path');
const dir = 'c:\\Projects\\docourseonline\\src\\components\\sections';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx') && f !== 'hero.tsx');

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  if (content.includes('import { siteContent } from')) {
    content = content.replace(/import\s+\{\s*siteContent\s*\}\s+from\s+["']@\/content\/copy["'];/g, 'import { SiteContentType } from "@/content/copy";');
    
    // Convert filenames like qualifier-grid.tsx to QualifierGrid
    let compName = file.split('.')[0].split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
    
    if (compName === 'Faq') compName = 'Faq'; // etc
    
    const exportRegex = new RegExp(`export function ${compName}\\s*\\(\\s*\\)`);
    content = content.replace(exportRegex, `export function ${compName}({ content }: { content: SiteContentType })`);
    
    content = content.replace(/siteContent\./g, 'content.');
    
    fs.writeFileSync(filePath, content);
    console.log('Updated ' + file);
  }
}
