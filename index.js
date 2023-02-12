function startup() {
    ids_to_color = {}
    if (jsondata != undefined)
    {
        for (const [key, value] of Object.entries(jsondata)) {
            data[key] = []
            value.forEach(id => {
                ids_to_color[id] = getcolor(key);
                if (data[key].indexOf(id) == -1) {
                    data[key].push(id)
                }
            })
        }
    }
    Array.from(document.getElementsByTagName("path")).forEach(element => {
        element.onmouseover = function fe() {clickedProvice(element.id)}
        element.onclick = function ff() { 
            ismousedown = true; 
            clickedProvice(element.id);
            ismousedown = false;
        }
        c = ids_to_color[parseInt(element.id)]
        if (c != undefined)
        {
            element.style.fill = `#${c}`;
        }
    })
}

ismousedown = false

window.onmousedown = () => {
    ismousedown = true
}

window.onmouseup = () => {
    ismousedown = false
}

data = {}

currentdistrict = ""

function setdistrict(button, district) {
    Array.from(document.getElementsByClassName("district-button")).forEach(element => {
        element.disabled = false
    });
    button.disabled = true
    currentdistrict = district
    if (data[currentdistrict] == undefined) {
        data[currentdistrict] = [];
    }
}

colorinfo = {
    "Ardenti Terra": "B7BCFC",
    "Elysian Katonia": "B8B7FD",
    "New Vooperis": "FEEAB7",
    "Lanatia": "F4B7FD"
}

function getcolor(name) {
    c = colorinfo[name];
    if (c == undefined)
        return "000000";
    return c
}

function clickedProvice(proviceid) {
    if (!ismousedown) {
        return
    }
    el =  document.getElementById(proviceid);
    el.style.fill = `#${getcolor(currentdistrict)}`;
    console.log(el.id)
    for (const [key, value] of Object.entries(data)) {
        if (key != currentdistrict)
        {
            const index = value.indexOf(parseInt(el.id));
            if (index > -1)
            {
                value.splice(index, 1); // 2nd parameter means remove one item only
            }
        }
    }
    if (data[currentdistrict].indexOf(parseInt(proviceid)) == -1) {
        data[currentdistrict].push(parseInt(proviceid))
    }
}

function clickeddownload() {
    download(JSON.stringify(data), "districts_with_provice_ids.json", "application/json")
}

// Function to download data to a file
function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

jsondata = {"New Vooperis":[362,180,1044,267,124,436,1211,107,928,2155,1881,563,2172,42,473,1839,1455,2208,484,2231,2237,260,2254,832,1155,573,587,265,415,1260,2186,1531,2192,76,1812,455,2219,830,2222,1225,1577,1745,1171,979,2241,2240,850,1332,974,1850,2272,1875,1845,926,597,1429,338,3084,1405,1462,2212,2218,319,2849,183,2184,2175,1751,2189,2265,2253,452,1132,1371,258,2230,933,916,1737,75,539,2207,959,1063,390,1866,1501,1209,1482,56,629,1570,2141,1029,1542,1652,2143,1550,1154,1521,207,1650,1401,2176,2242,2235,1112,1722,2260,1355,977,1470,384,39,346,1505,1836,2313,625,226,1583,1407,2346,616,1762,2742,856,255,1547,663,2368,262,1782,261,2299,1067,1789,874,342,2320,119,112,1651,2355,481,3126,2388,707,2364,3079,3164,2304,918,2274,2864,3188,2660,1807,1182,368,1199,2290,2263,2280,1302,1447,1813,276,1000,1674,1300,2327,821,1113,697,913,1091,688,791,198,1469,1594,767,2356,535,842,674,1034,701,1755,344,2420,1739,2406,1025,2210,172,492,2199,1829,299,3011,2171,59,3179,896,2839,1210,2122,2112,1730,1151,2895,360,197,2099,1768,572,2144,443,1819,2135,1518,2128,2121,1028,509,1042,2164,672,1598,33,1394,955,1511,2158,1406,931,30,620,2173,1319,464,2970,3187,2677,2903,2605,3252],"Lanatia":[2681,2955,3231,1234,2781,2989,86,3137,3087,1962,958,532,1985,216,1987,576,829,246,140,377,3155,2805,2952,867,1041,3009,2999,2733,1995,1108,1930,1936,414,1953,1464,29,1324,1748,1941,318,1778,1966,1126,1727,1251,1661,1979,649,1808,705,1591,1731,710,2003,1861,1459,1038,1219,2011,2022,947,1453,2023,1608,1343,1160,1391,264,53,361,2017,1382,1876,837,1996,1327,796,1973,1959,1179,1773,133,1664,1917,1431,670,1223,699,1069,1925,671,1932,973,1163,540,1943,6,546,1969,1420,1957,1872,555,1956,1817,1934,229,525,592,1568,1963,1363,641,391,1122,1823,2000,1551,1387,1055,1980,1367],"Elysian Katonia":[2920,2858,2403,2396,2380,3017,3042,3221,2673,3258,1448,2653,2700,2471,1395,2794,175,892,897,81,1,1106,781,559,2416,1147,2389,994,1290,1843,988,1202,132,2321,341,806,1136,1295,84,1628,1276,1141,1743,857,1142,396,18,1350,1603,2424,2417,2429,1384,1451,3096,1444,782,1882,2433,2391,283,615,1468,1548,1095,841,1870,819,1065,2328,2353,780,2358,88,2345,2330,2329,1563,1613,2392,1389,1277,330,1498,543,403,2390,369,426,1738,290,21,358,2444,2448,2455,953,2459,1683,1201,2426,491,1066,355,1428,1007,567,496,2381,2400,507,2348,2572,2904,2959,2675,2806,3204,2735,2881,2532,2948,530,1016,137,1795,753,1620,2522,978,1308,2526,211,2527,1612,2505,1341,2496,969,2507,282,2495,2516,110,863,595,2497,2465,162,2474,2468,43,463,949,160,2439,1312,312,2477,1085,1712,72,2440,1377,1740,2430,2458,1642,1894,347,397,2492,138,61,2473,1647,522,2484,24,494,515,1593,2475,1621,2488,2811,2729,3209,2625,3071,1675,593,3266,2982,3151,2556,66,1883,2558,297,1826,1691,2548,1695,1237,1830,889,2523,1660,1331,2534,1840,2546,63,227,1595,2551,1452,1681,1098,1611,1818,2557,94,764,2560,2559,2555]}