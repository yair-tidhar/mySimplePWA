
//Select cards
document.body.addEventListener("click", function(evt){
    const elm = event.target.closest(".card");
    if(!elm){
        return;
    }
    console.log(evt);
    elm.classList.toggle("selected");
});

//hover over cards:
const touchedClass = "touched";
var touched_card = null;
var press_timer = null;
function cancel_touch(){
    clearTimeout(press_timer);
    press_timer = null;
    if(!touched_card) return;
    touched_card.classList.remove(touchedClass);
    touched_card = null;
}
document.body.addEventListener("touchleave", cancel_touch);
document.body.addEventListener("touchcancel", cancel_touch);
document.body.addEventListener("touchstart", function(evt){
    cancel_touch();
    const card = evt.target.closest(".card");
    if(!card) return;
    press_timer = setTimeout(function(){
        card.classList.add(touchedClass);
        touched_card = card;
    }, 300);
});
document.body.addEventListener("touchend", function(evt){
    clearTimeout(press_timer);
    press_timer = null;
});

//handle drag and drop
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