# PAPSNET 홈페이지 통합 데이터 구조

## 1. 메인 페이지 (HomePage)

### 1.1 Hero Section
```json
{
  "hero": {
    "announcement": {
      "text": "🎉 CLIP PLM v6.0 출시",
      "href": "/news/clip-plm-v6"
    },
    "heading": "PLM 솔루션의 새로운 기준",
    "subheading": "제조 혁신을 위한 디지털 전환의 첫걸음",
    "tagline": "스마트 팩토리를 위한 통합 PLM 솔루션",
    "cta": [
      {
        "text": "무료 체험 시작",
        "href": "/trial",
        "variant": "primary"
      },
      {
        "text": "제품 데모 보기",
        "href": "/demo",
        "variant": "secondary"
      }
    ],
    "backgroundImage": "/images/hero-bg.jpg",
    "backgroundVideo": "/videos/papsnet-demo.mp4",
    "videoThumbnail": "/images/video-thumbnail.jpg",
    "youtubeEmbedUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ"
  }
}
```

### 1.2 Social Proof Section (고객사 로고 & 후기)
```json
{
  "socialProof": {
    "heading": "대한민국 대표 기업들이 선택한 PLM",
    "companies": [
      {
        "name": "현대자동차",
        "logo": "/images/logos/hyundai.png"
      },
      {
        "name": "삼성전자",
        "logo": "/images/logos/samsung.png"
      }
    ],
    "testimonials": [
      {
        "id": "t1",
        "company": "현대자동차",
        "title": "개발 기간 30% 단축, 협업 효율 50% 향상",
        "href": "/case-studies/hyundai"
      }
    ],
    "stats": [
      {"number": "20+", "label": "고객사"},
      {"number": "30+", "label": "수행 프로젝트"},
      {"number": "80%", "label": "전문가 비율"},
      {"number": "24/7", "label": "기술 지원"}
    ]
  }
}
```

### 1.3 Product Showcase (제품 쇼케이스)
```json
{
  "products": {
    "heading": "혁신적인 PLM 솔루션 라인업",
    "subheading": "제품 기획부터 폐기까지 전체 라이프사이클을 관리",
    "items": [
      {
        "id": "clip-plm",
        "title": "CLIP PLM",
        "subtitle": "Product Lifecycle Management",
        "description": "제품 수명 주기를 관리하는 통합 솔루션",
        "features": [
          "공지사항 & 대시보드",
          "프로젝트/도면 결재 관리",
          "E-BOM/Multi-BOM 관리",
          "설계변경(ECO, ECR, ECN) 관리"
        ],
        "icon": "📊",
        "color": "from-electric-400 to-electric-600",
        "stats": {
          "efficiency": "+45%",
          "time": "-60%",
          "accuracy": "99.9%"
        },
        "image": "/images/products/clip-plm.jpg",
        "href": "/solutions/clip-plm"
      },
      {
        "id": "ddms",
        "title": "DDMS",
        "subtitle": "Dynamic Drawing Management System",
        "description": "협력사 도면 배포 및 관리 솔루션",
        "features": [
          "도면 배포 관리",
          "워터마크 자동 삽입",
          "이력 조회 및 추적",
          "협력업체 관리"
        ],
        "icon": "📐",
        "color": "from-emerald-400 to-emerald-600",
        "stats": {
          "security": "100%",
          "collaboration": "+80%",
          "tracking": "Real-time"
        },
        "image": "/images/products/ddms.jpg",
        "href": "/solutions/ddms"
      }
    ]
  }
}
```

## 2. 활용사례 페이지 (CaseStudiesPage)

```json
{
  "caseStudies": {
    "heading": "고객 성공 사례",
    "subheading": "대한민국 대표 기업들이 PAPSNET 솔루션으로 달성한 혁신적인 성과",
    "items": [
      {
        "id": "cs1",
        "company": "현대자동차",
        "industry": "자동차 제조",
        "title": "PLM 시스템 도입으로 개발 기간 30% 단축",
        "description": "CLIP PLM을 도입하여 제품 개발 프로세스를 혁신하고 협업 효율성을 크게 향상시켰습니다.",
        "results": [
          "개발 기간 30% 단축",
          "협업 효율 50% 증가",
          "도면 관리 오류 95% 감소"
        ],
        "icon": "Building2",
        "image": "/images/case-studies/hyundai.jpg",
        "logo": "/images/logos/hyundai.png"
      }
    ]
  }
}
```

## 3. 가격정책 페이지 (PricingPage)

```json
{
  "pricing": {
    "heading": "투명하고 합리적인 가격",
    "subheading": "귀사의 규모와 필요에 맞는 플랜을 선택하세요",
    "plans": [
      {
        "id": "starter",
        "name": "Starter",
        "description": "소규모 팀을 위한 기본 PLM",
        "monthlyPrice": "500,000",
        "yearlyPrice": "5,000,000",
        "features": [
          "사용자 10명",
          "기본 PLM 기능",
          "5GB 스토리지",
          "이메일 지원",
          "기본 보고서"
        ],
        "notIncluded": [
          "고급 워크플로우",
          "협력사 포털",
          "전담 지원",
          "API 접근"
        ],
        "popular": false,
        "icon": "Zap"
      }
    ],
    "addons": [
      {
        "name": "CAD-WIN AI",
        "price": "300,000원/월"
      },
      {
        "name": "추가 스토리지 (100GB)",
        "price": "100,000원/월"
      }
    ]
  }
}
```

