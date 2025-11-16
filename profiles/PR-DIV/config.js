// PR-DIV - Puerto Rico Division Profile
// General ham radio operations for PR-CYBR San Juan Division

export default {
  grid: {
    columns: 4,
    rows: 3
  },
  
  menu: [
    ["2196F3", "CLUBLOG", "https://clublog.org/livestream/", "1.5"],
    ["2196F3", "DX CLUSTER", "https://dxcluster.ha8tks.hu/map/", "1"],
    ["2196F3", "CONTEST", "https://www.contestcalendar.com/fivewkcal.html", "1"],
    ["2196F3", "APRS", "https://aprs.fi/#!lat=18.2&lng=-66.5&z=9", "1", "R"],
    ["2196F3", "QRZ", "https://www.qrz.com/", "1", "R"],
    ["2196F3", "PSKREPORTER", "https://pskreporter.info/pskmap.html", "1", "R"]
  ],
  
  tiles: [
    ["HF PROPAGATION", "https://www.hamqsl.com/solar101vhf.php"],
    ["SOLAR", "https://www.hamqsl.com/solarpic.php"],
    ["D-REGION", "https://services.swpc.noaa.gov/images/animations/d-rap/global/d-rap/latest.png"],
    ["AURORA", "https://services.swpc.noaa.gov/images/animations/ovation/north/latest.jpg"],
    ["LOCAL RADAR", "https://radar.weather.gov/ridge/standard/TJUA_loop.gif"],
    ["ISS POSITION", "https://www.heavens-above.com/orbitdisplay.aspx?icon=iss&width=600&height=300&mode=M&satid=25544"],
    ["SATELLITE PR", "https://cdn.star.nesdis.noaa.gov/GOES19/ABI/SECTOR/pr/GEOCOLOR/1200x1200.jpg"],
    ["LIGHTNING", "https://images.lightningmaps.org/blitzortung/america/index.php?animation=usa"],
    ["GRAY LINE", "https://www.timeanddate.com/scripts/sunmap.php?iso=now"],
    ["WSPR", "https://www.wsprnet.org/drupal/wsprnet/map"],
    ["MUF MAP", "https://prop.kc2g.com/renders/current/mufd-normal-now.svg"],
    ["BAND CONDITIONS", "https://www.hamqsl.com/solar100sc.php"]
  ]
};
