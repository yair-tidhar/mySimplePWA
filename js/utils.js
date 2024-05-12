function assert(cond, msg){
    if(!cond)
        throw new Error(msg || "Assertion failed");
    return;
}
function getChildIndex(parent, child){ return Array.from(parent.children).indexOf(child); }

function insertChild(parent, elm, index){
    if(index+1 == parent.children.length)
        parent.appendChild(elm);
    else
        parent.insertBefore(elm, parent.children[index]);
    return;
}
