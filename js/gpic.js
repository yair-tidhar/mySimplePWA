
var path = "imgs/meow.jpg";

function whenAvailable(name, callback, max_rep) {
    if (max_rep==0) return;
    var interval = 50; // ms
    window.setTimeout(function() {
        if (window[name]) {
            callback(window[name]);
        } else {
            return whenAvailable(name, callback, max_rep-1);
        }
    }, interval);
}

function init(){
	document.getElementById("initbut").remove();
	loaded();
	set_back(path);
}

if(document.readyState == 'complete'){
	whenAvailable('loaded', init, 20);
}else{
	window.onload = init;
}
