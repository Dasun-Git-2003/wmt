FROM node:18-alpine AS backend-builder

WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend . .

FROM node:18-alpine AS frontend-builder

WORKDIR /app/frontend
COPY frontend/vite-project/package*.json ./
RUN npm install
COPY frontend/vite-project . .
RUN npm run build

FROM node:18-alpine

WORKDIR /app

# Copy backend
COPY --from=backend-builder /app/backend ./backend
WORKDIR /app/backend

# Copy frontend build to backend public folder
COPY --from=frontend-builder /app/frontend/dist ./public

EXPOSE 5000

CMD ["npm", "start"]
