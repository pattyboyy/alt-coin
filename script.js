JavaScript:

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// Animations on scroll
const animateElements = document.querySelectorAll('.fadeInLeft, .fadeInRight, .fadeInUp');

const animateOnScroll = () => {
    animateElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);

window.addEventListener('scroll', function () {
    const scrollPosition = window.pageYOffset;
    const logoImg = document.querySelector('.logo-img');
    const featureIcons = document.querySelectorAll('.feature-card i');

    logoImg.style.transform = `translateY(${scrollPosition * 0.5}px)`;

    featureIcons.forEach(icon => {
        icon.style.transform = `translateY(${scrollPosition * 0.2}px)`;
    });
});