// PR-SJU - San Juan Civic Dashboard Profile
// CIV-DASH - Civilian Dashboard for Puerto Rico San Juan Division

export default {
  id: "PR-SJU",
  topBarCenterText: "PR-SJU – CIV-DASH",
  
  grid: {
    columns: 3,
    rows: 3
  },
  
  menu: [
    ["2196F3", "APRS", "https://aprs.fi/#!lat=18.2&lng=-66.5&z=9", "1", "R"],
    ["2196F3", "QRZ", "https://www.qrz.com/", "1", "R"],
    ["2196F3", "WEATHER", "https://www.weather.gov/sju/", "1", "R"]
  ],
  
  tiles: [
    // Tile 1 - Puerto Rico Radar (Full Island Radar)
    ["Puerto Rico Radar", 
     "https://radar.weather.gov/ridge/standard/CENTAM_loop.gif",
     "https://www.weather.gov/images/sju/Radar_Loop.gif"],
    
    // Tile 2 - Local Radar: San Juan, Puerto Rico (TJUA NEXRAD)
    ["Local Radar: San Juan", 
     "https://radar.weather.gov/ridge/standard/TJUA_loop.gif"],
    
    // Tile 3 - Satellite CGL (GOES-East over Caribbean)
    ["Satellite CGL", 
     "https://cdn.star.nesdis.noaa.gov/GOES16/GLM/SECTOR/cgl/EXTENT3/GOES16-CGL-EXTENT3-600x600.gif",
     "https://cdn.star.nesdis.noaa.gov/GOES16/ABI/SECTOR/cgl/GEOCOLOR/600x600.jpg"],
    
    // Tile 4 - Flightradar / ADS-B Tracker
    ["Flightradar / ADS-B", 
     "iframe|https://globe.adsbexchange.com"],
    
    // Tile 5 - HF Propagation Panel
    ["HF Propagation", 
     "https://www.hamqsl.com/solar101vhf.php"],
    
    // Tile 6 - Satellite Tracker (ISS default, with option for others)
    ["Satellite Tracker - ISS", 
     "https://www.heavens-above.com/orbitdisplay.aspx?icon=iss&width=600&height=300&mode=M&satid=25544",
     "https://isat.sattrackcam.org/?satcat=25544"],
    
    // Tile 7 - Moon Phase
    ["Moon Phase", 
     "https://svs.gsfc.nasa.gov/vis/a000000/a005000/a005023/frames/730x730_1x1_30p/moon.2025.jpg"],
    
    // Tile 8 - AIS Vessel Tracker (Puerto Rico region)
    ["AIS Vessel Tracker", 
     "iframe|https://www.vesselfinder.com/?zoom=9&lat=18.4&lon=-66.1"],
    
    // Tile 9 - Lightning/Storm Awareness (centered on Puerto Rico)
    ["Lightning/Storm Awareness", 
     "https://images.lightningmaps.org/blitzortung/america/index.php?animation=usa",
     "iframe|https://www.lightningmaps.org/realtime?lang=en#m=oss;t=3;s=0;o=0;b=;ts=0;y=18.2208;x=-66.5901;z=8;d=2;dl=2;dc=0;"]
  ],
  
  tileDelay: [
    60000,  // Tile 1: PR Radar - 60s refresh
    60000,  // Tile 2: Local Radar - 60s refresh
    60000,  // Tile 3: Satellite CGL - 60s refresh
    0,      // Tile 4: ADS-B iframe - no rotation
    60000,  // Tile 5: HF Propagation - 60s refresh
    60000,  // Tile 6: Satellite Tracker - 60s refresh
    0,      // Tile 7: Moon Phase - no rotation needed
    0,      // Tile 8: AIS iframe - no rotation
    60000   // Tile 9: Lightning - 60s refresh
  ],
  
  rss: [
    ["https://www.amsat.org/feed/", 60],
    ["https://daily.hamweekly.com/atom.xml", 120],
    ["https://www.arrl.org/news/rss", 90]
  ]
};
