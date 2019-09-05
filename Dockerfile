# specify the node base image with your desired version node:<version>
FROM node:10
# replace this with your application's default port
EXPOSE 80

COPY /dist /dist
COPY /resources/sitemap.xml /dist/website
COPY /resources/sitemap-en-us.xml /dist/website
COPY /resources/sitemap-fr-fr.xml /dist/website

CMD [ "node", "dist/server.js" ]


