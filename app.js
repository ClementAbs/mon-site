// Application data
const applicationData = {
  properties: {
    electrical_conductivity: "Jusqu'à 1000 fois plus conducteur après carbonisation à 1200°C",
    emi_shielding: "40-51 dB d'efficacité de blindage EMI",
    radiation_shielding: "32% de réduction du taux de dose, 55% de réduction du taux d'équivalent de dose",
    tensile_strength: "4900 MPa",
    density: "Faible densité comparé aux métaux"
  },
  research_data: {
    carbonization_temps: ["800°C", "1000°C", "1200°C"],
    emi_effectiveness: [11.93, 32.04, 40.17],
    frequency_range: "30 MHz à 1.5 GHz",
    test_methods: ["Méthode guide d'onde", "Méthode ligne de transmission coaxiale"]
  },
  technical_specs: {
    frequencies: [30, 100, 1000, 1500, 2450],
    shielding_values: [40.51, 41.75, 45.13, 50.90, 40.17],
    carbon_content: {
      "800": 73.8,
      "1000": 87.6, 
      "1200": 92.3
    }
  }
};

// DOM Elements
let navToggle, navMenu, navLinks;

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize DOM elements
    navToggle = document.getElementById('navToggle');
    navMenu = document.getElementById('navMenu');
    navLinks = document.querySelectorAll('.nav-link');
    
    initializeNavigation();
    initializeCharts();
    initializeAnimations();
    initializeProgressBars();
});

// Navigation functionality
function initializeNavigation() {
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Navigation links
    if (navLinks) {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const href = this.getAttribute('href');
                if (href && href.startsWith('#')) {
                    const targetId = href.substring(1);
                    scrollToSection(targetId);
                    closeMobileMenu();
                }
            });
        });
    }
    
    // Update active navigation on scroll
    window.addEventListener('scroll', updateActiveNavigation);
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && navToggle && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
    if (navToggle) {
        navToggle.classList.toggle('active');
    }
}

function closeMobileMenu() {
    if (navMenu) {
        navMenu.classList.remove('active');
    }
    if (navToggle) {
        navToggle.classList.remove('active');
    }
}

function scrollToSection(sectionId) {
    console.log('Scrolling to section:', sectionId); // Debug log
    const section = document.getElementById(sectionId);
    if (section) {
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 70;
        const sectionTop = section.offsetTop - navbarHeight - 10;
        
        window.scrollTo({
            top: Math.max(0, sectionTop),
            behavior: 'smooth'
        });
    } else {
        console.warn('Section not found:', sectionId); // Debug log
    }
}

function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 70;
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 50;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    if (navLinks) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
}

// Chart initialization
function initializeCharts() {
    // Add a small delay to ensure DOM is fully ready
    setTimeout(() => {
        initializeEMIChart();
        initializeCarbonChart();
    }, 100);
}

function initializeEMIChart() {
    const ctx = document.getElementById('emiChart');
    if (!ctx) return;
    
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['30 MHz', '100 MHz', '1 GHz', '1.5 GHz', '2.45 GHz'],
            datasets: [{
                label: 'Efficacité de Blindage EMI (dB)',
                data: applicationData.technical_specs.shielding_values,
                borderColor: '#1FB8CD',
                backgroundColor: 'rgba(31, 184, 205, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#1FB8CD',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--color-text').trim(),
                        font: {
                            family: 'FKGroteskNeue, Inter, sans-serif',
                            size: 14
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--color-border').trim()
                    },
                    ticks: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--color-text-secondary').trim(),
                        font: {
                            family: 'FKGroteskNeue, Inter, sans-serif'
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    max: 60,
                    grid: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--color-border').trim()
                    },
                    ticks: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--color-text-secondary').trim(),
                        font: {
                            family: 'FKGroteskNeue, Inter, sans-serif'
                        },
                        callback: function(value) {
                            return value + ' dB';
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });
}

function initializeCarbonChart() {
    const ctx = document.getElementById('carbonChart');
    if (!ctx) return;
    
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['800°C', '1000°C', '1200°C'],
            datasets: [
                {
                    label: 'Contenu Carbone (%)',
                    data: [73.8, 87.6, 92.3],
                    backgroundColor: '#FFC185',
                    borderColor: '#B4413C',
                    borderWidth: 1,
                    yAxisID: 'y'
                },
                {
                    label: 'Efficacité EMI (dB)',
                    data: applicationData.research_data.emi_effectiveness,
                    backgroundColor: '#1FB8CD',
                    borderColor: '#5D878F',
                    borderWidth: 1,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--color-text').trim(),
                        font: {
                            family: 'FKGroteskNeue, Inter, sans-serif',
                            size: 12
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--color-border').trim()
                    },
                    ticks: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--color-text-secondary').trim(),
                        font: {
                            family: 'FKGroteskNeue, Inter, sans-serif'
                        }
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    max: 100,
                    grid: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--color-border').trim()
                    },
                    ticks: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--color-text-secondary').trim(),
                        font: {
                            family: 'FKGroteskNeue, Inter, sans-serif'
                        },
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    max: 50,
                    grid: {
                        drawOnChartArea: false,
                    },
                    ticks: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--color-text-secondary').trim(),
                        font: {
                            family: 'FKGroteskNeue, Inter, sans-serif'
                        },
                        callback: function(value) {
                            return value + ' dB';
                        }
                    }
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Progress bar animations
function initializeProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.setProperty('--target-width', width);
                progressBar.classList.add('loaded');
                observer.unobserve(progressBar);
            }
        });
    }, observerOptions);
    
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// FAQ functionality
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const faqAnswer = faqItem.querySelector('.faq-answer');
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        const answer = item.querySelector('.faq-answer');
        if (answer) {
            answer.classList.remove('active');
        }
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
        if (faqAnswer) {
            faqAnswer.classList.add('active');
        }
    }
}

