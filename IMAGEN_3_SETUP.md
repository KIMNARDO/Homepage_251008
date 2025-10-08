# Imagen 3 Setup Guide

Google Imagen 3를 사용하기 위한 설정 가이드입니다.

## 개요

Imagen 3는 Google Cloud Vertex AI를 통해 제공되는 고급 이미지 생성 모델입니다. DALL-E 3와 달리 Google Cloud 프로젝트 설정이 필요합니다.

## 비용

- **Imagen 3.0 Standard**: 이미지당 약 $0.02
- **Imagen 3.0 Fast**: 이미지당 약 $0.01
- **DALL-E 3 (비교)**: 이미지당 $0.04 (1024x1024)

💡 **Imagen 3가 DALL-E 3보다 비용이 저렴합니다!**

## 설정 단계

### 1. Google Cloud 프로젝트 생성

1. [Google Cloud Console](https://console.cloud.google.com)에 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. 프로젝트 ID 확인 (예: `my-project-123456`)

### 2. Vertex AI API 활성화

1. [Vertex AI API](https://console.cloud.google.com/apis/library/aiplatform.googleapis.com) 페이지로 이동
2. "사용 설정" 버튼 클릭
3. 활성화될 때까지 대기 (1-2분)

### 3. 인증 설정

#### 옵션 A: 기본 인증 (권장)

Google Cloud SDK가 설치된 환경에서:

```bash
gcloud auth application-default login
gcloud config set project YOUR_PROJECT_ID
```

#### 옵션 B: 서비스 계정 키 (프로덕션)

1. [서비스 계정](https://console.cloud.google.com/iam-admin/serviceaccounts) 페이지로 이동
2. "서비스 계정 만들기" 클릭
3. 이름: `imagen-service-account`
4. 역할 추가: `Vertex AI User`
5. 키 생성 → JSON 다운로드
6. 키 파일을 `backend-simple/` 디렉토리에 저장

### 4. 환경 변수 설정

`backend-simple/.env` 파일 편집:

```env
# 필수: Google Cloud 프로젝트 ID
GOOGLE_CLOUD_PROJECT_ID=your-project-id-here

# 선택: 리전 (기본값: us-central1)
GOOGLE_CLOUD_LOCATION=us-central1

# 선택: 서비스 계정 키 파일 경로 (옵션 B 사용 시)
GOOGLE_APPLICATION_CREDENTIALS=./service-account-key.json
```

**예시:**
```env
GOOGLE_CLOUD_PROJECT_ID=my-homepage-project-123
GOOGLE_CLOUD_LOCATION=us-central1
```

### 5. 백엔드 재시작

```bash
cd backend-simple
npm start
```

로그에서 다음 메시지 확인:
```
[Vertex AI] Prediction client initialized successfully
```

## 사용 방법

1. 관리자 페이지의 Body Section Editor 열기
2. AI Image Generator에서 **Imagen 3** 선택
3. 프롬프트 입력 후 생성

## 문제 해결

### "Google Cloud Project ID is not configured"

`.env` 파일에 `GOOGLE_CLOUD_PROJECT_ID` 설정 확인

### "Vertex AI Prediction client is not initialized"

1. Vertex AI API가 활성화되었는지 확인
2. 인증이 올바르게 설정되었는지 확인
3. 서비스 계정에 `Vertex AI User` 권한이 있는지 확인

### "Permission denied"

서비스 계정 또는 사용자에게 다음 권한 부여:
- `aiplatform.endpoints.predict`
- `aiplatform.models.predict`

## 지원 모델

- **imagen-3.0-generate-001**: Standard 품질 (권장)
- **imagen-3.0-generate-fast-001**: 빠른 생성

## 지원 종횡비

- 1:1 (Square)
- 3:4 (Vertical)
- 4:3 (Horizontal)
- 9:16 (Mobile Portrait)
- 16:9 (Landscape)

## 참고 자료

- [Vertex AI Imagen Documentation](https://cloud.google.com/vertex-ai/docs/generative-ai/image/overview)
- [Pricing](https://cloud.google.com/vertex-ai/pricing#generative_ai_models)
- [Quotas and Limits](https://cloud.google.com/vertex-ai/docs/quotas)

## 대안

Vertex AI 설정이 부담스럽다면 **DALL-E 3**를 사용하세요. API 키만 있으면 즉시 사용 가능합니다.
