FROM node:10 as builder

WORKDIR /tmp

COPY . /tmp
RUN npm install @angular/cli && npm install && npm run build:ssr && npm run copy:static && npm run build:sitemap

FROM node:10

EXPOSE 80

COPY --from=builder /tmp/dist /dist
COPY --from=builder /tmp/resources/sitemap.xml /dist/website
COPY --from=builder /tmp/resources/sitemap-en-us.xml /dist/website
COPY --from=builder /tmp/resources/sitemap-fr-fr.xml /dist/website
COPY --from=builder /tmp/resources/googlea7f29c4e268b216e.html /dist/website

CMD [ "node", "dist/server.js" ]


