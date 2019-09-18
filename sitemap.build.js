const builder = require('xmlbuilder');
const fs = require('fs');
const data = require('./resources/sitemap');
const lastmod = new Date().toLocaleDateString();

if(data.entries && data.entries.length) {
  generateSitemapIndex();
  data.entries.forEach((entry) => {
    generateSitemap(`/${entry}`, `sitemap-${entry}.xml`)
  });
} else {
  generateSitemap('', 'sitemap.xml')
}

function generateSitemapIndex() {
  const sitemapIndex = builder.create('sitemapindex')
    .att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');
  data.entries.forEach((entry) => {
    const sitemap = sitemapIndex.ele('sitemap');
    sitemap.ele('loc').txt(`${data.root}/sitemap-${entry}.xml`);
    sitemap.ele('lastmod').txt(lastmod);
  })
  writeXml(`${data.dist}/sitemap.xml`, sitemapIndex);
}

function generateSitemap(entry, filename) {
  const sitemap = builder.create('urlset')
    .att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9')
    .att('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance')
    .att('xsi:schemaLocation', 'http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd');
  data.routes.forEach((route) => {
    const url = sitemap.ele('url');
    url.ele('loc').txt(`${data.root}${entry}${route}`);
    url.ele('lastmod').txt(lastmod);
  });
  writeXml(`${data.dist}/${filename}`, sitemap);
}

function writeXml(path, doc) {
  fs.writeFile(path, doc.end({pretty: true}).toString(), function (err){
    if (err) throw err;
    console.log(`file : ${path} has been generated`);
  });
}
