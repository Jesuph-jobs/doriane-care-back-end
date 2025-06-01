FROM node:22.11.0-slim

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN npm install -g pnpm@8.6.0
RUN pnpm config set store-dir /usr/src/app/.pnpm-store
# Copy pnpm-lock.yaml
COPY pnpm-lock.yaml ./
# Install pnpm dependencies
RUN pnpm install --frozen-lockfile
# Copy the rest of the application code

# Bundle app source
COPY . .

# Build the TypeScript files
RUN pnpm build

# Expose port 8000
EXPOSE 8000

# Start the app
CMD pnpm start