## 4. 기술문서 페이지 (DocsPage)

```json
{
  "docs": {
    "heading": "기술 문서",
    "subheading": "PAPSNET PLM 솔루션의 모든 것을 배우고 활용하세요",
    "categories": [
      {
        "id": "getting-started",
        "title": "시작 가이드",
        "description": "PLM 솔루션을 시작하는 방법",
        "icon": "Book",
        "color": "electric",
        "docs": [
          "빠른 시작 가이드",
          "설치 및 설정",
          "기본 개념",
          "첫 프로젝트 만들기"
        ]
      }
    ],
    "popularDocs": [
      {
        "title": "PLM 시스템 설치 가이드",
        "views": "15,234",
        "category": "시작 가이드",
        "downloadUrl": "/docs/plm-installation-guide.pdf"
      }
    ]
  }
}
```

## 5. 블로그 페이지 (BlogPage)

```json
{
  "blog": {
    "heading": "PAPSNET 블로그",
    "subheading": "PLM 인사이트, 산업 트렌드, 그리고 혁신적인 솔루션 활용법",
    "categories": [
      "전체",
      "PLM 가이드",
      "제품 소개",
      "BOM 관리",
      "AI & 자동화",
      "산업 트렌드",
      "변경 관리"
    ],
    "posts": [
      {
        "id": "blog1",
        "title": "PLM 시스템 도입 시 고려해야 할 7가지 핵심 요소",
        "excerpt": "PLM 시스템을 성공적으로 도입하기 위해서는 체계적인 접근이 필요합니다...",
        "date": "2025-03-15",
        "readTime": "8분",
        "author": "김철수",
        "category": "PLM 가이드",
        "tags": ["PLM", "디지털 전환", "제조 혁신"],
        "image": "/images/blog/plm-implementation.jpg",
        "coverImage": "/images/blog/plm-implementation-cover.jpg"
      }
    ]
  }
}
```

## 6. 연락처 페이지 (ContactPage)

```json
{
  "contact": {
    "heading": "문의하기",
    "subheading": "PLM 전문가가 귀사의 디지털 전환을 도와드립니다",
    "methods": [
      {
        "icon": "Phone",
        "title": "전화 상담",
        "description": "평일 09:00 - 18:00",
        "detail": "02-1234-5678",
        "color": "electric"
      },
      {
        "icon": "Mail",
        "title": "이메일 문의",
        "description": "24시간 접수 가능",
        "detail": "info@papsnet.com",
        "color": "emerald"
      }
    ],
    "officeInfo": {
      "address": "서울특별시 강남구 테헤란로 123\nABC빌딩 15층",
      "phone": "02-1234-5678",
      "email": "info@papsnet.com",
      "hours": "월-금: 09:00 - 18:00\n토-일: 휴무"
    },
    "mapImage": "/images/office-map.jpg",
    "mapEmbedUrl": "https://www.google.com/maps/embed?..."
  }
}
```

## 미디어 파일 구조

```
/public
  /images
    /hero
      - hero-bg.jpg
      - video-thumbnail.jpg
    /logos
      - hyundai.png
      - samsung.png
      - lg.png
    /products
      - clip-plm.jpg
      - ddms.jpg
      - epl.jpg
      - icms.jpg
      - cadwin-ai.jpg
    /case-studies
      - hyundai.jpg
      - samsung.jpg
      - lg.jpg
    /blog
      - plm-implementation.jpg
      - plm-implementation-cover.jpg
      - ddms-guide.jpg
      - bom-integration.jpg
    /office
      - office-map.jpg
      - office-exterior.jpg
  /videos
    - papsnet-demo.mp4
    - product-overview.mp4
  /docs
    - plm-installation-guide.pdf
    - api-reference.pdf
```

## API 엔드포인트 설계

### Public Endpoints
- GET `/api/public/hero` - 히어로 섹션
- GET `/api/public/social-proof` - 고객사 정보
- GET `/api/public/products` - 제품 목록
- GET `/api/public/case-studies` - 활용사례
- GET `/api/public/pricing` - 가격정책
- GET `/api/public/docs` - 기술문서
- GET `/api/public/blog` - 블로그
- GET `/api/public/blog/:id` - 블로그 상세
- GET `/api/public/contact` - 연락처 정보

### Admin Endpoints (JWT 인증 필요)
- PUT `/api/admin/hero` - 히어로 수정
- PUT `/api/admin/social-proof` - 고객사 수정
- POST `/api/admin/products` - 제품 추가
- PUT `/api/admin/products/:id` - 제품 수정
- DELETE `/api/admin/products/:id` - 제품 삭제
- POST `/api/admin/case-studies` - 사례 추가
- PUT `/api/admin/case-studies/:id` - 사례 수정
- POST `/api/admin/pricing/plans` - 플랜 추가
- PUT `/api/admin/pricing/plans/:id` - 플랜 수정
- POST `/api/admin/blog` - 블로그 포스트 추가
- PUT `/api/admin/blog/:id` - 블로그 수정
- DELETE `/api/admin/blog/:id` - 블로그 삭제
- POST `/api/admin/upload` - 이미지/파일 업로드
