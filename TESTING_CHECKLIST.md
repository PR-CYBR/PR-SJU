# Profile Loading System - Testing Checklist

## Pre-Deployment Verification (Local)

### ✅ Completed Tests

- [x] **Profile Validation Script**
  ```bash
  node validate-profiles-simple.js
  ```
  Result: All 8 profiles passed validation

- [x] **ES Module Import Test**
  ```bash
  node test-import.mjs
  ```
  Result: PR-SJU and TOCOPS configs imported successfully

- [x] **CodeQL Security Scan**
  Result: No security alerts found

- [x] **Workflow Permissions**
  Result: Explicit `contents: read` permission added

## Post-Deployment Verification (Live Site)

### Manual Testing Steps

1. **Navigate to Dashboard**
   - URL: `https://pr-cybr.github.io/PR-SJU/dash/hamdash.html`
   - Expected: Dashboard loads without errors

2. **Open Browser Console**
   - Press F12 to open developer tools
   - Go to Console tab
   - Expected: No error messages about profile loading

3. **Test Profile Selector**
   - Locate profile dropdown selector
   - Expected: Shows 8 profiles:
     - PR-SJU - San Juan Civic Dashboard
     - TOCOPS - Tactical Operations Center
     - PR-DIV - Puerto Rico Division
     - WATCHDOGS - Monitoring Operations
     - INTEL-HUB - Intelligence Hub
     - PR-SRN - San Juan Radio Network
     - PR-M3SH - Mesh Network
     - PR-SPOT - Spot Network

4. **Test Each Profile**

   For each profile, verify:
   
   #### PR-SJU (3x3 grid, 9 tiles)
   - [x] Select profile from dropdown
   - [ ] Top bar shows: "PR-SJU – CIV-DASH"
   - [ ] Grid renders as 3 columns × 3 rows
   - [ ] All 9 tiles load:
     - Puerto Rico Radar
     - Local Radar: San Juan
     - Satellite CGL
     - Flightradar / ADS-B
     - HF Propagation
     - Satellite Tracker - ISS
     - Moon Phase
     - AIS Vessel Tracker
     - Lightning/Storm Awareness
   - [ ] Console shows: "Profile PR-SJU loaded successfully"
   - [ ] No error messages appear
   
   #### TOCOPS (3x3 grid, 9 tiles)
   - [ ] Select profile from dropdown
   - [ ] Top bar shows: "TOCOPS – Tactical Operations Center"
   - [ ] Grid renders as 3 columns × 3 rows
   - [ ] All 9 tiles load correctly
   - [ ] Console shows: "Profile TOCOPS loaded successfully"
   - [ ] No error messages appear
   
   #### INTEL-HUB (4x3 grid, 12 tiles)
   - [ ] Select profile from dropdown
   - [ ] Top bar shows: "INTEL-HUB – Intelligence Operations"
   - [ ] Grid renders as 4 columns × 3 rows
   - [ ] All 12 tiles load correctly
   - [ ] Console shows: "Profile INTEL-HUB loaded successfully"
   - [ ] No error messages appear
   
   #### PR-SRN (3x3 grid, 9 tiles)
   - [ ] Select profile from dropdown
   - [ ] Top bar shows: "PR-SRN – San Juan Radio Network"
   - [ ] Grid renders as 3 columns × 3 rows
   - [ ] All 9 tiles load correctly
   - [ ] Console shows: "Profile PR-SRN loaded successfully"
   - [ ] No error messages appear
   
   #### PR-M3SH (3x3 grid, 9 tiles)
   - [ ] Select profile from dropdown
   - [ ] Top bar shows: "PR-M3SH – Mesh Network Operations"
   - [ ] Grid renders as 3 columns × 3 rows
   - [ ] All 9 tiles load correctly
   - [ ] Console shows: "Profile PR-M3SH loaded successfully"
   - [ ] No error messages appear
   
   #### PR-SPOT (4x3 grid, 12 tiles)
   - [ ] Select profile from dropdown
   - [ ] Top bar shows: "PR-SPOT – Satellite & Space Weather"
   - [ ] Grid renders as 4 columns × 3 rows
   - [ ] All 12 tiles load correctly
   - [ ] Console shows: "Profile PR-SPOT loaded successfully"
   - [ ] No error messages appear
   
   #### WATCHDOGS (3x3 grid, 9 tiles)
   - [ ] Select profile from dropdown
   - [ ] Top bar shows: "WATCHDOGS – Monitoring Operations"
   - [ ] Grid renders as 3 columns × 3 rows
   - [ ] All 9 tiles load correctly
   - [ ] Console shows: "Profile WATCHDOGS loaded successfully"
   - [ ] No error messages appear
   
   #### PR-DIV (4x3 grid, 12 tiles)
   - [ ] Select profile from dropdown
   - [ ] Top bar shows: "PR-DIV – Puerto Rico Division"
   - [ ] Grid renders as 4 columns × 3 rows
   - [ ] All 12 tiles load correctly
   - [ ] Console shows: "Profile PR-DIV loaded successfully"
   - [ ] No error messages appear

