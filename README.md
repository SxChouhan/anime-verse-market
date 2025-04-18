# Anime Verse Market

A one-stop shop for anime merchandise, costumes, figures, and more.

## Technologies Used

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Running the Server

### Prerequisites

- Node.js installed on your machine

### Quick Start

#### Using the Batch File (Windows)

1. **Start the server**:
   - Double-click the `start-server.bat` file
   - This will start the Node.js server

2. **Access the website**:
   - Open your browser and go to http://localhost:8000

3. **Stop the server**:
   - Press Ctrl+C in the terminal window
   - Confirm with Y when prompted

#### Using Command Line

1. **Start the server**:
   ```bash
   node server.js
   ```

2. **Access the website**:
   - Open your browser and go to http://localhost:8000

3. **Stop the server**:
   - Press Ctrl+C in the terminal window

### Development

For development with auto-reloading:

```sh
# Install dependencies
npm i

# Start the development server
npm run dev
```

## Making Changes

When you make changes to your code, you need to rebuild the project and restart the server:

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Restart the server**:
   - Stop the server (Ctrl+C)
   - Start it again with `node server.js`

## Server Details

- The website is served using a simple Node.js HTTP server
- The server runs on port 8000
- The server serves static files from the `dist` directory
- The server handles SPA routing by redirecting to index.html for non-file requests

## Troubleshooting

- **Server won't start**: Make sure Node.js is installed and in your PATH
- **Can't access the website**: Check if the server is running in the terminal
- **Changes not reflected**: Make sure you've rebuilt the project with `npm run build`
