# Specify the base image
FROM cypress/included:12.16.0

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY ./package.json ./package-lock.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the project files to the container
COPY . .

# Set the value of the SCRIPT environment variable using ARG with a default value
ENV SCRIPT=$SCRIPT

# Create a custom entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Set the custom entrypoint
ENTRYPOINT ["docker-entrypoint.sh"]
