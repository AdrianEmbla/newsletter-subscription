FROM node:20-alpine AS build
WORKDIR /app
COPY package.json*.json ./
RUN npm ci
COPY . .
RUN npx vite build

FROM node:20-alpine
WORKDIR /app
COPY package.json*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
RUN mkdir -p data
EXPOSE 3000
CMD ["node", "server/index.js"]
