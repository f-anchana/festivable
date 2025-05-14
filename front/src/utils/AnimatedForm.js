import { gsap } from "gsap";

//------------------------------------------------------- Animation Authcontainer --------------------------------

export const animateForm = () => {
    const screenWidth = window.innerWidth; // Récupère la largeur de l'écran
    const authContainer = document.querySelector(".auth-container");

    const title1 = document.querySelector(".span-one");
    const title2 = document.querySelector(".span-two");
    const paragraph = document.querySelector(".auth-container p");

    if (authContainer) {
        const containerWidth = authContainer.offsetWidth; // Largeur du bloc
        const distanceToMove = screenWidth - containerWidth + 1; // Distance jusqu'au bord droit

        gsap.to(authContainer, { x: -distanceToMove, duration: 1, ease: "power2.out" });

        gsap.to(".signup-buttons", {
            opacity: 1, width: "100%", duration: 1, ease: "power2.out", paddingLeft:"40%",
            onStart: () => {
                title1.innerHTML = "De retour ?";
                title2.innerHTML = "Laissez-vous guider !";
                paragraph.innerHTML = "Retrouvez vos festivals favoris, échangez avec la communauté et préparez votre prochaine expérience accessible.";
            }
        });

        gsap.to(".login-form", { opacity: 0, width: "0%", duration: 1, ease: "power2.out", padding: 0 });

        gsap.set(".signup-button", { display: "none" });
        gsap.set(".login-button", { display: "block" });

        gsap.to(".decor-one", { x: "120%", duration: 1, ease: "power2.out", });
        gsap.to(".decor-two", { right: "", left: "0", scaleX: -1, duration: 1, ease: "power2.out", });
        gsap.to(".decor-three", { right: "", left: "25px", duration: 1, ease: "power2.out", });
    }
};

export const animateFormBack = () => {

    const title1 = document.querySelector(".span-one");
    const title2 = document.querySelector(".span-two");
    const paragraph = document.querySelector(".auth-container p");

    gsap.to(".auth-container", { x: 0, duration: 1, ease: "power2.out" });

    gsap.to(".signup-buttons", {
        opacity: 0, width: "0%", duration: 1, ease: "power2.out", padding: 0,
        onStart: () => {
            title1.innerHTML = "Plongez au cœur";
            title2.innerHTML = "des festivals accessibles !";
            paragraph.innerHTML = "Vous souhaitez vivre une expérience unique et découvrir des festivals accessibles ? Rejoignez notre communauté !";
        }
    });

    gsap.to(".login-form", { opacity: 1, width: "100%", duration: 1, ease: "power2.out", paddingRight:"40%", });

    gsap.set(".signup-button", { display: "block" });
    gsap.set(".login-button", { display: "none" });

    gsap.to(".decor-one", { x: 0, duration: 1, ease: "power2.out", });
    gsap.to(".decor-two", { right: "0", left: "", scaleX: 1, duration: 1, ease: "power2.out", });
    gsap.to(".decor-three", { right: "25px", left: "", duration: 1, ease: "power2.out", });
};

//---------------------------------------------------------- Animation Hover ----------------------------------------

export const gradientFestivalierEffect = () => {
    gsap.to(".auth-orange", {
        opacity: 1,
        zIndex: 0,
    });
    gsap.to(".auth-light-blue", {
        zIndex: -1,
    });
    gsap.to(".btn-orange", {
        opacity: 1,
    });
}

export const gradientOrganismeEffect = () => {
    gsap.to(".auth-light-blue", {
        opacity: 1,
        zIndex: 0,
    });
    gsap.to(".auth-orange", {
        zIndex: -1,
    });
    gsap.to(".btn-light-blue", {
        opacity: 1,
    });
}

export const resetFestivalierGradient = () => {
    gsap.to(".auth-orange", {
        opacity: 0,
        zIndex: -1,
    });
    gsap.to(".auth-light-blue", {
        zIndex: 0,
    });
    gsap.to(".btn-orange", {
        opacity: 0,
    });
};

export const resetOrganizerGradient = () => {
    gsap.to(".auth-light-blue", {
        opacity: 0,
    });
    gsap.to(".auth-orange", {
        zIndex: 0,
    });
    gsap.to(".btn-light-blue", {
        opacity: 0,
    });
};

//---------------------------------------------------------- Animation Click Inscription ----------------------------------------

export const fadeInForm = (element) => {
    if (!element) return; // Sécurité pour éviter les erreurs si l'élément est null
    gsap.to(element, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
    });
};

//---------------------------------------------------------- Animation Inscription Organizer Steps ----------------------------------------

export const nextStepAnimation = (currentStep) => {
    gsap.to(".organizer-signup-form", {
        x: `-${currentStep * 100}%`,
        ease: "circ"
    });
    gsap.to(".progress-bar", {
        width: `${currentStep * 50}%`,
        ease: "circ"
    });
    gsap.to(".signup-buttons", {
        paddingLeft: (currentStep === 1 || currentStep === 2) ? 0 : "40%",
            maxWidth: (currentStep === 1 || currentStep === 2) ? "850px" : "none",
    });
};


export const centerForm = (step) => {
    if (step === 2) {
        gsap.to([".auth-container", ".login-form", ".btn-container"], {
            autoAlpha: 0, // Rend invisible avec opacity: 0 et visibility: hidden
            onComplete: () => {
                document.querySelectorAll(".auth-container, .login-form, .btn-container").forEach(el => {
                    el.style.display = "none";
                });
            }
        });
    } else if (step === 1) {
        gsap.to([".auth-container", ".login-form", ".btn-container"], {
            autoAlpha: 1, // Rend invisible avec opacity: 0 et visibility: hidden
            onComplete: () => {
                document.querySelectorAll(".auth-container, .login-form, .btn-container").forEach(el => {
                    el.style.display = "flex";
                });
            }
        });
    }
};