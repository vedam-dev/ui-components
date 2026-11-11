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
import { ThemeProvider } from "@mui/material/styles";
import {
  Button,
  Card,
  Typography,
  vedamTheme,
} from "@vedam-dev/ui-components";

function App() {
  return (
    <ThemeProvider theme={vedamTheme}>
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

- **Production**: use the published Storybook URL configured for the package release
- **Local Development**: http://localhost:6006

### Developer Documentation

For detailed development guidelines, see [DEVELOPER_README.md](DEVELOPER_README.md)

### Public import surface

The package entry point (`@vedam-dev/ui-components`) is the supported consumer import
surface. Components and ready-made themes are exported from `src/index.js` and compiled
to the published `dist/index.js`.

```tsx
import {
  Button,
  SubjectCard,
  ContestModal,
  Tabs,
  CampusSelection,
  vedamTheme,
} from "@vedam-dev/ui-components";
```

Do not rely on undocumented package subpaths such as
`@vedam-dev/ui-components/theme`; if an internal helper or theme must become public,
add an explicit root export first.

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

### Recently updated organism contracts

These components are exported from the package root and are used by application
repos. Keep Storybook stories and this README in sync when changing their props.

#### `SubjectCard`

Use `SubjectCard` for course, subject, and course-offering tiles. It requires a
`subject`, `description`, `index`, and `gradient`; `border` is optional but commonly
paired with the gradient for visual consistency.

```tsx
import { SubjectCard } from "@vedam-dev/ui-components";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";

<SubjectCard
  variant="course-offering"
  subject="Fundamentals of Machine Learning"
  description="Introductory concepts, programming exercises, and projects."
  batch="Batch I"
  index={0}
  gradient="linear-gradient(180deg, #F3E8FF 0%, #FFF 100%)"
  border="1px solid #DAC2F2"
  infoItems={[
    { label: "Course Code", value: "CS101", icon: <CodeOutlinedIcon /> },
  ]}
  buttons={[
    { text: "Replicate", onClick: handleReplicate, variant: "outlined" },
    { text: "Add Details", onClick: handleAddDetails, variant: "contained" },
  ]}
/>;
```

Constraints verified in the component:

- `buttons` takes precedence over the legacy single `onGoToClass` action.
- `teacher` is hidden when `variant="course-offering"` and `batch` is present.
- `attendance` displays an `Att : N%` chip. If `attendanceVariant` is omitted, the
  chip derives `success`, `warning`, or `error` from `minAttendance` (default `75`).
- `button.startIcon` is currently accepted by the TypeScript shape but is not rendered
  by the component.

#### `ContestModal`

`ContestModal` is a controlled create/edit dialog for contest metadata. The parent
owns `open`, `onClose`, course-offering options, and persistence through `onSubmit`.

```tsx
import { ContestModal } from "@vedam-dev/ui-components";

<ContestModal
  open={isContestModalOpen}
  onClose={() => setContestModalOpen(false)}
  variant="create"
  courseOfferings={[
    { id: 61, label: "DSA 101", title: "Data Structures", batch: "Batch A" },
  ]}
  onSubmit={async (data) => {
    await saveContest(data);
  }}
/>;
```

Behavior and validation notes:

- `variant="edit"` disables the course-offering selector and reads values from
  `initialData` every time the modal opens.
- `onSubmit` receives trimmed `title` and `label`, `courseOfferingId`, ISO-like
  `date`, `time`, `duration` in minutes, and `maxScore`.
- Title is limited to 80 characters and label to 15 characters.
- Duration is entered as `hh:mm`, defaults to 120 minutes, snaps to 30-minute
  increments on blur/submit, and cannot go below 30 minutes.
- Submit is disabled until title, label, course offering, date, time, duration, and
  max score are valid. The modal closes only after `onSubmit` resolves successfully.

#### `Tabs`

`Tabs` is an accessible, internally controlled tab set with optional add and delete
actions.

```tsx
import { Tabs } from "@vedam-dev/ui-components";

<Tabs
  tabs={[
    { label: "Overview", content: <OverviewPanel /> },
    {
      label: "Details",
      content: <DetailsPanel />,
      onDelete: async () => deleteDetailsTab(),
    },
    { label: "Settings", content: <SettingsPanel />, disabled: true },
  ]}
  initialIndex={0}
  onChange={(nextIndex) => setSelectedTab(nextIndex)}
  onAdd={() => addTab()}
  deleteConfirmMessage="Are you sure you want to delete this tab?"
/>;
```

Operational notes:

- Returns `null` when `tabs` is empty.
- `initialIndex` is clamped to the available tab range and reclamped when tab count
  changes.
- Keyboard support includes ArrowLeft, ArrowRight, Home, End, Enter, and Space; disabled
  tabs are skipped.
- `onChange` fires after the 300 ms panel transition unless `disableTransition` is set.
- Delete controls render only on the selected tab when that tab has `onDelete`.

#### `CampusSelection`

`CampusSelection` is a controlled campus card selector with responsive pagination.

```tsx
import { CampusSelection } from "@vedam-dev/ui-components";

<CampusSelection
  value={selectedCampus}
  onChange={setSelectedCampus}
  onSelectCampus={(campus) => continueWithCampus(campus)}
  logourl="/images/campus-logo.png"
  edit={false}
  options={[
    {
      value: "pune",
      collegeName: "Vedam School of Technology",
      campus: "Campus : Pune",
      label: "ADYPU Pune",
      collegeId: "1",
      location: "Charholi Budruk, Pune, Maharashtra",
      pincode: "412105",
      website: "https://adypu.edu.in/",
    },
  ]}
/>;
```

Constraints:

- `value` and `onChange` control the selected radio-card state.
- `onSelectCampus` fires from the card's "Select Campus" action; selecting the card
  itself only calls `onChange`.
- `logourl` and `edit` are required by the current prop contract.
- `itemsPerPage` is responsive by default. Passing a value other than `3` forces that
  page size; `3` follows the same auto-calculation path as the default.
- Disabled cards ignore mouse and keyboard selection.

## 🎨 Theming

### Available Themes

The library exports ready-made brand themes from the package root:

```tsx
import {
  defaultTheme,
  vedamTheme,
  ksTheme,
  ks3Theme,
  miraeTheme,
  globexTheme,
} from "@vedam-dev/ui-components";

// Use with Material-UI ThemeProvider
<ThemeProvider theme={vedamTheme}>
  <App />
</ThemeProvider>;
```

### Custom Theme

Brand theme creation is an internal contribution workflow. Add new brand tokens under
`src/theme/customer/<brand>/`, create the theme with the existing `createCoreTheme`
helper, and export the completed theme from `src/index.js` when apps need to consume it.

Consumer apps should use one of the exported ready-made themes unless a new root export
has been added.

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

- **Current Version**: 1.174.0
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
