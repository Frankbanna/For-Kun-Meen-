// ===============================
//            CONFIG
// ===============================
const correctPasscode = '15081996';

let currentInput = '';
let holdInterval = null;
let holdProgress = 0;

const container = document.getElementById('main-container');


// ===============================
//            PAGE FLOW
// ===============================
function goToHeartPage() {
    document.getElementById('page-welcome').classList.add('hidden');
    document.getElementById('page-heart').classList.remove('hidden');
}

function goToTease() {
    document.getElementById('page-heart').classList.add('hidden');
    document.getElementById('page-tease').classList.remove('hidden');
}

function goToPasscodeFromTease(e) {
    if (e) spawnRabbits(e.clientX, e.clientY);

    setTimeout(() => {
        document.getElementById('page-tease').classList.add('hidden');
        document.getElementById('page-passcode').classList.remove('hidden');
    }, 150);
}

function goToBouquet(e) {
    if (e) spawnRabbits(e.clientX, e.clientY);

    setTimeout(() => {
        document.getElementById('page-passcode').classList.add('hidden');
        document.getElementById('page-bouquet').classList.remove('hidden');
        playBouquetScene();
    }, 150);
}


// ===============================
//        HEART HOLD SYSTEM
// ===============================
function startHold() {
    if (holdInterval) return;

    holdInterval = setInterval(() => {
        if (holdProgress >= 100) {
            clearInterval(holdInterval);
            holdInterval = null;

            document.getElementById("hold-heart").classList.add("heart-complete");

            setTimeout(() => {
                goToTease();
                holdProgress = 0;
                updateHeartProgress();
            }, 800);

        } else {
            holdProgress += 2;
            updateHeartProgress();
        }
    }, 40);
}

function endHold() {
    clearInterval(holdInterval);
    holdInterval = null;

    if (holdProgress < 100) {
        let decrease = setInterval(() => {
            if (holdProgress <= 0) {
                clearInterval(decrease);
                holdProgress = 0;
            } else {
                holdProgress -= 3;
                updateHeartProgress();
            }
        }, 20);
    }
}

function updateHeartProgress() {
    document.getElementById("heart-progress").style.height = holdProgress + "%";
    document.getElementById("hold-text").innerText = holdProgress + "%";
}


// ===============================
//        PASSCODE SYSTEM
// ===============================
const dots = document.querySelectorAll('.dot');
const errorMsg = document.getElementById('error-msg');

function pressKey(num, e) {
    if (e) spawnHearts(e.clientX, e.clientY);

    if (currentInput.length < 8) {
        currentInput += num;
        updateDots();
        errorMsg.style.opacity = '0';

        if (currentInput.length === 8) {
            setTimeout(checkPasscode, 300);
        }
    }
}

function clearPass() {
    currentInput = '';
    updateDots();
    errorMsg.style.opacity = '0';
}

function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index < currentInput.length);
    });
}

function checkPasscode() {
    if (currentInput === correctPasscode) {
        clearPass();
        goToBouquet();
    } else {
        errorMsg.style.opacity = '1';
        container.classList.add('shake');
        setTimeout(() => {
            container.classList.remove('shake');
            clearPass();
        }, 500);
    }
}


// ===============================
//        BOUQUET SCENE
// ===============================
function playBouquetScene() {
    const bird = document.getElementById('flying-bird');
    const letter = document.getElementById('dropped-letter');

    bird.classList.remove('bird-active');
    letter.classList.add('hidden-el');
    letter.style.top = '0%';

    setTimeout(() => {
        bird.classList.add('bird-active');
    }, 500);

    setTimeout(() => {
        letter.classList.remove('hidden-el');
        letter.style.top = '50%';
    }, 2500);
}


// ===============================
//        GREETING PAGE
// ===============================
async function goToGreeting(e) {
    if (e) spawnFlowerBurst(e.clientX, e.clientY);

    await new Promise(r => setTimeout(r, 1200));

    document.getElementById('page-bouquet').classList.add('hidden');
    const greetingPage = document.getElementById('page-greeting');
    greetingPage.classList.remove('hidden');

    const paragraphs = greetingPage.querySelectorAll('.text-content p');
    paragraphs.forEach(p => p.style.opacity = "0");

    for (let p of paragraphs) {
        await new Promise(r => setTimeout(r, 400));
        await smoothTypeWriter(p, 20);
    }
}


// ===============================
//            EFFECTS
// ===============================
function spawnHearts(x, y) {
    const hearts = ['💖','💗','💓','💕','❤️'];
    for (let i = 0; i < 5; i++) {
        const heart = document.createElement('div');
        heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];
        heart.classList.add('pop-heart');

        heart.style.left = (x + (Math.random() - 0.5) * 60) + 'px';
        heart.style.top = (y + (Math.random() - 0.5) * 60) + 'px';

        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 800);
    }
}

function spawnRabbits(x, y) {
    const count = Math.floor(Math.random() * 2) + 2;
    for (let i = 0; i < count; i++) {
        const rabbit = document.createElement('div');
        rabbit.innerText = '🐇';
        rabbit.classList.add('jumping-rabbit');
        rabbit.classList.add(Math.random() < 0.5 ? 'anim-jump-left' : 'anim-jump-right');

        rabbit.style.left = (x + (Math.random() - 0.5) * 40) + 'px';
        rabbit.style.top = (y + (Math.random() - 0.5) * 40) + 'px';

        document.body.appendChild(rabbit);
        setTimeout(() => rabbit.remove(), 1000);
    }
}

function spawnFlowerBurst(x, y) {
    const flowers = ['🌸','🌹','🌺','🌻','💐','🌷'];

    for (let i = 0; i < 30; i++) {
        const flower = document.createElement('div');
        flower.innerText = flowers[Math.floor(Math.random() * flowers.length)];
        flower.classList.add('flower-burst');

        const angle = Math.random() * Math.PI * 2;
        const velocity = 100 + Math.random() * 150;

        flower.style.setProperty('--tx', `${Math.cos(angle) * velocity}px`);
        flower.style.setProperty('--ty', `${Math.sin(angle) * velocity}px`);

        flower.style.left = x + 'px';
        flower.style.top = y + 'px';

        document.body.appendChild(flower);
        setTimeout(() => flower.remove(), 1200);
    }
}


// ===============================
//      ULTRA SMOOTH TYPEWRITER
// ===============================
function smoothTypeWriter(element, speed = 20) {
    return new Promise(resolve => {

        const originalHTML = element.innerHTML;
        element.innerHTML = "";
        element.style.opacity = "1";

        const cursor = document.createElement("span");
        cursor.className = "typing-cursor";
        element.appendChild(cursor);

        let container = document.createElement("div");
        container.innerHTML = originalHTML;
        let nodes = Array.from(container.childNodes);
        let nodeIndex = 0;

        function typeNextNode() {
            if (nodeIndex >= nodes.length) {
                cursor.remove();
                resolve();
                return;
            }

            let node = nodes[nodeIndex];

            if (node.nodeType === 3) {
                let text = node.textContent;
                let i = 0;
                let span = document.createElement("span");
                element.insertBefore(span, cursor);

                function typeChar() {
                    if (i < text.length) {
                        span.textContent += text[i++];
                        setTimeout(typeChar, speed);
                    } else {
                        nodeIndex++;
                        typeNextNode();
                    }
                }
                typeChar();
            } else {
                element.insertBefore(node.cloneNode(true), cursor);
                nodeIndex++;
                typeNextNode();
            }
        }

        typeNextNode();
    });
}
