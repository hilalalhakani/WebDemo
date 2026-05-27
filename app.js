/**
 * Speachy - Premium Speech Therapy Landing Page
 * Clientside Dynamic Interactions & Fallback Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initThemeToggle();
  initServiceModals();
  initProcessSwitcher();
  initTestimonialsSlider();
  initStatsCounters();
  initBookingForm();
  initScrollAnimationsFallback();
});

/* ==========================================================================
   NAVBAR BACKGROUND ON SCROLL
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Check on init
}

/* ==========================================================================
   THEME TOGGLER (LIGHT / DARK SYSTEM)
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  // Retrieve user choice or system standard
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  let currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', currentTheme);

  toggleBtn.addEventListener('click', () => {
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
    currentTheme = nextTheme;
  });
}

/* ==========================================================================
   SERVICE DESCRIPTION DYNAMIC MODALS
   ========================================================================== */
const SERVICES_DATA = {
  kids: {
    title: "Speech Therapy for Children",
    description: `
      <p style="margin-bottom: 1rem;"><strong>Pediatric speech therapy</strong> focuses on helping young ones build expressive language, receptive language, and confident social articulation.</p>
      <p style="margin-bottom: 1rem;">Early milestones are essential. If your toddler (18 months - 3 years) is struggling to connect words, follow instructions, or talk clearly, play-based intervention can yield rapid, positive transformations.</p>
      <p style="margin-bottom: 1rem;"><strong>Our typical areas of care:</strong></p>
      <ul style="list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem; display: flex; flex-direction: column; gap: 0.5rem;">
        <li>Late Talkers & Vocabulary Delays</li>
        <li>Articulatory Pronunciation (Lisping, letter swaps)</li>
        <li>Sentence Construction & Comprehension</li>
        <li>Augmentative & Alternative Communication (AAC)</li>
      </ul>
      <p>Our sessions use interactive sensory play, fun picture puzzles, and storybooks to keep kids excited to practice.</p>
    `
  },
  adults: {
    title: "Adult Speech & Articulation",
    description: `
      <p style="margin-bottom: 1rem;"><strong>Adult speech coaching</strong> is designed to support speech recovery, articulation precision, and public presentation confidence.</p>
      <p style="margin-bottom: 1rem;">Whether you are recovering from a clinical event (like a stroke or neurological injury) or looking to modify accent patterns to build stronger workplace presentation skills, we provide structured, respectful clinical guidance.</p>
      <p style="margin-bottom: 1rem;"><strong>Our typical areas of care:</strong></p>
      <ul style="list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem; display: flex; flex-direction: column; gap: 0.5rem;">
        <li>Aphasia & Cognitive Rebuilding</li>
        <li>Professional Vocal Projection & Accent Trait Modification</li>
        <li>Swallowing Support (Dysphagia)</li>
        <li>Confidence in Corporate Presenting</li>
      </ul>
      <p>We work entirely at your comfortable pace, providing functional homework exercises that fit easily into your daily routine.</p>
    `
  },
  delay: {
    title: "Language Delay Therapy",
    description: `
      <p style="margin-bottom: 1rem;"><strong>Language Delay Therapy</strong> addresses structural challenges in vocabulary comprehension and communicative expressions.</p>
      <p style="margin-bottom: 1rem;">Many toddlers understand what they want to say but encounter friction trying to form spoken phrases. We utilize evidence-based <strong>Hanen Parent Coaching</strong> to empower parents with practical communication triggers at home.</p>
      <p style="margin-bottom: 1rem;"><strong>Signs therapy can address:</strong></p>
      <ul style="list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem; display: flex; flex-direction: column; gap: 0.5rem;">
        <li>Expressing less than 50 clear words by age 2</li>
        <li>Difficulty combining two words by age 2.5</li>
        <li>Friction comprehending common everyday commands</li>
      </ul>
      <p>Early clinical action ensures your child has the vital stepping stones before entering preschool.</p>
    `
  },
  stuttering: {
    title: "Stuttering & Fluency Treatment",
    description: `
      <p style="margin-bottom: 1rem;"><strong>Stuttering Therapy</strong> provides clients with physical and cognitive strategies to improve speaking flow and reduce conversational anxiety.</p>
      <p style="margin-bottom: 1rem;">We support children and adults using a compassionate approach that combines vocal flow techniques (breath curves, soft contacts) with positive cognitive restructuring to reduce conversational block tension.</p>
      <p style="margin-bottom: 1rem;"><strong>What we work on together:</strong></p>
      <ul style="list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem; display: flex; flex-direction: column; gap: 0.5rem;">
        <li>Easy onset vocal speech targets</li>
        <li>Decreasing bodily tension during blocks</li>
        <li>Managing public presentation stress points</li>
        <li>Classroom speech support for school kids</li>
      </ul>
      <p>Our focus is not just physical pacing, but empowering the speaker's emotional confidence.</p>
    `
  },
  autism: {
    title: "Autism Communication Support",
    description: `
      <p style="margin-bottom: 1rem;"><strong>Autism Support</strong> is built around neurodiverse communication tools that honor every individual's unique way of thinking.</p>
      <p style="margin-bottom: 1rem;">Our therapy is entirely child-led, sensory-friendly, and non-restrictive. Instead of forcing rigid societal speech rules, we explore Maya's or Lucas's unique focal interests, building functional and expressive tools that make peer connections feel organic and happy.</p>
      <p style="margin-bottom: 1rem;"><strong>Primary areas of practice:</strong></p>
      <ul style="list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem; display: flex; flex-direction: column; gap: 0.5rem;">
        <li>Social Pragmatics & Relationship Building</li>
        <li>Visual Schedules & AAC integration</li>
        <li>Self-Regulation & Expressive Indicators</li>
      </ul>
      <p>We collaborate closely with occupational therapists and school specialists to ensure a harmonious care model.</p>
    `
  },
  online: {
    title: "Secure Teletherapy Online",
    description: `
      <p style="margin-bottom: 1rem;"><strong>Online Digital sessions</strong> bring our specialized clinic support straight to the comfort of your home.</p>
      <p style="margin-bottom: 1rem;">Using secure, HIPAA-compliant digital tools, we offer high-performance remote evaluations and therapy. We incorporate collaborative whiteboards, speech exercises, and fun digital rewards to make sure younger minds stay completely focused.</p>
      <p style="margin-bottom: 1rem;"><strong>Why choose online sessions?</strong></p>
      <ul style="list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem; display: flex; flex-direction: column; gap: 0.5rem;">
        <li>Saves travel time and fits easily into busy parent schedules</li>
        <li>Natural environment where kids feel the most confident</li>
        <li>Highly collaborative parent coaching opportunities</li>
      </ul>
      <p>All you need is a laptop or tablet with a webcam, and a quiet, comfortable space to connect.</p>
    `
  }
};

