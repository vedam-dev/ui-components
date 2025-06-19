# Stage 1: Build environment
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first for better caching
COPY package.json yarn.lock ./

# Install dependencies (without running postinstall scripts)
RUN yarn install --frozen-lockfile --ignore-scripts

# Copy all source files
COPY . .

# Explicitly run the build
RUN yarn build

# Install husky (if needed)
RUN yarn husky install

# Build Storybook
RUN yarn build-storybook

# Expose the Storybook port
EXPOSE 6006

# Command to run Storybook (serving the built version)
CMD ["yarn", "storybook -no-open"]