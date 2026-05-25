/* ==========================================================================
   Obsidian Portfolio Interactions (Prakhar's Portfolio JS Engine)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileMenu();
  initThemeManager();
  initHeroTypewriter();
  initScrollReveal();
  initAboutTabs();
  initAIChatbot();
  initContactForm();
  updateFooterYear();
});

/* ==========================================================================
   Navbar Scroll Styling Trigger
   ========================================================================== */
function initNavbarScroll() {
  const header = document.querySelector('.navbar-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    // Add background glass to navbar after 50px scroll
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Dynamic Navigation Links Active Class Highlight
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

/* ==========================================================================
   Mobile Nav Overlay Toggle
   ========================================================================== */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger-menu');
  const closeBtn = document.querySelector('.close-mobile-nav');
  const overlay = document.querySelector('.mobile-nav-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  const toggleOverlay = () => {
    overlay.classList.toggle('open');
    document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
  };

  hamburger.addEventListener('click', toggleOverlay);
  closeBtn.addEventListener('click', toggleOverlay);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ==========================================================================
   Theme Manager (Dark / Light Mode Controller)
   ========================================================================== */
function initThemeManager() {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // Retrieve saved preference or default to dark
  const savedTheme = localStorage.getItem('prakhar-portfolio-theme') || 'dark';
  body.setAttribute('data-theme', savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('prakhar-portfolio-theme', newTheme);
  });
}

/* ==========================================================================
   Hero Section Typewriter Animation
   ========================================================================== */
function initHeroTypewriter() {
  const target = document.getElementById('typewriter-text');
  if (!target) return;

  const words = ['MERN Stack Specialist', 'Angular Developer', 'Full-Stack Engineer', 'Problem Solver'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let delay = 100;

  function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      target.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      delay = 50; // Deleting is faster
    } else {
      target.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      delay = 120; // Typing speed
    }

    // Word completely typed
    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      delay = 1800; // Pause at end of word
    } 
    // Word completely deleted
    else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 300; // Small delay before starting next word
    }

    setTimeout(type, delay);
  }

  // Kick off the typewriter loop after 800ms
  setTimeout(type, 800);
}

/* ==========================================================================
   IntersectionObserver for Scroll Reveal
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-scale');
  
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          observer.unobserve(entry.target); // Trigger only once
        }
      });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach(el => el.classList.add('reveal-active'));
  }
}

/* ==========================================================================
   About Section Tabs Switching Controller
   ========================================================================== */
