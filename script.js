// Animation de révélation au scroll
window.addEventListener('scroll', reveal);

function reveal() {
    var reveals = document.querySelectorAll('.reveal');
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var revealTop = reveals[i].getBoundingClientRect().top;
        var revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
            reveals[i].classList.add('active');
        }
    }
}

// Effet de smooth scroll pour les liens de navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Typing animation for hero name
document.addEventListener('DOMContentLoaded', function () {
    var hero = document.getElementById('hero-name');
    if (!hero) return;

    // Build text parts (keep last word in its own span for styling)
    var fullText = hero.textContent.trim();
    var parts = fullText.split(' ');
    var last = parts.pop() || '';
    var first = parts.join(' ');

    hero.innerHTML = '<span class="first"></span><span class="last"></span>';
    var firstNode = hero.querySelector('.first');
    var lastNode = hero.querySelector('.last');

    var cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    hero.appendChild(cursor);

    var i = 0, j = 0;
    var speed = 80;
    var pauseAfter = 900;

    var state = 'typeFirst';

    function loop() {
        if (state === 'typeFirst') {
            if (i < first.length) {
                firstNode.textContent += first[i++];
                setTimeout(loop, speed);
            } else {
                state = 'typeLast';
                setTimeout(loop, 180);
            }
        } else if (state === 'typeLast') {
            if (j < last.length) {
                lastNode.textContent += last[j++];
                setTimeout(loop, speed);
            } else {
                state = 'pause';
                setTimeout(loop, pauseAfter);
            }
        } else if (state === 'pause') {
            state = 'delLast';
            setTimeout(loop, 80);
        } else if (state === 'delLast') {
            if (j > 0) {
                lastNode.textContent = lastNode.textContent.slice(0, -1);
                j--;
                setTimeout(loop, 40);
            } else {
                state = 'delFirst';
                setTimeout(loop, 60);
            }
        } else if (state === 'delFirst') {
            if (i > 0) {
                firstNode.textContent = firstNode.textContent.slice(0, -1);
                i--;
                setTimeout(loop, 30);
            } else {
                // restart typing
                state = 'typeFirst';
                setTimeout(loop, 200);
            }
        }
    }

    loop();
});