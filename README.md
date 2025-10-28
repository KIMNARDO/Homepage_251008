# PAPSNET 홈페이지

PAPSNET의 공식 홈페이지입니다. 제품 소개, 회사 정보, 문의 기능 및 관리자 모드를 포함한 완전한 기업 웹사이트입니다.

## 주요 기능

### 사용자 페이지
- ✨ **현대적인 디자인**: 반응형 디자인으로 모든 디바이스 지원
- 🎠 **고급 캐러셀**: 자동 재생, 터치 스와이프, 키보드 네비게이션 지원
- 📦 **제품 소개**: 제품별 상세 페이지와 카테고리 분류
- 📱 **완전 반응형**: 모바일, 태블릿, 데스크톱 모두 최적화
- 🎨 **부드러운 애니메이션**: 스크롤 애니메이션 및 인터랙션 효과

### 관리자 모드
- 🔐 **보안 로그인**: 세션 기반 인증 시스템
- 📊 **대시보드**: 실시간 통계 및 활동 모니터링
- ✏️ **제품 관리**: 제품 추가, 수정, 삭제 기능
- 🔄 **실시간 동기화**: 관리자 페이지와 메인 페이지 데이터 동기화
- 💾 **데이터 저장**: localStorage를 통한 데이터 영속성

## 프로젝트 구조

```
Homepage_251008/
├── index.html              # 메인 홈페이지
├── css/
│   ├── style.css          # 메인 스타일
│   ├── product-detail.css # 제품 상세 페이지 스타일
│   └── admin.css          # 관리자 페이지 스타일
├── js/
│   ├── main.js            # 메인 JavaScript
│   ├── product-detail.js  # 제품 상세 페이지 JavaScript
│   ├── admin-login.js     # 관리자 로그인 JavaScript
│   └── admin.js           # 관리자 대시보드 JavaScript
├── products/
│   └── detail.html        # 제품 상세 페이지
├── admin/
│   ├── login.html         # 관리자 로그인 페이지
│   └── dashboard.html     # 관리자 대시보드
├── data/
│   └── products.json      # 제품 데이터
├── images/                # 이미지 자산
└── api/                   # API 엔드포인트 (향후 확장)
```

## 시작하기

### 1. 프로젝트 클론
```bash
git clone <repository-url>
cd Homepage_251008
```

### 2. 로컬 서버 실행
웹 브라우저에서 파일을 직접 열거나, 로컬 서버를 사용하세요:

#### Python 사용
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Node.js (http-server) 사용
```bash
npx http-server -p 8000
```

#### VS Code Live Server 확장 프로그램 사용
1. VS Code에서 프로젝트 열기
2. Live Server 확장 프로그램 설치
3. `index.html` 우클릭 → "Open with Live Server"

### 3. 브라우저에서 접속
```
http://localhost:8000
```

## 관리자 모드 사용법

### 로그인 정보
- **아이디**: `admin`
- **비밀번호**: `admin123`

### 관리자 기능

1. **대시보드**
   - 제품 통계 확인
   - 카테고리별 제품 수 모니터링
   - 최근 활동 로그

2. **제품 관리**
   - 새 제품 추가
   - 기존 제품 수정
   - 제품 삭제
   - 제품 정보 실시간 업데이트

### 제품 추가/수정 항목
- 제품명
- 카테고리 (보안/네트워크/클라우드/협업)
- 간단 설명
- 상세 설명
- 주요 기능 (여러 개)
- 가격

## 기술 스택

- **HTML5**: 시맨틱 마크업
- **CSS3**: Flexbox, Grid, 애니메이션, 반응형 디자인
- **JavaScript (ES6+)**: 모듈화된 코드, async/await, 클래스
- **JSON**: 데이터 저장 및 관리
- **LocalStorage**: 클라이언트 사이드 데이터 영속성

## 주요 특징

### 캐러셀
- 자동 재생 (5초 간격)
- 이전/다음 버튼
- 인디케이터 네비게이션
- 키보드 네비게이션 (←, →)
- 터치 스와이프 지원
- 마우스 호버 시 일시 정지

### 반응형 디자인
- **데스크톱**: 1200px 이상
- **태블릿**: 768px - 1199px
- **모바일**: 768px 이하

### 성능 최적화
- CSS 애니메이션 사용
- 이미지 지연 로딩
- 최소한의 JavaScript
- 효율적인 DOM 조작

## 브라우저 지원

- Chrome (최신 버전)
- Firefox (최신 버전)
- Safari (최신 버전)
- Edge (최신 버전)
- Opera (최신 버전)

## 커스터마이징

### 색상 변경
`css/style.css`의 `:root` 변수를 수정하세요:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #1e40af;
    --accent-color: #f59e0b;
    /* ... */
}
```

### 제품 데이터 수정
`data/products.json` 파일을 직접 수정하거나 관리자 모드를 사용하세요.

### 회사 정보 변경
- `index.html`의 푸터 섹션
- `index.html`의 회사 소개 섹션
- `index.html`의 문의 섹션

## 향후 개발 계획

- [ ] 백엔드 API 통합
- [ ] 데이터베이스 연결 (MongoDB/PostgreSQL)
- [ ] 이미지 업로드 기능
- [ ] 사용자 권한 관리
- [ ] 다국어 지원
- [ ] SEO 최적화
- [ ] PWA 지원
- [ ] 고급 분석 도구

## 보안 고려사항

현재 버전은 **데모/개발 목적**으로 제작되었습니다. 프로덕션 환경에서는:

1. 실제 인증 시스템 구축 (JWT, OAuth 등)
2. HTTPS 사용
3. 입력 검증 및 XSS 방지
4. CSRF 토큰 사용
5. 비밀번호 해싱 (bcrypt 등)
6. API 레이트 리미팅

## 라이선스

Copyright © 2024 PAPSNET. All rights reserved.

## 문의

- 웹사이트: [PAPSNET](http://localhost:8000)
- 이메일: info@papsnet.com
- 전화: 02-1234-5678

---

**PAPSNET** - 혁신적인 IT 솔루션 리더