function initAboutTabs() {
  const buttons = document.querySelectorAll('.tab-button');
  const panes = document.querySelectorAll('.tab-pane');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTabId = btn.getAttribute('data-tab');

      // Clear active states
      buttons.forEach(b => b.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      // Set active state to current tab
      btn.classList.add('active');
      const targetPane = document.getElementById(`tab-${targetTabId}`);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   AI twin Chatbot Engine Simulator (Fuzzy Matching Engine)
   ========================================================================== */
function initAIChatbot() {
  const form = document.getElementById('chat-input-form');
  const input = document.getElementById('chat-input-field');
  const messagesBox = document.getElementById('chat-messages-box');
  const presetBtns = document.querySelectorAll('.preset-chip-btn');

  // Resume Knowledge Base Database
  const botDatabase = {
    bio: "Prakhar Pratap Singh is a Full-Stack Developer currently in his 3rd year of a B.Tech in Computer Science & Engineering at Alliance University, Bangalore. He maintains a CGPA of 8.2/10 and is originally from Lucknow, UP.",
    skills: "Prakhar's core skills include:\n• Frontend: React.js (v19), Angular, HTML5, CSS3, Tailwind CSS, Bootstrap, Redux.\n• Backend: Node.js, Express.js, RESTful APIs, JWT Authentication, Bcrypt.\n• Databases: MongoDB, SQL.\n• Languages: JavaScript, TypeScript, Python, Java, C++, Dart, Go.\n• Tools: Cloudinary, Git, GitHub, VS Code, Flutter.",
    oggangs: "Prakhar interned as an Angular.js Developer at OGGANGS Pvt. Ltd. (Mar 2026 – Jun 2026). His key contributions were:\n• Ramping up on Angular from scratch within days for a live codebase serving Europe and the US.\n• Rebuilding UI views with Angular + Bootstrap for responsive, multi-device layouts.\n• Boosting Lighthouse performance scores from ~50 to 90+ via asset optimization and lazy loading.\n• Implementing zero page-reload in-app i18n translation services.",
    trivialworks: "Prakhar worked as a Web Development Intern at Trivialworks Solutions Pvt. Ltd. (May 2024 – Jul 2024). He self-taught responsive principles, practiced defensive programming (handling layout exceptions/errors), and ran pre-deployment checks across cross-browser environments.",
    talentflow: "Prakhar's flagship project is TalentFlow AI: an AI-driven recruitment management system utilizing a MERN stack (React 19, Node, MongoDB, Tailwind 4, Framer Motion, Radix UI). It features:\n• AI Auto-Pilot: drafts cover letters with Claude AI and automates batch submissions based on scanned job text.\n• AI Salary Coach: drafts custom negotiation scripts.\n• Recruiter Dashboard: analytics visualizations built using Chart.js.\n• Salary Intelligence: interactive comp mapping using Recharts.\nLive Site: https://talentflowai-blush-iota.vercel.app",
    certifications: "Prakhar holds these credentials:\n• Oracle Certified Java Foundations Associate\n• IBM Professional: Front-End with React\n• IBM Professional: Operating Systems Specialization\n• C++ Programming Specialization Certificate\n• React & Redux Certificate (Udemy)\n• MongoDB Basics Certificate",
    contact: "You can reach Prakhar at:\n• Personal Email: prakharnew45@gmail.com\n• University Email: pprakharbtech23@ced.alliance.edu.in\n• Mobile: +91-8303179403\n• GitHub: https://github.com\n• LinkedIn: https://linkedin.com",
    role: "Prakhar is seeking full-time opportunities or internships in Full-Stack Web Development, Frontend Engineering, and MERN/Angular Developer positions starting in late 2026/2027. He is open to remote roles or relocating to tech hubs like Bangalore."
  };

  const getResponse = (message) => {
    const msg = message.toLowerCase();
    
    if (msg.includes('who') || msg.includes('about') || msg.includes('introduce') || msg.includes('profile') || msg.includes('cgpa') || msg.includes('alliance') || msg.includes('study')) {
      return botDatabase.bio;
    }
    if (msg.includes('skill') || msg.includes('frontend') || msg.includes('backend') || msg.includes('languages') || msg.includes('databases') || msg.includes('stack') || msg.includes('framework')) {
      return botDatabase.skills;
    }
    if (msg.includes('oggangs') || msg.includes('internship') && (msg.includes('mar') || msg.includes('angular'))) {
      return botDatabase.oggangs;
    }
    if (msg.includes('trivialworks') || msg.includes('trivial') || msg.includes('first intern')) {
      return botDatabase.trivialworks;
    }
    if (msg.includes('talentflow') || msg.includes('talent') || msg.includes('flow') || msg.includes('rms') || msg.includes('project') && (msg.includes('ai') || msg.includes('recruit'))) {
      return botDatabase.talentflow;
    }
    if (msg.includes('certification') || msg.includes('certify') || msg.includes('credentials') || msg.includes('award') || msg.includes('ibm') || msg.includes('oracle')) {
      return botDatabase.certifications;
    }
    if (msg.includes('contact') || msg.includes('email') || msg.includes('phone') || msg.includes('number') || msg.includes('reach') || msg.includes('social') || msg.includes('linkedin')) {
      return botDatabase.contact;
    }
    if (msg.includes('job') || msg.includes('hire') || msg.includes('open') || msg.includes('opportunity') || msg.includes('full-time') || msg.includes('role') || msg.includes('position')) {
      return botDatabase.role;
    }
    
    // Default fallback fuzzy logic
    return "I want to make sure I give you accurate info! Try asking about one of these topics:\n• OGGANGS or Trivialworks internships\n• TalentFlow AI project\n• Prakhar's core programming skills\n• Contact details & social links\n• Certifications and B.Tech coursework";
  };

  const addMessage = (text, sender) => {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('chat-msg', sender === 'user' ? 'user-msg' : 'bot-msg');
    
    // Format paragraph breaks
    const formattedText = text.replace(/\n/g, '<br>');
    
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    msgDiv.innerHTML = `
      <div class="msg-bubble">${formattedText}</div>
      <span class="msg-time">${timeString}</span>
    `;
    
    messagesBox.appendChild(msgDiv);
    messagesBox.scrollTop = messagesBox.scrollHeight;
  };

  const handleBotResponse = (userQuery) => {
    // Add a typing animation spacer
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('chat-msg', 'bot-msg', 'typing-indicator-msg');
    typingDiv.innerHTML = `
      <div class="msg-bubble" style="display: flex; gap: 4px; align-items: center; padding: 0.5rem 1rem;">
        <span class="dot-blink" style="width:6px;height:6px;background:var(--text-muted);border-radius:50%"></span>
        <span class="dot-blink" style="width:6px;height:6px;background:var(--text-muted);border-radius:50%;animation-delay:0.2s"></span>
        <span class="dot-blink" style="width:6px;height:6px;background:var(--text-muted);border-radius:50%;animation-delay:0.4s"></span>
      </div>
    `;
    
    // Quick dot animation styling injected
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes dotBlink { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 1; transform: scale(1.2); } }
      .dot-blink { animation: dotBlink 1.2s infinite ease-in-out; }
    `;
    document.head.appendChild(style);

    messagesBox.appendChild(typingDiv);
    messagesBox.scrollTop = messagesBox.scrollHeight;

    // Simulate network delay of 750ms
    setTimeout(() => {
      typingDiv.remove();
      const response = getResponse(userQuery);
      addMessage(response, 'bot');
    }, 750);
  };

  // Submit from Form
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) return;

    addMessage(query, 'user');
    input.value = '';
    handleBotResponse(query);
  });

  // Action presets
  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const query = btn.getAttribute('data-query');
      addMessage(query, 'user');
      handleBotResponse(query);
    });
  });
}

/* ==========================================================================
   Contact Form Formspree/Mock Submission Controller
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  const alertBox = document.getElementById('form-success-alert');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnHTML = submitBtn.innerHTML;
    
    // Set loading indicator
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';

    // Simulate server response after 1.2s
    setTimeout(() => {
      // Hide the form visual
      form.classList.add('hidden');
      
      // Reveal the success card banner
      alertBox.classList.remove('hidden');
      
      // Clean inputs
      form.reset();
      
      // Reset button state
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHTML;
    }, 1200);
  });
}

/* ==========================================================================
   Footer Copyright Dyn Year Update
   ========================================================================== */
function updateFooterYear() {
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}
