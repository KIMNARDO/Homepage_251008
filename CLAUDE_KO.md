# CLAUDE_KO.md

이 파일은 이 저장소에서 작업할 때 Claude Code (claude.ai/code)에게 제공되는 가이드입니다.

## 개요

PAPSNET 홈페이지 - 자동차, 반도체, 의료기기 산업을 위한 PLM(제품 수명 주기 관리) 솔루션 전문 기업인 주식회사 팹스넷의 현대적인 엔터프라이즈 React 애플리케이션 및 Spring Boot 백엔드입니다.

## 개발 명령어

### 프론트엔드 (React/TypeScript/Vite)
```bash
# 개발
npm run dev          # localhost:3000에서 개발 서버 시작
npm run preview      # localhost:4173에서 프로덕션 빌드 미리보기

# 빌드
npm run build        # 프로덕션 빌드 (TypeScript 체크 + Vite 빌드)
npm run type-check   # 타입 체크만 수행 (출력 없음)

# 품질 관리
npm run lint         # ESLint 실행 (최대 경고 0)
npm run test         # Vitest 테스트 실행
npm run test:ui      # Vitest UI로 테스트 실행
npm run test:coverage # 커버리지 리포트와 함께 테스트 실행
```

### 백엔드 (Spring Boot/Java 17)
```bash
# 개발
mvn spring-boot:run -Dspring-boot.run.profiles=dev  # dev 프로파일로 실행
mvn spring-boot:run -Dspring-boot.run.profiles=prod # prod 프로파일로 실행

# 빌드
mvn clean package    # JAR 빌드
mvn clean install    # 빌드 후 로컬 저장소에 설치

# 데이터베이스
mvn flyway:migrate   # 데이터베이스 마이그레이션 실행
mvn flyway:clean     # 데이터베이스 초기화 (주의: 파괴적 작업)
mvn flyway:info      # 마이그레이션 상태 확인

# 테스트
mvn test            # 단위 테스트 실행
mvn verify          # 통합 테스트 실행
```

## 아키텍처

### 프론트엔드 구조

**기술 스택**: React 18, TypeScript, Vite, Tailwind CSS, Zustand (상태 관리), React Router DOM v6

**주요 디렉토리**:
- `src/components/` - 타입별로 구성된 재사용 가능한 UI 컴포넌트 (layout, sections, ui, interactive, admin, templates)
- `src/pages/` - 성능 최적화를 위한 지연 로딩이 적용된 라우트 기반 페이지 컴포넌트
- `src/stores/` - 상태 관리를 위한 Zustand 스토어 (auth, content, media, user)
- `src/routes/` - 코드 분할이 적용된 중앙 라우팅 설정
- `src/data/` - 정적 데이터 및 콘텐츠 설정

**라우팅 아키텍처**:
- 공개 페이지용 메인 레이아웃 래퍼
- 인증 보호가 적용된 관리자 레이아웃 래퍼
- 최적의 번들 분할을 위한 지연 로드 컴포넌트
- ProtectedRoute 컴포넌트를 사용한 보호된 라우트

**상태 관리**:
- `contentStore`: 영속성이 있는 동적 콘텐츠 관리
- `authStore`: 인증 상태 및 JWT 관리
- `mediaStore`: 미디어 라이브러리 상태
- `userStore`: 사용자 프로필 및 환경설정

**경로 별칭** (vite.config.ts 및 tsconfig.json에 설정):
- `@/` → `src/`
- `@/components/` → `src/components/`
- `@/hooks/` → `src/hooks/`
- `@/utils/` → `src/utils/`
- `@/types/` → `src/types/`
- `@/assets/` → `src/assets/`
- `@/data/` → `src/data/`

### 백엔드 구조

**기술 스택**: Spring Boot 3.2.1, Java 17, PostgreSQL, Redis, JWT, AWS S3

**패키지 구조**:
- `com.papsnet.website.entity` - BaseEntity를 확장한 JPA 엔티티
- `com.papsnet.website.repository` - Spring Data JPA 리포지토리
- `com.papsnet.website.service` - 비즈니스 로직 계층
- `com.papsnet.website.controller` - REST API 컨트롤러
- `com.papsnet.website.dto` - 요청/응답 DTO 및 MapStruct 매퍼
- `com.papsnet.website.security` - JWT 인증, 2FA, 보안 설정
- `com.papsnet.website.enums` - 상태/타입용 도메인 열거형