function initServiceModals() {
  const modal = document.getElementById('service-modal');
  if (!modal) return;

  window.openServiceModal = (serviceKey) => {
    const data = SERVICES_DATA[serviceKey];
    if (!data) return;

    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-description').innerHTML = data.description;
    
    // standard dialog show
    modal.style.display = 'flex';
    modal.setAttribute('open', '');
    document.body.style.overflow = 'hidden'; // Lock background scroll
  };

  window.closeServiceModal = () => {
    modal.style.display = 'none';
    modal.removeAttribute('open');
    document.body.style.overflow = 'auto'; // Unlock scroll
  };

  // Close modal when clicking outside contents
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeServiceModal();
    }
  });
}

/* ==========================================================================
   INTERACTIVE PROCESS STEP-BY-STEP SWITCHER
   ========================================================================== */
function initProcessSwitcher() {
  const tabs = document.querySelectorAll('.process-step-tab');
  const contents = document.querySelectorAll('.process-display-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetStep = tab.getAttribute('data-step');

      // Update Active Tab Button
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update Panel Content with transition
      contents.forEach(content => {
        content.classList.remove('active');
        if (content.getAttribute('id') === `step-content-${targetStep}`) {
          content.classList.add('active');
        }
      });
    });
  });
}

/* ==========================================================================
   TESTIMONIALS SLIDER / CAROUSEL
   ========================================================================== */