// Animations
function initializeAnimations() {
    const animatedElements = document.querySelectorAll('.card, .app-card, .temp-card, .market-stat');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Resource download functionality
function downloadResource(resourceType) {
    const resources = {
        'whitepaper': {
            name: 'Livre_Blanc_Kevlar_EM.pdf',
            message: 'Téléchargement du livre blanc technique...'
        },
        'datasheet': {
            name: 'Fiches_Techniques_Kevlar_EM.pdf',
            message: 'Téléchargement des fiches techniques...'
        },
        'research': {
            name: 'Articles_Recherche_Kevlar_EM.pdf',
            message: 'Téléchargement des articles de recherche...'
        },
        'samples': {
            name: 'Demande_Echantillons_Kevlar_EM.pdf',
            message: 'Ouverture du formulaire de demande d\'échantillons...'
        }
    };
    
    const resource = resources[resourceType];
    if (resource) {
        // Show download message
        showNotification(resource.message);
        
        // Simulate download or redirect
        if (resourceType === 'samples') {
            // For samples, we could open a contact form or redirect to a form
            setTimeout(() => {
                showNotification('Formulaire de demande ouvert. Veuillez nous contacter à research@kevlar-em.tech');
            }, 1000);
        } else {
            // For other resources, simulate download
            setTimeout(() => {
                showNotification(`${resource.name} sera disponible prochainement. Contactez-nous pour un accès anticipé.`);
            }, 1000);
        }
    }
}

// Notification system
function showNotification(message) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button onclick="closeNotification(this)" class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-base);
        box-shadow: var(--shadow-lg);
        z-index: 1001;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    const notificationContent = notification.querySelector('.notification-content');
    notificationContent.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--space-16);
        gap: var(--space-12);
        color: var(--color-text);
        font-size: var(--font-size-sm);
    `;
    
    const closeButton = notification.querySelector('.notification-close');
    closeButton.style.cssText = `
        background: none;
        border: none;
        font-size: var(--font-size-xl);
        cursor: pointer;
        color: var(--color-text-secondary);
        padding: 0;
        line-height: 1;
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function closeNotification(button) {
    const notification = button.closest('.notification');
    if (notification) {
        notification.remove();
    }
}

// Add slide-in animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Application card interactions
document.addEventListener('DOMContentLoaded', function() {
    const appCards = document.querySelectorAll('.app-card');
    
    appCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            showApplicationDetails(category);
        });
    });
});

function showApplicationDetails(category) {
    const applications = {
        'spatial': {
            title: 'Applications Spatiales',
            details: 'Le kevlar électromagnétique offre une protection exceptionnelle contre les radiations cosmiques tout en maintenant une flexibilité et un poids réduits, essentiels pour les missions spatiales.'
        },
        'electronique': {
            title: 'Applications Électroniques',
            details: 'Avec une conductivité électrique jusqu\'à 1000 fois supérieure après carbonisation, le kevlar EM constitue un blindage EMI de choix pour protéger les équipements électroniques sensibles.'
        },
        'defense': {
            title: 'Applications Défense',
            details: 'La combinaison unique de protection balistique et de blindage électromagnétique fait du kevlar EM un matériau révolutionnaire pour les équipements de défense modernes.'
        },
        'industriel': {
            title: 'Applications Industrielles',
            details: 'Les propriétés mécaniques exceptionnelles et la résistance chimique du kevlar EM en font un choix optimal pour diverses applications industrielles exigeantes.'
        }
    };
    
    const app = applications[category];
    if (app) {
        showNotification(`${app.title}: ${app.details}`);
    }
}

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@master/dist/smoothscroll.min.js';
    document.head.appendChild(script);
}

// Export functions for global access
window.scrollToSection = scrollToSection;
window.toggleFaq = toggleFaq;
window.downloadResource = downloadResource;
window.closeNotification = closeNotification;