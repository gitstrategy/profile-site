document.addEventListener('DOMContentLoaded', function() {
    let sections = document.querySelectorAll('section');

    function revealSections() {
        for (let section of sections) {
            let position = section.getBoundingClientRect().top;
            let windowHeight = window.innerHeight;

            if (position < windowHeight - 100) {
                section.classList.add('show');
            }
        }
    }

    window.addEventListener('scroll', revealSections);
    revealSections();  // Trigger the effect on page load
});
