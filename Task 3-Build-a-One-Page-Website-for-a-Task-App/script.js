  document.addEventListener('DOMContentLoaded', () => {
            const sections = document.querySelectorAll('.section-hidden');

            const observerOptions = {
                root: null, 
                rootMargin: '0px',
                threshold: 0.1 
            };

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.remove('section-hidden');
                        entry.target.classList.add('section-visible');
                        observer.unobserve(entry.target); 
                    }
                });
            }, observerOptions);

            sections.forEach(section => {
                observer.observe(section);
            });
        });