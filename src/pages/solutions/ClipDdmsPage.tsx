import React from 'react';
import ProductPageTemplate from '@/components/templates/ProductPageTemplate';
import {
  FileText,
  Lock,
  Search,
  GitBranch,
  FolderOpen,
  Shield,
  Eye,
  Download,
  History
} from 'lucide-react';

const ClipDdmsPage: React.FC = () => {
  const features = [
    {
      icon: FileText,
      title: '도면 중앙 관리',
      description: 'AutoCAD 도면과 관련 문서를 중앙에서 체계적으로 관리합니다.'
    },
    {
      icon: GitBranch,
      title: '자동 버전 관리',
      description: '모든 변경사항을 자동으로 추적하고 버전 이력을 관리합니다.'
    },
    {
      icon: Lock,
      title: '문서 보안',
      description: '역할 기반 접근 제어와 암호화로 중요 문서를 보호합니다.'
    },
    {
      icon: Search,
      title: '고급 검색',
      description: '메타데이터 기반 검색으로 필요한 도면을 빠르게 찾습니다.'
    },
    {
      icon: Eye,
      title: '뷰어 통합',
      description: 'CAD 없이도 도면을 조회하고 마크업할 수 있습니다.'
    },
    {
      icon: History,
      title: '변경 이력 추적',
      description: '누가, 언제, 무엇을 변경했는지 완벽하게 추적합니다.'
    }
  ];

  const benefits = [
    {
      title: '도면 검색 시간 단축',
      description: '메타데이터 기반 검색으로 도면 찾기 시간을 대폭 단축합니다.',
      metric: '80% 단축'
    },
    {
      title: '도면 분실 방지',
      description: '중앙 관리로 도면 분실과 중복을 완전히 방지합니다.',
      metric: '100% 방지'
    },
    {
      title: '협업 효율 향상',
      description: '실시간 도면 공유로 설계 협업 효율을 높입니다.',
      metric: '60% 향상'
    },
    {
      title: '보안 강화',
      description: '무단 접근과 유출을 차단하여 지적재산을 보호합니다.',
      metric: '99.9% 보안'
    },
    {
      title: '규정 준수',
      description: 'ISO 문서 관리 표준을 완벽하게 준수합니다.',
      metric: 'ISO 인증'
    },
    {
      title: '스토리지 최적화',
      description: '중복 제거와 압축으로 저장 공간을 절약합니다.',
      metric: '50% 절감'
    }
  ];

  const specifications = [
    {
      category: '지원 CAD',
      items: ['AutoCAD 2018+', 'AutoCAD LT', 'AutoCAD Mechanical', 'AutoCAD Electrical', 'DWG/DXF 형식']
    },
    {
      category: '파일 형식',
      items: ['DWG, DXF', 'PDF 자동 변환', 'TIFF, JPEG', 'Office 문서', 'ZIP 아카이브']
    },
    {
      category: '시스템 요구사항',
      items: ['Windows Server 2016+', 'SQL Server 2016+', '.NET Framework 4.8', 'IIS 8.0+', '최소 16GB RAM']
    },
    {
      category: '보안 기능',
      items: ['AES-256 암호화', 'AD/LDAP 통합', '워터마크', '접근 로그', 'DRM 보호']
    },
    {
      category: '통합 기능',
      items: ['CLIP PLM 연동', 'ERP 시스템', 'Email 알림', 'Web API', 'Mobile App']
    },
    {
      category: '확장 기능',
      items: ['OCR 텍스트 인식', 'AI 도면 분류', '3D 모델 지원', 'AR/VR 뷰어', '클라우드 백업']
    }
  ];

  const relatedProducts = [
    {
      name: 'CLIP PLM',
      href: '/clip-plm',
      description: 'PLM과 연동하여 완벽한 제품 데이터 관리'
    },
    {
      name: 'CADWin AI',
      href: '/cadwin-ai',
      description: 'AI 기반 도면 자동화 솔루션'
    },
    {
      name: 'CLIP ICMS',
      href: '/clip-icms',
      description: '통합 콘텐츠 관리 시스템'
    }
  ];

  const testimonial = {
    quote: 'CLIP DDMS 도입으로 도면 검색 시간이 80% 단축되고, 도면 분실 문제가 완전히 해결되었습니다. 특히 버전 관리 기능이 뛰어나 설계 변경 추적이 매우 편리해졌습니다.',
    author: '박영희 팀장',
    company: '현대중공업 설계팀',
    rating: 5
  };

  return (
    <ProductPageTemplate
      name="CLIP DDMS"
      tagline="AutoCAD 도면의 완벽한 관리 솔루션"
      description="AutoCAD 도면과 기술 문서를 체계적으로 관리하는 전문 도면 관리 시스템입니다. 검색, 버전 관리, 보안까지 모든 것을 한 번에 해결하세요."
      metaDescription="CLIP DDMS - AutoCAD 도면 관리 시스템. 중앙 관리, 버전 추적, 보안, 고급 검색 기능으로 도면 관리를 혁신합니다."
      features={features}
      benefits={benefits}
      specifications={specifications}
      relatedProducts={relatedProducts}
      testimonial={testimonial}
    />
  );
};

export default ClipDdmsPage;