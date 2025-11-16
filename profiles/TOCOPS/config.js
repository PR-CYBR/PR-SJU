// TOCOPS - Tactical Operations Center Profile
// For emergency management and tactical coordination in Puerto Rico

export default {
  id: "TOCOPS",
  topBarCenterText: "TOCOPS – Tactical Operations Center",
  
  grid: {
    columns: 3,
    rows: 3
  },
  
  menu: [
    ["2196F3", "WEATHER", "https://www.weather.gov/sju/", "1"],
    ["2196F3", "RADAR", "https://radar.weather.gov/ridge/standard/TJUA_loop.gif", "1"],
    ["2196F3", "TROPICAL", "https://www.nhc.noaa.gov/", "1"],
    ["2196F3", "LIGHTNING", "https://map.blitzortung.org/#3.5/18.2/-66.5", "1", "R"],
    ["2196F3", "WINDS", "https://earth.nullschool.net/#current/wind/surface/level/orthographic=-66.59,18.22,3000", "1", "R"],
    ["2196F3", "EARTHQUAKES", "https://earthquake.usgs.gov/earthquakes/map/?extent=16.8,-68.5&extent=19.5,-64.5", "1", "R"]
  ],
  
  tiles: [
    ["WX RADAR TJUA", "https://radar.weather.gov/ridge/standard/TJUA_loop.gif"],
    ["SATELLITE GEOCOLOR", "https://cdn.star.nesdis.noaa.gov/GOES19/ABI/SECTOR/pr/GEOCOLOR/1200x1200.jpg"],
    ["TROPICAL OUTLOOK", "https://www.nhc.noaa.gov/xgtwo/two_atl_7d0.png"],
    ["LIGHTNING PR", "https://images.lightningmaps.org/blitzortung/america/index.php?animation=usa"],
    ["CARIBBEAN SAT", "https://cdn.star.nesdis.noaa.gov/GOES19/ABI/SECTOR/car/GEOCOLOR/1808x1808.jpg"],
    ["WIND ANALYSIS", "https://www.ssd.noaa.gov/goes/floater/data/car/latest_car_avn.jpg"],
    ["SST CARIBBEAN", "https://www.ospo.noaa.gov/data/sst/contour/caribbean.c.gif"],
    ["TROPICAL MODELS", "https://www.tropicaltidbits.com/analysis/models/gfs/latest/gfs_mslp_pcpn_frzn_atl_1.png"],
    ["WAVE HEIGHT", "https://polar.ncep.noaa.gov/waves/viewer.shtml?-atl-"]
  ],
  
  tileDelay: [
    60000,  // WX RADAR
    60000,  // SATELLITE GEOCOLOR
    60000,  // TROPICAL OUTLOOK
    60000,  // LIGHTNING PR
    60000,  // CARIBBEAN SAT
    60000,  // WIND ANALYSIS
    60000,  // SST CARIBBEAN
    60000,  // TROPICAL MODELS
    0       // WAVE HEIGHT
  ],
  
  rss: [
    ["https://www.nhc.noaa.gov/index-at.xml", 30],
    ["https://www.weather.gov/sju/", 60]
  ]
};
