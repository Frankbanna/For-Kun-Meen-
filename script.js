// --- ตั้งค่ารหัสผ่านที่นี่ ---
const correctPasscode = '15081996'; 

let currentInput = '';
const dots = document.querySelectorAll('.dot');
const errorMsg = document.getElementById('error-msg');
const container = document.querySelector('.container');

function goToPasscode() {
    document.getElementById('page-welcome').classList.add('hidden');
    document.getElementById('page-passcode').classList.remove('hidden');
}

// 1. แก้ไขฟังก์ชัน pressKey ให้รับค่า event (e) เพิ่ม
function pressKey(num, e) {
    // เสกหัวใจตรงจุดที่กด
    if(e) {
        spawnHearts(e.clientX, e.clientY);
    }

    if (currentInput.length < 8) {
        currentInput += num;
        updateDots();
        errorMsg.style.opacity = '0';

        if (currentInput.length === 8) {
            setTimeout(checkPasscode, 300);
        }
    }
}

// 2. ฟังก์ชันใหม่: เสกหัวใจกระจาย
function spawnHearts(x, y) {
    const hearts = ['💖', '💗', '💓', '💕', '❤️'];
    
    // สร้างหัวใจ 5 ดวงกระจายออก
    for (let i = 0; i < 5; i++) {
        const heart = document.createElement('div');
        heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];
        heart.classList.add('pop-heart');
        
        // สุ่มตำแหน่งกระจายนิดหน่อยรอบๆ นิ้วที่กด
        const randomX = (Math.random() - 0.5) * 60; // กระจายซ้ายขวา
        const randomY = (Math.random() - 0.5) * 60; // กระจายบนล่าง

        heart.style.left = (x + randomX) + 'px';
        heart.style.top = (y + randomY) + 'px';
        
        document.body.appendChild(heart);

        // ลบทิ้งเมื่ออนิเมชั่นจบ (เพื่อไม่ให้หนักเครื่อง)
        setTimeout(() => {
            heart.remove();
        }, 800);
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

function goToGreeting() {
    document.getElementById('page-tease').classList.add('hidden');
    document.getElementById('page-greeting').classList.remove('hidden');
}



const greetingPageDiv = document.getElementById('page-greeting');

// เพิ่มตัวดักจับการกดที่หน้าอวยพร
greetingPageDiv.addEventListener('click', function(e) {
    // ทำงานเฉพาะตอนที่หน้าอวยพรแสดงอยู่เท่านั้น
    if (!greetingPageDiv.classList.contains('hidden')) {
        // เสกกระต่าย 2-3 ตัว ตรงจุดที่กด (e.clientX, e.clientY)
        spawnRabbits(e.clientX, e.clientY);
    }
});

// ฟังก์ชันเสกน้องกระต่าย
function spawnRabbits(x, y) {
    // สุ่มจำนวนกระต่าย 2 หรือ 3 ตัวต่อการกด 1 ครั้ง
    const count = Math.floor(Math.random() * 2) + 2; 

    for (let i = 0; i < count; i++) {
        const rabbit = document.createElement('div');
        rabbit.innerText = '🐇';
        rabbit.classList.add('jumping-rabbit');

        // สุ่มว่าจะให้กระโดดไปซ้ายหรือขวา (50/50)
        if (Math.random() < 0.5) {
            rabbit.classList.add('anim-jump-left');
        } else {
            rabbit.classList.add('anim-jump-right');
        }

        // สุ่มตำแหน่งเริ่มต้นให้กระจายๆ นิดหน่อยจากจุดที่นิ้วกด
        const offsetX = (Math.random() - 0.5) * 40;
        const offsetY = (Math.random() - 0.5) * 40;

        rabbit.style.left = (x + offsetX) + 'px';
        rabbit.style.top = (y + offsetY) + 'px';

        document.body.appendChild(rabbit);

        // ลบน้องทิ้งเมื่อกระโดดเสร็จ (1 วินาที ตาม CSS)
        setTimeout(() => {
            rabbit.remove();
        }, 1000);
    }
}