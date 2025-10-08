# CLAUDE.md

이 문서는 Claude Code가 현재 저장소 상태를 빠르게 이해하고, 협업 시 따라야 할 공통 지침과 문서 템플릿을 제공합니다. 마지막 업데이트: 2025-10-07.

## Current Status (2025-10-07)
- **프런트엔드**: Vite + React 앱은 `npm run dev` (기본 포트 5173)로 정상 구동됩니다.
- **백엔드**: Spring Boot 프로젝트에 100개 이상 컴파일 오류가 남아 있으며, Lombok 프로세서 미동작, repository 메서드 누락, `AdminUser` 헬퍼 메서드 부재 등이 주요 이슈입니다.
- **임시 조치**: `PricingController` / `PricingService`의 `QuoteRequest` 충돌은 해결됨. 그 외 오류는 미해결 상태입니다.
- **즉각적 권장사항**:
  1. Maven(또는 mvnw) 설치 및 `mvn -DskipTests package`로 현재 오류 전수 확인.
  2. 핵심 API 스펙 재수집 후, “부분 안정화” vs “완전 재구성” 중 전략 결정.
  3. 문서화(PDR/기술 지침) 선행 없이 재구성 착수 금지.

## Backend Stabilization vs Rebuild

### 단계적 안정화가 적합한 경우
- 기존 기능 중 다수가 정상 동작하며, 오류가 특정 모듈(예: Lombok, Repository)로 한정될 때.
- 서비스 중단 시간을 최소화해야 할 때.
- 인력/예산이 제한되어 연속적인 작은 배포가 필요한 경우.

### 완전 재구성이 적합한 경우
- 핵심 도메인 정의부터 다시 설계해야 하거나, 기술 스택을 전환해야 할 때.
- 코드 기반이 과도하게 파편화되어 이해 및 수정 비용이 지나치게 높을 때.
- 장기 로드맵상 마이크로서비스 분리, 신규 인증 체계 등 대규모 변경이 예정되어 있을 때.

## Backend Rebuild Preparation Checklist
1. **요구사항 정리**: CMS/홈페이지가 충족해야 할 기능·성능·보안 요구를 이해관계자와 확정합니다.
2. **현재 상태 감사**: 사용 중인 엔드포인트, 데이터 모델, 장애 사례, 배포 파이프라인을 조사해 문서화합니다.
3. **PRD 작성**: 비즈니스 목표/사용자 스토리/성공 지표를 명시한 PRD 초안을 합의합니다.
4. **기술 지침 정의**: 언어/프레임워크, 계층 구조, 인증/보안, 테스트·CI/CD 정책 등을 포함한 아키텍처 가이드를 수립합니다.
5. **마이그레이션 전략**: 데이터 이전, 점진적 전환 여부, 롤백 플랜, 병행 운영 계획을 확정합니다.
6. **로드맵과 담당**: 일정, 마일스톤, 담당자, 리뷰·QA 절차를 캘린더에 반영합니다.
7. **실행 전 점검**: 개발 환경(Maven, JDK, DB)과 필수 도구(Jira, CI, 모니터링)가 준비되었는지 확인합니다.

## Document Templates

아래 템플릿은 노션/Markdown 어디에서든 그대로 복사해 사용할 수 있도록 작성되었습니다.

### 1. Product Requirements Document (PRD)
```
# {프로젝트 명} PRD

## 1. 개요
- 문서 버전 / 작성일 / 작성자
- 프로젝트 목표 요약

## 2. 비즈니스 배경
- 해결하려는 문제
- 기대 효과 및 KPI

## 3. 사용자 및 페르소나
- 주요 사용자 유형 (예: 콘텐츠 관리자, 마케팅, QA)
- 각 사용자 목표와 Pain Point

## 4. 요구 기능
| ID | 기능명 | 설명 | 우선순위 | 비고 |
|----|--------|------|----------|------|

## 5. 사용자 흐름
- 시나리오 다이어그램 혹은 단계별 설명

## 6. 비기능 요구사항
- 성능 (응답시간, 처리량)
- 가용성/복구 목표
- 보안/규제 요건

## 7. 의존성 & 리스크
- 외부 시스템 연동
- 예상 리스크와 완화 전략

## 8. 성공 지표
- KPI 정의 및 측정 계획

## 9. 일정 및 마일스톤
- 주요 일정표 (탐색 → 설계 → 개발 → 테스트 → 런칭)
```

