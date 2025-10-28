// 관리자 로그인 JavaScript

// 데모 계정
const DEMO_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
};

// 로그인 폼 제출
document.getElementById('loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    // 로그인 검증
    if (username === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password) {
        // 세션 저장
        const loginData = {
            username: username,
            loginTime: new Date().toISOString(),
            rememberMe: rememberMe
        };

        if (rememberMe) {
            localStorage.setItem('adminSession', JSON.stringify(loginData));
        } else {
            sessionStorage.setItem('adminSession', JSON.stringify(loginData));
        }

        // 대시보드로 이동
        window.location.href = 'dashboard.html';
    } else {
        // 로그인 실패
        const errorMsg = document.getElementById('loginError');
        errorMsg.style.display = 'block';

        // 입력 필드 흔들기 효과
        const form = document.getElementById('loginForm');
        form.style.animation = 'shake 0.5s';
        setTimeout(() => {
            form.style.animation = '';
        }, 500);
    }
});

// 흔들기 애니메이션 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// 이미 로그인된 경우 대시보드로 리다이렉트
function checkExistingSession() {
    const sessionData = localStorage.getItem('adminSession') || sessionStorage.getItem('adminSession');
    if (sessionData) {
        window.location.href = 'dashboard.html';
    }
}

// 페이지 로드 시 세션 확인
checkExistingSession();
