import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

// Layout components
import MainLayout from '@/layouts/MainLayout';
import AdminLayout from '@/layouts/AdminLayout';

// Lazy load pages for better performance
const HomePage = lazy(() => import('@/pages/HomePage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

// Solution Pages
const SolutionsPage = lazy(() => import('@/pages/solutions/SolutionsPage'));
const ClipPlmPage = lazy(() => import('@/pages/solutions/ClipPlmPage'));
const ClipDdmsPage = lazy(() => import('@/pages/solutions/ClipDdmsPage'));
const ClipEplPage = lazy(() => import('@/pages/solutions/ClipEplPage'));
const ClipPmsPage = lazy(() => import('@/pages/solutions/ClipPMSPage'));
const ClipIcmsPage = lazy(() => import('@/pages/solutions/ClipICMSPage'));
const CadwinAiPage = lazy(() => import('@/pages/solutions/CADWinAIPage'));

// Company Pages
const AboutPage = lazy(() => import('@/pages/company/AboutPage'));
const ContactPage = lazy(() => import('@/pages/company/ContactPage'));
const CustomersPage = lazy(() => import('@/pages/company/CustomersPage'));
const CaseStudiesPage = lazy(() => import('@/pages/company/CaseStudiesPage'));
const BlogPage = lazy(() => import('@/pages/company/BlogPage'));
const CareersPage = lazy(() => import('@/pages/company/CareersPage'));

// Resource Pages
const DocsPage = lazy(() => import('@/pages/resources/DocsPage'));
const PricingPage = lazy(() => import('@/pages/resources/PricingPage'));
const GuidesPage = lazy(() => import('@/pages/resources/GuidesPage'));
const DemoPage = lazy(() => import('@/pages/resources/DemoPage'));
const TrialPage = lazy(() => import('@/pages/resources/TrialPage'));

// Admin Pages
const AdminLoginPage = lazy(() => import('@/pages/auth/SimpleLoginPage'));
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'));
const AdminHeroEditor = lazy(() => import('@/pages/admin/AdminHeroEditor'));
const AdminBodyEditor = lazy(() => import('@/pages/admin/AdminBodyEditor'));
const AdminSettings = lazy(() => import('@/pages/admin/AdminSettings'));
const AdminNavigation = lazy(() => import('@/pages/admin/SimpleAdminNavigation'));

// Auth Pages
const LoginPage = lazy(() => import('@/pages/auth/SimpleLoginPage'));
const SignupPage = lazy(() => import('@/pages/auth/SignupPage'));

// Legal Pages
const PrivacyPage = lazy(() => import('@/pages/legal/PrivacyPage'));
const TermsPage = lazy(() => import('@/pages/legal/TermsPage'));
const SitemapPage = lazy(() => import('@/pages/legal/SitemapPage'));

// Utility Pages
const ServerErrorPage = lazy(() => import('@/pages/utility/ServerErrorPage'));
const MaintenancePage = lazy(() => import('@/pages/utility/MaintenancePage'));

// Feature Pages
const PlmWorkflowPage = lazy(() => import('@/pages/solutions/PlmWorkflowPage'));
const ChangeManagementPage = lazy(() => import('@/pages/features/ChangeManagementPage'));

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingSpinner fullScreen />}>
      <Routes>
        {/* Main Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/homepage" element={<Navigate to="/" replace />} />

          {/* Solution Routes */}
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/clip-plm" element={<ClipPlmPage />} />
          <Route path="/clip-ddms" element={<ClipDdmsPage />} />
          <Route path="/clip-epl" element={<ClipEplPage />} />
          <Route path="/clip-pms" element={<ClipPmsPage />} />
          <Route path="/clip-icms" element={<ClipIcmsPage />} />
          <Route path="/cadwin-ai" element={<CadwinAiPage />} />

          {/* Company Routes */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/careers" element={<CareersPage />} />

          {/* Resource Routes */}
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/guides" element={<GuidesPage />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/trial" element={<TrialPage />} />

          {/* Feature Routes */}
          <Route path="/plm-workflow" element={<PlmWorkflowPage />} />
          <Route path="/features/change-management" element={<ChangeManagementPage />} />

          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Legal Routes */}
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/sitemap" element={<SitemapPage />} />

          {/* Utility Routes */}
          <Route path="/500" element={<ServerErrorPage />} />
          <Route path="/maintenance" element={<MaintenancePage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="hero" element={<AdminHeroEditor />} />
          <Route path="body" element={<AdminBodyEditor />} />
          <Route path="navigation" element={<AdminNavigation />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
