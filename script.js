let particles = [];
let maxParticles = 100;
let color = '#ffffff';

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-container');
  for (let i = 0; i < maxParticles; i++) {
    particles.push(new Particle());
  }
  noStroke();

  // Event listeners for UI
  document.getElementById('particle-count').addEventListener('input', (e) => {
    maxParticles = e.target.value;
    particles = [];
    for (let i = 0; i < maxParticles; i++) {
      particles.push(new Particle());
    }
  });

  document.getElementById('color-picker').addEventListener('input', (e) => {
    color = e.target.value;
  });

  document.getElementById('clear-btn').addEventListener('click', () => {
    background(18, 18, 18); // Match the body background color
  });

  document.getElementById('save-btn').addEventListener('click', () => {
    saveCanvas(canvas, 'myCanvas', 'png');
  });
}

function draw() {
  background(18, 18, 18, 25); // Slight fade for trailing effect
  particles.forEach((p) => {
    p.update();
    p.show();
  });
}

class Particle {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.vx = random(-2, 2);
    this.vy = random(-2, 2);
    this.size = random(2, 5);
  }

  update() {
    this.x += this.vx + map(mouseX, 0, width, -1, 1);
    this.y += this.vy + map(mouseY, 0, height, -1, 1);

    if (this.x > width || this.x < 0) this.vx *= -1;
    if (this.y > height || this.y < 0) this.vy *= -1;
  }

  show() {
    fill(color);
    circle(this.x, this.y, this.size);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
