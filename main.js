
//======================================//
//========SCRAMBLE TEXT FUNCTION========//
//======================================//

// GSAP und ScrambleTextPlugin registrieren
gsap.registerPlugin(ScrambleTextPlugin);

// Alle Scramble-Elemente auswählen (jeder <b> mit der Klasse)
const scrambleElements = document.querySelectorAll(".scramble-text");

// Für jedes Element: Originaltext speichern und Events hinzufügen
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

    // Unscramble bei Mouseleave (sofort zurück zum Original)
    link.addEventListener("mouseleave", () => {
        gsap.to(element, {
            duration: 0.3, 
            scrambleText: {
                text: ogText, // Direkt zum Original
                characters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", // Normale Buchstaben für sanften Übergang (oder leer lassen)
                speed: 1.2, 
                revealDelay: 0,  // Keine Verzögerung
                delimiter: " ", 
                tweenLength: false, 
            },
            ease: "power2.out", 
        });
    });
});