5. **Test Tile Functionality**
   
   For each profile:
   - [ ] Images load and display correctly
   - [ ] iFrame tiles load content
   - [ ] Tiles with multiple sources rotate automatically
   - [ ] Tile rotation respects tileDelay settings
   - [ ] Double-click on image opens full screen view
   - [ ] Right-click rotates to next image (if multiple sources)

6. **Test Menu Items**
   - [ ] Left menu items appear and function
   - [ ] Right menu items appear and function
   - [ ] Menu items link to correct URLs
   - [ ] "BACK" button returns to dashboard
   - [ ] "Refresh" button reloads page

7. **Test RSS Ticker**
   - [ ] RSS ticker appears at bottom of page
   - [ ] Ticker scrolls automatically
   - [ ] Feed items are clickable
   - [ ] Multiple feeds display correctly

8. **Test Profile Persistence**
   - [ ] Select a profile
   - [ ] Refresh the page
   - [ ] Profile remains selected after refresh
   - [ ] localStorage contains 'selectedProfile' key

9. **Test Error Handling**
   - [ ] If profile fails to load, error alert shows helpful message
   - [ ] Console shows detailed error with stack trace
   - [ ] Dashboard falls back gracefully to default config

## Console Output Examples

### Successful Load
```
Loading profile: PR-SJU
Profile PR-SJU config: {id: "PR-SJU", topBarCenterText: "PR-SJU – CIV-DASH", grid: {…}, menu: Array(3), tiles: Array(9), …}
Profile PR-SJU loaded successfully
  Grid: 3x3
  Tiles: 9
  Menu items: 3
  Tile delays: 9
```

### Failed Load (Should NOT Appear)
```
Failed to load profile PR-SJU: Error: Missing required field: "grid"
Error details: [stack trace]
```

## GitHub Actions Workflow

### Verify Workflow Runs
- [ ] Navigate to PR page
- [ ] Check "Profile Config Validation" workflow
- [ ] Verify all checks passed:
  - Run validation
  - Test ES module imports
  
### Expected Workflow Output
```
🔍 Starting Profile Configuration Validation
════════════════════════════════════════════════════════════

Found 8 profile(s) to validate

✅ INTEL-HUB - All checks passed
✅ PR-DIV - All checks passed
✅ PR-M3SH - All checks passed
✅ PR-SJU - All checks passed
✅ PR-SPOT - All checks passed
✅ PR-SRN - All checks passed
✅ TOCOPS - All checks passed
✅ WATCHDOGS - All checks passed

📊 Validation Summary:
   Total Profiles: 8
   Errors: 0
   Warnings: 0

✅ All profiles validated successfully!
```

## Sign-Off

- [ ] All pre-deployment tests passed
- [ ] All post-deployment tests passed
- [ ] No "Failed to load profile" errors observed
- [ ] All profiles load and render correctly
- [ ] Documentation reviewed and accurate

**Tested by:** ___________________  
**Date:** ___________________  
**Browser/Version:** ___________________  
**Result:** PASS / FAIL  
**Notes:** ___________________
