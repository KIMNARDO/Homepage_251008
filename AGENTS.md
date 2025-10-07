# Repository Guidelines

## Project Structure & Module Organization
- 프런트엔드는 `src/` 아래 Vite + React 구조입니다. 공용 컴포넌트는 `components/`, 페이지는 `pages/`, 라우팅은 `routes/AppRoutes.tsx`, 상태 관리는 `stores/`, 유틸은 `utils/`, 스타일 토큰은 `styles/`에 배치합니다.
- 정적 자산은 `public/`, 앱 전용 미디어는 `src/assets/`, 빌드 산출물은 `dist/`에 생성됩니다.
- 테스트는 `tests/e2e/`(Playwright)와 `src/**/__tests__/` 또는 `*.test.tsx`(Vitest)에 위치합니다. 결과물은 `playwright-report/`, `test-results/`로 저장됩니다.
- 간소화된 백엔드는 `backend/`에 위치하며, Hero·Section 콘텐츠와 관리자 인증 API만 다루도록 유지합니다.

## Build, Test, and Development Commands
- `npm install`: 의존성 설치 (Node 18+, npm 9+ 권장).
- `npm run dev`: 개발 서버(http://localhost:5173) 실행.
- `npm run build`: TypeScript 체크 후 Vite 프로덕션 빌드.
- `npm run lint` / `npm run type-check`: ESLint와 TS 정적 검사.
- `npm run test` / `npm run test:coverage`: Vitest 실행 및 커버리지 보고.
- `npx playwright test`: 주요 E2E 시나리오 실행.
- 백엔드 테스트용: Maven 설치 후 `mvn -DskipTests package`로 빌드 상태를 확인합니다.

## Coding Style & Naming Conventions
- TypeScript는 2스페이스 들여쓰기, React 함수형 컴포넌트 사용이 기본입니다.
- 컴포넌트 파일은 `PascalCase.tsx`, 훅과 스토어·유틸은 `camelCase.ts`로 작성합니다.
- Tailwind 유틸리티 우선, 토큰 확장은 `tailwind.config.js` 또는 `papsnet-tailwind.config.js`에서 정의하세요.
- 경로 참조 시 `@/...` 별칭을 사용하여 상대경로 중첩을 피합니다.

## Testing Guidelines
- Vitest 스펙은 관련 컴포넌트 근처 `ComponentName.test.tsx` 또는 `__tests__/` 폴더에 둡니다.
- Playwright 테스트는 `tests/e2e/*.spec.ts`에 두고, 공용 픽스처는 `tests/global-setup.ts`에서 관리합니다.
- 실패 시 스크린샷/트레이스는 `playwright-report/`에, 커버리지 예외는 `TESTING_REPORT.md`에 기록합니다.

## Commit & Pull Request Guidelines
- Conventional Commits(예: `feat: update hero editor`)를 유지하세요.
- PR에는 변경 요약, 영향 받은 경로, 실행한 검증 명령(`npm run build`, `mvn package` 등)을 명시하고, 시각 변경이 있을 경우 스크린샷을 첨부합니다.
- 주요 사양 문서(`PAPSNET_Implementation_Guide.md` 등)에 근거할 경우 링크하거나 인용하고, 필요한 리뷰어(frontend/QA/디자인)를 태그합니다.

## Minimal Backend Coordination
- 백엔드는 Hero와 Section 편집을 위한 최소 API만 유지합니다. 불필요한 서비스/엔티티를 추가하지 말고, 변경 시 프런트 API(`src/services/api.ts`)와 데이터 모델을 동시에 업데이트하세요.
- 관리자 계정은 1~3명만 사용할 목적으로 설계되어 있으니, 계정 생성/권한 로직을 단순하게 유지합니다.
