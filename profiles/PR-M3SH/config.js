// PR-M3SH - Mesh Network Profile
// Mesh networking, LoRa, and alternative communications

export default {
  id: "PR-M3SH",
  topBarCenterText: "PR-M3SH – Mesh Network Operations",
  
  grid: {
    columns: 3,
    rows: 3
  },
  
  menu: [
    ["2196F3", "MESHTASTIC", "https://meshtastic.org/", "1"],
    ["2196F3", "TTN", "https://www.thethingsnetwork.org/", "1"],
    ["2196F3", "APRS", "https://aprs.fi/#!lat=18.2&lng=-66.5&z=9", "1"],
    ["2196F3", "WINLINK", "https://www.winlink.org/", "1", "R"],
    ["2196F3", "JS8CALL", "http://js8call.com/", "1", "R"],
    ["2196F3", "VARA", "https://rosmodem.wordpress.com/", "1", "R"]
  ],
  
  tiles: [
    ["HF PROPAGATION", "https://www.hamqsl.com/solar101vhf.php"],
    ["SOLAR", "https://www.hamqsl.com/solarpic.php"],
    ["D-REGION", "https://services.swpc.noaa.gov/images/animations/d-rap/global/d-rap/latest.png"],
    ["WSPR", "https://www.wsprnet.org/drupal/wsprnet/map"],
    ["APRS PR", "https://aprs.fi/#!lat=18.2&lng=-66.5&z=9"],
    ["SATELLITE", "https://cdn.star.nesdis.noaa.gov/GOES19/ABI/SECTOR/pr/GEOCOLOR/1200x1200.jpg"],
    ["RADAR", "https://radar.weather.gov/ridge/standard/TJUA_loop.gif"],
    ["GRAY LINE", "https://www.timeanddate.com/scripts/sunmap.php?iso=now"],
    ["BAND CONDITIONS", "https://www.hamqsl.com/solar100sc.php"]
  ],
  
  tileDelay: [
    60000,  // HF PROPAGATION
    60000,  // SOLAR
    60000,  // D-REGION
    0,      // WSPR
    0,      // APRS PR
    60000,  // SATELLITE
    60000,  // RADAR
    60000,  // GRAY LINE
    60000   // BAND CONDITIONS
  ],
  
  rss: [
    ["https://www.amsat.org/feed/", 60],
    ["https://daily.hamweekly.com/atom.xml", 120]
  ]
};
