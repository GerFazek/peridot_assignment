# Specify the base image
FROM cypress/included:8.7.0

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package.json package-lock.json ./

# Install the project dependencies
RUN npm ci

# Copy the rest of the project files to the container
COPY . .

# Run the Cypress tests
CMD ["npm", "run", "test:banking"]