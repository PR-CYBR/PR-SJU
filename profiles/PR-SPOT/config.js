// PR-SPOT - Spot Network Profile
// Satellite monitoring and space weather

export default {
  id: "PR-SPOT",
  topBarCenterText: "PR-SPOT – Satellite & Space Weather",
  
  grid: {
    columns: 4,
    rows: 3
  },
  
  menu: [
    ["2196F3", "HEAVENS-ABOVE", "https://www.heavens-above.com/", "1"],
    ["2196F3", "N2YO", "https://www.n2yo.com/", "1"],
    ["2196F3", "SATFLARE", "https://www.satflare.com/", "1"],
    ["2196F3", "AMSAT", "https://www.amsat.org/", "1", "R"],
    ["2196F3", "CELESTRAK", "https://celestrak.com/", "1", "R"],
    ["2196F3", "SPACEWEATHER", "https://www.spaceweather.com/", "1", "R"]
  ],
  
  tiles: [
    ["ISS POSITION", "https://www.heavens-above.com/orbitdisplay.aspx?icon=iss&width=600&height=300&mode=M&satid=25544"],
    ["SOLAR", "https://www.hamqsl.com/solarpic.php"],
    ["AURORA", "https://services.swpc.noaa.gov/images/animations/ovation/north/latest.jpg"],
    ["D-REGION", "https://services.swpc.noaa.gov/images/animations/d-rap/global/d-rap/latest.png"],
    ["SATELLITE PR", "https://cdn.star.nesdis.noaa.gov/GOES19/ABI/SECTOR/pr/GEOCOLOR/1200x1200.jpg"],
    ["SATELLITE IR", "https://cdn.star.nesdis.noaa.gov/GOES19/ABI/SECTOR/pr/13/1200x1200.jpg"],
    ["SATELLITE WV", "https://cdn.star.nesdis.noaa.gov/GOES19/ABI/SECTOR/pr/09/1200x1200.jpg"],
    ["HF PROPAGATION", "https://www.hamqsl.com/solar101vhf.php"],
    ["GRAY LINE", "https://www.timeanddate.com/scripts/sunmap.php?iso=now"],
    ["MUF MAP", "https://prop.kc2g.com/renders/current/mufd-normal-now.svg"],
    ["IONOGRAM", "https://www.sws.bom.gov.au/Images/World%20Data%20Centre/Data%20Display%20and%20Download/Ionogram/latest_ionogram.gif"],
    ["SPACE WEATHER", "https://www.swpc.noaa.gov/products/station-k-and-indices"]
  ],
  
  tileDelay: [
    60000,  // ISS POSITION
    60000,  // SOLAR
    60000,  // AURORA
    60000,  // D-REGION
    60000,  // SATELLITE PR
    60000,  // SATELLITE IR
    60000,  // SATELLITE WV
    60000,  // HF PROPAGATION
    60000,  // GRAY LINE
    60000,  // MUF MAP
    60000,  // IONOGRAM
    60000   // SPACE WEATHER
  ],
  
  rss: [
    ["https://www.amsat.org/feed/", 60],
    ["https://www.spaceweather.com/rss.php", 120]
  ]
};
