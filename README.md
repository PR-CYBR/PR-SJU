[![Spec-Kit Validation](https://github.com/PR-CYBR/PR-SJU/actions/workflows/spec-kit.yml/badge.svg?branch=main)](https://github.com/PR-CYBR/PR-SJU/actions/workflows/spec-kit.yml)

# PR-SJU Dashboard

**San Juan Division - PR-CYBR**

[![Spec-Kit Validation](https://github.com/PR-CYBR/PR-SJU/actions/workflows/spec-kit.yml/badge.svg)](https://github.com/PR-CYBR/PR-SJU/actions/workflows/spec-kit.yml)

The PR-SJU Dashboard is a multi-profile ham radio and emergency operations dashboard system for the San Juan Division of Puerto Rico Cyber Operations (PR-CYBR). Built on the VA3HDL hamdashboard with enhanced features including dark mode, profile management, and automated tile updates.

## 🚀 Live Dashboard

**Access the dashboard:** [https://pr-cybr.github.io/PR-SJU/](https://pr-cybr.github.io/PR-SJU/)

## 📋 Features

- **7 Operational Profiles** - Specialized dashboards for different operations
- **Dark/Light Mode** - Toggle theme with persistent localStorage
- **Real-time Updates** - Automated tile fetching every 15 minutes
- **Mobile Responsive** - Works on desktop, tablet, and mobile devices
- **Spec-Bootstrap Architecture** - Built with specification-driven development

## 🎯 Operational Profiles

### TOCOPS - Tactical Operations Center
Emergency management and tactical coordination with weather radar, satellite imagery, and tropical weather monitoring.

### PR-DIV - Puerto Rico Division
General ham radio operations featuring HF propagation, solar conditions, and amateur radio tools.

### WATCHDOGS - Monitoring Operations
Maritime, aviation, and communications monitoring with AIS, ADSB, and earthquake tracking.

### INTEL-HUB - Intelligence Hub
SIGINT, OSINT, and intelligence gathering with spectrum analysis and propagation monitoring.

### PR-SRN - San Juan Radio Network
VHF/UHF operations and repeater monitoring with APRS and band condition tracking.

### PR-M3SH - Mesh Network
Mesh networking, LoRa, and alternative communications including Meshtastic and WSPR.

### PR-SPOT - Satellite & Space Weather
Satellite tracking and space weather monitoring with ISS position and solar activity.

## 🛠️ Local Development

### Prerequisites
- Modern web browser (Chrome, Firefox, Edge, Safari)
- Optional: Local web server for development
- Optional: Docker and Docker Compose for containerized deployment

## 🐳 Deploy with Docker

The easiest way to run the PR-SJU Dashboard is with Docker:

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
   http://localhost:8080
   ```

### Docker Configuration

The Docker deployment includes:
- **nginx:alpine** base image for lightweight serving
- Automatic profile and data directory mounting
- Environment variable support for default profile
- Health checks for container monitoring

### Environment Variables

- `DEFAULT_PROFILE`: Set the default profile to load (e.g., `PR-DIV`, `TOCOPS`)

Example with custom profile:
```bash
DEFAULT_PROFILE=WATCHDOGS docker compose up -d
```

### Stopping the Dashboard

```bash
docker compose down
```

### Building the Docker Image

To build the image manually:
```bash
docker build -t pr-sju-dash .
docker run -p 8080:80 pr-sju-dash
```

### Running Locally (Without Docker)

1. **Clone the repository**
   ```bash
   git clone https://github.com/PR-CYBR/PR-SJU.git
   cd PR-SJU
   ```

2. **Serve the dashboard**
   
   Using Python:
   ```bash
   cd dash
   python3 -m http.server 8000
   ```
   
   Using Node.js:
   ```bash
   cd dash
   npx http-server -p 8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

### Development Structure

```
/
├── dash/                    # Dashboard application
│   ├── index.html          # Entry point
│   ├── hamdash.html        # Main dashboard
│   ├── config.js           # Default configuration
│   ├── js/                 # JavaScript files
│   ├── css/                # Stylesheets
│   └── assets/             # Images and assets
├── profiles/               # Profile configurations
│   ├── TOCOPS/
│   ├── PR-DIV/
│   ├── WATCHDOGS/
│   ├── INTEL-HUB/
│   ├── PR-SRN/
│   ├── PR-M3SH/
│   └── PR-SPOT/
├── sources/                # Tile source URLs
│   └── sources.md
└── .github/workflows/      # Automation workflows
    ├── tile-worker.yml     # Fetch tile data
    ├── tile-loader.yml     # Process and bundle
    ├── tile-updater.yml    # Update dashboard
    └── pages-deploy.yml    # Deploy to GitHub Pages
```

## 🔄 Tile Automation

The dashboard uses a three-stage workflow system:

### 1. Tile Worker (tile-worker.yml)
- Runs every 15 minutes
- Parses `sources/sources.md` for tile URLs
- Fetches latest data from each source
- Stores data in `/data/<tile-id>/` directories

### 2. Tile Loader (tile-loader.yml)
- Triggered when tiles are updated
- Creates JSON bundles for each tile
- Copies images to dashboard assets
- Prepares data for display

### 3. Tile Updater (tile-updater.yml)
- Updates documentation
- Posts notifications (Slack, Notion)
- Maintains tile backlog
- Generates status reports

## 📖 Profile Selection

### In the Dashboard

1. Click the **Settings** button (gear icon)
2. Find the **Profile Selector** dropdown at the top
3. Choose your profile from:
   - TOCOPS
   - PR-DIV
   - WATCHDOGS
   - INTEL-HUB
   - PR-SRN
   - PR-M3SH
   - PR-SPOT
4. Profile loads automatically with custom tiles and menu

### Profile Selection Methods

The dashboard supports multiple ways to select a profile (in priority order):

1. **URL Parameter** - Load a specific profile directly:
   ```
   http://localhost:8080/hamdash.html?profile=WATCHDOGS
   ```

2. **Environment Variable** - Set default profile in Docker:
   ```bash
   DEFAULT_PROFILE=TOCOPS docker compose up -d
   ```

3. **localStorage** - Your last selected profile is automatically saved and restored

### Profile Persistence

Your selected profile is saved to browser localStorage and will be remembered on your next visit.

## 🌓 Dark Mode

Toggle between dark and light themes using the button in the top-right corner (🌙/☀️). Your preference is saved automatically.

## 📚 Spec-Bootstrap Integration

This repository follows the Spec-Bootstrap framework for specification-driven development.

### Key Documents

- **[.specify/constitution.md](.specify/constitution.md)** - Project principles and governance
- **[.specify/spec.md](.specify/spec.md)** - Technical specifications
- **[.specify/plan.md](.specify/plan.md)** - Implementation plan
- **[BRANCHING.md](BRANCHING.md)** - Branching strategy

### Branching Strategy

This repository implements a comprehensive branching scheme to support specification-driven development. See [BRANCHING.md](BRANCHING.md) for detailed documentation on:

- Purpose and usage of each branch (spec, plan, design, impl, dev, main, test, stage, prod, pages, gh-pages, codex)
- Automated pull request workflows between branches
- Branch protection rules and best practices
- Development lifecycle flow from specifications through production

### Workflow

Work flows systematically through branches:

```
spec → plan → impl → dev → main → stage → prod → pages
         ↓                   ↑
       design ──────────────┘
       codex ───────────────────────────────────→ pages
```

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

### Docker Deployment

The Docker build validates all profiles load correctly:

- **docker-build.yml** - Validates Docker container
  - ✅ Builds on: dev, main, stage, prod branches
  - ✅ Health checks dashboard loading
  - ✅ Validates DEFAULT_PROFILE injection
  - ✅ Ensures all 7 profiles accessible
  - ✅ Tests index.html and hamdash.html
  - ✅ Isolated from GitHub Pages workflows

**Run with Docker:**
```bash
docker compose up -d
# Or with specific profile:
DEFAULT_PROFILE=WATCHDOGS docker compose up -d
```

Access at: http://localhost:8080/

### Manual Deployment

To manually trigger a deployment:

1. Go to the [Actions tab](https://github.com/PR-CYBR/PR-SJU/actions)
2. Select "Pages Trigger" workflow
3. Click "Run workflow"
4. Select the `prod` branch
5. Click "Run workflow" button

## 🧪 Acceptance Criteria

The COA-1 implementation meets the following acceptance criteria:

✅ **HTML Validation**
- All HTML files begin with `<!DOCTYPE html>`
- All HTML files contain `<html>`, `<head>`, `<body>` tags
- All internal resource paths are relative (e.g., `./js/...`, `./css/...`)

✅ **Profile Validation**
- All 7 profiles exist: TOCOPS, PR-DIV, WATCHDOGS, INTEL-HUB, PR-SRN, PR-M3SH, PR-SPOT
- Each profile directory contains a valid `config.js`
- No profile directories are empty

✅ **Build Artifact**
- `_site/` bundle is complete with all files
- `_site/index.html` exists
- `_site/hamdash.html` exists
- `_site/profiles/**` contains all 7 profiles
- `_site/sources/**` is present

✅ **Pages Branch**
- Contains ONLY: index.html, hamdash.html, js/, css/, assets/, profiles/, sources/
- Optionally: 404.html, README.md
- No build artifacts or unnecessary files

✅ **Tile Data Isolation**
- tile-worker.yml only pushes to tile-data
- tile-loader.yml only pushes to tile-data
- tile-updater.yml only pushes to tile-data
- Cleanup steps prevent contamination
- NEVER modifies: main, dev, stage, prod, pages

✅ **Docker Deployment**
- Container serves dashboard at http://localhost:8080/
- DEFAULT_PROFILE injection works
- All 7 profiles load correctly
- Health checks pass

✅ **Dashboard Features**
- Dark mode toggle works (🌙/☀️)
- Profile selector loads all 7 profiles
- Dashboard interface displays correctly
- Mobile responsive design functions

## 🔧 Workflow Status Badges

[![Dashboard Build](https://github.com/PR-CYBR/PR-SJU/actions/workflows/dash-build.yml/badge.svg)](https://github.com/PR-CYBR/PR-SJU/actions/workflows/dash-build.yml)
[![Pages Deploy](https://github.com/PR-CYBR/PR-SJU/actions/workflows/pages-deploy.yml/badge.svg)](https://github.com/PR-CYBR/PR-SJU/actions/workflows/pages-deploy.yml)
[![Docker Build](https://github.com/PR-CYBR/PR-SJU/actions/workflows/docker-build.yml/badge.svg)](https://github.com/PR-CYBR/PR-SJU/actions/workflows/docker-build.yml)
[![Tile Data Verify](https://github.com/PR-CYBR/PR-SJU/actions/workflows/tile-data-verify.yml/badge.svg)](https://github.com/PR-CYBR/PR-SJU/actions/workflows/tile-data-verify.yml)

### Branch Protection

The tile automation workflows (tile-worker, tile-loader, tile-updater) are configured to:
- ✅ Push ONLY to the `tile-data` branch
- ❌ Never push to: main, dev, stage, prod, or pages

This ensures tile automation cannot accidentally affect production or deployment branches.

## 🤖 AI-Driven Development

This repository is designed to be used not only by humans but also by AI coding agents. When using an AI agent to scaffold or extend your project:

- **Start with the spec** – Agents should read and refine documents in `.specify/` before writing code
- **Follow the phases** – Honor the Spec Kit workflow: specify, plan, create tasks, then implement
- **Update as you go** – If the agent makes design decisions or adds features, update spec and plan documents
- **Respect the Constitution** – The project's constitution defines non-negotiable rules that agents must follow

## 📝 Contributing

1. Fork the repository
2. Create a feature branch following the branching strategy
3. Update specifications and plans as needed
4. Submit a pull request to the appropriate branch
5. Ensure all workflows pass

## 📄 License

This project is released under the [MIT License](LICENSE).

## 🆘 Support

For issues, questions, or contributions, please:

1. Check existing [Issues](https://github.com/PR-CYBR/PR-SJU/issues)
2. Review the [Discussions](https://github.com/PR-CYBR/PR-SJU/discussions)
3. Consult the [.specify/](.specify/) documentation

## 🔗 Links

- **Live Dashboard:** [https://pr-cybr.github.io/PR-SJU/](https://pr-cybr.github.io/PR-SJU/)
- **Source Repository:** [https://github.com/PR-CYBR/PR-SJU](https://github.com/PR-CYBR/PR-SJU)
- **VA3HDL Hamdashboard:** [https://github.com/VA3HDL/hamdashboard](https://github.com/VA3HDL/hamdashboard)
- **PR-CYBR:** [https://github.com/PR-CYBR](https://github.com/PR-CYBR)

## 🙏 Credits

- **Dashboard Base:** VA3HDL hamdashboard by Pablo Sabbag
- **Framework:** Spec-Bootstrap specification-driven development
- **Organization:** PR-CYBR - Puerto Rico Cyber Operations

---

**Built with ❤️ for the San Juan Division**
