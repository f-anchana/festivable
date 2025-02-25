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

        gsap.to(".signup-form", {
            opacity: 1, width: "60%", duration: 1, ease: "power2.out",
            onStart: () => {
                title1.innerHTML = "De retour ?";
                title2.innerHTML = "Laissez-vous guider !";
                paragraph.innerHTML = "Retrouvez vos festivals favoris, échangez avec la communauté et préparez votre prochaine expérience accessible.";
            }
        });

        gsap.to(".login-form", { opacity: 0, width: "40%", duration: 1, ease: "power2.out", });

        gsap.set(".signup-button", { display: "none" });
        gsap.set(".login-button", { display: "block" });

        gsap.to(".decor-one", { x: "120%", duration: 1, ease: "power2.out", });
        gsap.to(".decor-two", { right: "", left: "0",scaleX: -1, duration: 1, ease: "power2.out", });
        gsap.to(".decor-three", { right: "", left: "25px", duration: 1, ease: "power2.out", });
    }
};

export const animateFormBack = () => {

    const title1 = document.querySelector(".span-one");
    const title2 = document.querySelector(".span-two");
    const paragraph = document.querySelector(".auth-container p");

        gsap.to(".auth-container", { x: 0, duration: 1, ease: "power2.out" });

        gsap.to(".signup-form", {
            opacity: 0, width: "40%", duration: 1, ease: "power2.out",
            onStart: () => {
                title1.innerHTML = "Plongez au cœur";
                title2.innerHTML = "des festivals accessibles !";
                paragraph.innerHTML = "Vous souhaitez vivre une expérience unique et découvrir des festivals accessibles ? Rejoignez notre communauté !";
            }
        });

        gsap.to(".login-form", { opacity: 1, width: "60%", duration: 1, ease: "power2.out", });

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
    });
    gsap.to(".btn-orange", { 
        opacity: 1,
    });
}

export const gradientOrganismeEffect = () => {
    gsap.to(".auth-light-blue", { 
        opacity: 1,
    });
    gsap.to(".btn-light-blue", { 
        opacity: 1,
    });
}

export const resetGradient = () => {
    gsap.to([".auth-orange", ".auth-light-blue"], { 
        opacity: 0,
    });    
    gsap.to([".btn-orange", ".btn-light-blue"], { 
        opacity: 0,
    });
};