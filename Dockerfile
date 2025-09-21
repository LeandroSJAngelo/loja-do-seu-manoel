# Estágio de build
FROM node:18-alpine AS builder
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Estágio de produção
FROM node:18-alpine
WORKDIR /usr/src/app

# Copia apenas o necessário para rodar
COPY package*.json ./
RUN npm install --only=production
COPY --from=builder /usr/src/app/dist ./dist

# Expõe a porta e define o comando de start
EXPOSE 3000
CMD ["node", "dist/main"]