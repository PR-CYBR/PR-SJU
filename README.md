# PR-SJU Dashboard

[![Spec-Kit Validation](https://github.com/PR-CYBR/PR-SJU/actions/workflows/spec-kit.yml/badge.svg)](https://github.com/PR-CYBR/PR-SJU/actions/workflows/spec-kit.yml)
[![Dashboard Build](https://github.com/PR-CYBR/PR-SJU/actions/workflows/dash-build.yml/badge.svg)](https://github.com/PR-CYBR/PR-SJU/actions/workflows/dash-build.yml)
[![Pages Deploy](https://github.com/PR-CYBR/PR-SJU/actions/workflows/pages-deploy.yml/badge.svg)](https://github.com/PR-CYBR/PR-SJU/actions/workflows/pages-deploy.yml)
[![Docker Build](https://github.com/PR-CYBR/PR-SJU/actions/workflows/docker-build.yml/badge.svg)](https://github.com/PR-CYBR/PR-SJU/actions/workflows/docker-build.yml)

**v1.0.0 - Multi-Profile Emergency Operations Dashboard for San Juan Division, PR-CYBR**

The PR-SJU Dashboard is a professional, multi-profile ham radio and emergency operations dashboard system for the Puerto Rico Cyber Operations (PR-CYBR) San Juan Division. It delivers real-time situational awareness through eight specialized operational profiles, automated tile updates, and a robust CI/CD deployment pipeline.

## 🚀 Live Dashboard

**Access the dashboard:** [https://pr-cybr.github.io/PR-SJU/](https://pr-cybr.github.io/PR-SJU/)

## 📑 Table of Contents

- [Features](#-features)
- [Operational Profiles](#-operational-profiles)
- [Architecture Overview](#-architecture-overview)
- [Tile Automation Pipeline](#-tile-automation-pipeline)
- [Profile Configuration](#-profile-configuration)
- [Local Development](#-local-development)
- [Docker Deployment](#-docker-deployment)
- [Multi-Branch CI/CD (COA-1)](#-multi-branch-cicd-coa-1)
- [Directory Structure](#-directory-structure)
- [Testing & Validation](#-testing--validation)
- [Contributing](#-contributing)
- [License](#-license)

## 🎯 Features

The PR-SJU Dashboard v1.0.0 includes the following major capabilities:

- **Multi-Profile Dashboard System** - Eight specialized operational profiles (PR-SJU, TOCOPS, PR-DIV, WATCHDOGS, INTEL-HUB, PR-SRN, PR-M3SH, PR-SPOT) with dynamic loading and configuration
- **Automated Tile Refresh** - Live data updates every 15 minutes through a four-stage workflow pipeline (worker → loader → updater → verify)
- **Dark/Light Mode** - Persistent theme toggle with localStorage-backed user preferences
- **LocalStorage Persistence** - Automatic saving and restoration of selected profile and theme settings across sessions
- **Mobile Responsive Design** - Full 3×3 and 4×3 grid layouts that adapt to desktop, tablet, and mobile viewports
- **Dual Deployment Options** - GitHub Pages for public access and Docker deployment for local/private hosting with environment-based configuration

All features are validated through automated testing and continuous integration workflows.

## 🎯 Operational Profiles

The dashboard supports eight operational profiles, each tailored for specific mission requirements:

### PR-SJU - San Juan Civic Dashboard
General-purpose civic operations dashboard featuring 3×3 grid with Puerto Rico weather radar, satellite imagery, ADS-B flight tracking, HF propagation monitoring, ISS tracking, and maritime AIS vessel tracking. Designed for comprehensive situational awareness across multiple domains.

### TOCOPS - Tactical Operations Center
Emergency management and tactical coordination profile with 3×3 grid focused on weather radar (TJUA), tropical weather systems, lightning detection, Caribbean satellite imagery, wind analysis, sea surface temperatures, and wave height forecasting. Essential for emergency response and disaster preparedness.

### PR-DIV - Puerto Rico Division
Comprehensive ham radio operations featuring a 4×3 grid with HF propagation analysis, solar conditions monitoring, band activity tracking, amateur radio tools, and repeater information. The primary profile for general amateur radio operations across Puerto Rico.

### WATCHDOGS - Monitoring Operations
Surveillance and monitoring operations with 3×3 grid including maritime AIS tracking, aviation ADS-B monitoring, communications signal analysis, earthquake tracking, and multi-domain situational awareness. Optimized for continuous operational monitoring.

### INTEL-HUB - Intelligence Hub
SIGINT and OSINT operations utilizing a 4×3 grid with spectrum analysis, propagation monitoring, signal intelligence gathering, open-source intelligence tools, and electronic warfare monitoring capabilities. Designed for intelligence collection and analysis.

### PR-SRN - San Juan Radio Network
VHF/UHF operations and repeater monitoring with 3×3 grid featuring APRS packet tracking, band condition analysis, local repeater status, VHF/UHF propagation, and emergency frequency monitoring. Tailored for local radio network operations.

### PR-M3SH - Mesh Network
Mesh networking and alternative communications with 3×3 grid including LoRa monitoring, Meshtastic network status, WSPR propagation beacons, mesh topology visualization, and off-grid communications capabilities. Focused on resilient communication systems.

### PR-SPOT - Satellite & Space Weather
Satellite tracking and space weather monitoring utilizing a 4×3 grid with ISS position tracking, satellite pass predictions, solar activity monitoring, geomagnetic conditions, space weather forecasts, and RF propagation impacts. Essential for space-based communications planning.

## 🏗️ Architecture Overview

The PR-SJU Dashboard is built on a clean, modular architecture designed for maintainability and scalability:

### Frontend Dashboard (`dash/`)
The dashboard frontend consists of static HTML files with embedded JavaScript that dynamically load profile configurations. The core files include:
- `index.html` - Landing page with profile selection
- `hamdash.html` - Main dashboard application with tile rendering engine
- `config.js` - Default configuration and fallback settings
- `satellite.js` & `wheelzoom.js` - Utility libraries for interactive features

### ES Module Profile System (`profiles/`)
Each operational profile is defined as an ES6 module (`config.js`) within its dedicated directory. Profile configurations export a structured object containing:
- **id**: Unique profile identifier matching the directory name
- **topBarCenterText**: Dashboard header text for the profile
- **grid**: Layout definition (columns and rows)
- **menu**: Navigation menu items with URLs and display settings
- **tiles**: Array of dashboard tiles with titles and data sources
- **tileDelay**: Rotation intervals in milliseconds for each tile
- **rss**: RSS feed configurations for the news ticker

Profiles are loaded dynamically at runtime using ES6 `import()` statements, enabling clean separation and easy extensibility.

### Build Artifact (`_site/`)
The CI/CD pipeline generates a complete `_site/` directory containing all files required for deployment:
- Validated HTML files with relative paths
- Complete profile configurations
- JavaScript and CSS assets
- Source definitions for tile automation
- Ready for direct deployment to GitHub Pages or web server

### Asset and Tile-Data Isolation
The architecture maintains strict separation between:
- **Dashboard assets** (`dash/`, `profiles/`) - Managed in main branch flow (spec → plan → impl → dev → main → prod → pages)
- **Tile data** (`data/`, managed on `tile-data` branch) - Completely isolated, updated every 15 minutes via automated workflows, never contaminating production branches

This isolation ensures tile automation can run continuously without interfering with dashboard deployments, while the dashboard can be updated independently of tile data.

### Dynamic Profile Loading
The profile loader (`loadProfileConfig()` in `hamdash.html`) implements a three-tier selection system:
1. **URL parameter**: `?profile=WATCHDOGS` takes highest priority
2. **LocalStorage**: Previously selected profile is restored automatically
3. **Default profile**: Falls back to PR-DIV if no selection exists

This design provides flexibility for direct linking, user preference persistence, and sensible defaults.

## 🔄 Tile Automation Pipeline

The dashboard employs a four-stage automated workflow system for tile data management, completely isolated on the `tile-data` branch:

### Stage 1: tile-worker.yml - Data Collection
**Trigger**: Scheduled every 15 minutes via cron  
**Function**: The worker workflow is the data ingestion stage:
- Parses `sources/sources.md` to extract tile source URLs
- Fetches latest data from each configured tile source
- Downloads images, JSON data, and metadata
- Stores raw data in `/data/<tile-id>/` directories on the `tile-data` branch
- Includes cleanup step (`rm -rf data/`) before branch operations to prevent contamination
- **Isolation guarantee**: Only pushes to `tile-data` branch, never modifies main, dev, stage, prod, or pages

### Stage 2: tile-loader.yml - Data Processing
**Trigger**: Automatically triggered when tile-worker completes  
**Function**: The loader workflow processes raw data into dashboard-ready formats:
- Creates structured JSON bundles for each tile
- Optimizes and copies images to dashboard assets directory
- Generates metadata files for tile status tracking
- Prepares data packages for consumption by the dashboard
- Includes cleanup step at job start to ensure clean working directory
- **Isolation guarantee**: Only pushes to `tile-data` branch, never modifies production branches

### Stage 3: tile-updater.yml - Documentation Maintenance
**Trigger**: Automatically triggered after tile-loader completes  
**Function**: The updater workflow maintains tile documentation and status:
- Updates tile backlog with latest fetch timestamps
- Posts notifications to configured channels (Slack, Notion)
- Generates status reports for monitoring
- Maintains historical records of tile updates
- Includes cleanup step at job start
- **Isolation guarantee**: Only pushes to `tile-data` branch, documentation updates isolated

### Stage 4: tile-data-verify.yml - Quality Assurance
**Trigger**: Runs on every push to `tile-data` branch  
**Function**: The verification workflow validates tile data integrity:
- Checks for zero-byte files (indicates failed downloads)
- Verifies `METADATA.txt` exists for each tile
- Validates MIME types of downloaded files
- Ensures file sizes are within expected ranges
- **Fails the workflow** if any tile data is invalid, preventing bad data propagation

### Critical Isolation Architecture

The tile automation pipeline is architecturally isolated from the main dashboard deployment:

**Why Tile-Data Must Stay Isolated**:
- Tile data updates every 15 minutes (96 times per day)
- Dashboard code changes are infrequent (on-demand deployments)
- Mixing them would create 96+ daily deployments unnecessarily
- Prevents tile failures from breaking dashboard deployments
- Allows independent testing and rollback of each system

**How Isolation is Enforced**:
- Explicit branch guards: `if: github.ref == 'refs/heads/tile-data'`
- Cleanup steps before branch switches: `rm -rf data/ || true`
- Comments in workflow files: "ONLY push to tile-data branch"
- No workflow checks out or modifies: main, dev, stage, prod, or pages
- Separate artifact handling for tile-data vs. dashboard builds

The workflows run fully automatically once configured, requiring no manual intervention for normal operations.

## ⚙️ Profile Configuration

The PR-SJU Dashboard uses a clean ES6 module-based profile configuration system that enables extensibility and maintainability.

### Profile Structure

Each profile is defined in `profiles/<PROFILE-NAME>/config.js` as an ES6 module:

```javascript
export default {
  id: "TOCOPS",                              // Unique identifier
  topBarCenterText: "TOCOPS – Operations",   // Dashboard header text
  
  grid: {
    columns: 3,                              // Grid width
    rows: 3                                  // Grid height
  },
  
  menu: [                                     // Menu items (left/right side)
    ["Color", "Label", "URL", "Side"]
  ],
  
  tiles: [                                    // Dashboard tiles
    ["Tile Title", "Source URL"],
    ["Multi-Source", "URL1", "URL2", "URL3"] // Rotating tiles
  ],
  
  tileDelay: [                               // Rotation intervals (ms)
    60000,  // Tile 1: 60 seconds
    0       // Tile 2: No rotation
  ],
  
  rss: [                                      // RSS feed ticker
    ["Feed URL", RefreshInterval]
  ]
};
```

### Profile Selection Methods

The dashboard supports multiple profile selection methods with clear priority:

**1. URL Parameter (Highest Priority)**
```
https://pr-cybr.github.io/PR-SJU/hamdash.html?profile=WATCHDOGS
```
Directly loads the specified profile, overriding all other settings.

**2. Environment Variable (Docker Only)**
```bash
DEFAULT_PROFILE=TOCOPS docker compose up -d
```
Sets the default profile via Docker environment variable injection.

**3. LocalStorage (User Preference)**
The dashboard automatically saves the last selected profile to browser localStorage and restores it on subsequent visits.

**4. Default Fallback**
If no profile is specified through any method, the dashboard defaults to PR-DIV.

### Creating a New Profile

1. Create directory: `profiles/NEW-PROFILE/`
2. Create `config.js` with required fields (id, grid, menu, tiles)
3. Add optional fields (tileDelay, rss) as needed
4. Profile will be automatically discovered and validated by CI/CD
5. Add profile description to README.md

The profile validation workflow (`profile-validate.yml`) automatically validates syntax, required fields, and ES6 module import compatibility.

## 💻 Local Development

### Prerequisites
- Modern web browser (Chrome, Firefox, Edge, Safari)
- Python 3.x or Node.js (for local HTTP server)
- Git for version control

### Running Locally

**Option 1: Python HTTP Server**
```bash
cd /home/runner/work/PR-SJU/PR-SJU
cd dash
python3 -m http.server 8000
```

**Option 2: Node.js HTTP Server**
```bash
cd /home/runner/work/PR-SJU/PR-SJU
cd dash
npx http-server -p 8000
```

**Access the dashboard:**
```
http://localhost:8000/index.html
http://localhost:8000/hamdash.html
http://localhost:8000/hamdash.html?profile=TOCOPS
```

### Development Workflow

1. Make changes to dashboard files in `dash/` or profile configs in `profiles/`
2. Refresh browser to see changes (no build step required for local development)
3. Test profile loading by accessing `hamdash.html?profile=<PROFILE-NAME>`
4. Verify dark mode toggle and localStorage persistence
5. Commit changes following branching strategy (spec → plan → impl → dev → main)

## 🐳 Docker Deployment

The PR-SJU Dashboard is containerized using Docker with nginx:alpine as the base image, providing a lightweight, production-ready deployment option.

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/PR-CYBR/PR-SJU.git
   cd PR-SJU
   ```

2. **Start with Docker Compose**
   ```bash
   docker compose up -d
   ```

3. **Access the dashboard**
   ```
   http://localhost:8080/
   ```

### Docker Configuration

The Docker deployment includes:
- **nginx:alpine** base image for lightweight serving (< 50MB)
- Complete dashboard file structure (dash/, profiles/, sources/)
- Environment variable support for DEFAULT_PROFILE injection
- Container health checks for monitoring (`curl http://localhost/`)
- CORS configuration for tile data access
- Automatic nginx startup with custom configuration

### Environment Variables

**DEFAULT_PROFILE**: Sets the default profile loaded when accessing the dashboard

Available profiles: `PR-SJU`, `TOCOPS`, `PR-DIV`, `WATCHDOGS`, `INTEL-HUB`, `PR-SRN`, `PR-M3SH`, `PR-SPOT`

Example with custom profile:
```bash
DEFAULT_PROFILE=WATCHDOGS docker compose up -d
```

Example with INTEL-HUB:
```bash
DEFAULT_PROFILE=INTEL-HUB docker compose up -d
```

### Docker Commands

**Start the dashboard:**
```bash
docker compose up -d
```

**View logs:**
```bash
docker compose logs -f
```

**Stop the dashboard:**
```bash
docker compose down
```

**Rebuild and restart:**
```bash
docker compose up -d --build
```

### Building the Docker Image Manually

To build the image without Docker Compose:
```bash
docker build -t pr-sju-dash .
docker run -d -p 8080:80 --name pr-sju pr-sju-dash
```

Access at: `http://localhost:8080/`

### Health Checks

The Docker container includes built-in health checks that validate:
- nginx is running and responding
- Dashboard files are accessible
- HTTP 200 response from index.html

Health status can be checked with:
```bash
docker ps
```
Look for "healthy" status in the STATUS column.

### Docker Deployment vs GitHub Pages

| Feature | Docker | GitHub Pages |
|---------|--------|--------------|
| **Hosting** | Self-hosted, local or private | Public, GitHub-hosted |
| **Profile Selection** | Environment variable injection | URL parameter or localStorage |
| **Tile Data** | Separate branch (tile-data) | Separate branch (tile-data) |
| **Updates** | Manual docker pull/rebuild | Automatic via COA-1 pipeline |
| **Cost** | Server resources | Free (public repos) |
| **Use Case** | Private operations, testing | Public dashboard, production |

## 🌐 COA-1: Multi-Branch CI/CD Deployment Pipeline

The PR-SJU Dashboard implements **COA-1** (Course of Action 1), a complete, fully automated, multi-branch Spec-Kit deployment pipeline with tile-data isolation and Docker compatibility.

### Architecture Overview

```
┌──────────────────────────────────────────────────────────┐
│                  Multi-Branch CI/CD Flow                  │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  spec → plan → impl → dev → main → stage → prod → pages │
│           ↓                    ↑                          │
│         design ────────────────┘                          │
│         codex ─────────────────────────────────────→ pages│
│                                                           │
│  tile-data (isolated) ─────────── NEVER touches prod     │
│                                                           │
└──────────────────────────────────────────────────────────┘
```

### Deployment Flow

#### 1. **Dashboard Build (dash-build.yml)**
Triggered on changes to:
- `/dash/**` - Dashboard files
- `/profiles/**` - Profile configurations  
- `/sources/**` - Tile source definitions
- Branches: `dev`, `main`, `prod`

This workflow:
- ✅ Validates HTML structure (DOCTYPE, html, head, body tags)
- ✅ Validates all 7 profile configurations exist with config.js
- ✅ Ensures relative paths for GitHub Pages compatibility
- ✅ Checks for required files (index.html, hamdash.html)
- ✅ Validates profile directories are not empty
- ✅ Displays directory tree and HTML file previews
- ✅ Creates `_site/` bundle with all required files
- ✅ Uploads `_site` artifact for deployment

#### 2. **Pages Trigger (pages-trigger.yml)**
Automatically triggered when:
- Changes are pushed to **`prod`** branch only
- Dashboard, profile, or source files are modified

This workflow:
- ✅ Programmatically dispatches pages-deploy workflow
- ✅ Prevents infinite loops with branch protection
- ✅ Can be manually triggered via workflow_dispatch
- ❌ **Does NOT trigger on tile-data** (isolation enforced)

#### 3. **Pages Deploy (pages-deploy.yml)**
Deploys to GitHub Pages:
- ✅ Downloads the `_site` artifact from build job
- ✅ Checks out or creates the `pages` branch
- ✅ Deletes ALL files except `.git` directory
- ✅ Copies `_site/*` to root of pages branch
- ✅ Commits with github-actions[bot] credentials
- ✅ Pushes to pages branch
- ✅ Makes dashboard accessible at: https://pr-cybr.github.io/PR-SJU/

**Concurrency Control:**
```yaml
concurrency:
  group: "pages"
  cancel-in-progress: false
```

### Tile Data Isolation (MANDATORY)

The **tile-data** branch is **completely isolated** from the main deployment pipeline:

#### Tile Workflows (Isolated to tile-data branch ONLY)

1. **tile-worker.yml** - Fetches tile data every 15 minutes
   - ✅ Parses sources/sources.md for tile URLs
   - ✅ Downloads latest tile data
   - ✅ Stores in data/ directory
   - ✅ Cleanup step BEFORE branch switch (`rm -rf data/`)
   - ✅ **ONLY pushes to tile-data branch**
   - ❌ **NEVER modifies: main, dev, stage, prod, pages**

2. **tile-loader.yml** - Processes tile data
   - ✅ Creates JSON bundles for each tile
   - ✅ Copies images to dashboard assets
   - ✅ Cleanup step at job start
   - ✅ **ONLY pushes to tile-data branch**
   - ❌ **NEVER modifies: main, dev, stage, prod, pages**

3. **tile-updater.yml** - Updates documentation
   - ✅ Maintains tile backlog
   - ✅ Generates status reports
   - ✅ Cleanup step at job start
   - ✅ **ONLY pushes to tile-data branch**
   - ❌ **NEVER modifies: main, dev, stage, prod, pages**

4. **tile-data-verify.yml** - Validates tile data integrity
   - ✅ Triggers on: Push to tile-data branch
   - ✅ Validates file existence and sizes
   - ✅ Checks MIME types
   - ✅ Verifies metadata.txt for each tile
   - ✅ Fails workflow if any tile is invalid

**Isolation Guarantees:**
- All tile workflows include explicit branch guards
- Comments in workflows clearly state: "ONLY push to tile-data branch"
- Cleanup steps prevent contamination: `rm -rf data/ || true`
- No tile workflow ever checks out or modifies: main, dev, stage, prod, or pages

### Docker Build Validation

The Docker build validates all profiles load correctly:

- **docker-build.yml** - Validates Docker container
  - ✅ Builds on: dev, main, stage, prod branches
  - ✅ Health checks dashboard loading
  - ✅ Validates DEFAULT_PROFILE injection
  - ✅ Ensures all 8 profiles accessible
  - ✅ Tests index.html and hamdash.html
  - ✅ Isolated from GitHub Pages workflows

**Run with Docker:**
```bash
docker compose up -d
# Or with specific profile:
DEFAULT_PROFILE=WATCHDOGS docker compose up -d
```

Access at: http://localhost:8080/

### Manual Deployment Trigger

To manually trigger a GitHub Pages deployment:

1. Go to the [Actions tab](https://github.com/PR-CYBR/PR-SJU/actions)
2. Select "Pages Trigger" workflow
3. Click "Run workflow"
4. Select the `prod` branch
5. Click "Run workflow" button

The deployment will proceed through the standard pipeline: build validation → artifact creation → pages branch deployment.

### Branch Flow Summary

The complete branch flow for code changes:

```
spec (specifications)
  ↓
plan (implementation planning)
  ↓
impl (active implementation) ← design (design artifacts)
  ↓
dev (development integration)
  ↓
main (stable baseline)
  ↓
stage (pre-production testing)
  ↓
prod (production code)
  ↓
pages (GitHub Pages deployment) ← codex (documentation)

tile-data (ISOLATED - never touches other branches)
```

Each transition is validated by automated workflows. See [BRANCHING.md](BRANCHING.md) for detailed branch documentation.

## 📂 Directory Structure

```
PR-SJU/
├── .github/
│   └── workflows/
│       ├── dash-build.yml           # Dashboard build & validation
│       ├── pages-trigger.yml        # Triggers GitHub Pages deployment
│       ├── pages-deploy.yml         # Deploys to GitHub Pages
│       ├── tile-worker.yml          # Fetches tile data (15 min)
│       ├── tile-loader.yml          # Processes tile data
│       ├── tile-updater.yml         # Updates tile documentation
│       ├── tile-data-verify.yml     # Validates tile integrity
│       ├── docker-build.yml         # Docker container validation
│       ├── profile-validate.yml     # Profile config validation
│       ├── spec-kit.yml             # Spec-Kit validation
│       └── [additional workflows]   # Branch automation
├── dash/
│   ├── index.html                   # Landing page
│   ├── hamdash.html                 # Main dashboard application
│   ├── config.js                    # Default configuration
│   ├── satellite.js                 # Satellite tracking utilities
│   └── wheelzoom.js                 # Image zoom functionality
├── profiles/
│   ├── PR-SJU/
│   │   └── config.js                # San Juan Civic Dashboard
│   ├── TOCOPS/
│   │   └── config.js                # Tactical Operations Center
│   ├── PR-DIV/
│   │   └── config.js                # Puerto Rico Division
│   ├── WATCHDOGS/
│   │   └── config.js                # Monitoring Operations
│   ├── INTEL-HUB/
│   │   └── config.js                # Intelligence Hub
│   ├── PR-SRN/
│   │   └── config.js                # San Juan Radio Network
│   ├── PR-M3SH/
│   │   └── config.js                # Mesh Network
│   └── PR-SPOT/
│       └── config.js                # Satellite & Space Weather
├── sources/
│   └── sources.md                   # Tile source URL definitions
├── docker/
│   ├── entrypoint.sh                # Docker startup script
│   └── nginx.conf                   # nginx web server config
├── infra/
│   └── [terraform files]            # Infrastructure as code
├── scripts/
│   └── tfc_sync.sh                  # Terraform Cloud sync
├── Dockerfile                        # Docker image definition
├── docker-compose.yml                # Docker Compose configuration
├── README.md                         # This file
├── BRANCHING.md                      # Branch strategy documentation
├── DOCKER.md                         # Docker deployment guide
├── IMPLEMENTATION_SUMMARY.md         # COA-1 implementation details
├── PROFILE_LOADING_FIX_SUMMARY.md    # Profile system improvements
├── TESTING_CHECKLIST.md              # Validation procedures
└── LICENSE                           # MIT License
```

## 🧪 Testing & Validation

The PR-SJU Dashboard includes comprehensive automated testing and validation:

### Profile Configuration Validation

**profile-validate.yml** - Automated on every PR and push:
- ✅ Syntax validation (ES6 module format)
- ✅ Required field validation (id, grid, menu, tiles)
- ✅ ES module import testing
- ✅ Structure validation for all 8 profiles
- ✅ Prevents broken configs from merging

### HTML Validation

**dash-build.yml** - Runs on dashboard file changes:
- ✅ DOCTYPE declaration (`<!DOCTYPE html>`)
- ✅ Required HTML elements (`<html>`, `<head>`, `<body>`)
- ✅ Relative path validation for GitHub Pages
- ✅ File existence checks (index.html, hamdash.html)
- ✅ Directory structure validation

### Tile Data Validation

**tile-data-verify.yml** - Runs on tile-data branch updates:
- ✅ Zero-byte file detection
- ✅ METADATA.txt presence validation
- ✅ MIME type verification
- ✅ File size range checks
- ✅ Workflow fails if any tile is invalid

### Docker Container Validation

**docker-build.yml** - Validates containerized deployment:
- ✅ Image builds successfully
- ✅ Container starts and passes health checks
- ✅ All 8 profiles are accessible
- ✅ index.html and hamdash.html load correctly
- ✅ DEFAULT_PROFILE injection works

### Manual Testing Checklist

From [TESTING_CHECKLIST.md](TESTING_CHECKLIST.md):

**Profile Loading:**
- [ ] All 8 profiles appear in dropdown selector
- [ ] Each profile loads without errors
- [ ] Correct grid layout renders (3×3 or 4×3)
- [ ] Top bar displays profile-specific text
- [ ] Tiles load and display content

**User Interface:**
- [ ] Dark mode toggle functions correctly
- [ ] Theme preference persists across sessions
- [ ] Profile selection persists in localStorage
- [ ] Mobile responsive layout works
- [ ] Menu items function correctly

**Tile Functionality:**
- [ ] Images load and display
- [ ] iFrame tiles load content
- [ ] Multi-source tiles rotate automatically
- [ ] Tile rotation respects tileDelay settings
- [ ] RSS ticker scrolls and displays feeds

### Continuous Integration

All workflows are integrated into the PR process:
- Profile configs validated before merge
- Dashboard build artifacts created and tested
- Docker images built and health-checked
- Tile data integrity validated automatically
- No broken code reaches production branches

## 🤝 Contributing

We welcome contributions to the PR-SJU Dashboard following the PR-CYBR development workflow.

### Development Process

1. **Fork the repository**
   ```bash
   git clone https://github.com/PR-CYBR/PR-SJU.git
   cd PR-SJU
   ```

2. **Follow the Spec-Bootstrap workflow**
   - Start in `spec` branch for requirements and specifications
   - Move to `plan` branch for implementation planning
   - Use `design` branch for UI/UX work
   - Develop in `impl` branch for implementation
   - Test in `dev` branch for integration

3. **Create focused pull requests**
   - Follow the branching strategy documented in [BRANCHING.md](BRANCHING.md)
   - Ensure all CI/CD workflows pass
   - Include clear descriptions of changes
   - Reference related issues

4. **Code quality requirements**
   - Validate HTML files (DOCTYPE, proper structure)
   - Use relative paths for all internal resources
   - Follow ES6 module syntax for profile configs
   - Include all required profile fields (id, grid, menu, tiles)
   - Test locally before submitting PR

5. **Profile contributions**
   - Create new profile directory: `profiles/YOUR-PROFILE/`
   - Include complete `config.js` with all required fields
   - Add 2-3 sentence description to README
   - Validate with `profile-validate.yml` workflow

### Branching Strategy

See [BRANCHING.md](BRANCHING.md) for complete details on:
- Branch purposes and workflows
- Automated PR creation between branches
- Branch protection rules
- Development lifecycle

### Pull Request Guidelines

- **Title**: Clear, concise description of changes
- **Description**: Explain what changes were made and why
- **Testing**: Describe how changes were tested
- **Screenshots**: Include for UI changes
- **Checklist**: Complete all applicable items:
  - [ ] Follows branching strategy
  - [ ] All workflows pass
  - [ ] Documentation updated
  - [ ] Tested locally
  - [ ] No hardcoded secrets

### Code Review Process

All PRs undergo automated and manual review:
- Automated validation via GitHub Actions
- Profile config validation
- HTML structure validation
- Docker build validation
- Manual code review by maintainers

## 📄 License

This project is released under the [MIT License](LICENSE).

```
MIT License

Copyright (c) 2024 PR-CYBR

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🔗 Links & Resources

- **Live Dashboard**: [https://pr-cybr.github.io/PR-SJU/](https://pr-cybr.github.io/PR-SJU/)
- **Source Repository**: [https://github.com/PR-CYBR/PR-SJU](https://github.com/PR-CYBR/PR-SJU)
- **Issues**: [https://github.com/PR-CYBR/PR-SJU/issues](https://github.com/PR-CYBR/PR-SJU/issues)
- **Discussions**: [https://github.com/PR-CYBR/PR-SJU/discussions](https://github.com/PR-CYBR/PR-SJU/discussions)
- **PR-CYBR Organization**: [https://github.com/PR-CYBR](https://github.com/PR-CYBR)
- **VA3HDL Hamdashboard** (upstream): [https://github.com/VA3HDL/hamdashboard](https://github.com/VA3HDL/hamdashboard)

## 🙏 Acknowledgments

- **Dashboard Foundation**: VA3HDL hamdashboard by Pablo Sabbag
- **Framework**: Spec-Bootstrap specification-driven development
- **Organization**: PR-CYBR - Puerto Rico Cyber Operations
- **Contributors**: All contributors to the PR-SJU Dashboard project

---

**Built with ❤️ for the San Juan Division by PR-CYBR**

*Version 1.0.0 - Professional multi-profile emergency operations dashboard*
