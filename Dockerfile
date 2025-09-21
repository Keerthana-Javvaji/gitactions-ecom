# Use Node.js 20 as the base image
FROM node:20

# Set working directory inside the container
WORKDIR /docker

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files into the container
COPY . .

# Expose the port Vite dev server will run on
EXPOSE 5173

# Start the Vite development server with host access
CMD ["npm", "run", "dev", "--", "--host", "--port", "5173"]
