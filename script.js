/* =========================================
   WELLNEST - FINAL JAVASCRIPT
   BIK1273 DIGITAL LITERACIES
   ========================================= */


/* =========================================
   1. MOOD CHECK
   ========================================= */

function showMood(mood) {

    const response = document.getElementById("mood-response");

    const messages = {

        great: {
            title: "😄 That's great!",
            text: "Keep doing the things that make you feel good. Take a moment to appreciate how you're feeling today."
        },

        good: {
            title: "🙂 Glad you're doing okay!",
            text: "Keep looking after yourself. A little rest, movement or time with people you care about can help maintain your wellbeing."
        },

        okay: {
            title: "😐 It's okay to feel just okay.",
            text: "Take things one step at a time. Try a short break, drink some water or take a few slow breaths."
        },

        stressed: {
            title: "😟 Feeling stressed?",
            text: "Pause for a moment. Try the breathing exercise below or take a short break before continuing with your work."
        },

        low: {
            title: "😔 It's okay to not feel okay.",
            text: "Be kind to yourself today. Consider talking to someone you trust or visiting the support resources below if you need help."
        }

    };

    if (messages[mood]) {

        response.innerHTML = `
            <h3>${messages[mood].title}</h3>
            <p>${messages[mood].text}</p>
        `;

        response.classList.add("show");

    }
}


/* =========================================
   2. BREATHING EXERCISE
   ========================================= */

let breathingRunning = false;

function startBreathing() {

    if (breathingRunning) {
        return;
    }

    breathingRunning = true;

    const circle = document.getElementById("breathingCircle");
    const text = document.getElementById("breathingText");

    if (!circle || !text) {
        return;
    }

    let cycle = 0;
    const totalCycles = 3;

    function breathingStep() {

        if (cycle >= totalCycles) {

            circle.classList.remove("breathing-active");

            circle.innerText = "Complete ✓";

            text.innerText =
                "Well done. Take a moment before continuing with your day.";

            breathingRunning = false;

            return;
        }

        /* INHALE */

        circle.classList.add("breathing-active");
        circle.innerText = "Breathe In";

        text.innerText =
            `Cycle ${cycle + 1} of ${totalCycles} • Slowly breathe in`;

        setTimeout(() => {

            /* HOLD */

            circle.innerText = "Hold";

            text.innerText =
                `Cycle ${cycle + 1} of ${totalCycles} • Hold gently`;

            setTimeout(() => {

                /* EXHALE */

                circle.innerText = "Breathe Out";

                text.innerText =
                    `Cycle ${cycle + 1} of ${totalCycles} • Slowly breathe out`;

                setTimeout(() => {

                    cycle++;
                    breathingStep();

                }, 4000);

            }, 2000);

        }, 4000);
    }

    breathingStep();
}


/* =========================================
   3. STUDY TIMER
   ========================================= */

let timerInterval = null;
let timeLeft = 25 * 60;

function updateTimerDisplay() {

    const timer = document.getElementById("timer");

    if (!timer) {
        return;
    }

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timer.innerText =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}


function startTimer() {

    if (timerInterval !== null) {
        return;
    }

    timerInterval = setInterval(() => {

        if (timeLeft > 0) {

            timeLeft--;
            updateTimerDisplay();

        } else {

            clearInterval(timerInterval);
            timerInterval = null;

            const timer = document.getElementById("timer");

            if (timer) {
                timer.innerText = "Break Time! 🎉";
            }

            alert(
                "Your 25-minute study session is complete! Take a 5-minute break."
            );
        }

    }, 1000);
}


function resetTimer() {

    clearInterval(timerInterval);

    timerInterval = null;

    timeLeft = 25 * 60;

    updateTimerDisplay();
}


/* =========================================
   4. QUICK RESET ACTIVITIES
   ========================================= */

function quickActivity() {

    const activities = [

        "💧 Drink a glass of water.",

        "🚶 Take a 5-minute walk.",

        "🫁 Take 3 slow and comfortable breaths.",

        "📵 Put your phone away for 10 minutes.",

        "🎵 Listen to one relaxing song.",

        "🧘 Stretch your shoulders and neck.",

        "👥 Message a friend and check in with them.",

        "🌿 Step outside and get some fresh air.",

        "👀 Look away from your screen for a few minutes.",

        "✍️ Write down one thing you are grateful for."

    ];

    const box = document.getElementById("quickReset");

    if (!box) {
        return;
    }

    const randomIndex =
        Math.floor(Math.random() * activities.length);

    box.innerHTML = `
        <strong>${activities[randomIndex]}</strong>
    `;

    box.classList.add("show");

}


/* =========================================
   5. BACK TO TOP BUTTON
   ========================================= */

function createBackToTop() {

    const button = document.createElement("button");

    button.id = "backToTop";

    button.innerText = "↑";

    button.setAttribute(
        "aria-label",
        "Back to top"
    );

    document.body.appendChild(button);

    button.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            button.classList.add("visible");

        } else {

            button.classList.remove("visible");

        }

    });
}


/* =========================================
   6. SMOOTH NAVIGATION
   ========================================= */

function setupNavigation() {

    const links = document.querySelectorAll(
        'nav a[href^="#"]'
    );

    links.forEach(link => {

        link.addEventListener("click", function(event) {

            const targetId =
                this.getAttribute("href");

            const target =
                document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });

}


/* =========================================
   7. SCROLL REVEAL EFFECT
   ========================================= */

function setupScrollReveal() {

    const elements = document.querySelectorAll(
        ".card, .habit, .reset-card, .resource-card, .survey-card"
    );

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );

    elements.forEach(element => {

        element.classList.add("reveal");

        observer.observe(element);

    });

}


/* =========================================
   8. CURRENT YEAR
   ========================================= */

function updateYear() {

    const yearElement =
        document.getElementById("current-year");

    if (yearElement) {

        yearElement.innerText =
            new Date().getFullYear();

    }

}


/* =========================================
   9. PAGE INITIALISATION
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    updateTimerDisplay();

    setupNavigation();

    setupScrollReveal();

    createBackToTop();

    updateYear();

});
