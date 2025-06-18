# FROM node:20-alpine
# WORKDIR /app
# COPY package.json yarn.lock ./
# RUN yarn install --frozen-lockfile
# COPY . .
# RUN yarn build
# EXPOSE 6006
# CMD ["yarn", "storybook"]


# Stage 1: Install dependencies
FROM node:20-alpine AS builder
WORKDIR /app

# Enable Yarn Berry (modern Yarn)
RUN corepack enable && corepack prepare yarn@stable --activate

# Copy only lock files first for caching
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn

# Install dependencies
RUN yarn install --immutable

# Stage 2: Production image
FROM node:20-alpine
WORKDIR /app

# Copy installed dependencies
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.yarn ./.yarn
COPY . .

# Set non-root user
RUN chown -R node:node /app
USER node

EXPOSE 6006
CMD ["yarn", "storybook"]