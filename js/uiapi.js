

function playHand(){
    const field = document.getElementById("round-field");
    const hand = document.getElementById("round-playerHand")
    const scards = [...hand.getElementsByClassName("selected")];
    let frame_parts = [...hand.children];
    let oldframe = getDOMFrame(frame_parts);
    for(let i=0; i<scards.length; i++){
        field.appendChild(scards[i]);
        scards[i].classList.remove("selected")
    }
    animateDOMChange_noScale(frame_parts, oldframe, 1000);
    return;
}