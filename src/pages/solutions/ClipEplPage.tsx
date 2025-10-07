import React from 'react';
import ProductPageTemplate from '@/components/templates/ProductPageTemplate';
import {
  Database,
  Package,
  Search,
  BarChart,
  Link,
  Shield,
  FileSpreadsheet,
  Globe,
  Zap
} from 'lucide-react';

const ClipEplPage: React.FC = () => {
  const features = [
    {
      icon: Database,
      title: '부품 데이터베이스',
      description: '수백만 개의 전자 부품 정보를 체계적으로 관리합니다.'
    },
    {
      icon: Link,
      title: 'BOM 연동',
      description: 'PLM과 완벽하게 연동하여 BOM을 자동으로 생성합니다.'
    },
    {
      icon: Package,
      title: '재고 관리',
      description: '실시간 재고 현황을 추적하고 자동 발주를 지원합니다.'
    },
    {
      icon: Search,
      title: '파라미터 검색',
      description: '상세 스펙으로 최적의 부품을 빠르게 검색합니다.'
    },
    {
      icon: FileSpreadsheet,
      title: '대체품 관리',
      description: '호환 가능한 대체 부품을 자동으로 제안합니다.'
    },
    {
      icon: BarChart,
      title: '가격 분석',
      description: '공급업체별 가격을 비교하고 최적 구매를 지원합니다.'
    }
  ];

  const benefits = [
    {
      title: '부품 선정 시간 단축',
      description: '방대한 DB와 파라미터 검색으로 부품 선정을 가속화합니다.',
      metric: '70% 단축'
    },
    {
      title: '구매 비용 절감',
      description: '최적 공급업체 선정과 대량 구매로 비용을 절감합니다.',
      metric: '25% 절감'
    },
    {
      title: '재고 최적화',
      description: '적정 재고 유지로 운영 자금을 효율화합니다.',
      metric: '40% 감소'
    },
    {
      title: '품질 향상',
      description: '검증된 부품 사용으로 제품 품질을 향상시킵니다.',
      metric: '30% 개선'
    },
    {
      title: '컴플라이언스',
      description: 'RoHS, REACH 등 환경 규제를 완벽 준수합니다.',
      metric: '100% 준수'
    },
    {
      title: '공급망 안정성',
      description: '다중 공급업체 관리로 공급망 리스크를 최소화합니다.',
      metric: '90% 안정성'
    }
  ];

  const specifications = [
    {
      category: '부품 데이터',
      items: ['1000만+ 부품 DB', '실시간 업데이트', '3D 모델 지원', 'Datasheet 링크', 'PCN/EOL 알림']
    },
    {
      category: '지원 형식',
      items: ['Excel Import/Export', 'CSV, XML', 'API 연동', 'CAD 라이브러리', 'PDF Datasheet']
    },
    {
      category: '통합 시스템',
      items: ['ERP (SAP, Oracle)', 'PLM 시스템', 'CAD (Altium, Cadence)', 'SCM 시스템', '구매 시스템']
    },
    {
      category: '공급업체',
      items: ['DigiKey', 'Mouser', 'Arrow', 'Avnet', '국내 대리점']
    },
    {
      category: '규제 준수',
      items: ['RoHS 3', 'REACH SVHC', 'Conflict Minerals', 'WEEE', 'China RoHS']
    },
    {
      category: '분석 기능',
      items: ['수명 주기 분석', '가격 트렌드', '리드타임 예측', '리스크 평가', '대체품 추천']
    }
  ];

  const relatedProducts = [
    {
      name: 'CLIP PLM',
      href: '/clip-plm',
      description: 'BOM 데이터 완벽 연동'
    },
    {
      name: 'CLIP PMS',
      href: '/clip-pms',
      description: '프로젝트별 부품 관리'
    },
    {
      name: 'CLIP ICMS',
      href: '/clip-icms',
      description: '기술 문서 통합 관리'
    }
  ];

  const testimonial = {
    quote: 'CLIP EPL 도입 후 부품 선정 시간이 70% 단축되고, 구매 비용이 25% 절감되었습니다. 특히 EOL 알림 기능으로 생산 차질을 사전에 방지할 수 있게 되었습니다.',
    author: '이준호 상무',
    company: 'LG전자 구매팀',
    rating: 5
  };

  return (
    <ProductPageTemplate
      name="CLIP EPL"
      tagline="전자 부품 라이브러리의 완벽한 관리"
      description="수백만 개의 전자 부품 데이터를 체계적으로 관리하고 최적의 부품을 선정하는 전문 부품 관리 시스템입니다."
      metaDescription="CLIP EPL - 전자 부품 라이브러리 관리 시스템. 부품 DB, BOM 연동, 재고 관리, 규제 준수까지 통합 관리합니다."
      features={features}
      benefits={benefits}
      specifications={specifications}
      relatedProducts={relatedProducts}
      testimonial={testimonial}
    />
  );
};

export default ClipEplPage;