### 2. Technical Architecture Guide
```
# {프로젝트 명} Technical Architecture Guide

## 1. 개요
- 목표 요약
- 주요 의사결정 (언어, 프레임워크, DB 등)

## 2. 시스템 구성 요소
- 서비스 다이어그램
- 모듈/컨텍스트 설명

## 3. API 설계 원칙
- REST/GraphQL 규약
- 엔드포인트 버전 전략
- 에러 처리 규칙

## 4. 데이터 모델
- 주요 ERD
- 마이그레이션/Seed 전략

## 5. 인증 & 권한
- 인증 흐름 (JWT, OAuth 등)
- 롤/권한 매트릭스

## 6. 품질 속성
- 성능 튜닝 전략
- 캐싱, 큐, 비동기 처리 정책
- 로깅/모니터링/알림

## 7. 개발 파이프라인
- 로컬 개발 환경 설정
- CI/CD 플로우, 브랜치 전략
- 테스트 전략 (단위/통합/E2E)

## 8. 보안 & 규정 준수
- 비밀정보 관리
- 취약점 대응 프로토콜

## 9. 운영 가이드
- 배포 체크리스트
- 장애 대응 절차
```

### 3. Migration & Cutover Plan
```
# {프로젝트 명} Migration Plan

## 1. 범위
- 현재 시스템 요약
- 마이그레이션 대상 데이터/기능

## 2. 사전 준비
- 백업 전략
- 스테이징 환경 구성
- 검증 절차 정의

## 3. 단계별 계획
| 단계 | 설명 | 예상 기간 | 책임자 | 검증 항목 |
|------|------|----------|--------|-----------|

## 4. 병행 운영 전략
- 롤백 조건
- 롤백 절차

## 5. 커뮤니케이션 계획
- 이해관계자 연락처
- 공지 일정

## 6. 완료 기준
- 성공 조건 체크리스트
```

## 핵심 개발 명령어 요약

### 프런트엔드 (React/TypeScript/Vite)
```bash
# 설치
npm install

# 개발 서버
npm run dev          # http://localhost:5173
npm run preview      # 빌드 후 프리뷰

# 빌드 & 검증
npm run build        # tsc + vite build
npm run lint
npm run test
npm run test:coverage
```

### 백엔드 (Spring Boot/Java 17)
> 주의: 현재 저장소에는 `mvn` 혹은 `mvnw`가 설치되어 있지 않습니다. 실행 전 Maven 설치가 필요합니다.
```bash
# 개발 서버
mvn spring-boot:run -Dspring-boot.run.profiles=dev

# 빌드
mvn clean package

# DB 마이그레이션 (Flyway)
mvn flyway:migrate
```

## 구조 개요 (요약)
- **프런트엔드**: React 18, TypeScript, Vite, Tailwind, Zustand, React Router.
  - 주요 디렉터리: `src/components`, `src/pages`, `src/stores`, `src/routes`.
- **백엔드**: Spring Boot 3.x, Java 17, PostgreSQL, Redis, JWT, AWS S3.
  - 패키지: `entity`, `repository`, `service`, `controller`, `dto`, `security`, `enums`.

필요 시 이 문서를 계속 업데이트해 최신 상태를 기록해주세요.
깃허브를 위한 지침
1. github 푸쉬를 위해 다음 저장 사용
github 저장소 주소: https://github.com/KIMNARDO/Homepage_251008
Git GUB의 Personal Access Token: [보안상 .env 파일에서 관리]

2. 원격 저장소에 푸시할 때, 먼저 HTTP 버퍼 크기를 늘리고 조금 씩 나누어 푸시할 것. 에러 시 작은 변경사항만 포함하는 새커밋을 만들어 푸시할 것
3. PLAN.md 파일의 작업이 한단계 진행될때마다 PLAN.md 파일에 진행상황 체크하고, 깃허브에 반영할 것

## API Keys 관리

**보안상 모든 API 키는 .env 파일에서 관리합니다:**

- OpenAI API Key: OPENAI_API_KEY 환경변수 사용
- Claude API Key: CLAUDE_API_KEY 환경변수 사용
- Google Gemini API Key: GEMINI_API_KEY 환경변수 사용

`.env` 파일 예시:
```
OPENAI_API_KEY=your_openai_key_here
CLAUDE_API_KEY=your_claude_key_here
GEMINI_API_KEY=your_gemini_key_here
```

**주의: .env 파일은 절대 git에 커밋하지 마세요!**

