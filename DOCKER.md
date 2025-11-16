# Docker Quick Start Guide

## Prerequisites

- Docker Engine 20.10 or later
- Docker Compose 2.0 or later

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/PR-CYBR/PR-SJU.git
cd PR-SJU
```

### 2. Start the Dashboard

```bash
docker compose up -d
```

### 3. Access the Dashboard

Open your browser and navigate to:
- Main dashboard: http://localhost:8080/hamdash.html
- Landing page: http://localhost:8080

### 4. Stop the Dashboard

```bash
docker compose down
```

## Profile Selection

### Method 1: URL Parameter

Load a specific profile directly via URL:
```
http://localhost:8080/hamdash.html?profile=WATCHDOGS
```

Available profiles:
- `TOCOPS` - Tactical Operations Center
- `PR-DIV` - Puerto Rico Division (default)
- `WATCHDOGS` - Monitoring Operations
- `INTEL-HUB` - Intelligence Hub
- `PR-SRN` - San Juan Radio Network
- `PR-M3SH` - Mesh Network
- `PR-SPOT` - Satellite & Space Weather

### Method 2: Environment Variable

Set default profile in docker-compose.yml:
```yaml
environment:
  - DEFAULT_PROFILE=WATCHDOGS
```

Or pass it when starting:
```bash
DEFAULT_PROFILE=TOCOPS docker compose up -d
```

### Method 3: Dashboard UI

1. Open the dashboard
2. Click the settings (⚙️) button
3. Select profile from dropdown
4. Profile loads automatically and persists in localStorage

## Advanced Usage

### Build Custom Image

```bash
docker build -t pr-sju-dash:custom .
```

### Run without Docker Compose

```bash
docker run -d \
  -p 8080:80 \
  -v $(pwd)/profiles:/usr/share/nginx/html/profiles \
  -v $(pwd)/data:/usr/share/nginx/html/data \
  -e DEFAULT_PROFILE=PR-DIV \
  --name pr-sju-dash \
  pr-sju-dash:custom
```

### View Logs

```bash
docker compose logs -f
```

### Update to Latest Version

```bash
git pull
docker compose down
docker compose up -d --build
```

## Troubleshooting

### Port Already in Use

If port 8080 is already in use, modify docker-compose.yml:
```yaml
ports:
  - "8090:80"  # Change 8080 to any available port
```

### Profile Not Loading

1. Check that profile exists: `ls profiles/`
2. Verify config.js exists: `ls profiles/YOUR_PROFILE/config.js`
3. Check browser console for errors (F12)
4. Clear browser cache and localStorage

### Container Won't Start

Check logs:
```bash
docker compose logs pr-sju-dash
```

Verify nginx configuration:
```bash
docker compose run --rm pr-sju-dash nginx -t
```

## File Structure

```
/usr/share/nginx/html/
├── index.html              # Landing page
├── hamdash.html            # Main dashboard
├── config.js               # Default configuration
├── satellite.js            # Satellite tracking
├── wheelzoom.js            # Image zoom utility
├── profiles/               # Profile configurations
│   ├── TOCOPS/
│   │   └── config.js
│   ├── PR-DIV/
│   │   └── config.js
│   └── ...
└── data/                   # Tile data (optional)
    └── ...
```

## Health Checks

The container includes automatic health checks that verify nginx is responding:

```bash
docker inspect pr-sju-dash --format='{{.State.Health.Status}}'
```

Health check runs every 30 seconds and expects HTTP 200 from http://localhost/

## CORS Configuration

The nginx configuration includes CORS headers to allow:
- Cross-origin requests
- Access to profile configurations
- Loading external tile sources

## Security Considerations

- The dashboard is served over HTTP by default
- For production use, consider adding:
  - HTTPS/TLS termination (reverse proxy)
  - Authentication (nginx auth or external service)
  - Rate limiting
  - IP allowlisting if needed

## Support

For issues or questions:
- Check the main [README.md](README.md)
- Review [GitHub Issues](https://github.com/PR-CYBR/PR-SJU/issues)
- Consult [.specify/](.specify/) documentation
