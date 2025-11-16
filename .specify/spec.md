# Specification

## Overview
This document contains the technical specifications for projects built using this Spec-Kit template.

## Template Specifications

### Directory Structure
```
/
├── .specify/
│   ├── constitution.md    # Project principles and governance
│   ├── spec.md           # This file - technical specifications
│   ├── plan.md           # Implementation planning
│   └── tasks/            # Individual task specifications
├── .github/
│   └── workflows/
│       └── spec-kit.yml  # Automation workflow
├── infra/                # Terraform infrastructure configuration
│   ├── main.tf           # Main Terraform configuration
│   ├── variables.tf      # Variable definitions
│   ├── variables.tfvars  # Variable values template
│   ├── providers.tf      # Provider configurations
│   └── outputs.tf        # Output definitions
└── README.md             # Project documentation
```

### Spec-Kit Commands

The following commands should be available for managing specifications:

#### /speckit.constitution
- **Purpose**: Review or update the project constitution
- **Usage**: Displays constitution principles and governance rules
- **Implementation**: Read and display `.specify/constitution.md`

#### /speckit.specify
- **Purpose**: Review or update technical specifications
- **Usage**: Displays current specifications
- **Implementation**: Read and display `.specify/spec.md`

#### /speckit.plan
- **Purpose**: Review or update the implementation plan
- **Usage**: Displays high-level project plan
- **Implementation**: Read and display `.specify/plan.md`

#### /speckit.tasks
- **Purpose**: List and manage individual tasks
- **Usage**: Displays all tasks from the tasks directory
- **Implementation**: List and display files in `.specify/tasks/`

### Workflow Requirements

The `.github/workflows/spec-kit.yml` workflow should:
1. Validate markdown syntax in specification files
2. Check for broken links in documentation
3. Ensure required files exist
4. Run on pull requests and pushes to main branch

### Branch-Specific Workflows

Each branch in the comprehensive branching scheme has dedicated workflows:

#### Specification and Planning Workflows
- `spec.yml`: Validates specification documents in the `spec` branch
- `plan.yml`: Validates planning documents in the `plan` branch
- `design.yml`: Validates design artifacts in the `design` branch

#### Development Workflows
- `impl.yml`: Runs implementation-specific validation in the `impl` branch
- `dev.yml`: Executes development tasks in the `dev` branch
- `test.yml`: Runs comprehensive test suites in the `test` branch

#### Deployment Workflows
- `stage.yml`: Deploys to staging environment from the `stage` branch
- `prod.yml`: Handles production deployment from the `prod` branch
- `pages.yml`: Builds and deploys documentation from the `pages` branch
- `gh-pages.yml`: Alternative GitHub Pages deployment from the `gh-pages` branch
- `codex.yml`: Validates knowledge base content in the `codex` branch

#### Automated Pull Request Workflows
- `auto-pr-spec-to-plan.yml`: Promotes specifications to planning
- `auto-pr-plan-to-impl.yml`: Promotes plans to implementation
- `auto-pr-design-to-impl.yml`: Integrates design into implementation
- `auto-pr-impl-to-dev.yml`: Integrates implementation into development
- `auto-pr-dev-to-main.yml`: Promotes development to stable baseline
- `auto-pr-main-to-stage.yml`: Promotes stable code to staging
- `auto-pr-main-to-test.yml`: Synchronizes testing with stable code
- `auto-pr-stage-to-prod.yml`: Promotes staging to production
- `auto-pr-prod-to-pages.yml`: Updates documentation from production
- `auto-pr-codex-to-pages.yml`: Publishes knowledge base to documentation

### Infrastructure as Code

All repositories derived from this template include a baseline Terraform configuration in the `infra/` directory. This provides:

#### PR-CYBR Agent Standardization
- Consistent variable schema across all PR-CYBR agents
- Standard variables: `agent_id`, `agent_role`, `environment`, `dockerhub_user`, `notion_page_id`
- Alignment with PR-CYBR `agent-variables.tf` specification

#### Terraform Configuration Structure
- **main.tf**: Core infrastructure configuration with commented backend block
- **variables.tf**: Variable definitions with validation rules
- **variables.tfvars**: Template with placeholder values (safe to commit)
- **providers.tf**: Provider configurations (Terraform Cloud, GitHub) ready for initialization
- **outputs.tf**: Standardized outputs for agent identification and connection info

#### Security and Best Practices
- Sensitive values injected via environment variables (`TF_VAR_*`)
- No secrets or environment-specific data in version control
- Backend configuration commented out by default for safe initialization
- Validation rules ensure data consistency

#### Initialization Workflow
```bash
cd infra
terraform init -backend=false
terraform fmt
terraform validate
terraform plan -input=false -var-file=variables.tfvars
```

See `.specify/tasks/infra-bootstrap.md` for detailed initialization instructions.

### Extensibility

This template is designed to be extended with:
- Technology-specific tooling (linters, build systems, test frameworks)
- Additional automation workflows
- Custom task management integrations
- Project-specific specifications
- Infrastructure resources in `infra/main.tf` based on agent requirements

## Non-Functional Requirements

### Maintainability
- All specification files use Markdown format
- Clear, hierarchical organization
- Version controlled alongside code

### Portability
- No technology-specific dependencies in the template
- Cross-platform compatibility
- Standard file formats

