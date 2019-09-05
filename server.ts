// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import {enableProdMode} from '@angular/core';

import * as express from 'express';
import compression from 'compression';
import {join} from 'path';
// Express Engine
import {ngExpressEngine} from '@nguniversal/express-engine';
// Import module map for lazy loading
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

const app = express();
app.use(compression())
const PORT = process.env.PORT || 80;
const DIST_FOLDER = join(process.cwd(), 'dist');
const routes = [
  {path: '/fr-fr/*', view: 'fr-fr/index', bundle: require('./dist/server/fr-fr/main')},
  {path: '/en-us/*', view: 'en-us/index', bundle: require('./dist/server/en-us/main')},
  {path: '/*', view: 'en-us/index', bundle: require('./dist/server/en-us/main')},
];

// Load your engine
app.engine('html', (filePath, options, callback) => {
  options.engine(
    filePath,
    {req: options.req, res: options.res},
    callback
  );
});

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'website'));

app.get('*.*', express.static(join(DIST_FOLDER, 'website')));
routes.forEach((route) => {
  app.get(route.path, (req, res) => {
    res.render(route.view, {
      req, res, engine: ngExpressEngine({
        bootstrap: route.bundle.AppServerModuleNgFactory,
        providers: [provideModuleMap(route.bundle.LAZY_MODULE_MAP)]
      })
    });
  });
});

app.listen(PORT, () => {
  console.log(`Node server listening on port ${PORT}`);
});
