//long touch detection:
const __TOUCH_TIME_REQUIRED = 1000;
var touched_card = null, press_timer = null;
function start_touch_timer(elem){
    end_touch_timer();
    let thecard = elem.closest(".card");
    if(!thecard) return;
    document.body.addEventListener("touchleave", end_touch_timer);
    press_timer = setTimeout(function(){
        thecard.classList.add("touched");
        touched_card = thecard;
    }, __TOUCH_TIME_REQUIRED);
}
function end_touch_timer(){
    if(press_timer == null) return;
    clearTimeout(press_timer);
    press_timer = null;
    if(!touched_card) return;
    touched_card.classList.remove("touched");
    touched_card = null;
}

//select function:
function clickCard(event){
    let target = event.target;
    if(target.nodeName == "BUTTON")
        return;
    target = target.closest(".card")
    target.classList.toggle("selected");
}

//mouse events
document.onmousedown = function(e){
    e = e || window.event;
    e.preventDefault();
    let r = initDrag(e.target, {x: e.pageX, y: e.pageY} );
    if(!r) return;
    document.onmouseup = mouseUp;
    document.onmousemove = mouseMove;
};
function mouseUp(e){
    closeDrag();
    document.onmouseup = null;
    document.onmousemove = null;
}
function mouseMove(e){
    e = e || window.event;
    e.preventDefault();
    dragMove( {x: e.clientX, y: e.clientY} );
    return;
}

//touch events
document.ontouchstart  = function(e){
    e = e || window.event;
    const ts = e.touches;
    if(ts.length != 1) return;
    const target = ts[0].target;
    start_touch_timer(target);
    let r = initDrag(ts[0].target, {x:ts[0].pageX, y:ts[0].pageY} );
    if(!r) return;
    document.ontouchend = touchEnd;
    document.ontouchcancel = touchEnd;
    document.ontouchmove = touchMove;
};
function touchEnd(e){
    end_touch_timer();
    closeDrag();
    document.ontouchend = null;
    document.ontouchcancel = null;
    document.ontouchmove = null;
}
function touchMove(e){
    end_touch_timer();
    e = e || window.event;
    let ts = e.changedTouches;
    assert(ts.length == 1, "Im too lazy to get id");
    dragMove( { x:ts[0].clientX, y:ts[0].clientY } );
    return;
}

//functionality
var refpos = {x:0, y:0};
var refel = null, refhand=null;
function initDrag(target, mousepos){
    assert(refel === null, 'initDrag func while dragging');

    // get element:
    refel = target.closest('.card');
    if(refel === null) return false;
    // get hand:
    refhand = refel.parentNode;
    assert(refhand.classList.contains("hand"), "not in hand on initDrag!");
    // save mouse position:
    refpos = mousepos;
   // listen for more mouse events:
   return true;
}
function closeDrag(){
    assert(refel !== null, "mouseUp func");
    refel.style.top = "0px";
    refel.style.left = "0px";
    refel = null;
}
function dragMove(mousepos){
    // set the new position:
    refel.style.top = (mousepos.y - refpos.y) + "px";
    refel.style.left = (mousepos.x - refpos.x) + "px";

    //replace position:
    let others = [...refhand.children].filter( (v) => v!=refel );
    let domframe = getDOMFrame(others);

    const indx = dropPos(refel, refhand, mousepos.x);
    if( indx == getChildIndex(refhand, refel) ) return;
    let oldrect = refel.getBoundingClientRect();
    insertChild(refhand, refel, indx);

    //make sure to update relative pos after change:
    let newrect = refel.getBoundingClientRect();
    refpos.x += newrect.left - oldrect.left;
    refpos.y += newrect.top - oldrect.top;
    //animate
    animateDOMChange(others, domframe, 100);
}

function dropPos(elm, hand, pageX){
/*
    const handrect = hand.getBoundingClientRect();
    const handsize = hand.children.length;
    let minx = handrect.left, dx = handrect.width / handsize;

    let i = Math.floor((pageX-minx)/dx);
    return i;
*/
    for(let i=hand.children.length-1; i>=0; i--){
        let child = hand.children[i];
        if(child === elm) continue;
        let rect = child.getBoundingClientRect();
        let right = rect.left+rect.width;
        if(pageX <= right)
            continue;
        return i+1;
    }
    return 0;
}