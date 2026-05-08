const fs = require('fs');
const path = require('path');

const files = [
  'src/views/CreateBlog.tsx',
  'src/views/BlogPost.tsx',
  'src/views/BlogList.tsx',
  'src/components/ui/header.tsx',
  'src/app/sitemap.ts',
  'src/app/[lang]/community/page.tsx',
  'public/sitemap.xml'
];

for (const f of files) {
  const filePath = path.join(__dirname, f);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/\/blogs/g, '/community');
    content = content.replace(/'blogs'/g, "'community'");
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated ' + f);
  }
}
