# @vedam-dev/ui-components

A comprehensive React component library built with Material-UI, featuring a Storybook showcase and visual regression testing with Loki.

## 🚀 Quick Start

### Prerequisites

- Node.js v20 or higher
- Yarn package manager
- Docker and Docker Compose (for containerized development)

### Local Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/vedam-dev/ui-components.git
   cd ui-components
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Start Storybook development server:
   ```bash
   yarn storybook
   ```

### Docker Setup

1. Build and run using Docker Compose:
   ```bash
   docker-compose up --build
   ```

This will start:
- Storybook server on port 6006
- Loki visual regression testing service on port 3100

## 🏗️ Project Structure

```
ui-components/
├── src/                    # Source code
│   ├── component/         # React components
│   │   ├── atom/         # Atomic components
│   │   ├── molecule/     # Molecular components
│   │   └── organism/     # Organism components
│   ├── stories/          # Storybook stories
│   ├── theme/            # Theme configurations
│   └── util/             # Utility functions
├── .storybook/           # Storybook configuration
├── test/                 # Test files
└── scripts/              # Build and utility scripts
```

## 📦 Available Scripts

- `yarn build`: Build the component library
- `yarn test`: Run Jest tests
- `yarn storybook`: Start Storybook development server
- `yarn build-storybook`: Build static Storybook site
- `yarn lint`: Run ESLint
- `yarn lint:fix`: Fix ESLint issues
- `yarn loki`: Run visual regression tests
- `yarn loki:update`: Update visual regression test references
- `yarn loki:approve`: Approve visual changes

## 🐳 Docker Configuration

The project includes a multi-stage Dockerfile that:
1. Builds the component library
2. Builds the Storybook static site
3. Serves the Storybook site using http-server

Docker Compose configuration includes:
- Storybook service with hot-reloading
- Loki service for visual regression testing

### Environment Variables

- `NODE_ENV`: Set to 'development' by default in Docker

## 🔧 Tech Stack

- React 19
- Material-UI 7
- TypeScript
- Storybook 8
- Jest for testing
- ESLint + Prettier for code quality
- Husky for git hooks
- Loki for visual regression testing

## 📚 Documentation

Component documentation is available through Storybook. After starting the Storybook server, visit:
- Local development: http://localhost:6006
- Docker: http://localhost:6006

## 🧪 Testing

The project uses multiple testing approaches:
1. Unit tests with Jest
2. Component testing with React Testing Library
3. Visual regression testing with Loki
4. Accessibility testing with Storybook a11y addon

## 📦 Publishing

This package is published to GitHub Packages. Here's how to publish and use the package:

### Publishing to GitHub Packages

1. Set up authentication:
   ```bash
   # Create or edit ~/.npmrc
   echo "//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN" >> ~/.npmrc
   ```

2. Login to GitHub Packages:
   ```bash
   npm login --registry=https://npm.pkg.github.com
   ```

3. Prepare for publishing:
   ```bash
   # Ensure you're on the main branch
   git checkout main
   git pull

   # Install dependencies
   yarn install

   # Run tests
   yarn test

   # Build the package
   yarn build
   ```

4. Update version (choose one):
   ```bash
   npm version patch  # for bug fixes (0.0.x)
   npm version minor  # for new features (0.x.0)
   npm version major  # for breaking changes (x.0.0)
   ```

5. Publish the package:
   ```bash
   npm publish
   ```

### Using the Package

1. Authenticate with GitHub Packages:
   ```bash
   # Create or edit ~/.npmrc in your project
   @vedam-dev:registry=https://npm.pkg.github.com
   //npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
   ```

2. Install the package:
   ```bash
   yarn add @vedam-dev/ui-components
   # or
   npm install @vedam-dev/ui-components
   ```

3. Import and use components:
   ```typescript
   import { Button, Card } from '@vedam-dev/ui-components';
   ```

### Version Management

- The package follows Semantic Versioning (SemVer)
- Version history is available in the GitHub releases page
- Pre-release versions are tagged with `-alpha`, `-beta`, or `-rc` suffixes
- Release notes are automatically generated from commit messages

## 🤝 Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Run tests: `yarn test`
4. Run visual regression tests: `yarn loki`
5. Submit a pull request

## 📄 License

MIT License

## 🔗 Links

- [GitHub Repository](https://github.com/vedam-dev/ui-components)
- [Issue Tracker](https://github.com/vedam-dev/ui-components/issues)