# Running Anime Verse Market in a Container

This guide explains how to run the Anime Verse Market website in a Docker container for testing server performance.

## Prerequisites

- Docker Desktop installed on your machine
- Basic knowledge of Docker and containerization

## Quick Start

### Using the Batch Files (Windows)

1. **Start the container**:
   - Double-click the `run-container.bat` file
   - This will build and start the container

2. **Access the website**:
   - Open your browser and go to http://localhost:8000

3. **Stop the container**:
   - Double-click the `stop-container.bat` file
   - This will stop and remove the container

### Using Command Line

1. **Build and start the container**:
   ```bash
   docker-compose up --build -d
   ```

2. **Access the website**:
   - Open your browser and go to http://localhost:8000

3. **Stop the container**:
   ```bash
   docker-compose down
   ```

## Container Details

- The website is served using Nginx, a high-performance web server
- The container exposes port 80, which is mapped to port 8000 on your host machine
- Static assets are cached for 30 days for better performance
- Gzip compression is enabled to reduce bandwidth usage
- The container is configured to restart automatically unless explicitly stopped

## Performance Testing

To test the performance of your website in the container, you can use tools like:

- [Lighthouse](https://developers.google.com/web/tools/lighthouse) (built into Chrome DevTools)
- [WebPageTest](https://www.webpagetest.org/)
- [GTmetrix](https://gtmetrix.com/)

## Troubleshooting

- **Container won't start**: Make sure Docker Desktop is running
- **Can't access the website**: Check if the container is running with `docker ps`
- **Changes not reflected**: You need to rebuild the container after making changes to your code

## Advanced Configuration

You can modify the `nginx.conf` file to adjust server settings like:

- Cache duration
- Compression level
- Security headers
- Performance optimizations

After modifying the configuration, restart the container to apply the changes.
