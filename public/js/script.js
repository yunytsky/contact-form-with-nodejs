const form = document.querySelector("#contact-form");
const sender = document.querySelector("#name");
const email = document.querySelector("#email");
const message = document.querySelector("#message");
const content = document.querySelector(".content");
const hamburgerButton = document.querySelector(".header__hamburger");
const firstLine = document.querySelector("#first-line");
const secondLine = document.querySelector("#second-line");
const thirdLine = document.querySelector("#third-line");
const hamburgerMenu = document.querySelector(".header__menu");
hamburgerMenu.style.display = "none";

window.addEventListener("load", reveal)

function reveal() {
    const reveal = document.querySelector(".content");
    reveal.classList.add("active")
}

//hamburger-menu
hamburgerButton.addEventListener("click", () => {
    if (hamburgerMenu.style.display == "none") {
        hamburgerMenu.style.animation = "appear .4s ease-in both";
        hamburgerMenu.style.display = "flex";
        firstLine.style.transform = "rotate(45deg) translateX(.5em)";
        secondLine.style.display = "none";
        thirdLine.style.transform = "rotate(-45deg) translateX(.5em)";
        content.style.filter = "brightness(0.4)";
    } else if (hamburgerMenu.style.display == "flex") {
        hamburgerMenu.style.animation = "hide .4s ease-in both";
        setTimeout(() => {
            hamburgerMenu.style.display = "none";
        }, 400);
        firstLine.style.transform = "none";
        secondLine.style.display = "block";
        thirdLine.style.transform = "none";
        content.style.filter = "none";
    } 
})

content.addEventListener("click", () => {
    if(hamburgerMenu.style.display == "flex") {
        hamburgerMenu.style.animation = "hide .4s ease-in both";
        setTimeout(() => {
            hamburgerMenu.style.display = "none";
        }, 400);
        content.style.filter = "none";
        firstLine.style.transform = "none";
        secondLine.style.display = "block";
        thirdLine.style.transform = "none";
    }
})

//slider
const swiper = new Swiper(".reviews", {
    slidesPerView: 3,
    spaceBetween: 0,
    loop: true,
    fade: true,
    grabCursor: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },
    centerSlide: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        588: {
            slidesPerView: 2,
        },
        968: {
            slidesPerView: 3,
        }
    }
});

//contact form
form.addEventListener("submit", (e) => {
    e.preventDefault();

    let formData = {
        sender: sender.value,
        email: email.value,
        message: message.value
    };

    fetch('/', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(formData)
    }).then(response => {
        return response.text();
    }).then(status => {
        if (status == 'success') {
            alert('Message has been successfully sent');
            sender.value = '';
            email.value = '';
            message.value = '';
        } else {
            alert('Error');
        }
    });
});
