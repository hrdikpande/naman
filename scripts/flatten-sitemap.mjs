import fs from 'fs';
import path from 'path';

const dist = path.join(process.cwd(), 'dist');
const sitemap0 = path.join(dist, 'sitemap-0.xml');
const sitemap = path.join(dist, 'sitemap.xml');
const sitemapIndex = path.join(dist, 'sitemap-index.xml');
const robots = path.join(dist, 'robots.txt');

// Move sitemap-0.xml to sitemap.xml and delete the index
if (fs.existsSync(sitemap0)) {
  fs.renameSync(sitemap0, sitemap);
  if (fs.existsSync(sitemapIndex)) {
    fs.unlinkSync(sitemapIndex);
  }
}

// Ensure the robots.txt points to the flat sitemap.xml in the built output
if (fs.existsSync(robots)) {
  let content = fs.readFileSync(robots, 'utf-8');
  content = content.replace('sitemap-index.xml', 'sitemap.xml');
  fs.writeFileSync(robots, content);
}

console.log('✅ Sitemap successfully flattened to sitemap.xml!');
