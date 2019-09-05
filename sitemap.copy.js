const fs = require('fs');

const resources = ['sitemap.xml', 'sitemap-en-us.xml', 'sitemap-fr-fr.xml'];
for(let resource of resources) {
  fs.copyFile(`resources/${resource}`, `dist/${resource}`, (err) => {
    if (err) throw err;
    console.log(`resources/${resource} was copied to dist/${resource}`);
  });
}
