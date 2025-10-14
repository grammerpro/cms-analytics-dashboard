# Contributing to CMS Analytics Dashboard

First off, thank you for considering contributing to CMS Analytics Dashboard! It's people like you that make this project better for everyone.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct of being respectful and inclusive.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if possible**
- **Include your environment details** (OS, Node version, browser, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List any alternative solutions you've considered**

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following the code style of the project
3. **Test your changes** thoroughly
4. **Update documentation** if needed
5. **Commit your changes** with clear commit messages
6. **Push to your fork** and submit a pull request

#### Pull Request Process

1. Ensure your code follows the existing style
2. Update the README.md with details of changes if applicable
3. The PR must pass all CI checks
4. Request review from maintainers
5. Your PR will be merged once approved

## Development Setup

```bash
# Clone your fork
git clone https://github.com/yourusername/cms-analytics-dashboard.git

# Install dependencies
cd cms-analytics-dashboard
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install

# Create .env file in server directory
cp .env.example .env

# Start development servers
npm run dev
```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid using `any` type unless absolutely necessary
- Use descriptive variable and function names

### React

- Use functional components with hooks
- Keep components small and focused
- Use proper prop typing
- Follow React best practices

### Backend

- Follow RESTful API conventions
- Implement proper error handling
- Use async/await for asynchronous operations
- Write clean, self-documenting code

### Commit Messages

- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit first line to 72 characters
- Reference issues and pull requests when relevant

Example:
```
feat: Add real-time notifications for analytics

- Implement Socket.IO integration
- Add notification toast component
- Update analytics service

Closes #123
```

### Commit Types

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

## Testing

- Write tests for new features
- Ensure all tests pass before submitting PR
- Maintain or improve code coverage

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage
```

## Project Structure

Please maintain the existing project structure:

```
cms-analytics-dashboard/
├── client/          # Frontend React application
├── server/          # Backend Node.js/Express application
├── shared/          # Shared types and constants
└── docker-compose.yml
```

## Questions?

Feel free to open an issue with your question or reach out to the maintainers.

## Recognition

Contributors will be recognized in the project README and release notes.

Thank you for contributing! 🎉
