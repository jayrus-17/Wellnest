/* =========================
   WELLNEST - JAVASCRIPT
   BIK1273 DIGITAL LITERACIES
   ========================= */


/* =========================
   MOOD CHECK
   ========================= */

function showMood(mood) {

    const response = document.getElementById("mood-response");

    const messages = {

        great: {
            title: "😄 That's great!",
            text: "Keep doing what makes you feel good. Remember that looking after your wellbeing is important even when things are going well."
        },

        good: {
            title: "🙂 Glad you're doing okay!",
            text: "Keep taking care of yourself. Small habits like getting enough sleep, eating regularly and taking breaks can support your wellbeing."
        },

        okay: {
            title: "😐 It's okay to feel just okay.",
            text: "You don't have to feel happy all the time. Consider taking a short break, talking to someone you trust or doing something that helps you relax."
        },

        stressed: {
            title: "😟 It sounds like you're feeling stressed.",
            text: "Take a moment away from your work if you can. Try the breathing exercise or study-break timer in the Reset Zone."
        },

        low: {
            title: "😔 Be gentle with yourself today.",
            text: "Consider reaching out to someone you trust. If these feelings continue or become difficult to manage, consider speaking with a counsellor or qualified professional."
        }

    };

    const selected = messages[mood];

    response.innerHTML = `
        <h3>${selected.title}</h3>
        <p>${selected.text}</p>
    `;

    response.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}


/* =========================
   BREATHING EXERCISE
   ========================= */

let breathingRunning = false;

function startBreathing() {

    if (breathingRunning) {
        return;
    }

    breathingRunning = true;

    const circle = document.getElementById("breathingCircle");
    const text = document.getElementById("breathingText");

    let cycle = 0;

    function breathingCycle() {

        if (cycle >= 3) {

            circle.classList.remove("breathing");

            text.innerText =
                "Well done. Take a moment before returning to your work.";

            breathingRunning = false;

            return;
        }

        text.innerText = "Breathe in slowly...";

        circle.classList.add("breathing");

        setTimeout(() => {

            text.innerText = "Breathe out slowly...";

            circle.classList.remove("breathing");

            setTimeout(() => {

                cycle++;

                breathingCycle();

            }, 4000);

        }, 4000);

    }

    breathingCycle();
}


/* =========================
   STUDY BREAK TIMER
   ========================= */

let timerInterval;

let timeLeft = 25 * 60;

function updateTimer() {

    const timer = document.getElementById("timer");

    const minutes = Math.floor(timeLeft / 60);

    const seconds = timeLeft % 60;

    timer.innerText =
        `${minutes}:${seconds.toString().padStart(2, "0")}`;
}


function startTimer() {

    if (timerInterval) {
        return;
    }

    timerInterval = setInterval(() => {

        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            timerInterval = null;

            document.getElementById("timer").innerText = "00:00";

            alert(
                "Your study session is finished! Take a 5-minute break."
            );

            return;
        }

        timeLeft--;

        updateTimer();

    }, 1000);
}


function resetTimer() {

    clearInterval(timerInterval);

    timerInterval = null;

    timeLeft = 25 * 60;

    updateTimer();
}


updateTimer();


/* =========================
   QUICK RESET ACTIVITIES
   ========================= */

function quickActivity() {

    const activities = [

        "💧 Drink a glass of water.",

        "🚶 Take a 5-minute walk.",

        "🧘 Stretch your shoulders and neck.",

        "📵 Put your phone away for 5 minutes.",

        "🎵 Listen to one calming song.",

        "🌿 Step outside and get some fresh air.",

        "👥 Message someone you trust.",

        "😴 Close your eyes and rest for two minutes.",

        "📚 Step away from your study materials for a short break.",

        "🫁 Take five slow, comfortable breaths."

    ];

    const randomIndex =
        Math.floor(Math.random() * activities.length);

    document.getElementById("quickReset").innerText =
        activities[randomIndex];
}


/* =========================
   NAVIGATION ACTIVE EFFECT
   ========================= */

const sections =
    document.querySelectorAll("section");

const navLinks =
    document.querySelectorAll("nav a");


window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${current}`) {

            link.classList.add("active");

        }

    });

});
