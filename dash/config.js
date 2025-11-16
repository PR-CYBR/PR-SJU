const disableSetup = false;
var topBarCenterText = `PR-SJU – CIV-DASH`;

// Grid layout
var layout_cols = 3;
var layout_rows = 3;

// Menu items
// Structure is as follows HTML Color code, Option, target URL, scaling 1=Original Size, side (optional, nothing is Left, "R" is Right)
// The values are [color code, menu text, target link, scale factor, side],
// add new lines following the structure for extra menu options. The comma at the end is important!
var aURL = [
  ["f3de21ff", "satellite.js"],
  ["2196F3", "CLUBLOG", "https://clublog.org/livestream/VA3HDL", "1.7"],
  [
    "2196F3",
    "CONTEST",
    "https://www.contestcalendar.com/fivewkcal.html",
    "1",
  ],
  ["2196F3", "DX CLUSTER", "https://dxcluster.ha8tks.hu/map/", "1"],
  [
    "2196F3",
    "LIGHTNING",
    "https://map.blitzortung.org/#3.87/36.5/-89.41",
    "1",
    "R",
  ],
  ["2196F3", "PISTAR", "http://pi-star.local/", "1.2"],
  [
    "2196F3",
    "RADAR",
    "https://weather.gc.ca/?layers=alert,radar&center=43.39961001,-78.53212031&zoom=6&alertTableFilterProv=ON",
    "1",
    "R"
  ],
  ["2196F3", "TIME.IS", "https://time.is/", "1", "R"],
  [
    "2196F3",
    "WEATHER",
    "https://openweathermap.org/weathermap?basemap=map&cities=true&layer=temperature&lat=44.0157&lon=-79.4591&zoom=5",
    "1",
    "R",
  ],
  [
    "2196F3",
    "WINDS",
    "https://earth.nullschool.net/#current/wind/surface/level/orthographic=-78.79,44.09,3000",
    "1",
    "R",
  ],
];

// Dashboard items for PR-SJU CIV-DASH
// Structure is Title, Image Source URL
// [Title, Image Source URL],
// the comma at the end is important!
// 3x3 grid = 9 tiles total
var aIMG = [
  [
    "Puerto Rico Radar",
    "https://radar.weather.gov/ridge/standard/CENTAM_loop.gif",
    "https://www.weather.gov/images/sju/Radar_Loop.gif"
  ],
  [
    "Local Radar: San Juan",
    "https://radar.weather.gov/ridge/standard/TJUA_loop.gif"
  ],
  [
    "Satellite CGL",
    "https://cdn.star.nesdis.noaa.gov/GOES16/GLM/SECTOR/cgl/EXTENT3/GOES16-CGL-EXTENT3-600x600.gif",
    "https://cdn.star.nesdis.noaa.gov/GOES16/ABI/SECTOR/cgl/GEOCOLOR/600x600.jpg"
  ],
  [
    "Flightradar / ADS-B",
    "iframe|https://globe.adsbexchange.com"
  ],
  [
    "HF Propagation",
    "https://www.hamqsl.com/solar101vhf.php"
  ],
  [
    "Satellite Tracker - ISS",
    "https://www.heavens-above.com/orbitdisplay.aspx?icon=iss&width=600&height=300&mode=M&satid=25544",
    "https://isat.sattrackcam.org/?satcat=25544"
  ],
  [
    "Moon Phase",
    "https://svs.gsfc.nasa.gov/vis/a000000/a005000/a005023/frames/730x730_1x1_30p/moon.2025.jpg"
  ],
  [
    "AIS Vessel Tracker",
    "iframe|https://www.vesselfinder.com/?zoom=9&lat=18.4&lon=-66.1"
  ],
  [
    "Lightning/Storm Awareness",
    "https://images.lightningmaps.org/blitzortung/america/index.php?animation=usa",
    "iframe|https://www.lightningmaps.org/realtime?lang=en#m=oss;t=3;s=0;o=0;b=;ts=0;y=18.2208;x=-66.5901;z=8;d=2;dl=2;dc=0;"
  ]
];

// Image rotation intervals in milliseconds per tile - If the line below is commented, all tiles will be rotated every 30000 milliseconds (30s)
// 60000ms = 60 seconds refresh for most tiles
var tileDelay = [
  60000,  // Tile 1: PR Radar - 60s refresh
  60000,  // Tile 2: Local Radar - 60s refresh
  60000,  // Tile 3: Satellite CGL - 60s refresh
  0,      // Tile 4: ADS-B iframe - no rotation
  60000,  // Tile 5: HF Propagation - 60s refresh
  60000,  // Tile 6: Satellite Tracker - 60s refresh
  0,      // Tile 7: Moon Phase - no rotation needed
  0,      // Tile 8: AIS iframe - no rotation
  60000   // Tile 9: Lightning - 60s refresh
];

// RSS feed items for Puerto Rico news and updates
// Structure is [feed URL, refresh interval in minutes]
var aRSS = [
  ["https://www.amsat.org/feed/", 60],           // AMSAT feed, refresh every 60 minutes
  ["https://daily.hamweekly.com/atom.xml", 120], // Ham Weekly feed, refresh every 120 minutes
  ["https://www.arrl.org/news/rss", 90]          // ARRL news feed, refresh every 90 minutes
];
