# Specify the base image
FROM cypress/included:9.4.1

#we need to copy these files because the docker image is searching for the spec files there
COPY cypress/e2e cypress/integration
# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY ./package.json ./package.json

# Install the project dependencies
RUN npm install && npm ci

# Copy the rest of the project files to the container
COPY . .

# Run the Cypress tests
CMD ["npm", "run", "test:banking"]