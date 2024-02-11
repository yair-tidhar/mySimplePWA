
function pressed(){
	var b = document.getElementById('but');
	b.innerHTML="worked!";
}

function loaded(){
	var b = document.getElementById('jstest');
	b.innerHTML="JS loaded successfully";
	return;
}

function set_back(img_path){
	document.body.style.backgroundImage = "url('"+img_path+"')";
}

