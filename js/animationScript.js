
function _getElemRect(child){
    let offset = $(child).offset();
    let pos = {
        top: offset.top-$(child).parent().scrollTop(),
        left: offset.left-$(child).parent().scrollLeft(),
        width: $(child).width(),
        height: $(child).height()
    };
    return pos;
}

function animateParentChange(children, newparent){
    const poses = Array(children.length);
    const copies = Array(children.length);
    //record info and move
    for(let i=0; i<children.length; i++){
        const child = children[i];
        poses[i] = _getElemRect(child);
        //handle space:
        const copy = child.cloneNode();
        child.replaceWith(copy);
        copies[i] = copy;

        //move
        newparent.appendChild(child);
        child.classList.remove("selected");

    }
    //animate:
    for(let i=0; i<children.length; i++ ){
        const child = children[i];
        const newpos = _getElemRect(child);
        const pos = poses[i];
        //sizes:
        const dw = newpos.width - pos.width;
        const dh = newpos.height - pos.height;
        const dx = pos.left-newpos.left-dw/2;
        const dy = pos.top-newpos.top-dh/2;
        const rat = pos.width/newpos.width;
        //animation constants:
        child.style.setProperty("--dx", dx+'px');
        child.style.setProperty("--dy", dy+'px');
        child.style.setProperty("--sw", pos.width+"px");
        child.style.setProperty("--fw", newpos.width+"px");
        //animation call
        giveAnimation(child, "animateMove");
        copies[i].remove();
    }
}

function giveAnimation(elem, animationClassName){
    elem.addEventListener('animationend', function _2del() {
            elem.classList.remove(animationClassName);
            elem.removeEventListener("animationend", _2del)
    });
    elem.classList.add(animationClassName);
}


function playHand(){
    const found = document.querySelectorAll("#player > .card.selected");
    if(found.length == 0) return;
    const move2 = document.getElementById("field");
    animateParentChange(Array.from(found), move2);


    $("#curr_play").addClass("scoring");
//    animateOne(found[0], move2);
//    animateTransition( Array.from(found), move2 );
}