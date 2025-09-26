# Developer Documentation - @vedam-dev/ui-components

## 📋 Table of Contents

- [Quick Start](#-quick-start)
- [Project Architecture](#-project-architecture)
- [Development Workflow](#-development-workflow)
- [Component System](#-component-system)
- [Theme System](#-theme-system)
- [Testing Strategy](#-testing-strategy)
- [Code Standards](#-code-standards)
- [Build & Deployment](#-build--deployment)
- [Troubleshooting](#-troubleshooting)

## 🚀 Quick Start

### Prerequisites

- **Node.js**: v20 or higher
- **Package Manager**: Yarn (preferred) or npm
- **IDE**: VSCode with recommended extensions
- **Docker**: For containerized development (optional)

### Development Setup

```bash
# Clone and navigate to project
git clone https://github.com/vedam-dev/ui-components.git
cd ui-components

# Install dependencies
yarn install

# Start development environment
yarn storybook

# Run tests
yarn test

# Build library
yarn build
```

### IDE Setup (VSCode)

Install recommended extensions:
- ES7+ React/Redux/React-Native snippets
- TypeScript Importer
- Prettier - Code formatter
- ESLint
- Auto Rename Tag

## 🏗 Project Architecture

### Atomic Design System

The project follows **Atomic Design** principles:

```
src/component/
├── atom/           # Basic building blocks
│   ├── button/     # Button component
│   ├── avatar/     # Avatar component
│   ├── typography/ # Text components
│   └── ...
├── molecule/       # Simple combinations of atoms
│   ├── banner/     # Banner with text + button
│   ├── appbar/     # App bar with navigation
│   └── ...
└── organism/       # Complex UI components
    ├── navigation/ # Full navigation system
    ├── card/       # Complex card layouts
    └── ...
```

### Folder Structure

```
ui-components/
├── .storybook/           # Storybook configuration
├── src/
│   ├── component/        # All React components
│   ├── stories/          # Storybook stories
│   ├── theme/            # Theme system
│   ├── util/             # Utility functions
│   └── index.js          # Main export
├── test/                 # Test configurations
├── dist/                 # Built library output
└── storybook-static/     # Built Storybook
```

### Component Structure

Each component follows this structure:

```
component/atom/button/
├── Button.tsx        # Main component
├── Button.test.tsx   # Unit tests (if needed)
└── index.ts          # Export file
```

### Story Structure

```
stories/atoms/button/
├── Button.stories.tsx    # Storybook stories
└── Button.test.stories.tsx # Story-based tests
```

## 🔄 Development Workflow

### 1. Feature Development

```bash
# Create feature branch
git checkout -b feature/component-name

# Develop component
# 1. Create component in src/component/
# 2. Create stories in src/stories/
# 3. Add to main index.js export
# 4. Write tests

# Run development server
yarn storybook
```

### 2. Code Quality Checks

```bash
# Lint code
yarn lint
yarn lint:fix

# Run tests
yarn test

# Visual regression tests
yarn loki

# Type checking
yarn build
```

### 3. Git Workflow

```bash
# Commit changes (follows conventional commits)
git add .
git commit -m "feat(button): add new variant prop"

# Push and create PR
git push origin feature/component-name
```

### 4. Branch Protection

- Branch names must follow pattern: `feature/*`, `bugfix/*`, `hotfix/*`
- Conventional commit messages required
- All checks must pass before merge

## 🧩 Component System

### Creating New Components

#### 1. Atomic Component Example

```typescript
// src/component/atom/badge/Badge.tsx
import React from 'react';
import { styled } from '@mui/material/styles';

interface BadgeProps {
  color?: 'primary' | 'secondary' | 'error';
  variant?: 'filled' | 'outlined';
  children: React.ReactNode;
}

const StyledBadge = styled('span')<BadgeProps>(({ theme, color, variant }) => ({
  // Styling logic
}));

export const Badge: React.FC<BadgeProps> = ({ 
  color = 'primary', 
  variant = 'filled', 
  children 
}) => {
  return (
    <StyledBadge color={color} variant={variant}>
      {children}
    </StyledBadge>
  );
};
```

#### 2. Export Component

```typescript
// src/component/atom/badge/index.ts
export { Badge } from './Badge';
export type { BadgeProps } from './Badge';
```

#### 3. Add to Main Export

```typescript
// src/component/atom/index.ts
export * from './badge';

// src/index.js
export * from './component';
```

#### 4. Create Stories

```typescript
// src/stories/atoms/badge/Badge.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../../../component/atom/badge';

const meta = {
  title: 'Atom/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'error']
    }
  }
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Badge',
    color: 'primary'
  }
};

export const Secondary: Story = {
  args: {
    children: 'Badge',
    color: 'secondary'
  }
};
```

### Component Guidelines

1. **TypeScript**: All components must be typed
2. **Props Interface**: Define clear prop interfaces
3. **Default Props**: Provide sensible defaults
4. **Accessibility**: Follow ARIA guidelines
5. **Responsive**: Support mobile-first design
6. **Theming**: Use theme system for consistency

## 🎨 Theme System

### Theme Architecture

```typescript
// Core theme structure
interface CoreTheme {
  palette: {
    primary: PaletteColor;
    secondary: PaletteColor;
    error: PaletteColor;
    warning: PaletteColor;
    info: PaletteColor;
    success: PaletteColor;
  };
  typography: TypographyOptions;
  spacing: SpacingFunction;
  breakpoints: BreakpointOptions;
}
```

### Customer Themes

The project supports multiple brand themes:

- **Default**: Base theme
- **KS**: Kansas brand colors
- **KS3**: Kansas variant
- **WV**: West Virginia brand colors

### Creating Custom Themes

```typescript
// src/theme/customer/newbrand/colors.ts
const colors = {
  primary: '#your-primary-color',
  secondary: '#your-secondary-color',
  // ... other colors
};

// src/theme/customer/newbrand/index.ts
import { createCoreTheme } from '../../core-theme';
import colors from './colors';

const newBrandTheme = createCoreTheme({
  palette: {
    primary: { main: colors.primary },
    secondary: { main: colors.secondary }
  }
});
```

### Using Themes in Components

```typescript
import { useTheme } from '@mui/material/styles';

const MyComponent = () => {
  const theme = useTheme();
  
  return (
    <div style={{ 
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText 
    }}>
      Content
    </div>
  );
};
```

## 🧪 Testing Strategy

### Testing Pyramid

1. **Unit Tests** (Jest + React Testing Library)
2. **Integration Tests** (Storybook interactions)
3. **Visual Regression Tests** (Loki)
4. **Accessibility Tests** (Storybook a11y addon)

### Unit Testing

```typescript
// component.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });
});
```

### Visual Regression Testing

```bash
# Capture reference images
yarn loki:update

# Run visual tests
yarn loki:test

# Approve changes
yarn loki:approve
```

### Accessibility Testing

- Automated a11y checks in Storybook
- Manual testing with screen readers
- Keyboard navigation testing
- Color contrast validation

### Test Commands

```bash
yarn test              # Run unit tests
yarn test:watch        # Watch mode
yarn test:coverage     # Coverage report
yarn loki              # Visual regression
yarn storybook:test    # Story-based tests
```

## 📏 Code Standards

### ESLint Configuration

Strict TypeScript and React rules:

```javascript
// Key rules
"@typescript-eslint/explicit-function-return-type": "error"
"@typescript-eslint/no-explicit-any": "error"
"react-hooks/exhaustive-deps": "warn"
"no-console": "error"
```

### Prettier Configuration

```javascript
{
  "printWidth": 100,
  "singleQuote": true,
  "trailingComma": "none",
  "tabWidth": 2,
  "arrowParens": "avoid"
}
```

### TypeScript Guidelines

1. **Explicit Return Types**: All functions must have return types
2. **No Any**: Avoid `any` type, use proper typing
3. **Interface Over Type**: Prefer interfaces for object shapes
4. **Strict Mode**: All strict TypeScript options enabled

### Naming Conventions

- **Components**: PascalCase (`Button`, `NavigationMenu`)
- **Files**: Match component name (`Button.tsx`)
- **Props**: camelCase with descriptive names
- **Stories**: Descriptive names (`PrimaryButton`, `LargeAvatar`)

### Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

feat(button): add disabled state
fix(avatar): resolve image loading issue
docs(readme): update installation guide
```

## 🔨 Build & Deployment

### Build Process

```bash
# Development build
yarn build

# Production build (with optimizations)
yarn build:lib

# Storybook build
yarn build-storybook
```

### Publishing Workflow

```bash
# 1. Version bump
npm version patch|minor|major

# 2. Build library
yarn build

# 3. Publish to GitHub Packages
npm publish
```

### Docker Development

```bash
# Build and run with Docker Compose
docker-compose up --build

# Access Storybook at http://localhost:6006
```

### CI/CD Pipeline

The project uses GitHub Actions for:

1. **Code Quality**: ESLint, Prettier, TypeScript checks
2. **Testing**: Unit tests, visual regression tests
3. **Build**: Library and Storybook builds
4. **Deployment**: Automatic publishing on version tags

## 🔧 Troubleshooting

### Common Issues

#### 1. Storybook Won't Start

```bash
# Clear cache and reinstall
rm -rf node_modules yarn.lock
yarn install
yarn storybook
```

#### 2. TypeScript Errors

```bash
# Check TypeScript configuration
yarn tsc --noEmit

# Clear TypeScript cache
rm -rf dist/ .tsbuildinfo
```

#### 3. Visual Regression Test Failures

```bash
# Update reference images
yarn loki:update

# Check specific configuration
yarn loki --verbose
```

#### 4. Build Failures

```bash
# Clean build
rm -rf dist/ storybook-static/
yarn build
```

### Performance Optimization

1. **Bundle Analysis**: Use webpack-bundle-analyzer
2. **Code Splitting**: Implement component-level splitting
3. **Tree Shaking**: Ensure proper exports
4. **Image Optimization**: Use appropriate formats

### Debugging Tips

1. **React DevTools**: Install browser extension
2. **Storybook Controls**: Use for prop testing
3. **Console Debugging**: Use `console.debug` (removed in production)
4. **VSCode Debugger**: Configure for Node.js debugging

## 📚 Additional Resources

### Documentation

- [Storybook Documentation](https://storybook.js.org/docs)
- [Material-UI Documentation](https://mui.com/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Team Conventions

- Code reviews required for all PRs
- Pair programming encouraged for complex components
- Regular architecture discussions
- Performance monitoring and optimization

### Getting Help

1. **Internal Documentation**: Check Confluence/Wiki
2. **Team Chat**: Slack #ui-components channel
3. **Code Reviews**: Tag relevant team members
4. **Architecture Decisions**: Schedule team discussions

---

## 🤝 Contributing

Please read our [Contributing Guidelines](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

### Development Process

1. **Issue Creation**: Create issue for new features/bugs
2. **Branch Creation**: Follow naming conventions
3. **Development**: Follow coding standards
4. **Testing**: Ensure all tests pass
5. **Documentation**: Update relevant docs
6. **Review**: Submit PR for team review

---

*Last updated: $(date)*
*Maintained by: UI Components Team*
