document.addEventListener('DOMContentLoaded', () => {

    // --- Логика для мобильного меню ---
    const burgerMenu = document.getElementById('burger-menu');
    const mobileNav = document.getElementById('mobile-nav');
    const closeBtn = document.getElementById('close-btn');

    const openMenu = () => mobileNav.classList.add('active');
    const closeMenu = () => mobileNav.classList.remove('active');

    burgerMenu.addEventListener('click', (e) => {
        e.stopPropagation(); // Предотвращаем всплытие, чтобы не сработал document.click
        openMenu();
    });

    closeBtn.addEventListener('click', closeMenu);

    // Закрыть меню при клике вне его
    document.addEventListener('click', (event) => {
        if (mobileNav.classList.contains('active') && !mobileNav.contains(event.target)) {
            closeMenu();
        }
    });


    // --- Логика для изменения фона шапки при скролле ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Плавный скролл для всех якорных ссылок в навигации ---
    const setupSmoothScroll = () => {
        const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-nav a');

        const scroll = (event) => {
            const targetId = event.currentTarget.getAttribute('href');
            // Убедимся, что это внутренняя ссылка
            if (targetId.startsWith('#')) {
                event.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = header.offsetHeight;
                    const elementPosition = targetElement.offsetTop;
                    const offsetPosition = elementPosition - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Если это мобильная навигация, закрываем меню
                    if (mobileNav.classList.contains('active')) {
                        closeMenu();
                    }
                }
            }
        };

        navLinks.forEach(link => {
            link.addEventListener('click', scroll);
        });
    };

    setupSmoothScroll();

    // --- Анимация элементов при прокрутке ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target); // Отключаем наблюдение после анимации
            }
        });
    }, {
        threshold: 0.1 // Элемент считается видимым при появлении на 10%
    });

    // Находим все элементы, которые хотим анимировать
    const animatedElements = document.querySelectorAll('.service-card, .results-list li, .content-block');
    animatedElements.forEach(el => observer.observe(el));

    // --- Обработка формы обратной связи ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Предотвращаем стандартную отправку формы

            // Имитация отправки данных на сервер
            formStatus.textContent = 'Отправка...';
            formStatus.className = '';

            setTimeout(() => {
                // Очищаем поля формы
                contactForm.reset();

                // Показываем сообщение об успехе
                formStatus.textContent = 'Спасибо! Ваше сообщение отправлено.';
                formStatus.classList.add('success');

                // Скрываем сообщение через 5 секунд
                setTimeout(() => {
                    formStatus.textContent = '';
                    formStatus.className = '';
                }, 5000);

            }, 1000); // Имитируем задержку сети в 1 секунду
        });
    }

    // --- Инициализация particles.js ---
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 0.5,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }
});