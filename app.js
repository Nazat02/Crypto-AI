console.log("CryptoAI loaded.");

/* ==========================
   Navbar Shadow on Scroll
========================== */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = "0 8px 40px rgba(0,0,0,0.4)";
        navbar.style.borderColor = "rgba(124,58,237,0.3)";
    } else {
        navbar.style.boxShadow = "none";
        navbar.style.borderColor = "rgba(124,58,237,0.18)";
    }
});

/* ==========================
   Scroll Reveal
========================== */

const revealEls = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add("visible");
                }, i * 80);
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12 }
);

revealEls.forEach(el => revealObserver.observe(el));

/* ==========================
   Counter Animation
========================== */

const statBoxes = document.querySelectorAll(".stat-box");

statBoxes.forEach(box => {
    const heading = box.querySelector("h3");
    if (!heading) return;

    const text = heading.innerText;
    const number = parseInt(text.replace(/\D/g, ""));
    if (!number) return;

    let started = false;

    const counterObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !started) {
                    started = true;
                    let current = 0;
                    const duration = 1200;
                    const start = performance.now();

                    const animate = (now) => {
                        const elapsed = now - start;
                        const progress = Math.min(elapsed / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        current = Math.floor(eased * number);

                        if (text.includes("%")) {
                            heading.innerText = current + "%";
                        } else if (text.includes("+")) {
                            heading.innerText = current + "+";
                        } else {
                            heading.innerText = current;
                        }

                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        } else {
                            heading.innerText = text;
                        }
                    };

                    requestAnimationFrame(animate);
                    counterObserver.disconnect();
                }
            });
        },
        { threshold: 0.4 }
    );

    counterObserver.observe(box);
});

/* ==========================
   Pricing Buttons
========================== */

const planButtons = document.querySelectorAll(".price-card button");

planButtons.forEach(button => {
    button.addEventListener("click", () => {
        alert("Payment integration coming soon.");
    });
});

/* ==========================
   Hero CTA → Pricing
========================== */

const heroBtn = document.querySelector(".hero-btn");
if (heroBtn) {
    heroBtn.addEventListener("click", () => {
        document.querySelector("#pricing").scrollIntoView({ behavior: "smooth" });
    });
}

/* ==========================
   Footer Year
========================== */

const footerP = document.querySelector("footer p");
if (footerP) {
    footerP.innerHTML = `© ${new Date().getFullYear()} CryptoAI. All rights reserved.`;
}

console.log("All systems ready.");
