// === GSAP ANIMATIONS ===
gsap.from(".hero", { opacity: 0, y: -50, duration: 1.2, ease: "power3.out" });
gsap.from(".crypto-card", { opacity: 0, y: 50, stagger: 0.3, duration: 1, delay: 0.5 });
gsap.from(".blockchain-visualizer", { opacity: 0, scale: 0.9, duration: 1, delay: 1 });

// === PARTICLES BACKGROUND ===
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
for (let i = 0; i < 80; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2 + 1,
    speed: Math.random() * 0.5 + 0.1
  });
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.y += p.speed;
    if (p.y > canvas.height) p.y = 0;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(79, 195, 247, 0.5)';
    ctx.fill();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// === DYNAMIC BLOCKCHAIN SVG ===
const svg = document.getElementById('blockchain-svg');
const blocksData = [
  { id: 1, hash: "0000a1b2c3...", prev: null },
  { id: 2, hash: "0000d4e5f6...", prev: "0000a1b2c3..." },
  { id: 3, hash: "0000g7h8i9...", prev: "0000d4e5f6..." }
];

function createBlock(x, data) {
  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.innerHTML = `
    <rect x="${x}" y="50" width="180" height="110" rx="12" class="block"/>
    <text x="${x + 90}" y="85" text-anchor="middle" fill="#fff" font-weight="bold">Bloque #${data.id}</text>
    <text x="${x + 90}" y="105" text-anchor="middle" class="hash-text">Hash: ${data.hash}</text>
    <text x="${x + 90}" y="125" text-anchor="middle" fill="#81d4fa" font-size="11">Prev: ${data.prev || 'Génesis'}</text>
  `;
  g.addEventListener('click', () => {
    alert(`Bloque #${data.id}\nHash: ${data.hash}\nAnterior: ${data.prev || 'Ninguno (Génesis)'}`);
  });
  return g;
}

let x = 50;
blocksData.forEach((block, i) => {
  svg.appendChild(createBlock(x, block));
  if (i < blocksData.length - 1) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x + 180);
    line.setAttribute("y1", 105);
    line.setAttribute("x2", x + 250);
    line.setAttribute("y2", 105);
    line.setAttribute("stroke", "#81d4fa");
    line.setAttribute("stroke-width", "3");
    line.setAttribute("marker-end", "url(#arrow)");
    svg.appendChild(line);
  }
  x += 270;
});

// Add arrow marker
const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
defs.innerHTML = `<marker id="arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
  <polygon points="0 0, 10 3.5, 0 7" fill="#81d4fa"/>
</marker>`;
svg.prepend(defs);

// === WEB3 SIMULATOR (EDUCATIVO) ===
document.getElementById('connect-wallet').addEventListener('click', () => {
  const status = document.getElementById('wallet-status');
  const result = document.getElementById('transaction-result');
  
  if (status.textContent === 'Desconectado') {
    status.textContent = '0x71C7...a1B3';
    status.style.color = '#4fc3f7';
    result.classList.remove('hidden');
    result.innerHTML = `
      <p><strong>Conexión exitosa</strong></p>
      <p>Red: Ethereum Mainnet</p>
      <p>Balance: 0.842 ETH</p>
      <p>Última tx: 0xabc123... <em>(simulada)</em></p>
    `;
  } else {
    status.textContent = 'Desconectado';
    status.style.color = '#ff6b6b';
    result.classList.add('hidden');
  }
});

// === EXPLORE BUTTONS ===
document.querySelectorAll('.btn-explore').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const crypto = e.target.getAttribute('data-crypto');
    alert(`Explorando ${crypto.toUpperCase()}...\n\nPróximamente: conexión real con Ethers.js`);
  });
});