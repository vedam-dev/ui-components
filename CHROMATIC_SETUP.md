# Chromatic Setup Guide

Chromatic is a visual testing and review tool that integrates seamlessly with Storybook. It automatically captures visual snapshots of your components and detects visual changes.

## Prerequisites

- Chromatic account (sign up at https://www.chromatic.com)
- Storybook already configured (✅ you have this)

## Setup Steps

### 1. Create a Chromatic Account

1. Go to https://www.chromatic.com
2. Sign up with GitHub (recommended for easy integration)
3. Create a new project or connect to an existing repository

### 2. Get Your Project Token

After creating a project, Chromatic will provide you with a **Project Token**. You'll need this to authenticate.

### 3. Configure Chromatic

#### Option A: Using Environment Variable (Recommended)

Create a `.env` file in the root directory:

```bash
CHROMATIC_PROJECT_TOKEN=your-project-token-here
```

Then update `package.json` scripts:

```json
"chromatic": "chromatic --project-token=${CHROMATIC_PROJECT_TOKEN}",
"chromatic:test": "chromatic --project-token=${CHROMATIC_PROJECT_TOKEN} --exit-zero-on-changes"
```

#### Option B: Using Command Line

Replace `YOUR_PROJECT_TOKEN` in `package.json` with your actual token, or pass it via command line:

```bash
yarn chromatic --project-token=your-token-here
```

### 4. Run Chromatic Locally

First, build your Storybook:

```bash
yarn build-storybook
```

Then run Chromatic:

```bash
yarn chromatic
```

This will:
- Build your Storybook (if not already built)
- Upload it to Chromatic
- Capture visual snapshots of all stories
- Show you a link to review the results

## Usage

### Basic Commands

```bash
# Run Chromatic with visual testing
yarn chromatic

# Run Chromatic but exit with code 0 even if there are changes
# Useful for CI/CD pipelines
yarn chromatic:test

# Build Storybook first, then run Chromatic
yarn build-storybook && yarn chromatic
```

### CI/CD Integration

Chromatic works great with CI/CD pipelines. Here's an example GitHub Actions workflow:

```yaml
name: Chromatic

on:
  pull_request:
    branches:
      - main

jobs:
  chromatic:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 22
      
      - name: Install dependencies
        run: yarn install --frozen-lockfile
      
      - name: Run Chromatic
        uses: chromaui/action@v1
        with:
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
          token: ${{ secrets.GITHUB_TOKEN }}
```

### Chromatic Options

Common options you can use:

```bash
# Only test specific stories
chromatic --only-changed

# Build Storybook with specific directory
chromatic --build-script-name=build-storybook --storybook-build-dir=storybook-static

# Set branch name
chromatic --branch-name=feature/new-component

# Auto-accept changes (use with caution!)
chromatic --auto-accept-changes

# Exit with code 0 even if there are changes
chromatic --exit-zero-on-changes
```

## Workflow

1. **Initial Setup**: Run `yarn chromatic` to create baseline snapshots
2. **Make Changes**: Update your components
3. **Test Changes**: Run `yarn chromatic` again
4. **Review**: Chromatic will show you visual diffs
5. **Approve/Reject**: Accept changes that are intentional, reject bugs

## Integration with Existing Tools

You're currently using **Loki** for visual regression testing. Chromatic can complement or replace Loki:

- **Loki**: Local visual testing, good for development
- **Chromatic**: Cloud-based, better for CI/CD and team collaboration

You can use both, or migrate fully to Chromatic.

## Troubleshooting

### Build Errors

If Storybook build fails:
```bash
# Check Storybook builds correctly
yarn build-storybook

# Fix any TypeScript/compilation errors first
yarn build
```

### Authentication Issues

Make sure your project token is correct:
- Check it in Chromatic dashboard
- Verify it's set in environment variable or package.json

### Network Issues

If upload fails:
- Check your internet connection
- Verify Chromatic service status
- Try running with `--debug` flag for more info

## Resources

- [Chromatic Documentation](https://www.chromatic.com/docs/)
- [Storybook + Chromatic Guide](https://www.chromatic.com/docs/storybook)
- [CI/CD Integration](https://www.chromatic.com/docs/ci)
