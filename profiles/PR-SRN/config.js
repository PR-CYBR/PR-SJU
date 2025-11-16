// PR-SRN - San Juan Radio Network Profile
// VHF/UHF operations and repeater monitoring

export default {
  id: "PR-SRN",
  topBarCenterText: "PR-SRN – San Juan Radio Network",
  
  grid: {
    columns: 3,
    rows: 3
  },
  
  menu: [
    ["2196F3", "APRS", "https://aprs.fi/#!lat=18.2&lng=-66.5&z=9", "1"],
    ["2196F3", "REPEATERBOOK", "https://www.repeaterbook.com/repeaters/map.php?state_id=72", "1"],
    ["2196F3", "ECHOLINK", "http://www.echolink.org/links.jsp", "1"],
    ["2196F3", "DSTAR", "https://www.dstarinfo.com/", "1", "R"],
    ["2196F3", "DMR", "https://www.dmr-marc.net/", "1", "R"],
    ["2196F3", "ALLSTAR", "https://www.allstarlink.org/", "1", "R"]
  ],
  
  tiles: [
    ["APRS PR", "https://aprs.fi/#!lat=18.2&lng=-66.5&z=9"],
    ["SOLAR", "https://www.hamqsl.com/solarpic.php"],
    ["VHF CONDITIONS", "https://www.hamqsl.com/solar100sc.php"],
    ["AURORA", "https://services.swpc.noaa.gov/images/animations/ovation/north/latest.jpg"],
    ["RADAR", "https://radar.weather.gov/ridge/standard/TJUA_loop.gif"],
    ["SATELLITE", "https://cdn.star.nesdis.noaa.gov/GOES19/ABI/SECTOR/pr/GEOCOLOR/1200x1200.jpg"],
    ["ISS POSITION", "https://www.heavens-above.com/orbitdisplay.aspx?icon=iss&width=600&height=300&mode=M&satid=25544"],
    ["LIGHTNING", "https://images.lightningmaps.org/blitzortung/america/index.php?animation=usa"],
    ["BAND OPENINGS", "https://www.vhfdx.net/"]
  ],
  
  tileDelay: [
    0,      // APRS PR - no rotation
    60000,  // SOLAR
    60000,  // VHF CONDITIONS
    60000,  // AURORA
    60000,  // RADAR
    60000,  // SATELLITE
    60000,  // ISS POSITION
    60000,  // LIGHTNING
    0       // BAND OPENINGS
  ],
  
  rss: [
    ["https://www.amsat.org/feed/", 60],
    ["https://www.arrl.org/news/rss", 90]
  ]
};
