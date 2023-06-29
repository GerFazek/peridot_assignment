# Specify the base image
FROM cypress/included:12.16.0

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY ./package.json ./package.json

# Install the project dependencies
RUN npm install

# Copy the rest of the project files to the container
COPY . .

# Set the custom entrypoint command
ENTRYPOINT ["npm", "run"]

# Run the Cypress tests by default
CMD ["test:$SCRIPT"]
