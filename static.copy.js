const fs = require('fs');

const resources = ['googlea7f29c4e268b216e.html'];
for(let resource of resources) {
  fs.copyFile(`resources/${resource}`, `dist/website/${resource}`, (err) => {
    if (err) throw err;
    console.log(`resources/${resource} was copied to dist/website/${resource}`);
  });
}
