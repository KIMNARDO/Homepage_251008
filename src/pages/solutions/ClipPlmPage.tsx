import React from 'react';
import ProductPageTemplate from '@/components/templates/ProductPageTemplate';
import {
  Package,
  GitBranch,
  FileSearch,
  Users,
  Shield,
  Workflow,
  Database,
  Globe,
  TrendingUp
} from 'lucide-react';

const ClipPlmPage: React.FC = () => {
  const features = [
    {
      icon: GitBranch,
      title: 'BOM 관리',
      description: '다단계 BOM 구조를 체계적으로 관리하고 실시간으로 변경사항을 추적합니다.'
    },
    {
      icon: Workflow,
      title: '워크플로우 자동화',
      description: '승인 프로세스를 자동화하여 업무 효율성을 극대화합니다.'
    },
    {
      icon: FileSearch,
      title: '버전 관리',
      description: '모든 설계 변경사항을 추적하고 이력을 관리합니다.'
    },
    {
      icon: Database,
      title: 'CAD 통합',
      description: 'AutoCAD, SOLIDWORKS 등 주요 CAD와 완벽하게 통합됩니다.'
    },
    {
      icon: Users,
      title: '협업 도구',
      description: '실시간 커뮤니케이션과 문서 공유로 팀 협업을 강화합니다.'
    },
    {
      icon: Shield,
      title: '보안 관리',
      description: '역할 기반 접근 제어와 데이터 암호화로 정보를 보호합니다.'
    }
  ];

  const benefits = [
    {
      title: '개발 기간 단축',
      description: '제품 개발 프로세스를 표준화하여 출시 시간을 단축합니다.',
      metric: '30% 단축'
    },
    {
      title: '품질 향상',
      description: '설계 오류를 사전에 방지하고 품질을 향상시킵니다.',
      metric: '50% 감소'
    },
    {
      title: '비용 절감',
      description: '재작업과 오류를 줄여 전체 비용을 절감합니다.',
      metric: '40% 절감'
    },
    {
      title: '생산성 향상',
      description: '자동화된 프로세스로 엔지니어의 생산성을 향상시킵니다.',
      metric: '45% 향상'
    },
    {
      title: '협업 강화',
      description: '부서 간 실시간 협업으로 커뮤니케이션을 개선합니다.',
      metric: '60% 개선'
    },
    {
      title: '규정 준수',
      description: '산업 표준과 규정을 준수하여 컴플라이언스를 보장합니다.',
      metric: '100% 준수'
    }
  ];

  const specifications = [
    {
      category: '지원 플랫폼',
      items: ['Windows Server 2019+', 'Linux (RHEL 8+)', 'Cloud (AWS, Azure)', 'On-Premise', 'Hybrid Cloud']
    },
    {
      category: '시스템 요구사항',
      items: ['CPU: 8 Core 이상', 'RAM: 32GB 이상', 'Storage: 500GB SSD', 'Database: Oracle/MS SQL', 'Web Server: IIS/Apache']
    },
    {
      category: '통합 가능 시스템',
      items: ['ERP (SAP, Oracle)', 'CAD (AutoCAD, SOLIDWORKS)', 'Office 365', 'Active Directory', 'REST API 지원']
    },
    {
      category: '보안 기능',
      items: ['SSL/TLS 암호화', 'SSO 지원', '2FA 인증', 'IP 접근 제어', '감사 로그']
    },
    {
      category: '지원 언어',
      items: ['한국어', '영어', '중국어', '일본어', '독일어']
    },
    {
      category: '라이선스',
      items: ['Named User', 'Concurrent User', 'Enterprise', 'Cloud Subscription', 'Perpetual']
    }
  ];

  const relatedProducts = [
    {
      name: 'CLIP DDMS',
      href: '/clip-ddms',
      description: '도면 관리를 위한 완벽한 솔루션'
    },
    {
      name: 'CLIP EPL',
      href: '/clip-epl',
      description: '전자 부품 라이브러리 관리'
    },
    {
      name: 'CLIP PMS',
      href: '/clip-pms',
      description: '프로젝트 관리 및 추적'
    }
  ];

  const testimonial = {
    quote: 'CLIP PLM 도입 후 제품 개발 기간이 30% 단축되고, 설계 오류가 50% 감소했습니다. 부서 간 협업이 획기적으로 개선되어 전체적인 생산성이 크게 향상되었습니다.',
    author: '김철수 이사',
    company: '삼성전자 PLM 운영팀',
    rating: 5
  };

  return (
    <ProductPageTemplate
      name="CLIP PLM"
      tagline="제품 라이프사이클 관리의 새로운 기준"
      description="제품 기획부터 폐기까지 전 과정을 디지털로 통합 관리하는 차세대 PLM 솔루션입니다. 30년의 노하우가 집약된 CLIP PLM으로 제조 혁신을 실현하세요."
      metaDescription="CLIP PLM - 제품 라이프사이클 관리 통합 솔루션. BOM 관리, 워크플로우 자동화, CAD 통합 등 강력한 기능으로 제조 혁신을 지원합니다."
      features={features}
      benefits={benefits}
      specifications={specifications}
      relatedProducts={relatedProducts}
      testimonial={testimonial}
    />
  );
};

export default ClipPlmPage;