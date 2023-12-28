# Use the latest foundry image
FROM ghcr.io/foundry-rs/foundry

# set working directory
WORKDIR /app

# install nodejs and npm
RUN apk add nodejs npm git

# install npm dependencies
COPY package.json package-lock.json .
RUN npm install

# run typescript build
COPY tsconfig.json .
COPY .env .
COPY ./src ./src
COPY ./test ./test
RUN npm run build

# run the script
ENTRYPOINT ["npm", "run", "test"]
