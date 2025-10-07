# 프론트엔드-백엔드 API 연동 구조 분석

**작성일**: 2025-10-07
**분석 대상**: PAPSNET 홈페이지 v6.0

---

## 📋 목차

1. [현재 상태 요약](#현재-상태-요약)
2. [API 통신 구조](#api-통신-구조)
3. [백엔드 API 엔드포인트](#백엔드-api-엔드포인트)
4. [프론트엔드 API 클라이언트](#프론트엔드-api-클라이언트)
5. [데이터 흐름](#데이터-흐름)
6. [통합 시나리오](#통합-시나리오)
7. [개선 권장사항](#개선-권장사항)

---

## 현재 상태 요약

### ✅ 정상 작동
- **프론트엔드**: Vite + React (`http://localhost:5173`)
- **백엔드**: Node.js Simple CMS (`http://localhost:8080`)

### ⚠️ 이슈
- **API Base URL 불일치**:
  - 프론트엔드 기본 설정: `http://localhost:3001/api`
  - 백엔드 실제 포트: `http://localhost:8080/api`
- **환경 변수 미설정**: `.env` 파일이 없어 API URL 하드코딩됨
- **두 개의 API 클라이언트 공존**:
  - `src/services/api.ts` (복잡한 Spring Boot 용)
  - `src/services/simpleApi.ts` (Simple CMS 용)

---

## API 통신 구조

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (React)                         │
│                   http://localhost:5173                      │
│                                                              │
│  ┌──────────────────┐         ┌─────────────────────┐      │
│  │  Zustand Stores  │────────▶│   API Clients       │      │
│  │                  │         │                     │      │
│  │ - contentStore   │         │ - simpleApi.ts      │      │
│  │ - authStore      │         │ - api.ts            │      │
│  │ - adminStore     │         │                     │      │
│  └──────────────────┘         └──────────┬──────────┘      │
│         ▲                                 │                  │
│         │                                 │ HTTP Request    │
│         │ State Update                    │                  │
│         │                                 ▼                  │
└─────────┼─────────────────────────────────────────────────┘
          │                                 │
          │                                 │
          │                      ┌──────────▼──────────┐
          │                      │   CORS Middleware   │
          │                      │   (Express.js)      │
          │                      └──────────┬──────────┘
          │                                 │
          │                      ┌──────────▼──────────┐
          └──────────────────────│   Backend (Node.js) │
                                 │  http://localhost:8080│
                                 │                      │
                                 │  ┌────────────────┐ │
                                 │  │  Auth Routes   │ │
                                 │  │  Public Routes │ │
                                 │  │  Admin Routes  │ │
                                 │  └────────┬───────┘ │
                                 │           │          │
                                 │  ┌────────▼───────┐ │
                                 │  │  data.json     │ │
                                 │  │  (File-based)  │ │
                                 │  └────────────────┘ │
                                 └─────────────────────┘
```

---

## 백엔드 API 엔드포인트

### 서버 정보
- **포트**: `8080`
- **Base URL**: `http://localhost:8080/api`
- **저장소**: 파일 기반 (`backend-simple/data.json`)
- **인증**: JWT (Secret: `papsnet-simple-cms-secret-2024`)

### 1. 인증 (Auth)

#### POST `/api/admin/login`
관리자 로그인

**Request Body**:
```json
{
  "email": "admin@papsnet.com",
  "password": "admin123"
}
```

**Response** (200 OK):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "email": "admin@papsnet.com"
  }
}
```

**Response** (401 Unauthorized):
```json
{
  "error": "Invalid credentials"
}
```

---

### 2. 공개 엔드포인트 (Public)

#### GET `/api/public/hero`
히어로 섹션 콘텐츠 조회 (인증 불필요)

**Response** (200 OK):
```json
{
  "title": "PLM 솔루션의 새로운 기준",
  "subtitle": "제조 혁신을 위한 디지털 전환의 첫걸음",
  "ctaText": "무료 체험 시작",
  "ctaLink": "/demo",
  "imageUrl": "/images/hero-bg.jpg"
}
```

#### GET `/api/public/sections`
공개된 섹션 목록 조회

**Response** (200 OK):
```json
[
  {
    "id": "about",
    "title": "회사 소개",
    "content": "PAPSNET은 제조업 디지털 혁신을 선도하는 PLM 전문 기업입니다.",
    "isPublished": true
  }
]
```

---

### 3. 관리자 엔드포인트 (Admin)

> 🔒 모든 Admin 엔드포인트는 JWT 토큰 필요
> Header: `Authorization: Bearer <token>`

#### GET `/api/admin/hero`
히어로 콘텐츠 조회 (관리자)

**Response** (200 OK):
```json
{
  "title": "PLM 솔루션의 새로운 기준",
  "subtitle": "제조 혁신을 위한 디지털 전환의 첫걸음",
  "ctaText": "무료 체험 시작",
  "ctaLink": "/demo",
  "imageUrl": "/images/hero-bg.jpg"
}
```

#### PUT `/api/admin/hero`
히어로 콘텐츠 수정

**Request Body**:
```json
{
  "title": "새로운 타이틀",
  "subtitle": "새로운 서브타이틀",
  "ctaText": "지금 시작하기",
  "ctaLink": "/start",
  "imageUrl": "/images/new-hero.jpg"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "title": "새로운 타이틀",
    "subtitle": "새로운 서브타이틀",
    "ctaText": "지금 시작하기",
    "ctaLink": "/start",
    "imageUrl": "/images/new-hero.jpg"
  }
}
```

#### GET `/api/admin/sections`
모든 섹션 조회 (공개/비공개 포함)

**Response** (200 OK):
```json
[
  {
    "id": "about",
    "title": "회사 소개",
    "content": "PAPSNET은...",
    "isPublished": true
  },
  {
    "id": "draft-section",
    "title": "임시 섹션",
    "content": "작성 중...",
    "isPublished": false
  }
]
```

#### PUT `/api/admin/sections`
섹션 일괄 수정

**Request Body**:
```json
[
  {
    "id": "about",
    "title": "회사 소개 (수정됨)",
    "content": "업데이트된 내용",
    "isPublished": true
  }
]
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": [...]
}
```

#### POST `/api/admin/sections`
새 섹션 추가

**Request Body**:
```json
{
  "title": "새 섹션",
  "content": "섹션 내용",
  "isPublished": false
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "id": "1696812345678",
    "title": "새 섹션",
    "content": "섹션 내용",
    "isPublished": false,
    "createdAt": "2025-10-07T10:30:00.000Z"
  }
}
```

#### DELETE `/api/admin/sections/:id`
섹션 삭제

**Response** (200 OK):
```json
{
  "success": true
}
```

---

## 프론트엔드 API 클라이언트

### 1. Simple API Client (`src/services/simpleApi.ts`)

**현재 Simple CMS 백엔드와 연동하기 위한 간단한 클라이언트**

#### 설정
```typescript
const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

#### 인증 인터셉터
```typescript
// 모든 요청에 토큰 자동 추가
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

#### 사용 예시
```typescript
// 인증
import { auth, publicContent, adminContent } from '@/services/simpleApi';

// 로그인
await auth.login('admin@papsnet.com', 'admin123');

// 공개 콘텐츠 조회
const hero = await publicContent.getHero();
const sections = await publicContent.getSections();

// 관리자 콘텐츠 수정 (인증 필요)
await adminContent.updateHero({
  title: '새 타이틀',
  subtitle: '새 서브타이틀'
});
```

---

### 2. Main API Client (`src/services/api.ts`)

**복잡한 Spring Boot 백엔드를 위한 클라이언트 (현재 미사용)**

#### 설정
```typescript
// 환경 변수 또는 기본값
const API_BASE_URL = import.meta.env?.VITE_API_URL || 'http://localhost:3001/api';
const USE_MOCK_API = false; // Mock 모드 비활성화
```

#### 주요 기능
- **자동 토큰 갱신**: 401 에러 시 refresh token으로 자동 재시도
- **LocalStorage 관리**: 토큰 및 사용자 정보 자동 저장
- **타입 안전성**: TypeScript 인터페이스 정의
- **에러 처리**: 통일된 에러 핸들링

#### API 그룹
1. **publicContentAPI**: 공개 콘텐츠 (인증 불필요)
   - `list()`, `homepage()`, `getHero()`, `getFeatures()`
2. **adminContentAPI**: 관리자 콘텐츠 (인증 필요)
   - `list()`, `get()`, `create()`, `update()`, `delete()`
3. **adminNavigationAPI**: 네비게이션 관리
4. **mediaAPI**: 미디어 업로드/관리
5. **userAPI**: 사용자 관리
6. **authAPI**: 인증 (로그인, 로그아웃, 프로필)

---

## 데이터 흐름

### 1. 페이지 로드 시 (공개 콘텐츠)

```
1. 사용자가 홈페이지 접속
   └─▶ React Component 렌더링

2. useEffect에서 Zustand Store 액션 호출
   └─▶ contentStore.loadContent()

3. Store가 API 호출
   └─▶ publicContentAPI.homepage()
   └─▶ GET http://localhost:8080/api/public/hero

4. 백엔드에서 data.json 읽기
   └─▶ 파일에서 hero 데이터 로드

5. JSON 응답 반환
   └─▶ { title: "...", subtitle: "...", ... }

6. Store 상태 업데이트
   └─▶ contentStore.sections 업데이트

7. React 컴포넌트 리렌더링
   └─▶ 화면에 콘텐츠 표시
```

---

### 2. 관리자 로그인 및 수정

```
1. 관리자가 로그인 폼 작성
   └─▶ email: admin@papsnet.com, password: admin123

2. authStore.login() 호출
   └─▶ simpleApi.auth.login()
   └─▶ POST http://localhost:8080/api/admin/login

3. 백엔드에서 bcrypt로 비밀번호 검증
   └─▶ JWT 토큰 생성 (7일 유효)

4. 토큰 반환
   └─▶ { token: "eyJhbG...", user: { email: "..." } }

5. 프론트엔드에서 토큰 저장
   └─▶ localStorage.setItem('token', token)

6. axios interceptor가 모든 요청에 토큰 추가
   └─▶ Authorization: Bearer eyJhbG...

7. 관리자가 콘텐츠 수정
   └─▶ adminContent.updateHero(data)
   └─▶ PUT http://localhost:8080/api/admin/hero (with token)

8. 백엔드에서 JWT 검증
   └─▶ middleware: authenticate()

9. data.json 파일 업데이트
   └─▶ fs.writeFile('data.json', ...)

10. 성공 응답 반환
   └─▶ { success: true, data: {...} }

11. Store 상태 업데이트
   └─▶ contentStore.loadContent() 재호출

12. 화면 자동 갱신
   └─▶ 변경된 콘텐츠 표시
```

---

## 통합 시나리오

### 시나리오 1: 홈페이지 히어로 섹션 표시

**목표**: 사용자가 홈페이지에 접속하면 백엔드에서 히어로 콘텐츠를 가져와 표시

#### 구현 방법

**1. HeroSection 컴포넌트에서 Store 사용**

`src/components/sections/HeroSection.tsx`:
```typescript
import { useContentStore } from '@/stores/contentStore';

export function HeroSection() {
  const { sections, loadContent, isLoading } = useContentStore();

  useEffect(() => {
    loadContent(); // 페이지 로드 시 콘텐츠 가져오기
  }, [loadContent]);

  const heroContent = sections.find(s => s.id === 'hero')?.content;

  if (isLoading) return <div>Loading...</div>;

  return (
    <section>
      <h1>{heroContent?.heading}</h1>
      <p>{heroContent?.subheading}</p>
      {/* ... */}
    </section>
  );
}
```

**2. ContentStore에서 API 호출**

`src/stores/contentStore.ts`:
```typescript
loadContent: async () => {
  set({ isLoading: true });

  try {
    // publicContentAPI.homepage() 호출
    const response = await publicContentAPI.homepage();

    if (response?.success && response.data?.heroContent) {
      const heroContent = transformHeroContent(response.data.heroContent);

      set({
        sections: [{
          id: 'hero',
          type: 'hero',
          content: heroContent,
          isVisible: true
        }],
        isLoading: false
      });
    }
  } catch (error) {
    console.error('Failed to load content', error);
    set({ error: error.message, isLoading: false });
  }
}
```

**3. API 클라이언트 수정 (URL 일치)**

`src/services/api.ts`:
```typescript
// 기존
const API_BASE_URL = 'http://localhost:3001/api';

// 수정 → Simple CMS 포트에 맞춤
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
```

또는 `.env` 파일 생성:
```env
VITE_API_URL=http://localhost:8080/api
```

---

### 시나리오 2: 관리자 콘텐츠 수정

**목표**: 관리자가 로그인 후 히어로 섹션 수정

#### 구현 방법

**1. 로그인 페이지**

`src/pages/admin/LoginPage.tsx`:
```typescript
import { useSimpleAuthStore } from '@/stores/simpleAuthStore';

export function LoginPage() {
  const { login, isLoading, error } = useSimpleAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/admin/content');
    } catch (err) {
      // 에러 표시
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

**2. 관리자 콘텐츠 편집**

`src/pages/admin/ContentEditor.tsx`:
```typescript
import { adminContent } from '@/services/simpleApi';
import { useContentStore } from '@/stores/contentStore';

export function ContentEditor() {
  const { heroRecords, loadContent } = useContentStore();
  const [title, setTitle] = useState('');

  const handleSave = async () => {
    try {
      await adminContent.updateHero({
        title,
        subtitle: '...',
        // ...
      });

      // 변경사항 반영
      await loadContent();

      alert('저장되었습니다!');
    } catch (error) {
      alert('저장 실패: ' + error.message);
    }
  };

  return (
    <div>
      <input value={title} onChange={e => setTitle(e.target.value)} />
      <button onClick={handleSave}>저장</button>
    </div>
  );
}
```

---

### 시나리오 3: 새 섹션 추가

**목표**: 관리자가 새로운 섹션 (예: "고객 후기") 추가

#### 백엔드 API 호출

```typescript
import { adminContent } from '@/services/simpleApi';

const newSection = {
  title: '고객 후기',
  content: '만족도 95%!',
  isPublished: true
};

const response = await adminContent.addSection(newSection);
console.log('Created:', response.data);
```

#### 백엔드 처리

```javascript
// backend-simple/server.js
app.post('/api/admin/sections', authenticate, async (req, res) => {
  const data = await loadData();

  const newSection = {
    id: Date.now().toString(),
    ...req.body,
    createdAt: new Date().toISOString()
  };

  data.sections.push(newSection);
  await saveData(data);

  res.json({ success: true, data: newSection });
});
```

---

## 개선 권장사항

### 1. 환경 변수 설정 (우선순위: 🔥 높음)

**문제**: API URL이 하드코딩되어 개발/프로덕션 환경 전환 어려움

**해결책**:

`.env` 파일 생성:
```env
# 개발 환경
VITE_API_URL=http://localhost:8080/api

# 프로덕션 (배포 시 변경)
# VITE_API_URL=https://api.papsnet.com/api
```

`src/services/api.ts`:
```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
```

---

### 2. API 클라이언트 통합 (우선순위: 🟡 중간)

**문제**: `api.ts`와 `simpleApi.ts` 두 개 클라이언트 공존 → 혼란

**해결책**:

**Option A: simpleApi를 메인으로 사용**
- 현재 Simple CMS 백엔드와 완벽 호환
- 간단하고 직관적
- Axios 기반으로 에러 처리 용이

**Option B: api.ts 업데이트**
- Spring Boot 백엔드로 마이그레이션 계획이 있다면
- 더 복잡한 인증 (JWT refresh) 지원
- 타입 안전성 우수

**권장**: 현재는 **simpleApi.ts** 사용, 향후 Spring Boot 전환 시 api.ts로 마이그레이션

---

### 3. 에러 처리 개선 (우선순위: 🟡 중간)

**문제**: 네트워크 에러 시 사용자 피드백 부족

**해결책**:

전역 에러 핸들러 추가:
```typescript
// src/services/simpleApi.ts
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // 토큰 만료 → 로그인 페이지로 리다이렉트
      auth.logout();
      window.location.href = '/admin/login';
    } else if (error.response?.status === 500) {
      alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
    return Promise.reject(error);
  }
);
```

---

### 4. 로딩 상태 UI (우선순위: 🟢 낮음)

**문제**: API 호출 중 로딩 표시 없음

**해결책**:

```typescript
export function HeroSection() {
  const { isLoading } = useContentStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // ...
}
```

---

### 5. 캐싱 전략 (우선순위: 🟢 낮음)

**문제**: 페이지 이동 시마다 동일한 콘텐츠 재로드

**해결책**:

Zustand persist 활성화:
```typescript
export const useContentStore = create<ContentState>()(
  persist(
    (set, get) => ({
      // ...
    }),
    {
      name: 'content-store',
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          return str ? JSON.parse(str) : null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);
```

**주의**: 캐시 만료 시간 설정 필요 (예: 5분)

---

### 6. TypeScript 타입 동기화 (우선순위: 🟡 중간)

**문제**: 백엔드 API 스키마와 프론트엔드 타입 불일치 가능

**해결책**:

**Option A: 수동 타입 정의**
```typescript
// src/types/api.ts
export interface HeroContent {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  imageUrl?: string;
}

export interface Section {
  id: string;
  title: string;
  content: string;
  isPublished: boolean;
  createdAt?: string;
}
```

**Option B: API 스키마 자동 생성 (장기 계획)**
- OpenAPI/Swagger 스펙 작성
- `openapi-typescript` 도구로 타입 자동 생성

---

### 7. 보안 개선 (우선순위: 🔥 높음)

**문제**:
- JWT Secret이 코드에 하드코딩됨
- HTTPS 미사용 (개발 환경)

**해결책**:

**백엔드**:
```javascript
// backend-simple/server.js
const SECRET = process.env.JWT_SECRET || 'fallback-secret-only-for-dev';

if (process.env.NODE_ENV === 'production' && !process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET must be set in production!');
}
```

**.env.local** (프로덕션):
```env
JWT_SECRET=your-super-secret-key-change-this-in-production
NODE_ENV=production
```

**프론트엔드** (HTTPS 적용):
```typescript
// 프로덕션에서는 HTTPS만 허용
const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://api.papsnet.com/api'
  : 'http://localhost:8080/api';
```

---

## 빠른 시작 가이드

### 1. 백엔드 실행
```bash
cd backend-simple
npm install
npm start
# ✅ Simple CMS Backend running on http://localhost:8080
```

### 2. 프론트엔드 실행
```bash
npm install
npm run dev
# ✅ Vite dev server running on http://localhost:5173
```

### 3. API 연동 테스트

브라우저 콘솔에서:
```javascript
// 1. 공개 콘텐츠 조회
fetch('http://localhost:8080/api/public/hero')
  .then(r => r.json())
  .then(console.log);

// 2. 로그인
fetch('http://localhost:8080/api/admin/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@papsnet.com',
    password: 'admin123'
  })
})
  .then(r => r.json())
  .then(data => {
    localStorage.setItem('token', data.token);
    console.log('Logged in!', data);
  });

// 3. 관리자 콘텐츠 수정
const token = localStorage.getItem('token');
fetch('http://localhost:8080/api/admin/hero', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    title: '테스트 타이틀',
    subtitle: '테스트 서브타이틀'
  })
})
  .then(r => r.json())
  .then(console.log);
```

---

## 다음 단계

1. ✅ **환경 변수 설정** (`.env` 파일 생성)
2. ✅ **API URL 통일** (`api.ts` 수정)
3. ✅ **에러 처리 개선** (interceptor 추가)
4. ⏳ **로딩 UI 구현**
5. ⏳ **타입 동기화**
6. ⏳ **프로덕션 보안 강화**

---

**문서 끝** | [CLAUDE.md](./CLAUDE.md)로 돌아가기
