// ======================================
// AEROVEX MAIN.JS
// ======================================


// ======================================
// LOAD HEADER
// ======================================

fetch("./components/header.html")
    .then(res => res.text())
    .then(data => {

        const headerContainer = document.getElementById("header");

        if (!headerContainer) return;

        headerContainer.innerHTML = data;


        // ======================================
        // MOBILE MENU
        // ======================================

        const menuBtn = document.querySelector(".menu-btn");
        const navbar = document.querySelector(".navbar");

        if (menuBtn && navbar) {

            menuBtn.addEventListener("click", () => {

                navbar.classList.toggle("active");

                menuBtn.classList.toggle("active");

            });

        }


        // ======================================
        // MOBILE DROPDOWN
        // ======================================

        document
            .querySelectorAll(".has-dropdown > a")
            .forEach(item => {

                item.addEventListener("click", function (e) {

                    if (window.innerWidth < 992) {

                        e.preventDefault();

                        this.parentElement.classList.toggle("active");

                    }

                });

            });


        // ======================================
        // STICKY HEADER
        // ======================================

        const header = document.querySelector(".header");

        if (header) {

            const handleHeaderScroll = () => {

                if (window.scrollY > 50) {

                    header.classList.add("sticky");

                } else {

                    header.classList.remove("sticky");

                }

            };

            window.addEventListener(
                "scroll",
                handleHeaderScroll,
                { passive: true }
            );

            handleHeaderScroll();

        }


        // ======================================
        // ACTIVE MENU
        // ======================================

        setActiveMenu();

    })
    .catch(error => {

        console.error(
            "Header loading error:",
            error
        );

    });



// ======================================
// LOAD FOOTER
// ======================================

fetch("./components/footer.html")
    .then(res => res.text())
    .then(data => {

        const footer = document.getElementById("footer");

        if (footer) {

            footer.innerHTML = data;

        }

    })
    .catch(error => {

        console.error(
            "Footer loading error:",
            error
        );

    });



// ======================================
// LOAD CTA
// ======================================

fetch("./components/cta.html")
    .then(res => res.text())
    .then(data => {

        const cta = document.getElementById("cta");

        if (cta) {

            cta.innerHTML = data;

        }

    })
    .catch(error => {

        console.error(
            "CTA loading error:",
            error
        );

    });



// ======================================
// ACTIVE MENU
// ======================================

function setActiveMenu() {

    const page =
        window.location.pathname
            .split("/")
            .pop() || "index.html";


    // Remove active class

    document
        .querySelectorAll(".nav-menu a")
        .forEach(link => {

            link.classList.remove("active");

        });


    // Home

    if (
        page === "" ||
        page === "index.html"
    ) {

        document
            .querySelector(
                '.nav-menu a[href="index.html"]'
            )
            ?.classList.add("active");

        return;

    }


    // About

    if (page === "about.html") {

        document
            .querySelector(
                '.nav-menu a[href="about.html"]'
            )
            ?.classList.add("active");

        return;

    }


    // Services

    const servicePages = [

        "services.html",
        "installation.html",
        "repair.html",
        "maintenance.html"

    ];

    if (servicePages.includes(page)) {

        document
            .querySelector(
                ".has-dropdown > a"
            )
            ?.classList.add("active");

        return;

    }


    // Book Service

    if (page === "book-service.html") {

        document
            .querySelector(
                '.nav-menu a[href="book-service.html"]'
            )
            ?.classList.add("active");

        return;

    }


    // Blog

    if (
        page.includes("blog") ||
        window.location.pathname.includes("/blog/")
    ) {

        document
            .querySelector(
                '.nav-menu a[href="/blog/"]'
            )
            ?.classList.add("active");

    }

}



// ======================================
// HOME PAGE
// HERO
// ======================================

document.addEventListener(
    "DOMContentLoaded",
    () => {


        // ======================================
        // CHECK HERO
        // ======================================

        const hero =
            document.querySelector(".hero");

        if (!hero) return;


        // ======================================
        // HERO BUTTONS
        // ======================================
        // No JavaScript transform here.
        // CSS handles the hover animation.


        const heroButtons =
            document.querySelectorAll(".hero-btn");

        heroButtons.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    button.classList.add(
                        "clicked"
                    );

                    setTimeout(() => {

                        button.classList.remove(
                            "clicked"
                        );

                    }, 300);

                }
            );

        });


        // ======================================
        // HERO SCROLL REVEAL
        // ======================================
        // CSS already handles the entrance
        // animation, so we don't manipulate
        // transform here.


        const heroElements = [

            ".hero-badge",
            ".hero-content h1",
            ".hero-content > p",
            ".hero-buttons",
            ".hero-features",
            ".hero-visual"

        ];


        const heroObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "show"
                            );

                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );


        heroElements.forEach(selector => {

            document
                .querySelectorAll(selector)
                .forEach(element => {

                    heroObserver.observe(
                        element
                    );

                });

        });

    }
);


// ======================================
// TRUST SECTION COUNTER
// ======================================

const counters = document.querySelectorAll(".counter");

if (counters.length) {

    const counterObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const counter = entry.target;

                const target =
                    parseFloat(counter.dataset.target);

                const isDecimal =
                    counter.dataset.decimal === "true";

                const duration = 1800;

                const startTime = performance.now();

                function updateCounter(currentTime) {

                    const elapsed =
                        currentTime - startTime;

                    const progress =
                        Math.min(elapsed / duration, 1);

                    // Smooth easing
                    const ease =
                        1 - Math.pow(1 - progress, 3);

                    const current =
                        target * ease;

                    if (isDecimal) {

                        counter.textContent =
                            current.toFixed(1) + "★";

                    } else {

                        counter.textContent =
                            Math.floor(current).toLocaleString() + "+";

                    }

                    if (progress < 1) {

                        requestAnimationFrame(updateCounter);

                    } else {

                        if (isDecimal) {

                            counter.textContent =
                                target.toFixed(1) + "★";

                        } else {

                            counter.textContent =
                                target.toLocaleString() + "+";

                        }

                    }

                }

                requestAnimationFrame(updateCounter);

                observer.unobserve(counter);

            });

        },
        {
            threshold: 0.4
        }
    );


    counters.forEach(counter => {

        counterObserver.observe(counter);

    });

}



// =====================================================
// SERVICES - LEARN MORE
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    const learnButtons =
        document.querySelectorAll(".learn-more");


    learnButtons.forEach(button => {

        button.addEventListener("click", () => {

            const card =
                button.closest(".service-card");


            if (!card) return;


            // Close other cards

            document
                .querySelectorAll(".service-card.open")
                .forEach(openCard => {

                    if (openCard !== card) {

                        openCard.classList.remove("open");

                    }

                });


            // Toggle current card

            card.classList.toggle("open");


            // Change button text

            if (card.classList.contains("open")) {

                button.childNodes[0].textContent =
                    "Show Less ";

            } else {

                button.childNodes[0].textContent =
                    "Learn More ";

            }

        });

    });

});