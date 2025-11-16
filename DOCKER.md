# Docker Quick Start Guide

## Prerequisites

- Docker Engine 20.10 or later
- Docker Compose 2.0 or later

## Overview

The PR-SJU Dashboard is containerized using Docker with nginx:alpine as the base image. This provides a lightweight, production-ready deployment option alongside the GitHub Pages hosting.

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

## Docker Build Workflow

The repository includes automated Docker build validation via GitHub Actions.

### Workflow: docker-build.yml

Triggers on:
- Push to: dev, main, stage, prod branches
- Pull requests to: dev, main, stage, prod branches

The workflow performs:
1. **Build Dockerfile** - Validates the Docker image builds successfully
2. **Container Health Check** - Runs health checks via curl
3. **Profile Loading Validation** - Verifies DEFAULT_PROFILE injection
4. **Index.html Validation** - Ensures dashboard files are accessible
5. **Profile Directory Access** - Tests all 7 profiles are available

This ensures that Docker deployments are always validated before merging to protected branches.

### Continuous Integration

Every commit to development and production branches automatically:
- Builds the Docker container
- Validates health checks
- Tests profile loading
- Verifies dashboard accessibility

This prevents broken Docker builds from being merged into main or production branches.

## Tile Automation Architecture

The PR-SJU Dashboard uses an automated tile fetching and processing system that runs independently of Docker deployments.

### Architecture Overview

```
sources/sources.md → tile-worker.yml → tile-loader.yml → tile-updater.yml
                          ↓                 ↓                  ↓
                     [tile-data]      [tile-data]        [tile-data]
```

### Workflow Components

1. **tile-worker.yml** (Runs every 15 minutes)
   - Parses `sources/sources.md` for tile URLs
   - Fetches latest data from each source
   - Stores raw data in `/data/<tile-id>/` directories
   - Saves metadata (URL, size, content-type, hash)
   - Pushes **ONLY** to `tile-data` branch

2. **tile-loader.yml** (Triggered by tile-worker)
   - Processes raw tile data
   - Creates JSON bundles for each tile
   - Copies images to `dash/assets/img/`
   - Pushes **ONLY** to `tile-data` branch

3. **tile-updater.yml** (Triggered by tile-loader)
   - Updates documentation in `docs/backlog.md`
   - Generates tile status summaries
   - Posts notifications (if configured)
   - Pushes **ONLY** to `tile-data` branch

4. **tile-data-verify.yml** (On push to tile-data)
   - Validates file integrity
   - Checks for 0-byte files
   - Verifies MIME types
   - Ensures metadata.txt exists
   - Fails if any tile is invalid

### Branch Isolation

The tile automation workflows are **strictly isolated** to the `tile-data` branch:
- ✅ Can push to: `tile-data`
- ❌ Cannot push to: `main`, `dev`, `stage`, `prod`, `pages`

This prevents tile automation from accidentally affecting:
- Production code
- Development branches
- Deployment branches
- GitHub Pages

### Data Cleanup

Each tile workflow includes cleanup steps:
```bash
rm -rf data/ || true  # Before checkout
```

This ensures:
- Fresh data on each run
- No stale tile data
- Consistent state between workflow runs

## GitHub Pages Deployment Flow

The dashboard is deployed to GitHub Pages via a multi-stage workflow system.

### Deployment Architecture

```
dash/ + profiles/ + sources/
         ↓
    dash-build.yml → _site artifact
         ↓
    pages-trigger.yml
         ↓
    pages-deploy.yml → pages branch → GitHub Pages
```

### Workflow Stages

1. **dash-build.yml** - Build Stage
   - Triggered on changes to `dash/`, `profiles/`, `sources/`
   - Copies dashboard files to `_site/` directory
   - Validates HTML structure
   - Validates profile configurations
   - Ensures proper relative paths for GitHub Pages
   - Uploads `_site` as artifact

2. **pages-trigger.yml** - Trigger Stage
   - Triggered on push to `prod` or `tile-data`
   - Triggered on changes to dashboard files
   - Calls `pages-deploy.yml` via workflow_dispatch
   - Can be manually triggered

3. **pages-deploy.yml** - Deploy Stage
   - Downloads `_site` artifact from dash-build
   - Checks out `pages` branch (creates if missing)
   - **Deletes ALL files except .git**
   - Copies `_site/*` to root of pages branch
   - Commits and pushes to pages branch
   - Makes dashboard available at: https://pr-cybr.github.io/PR-SJU/

### Deployment vs Docker

| Aspect | Docker Deployment | GitHub Pages |
|--------|------------------|--------------|
| **Hosting** | Self-hosted (your server) | GitHub-hosted |
| **Port** | 8080 (configurable) | 443 (HTTPS) |
| **URL** | localhost:8080 | pr-cybr.github.io/PR-SJU |
| **Control** | Full control | GitHub manages |
| **Cost** | Infrastructure cost | Free |
| **Use Case** | Local/private deployment | Public dashboard |
| **Updates** | Manual rebuild/restart | Automatic on prod push |

### Best Practices

1. **Development**: Use Docker for local testing
2. **Testing**: Push to `dev` branch, validate with Docker workflow
3. **Staging**: Merge to `main`, test staging deployment
4. **Production**: Merge to `prod`, automatic Pages deployment
5. **Monitoring**: Use `tile-data-verify.yml` to catch tile issues

## Support

For issues or questions:
- Check the main [README.md](README.md)
- Review [GitHub Issues](https://github.com/PR-CYBR/PR-SJU/issues)
- Consult [.specify/](.specify/) documentation
