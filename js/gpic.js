
var path = "imgs/meow.jpg";

function init(){
	document.getElementById("initbut").remove();
	loaded();
	set_back(path);
}

if(document.readyState == 'complete'){
	init();
}else{
	window.onload = init
}
