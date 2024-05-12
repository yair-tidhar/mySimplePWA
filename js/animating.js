
const triggerAnimation = {
    transform: ['translateY(0) translateY(-20%)']
};
const triggerAnimationTiming = {
    duration: 200,
    iterations: 2,
    easing: 'ease-out',
    direction: 'alternate'
};


function getDOMFrame(elems){
    return new Map(
        Array.from(elems).map(el => [el, el.getBoundingClientRect()])
    );
}

function animateDOMChange(children, oldState, animationTime=200, withScale=true){
    for (el of children){
        const old = oldState.get(el);
        const now = el.getBoundingClientRect();

        if(old === undefined){
            alert("undef");
            continue
        }

        const translator = `translate(${old.x-now.x}px, ${old.y-now.y}px)`;
        const scaler = withScale ? `scale(${old.width/now.width},${old.height/now.height})` : '';

        el.animate({
            transformOrigin: ['0 0', '0 0 '],
            transform: [
                `${translator} ${scaler}`,
                'scale(1)'
                ]
        }, {
            easing: 'ease-out',
            duration: animationTime
        });
    }
    return;
}

function animateDOMChange_noScale(children, oldState, animationTime=200){
    animateDOMChange(children, oldState, animationTime, false);
}

function animateTrigger(cardElem){
    cardElem.animate(triggerAnimation, triggerAnimationTiming);
}

