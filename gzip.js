const gzipAll = require('gzip-all');

gzipAll('**/dist/**/*.js').then(newFiles => {
  console.log('yay, created', newFiles.length, 'compressed files!')
})
