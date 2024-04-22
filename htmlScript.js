
document.body.addEventListener("click", function(evt){
    let elm = event.target;
    if(elm.classList.contains("card")){
        elm.classList.toggle("selected");
    }
});

function setUpDragAndDrop(){
    function allowDrop(ev) {
        ev.preventDefault();
    }
    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }
    function drop(ev) {
        ev.preventDefault();
        let moved = document.getElementById( ev.dataTransfer.getData("text") );
        if(ev.target.classList.contains("card")){
            let hand = ev.target.parentElement;
            if (!hand.contains(moved)) return;
            hand.insertBefore(moved, ev.target);
            return;
        }
        if(!ev.target.classList.contains("hand")) return;
        if(!ev.target.contains(moved)) return;
        let children = ev.target.children;
        let putAt = children[children.length-1];
        for(let i=0; i<children.length; i++){
            let xscore = children[i].getBoundingClientRect().left;
            if (xscore > ev.pageX){
                putAt = children[i];
                break;
            }
        }
        ev.target.insertBefore(moved, putAt);
    }

    [...document.getElementsByClassName("hand")].forEach( hand => {
        hand.ondrop = drop;
        hand.ondragover = allowDrop;
    });
    var id = 0;
    [...document.getElementsByClassName("card")].forEach( card => {
        card.id = "cardID-"+(id++);
        card.draggable = true;
        card.ondragstart=drag;
    });
};

setUpDragAndDrop();