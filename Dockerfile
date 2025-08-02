# Use an official Node.js image as the base
FROM node:20

# Set the working directory to /app
WORKDIR /app

# Copy the package.json file into the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the application code into the container
COPY . .

# Expose the port that the API will listen on
EXPOSE 3000

# Run the command to start the API when the container is launched
CMD ["npm", "start"]