# @vedam-dev/ui-components

A comprehensive React component library built with Material-UI, featuring atomic design principles, multi-brand theming, and comprehensive testing suite.

[![NPM Version](https://img.shields.io/npm/v/@vedam-dev/ui-components)](https://www.npmjs.com/package/@vedam-dev/ui-components)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![Storybook](https://img.shields.io/badge/Storybook-Ready-ff69b4.svg)](https://storybook.js.org/)

## ✨ Features

- 🧩 **Atomic Design System** - Organized component hierarchy (Atoms → Molecules → Organisms)
- 🎨 **Multi-Brand Theming** - Support for multiple brand themes (KS, KS3, WV)
- ♿ **Accessibility First** - WCAG 2.1 compliant components
- 📱 **Responsive Design** - Mobile-first responsive components
- 🧪 **Comprehensive Testing** - Unit, visual regression, and accessibility testing
- 📖 **Storybook Documentation** - Interactive component documentation
- 🔧 **TypeScript Support** - Fully typed components and APIs
- 🐳 **Docker Ready** - Containerized development environment

## 🚀 Quick Start

### Installation

```bash
# Using npm
npm install @vedam-dev/ui-components

# Using yarn
yarn add @vedam-dev/ui-components
```

### Basic Usage

```tsx
import React from "react";
import { Button, Card, Typography } from "@vedam-dev/ui-components";
import { ThemeProvider } from "@mui/material/styles";
import { ksTheme } from "@vedam-dev/ui-components/theme";

function App() {
  return (
    <ThemeProvider theme={ksTheme}>
      <Card>
        <Typography variant="h5">Welcome to UI Components</Typography>
        <Button variant="contained" color="primary">
          Get Started
        </Button>
      </Card>
    </ThemeProvider>
  );
}
```

## 📚 Documentation

### Storybook

Explore our interactive component documentation:

- **Production**: [Storybook Documentation](https://your-storybook-url.com)
- **Local Development**: http://localhost:6006

### Developer Documentation

For detailed development guidelines, see [DEVELOPER_README.md](DEVELOPER_README.md)

## 🧩 Component Library

### Atomic Components

Basic building blocks of the design system:

- **Button** - Various button styles and states
- **Avatar** - User profile images and initials
- **Typography** - Text components with brand typography
- **Card** - Container components with elevation
- **Icon** - SVG icon components
- **Paper** - Surface components with shadows

### Molecular Components

Simple combinations of atomic components:

- **Banner** - Promotional and informational banners
- **AppBar** - Application navigation bar
- **Icon Dropdown** - Dropdown with icon trigger

### Organism Components

Complex UI sections:

- **Navigation** - Full navigation systems (desktop/mobile)
- **Cards** - Complex card layouts (horizontal/vertical)
- **Modals** - Various modal implementations
- **Forms** - Complete form components

## 🎨 Theming

### Available Themes

The library supports multiple brand themes:

```tsx
import {
  defaultTheme,
  ksTheme,
  ks3Theme,
  wvTheme,
} from "@vedam-dev/ui-components/theme";

// Use with Material-UI ThemeProvider
<ThemeProvider theme={ksTheme}>
  <App />
</ThemeProvider>;
```

### Custom Theme

Create your own brand theme:

```tsx
import { createCoreTheme } from "@vedam-dev/ui-components/theme";

const customTheme = createCoreTheme({
  palette: {
    primary: { main: "#your-primary-color" },
    secondary: { main: "#your-secondary-color" },
  },
  typography: {
    fontFamily: "Your Font Family",
  },
});
```

## 🔧 Development Setup

### Prerequisites

- **Node.js**: v20 or higher
- **Package Manager**: Yarn (preferred) or npm
- **Docker**: For containerized development (optional)

### Local Development

```bash
# Clone repository
git clone https://github.com/vedam-dev/ui-components.git
cd ui-components

# Install dependencies
yarn install

# Start Storybook development server
yarn storybook

# Run tests
yarn test

# Build library
yarn build
```

### Docker Development

```bash
# Build and run with Docker Compose
docker-compose up --build

# Access Storybook at http://localhost:6006
```

## 📦 Available Scripts

### Development

- `yarn storybook` - Start Storybook development server
- `yarn storybook --no-open` - Start Storybook without opening browser

### Building

- `yarn build` - Build the component library
- `yarn build:lib` - Build library with TypeScript configuration
- `yarn build-storybook` - Build static Storybook site

### Testing

- `yarn test` - Run Jest unit tests
- `yarn test --coverage` - Run tests with coverage report
- `yarn loki` - Run visual regression tests
- `yarn loki:update` - Update visual regression references
- `yarn loki:approve` - Approve visual changes

### Code Quality

- `yarn lint` - Run ESLint
- `yarn lint:fix` - Fix ESLint issues automatically
- `yarn prettier:format` - Format code with Prettier

## 🧪 Testing Strategy

The project uses a comprehensive testing approach:

### 1. Unit Testing (Jest + React Testing Library)

```bash
yarn test
```

### 2. Visual Regression Testing (Loki)

```bash
yarn loki:test
```

### 3. Accessibility Testing (Storybook a11y addon)

Automated accessibility checks in Storybook interface

### 4. Integration Testing (Storybook Test Runner)

```bash
yarn test-storybook
```

## 📦 Publishing & Distribution

### GitHub Packages

This package is published to GitHub Packages:

```bash
# Set up authentication
echo "//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN" >> ~/.npmrc

# Install from GitHub Packages
npm install @vedam-dev/ui-components
```

### Publishing Process

```bash
# 1. Version bump
npm version patch|minor|major

# 2. Build library
yarn build

# 3. Publish
npm publish
```

### Version Management

- Follows [Semantic Versioning](https://semver.org/)
- Automated release notes from conventional commits
- Pre-release versions available with alpha/beta/rc tags

## 🏗️ Project Architecture

```
ui-components/
├── src/
│   ├── component/          # React components
│   │   ├── atom/          # Basic building blocks
│   │   ├── molecule/      # Simple combinations
│   │   └── organism/      # Complex components
│   ├── stories/           # Storybook stories
│   ├── theme/             # Theme system
│   │   ├── core-theme.tsx # Base theme structure
│   │   └── customer/      # Brand-specific themes
│   └── util/              # Utility functions
├── .storybook/            # Storybook configuration
├── test/                  # Test configurations
└── dist/                  # Built library output
```

## 🔧 Tech Stack

- **React 19** - UI library
- **Material-UI 7** - Component foundation
- **TypeScript** - Type safety
- **Storybook 8** - Component documentation
- **Jest** - Unit testing
- **Loki** - Visual regression testing
- **ESLint + Prettier** - Code quality
- **Husky** - Git hooks
- **Docker** - Containerization

## 🤝 Contributing

We welcome contributions! Please read our contributing guidelines:

### Development Process

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Follow** our [coding standards](DEVELOPER_README.md#code-standards)
4. **Test** your changes: `yarn test && yarn loki`
5. **Commit** using [conventional commits](https://www.conventionalcommits.org/)
6. **Submit** a pull request

### Code Standards

- TypeScript with strict mode
- ESLint + Prettier for code formatting
- Conventional commit messages
- Comprehensive testing required
- Documentation updates for new features

## 🐛 Issue Reporting

Found a bug or have a feature request?

1. **Search** existing issues first
2. **Use** our issue templates
3. **Provide** reproduction steps
4. **Include** environment details

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links & Resources

- **Repository**: [GitHub](https://github.com/vedam-dev/ui-components)
- **Issues**: [Issue Tracker](https://github.com/vedam-dev/ui-components/issues)
- **Discussions**: [GitHub Discussions](https://github.com/vedam-dev/ui-components/discussions)
- **Changelog**: [Releases](https://github.com/vedam-dev/ui-components/releases)

## 📊 Package Information

- **Current Version**: 1.13.0
- **Bundle Size**: Check [Bundle Phobia](https://bundlephobia.com/package/@vedam-dev/ui-components)
- **Dependencies**: React 19+, Material-UI 7+
- **Browser Support**: Modern browsers (ES2019+)

---

<div align="center">
  <p>Made with ❤️ by the Vedam Development Team</p>
  <p>
    <a href="https://github.com/vedam-dev/ui-components/stargazers">⭐ Star us on GitHub</a> •
    <a href="https://github.com/vedam-dev/ui-components/issues">🐛 Report Bug</a> •
    <a href="https://github.com/vedam-dev/ui-components/discussions">💬 Discussions</a>
  </p>
</div>
