
var path = "imgs/meow.jpg";

function whenAvailable(name, callback, max_rep) {
    if (max_rep==0) return false;
    var interval = 50; // ms
    window.setTimeout(function() {
        if (window[name]) {
            callback(window[name]);
	    return true;
        } else {
            return whenAvailable(name, callback, max_rep-1);
        }
    }, interval);
}

function init(){
	if ( !whenAvailable('loaded', function(){}, 20) ){
		return;
	}
	document.getElementById("initbut").remove();
	loaded();
	set_back(path);
}

if(document.readyState == 'complete'){
	init();
}else{
	window.onload = init
}
