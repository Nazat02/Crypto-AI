console.log("CryptoAI Loaded");

/* ==========================
   Sync Hero Padding to Navbar Height
========================== */

const navbar = document.querySelector(".navbar");

const syncNavbarHeight = () => {

    if (!navbar) return;

    const height = navbar.offsetHeight;
    const top = parseFloat(getComputedStyle(navbar).top) || 0;

    document.documentElement.style.setProperty(
        "--navbar-height",
        `${height + top}px`
    );

};

syncNavbarHeight();

window.addEventListener("resize", syncNavbarHeight);
window.addEventListener("orientationchange", syncNavbarHeight);

if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(syncNavbarHeight);
}

/* ==========================
   Navbar Shadow on Scroll
========================== */

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.style.boxShadow =
            "0 10px 30px rgba(0,0,0,0.35)";

    } else {

        navbar.style.boxShadow = "none";

    }

});

/* ==========================
   Reveal Elements on Scroll
========================== */

const revealElements = document.querySelectorAll(
    ".feature-card, .stat-box, .price-card, .testimonial-card, .trust-box"
);

const observer = new IntersectionObserver(

(entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";

            entry.target.style.transform =
                "translateY(0)";

        }

    });

},

{
    threshold: 0.15
}

);

revealElements.forEach(el => {

    el.style.opacity = "0";

    el.style.transform =
        "translateY(40px)";

    el.style.transition =
        "all 0.8s ease";

    observer.observe(el);

});

/* ==========================
   Counter Animation
========================== */

const statNumbers =
document.querySelectorAll(".stat-box h3");

statNumbers.forEach(stat => {

    const text = stat.innerText;

    // Skip values like "24/7" that aren't meant to be counted up
    if (text.includes("/")) return;

    const number =
    parseFloat(text.replace(/[^0-9.]/g, ""));

    if (!number && number !== 0) return;

    let current = 0;

    const speed =
    Math.max(number / 100, 0.5);

    const updateCounter = () => {

        current += speed;

        if (current >= number) {

            stat.innerText = text;

            return;

        }

        if (text.includes("%")) {

            stat.innerText = current.toFixed(1) + "%";

        } else if (text.includes("+")) {

            stat.innerText = Math.floor(current) + "+";

        } else {

            stat.innerText = Math.floor(current);

        }

        requestAnimationFrame(updateCounter);

    };

    const counterObserver =
    new IntersectionObserver(

    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                updateCounter();

                counterObserver.disconnect();

            }

        });

    },

    {
        threshold: 0.4
    }

    );

    counterObserver.observe(stat);

});

/* ==========================
   Pricing Button Demo
========================== */

const planButtons =
document.querySelectorAll(".price-card button");

planButtons.forEach(button => {

    button.addEventListener("click", () => {

        alert(
            "Payment integration will be connected later."
        );

    });

});

/* ==========================
   Hero Button Demo
========================== */

const heroButton =
document.querySelector(".hero-btn");

if (heroButton) {

    heroButton.addEventListener("click", () => {

        document
        .querySelector("#pricing")
        .scrollIntoView({
            behavior: "smooth"
        });

    });

}

/* ==========================
   Footer Year Auto Update
========================== */

const footerText =
document.querySelector("footer p");

if (footerText) {

    const year =
    new Date().getFullYear();

    footerText.innerHTML =
        `© ${year} CryptoAI. All rights reserved.`;

}

console.log("All systems ready.");
