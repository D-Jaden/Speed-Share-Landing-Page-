//======================================//
//========SCRAMBLE TEXT FUNCTION========//
//======================================//

// GSAP und ScrambleTextPlugin registrieren
gsap.registerPlugin(ScrambleTextPlugin);

// Alle Scramble-Elemente auswählen (jeder <b> mit der Klasse)
const scrambleElements = document.querySelectorAll(".scramble-text");

scrambleElements.forEach((element) => {
    const ogText = element.textContent;
    const link = element.closest('a'); // Parent <a> für Hover-Events

    // Scramble-Animation bei Mouseenter (auf dem Link)
    link.addEventListener("mouseenter", () => {
        gsap.to(element, {
            duration: 0.6, 
            scrambleText: {
                text: ogText, // Ziel ist Originaltext (nach Scramble revealen)
                characters: "10010001100101110110011011001101111100000", // Deine Binary-Chars
                speed: 0.8, 
                revealDelay: 0.3,  // Kurze Verzögerung vor Reveal für Scramble-Effekt
                delimiter: " ", 
                tweenLength: false, 
            },
            ease: "power3.out", 
        });
    });

    link.addEventListener("mouseleave", () => {
        gsap.to(element, {
            duration: 0.3, 
            scrambleText: {
                text: ogText, 
                characters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", 
                speed: 1.2, 
                revealDelay: 0,  
                delimiter: " ", 
                tweenLength: false, 
            },
            ease: "power2.out", 
        });
    });
});

gsap.registerPlugin(ScrollTrigger);

// Mock SplitText functionality for demonstration
class MockSplitText {
    constructor(element, options = {}) {
        this.element = element;
        this.options = options;
        this.lines = [];
        this.words = [];
        this.split();
    }
    split() {
        const text = this.element.textContent;
        this.element.innerHTML = '';
        
        if (this.options.type && this.options.type.includes('words')) {
            const words = text.split(' ');
            words.forEach((word, index) => {
                const wordSpan = document.createElement('span');
                wordSpan.textContent = word + (index < words.length - 1 ? ' ' : '');
                wordSpan.style.display = 'inline-block';
                wordSpan.style.overflow = 'hidden';
                this.words.push(wordSpan);
                this.element.appendChild(wordSpan);
            });
      }
        if (this.options.type && this.options.type.includes('lines')) {
            // Simple line splitting - in real SplitText this is more sophisticated
            const lineWrapper = document.createElement('div');
            lineWrapper.className = 'line';
            lineWrapper.style.overflow = 'hidden';
            lineWrapper.appendChild(this.element.cloneNode(true));
            this.element.innerHTML = '';
            this.element.appendChild(lineWrapper);
            this.lines.push(lineWrapper);
      }
        if (this.options.onSplit) {
            return this.options.onSplit(this);
        }
    }
    static create(element, options) {
        return new MockSplitText(element, options);
    }
}
// Set initial visibility
gsap.set(".split", { opacity: 1});
// Wait for fonts to load
document.fonts.ready.then(() => {
    // Animate title with auto-split effect
    const title = document.querySelector('.about-title');
    MockSplitText.create(title, {
        type: "words,lines",
        onSplit: (instance) => {
            const chars = title.textContent.split('');
            title.innerHTML = '';
            
            chars.forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.display = 'inline-block';
                span.style.transform = 'translateY(120%)';
                span.style.opacity = '0';
                title.appendChild(span);
        });
            return gsap.to(title.children, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.05,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: title,
                    start: "top 80%",
                    end: "bottom 60%",
                    toggleActions: "play none none reverse"
                }
            });
        }
});
// Animate description with line-by-line reveal
const description = document.querySelector('.about-description');

// Split text into lines manually for better control
const words = description.textContent.split(' ');
description.innerHTML = '';

let currentLine = document.createElement('div');
currentLine.style.overflow = 'hidden';
currentLine.style.height = 'auto';

const lineWrapper = document.createElement('div');
lineWrapper.style.transform = 'translateY(100%)';
lineWrapper.style.opacity = '0';

words.forEach((word, index) => {
    const wordSpan = document.createElement('span');
    wordSpan.textContent = word + (index < words.length - 1 ? ' ' : '');
    wordSpan.style.display = 'inline';
    lineWrapper.appendChild(wordSpan);
});
    
