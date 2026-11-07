/**
 * ENGINEER RAZAUL HOQE - CIVIL ENGINEER PORTFOLIO
 * Vanilla JavaScript Implementation
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==================== START: NAVIGATION & STICKY HEADER ====================
  const siteHeader = document.getElementById('site-header');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileNavClose = document.getElementById('mobile-nav-close');
  const navOverlay = document.getElementById('nav-overlay');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const backToTopBtn = document.getElementById('back-to-top');

  // Sticky Header Effect on Scroll
  const handleScroll = () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }

    // Back to top visibility
    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
      } else {
        backToTopBtn.style.opacity = '0.7';
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile Navigation Drawer Toggle
  const openMobileMenu = () => {
    mobileNav.classList.add('open');
    navOverlay.classList.add('open');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileMenu = () => {
    mobileNav.classList.remove('open');
    navOverlay.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openMobileMenu);
  if (mobileNavClose) mobileNavClose.addEventListener('click', closeMobileMenu);
  if (navOverlay) navOverlay.addEventListener('click', closeMobileMenu);

  // Close mobile drawer upon clicking any link & smooth scroll
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          closeMobileMenu();

          const headerOffset = 70;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Back to Top Button
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Active Link Highlight on Scroll using IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));
  // ==================== END: NAVIGATION & STICKY HEADER ====================


  // ==================== START: STATS COUNTER ANIMATION ====================
  const statNumbers = document.querySelectorAll('.stat-number');
  let animatedStats = false;

  const animateStats = () => {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      if (isNaN(target)) return;

      const duration = 1500;
      const stepTime = 30;
      const totalSteps = duration / stepTime;
      const increment = target / totalSteps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          stat.textContent = target === 100 ? '100%' : `${target}+`;
          clearInterval(timer);
        } else {
          stat.textContent = `${Math.floor(current)}${target === 100 ? '%' : '+'}`;
        }
      }, stepTime);
    });
  };

  const heroSection = document.getElementById('home');
  if (heroSection) {
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animatedStats) {
          animatedStats = true;
          animateStats();
        }
      });
    }, { threshold: 0.3 });
    heroObserver.observe(heroSection);
  }
  // ==================== END: STATS COUNTER ANIMATION ====================


  // ==================== START: PROJECT FILTERING ====================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
  // ==================== END: PROJECT FILTERING ====================


  // ==================== START: PROJECT DETAILS MODAL ====================
  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalBodyDynamic = document.getElementById('modal-body-dynamic');
  const viewProjectBtns = document.querySelectorAll('.view-project-btn');

  // Detailed project data repository
  const projectDatabase = {
    highrise: {
      title: "Skyline Commercial Tower (G+24 Stories)",
      category: "Commercial High-Rise",
      image: "images/project_highrise.jpg",
      location: "Central Commercial Hub, Dhaka",
      duration: "2023 - 2025 (Ongoing)",
      scope: "Sub-structure to Super-structure QA/QC & Site Supervision",
      standards: "BNBC 2020, ACI 318, ASTM Standards",
      area: "340,000 Square Feet",
      description: "Comprehensive site engineering oversight for a 24-story state-of-the-art commercial high-rise tower. The structural system incorporates a dual-core reinforced concrete shear wall with moment-resisting frames designed to withstand seismic and lateral wind pressures.",
      highlights: [
        "Monitored deep cast-in-situ bored piling extending 32 meters below ground level.",
        "Conducted concrete slump testing and 28-day compressive cylinder crushing tests for C35/45 grade mix.",
        "Checked bar-bending schedule adherence, lap lengths, seismic hooks, and shear stirrups across column cages.",
        "Managed daily site technical logs, contractor coordination, and crane lifting safety protocols."
      ]
    },
    bridge: {
      title: "Regional Elevated Highway & Viaduct Bridge",
      category: "Infrastructure & Heavy Civil",
      image: "images/project_bridge.jpg",
      location: "Coastal Highway Corridor",
      duration: "2021 - 2023",
      scope: "Foundation Piling & Pre-stressed Girder Launching Oversight",
      standards: "AASHTO LRFD Bridge Design Specifications",
      area: "1.4 Kilometers Total Span",
      description: "Supervised high-precision civil engineering tasks on a multi-span elevated highway and cable-stayed viaduct. Responsible for ensuring precise geometric alignment of bridge piers, girder casting inspection, and elastomeric bearing pad installation.",
      highlights: [
        "Verified high-strength strand tensioning calculations and hydraulic jacking elongation reports.",
        "Oversaw deep pier foundation integrity testing using cross-hole sonic logging (CSL).",
        "Conducted load testing protocols on completed viaduct spans prior to highway opening.",
        "Coordinated closely with regional transportation engineers and environmental compliance inspectors."
      ]
    },
    residence: {
      title: "Aura Modern Luxury Condominiums",
      category: "Residential Complex",
      image: "images/project_residence.jpg",
      location: "Green Urban Heights, Dhaka",
      duration: "2022 - 2024",
      scope: "Full Site Execution, Structural Detailing & BOQ Control",
      standards: "ACI 318-19, Local Municipal Building Regulations",
      area: "220 Luxury Residential Units across 8 Blocks",
      description: "End-to-end site engineering supervision of a luxury residential community featuring 8 residential blocks, double basement parking, swimming pool podium deck, and eco-friendly landscaping drainage.",
      highlights: [
        "Implemented rigorous water-proofing inspections for two-level basement retention walls.",
        "Supervised post-tensioned flat plate slab construction to maximize interior ceiling heights.",
        "Managed comprehensive material takeoff and daily concrete pour registers, cutting wastage by 6.5%.",
        "Prepared as-built structural drawings and coordinate handover documentation for client associations."
      ]
    },
    cad: {
      title: "Deep Pile Foundation & Column Grid Drawings",
      category: "AutoCAD & Structural Detailing",
      image: "images/project_autocad.jpg",
      location: "Structural Engineering Office & Field Validation",
      duration: "Continuous Professional Practice",
      scope: "CAD 2D Working Plans & Bar Bending Schedules (BBS)",
      standards: "BNBC, ACI Detailing Manual (SP-66)",
      area: "Full Drawing Package (S-101 Series)",
      description: "High-precision computer-aided structural drafting and detailing sheets. Includes comprehensive foundation rebar schedules, section cuts through multi-pile caps, column tie spacing for ductile earthquake response, and general structural specifications.",
      highlights: [
        "Designed clear Bar Bending Schedules (BBS) identifying bar marks, diameters, cutting lengths, and shapes.",
        "Drafted foundation pile cap reinforcement details with anchor lengths and development lengths.",
        "Ensured strict conformance with clear concrete cover requirements according to soil exposure classifications.",
        "Streamlined layout layer naming and standardized lineweights for rapid site reading by contractors."
      ]
    }
  };

  const openProjectModal = (projectKey) => {
    const data = projectDatabase[projectKey];
    if (!data) return;

    modalBodyDynamic.innerHTML = `
      <img src="${data.image}" alt="${data.title}" class="modal-project-img" onerror="this.src='images/project_highrise.jpg'">
      <span class="modal-badge">${data.category}</span>
      <h3 class="modal-project-title">${data.title}</h3>

      <div class="modal-details-grid">
        <div class="modal-detail-item">
          <strong>Location:</strong>
          <span>${data.location}</span>
        </div>
        <div class="modal-detail-item">
          <strong>Timeline:</strong>
          <span>${data.duration}</span>
        </div>
        <div class="modal-detail-item">
          <strong>Scope:</strong>
          <span>${data.scope}</span>
        </div>
        <div class="modal-detail-item">
          <strong>Building Code:</strong>
          <span>${data.standards}</span>
        </div>
      </div>

      <h4 class="modal-desc-title">Project Overview</h4>
      <p class="modal-desc-text">${data.description}</p>

      <h4 class="modal-desc-title">Key Engineering Responsibilities</h4>
      <ul class="timeline-achievements" style="margin-bottom: 1.5rem;">
        ${data.highlights.map(h => `<li>${h}</li>`).join('')}
      </ul>

      <button class="btn btn-primary btn-full modal-contact-trigger">
        <i class="fa-solid fa-envelope"></i> Inquire About Similar Projects
      </button>
    `;

    projectModal.classList.add('open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Inquiry button inside modal
    const contactTrigger = modalBodyDynamic.querySelector('.modal-contact-trigger');
    if (contactTrigger) {
      contactTrigger.addEventListener('click', () => {
        closeProjectModal();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
          const subjectInput = document.getElementById('contact-subject');
          if (subjectInput) {
            subjectInput.value = `Inquiry regarding ${data.title}`;
          }
        }
      });
    }
  };

  const closeProjectModal = () => {
    projectModal.classList.remove('open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  viewProjectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectKey = btn.getAttribute('data-project');
      openProjectModal(projectKey);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (projectModal) {
    projectModal.querySelector('.modal-backdrop').addEventListener('click', closeProjectModal);
  }
  // ==================== END: PROJECT DETAILS MODAL ====================


  // ==================== START: CV ACTIONS & MODAL ====================
  const cvModal = document.getElementById('cv-modal');
  const cvModalCloseBtn = document.getElementById('cv-modal-close-btn');
  const previewCvBtn = document.getElementById('preview-cv-btn');
  const downloadCvBtn = document.getElementById('download-cv-btn');
  const modalPrintCv = document.getElementById('modal-print-cv');

  const openCvModal = () => {
    cvModal.classList.add('open');
    cvModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeCvModal = () => {
    cvModal.classList.remove('open');
    cvModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (previewCvBtn) previewCvBtn.addEventListener('click', openCvModal);
  if (cvModalCloseBtn) cvModalCloseBtn.addEventListener('click', closeCvModal);
  if (cvModal) {
    cvModal.querySelector('.modal-backdrop').addEventListener('click', closeCvModal);
  }

  // Download CV Action
  const handleDownloadCv = () => {
    // Open preview modal first and trigger browser print dialog or download
    openCvModal();
    setTimeout(() => {
      window.print();
    }, 400);
  };

  if (downloadCvBtn) downloadCvBtn.addEventListener('click', handleDownloadCv);
  if (modalPrintCv) modalPrintCv.addEventListener('click', () => window.print());
  // ==================== END: CV ACTIONS & MODAL ====================


  // ==================== START: CONTACT FORM & VALIDATION ====================
  const contactForm = document.getElementById('contact-form');
  const formAlert = document.getElementById('form-alert');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const typeSelect = document.getElementById('project-type');
  const messageInput = document.getElementById('contact-message');
  const submitBtn = document.getElementById('submit-btn');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const typeError = document.getElementById('type-error');
  const messageError = document.getElementById('message-error');

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let hasError = false;

      // Reset errors
      nameError.classList.remove('visible');
      emailError.classList.remove('visible');
      typeError.classList.remove('visible');
      messageError.classList.remove('visible');
      formAlert.classList.add('hidden');
      formAlert.className = 'form-alert hidden';

      // Validate Name
      if (!nameInput.value.trim()) {
        nameError.textContent = 'Please enter your full name.';
        nameError.classList.add('visible');
        hasError = true;
      }

      // Validate Email
      if (!emailInput.value.trim()) {
        emailError.textContent = 'Please enter your email address.';
        emailError.classList.add('visible');
        hasError = true;
      } else if (!isValidEmail(emailInput.value.trim())) {
        emailError.textContent = 'Please provide a valid email format.';
        emailError.classList.add('visible');
        hasError = true;
      }

      // Validate Project Type
      if (!typeSelect.value) {
        typeError.textContent = 'Please select a consultation category.';
        typeError.classList.add('visible');
        hasError = true;
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        messageError.textContent = 'Please enter your project details or inquiry message.';
        messageError.classList.add('visible');
        hasError = true;
      } else if (messageInput.value.trim().length < 15) {
        messageError.textContent = 'Please provide a bit more detail (minimum 15 characters).';
        messageError.classList.add('visible');
        hasError = true;
      }

      if (hasError) return;

      // Simulate sending with nice button loading animation
      const originalBtnContent = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Sending Message...</span>';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnContent;

        // Display Success Alert
        formAlert.innerHTML = `
          <strong><i class="fa-solid fa-circle-check"></i> Message Sent Successfully!</strong><br>
          Thank you, <em>${nameInput.value.trim()}</em>. Your consultation inquiry has been forwarded to Engineer Razaul hoqe. You will receive a response at <strong>${emailInput.value.trim()}</strong> within 24 hours.
        `;
        formAlert.className = 'form-alert success';
        formAlert.classList.remove('hidden');

        // Reset inputs
        contactForm.reset();

        // Scroll to alert
        formAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 1000);
    });
  }
  // ==================== END: CONTACT FORM & VALIDATION ====================


  // ==================== START: ESCAPE KEY LISTENER ====================
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
      closeCvModal();
      closeMobileMenu();
    }
  });
  // ==================== END: ESCAPE KEY LISTENER ====================

});

