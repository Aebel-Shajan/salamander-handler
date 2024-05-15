// Setup the canvas element
const canvas = document.getElementById('canvas');
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
window.addEventListener('resize', () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
})
console.log(canvas.computedStyleMap())
const ctx = canvas.getContext('2d');


// Create a salamander object
const salamander = {
  segments: [],
  segmentLength: 20,
  segmentCount: 5,
  mouseX: 0,
  mouseY: 0
};

class Segment {
  constructor(x, y, length, angle) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.angle = angle;
  }

  draw() {
    // Draw segment as a line
    ctx.beginPath();
    ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
    ctx.stroke();
  }
}

// Initialize the salamander segments
for (let i = 0; i < salamander.segmentCount; i++) {
  const segment = new Segment(0, 0, salamander.segmentLength, 0);
  salamander.segments.push(segment);
}

// Update salamander position based on mouse movement
function updateSalamanderPosition(event) {
  salamander.mouseX = event.clientX;
  salamander.mouseY = event.clientY;
}

// Update salamander segments
function updateSalamanderSegments() {
  const { mouseX, mouseY, segments } = salamander;
  let prevX = mouseX ? mouseX : 0;
  let prevY = mouseY ? mouseY : 0;

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    let dx = prevX - segment.x;
    let dy = prevY - segment.y;
    let dr = Math.abs(Math.hypot(dx, dy));
    let angle = Math.atan2(dy, dx);

    if (dr > segment.length) {
      segment.x += Math.cos(angle) * Math.min((dr - segment.length), 1)
      segment.y += Math.sin(angle) * Math.min((dr - segment.length), 1)
    }
    prevX = segment.x;
    prevY = segment.y;
  }
}

// Draw the salamander
function drawSalamander() {
  const { segments } = salamander;

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    segment.draw();
  }
}


// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  updateSalamanderSegments();
  drawSalamander();
  requestAnimationFrame(animate);
}
animate();


// Controls
let isMouseDown = false;
let isMouseMoving = false;

document.addEventListener('mousedown', (event) => {
  isMouseDown = true;
  updateSalamanderPosition(event);
});

document.addEventListener('mouseup', () => isMouseDown = false);

document.addEventListener('mousemove', (event) => {
  if(isMouseDown){
    updateSalamanderPosition(event);
  }
});
