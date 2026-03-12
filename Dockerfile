# multi-stage build for Vite-powered Vue app

# 1. build stage
FROM node:18-alpine AS builder
WORKDIR /app

# install deps first so we can leverage layer cache
COPY package*.json ./
RUN npm ci

# copy rest of the source and build
COPY . .
# if you rely on a `.env` file, make sure it is present before building
# (it should be copied by the user prior to running `docker build`)
RUN npm run build

# 2. production stage
FROM nginx:stable-alpine
# copy built assets from previous stage
COPY --from=builder /app/dist /usr/share/nginx/html

# default nginx listens on 80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