function initTestimonialsSlider() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.slider-dot');
  const prevBtn = document.getElementById('prev-slide');
  const nextBtn = document.getElementById('next-slide');
  
  if (slides.length === 0) return;

  let activeIndex = 0;

  const updateSlidePosition = (newIndex) => {
    slides[activeIndex].classList.remove('active');
    dots[activeIndex].classList.remove('active');
    
    // Add slide direction classes for better dynamic entrance
    slides[newIndex].classList.add('active');
    dots[newIndex].classList.add('active');
    
    activeIndex = newIndex;
  };

  prevBtn.addEventListener('click', () => {
    const newIndex = activeIndex === 0 ? slides.length - 1 : activeIndex - 1;
    updateSlidePosition(newIndex);
  });

  nextBtn.addEventListener('click', () => {
    const newIndex = activeIndex === slides.length - 1 ? 0 : activeIndex + 1;
    updateSlidePosition(newIndex);
  });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const targetIndex = parseInt(dot.getAttribute('data-index'), 10);
      updateSlidePosition(targetIndex);
    });
  });

  // Swipe support for touch screens
  let startX = 0;
  const track = document.querySelector('.testimonials-track');
  
  if (track) {
    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      const diffX = startX - e.changedTouches[0].clientX;
      if (Math.abs(diffX) > 50) { // Threshold for swipe
        if (diffX > 0) {
          nextBtn.click();
        } else {
          prevBtn.click();
        }
      }
    }, { passive: true });
  }
}

/* ==========================================================================
   ANIMATING STAT STATISTICS COUNTER ON VIEWPORT ENTRY
   ========================================================================== */
function initStatsCounters() {
  const stats = document.querySelectorAll('.stat-number');
  if (stats.length === 0) return;

  const countUp = (element) => {
    const target = parseInt(element.getAttribute('data-target'), 10);
    const duration = 2000; // 2 seconds
    const stepTime = Math.abs(Math.floor(duration / target));
    let current = 0;

    const timer = setInterval(() => {
      current += 1;
      if (element.id === 'stat-patients') {
        element.textContent = current + '+';
      } else if (element.id === 'stat-success') {
        element.textContent = current + '%';
      } else {
        element.textContent = current;
      }

      if (current >= target) {
        clearInterval(timer);
        // Correct overflow or set final text explicitly
        if (element.id === 'stat-patients') {
          element.textContent = target + '+';
        } else if (element.id === 'stat-success') {
          element.textContent = target + '%';
        } else {
          element.textContent = target;
        }
      }
    }, stepTime);
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        obs.unobserve(entry.target); // Animate once
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(stat => observer.observe(stat));
}

/* ==========================================================================
   BOOKING FORM ACTION & VALIDATION
   ========================================================================== */
function initBookingForm() {
  const form = document.getElementById('consultation-form');
  const successOverlay = document.getElementById('form-success');
  
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Check validity across fields
    if (!form.checkValidity()) {
      // Direct validation reports for browsers supporting reportValidity
      if (form.reportValidity) {
        form.reportValidity();
      }
      return;
    }

    // Capture User details
    const userName = document.getElementById('form-name').value;
    const clientName = document.getElementById('form-child').value || userName;

    // Show beautiful thank you popup
    const overlayTitle = successOverlay.querySelector('.section-title');
    const overlayDesc = successOverlay.querySelector('.section-desc');

    overlayTitle.textContent = `Thank You, ${userName.split(' ')[0]}!`;
    overlayDesc.innerHTML = `Your consultation request has been received. Dr. Clara Sterling will review <strong>${clientName}</strong>'s details and reach out to you within 24 hours to schedule your free call.`;

    successOverlay.classList.add('active');
  });

  window.resetFormState = () => {
    form.reset();
    successOverlay.classList.remove('active');
  };
}

/* ==========================================================================
   SCROLL REVEAL VIEW TIMELINE FALLBACK SCRIPT
   ========================================================================== */
function initScrollAnimationsFallback() {
  // If browser does not natively support scroll-driven animations (CSS view timeline)
  if (!CSS.supports('(animation-timeline: view()) and (animation-range: entry)')) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Handle stagger delays inside container triggers if present
            if (entry.target.classList.contains('scroll-reveal-container')) {
              const children = entry.target.children;
              Array.from(children).forEach((child, index) => {
                child.style.opacity = '0';
                child.style.transform = 'translateY(25px)';
                child.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
                
                // Force a small delay to trigger CSS transition
                setTimeout(() => {
                  child.style.opacity = '1';
                  child.style.transform = 'translateY(0)';
                }, 50);
              });
            }
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    // Setup initial styles for fallback browsers
    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
      observer.observe(el);
    });

    document.querySelectorAll('.scroll-reveal-container').forEach((el) => {
      observer.observe(el);
    });
  }
}
