const gzipAll = require('gzip-all');

gzipAll('**/dist/website/**/*.js').then(newFiles => {
  console.log('yay, created', newFiles.length, 'compressed files!')
})
