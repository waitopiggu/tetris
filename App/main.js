let tickRate = 200;
let startTime = null;

export default function main(timestamp) {
  if (!startTime) {
    startTime = timestamp;
  }
  
  //input
  //update
  //draw

  window.requestAnimationFrame(main);
}

window.requestAnimationFrame(main);
