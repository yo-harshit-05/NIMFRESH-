// ScrollReveal animations
ScrollReveal({ reset: true, distance: '60px', duration: 1200, delay: 200 });

ScrollReveal().reveal('.hero h1', { delay: 300, origin: 'top' });
ScrollReveal().reveal('.hero p', { delay: 500, origin: 'bottom' });
ScrollReveal().reveal('.hero .btn', { delay: 700, origin: 'bottom' });

ScrollReveal().reveal('.feature-card', { interval: 200, origin: 'bottom' });
ScrollReveal().reveal('.step', { interval: 150, origin: 'right' });
ScrollReveal().reveal('.dashboard img', { delay: 300, origin: 'left' });

// Smooth scroll for nav links
document.querySelectorAll('header ul li a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Animated header shrink on scroll
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 100) {
    header.style.padding = '10px 40px';
    header.style.background = 'rgba(255,255,255,0.95)';
    header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
  } else {
    header.style.padding = '20px 60px';
    header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
  }
});

// Floating bubbles background effect in footer
const footer = document.querySelector('footer');
for (let i = 0; i < 20; i++) {
  const bubble = document.createElement('span');
  bubble.classList.add('bubble');
  bubble.style.left = Math.random() * 100 + '%';
  bubble.style.animationDuration = 5 + Math.random() * 5 + 's';
  bubble.style.opacity = Math.random();
  bubble.style.width = bubble.style.height = Math.random() * 15 + 10 + 'px';
  footer.appendChild(bubble);
}

// Add some bubble styling dynamically
const style = document.createElement('style');
style.innerHTML = `
  footer .bubble {
    position: absolute;
    bottom: 0;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    animation: rise 8s infinite ease-in;
  }
  @keyframes rise {
    from {transform: translateY(0); opacity: 1;}
    to {transform: translateY(-200px); opacity: 0;}
  }
`;
document.head.appendChild(style);