**보안 아키텍처**:
- 리프레시 토큰이 포함된 JWT 기반 인증
- TOTP를 통한 2단계 인증 지원
- 역할 기반 접근 제어 (관리자 역할)
- Bucket4j를 사용한 요청 제한
- 모든 관리자 작업에 대한 감사 로깅

**데이터 계층**:
- 주 데이터 저장소로 PostgreSQL 사용
- 캐싱 및 세션 관리용 Redis
- 데이터베이스 마이그레이션용 Flyway
- 미디어 저장소용 AWS S3

### 컴포넌트 간 통신

**프론트엔드 → 백엔드 API**:
- 모든 API 호출은 `src/services/api.ts`를 통해 수행
- JWT 토큰은 localStorage/sessionStorage에 저장
- 401 응답 시 자동 토큰 갱신
- 우아한 오류 처리를 위한 에러 바운더리

**콘텐츠 관리 흐름**:
1. 관리자가 AdminContent 컴포넌트에서 콘텐츠 편집
2. 변경사항이 contentStore (Zustand)에 저장
3. 백엔드 ContentManagementService로 API 호출
4. PostgreSQL에 데이터 영속화
5. 스토어 구독을 통한 프론트엔드 새로고침

**미디어 업로드 흐름**:
1. 관리자 미디어 매니저에서 파일 선택
2. 멀티파트 폼으로 백엔드에 업로드
3. 백엔드에서 처리 후 S3에 업로드
4. URL 반환 및 MediaLibrary 엔티티에 저장
5. 프론트엔드가 새 자산으로 mediaStore 업데이트

## 주요 기능 및 구현

### 동적 콘텐츠 관리
- 관리자 패널에서 실시간 미리보기 편집
- 히어로 섹션, 제품 쇼케이스, 기능 섹션을 동적으로 편집 가능
- localStorage 영속성과 함께 Zustand에 콘텐츠 저장
- ContentManagementService를 통한 백엔드 영속화

### 멀티 제품 아키텍처
개별 엔티티로 관리되는 제품들:
- CLIP PLM - 제품 수명 주기 관리
- CLIP DDMS - 도면 배포 관리 시스템
- CLIP EPL - 멀티 BOM 관리
- CLIP PMS - 프로젝트 관리 시스템
- CLIP ICMS - 통합 원가 관리 시스템
- CADWin AI - AI 기반 CAD 분석

### 반응형 디자인 시스템
- `papsnet-tailwind.config.js`의 커스텀 Tailwind 설정
- 브레이크포인트를 사용한 모바일 우선 접근: xs(320px), sm(640px), md(768px), lg(1024px), xl(1280px), 2xl(1536px), 3xl(1920px)
- 커스텀 PAPSNET 색상 팔레트 및 타이포그래피 스케일
- 글래스모피즘 유틸리티 및 애니메이션 프리셋

### 성능 최적화
- React.lazy를 사용한 라우트 기반 코드 분할
- vendor, motion, carousel 라이브러리용 수동 청크 분리
- 이미지 최적화 및 지연 로딩
- 트리 쉐이킹이 적용된 Vite 빌드 최적화
- Redis를 사용한 백엔드 응답 캐싱
- CDN 지원 정적 자산 구조

### 보안 고려사항
- 보안 httpOnly 쿠키 옵션을 사용한 JWT 인증
- 2단계 인증 구현
- 관리자 기능에 대한 역할 기반 접근 제어
- API 엔드포인트에 요청 제한 적용
- 입력 검증 및 새니타이징
- JPA 매개변수화된 쿼리를 통한 SQL 인젝션 방지
- React의 기본 이스케이핑을 통한 XSS 보호

## 중요 설정

### 환경 변수 (프론트엔드)
- `VITE_API_URL` - 백엔드 API 엔드포인트
- `VITE_CDN_URL` - 정적 자산용 CDN
- `VITE_GA_ID` - Google Analytics ID

### Spring 프로파일 (백엔드)
- `dev` - H2 데이터베이스, 디버그 로깅이 적용된 개발 환경
- `prod` - PostgreSQL, 최적화된 설정이 적용된 프로덕션 환경
- 설정 파일: `application-dev.yml`, `application-prod.yml`

### 데이터베이스 마이그레이션
`backend/src/main/resources/db/migration/`에 위치
- 네이밍: `V{version}__{description}.sql`
- Flyway를 통해 애플리케이션 시작 시 자동 실행