### Usability
- Clear documentation in README
- Self-explanatory directory structure
- Minimal learning curve for new users

## PR-SJU Dashboard System

### Overview
The PR-SJU Dashboard is a multi-profile ham radio and emergency operations monitoring system designed for the San Juan Division of PR-CYBR. It provides real-time visualization of weather, space weather, propagation conditions, and operational status across seven specialized profiles.

### Architecture

#### Frontend Components
- **Dashboard Interface** (`/dash/hamdash.html`): Main dashboard with tile grid display
- **Landing Page** (`/dash/index.html`): Entry point and welcome screen
- **Profile System** (`/profiles/*/config.js`): Modular profile configurations
- **Theme System**: Dark/light mode with CSS variables and localStorage persistence

#### Profile System
The dashboard supports seven operational profiles, each with custom tile configurations:

1. **TOCOPS** - Tactical Operations Center
   - Weather radar and satellite imagery
   - Tropical weather monitoring
   - Emergency coordination tools

2. **PR-DIV** - Puerto Rico Division
   - HF propagation conditions
   - Solar activity monitoring
   - Amateur radio tools and resources

3. **WATCHDOGS** - Monitoring Operations
   - AIS maritime tracking
   - ADSB aviation tracking
   - Earthquake and lightning monitoring

4. **INTEL-HUB** - Intelligence Hub
   - Spectrum analysis
   - SIGINT resources
   - Propagation and ionospheric monitoring

5. **PR-SRN** - San Juan Radio Network
   - VHF/UHF band conditions
   - APRS tracking
   - Repeater coordination

6. **PR-M3SH** - Mesh Network
   - Mesh networking status
   - LoRa and alternative communications
   - WSPR tracking

7. **PR-SPOT** - Satellite & Space Weather
   - Satellite tracking
   - Space weather conditions
   - Ionospheric monitoring

#### Automation System
Three-stage GitHub Actions workflow for automated tile updates:

1. **Tile Worker** (`tile-worker.yml`)
   - Scheduled execution every 15 minutes
   - Parses `sources/sources.md` for tile URLs
   - Fetches and stores tile data
   - Validates content and generates metadata
   - **Pushes data only to `tile-data` branch** to avoid protected branch conflicts

2. **Tile Loader** (`tile-loader.yml`)
   - Triggered by tile-worker completion
   - Creates JSON bundles for each tile
   - Processes and optimizes images
   - Prepares data for dashboard consumption
   - **Commits bundles only to `tile-data` branch**

3. **Tile Updater** (`tile-updater.yml`)
   - Updates dashboard documentation
   - Generates status reports
   - Posts notifications to Slack and Notion
   - Maintains tile backlog
   - **Commits updates only to `tile-data` branch**

4. **Pages Deploy** (`pages-deploy.yml`)
   - Triggered on push to `prod` branch
   - Copies `/dash/` contents to temporary directory
   - Switches to `pages` branch
   - Clears pages branch (except .git)
   - Deploys dashboard files to root of `pages` branch
   - Commits and pushes to `pages` branch for GitHub Pages hosting

#### Deployment
- **GitHub Pages** deployment from `prod` branch to `pages` branch
- Dashboard contents from `/dash/` directory deployed to root of `pages` branch
- Static site generation with optimized assets
- CDN delivery for global access
- Custom domain support

#### Branch Protection and Data Isolation
- **Protected Branches**: `main`, `dev`, `test`, `stage`, `prod`, `pages` - no direct pushes from automation
- **Tile Data Branch**: `tile-data` - dedicated branch for automated tile data commits
  - All tile worker workflows push only to `tile-data` branch
  - Tile metadata and generated artifacts stored separately from main codebase
  - Prevents permission conflicts with protected branches
  - Allows continuous tile updates without affecting production code

### UI/UX Features

#### Dark Mode Toggle
- Persistent theme selection via localStorage
- CSS variable-based theming system
- Smooth transitions between modes
- Icon indicator (🌙/☀️) in top-right corner

#### Profile Selector
- Dropdown in dashboard setup page
- Dynamic config loading from `/profiles/<name>/config.js`
- Automatic tile and menu updates
- Profile persistence across sessions

#### Responsive Design
- Mobile-first approach
- Tablet and desktop optimizations
- Touch-friendly controls
- Adaptive grid layout

### Data Flow

```
sources/sources.md (URLs)
        ↓
tile-worker.yml (fetch)
        ↓
data/<tile-id>/latest.* (storage)
        ↓
tile-loader.yml (process)
        ↓
dash/tiles/<tile-id>.json (bundles)
        ↓
hamdash.html (display)
```

### Configuration Format

Profile configurations use ES6 module format:

```javascript
export default {
  grid: {
    columns: 4,
    rows: 3
  },
  menu: [
    ["color", "label", "url", "scale", "side"]
  ],
  tiles: [
    ["title", "image_url"]
  ]
};
```

### Security Considerations
- No sensitive data in configuration files
- All external URLs are validated
- Content Security Policy headers
- HTTPS-only deployment
- No client-side data storage of credentials

### Performance Requirements
- Initial page load < 3 seconds
- Tile refresh < 30 seconds
- Smooth theme transitions
- Efficient image caching
- Minimal JavaScript bundle size

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

### Accessibility
- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- High contrast mode compatibility
- Screen reader friendly
