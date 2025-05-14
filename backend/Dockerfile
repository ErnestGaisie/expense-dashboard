FROM node:18-alpine

# app directory
WORKDIR /app

# dependencies
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Expose port
EXPOSE 5000

# Start app
CMD ["npm", "run", "start"]
