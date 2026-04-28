# SOVRA Agent Node Dockerfile (v1.0)
FROM node:20-slim

WORKDIR /app

# Install basic dependencies
RUN apt-get update && apt-get install -y \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy the rest of the application
COPY . .

# Set a non-root user for security (0.01% Standard)
RUN useradd -m sovereign
USER sovereign

# Default command - will be overridden by docker-compose
CMD ["npm", "run", "agent:start"]
