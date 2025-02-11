import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.138.3/build/three.module.js";

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
document.body.appendChild(renderer.domElement);

// Particle grid setup
const gridSize = 100;
const spacing = 0.4;
const particles = new THREE.BufferGeometry();
const positions = [];
const speed = [];

for (let i = -gridSize; i < gridSize; i += spacing) {
  for (let j = -gridSize; j < gridSize; j += spacing) {
    positions.push(i, 0, j);
    speed.push(Math.random() * 0.01 + 0.001);
  }
}

particles.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
particles.setAttribute('speed', new THREE.Float32BufferAttribute(speed, 100));

const material = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.04
});

const points = new THREE.Points(particles, material);
scene.add(points);

// Optimized animation function
function animate() {
  requestAnimationFrame(animate);
  
  const time = performance.now() * 0.001;
  
  let positions = points.geometry.attributes.position.array;
  
  for (let i = 1; i < positions.length; i += 3) {
    positions[i] = Math.sin((positions[i - 1] + positions[i + 1]) * 0.05 + time) * 1.5;
  }
  
  points.geometry.attributes.position.needsUpdate = true;
  renderer.render(scene, camera);
}

// Camera setup
camera.position.set(0, 3, 10);
camera.lookAt(0, 1, 0);

animate();

// Window resize event
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Toggle functionality for NEURABOT text and explanation
const neurabot = document.getElementById('neurabot');
const explanation = document.getElementById('explanation');
let isExplanationVisible = false;

neurabot.addEventListener('click', function() {
  if (!isExplanationVisible) {
    // Zoom in effect
    this.style.transform = 'scale(1.2)';
    this.style.fontSize = '2.5rem';
    
    // Show the explanation after a short delay to simulate the zoom effect
    setTimeout(() => {
      explanation.classList.add('show');
      explanation.style.display = 'block';
      isExplanationVisible = true;
    }, 300);
  } else {
    // Hide the explanation
    explanation.classList.remove('show');
    explanation.style.display = 'none';
    
    // Reset NEURABOT to original state
    setTimeout(() => {
      this.style.transform = 'scale(1)';
      this.style.fontSize = '2rem';
      isExplanationVisible = false;
    }, 300);
  }
});

// Functionality for the X button
document.getElementById('xButton').addEventListener('click', function() {
  // Replace 'YOUR_X_LINK_HERE' with the actual X link you want to open
  window.open('https://x.com/_Ai_Neura_', '_blank');
});

// Functionality for the Telegram button
document.getElementById('tgButton').addEventListener('click', function() {
  // Replace 'YOUR_TELEGRAM_LINK_HERE' with the actual Telegram link you want to open
  window.open('https://t.me/NeuraCommunityBot', '_blank');
});
