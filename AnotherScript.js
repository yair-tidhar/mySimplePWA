


function animateTransition(children, newparent){
    const handRect = children[0].parentElement.getBoundingClientRect();
    const size = Math.min((handRect.right-handRect.left)/8, children[0].width);

    const oldRects = Array(children.length);
    const empties = Array(children.length);
    for(let i=0; i<children.length; i++){
        const child = children[i];
        oldRects[i] = {
            width: child.width,
            height: child.height,
            x: child.x,
            y: child.y
        };
        let empty = document.createElement("div");
        empty.style.setProperty("width", size+"px")
        child.replaceWith(empty);
        child.classList.remove("selected");
        newparent.appendChild(child)
        empties[i] = empty;
    }

    for(let i=0; i<children.length; i++){
        const child = children[i];

        let dw = oldRects[i].width/child.width;
        let dh = oldRects[i].height/child.height;
        let dx = oldRects[i].x - child.x;
        let dy = oldRects[i].y - child.y;

        child.style.setProperty("--dx", dx+'px');
        child.style.setProperty("--dy", dy+'px');
        child.style.setProperty("--dw", dw);
        child.style.setProperty("--dh", dh);

        child.addEventListener('animationend', function() {
            child.classList.remove('animateMove');
            empties[i].remove();
        });

        child.classList.add("animateMove");
    }
}


function playHand(){
    const found = document.querySelectorAll("#player > .card.selected");
    const move2 = document.getElementById("field");
    animateTransition( Array.from(found), move2 );
}