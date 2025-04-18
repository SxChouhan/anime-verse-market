#!/bin/bash

echo "Starting Anime Verse Market Server..."
echo

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js and try again."
    exit 1
fi

# Default values
LOG_LEVEL="INFO"
PORT=8000

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --debug)
            LOG_LEVEL="DEBUG"
            shift
            ;;
        --info)
            LOG_LEVEL="INFO"
            shift
            ;;
        --warn)
            LOG_LEVEL="WARN"
            shift
            ;;
        --error)
            LOG_LEVEL="ERROR"
            shift
            ;;
        --port)
            PORT="$2"
            shift
            shift
            ;;
        *)
            echo "Unknown argument: $1"
            shift
            ;;
    esac
done

echo "Log level: $LOG_LEVEL"
echo "Port: $PORT"
echo

# Create a temporary script to start the server with the specified log level
cat > temp-start.js << EOF
import { logger, startServer } from './http-server.js';
logger.setLevel(logger.levels.${LOG_LEVEL});
startServer();
EOF

# Start the server
node temp-start.js

# Clean up
rm temp-start.js
