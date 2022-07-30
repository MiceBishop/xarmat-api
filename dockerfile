FROM node:12.18.1
WORKDIR /app
COPY ["package.json", "yarn-lock.json*", "./"]
RUN yarn
COPY . .
CMD ["yarn", "dev"]