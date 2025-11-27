# ✅ CORRECTION : Image Alpine plus légère et récente
FROM node:18-alpine

WORKDIR /app

COPY src/package*.json ./
# Installation propre
RUN npm install --production

COPY src/ ./

# ✅ CORRECTION : On n'utilise PAS l'utilisateur root
RUN addgroup -S nodejs && adduser -S nodejs -G nodejs
USER nodejs

EXPOSE 3000
CMD ["node", "server.js"]