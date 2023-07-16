paintstrokessamecolor = false

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

    const inputElement = document.getElementById("input");
    inputElement.addEventListener("change", ihatemylife, false);

    function ihatemylife() {
        handleFiles(this.files[0])
    }
    
    async function handleFiles(file) {
    ahhhh = await file.text();
    jsondata = JSON.parse(ahhhh); /* now you can work with the file list */

    if (jsondata != undefined)
    {
        data = {};
        
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
        c = ids_to_color[parseInt(element.id)]
        if (c != undefined)
        {
            element.style.fill = `#${c}`;
            if (paintstrokessamecolor) {
                element.style.stroke = `#${c}`;
            }
        } else {
            element.style.fill = `#ffffff`;
        }
    })

    }

    Array.from(document.getElementsByTagName("path")).forEach(element => {
        element.onmouseover = function fe() {clickedProvice(element.id)}
        element.onmousedown = function ff() { 
            ismousedown = true; 
            clickedProvice(element.id);
        }
        element.onmouseup = function fa() {
            ismousedown = false;
        }
        c = ids_to_color[parseInt(element.id)]
        if (c != undefined)
        {
            element.style.fill = `#${c}`;
            if (paintstrokessamecolor) {
                element.style.stroke = `#${c}`;
            }
        } else {
            element.style.fill = `#ffffff`;
            if (paintstrokessamecolor) {
                element.style.stroke = `#${c}`;
            }
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
    "Archelon Republic": "B7BCFC",
    "The Astarian Egis": "B8B7FD",
    "United States of Qortos": "FEEAB7",
    "Isurium": "F4B7FD",
    "The Procrastin Nation": "B7FDE5",
    "Oglar": "FDB7B7",
    "Fraisia": "D3FCB6",
    "Arkoros": "EAB7FC",
    "United Corporations of Adramat": "B6EEFD", 
    "The Sublime State of the Fíkret": "FAFDB8",
}

function getcolor(name) {
    c = colorinfo[name];
    if (c == undefined)
        return "000000"
        //return "000000";
    return c
}

function clickedProvice(proviceid) {
    if (!ismousedown) {
        return
    }
    el =  document.getElementById(proviceid);
    el.style.fill = `#${getcolor(currentdistrict)}`;
    if (paintstrokessamecolor) {
        el.style.stroke = `#${c}`;
    }
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

jsondata = {}
