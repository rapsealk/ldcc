/**
 * Temporarily update drone status.
 */
const angles = document.getElementsByClassName('uav-angle');
const size = angles.length;
setInterval(() => {
    for (let i = 0; i < size; i++) {
        angles[i].innerHTML = `angle: ${parseInt((Math.random() * 100) % 90)} degree`;
    }
}, 3000);