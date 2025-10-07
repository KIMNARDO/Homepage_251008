import { Helmet } from 'react-helmet-async';
import AppRoutes from '@/routes/AppRoutes';

// Utils
import { COMPANY_INFO } from '@/data/papsnet';

function App() {
  return (
    <>
      <Helmet>
        <title>{COMPANY_INFO.nameEn} - PLM 솔루션으로 스마트 팩토리를 구현하세요</title>
        <meta name="description" content={COMPANY_INFO.description} />
        <meta name="keywords" content="PLM, PDM, DDMS, EPL, PMS, ICMS, CAD, AutoCAD, 도면관리, 제품라이프사이클, 스마트팩토리" />
        <meta name="author" content={COMPANY_INFO.nameEn} />
        <link rel="canonical" href="https://www.papsnet.net" />
      </Helmet>

      <AppRoutes />
    </>
  );
}

export default App;