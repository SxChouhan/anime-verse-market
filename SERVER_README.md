# Running the Anime Verse Market Website on a Server

This guide explains how to run the Anime Verse Market website on a local server and test changes.

## Quick Start

1. **Start the server**:
   ```
   http-server dist -p 8000 -c-1
   ```
   Or simply run the `build-and-serve.bat` script.

2. **Access the website**:
   Open your browser and go to http://localhost:8000

3. **Test changes**:
   - Make changes to your source files
   - Run `test-changes.bat` to build the project and copy resource files
   - Refresh your browser to see the changes

## Available Scripts

### `build-and-serve.bat`
Builds the project, copies resource files, and starts the server.

### `test-changes.bat`
Builds the project and copies resource files without restarting the server.

## How It Works

1. The server serves static files from the `dist` directory
2. When you make changes to source files, you need to rebuild the project
3. The `test-changes.bat` script automates this process

## Troubleshooting

- **Changes not visible**: Make sure you've run `test-changes.bat` and refreshed your browser
- **Server won't start**: Make sure port 8000 is not in use by another application
- **Missing resources**: Run `node copy-resources.js` to copy resource files to the dist directory

## Docker (Future Enhancement)

We've prepared Docker configuration files for future use:
- `Dockerfile`: Defines how to build the container image
- `docker-compose.yml`: Makes it easy to build and run the container
- `nginx.conf`: Configuration for the Nginx web server

Once Docker is properly configured on your system, you can use these files to run the website in a container.
