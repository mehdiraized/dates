# Contributing to @mehdiraized/dates

Thank you for your interest in contributing to @mehdiraized/dates! This document provides guidelines for contributing to the project.

## Commit Message Conventions

We use [Conventional Commits](https://www.conventionalcommits.org/) for our commit messages. This enables automatic versioning and release generation.

### Commit Message Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- **feat**: A new feature (triggers minor version bump)
- **fix**: A bug fix (triggers patch version bump)
- **breaking**: A breaking change (triggers major version bump)
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools

### Examples

```bash
# New feature (triggers minor version bump)
git commit -m "feat: add support for custom date formats"

# Bug fix (triggers patch version bump)
git commit -m "fix: resolve issue with date range selection"

# Breaking change (triggers major version bump)
git commit -m "breaking: change API for date picker props"

# Documentation update (no version bump)
git commit -m "docs: update installation instructions"

# Chore (no version bump)
git commit -m "chore: update dependencies"
```

## Automatic Release Process

When you push a commit with `feat:`, `fix:`, or `breaking:` to the main branch, the following happens automatically:

1. **Version Bump**: The version is automatically incremented based on the commit type
2. **Build**: The package is built and tested
3. **Publish to NPM**: The new version is published to npm
4. **Create GitHub Release**: A new release is created with changelog
5. **Deploy Documentation**: The documentation site is updated

## Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/dates.git
   cd dates
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a feature branch:
   ```bash
   git checkout -b feat/your-feature-name
   ```
5. Make your changes
6. Test your changes:
   ```bash
   npm run build
   ```
7. Commit your changes using the conventional commit format
8. Push to your fork and create a pull request

## Pull Request Guidelines

- Use a descriptive title
- Include a summary of changes
- Reference any related issues
- Ensure all tests pass
- Update documentation if needed

## Code Style

- Use TypeScript for all new code
- Follow the existing code style
- Add comments for complex logic
- Write meaningful commit messages

## Questions?

If you have any questions about contributing, please open an issue or reach out to us.
