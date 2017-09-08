
/** Holds the primary data used on this page: metadata about Swift Evolution proposals. */
var proposals

var myObj, myJSON, text, obj;

//Storing data:

init()

/** Primary entry point. */
function init () {
    
    var req = new XMLHttpRequest();
    
    req.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        proposals = JSON.parse(this.responseText);
        document.getElementById("demo").innerHTML = proposals.name;
    }
    };
    req.open('get', 'json.json');
    req.send();
    
}

    

    
    
