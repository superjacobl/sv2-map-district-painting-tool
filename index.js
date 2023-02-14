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
    "Lanatia": "F4B7FD",
    "Kogi": "B6EEFD",
    "Landing Cove": "FDB7B7",
    "New Avalon": "D3FCB6",
    "New Spudland": "EAB7FC",
    "Novastella": "B7FDE5",
    "Old King": "C0FDB7",
    "San Vooperisco": "FAFDB8",
    "Thesonica": "FDD9B7",
    //"Voopmont": "FFFFFF"
    "Voopmont": "CCCCCC"
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

jsondata = {"New Vooperis":[362,180,1044,267,124,436,1211,107,928,2155,1881,563,2172,42,473,1839,1455,2208,484,2231,2237,260,2254,832,1155,573,587,265,415,1260,2186,1531,2192,76,1812,455,2219,830,2222,1225,1577,1745,1171,979,2241,2240,850,1332,974,1850,2272,1875,1845,926,597,1429,338,3084,1405,1462,2212,2218,319,2849,183,2184,2175,1751,2189,2265,2253,452,1132,1371,258,2230,933,916,1737,75,539,2207,959,1063,390,1866,1501,1209,1482,56,629,1570,2141,1029,1542,1652,2143,1550,1154,1521,207,1650,1401,2176,2242,2235,1112,1722,2260,1355,977,1470,384,39,346,1505,1836,2313,625,226,1583,1407,2346,616,1762,2742,856,255,1547,663,2368,262,1782,261,2299,1067,1789,874,342,2320,119,112,1651,2355,481,3126,2388,707,2364,3079,3164,2304,918,2274,2864,3188,2660,1807,1182,368,1199,2290,2263,2280,1302,1447,1813,276,1000,1674,1300,2327,821,1113,697,913,1091,688,791,198,1469,1594,767,2356,535,842,674,1034,701,1755,344,2420,1739,2406,1025,2210,172,492,2199,1829,299,3011,2171,59,3179,896,2839,1210,2122,2112,1730,1151,2895,360,197,2099,1768,572,2144,443,1819,2135,1518,2128,2121,1028,509,1042,2164,672,1598,33,1394,955,1511,2158,1406,931,30,620,2173,1319,464,2970,3187,2677,2903,2605,3252],"Lanatia":[2681,2955,3231,1234,2781,2989,86,3137,3087,1962,958,532,1985,216,1987,576,829,246,140,377,3155,2805,2952,867,1041,3009,2999,2733,1995,1108,1930,1936,414,1953,1464,29,1324,1748,1941,318,1778,1966,1126,1727,1251,1661,1979,649,1808,705,1591,1731,710,2003,1861,1459,1038,1219,2011,2022,947,1453,2023,1608,1343,1160,1391,264,53,361,2017,1382,1876,837,1996,1327,796,1973,1959,1179,1773,133,1664,1917,1431,670,1223,699,1069,1925,671,1932,973,1163,540,1943,6,546,1969,1420,1957,1872,555,1956,1817,1934,229,525,592,1568,1963,1363,641,391,1122,1823,2000,1551,1387,1055,1980,1367],"Elysian Katonia":[2920,2858,2403,2396,2380,3017,3042,3221,2673,3258,1448,2653,2700,2471,1395,2794,175,892,897,81,1,1106,781,559,2416,1147,2389,994,1290,1843,988,1202,132,2321,341,806,1136,1295,84,1628,1276,1141,1743,857,1142,396,18,1350,1603,2424,2417,2429,1384,1451,3096,1444,782,1882,2433,2391,283,615,1468,1548,1095,841,1870,819,1065,2328,2353,780,2358,88,2345,2330,2329,1563,1613,2392,1389,1277,330,1498,543,403,2390,369,426,1738,290,21,358,2444,2448,2455,953,2459,1683,1201,2426,491,1066,355,1428,1007,567,496,2381,2400,507,2348,2572,2904,2959,2675,2806,3204,2735,2881,2532,2948,530,1016,137,1795,753,1620,2522,978,1308,2526,211,2527,1612,2505,1341,2496,969,2507,282,2495,2516,110,863,595,2497,2465,162,2474,2468,43,463,949,160,2439,1312,312,2477,1085,1712,72,2440,1377,1740,2430,2458,1642,1894,347,397,2492,138,61,2473,1647,522,2484,24,494,515,1593,2475,1621,2488,2811,2729,3209,2625,3071,1675,593,3266,2982,3151,2556,66,1883,2558,297,1826,1691,2548,1695,1237,1830,889,2523,1660,1331,2534,1840,2546,63,227,1595,2551,1452,1681,1098,1611,1818,2557,94,764,2560,2559,2555],"Old King":[1873,752,1005,2487,588,2481,735,2478,1100,866,16,551,884,3148,2993,2689,2709,2954,2857,3019,2861,3023,3125,1213,923,425,666,1008,2490,1328,2493,2489,367,2494,1475,1824,524,2506,3,2502,2510,482,1717,120,2499,111,2518,2514,149,105,250,2508,54,438,2531,1309,911,131,1571,2520,1549,875,2537,1670,126,1020,2529,306,1703,1032,1831,1610,628,2545,65,1884,2541,2539,440,938,442,52,511,2544,190,433,46,765,2536,1697,458,1081,1864,1774,1522,1886,1801,578,1349,730,2509,736,237,1116,1180,2515,1006,2503,2511,1318,964,2513,786,2501,749,991,99,1871,605,1294,1158,1709,2517,2528,1726,389,2519,2524,2535,2533,340,1888,499,1061,2542,1847,130,1288,245,1837,393,1396,37,1070,2547,2543,708,2525,2538,36,1360,686,2549,1562,2550,14,966,2552,1572,1268,2553,109,1698,852,449,908,1057,984,1580,2554,1854,1323,700,1099,1424,34,286,1540,827,1397,1425,1193,2540,2530,1110,847,833,2521,1023,382,2472,1473,777,1228,295,691,1597,234,2422,1793,2434,166,1368,1878,2413,186,668,135,2407,2415,2394,687,658,462,2423,2427,2456,2460,2469,862,683,2464,2447,3159,1249,470,941,2425,1342,2401,1790,1618,2377,2357,144,1764,645,1558,2463,607,1454,996,2479,128,1123,2457,189,1274,2451],"Landing Cove":[2767,3133,3067,3227,2840,3203,3103,2886,2923,2985,3121,214,1166,2195,300,1513,714,1307,2359,1036,1656,424,1496,90,946,5,1711,1483,1811,693,622,1071,370,57,104,948,614,1648,742,2485,156,586,1533,2470,294,1858,471,885,1037,1526,709,1874,2462,1097,1438,506,1667,910,69,512,1759,1152,167,2402,793,720,412,2410,804,566,2452,2441,725,1433,768,2431,528,2385,818,2397,1853,743,813,1841,1127,754,394,2414,2374,432,2445,550,906,1725,2409,1321,2411,792,1889,136,1337,280,1130,533,1769,1246,653,221,2476,2442,1607,2453,1491,2480,544,2421,1346,2360,410,690,2317,19,374,2285,498,2258,2244,1786,2297,828,356,58,834,2371,411,864,1358,1832,1058,1250,604,2398,409,1111,2322,1200,325,2281,204,486,500,2205,1814,934,1325,2255,235,153,2284,2294,91,731,1465,2267,451,2316,2291,379,590,1834,824,2217,634,1806,1672,2238,427,420,1137,2266,790,2216,2220,1131,599,1638,2239,797,2225,1191,1254,115,2283,601,2278,28,222,1787,611,1264,513,2276,810,1890,878,2293,704,746,2261,696,1322,1417,1700,678,2243,304,1185,2315,1720,2301,748,2383,556,1040,1788,2418,1241,1463,1339,722,165,733,2436,51,1270,178,1230,2412,905,2438,1865,510,2449,839,1272,1027],"Thesonica":[1376,1520,357,212,692,1284,2405,2387,1581,2373,1723,454,2987,880,3199,2666,1644,3127,936,2641,2769,3002,2871,3233,3041,2878,3054,3144,888,187,2432,2443,726,2404,249,96,580,676,2378,2370,970,284,103,993,589,2419,2399,2435,2428,2466,2395,2408,1178,644,664,1552,1330,85,1449,188,650,1114,2504,2512,38,1460,2486,891,1682,1033,2500,1734,2498,287,1026,805,1198,2483,2461,1107,2482,581,32,2491,870,1749,1629,2446,77,2467,1068,1291,795,1170,982,113,1719,2450,1673,1297,2454,561,877,1240,1412,2372,2349,373,763,1004,1087,224,835,2379,2375,387,921,164,729,1378,902,1654,2298,331,2339,2312,381,962,2335,636,516,2376,1399,823,2365,2341,97,1267,1415,890,600,1587,1756,873,2340,1869,271,307,419,2334,1791,1139,461,861,1018,2326,301,2311,1705,406,483,1605,1062,1625,1263,2273,2300,1244,2287,1761,907,1383,2318,922,1827,2343,1481,333,2347,2363,407,1409,706,1059,195,1357,523,2352,612,2354,1283,1466,467,256,1574,2344,2336,2367,564,1256,1458,1105,1746,1129,1145,1400,17,1528,624,233],"New Spudland":[171,967,2185,1150,147,1427,872,2221,2232,684,2248,2270,1398,423,981,817,2350,1797,2369,273,1052,1715,807,2382,715,2362,231,1495,1868,2351,1676,2331,903,1760,292,1484,1744,728,2251,2247,208,1282,667,1627,431,999,1019,1635,1347,493,2269,1665,745,157,266,1423,2209,1176,1765,816,350,359,445,444,1537,1499,114,702,617,1794,2259,468,642,1504,2200,2226,1369,2197,640,2264,895,22,448,243,2279,1104,1014,1296,1247,364,1138,1623,2308,2303,1588,1892,145,2314,1258,323,2332,298,673,2361,800,838,2337,772,871,1077,609,932,633,1408,1054,1766,1224,1519,2296,655,446,82,2309,125,716,717,2338,2386,1510,150,2384,1599,1530,1364,2366,158,2393,968,1271,475,1478,1609,64,78,1092,1796,146,1333,638,2437,1118,1655,439,1891,497,1579,1602,521,1636,713,218,80,225,2282,31,2288,1119,1064,2323,343,2333,869,317,205,2292,750,1525,176,1821,2190,995,840,1022,1539,1835,2168,665,1049,2150,2160,619,1477,354,575,1261,163,504,2138,1304,2169,851,1187,2181,520,191,1893,1148,1287,1637,1492,45,1314,776,1566,565,2133,1879,2152,1867,2163,1439,1799,2118],"Voopmont":[659,898,1757,168,2204,421,488,1508,998,1380,1494,1617,621,2073,1585,1089,1074,366,2037,1238,718,2028,2041,623,2043,1372,71,501,49,3185,1359,1687,1938,3140,2705,1970,571,129,505,942,1233,1402,2016,1128,598,2039,744,372,755,1692,569,1205,1783,1997,2008,2082,980,202,2116,2095,1844,557,25,1472,169,2012,2058,2068,976,1479,288,2106,1269,843,1507,1816,2051,1523,951,210,2658,3169,3251,1777,2089,570,2110,2582,469,2157,2900,669,1586,859,2162,1292,247,784,1480,435,274,675,1278,2149,952,893,1140,100,1149,55,1590,1887,2206,1445,2228,311,334,1435,1208,1860,2246,1266,2245,385,1329,881,1189,2227,2211,584,986,1880,2194,489,985,50,1461,2213,87,1393,353,1265,1354,2130,652,1298,2174,1707,251,1516,992,2165,2142,1159,400,2123,155,2159,450,477,2127,1206,1486,1204,1443,747,1279,1497,257,1088,67,1809,83,487,1134,1218,751,26,2090,2085,825,1197,2107,213,1183,2076,1133,15,1639,1124,139,547,882,375,142,2132,1015,2100,2154,651,1742,937,876,2196,2183,1500,2180,1512,2201,2129,1589,1043,1633,193,1721,2098,618,789,775,2091,1658,2072,679,2079,2105,2125,809,244,422,315,2117,2113,646,2102,719,1416,430,1718,1614,2088,1825,399,1446,594,1615,322,1086,203,1554,2166,1487,1559,2146,1375,1506,388,2084,405,1039,2071,541,2941,1900,2997,1524,3247,1753,332,1897,3068,1235,41,1906,44,1094,1073,2929,1012,1426,1050,900,1908,2784,1909,2860,2893,3249,927,1600,925,305,680,1947,1231,844,1714,269,1109,1950,1750,822,1388,1926,635,291,1432,1493,1967,944,855,1135,1596,1535,677,1336,73,380,1326,1921,1606,1929,1280,1902,1907,548,1899,179,1701,602,220,1785,1901,1898,1896,1624,1167,1252,961,1010,1859,712,1696,1303,1546,631,1939,337,1157,549,1488,1914,92,1601,285,1729,1011,1833,177,778,401,627,1181,1927,402,972,1245,943,302,196,1937,1255,694,1951,1954,215,1940,773,1441,1948,1515,3250,1335,1634,1918,1913,1910,956,1471,9,1489,737,1289,1919,1904,1802,860,1732,1490,1626,474,248,1474,1895,1702,1903,1905,141,1699,194,1912,534,2919,2686],"Kogi":[685,1592,1527,1390,794,915,788,2161,1561,239,293,2167,457,2156,591,1345,945,1165,1144,2148,170,1093,562,3102,1419,89,472,1842,434,2178,1096,314,756,761,2179,654,2191,200,727,1227,2203,1545,1017,632,568,1262,161,2224,1352,1153,349,723,1162,1351,1293,660,2198,630,1220,2188,1281,1784,2215,1772,2223,950,2256,1706,2236,1301,963,2229,182,192,1024,1168,102,1056,1315,1685,60,1803,316,428,456,1662,339,1467,1543,657,1529,502,577,987,1584,1186,1403,542,606,2325,101,2324,48,2319,698,1414,1320,2342,1221,392,2305,151,1456,1708,1169,478,1754,1348,1381,2202,1643,845,2193,1440,2187,1822,1575,1156,232,935,20,1669,711,1215,1781,1366,2250,272,802,1344,2262,1239,849,740,1503,259,1082,1083,2249,1242,2268,1421,185,1538,2214,766,537,2234,695,2252,336,1450,453,1013,2277,527,2295,1192,2275,2306,2302,108,812,417,2307,901,2286,2289,957,853,1582,7,1775,610,2310,1653,868,989,1863,206,2257,93,2233,1273,603,1340],"San Vooperisco":[3216,2716,3163,1035,2994,3161,2685,2052,2053,2067,774,2856,3180,1514,289,681,883,1076,2104,1370,1410,363,1310,2087,503,495,1362,1848,929,2077,1645,1767,1770,1334,173,1434,1316,313,127,739,320,1207,241,1994,1988,1993,899,552,858,1815,1125,1632,1101,2015,583,2033,879,1631,2050,490,826,1188,1177,378,2075,326,1666,2064,887,2086,2065,2055,1079,240,1047,2078,1536,1857,1532,263,74,519,2081,1164,2103,2054,201,2045,1194,582,2057,447,2101,815,2120,1184,1567,637,2137,1259,1146,1090,2119,395,2131,1724,1763,757,1573,643,769,914,2115,1517,1668,2109,70,1257,1214,741,62,954,252,1855,1002,1404,351,1437,508,1630,122,2026,1338,1021,2047,2060,553,352,1758,1556,1060,1649,560,1048,278,79,1173,2140,2151,2170,545,762,2177,574,2032,2009,2010,328,2021,23,1009,2019,1679,2040,1436,2046,365,801,40,1226,924,1102,2070,1212,2271],"Novastella":[1640,309,1117,608,1103,2,2074,1779,1356,2061,2069,209,181,2092,1646,2114,413,2134,2126,1072,2108,98,1457,1704,152,1838,2094,1275,1305,2080,2093,1716,1030,803,2111,296,661,1045,626,254,2182,1392,1196,2139,116,760,1311,647,538,997,1544,1693,771,787,1046,1172,1569,429,1560,1001,2136,1080,703,408,2145,919,1564,1677,558,1078,1663,738,2147,1286,1820,281,1422,2097,894,1578,682,329,2066,2083,1003,1622,383,386,1680,466,689,2063,1203,1175,917,820,2124,1856,939,990,1418,2153,437,536],"New Avalon":[531,1952,554,1771,2795,2914,2608,1976,1161,1960,585,1978,310,1983,1253,639,1616,148,2029,1553,2024,2048,886,1728,656,236,1678,721,1798,836,1299,2096,275,217,1849,1442,1248,253,238,2062,308,95,2030,13,1690,1792,2020,4,321,831,118,1236,327,441,1780,398,2006,724,2038,854,518,2056,1689,279,1075,1217,1828,1411,2025,106,1805,1365,1736,1385,143,848,1502,1084,199,1684,1735]}