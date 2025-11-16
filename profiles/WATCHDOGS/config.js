// WATCHDOGS - Monitoring Operations Profile
// Maritime, aviation, and communications monitoring

export default {
  id: "WATCHDOGS",
  topBarCenterText: "WATCHDOGS – Monitoring Operations",
  
  grid: {
    columns: 3,
    rows: 3
  },
  
  menu: [
    ["2196F3", "AIS", "https://www.marinetraffic.com/en/ais/home/centerx:-66.1/centery:18.0/zoom:8", "1"],
    ["2196F3", "ADSB", "https://globe.adsbexchange.com/?lat=18.2&lon=-66.5&zoom=8.0", "1"],
    ["2196F3", "EARTHQUAKES", "https://earthquake.usgs.gov/earthquakes/map/", "1"],
    ["2196F3", "LIGHTNING", "https://map.blitzortung.org/", "1", "R"],
    ["2196F3", "SENTINEL", "https://worldview.earthdata.nasa.gov/", "1", "R"],
    ["2196F3", "FIRMS", "https://firms.modaps.eosdis.nasa.gov/map/", "1", "R"]
  ],
  
  tiles: [
    ["AIS CARIBBEAN", "https://www.marinetraffic.com/en/ais/home/centerx:-66.1/centery:18.0/zoom:8"],
    ["ADSB EXCHANGE", "https://globe.adsbexchange.com/?lat=18.2&lon=-66.5&zoom=8.0"],
    ["EARTHQUAKES", "https://earthquake.usgs.gov/earthquakes/map/?extent=16.8,-68.5&extent=19.5,-64.5"],
    ["LIGHTNING MAP", "https://map.blitzortung.org/#3.5/18.2/-66.5"],
    ["FIRE ALERTS", "https://firms.modaps.eosdis.nasa.gov/map/"],
    ["SATELLITE VIS", "https://cdn.star.nesdis.noaa.gov/GOES19/ABI/SECTOR/pr/01/1200x1200.jpg"],
    ["SATELLITE IR", "https://cdn.star.nesdis.noaa.gov/GOES19/ABI/SECTOR/pr/13/1200x1200.jpg"],
    ["WAVE ANALYSIS", "https://polar.ncep.noaa.gov/waves/latest_run/multi_1.atl_10m.png"],
    ["OCEAN CURRENTS", "https://oceanservice.noaa.gov/facts/sedscimap.html"]
  ],
  
  tileDelay: [
    0,      // AIS CARIBBEAN
    0,      // ADSB EXCHANGE
    60000,  // EARTHQUAKES
    60000,  // LIGHTNING MAP
    0,      // FIRE ALERTS
    60000,  // SATELLITE VIS
    60000,  // SATELLITE IR
    60000,  // WAVE ANALYSIS
    0       // OCEAN CURRENTS
  ],
  
  rss: [
    ["https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.atom", 30],
    ["https://www.nhc.noaa.gov/index-at.xml", 60]
  ]
};
