# Base image for Node.js
FROM node:18-alpine AS base
WORKDIR /app

# ---------- FRONTEND BUILD ----------
FROM base AS frontend
COPY package*.json ./
COPY next.config.js jsconfig.json eslint.config.mjs ./
COPY components ./components
COPY pages ./pages
COPY public ./public
COPY styles ./styles
RUN npm install --omit=dev
RUN npm run build

# ---------- BACKEND BUILD ----------
FROM base AS backend
WORKDIR /app/backend
COPY backend/package*.json ./
COPY backend/server.js ./
COPY backend/.env ./          
RUN npm install --omit=dev

# ---------- FINAL STAGE ----------
FROM node:18-alpine AS final
WORKDIR /app

# Copy frontend build and assets
COPY --from=frontend /app/.next ./.next
COPY --from=frontend /app/public ./public
COPY --from=frontend /app/package*.json ./
COPY --from=frontend /app/next.config.js ./
COPY --from=frontend /app/jsconfig.json ./
COPY --from=frontend /app/components ./components
COPY --from=frontend /app/pages ./pages
COPY --from=frontend /app/styles ./styles

# Copy backend
COPY --from=backend /app/backend ./backend

# Install only frontend production deps
RUN npm install --omit=dev

# Expose frontend port
EXPOSE 3000
EXPOSE 5000

# Start both backend and frontend
CMD ["sh", "-c", "node backend/server.js & npm start"]
