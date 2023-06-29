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

# Set the value of the SCRIPT environment variable using ARG with a default value
ARG SCRIPT=default

# Run the Cypress tests with the provided script as the environment variable
CMD ["npm", "run", "test:$SCRIPT"]
