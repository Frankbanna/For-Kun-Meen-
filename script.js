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

function pressKey(num) {
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
        if (index < currentInput.length) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function checkPasscode() {
    if (currentInput === correctPasscode) {
        // รหัสถูก -> ไปหน้า "หยอกล้อ" (Tease) ก่อน
        document.getElementById('page-passcode').classList.add('hidden');
        document.getElementById('page-tease').classList.remove('hidden');
    } else {
        // รหัสผิด
        errorMsg.style.opacity = '1';
        container.classList.add('shake');
        
        setTimeout(() => {
            container.classList.remove('shake');
            clearPass();
        }, 500);
    }
}

// ฟังก์ชันใหม่: จากหน้าหยอกล้อ ไปหน้าอวยพรจริง
function goToGreeting() {
    document.getElementById('page-tease').classList.add('hidden');
    document.getElementById('page-greeting').classList.remove('hidden');
}