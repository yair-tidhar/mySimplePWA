
const FIELD_ID = "field";
const PLAYER_HAND_ID = "player";
const JOCKER_HAND_ID = "JockerHand"

function getCardID(handID, indx){ //str, int -> HTML
    return document.getElementByID(handID).children.item(indx);
}