currentLine.appendChild(lineWrapper);
description.appendChild(currentLine);
gsap.to(lineWrapper, {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
        trigger: description,
        start: "top 75%",
        end: "bottom 50%",
        toggleActions: "play none none reverse"
    }
});
// Animate feature cards
gsap.to('.feature-card', {
    y: 0,
    opacity: 1,
    duration: 0.8,
    stagger: 0.2,
    ease: "power3.out",
    scrollTrigger: {
        trigger: '.features-grid',
        start: "top 80%",
        end: "bottom 60%",
        toggleActions: "play none none reverse"
    }
});
// Show features grid
    gsap.to('.features-grid', {
        opacity: 1,
        duration: 0.6,
        scrollTrigger: {
            trigger: '.features-grid',
            start: "top 85%",
            toggleActions: "play none none reverse"
        }
    });
});
// Add enhanced hover animations for feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
        });
});
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    });
});
// Add parallax effect to the background
gsap.to('#about::before', {
    yPercent: -50,
    ease: "none",
    scrollTrigger: {
        trigger: "#about",
        start: "top bottom",
        end: "bottom top",
        scrub: true
    }
});
//========================================//
//========TIMELINE SCROLL ANIMATION=======//
//========================================//

gsap.registerPlugin(ScrollTrigger);

// Enhanced timeline animation with your provided code
gsap.utils.toArray('.timeline-item').forEach((item, index) => {
    const marker = item.querySelector('.timeline-marker');
    const content = item.querySelector('.timeline-content');
    
    // Set initial states
    gsap.set(item, { opacity: 0, y: 100 });
    gsap.set(marker, { scale: 0 });
    
    // Create scroll trigger for timeline items
    ScrollTrigger.create({
        trigger: item,
        start: "top 85%",
        onEnter: () => {
            // Animate timeline item
            gsap.to(item, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out"
            });
            
            // Animate marker with bounce effect
            gsap.to(marker, {
                scale: 1,
                duration: 0.6,
                ease: "back.out(2)",
                delay: 0.3
            });
            
            // Add pulsing effect to marker
            gsap.to(marker, {
                boxShadow: "0 0 30px rgba(77, 169, 255, 0.8), 0 0 60px rgba(31, 80, 255, 0.6)",
                duration: 0.3,
                delay: 0.8,
                yoyo: true,
                repeat: 1
            });
        },
        onLeave: () => {
            gsap.to(item, {
                opacity: 0.7,
                duration: 0.3
            });
        },
        onEnterBack: () => {
            gsap.to(item, {
                opacity: 1,
                duration: 0.3
            });
        }
    });
});
// Animate the timeline line on scroll
gsap.fromTo('.timeline::before', 
    { scaleY: 0, transformOrigin: 'top center' },
    {
        scaleY: 1,
        duration: 2,
        ease: "power3.inOut",
        scrollTrigger: {
            trigger: '.timeline',
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1
        }
    }
);
// Animate section title
gsap.fromTo('.map-title',
    { opacity: 0, y: -50, scale: 0.8 },
    {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: '.map-title',
            start: 'top 90%'
        }
    }
);
// Add enhanced hover effects
document.querySelectorAll('.timeline-content').forEach(content => {
    content.addEventListener('mouseenter', () => {
        gsap.to(content, {
            y: -10,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    content.addEventListener('mouseleave', () => {
        gsap.to(content, {
            y: 0,
            duration: 0.3,
            ease: "power2.out"
        });
    });
});
// Add marker hover animation
document.querySelectorAll('.timeline-marker').forEach(marker => {
    marker.addEventListener('mouseenter', () => {
        gsap.to(marker, {
            scale: 1.2,
            duration: 0.3,
            ease: "back.out(2)"
        });
    });
    
    marker.addEventListener('mouseleave', () => {
        gsap.to(marker, {
            scale: 1,
            duration: 0.3,
            ease: "back.out(2)"
        });
    });
});
// Globe parallax effect
gsap.to(".globe-container", {
  bottom: "100%",
  ease: "none",
  scrollTrigger: {
    trigger: ".top-container",
    start: "top top",
    end: "bottom top",
    scrub: true,
    invalidateOnRefresh: true
  }
});
