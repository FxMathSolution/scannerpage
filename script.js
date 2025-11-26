document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.innerHTML = navLinks.classList.contains('active')
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            }

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for Fade-in Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animation classes to elements
    const animatedElements = document.querySelectorAll('.feature-card, .about-content, .pricing-card');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // --- Interactive Widgets ---

    // Promo Popup Logic
    const promoPopup = document.getElementById('promo-popup');
    const closePopupBtn = document.getElementById('close-popup');
    const promoTitle = document.getElementById('promo-title');
    const promoMessage = document.getElementById('promo-message');
    const promoCodeSpan = document.getElementById('promo-code');
    const copyCodeBtn = document.getElementById('copy-code');
    const promoBtn = document.getElementById('promo-btn');

    const defaultPromoConfig = {
        enabled: true,
        title: "Special Offer!",
        message: "Get 20% off your first purchase. Limited time only!",
        discountCode: "HARMONICS20",
        buttonText: "Claim Offer",
        buttonLink: "#pricing"
    };

    const defaultSocialConfig = {
        enabled: true,
        telegram: "https://t.me/fxmath",
        whatsapp: "https://wa.me/1234567890",
        email: "mailto:support@fxmath.com"
    };

    function initPromo(config) {
        if (config.enabled && !sessionStorage.getItem('promoShown')) {
            promoTitle.textContent = config.title;
            promoMessage.textContent = config.message;
            promoCodeSpan.textContent = config.discountCode;
            promoBtn.textContent = config.buttonText;
            promoBtn.href = config.buttonLink;

            // Show popup after a short delay
            setTimeout(() => {
                promoPopup.classList.remove('hidden');
                sessionStorage.setItem('promoShown', 'true');
            }, 2000);
        }
    }

    fetch('promo.json')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(config => initPromo(config))
        .catch(err => {
            console.warn('Error loading promo config, using default:', err);
            initPromo(defaultPromoConfig);
        });

    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', () => {
            promoPopup.classList.add('hidden');
        });
    }

    // Close on click outside
    if (promoPopup) {
        promoPopup.addEventListener('click', (e) => {
            if (e.target === promoPopup) {
                promoPopup.classList.add('hidden');
            }
        });
    }

    if (copyCodeBtn) {
        copyCodeBtn.addEventListener('click', () => {
            const code = promoCodeSpan.textContent;
            navigator.clipboard.writeText(code).then(() => {
                const originalIcon = copyCodeBtn.innerHTML;
                copyCodeBtn.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    copyCodeBtn.innerHTML = originalIcon;
                }, 2000);
            });
        });
    }

    // Floating Social Widget Logic
    const socialWidget = document.getElementById('social-widget');
    const socialToggleBtn = document.getElementById('social-toggle');
    const socialMenu = document.querySelector('.social-menu');

    function initSocial(config) {
        if (config.enabled) {
            // Clear existing links to avoid duplicates if called multiple times
            socialMenu.innerHTML = '';

            if (config.telegram) {
                addSocialLink('Telegram', 'fab fa-telegram-plane', config.telegram);
            }
            if (config.whatsapp) {
                addSocialLink('WhatsApp', 'fab fa-whatsapp', config.whatsapp);
            }
            if (config.email) {
                addSocialLink('Email', 'fas fa-envelope', config.email);
            }
        } else {
            socialWidget.style.display = 'none';
        }
    }

    fetch('social.json')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(config => initSocial(config))
        .catch(err => {
            console.warn('Error loading social config, using default:', err);
            initSocial(defaultSocialConfig);
        });

    function addSocialLink(name, iconClass, url) {
        const link = document.createElement('a');
        link.href = url;
        link.className = 'social-item';
        link.target = '_blank';
        link.innerHTML = `<i class="${iconClass}"></i><span>${name}</span>`;
        socialMenu.appendChild(link);
    }

    if (socialToggleBtn) {
        socialToggleBtn.addEventListener('click', () => {
            socialWidget.classList.toggle('active');
            socialMenu.classList.toggle('hidden');
        });
    }
});
