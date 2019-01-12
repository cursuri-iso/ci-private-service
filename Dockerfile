FROM node:8-alpine as stage
WORKDIR /
ADD ["tsconfig.json", "package.json", "package-lock.json", "./"]
RUN npm i --silent --production
ADD src/ src/
RUN node_modules/.bin/tsc

FROM node:8-alpine
COPY --from=stage /bin/ /bin/
COPY --from=stage /node_modules/ /node_modules/
COPY --from=stage /package.json /
WORKDIR /
ENTRYPOINT [ "npm", "start" ]