## 테스트 전략

### 프론트엔드 테스트
- 컴포넌트 및 유틸리티에 대한 Vitest 단위 테스트
- 페이지 컴포넌트에 대한 통합 테스트
- Playwright를 사용한 E2E 테스트 (설정 시)

### 백엔드 테스트
- JUnit 5와 Mockito를 사용한 단위 테스트
- @SpringBootTest를 사용한 통합 테스트
- 데이터베이스 테스트용 TestContainers
- @WithMockUser를 사용한 보안 테스트

## 관리자 기능

### 콘텐츠 관리
- 실시간 미리보기 편집
- 섹션 재정렬 및 표시 토글
- 히어로 콘텐츠 커스터마이징
- 제품 쇼케이스 관리
- S3 통합 미디어 라이브러리

### 분석 대시보드
- 실시간 방문자 통계
- 콘텐츠 성능 지표
- 사용자 참여 추적
- 전환율 모니터링

### 사용자 관리
- 관리자 사용자 CRUD 작업
- 역할 기반 권한
- 활동 감사 로그
- 2단계 인증 설정

## 프로젝트별 핵심 정보

### PAPSNET 제품 라인업
1. **CLIP PLM**: 제품 수명 주기 전체를 관리하는 통합 솔루션
2. **CLIP DDMS**: 협력사 도면 배포 및 관리 시스템
3. **CLIP EPL**: 기구&전자 Multi-BOM 솔루션
4. **CLIP ICMS**: 통합 원가 관리 시스템
5. **CADWin AI**: AutoCAD 통합 AI 기반 도면 분석 솔루션

### 주요 고객 산업군
- 자동차 산업
- 반도체 산업
- 의료기기 산업

### 회사 정보
- 회사명: 주식회사 팹스넷 (PAPSNET Co., Ltd.)
- 설립: 2021년
- 주요 서비스: PLM 솔루션, 도면 관리, BOM 관리, 원가 관리, AI CAD 분석

## MCP (Model Context Protocol) 자동 설치

### 공통 주의사항
1. 현재 사용 환경을 확인할 것. 모르면 사용자에게 물어볼 것.
2. OS(윈도우, 리눅스, 맥) 및 환경들(WSL, 파워셸, 명령 프롬프트 등)을 파악해서 그에 맞게 세팅할 것. 모르면 사용자에게 물어볼 것.
3. 특정 MCP 설치시, 바로 설치하지 말고, 해당 MCP의 공식 사이트 확인하고 현재 OS 및 환경 매치하여, 공식 설치법부터 확인할 것.
4. MCP 설치 후, 다음 방법으로 정상 설치 여부 확인할 것:
   ```powershell
   $env:RUST_LOG="codex=debug"; codex "/mcp"
   ```
   이렇게 실행하여 설치한 MCP에 대한 로그를 확인할 것.

5. 설정 시, API KEY 환경 변수 설정이 필요한 경우, 가상의 API 키로 디폴트로 설치 및 설정 후, 올바른 API 키 정보를 입력해야 함을 사용자에게 알릴 것.
6. 설치 요청 받은 MCP만 설치하면 돼. 혹시 이미 설치된 다른 MCP 에러 있어도, 그냥 둘 것.
7. 일단, 터미널에서 설치하려는 MCP 작동 성공한 경우, 성공 시의 인자 및 환경 변수 이름을 활용해, 올바른 위치의 config.toml 파일에 MCP 설정을 직접할 것.

### MCP 설정
`~/.codex/config.toml`(홈 디렉터리) 파일의 `[mcp_servers.*]` 섹션에 적어둔 커맨드를 실행해 MCP 서버에 연결합니다.

### 설정 예시
```toml
# ~/.codex/config.toml

[mcp_servers.brightData]
command = "npx"
args    = ["-y", "@brightdata/mcp"]
env     = {
  API_TOKEN = "bd_your_api_key_here"
}

[mcp_servers.playwright]
command = "npx"
args    = ["@playwright/mcp@latest"]
```

### 설치 검증 프로세스
1. 먼저 터미널에서 MCP 테스트
2. 올바른 인자로 성공적인 작동 확인
3. config.toml에 설정 추가
4. 변경사항 적용을 위해 Claude Code 재시작
5. Claude Code 인터페이스에서 MCP 사용 가능 여부 확인