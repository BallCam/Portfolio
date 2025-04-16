// 2.6.2025  - Added on browser video support so that when user clicks the link on intro/questions, the video plays on the page as opposed to opening a new page. 

// 1.31.2025 - Added introductory page before questions 

// 1.30.2025 - Added restart button

const questions = [
    { id: 1, question: "Was he/she born in this household?", videoUrl: "videos/Question_1.mp4", qrImage: "Images/Question_1.png" },
    { id: 2, question: "Was he/she born in their parents household?", videoUrl: "videos/Question_2.mp4", qrImage: "Images/Question_2.png" },
    { id: 3, question: "Was he/she born in their grandparents household?", videoUrl: "videos/Question_3 - Made with Clipchamp.mp4", qrImage: "Images/Question_3.png" },
    { id: 4, question: "Was he/she part of their mother's dowry?", videoUrl: "videos/Question_4.mp4", qrImage: "Images/Question_4.png" },
    { id: 5, question: "Was he/she deed as gift by a friend?", videoUrl: "videos/Question_5.mp4", qrImage: "Images/Question_5.png" },
    { id: 6, question: "Was he/she purchased from another enslaver?", videoUrl: "videos/Question_6.mp4", qrImage: "Images/Question_6.png" },
    { id: 7, question: "Was he/she purchased from a slave trader?", videoUrl: "videos/Question_7_8.mp4", qrImage: "Images/Question_7_8.png" },
    { id: 8, question: "Was he/she purchased at sheriff's sale or public auction?", videoUrl: "videos/Question_7_8.mp4", qrImage: "Images/Question_7_8.png" }
];

let currentQuestionIndex = 0;
const app = document.getElementById("app");

console.log("Script is running...");

const introVideoUrl = "videos/Introduction_Video.mp4";
const introQRImage = "Images/Introduction Video.png";

function renderWelcomePage() {
    app.innerHTML = `
        <div class="welcome-container">
            <h1>Welcome to the CFH</h1>
            <p>Answer a few questions to get started.</p>
            <button id="startButton">Start</button>
        </div>
    `;

    document.getElementById("startButton").addEventListener("click", renderIntroductionPage);
}

function renderIntroductionPage() {
    app.innerHTML = `
        <div class="intro-container">
            <h1>Please watch before proceeding</h1>
            <p>Scan the QR code below to watch an introductory video.</p>
            <img src="${introQRImage}" alt="Introduction QR Code" style="width: 250px; height: auto;">
            <p><a href="#" id="showVideo">Click here if unable to scan</a></p>
            <div id="videoContainer" style="display: none;">
                <video controls width="100%">
                    <source src="${introVideoUrl}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
            <button id="continueButton">Continue</button>
        </div>
    `;

    document.getElementById("showVideo").addEventListener("click", function(event) {
        event.preventDefault();
        document.getElementById("videoContainer").style.display = "block";
    });
    document.getElementById("continueButton").addEventListener("click", renderQuestionPage);
}



function renderQuestionPage() {
    const question = questions[currentQuestionIndex];

    if (!question) {
        renderDonePage();
        return;
    }

    console.log("Current Question:", question);

    app.innerHTML = `
        <div>
            <h1>${question.question}</h1>
            <div class="button-container">
                <button id="yesButton">Yes</button>
                <button id="noButton">No</button>
                ${currentQuestionIndex > 0 ? '<button id="backButton">← Back</button>' : ''}
            </div>
        </div>
    `;

    document.getElementById("yesButton").addEventListener("click", () => handleYes(question.videoUrl));
    document.getElementById("noButton").addEventListener("click", handleNo);
    
    if (currentQuestionIndex > 0) {
        document.getElementById("backButton").addEventListener("click", handleBack);
    }
}
let previousQuestionIndex = null;

function handleYes(videoUrl) {
    const question = questions[currentQuestionIndex]; // Get the current question

    previousQuestionIndex = currentQuestionIndex; // Store the index before moving

    app.innerHTML = `
        <div>
            <h1>Scan the QR Code</h1>
            <p>Please scan the QR code below to watch the video:</p>
            <img src="${question.qrImage}" alt="QR Code for ${question.question}" style="width: 250px; height: auto;">
            <p><a href="#" id="showVideo">Click here if unable to scan</a></p>
            <div id="videoContainer" style="display: none;">
                <video controls width="100%">
                    <source src="${videoUrl}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
            <button id="backButton">← Back</button>
            <button id="nextButton">Next</button>
        </div>
    `;

    document.getElementById("showVideo").addEventListener("click", function(event) {
        event.preventDefault();
        document.getElementById("videoContainer").style.display = "block";
    });
    document.getElementById("nextButton").addEventListener("click", handleNo);
    document.getElementById("backButton").addEventListener("click", handleBackFromQR);
}
function handleBackFromQR() {
    if (previousQuestionIndex !== null) {
        currentQuestionIndex = previousQuestionIndex;
        previousQuestionIndex = null; // Clear stored index
        renderQuestionPage(); // Re-render the last question
    }
}


function handleNo() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        renderQuestionPage();
    } else {
        renderDonePage();
    }
}

function handleBack() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestionPage();
    }
}

function renderDonePage() {
    app.innerHTML = `
        <div class="render-done-container">
            <h1>Thank you for participating!</h1>
            <p>If you'd like to start over, click below.</p>
            <button id="restartButton">🔄 Start Over</button>
        </div>
    `;

    document.getElementById("restartButton").addEventListener("click", restartQuiz);
}

function restartQuiz() {
    currentQuestionIndex = 0;
    previousQuestionIndex = null;
    renderWelcomePage();
}

document.addEventListener("DOMContentLoaded", function () {
    renderWelcomePage();
});

/*

Images/Introduction Video.png

Images/Question_1.png
Images/Question_2.png
Images/Question_3.png
Images/Question_4.png
Images/Question_5.png
Images/Question_6.png
Images/Question_7_8.png

*/

/*
 videos\Introduction_Video.mp4
 videos\Question_1.mp4
 videos\Question_2.mp4
 videos\Question_3 - Made with Clipchamp.mp4
 videos\Question_4.mp4
 videos\Question_5.mp4
 videos\Question_6.mp4
 videos\Question_7_8.mp4

 
 */