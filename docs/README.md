# Documentation Site

This directory contains the documentation site for @mehdiraized/dates.

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the main branch.

### Setup Requirements

1. **GitHub Pages Settings**: Make sure GitHub Pages is enabled in your repository settings

   - Go to Settings > Pages
   - Source: Deploy from a branch
   - Branch: gh-pages
   - Folder: / (root)

2. **Repository Permissions**: Ensure the GitHub Actions have proper permissions

   - Go to Settings > Actions > General
   - Workflow permissions: Read and write permissions
   - Allow GitHub Actions to create and approve pull requests: Checked

3. **NPM Token**: Add your NPM token to repository secrets
   - Go to Settings > Secrets and variables > Actions
   - Add new repository secret: `NPM_TOKEN`
   - Value: Your NPM access token

## Local Development

To run the documentation site locally:

1. Open `docs/index.html` in your browser
2. Or use a local server:
   ```bash
   cd docs
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

## Structure

- `index.html` - Main documentation page
- `404.html` - Custom 404 error page
- `CNAME` - Custom domain configuration
