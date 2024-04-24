
document.body.addEventListener("click", function(evt){
    const elm = event.target.closest(".card");
    if(!elm){
        return;
    }
    elm.classList.toggle("selected");
});

function setUpDragAndDrop(){
    function allowDrop(ev) {
        ev.preventDefault();
    }
    function drag(ev) {
        const card = ev.target.closest(".card");
        ev.dataTransfer.setData("text", card.id);
    }
    function drop(ev) {
        ev.preventDefault();
        let moved = document.getElementById( ev.dataTransfer.getData("text") );
        const targetCard = ev.target.closest(".card");
        if(targetCard){
            let hand = targetCard.parentElement;
            if (!hand.contains(moved)) return;
            hand.insertBefore(moved, targetCard);
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