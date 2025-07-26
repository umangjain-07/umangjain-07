// Typing animation for hero section
const typingText = document.querySelector('.typing-text');
const texts = [
  '🧠 Engineer',
  '🎮 Game Developer', 
  '🤖 Robot Maker',
  '💡 Idea-to-Code Specialist',
  '🚀 Tech Innovator'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeText() {
  const currentText = texts[textIndex];
  
  if (isDeleting) {
    typingText.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    typeSpeed = 50;
  } else {
    typingText.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    typeSpeed = 100;
  }
  
  if (!isDeleting && charIndex === currentText.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    typeSpeed = 500;
  }
  
  setTimeout(typeText, typeSpeed);
}

// Start typing animation
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(typeText, 1000);
});

// Animated counters for stats
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const increment = target / 200;
    let current = 0;
    
    const updateCounter = () => {
      if (current < target) {
        current += increment;
        if (target >= 1000) {
          counter.textContent = Math.ceil(current).toLocaleString() + '+';
        } else {
          counter.textContent = Math.ceil(current);
        }
        setTimeout(updateCounter, 10);
      } else {
        if (target >= 1000) {
          counter.textContent = target.toLocaleString() + '+';
        } else {
          counter.textContent = target;
        }
      }
    };
    
    updateCounter();
  });
}

// Animate skill bars
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  skillBars.forEach(bar => {
    const width = bar.getAttribute('data-width');
    setTimeout(() => {
      bar.style.width = width + '%';
    }, 500);
  });
}

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      
      // Trigger animations based on section
      if (entry.target.classList.contains('about')) {
        setTimeout(animateCounters, 500);
      }
      
      if (entry.target.classList.contains('skills')) {
        setTimeout(animateSkillBars, 500);
      }
    }
  });
}, observerOptions);

// Add scroll reveal to sections
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.classList.add('scroll-reveal');
    observer.observe(section);
  });
});

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// Close mobile nav when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector('.hero-background');
  const speed = scrolled * 0.5;
  
  if (parallax) {
    parallax.style.transform = `translateY(${speed}px)`;
  }
});

// Random particle generation
function createParticles() {
  const particlesContainer = document.querySelector('.particles');
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
      position: absolute;
      width: 2px;
      height: 2px;
      background: #00d9ff;
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: float ${10 + Math.random() * 10}s infinite linear;
      animation-delay: ${Math.random() * 10}s;
      opacity: ${0.3 + Math.random() * 0.7};
    `;
    particlesContainer.appendChild(particle);
  }
}

// Initialize particles
document.addEventListener('DOMContentLoaded', createParticles);

// Add glowing effect to cards on hover
document.querySelectorAll('.project-card, .stat-card, .contact-card, .github-card').forEach(card => {
  card.addEventListener('mouseenter', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    this.style.setProperty('--mouse-x', x + 'px');
    this.style.setProperty('--mouse-y', y + 'px');
    this.classList.add('glow-effect');
  });
  
  card.addEventListener('mouseleave', function() {
    this.classList.remove('glow-effect');
  });
});

// Add CSS for glow effect
const glowStyles = `
  .glow-effect::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: inherit;
    background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
                               rgba(0, 217, 255, 0.1) 0%, 
                               transparent 50%);
    pointer-events: none;
    z-index: -1;
  }
  
  .project-card,
  .stat-card,
  .contact-card,
  .github-card {
    position: relative;
  }
`;

// Add the styles to the document
const styleSheet = document.createElement('style');
styleSheet.textContent = glowStyles;
document.head.appendChild(styleSheet);

// Terminal typing effect
function simulateTerminalTyping() {
  const terminalLines = document.querySelectorAll('.terminal-line');
  let delay = 0;
  
  terminalLines.forEach((line, index) => {
    if (index === 0) return; // Skip first line as it's already visible
    
    line.style.opacity = '0';
    setTimeout(() => {
      line.style.opacity = '1';
      line.classList.add('fade-in-up');
    }, delay);
    
    delay += 800;
  });
}

// Start terminal animation after hero loads
window.addEventListener('load', () => {
  setTimeout(simulateTerminalTyping, 2000);
});

// Add loading animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Preloader styles
const preloaderStyles = `
  body:not(.loaded) {
    overflow: hidden;
  }
  
  body:not(.loaded)::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--primary-bg);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  body:not(.loaded)::after {
    content: 'Loading...';
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: var(--primary-color);
    font-family: 'JetBrains Mono', monospace;
    font-size: 1.2rem;
    z-index: 10000;
    animation: pulse 1.5s infinite;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }
`;

styleSheet.textContent += preloaderStyles;