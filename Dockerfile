# Stage 1: Build the Vite React Frontend
FROM node:22-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Set up the Express Backend
FROM node:22-alpine
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install --production
COPY backend/ ./

# Copy the built React app into the final image
WORKDIR /app
COPY --from=frontend-builder /app/frontend/dist /app/frontend/dist

# Expose the API and Web port
EXPOSE 3000

# Start the Node.js Express server
WORKDIR /app/backend
CMD ["node", "index.js"]
