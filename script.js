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

// ... (existing JavaScript code)

// Live price graph
const priceCtx = document.getElementById('priceChart').getContext('2d');
const currentPriceElement = document.getElementById('currentPrice');
const priceInput = document.getElementById('price');
const damImage = new Image();
damImage.src = 'images/dam.webp';

let currentPrice = 2.50;
let priceHistory = [];

const priceChart = new Chart(priceCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Beaver Bucks Price',
            data: [],
            borderColor: 'rgba(255, 215, 0, 1)',
            borderWidth: 2,
            pointRadius: 0,
            fill: true,
            backgroundColor: function(context) {
                const chartArea = context.chart.chartArea;
                if (!chartArea) {
                    return;
                }
                const chartWidth = chartArea.right - chartArea.left;
                const chartHeight = chartArea.bottom - chartArea.top;
                const damWidth = damImage.width;
                const damHeight = damImage.height;
                const scaleX = chartWidth / damWidth;
                const scaleY = chartHeight / damHeight;

                const ctx = context.chart.ctx;
                const pat = ctx.createPattern(damImage, 'repeat');
                return pat;
            }
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                display: false
            },
            y: {
                beginAtZero: false
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    }
});

function updatePrice() {
    const randomChange = (Math.random() * 0.06) - 0.03; // Random value between -0.03 and 0.03
    currentPrice += randomChange;
    currentPrice = Math.max(currentPrice, 0.01); // Ensure price doesn't go below 0.01
    currentPrice = parseFloat(currentPrice.toFixed(2)); // Round to 2 decimal places

    priceHistory.push(currentPrice);
    if (priceHistory.length > 100) {
        priceHistory.shift();
    }

    currentPriceElement.textContent = currentPrice.toFixed(2);
    priceInput.value = `$${(currentPrice * parseInt(document.getElementById('amount').value)).toFixed(2)}`;

    priceChart.data.labels = priceHistory.map((_, index) => index + 1);
    priceChart.data.datasets[0].data = priceHistory;
    priceChart.update();
}

setInterval(updatePrice, 1000);