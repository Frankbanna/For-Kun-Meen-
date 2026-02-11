// --- ตั้งค่ารหัสผ่านที่นี่ (วาเลนไทน์) ---
const correctPasscode = '15081996'; 

let currentInput = '';
const dots = document.querySelectorAll('.dot');
const errorMsg = document.getElementById('error-msg');
const container = document.getElementById('main-container');

function goToPasscode() {
    document.getElementById('page-welcome').classList.add('hidden');
    document.getElementById('page-passcode').classList.remove('hidden');
}

function pressKey(num, e) {
    if(e) spawnHearts(e.clientX, e.clientY);

    if (currentInput.length < 8) {
        currentInput += num;
        updateDots();
        errorMsg.style.opacity = '0';

        if (currentInput.length === 8) {
            setTimeout(checkPasscode, 300);
        }
    }
}

function spawnHearts(x, y) {
    const hearts = ['💖', '💗', '💓', '💕', '❤️'];
    for (let i = 0; i < 5; i++) {
        const heart = document.createElement('div');
        heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];
        heart.classList.add('pop-heart');
        const randomX = (Math.random() - 0.5) * 60;
        const randomY = (Math.random() - 0.5) * 60;
        heart.style.left = (x + randomX) + 'px';
        heart.style.top = (y + randomY) + 'px';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 800);
    }
}

function clearPass() {
    currentInput = '';
    updateDots();
    errorMsg.style.opacity = '0';
}

function updateDots() {
    dots.forEach((dot, index) => {
        if (index < currentInput.length) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function checkPasscode() {
    if (currentInput === correctPasscode) {
        document.getElementById('page-passcode').classList.add('hidden');
        document.getElementById('page-tease').classList.remove('hidden');
    } else {
        errorMsg.style.opacity = '1';
        container.classList.add('shake');
        setTimeout(() => {
            container.classList.remove('shake');
            clearPass();
        }, 500);
    }
}

// ไปหน้าทุ่งดอกไม้ และเริ่ม Animation
function goToBouquet(e) {
    if (e) spawnRabbits(e.clientX, e.clientY);
    
    setTimeout(() => {
        document.getElementById('page-tease').classList.add('hidden');
        document.getElementById('page-bouquet').classList.remove('hidden');
        
        // เริ่ม Scene นกบิน
        playBouquetScene();
    }, 100);
}

// --- แก้ไขฟังก์ชันนี้ในไฟล์ script.js ---

function playBouquetScene() {
    const bird = document.getElementById('flying-bird');
    const letter = document.getElementById('dropped-letter');

    // 1. เริ่มสั่งให้นกบิน (โดยการเติม class 'bird-active')
    setTimeout(() => {
        bird.classList.add('bird-active');
    }, 500);

    // 2. กะจังหวะทิ้งจดหมาย (ในรอบแรกที่นกบินผ่าน)
    // นกใช้เวลาบินขาไปประมาณ 40% ของ 12 วินาที = 4.8 วิ
    // นกจะถึงกลางจอประมาณวินาทีที่ 2.4 
    setTimeout(() => {
        letter.classList.remove('hidden-el'); // โชว์จดหมาย
        letter.style.top = '50%'; // สั่งให้จดหมายตกลงมา
    }, 2500); // ทิ้งลงมาตอนผ่านไป 2.5 วิ
}

async function goToGreeting(e) {
    if(e) {
        spawnFlowerBurst(e.clientX, e.clientY);
    } else {
        spawnFlowerBurst(window.innerWidth / 2, window.innerHeight / 2);
    }

    await new Promise(r => setTimeout(r, 1200));

    document.getElementById('page-bouquet').classList.add('hidden');
    const greetingPage = document.getElementById('page-greeting');
    greetingPage.classList.remove('hidden');

    const paragraphs = greetingPage.querySelectorAll('.text-content p');

    for (let p of paragraphs) {
        p.style.opacity = "0";
    }

    for (let p of paragraphs) {
        await new Promise(r => setTimeout(r, 400));
        await smoothTypeWriter(p, 28);
    }
}



function spawnFlowerBurst(x, y) {
    const flowers = ['🌸', '🌹', '🌺', '🌻', '💐', '🌷'];
    const count = 30; 

    for (let i = 0; i < count; i++) {
        const flower = document.createElement('div');
        flower.innerText = flowers[Math.floor(Math.random() * flowers.length)];
        flower.classList.add('flower-burst');
        
        const angle = Math.random() * Math.PI * 2; 
        const velocity = 100 + Math.random() * 150; 
        
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;

        flower.style.setProperty('--tx', `${tx}px`);
        flower.style.setProperty('--ty', `${ty}px`);

        flower.style.left = x + 'px';
        flower.style.top = y + 'px';

        document.body.appendChild(flower);
        setTimeout(() => flower.remove(), 1200);
    }
}

const greetingPageDiv = document.getElementById('page-greeting');
greetingPageDiv.addEventListener('click', function(e) {
    if (!greetingPageDiv.classList.contains('hidden')) {
        spawnRabbits(e.clientX, e.clientY);
    }
});

function spawnRabbits(x, y) {
    const count = Math.floor(Math.random() * 2) + 2; 
    for (let i = 0; i < count; i++) {
        const rabbit = document.createElement('div');
        rabbit.innerText = '🐇';
        rabbit.classList.add('jumping-rabbit');
        if (Math.random() < 0.5) rabbit.classList.add('anim-jump-left');
        else rabbit.classList.add('anim-jump-right');
        
        const offsetX = (Math.random() - 0.5) * 40;
        const offsetY = (Math.random() - 0.5) * 40;
        rabbit.style.left = (x + offsetX) + 'px';
        rabbit.style.top = (y + offsetY) + 'px';
        document.body.appendChild(rabbit);
        setTimeout(() => rabbit.remove(), 1000);
    }
}
// --- Typewriter ที่รองรับ HTML ---
// ===== Ultra Smooth Typewriter =====
function smoothTypeWriter(element, speed = 25) {
    return new Promise(resolve => {

        const originalHTML = element.innerHTML;
        element.innerHTML = "";
        element.style.opacity = "1";

        // สร้าง cursor
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

            if (node.nodeType === 3) { // TEXT NODE
                let text = node.textContent;
                let i = 0;
                let span = document.createElement("span");
                element.insertBefore(span, cursor);

                function typeChar() {
                    if (i < text.length) {
                        span.textContent += text[i];
                        i++;
                        setTimeout(typeChar, speed);
                    } else {
                        nodeIndex++;
                        typeNextNode();
                    }
                }
                typeChar();
            } 
            else if (node.nodeType === 1) { // ELEMENT NODE
                let clone = node.cloneNode(false);
                element.insertBefore(clone, cursor);

                let childNodes = Array.from(node.childNodes);
                let childIndex = 0;

                function typeChild() {
                    if (childIndex >= childNodes.length) {
                        nodeIndex++;
                        typeNextNode();
                        return;
                    }

                    let child = childNodes[childIndex];

                    if (child.nodeType === 3) {
                        let text = child.textContent;
                        let i = 0;
                        let span = document.createElement("span");
                        clone.appendChild(span);

                        function typeChar() {
                            if (i < text.length) {
                                span.textContent += text[i];
                                i++;
                                setTimeout(typeChar, speed);
                            } else {
                                childIndex++;
                                typeChild();
                            }
                        }
                        typeChar();
                    } else {
                        clone.appendChild(child.cloneNode(true));
                        childIndex++;
                        typeChild();
                    }
                }

                typeChild();
            }
        }

        typeNextNode();
    });
}


