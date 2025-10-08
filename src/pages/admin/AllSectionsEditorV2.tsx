import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Eye, Sparkles, Plus, X, Trash2, ChevronDown, ChevronUp, Upload, Image as ImageIcon } from 'lucide-react';
import IntegratedMediaManager from '@/components/admin/IntegratedMediaManager';

interface SectionContent {
  [key: string]: any;
}

interface Section {
  id: string;
  type: 'hero' | 'stats' | 'social-proof' | 'products' | 'ai-features' | 'features' | 'integration' | 'cta';
  isPublished: boolean;
  order: number;
  createdAt: string;
  content: SectionContent;
}

const AllSectionsEditorV2: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [currentSection, setCurrentSection] = useState<Section | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadSections();
  }, []);

  const loadSections = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/admin/all-sections', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('섹션 로드 실패');

      const data = await response.json();
      const sortedSections = (data || []).sort((a: Section, b: Section) => a.order - b.order);
      setSections(sortedSections);

      if (sortedSections.length > 0 && !currentSection) {
        setCurrentSection(sortedSections[0]);
      }
    } catch (error) {
      console.error('Failed to load sections:', error);
      showMessage('error', '섹션 로드 실패');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!currentSection) return;

    try {
      setSaving(true);
      const token = localStorage.getItem('token');

      // 1. allSections 저장
      const response = await fetch('http://localhost:8080/api/admin/all-sections', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(sections)
      });

      if (!response.ok) throw new Error('저장 실패');

      // 2. Hero 섹션이 있으면 hero API에도 동기화
      const heroSection = sections.find(s => s.type === 'hero');
      if (heroSection) {
        const heroData = {
          title: heroSection.content?.title || '',
          subtitle: heroSection.content?.subtitle || '',
          ctaText: heroSection.content?.ctaText || '',
          ctaLink: heroSection.content?.ctaLink || '',
          imageUrl: heroSection.content?.backgroundMedia || ''
        };

        await fetch('http://localhost:8080/api/admin/hero', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(heroData)
        });
      }

      showMessage('success', '✅ 저장되었습니다!');

      // 홈페이지 동기화
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('allSectionsUpdated', {
          detail: sections.filter(s => s.isPublished)
        }));
        window.dispatchEvent(new CustomEvent('heroUpdated'));
      }, 500);
    } catch (error: any) {
      console.error('Failed to save sections:', error);
      showMessage('error', '❌ 저장 실패: ' + (error.message || '알 수 없는 오류'));
    } finally {
      setSaving(false);
    }
  };

  const updateField = (path: string, value: any) => {
    if (!currentSection) return;

    const keys = path.split('.');
    const newSection = { ...currentSection };
    let target: any = newSection;

    for (let i = 0; i < keys.length - 1; i++) {
      if (!target[keys[i]]) {
        target[keys[i]] = {};
      }
      target = target[keys[i]];
    }
    target[keys[keys.length - 1]] = value;

    setCurrentSection(newSection);
    setSections(sections.map(s => s.id === newSection.id ? newSection : s));
  };

  const updateArrayItem = (arrayPath: string, index: number, itemPath: string, value: any) => {
    if (!currentSection) return;

    const array = arrayPath.split('.').reduce((obj, key) => obj?.[key], currentSection.content);
    if (!Array.isArray(array)) return;

    const newArray = [...array];
    const keys = itemPath.split('.');
    let target: any = newArray[index];

    for (let i = 0; i < keys.length - 1; i++) {
      if (!target[keys[i]]) {
        target[keys[i]] = {};
      }
      target = target[keys[i]];
    }
    target[keys[keys.length - 1]] = value;

    updateField(arrayPath, newArray);
  };

  const addArrayItem = (arrayPath: string, defaultItem: any) => {
    const array = arrayPath.split('.').reduce((obj, key) => obj?.[key], currentSection?.content) || [];
    updateField(arrayPath, [...array, defaultItem]);
  };

  const removeArrayItem = (arrayPath: string, index: number) => {
    const array = arrayPath.split('.').reduce((obj, key) => obj?.[key], currentSection?.content);
    if (!Array.isArray(array)) return;
    updateField(arrayPath, array.filter((_, i) => i !== index));
  };

  const moveSection = (id: string, direction: 'up' | 'down') => {
    const index = sections.findIndex(s => s.id === id);
    if (index === -1) return;
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === sections.length - 1) return;

    const newSections = [...sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];

    newSections.forEach((section, idx) => {
      section.order = idx;
    });

    setSections(newSections);
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  // === Hero Section Editor ===
  const renderHeroEditor = () => (
    <div className="space-y-4">
      <EditorField
        label="제목"
        value={currentSection?.content?.title || ''}
        onChange={(v) => updateField('content.title', v)}
        placeholder="예: PLM 솔루션의 새로운 기준"
      />
      <EditorField
        label="부제목"
        value={currentSection?.content?.subtitle || ''}
        onChange={(v) => updateField('content.subtitle', v)}
        textarea
        rows={2}
      />
      <EditorField
        label="CTA 버튼 텍스트"
        value={currentSection?.content?.ctaText || ''}
        onChange={(v) => updateField('content.ctaText', v)}
      />
      <EditorField
        label="CTA 버튼 링크"
        value={currentSection?.content?.ctaLink || ''}
        onChange={(v) => updateField('content.ctaLink', v)}
      />

      <IntegratedMediaManager
        currentMedia={currentSection?.content?.backgroundMedia || ''}
        onMediaSelected={(url) => updateField('content.backgroundMedia', url)}
        label="배경 이미지/영상"
      />
    </div>
  );

  // === Stats Section Editor ===
  const renderStatsEditor = () => {
    const stats = currentSection?.content?.stats || [];

    return (
      <div className="space-y-4">
        <EditorField
          label="섹션 제목"
          value={currentSection?.content?.title || ''}
          onChange={(v) => updateField('content.title', v)}
          placeholder="예: 숫자로 보는 PAPSNET"
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">통계 항목</label>
            <button
              onClick={() => addArrayItem('content.stats', { value: '0', label: '새 항목', suffix: '+' })}
              className="flex items-center gap-2 px-3 py-1 bg-electric-600 rounded-lg text-sm hover:bg-electric-700"
            >
              <Plus className="w-4 h-4" />
              항목 추가
            </button>
          </div>

          {stats.map((stat: any, index: number) => (
            <div key={index} className="p-4 bg-slate-900 rounded-lg border border-slate-600 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-400">항목 #{index + 1}</span>
                <button
                  onClick={() => removeArrayItem('content.stats', index)}
                  className="p-1 hover:bg-red-500/20 rounded text-red-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  value={stat.value || ''}
                  onChange={(e) => updateArrayItem('content.stats', index, 'value', e.target.value)}
                  placeholder="숫자"
                  className="px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white"
                />
                <input
                  type="text"
                  value={stat.suffix || ''}
                  onChange={(e) => updateArrayItem('content.stats', index, 'suffix', e.target.value)}
                  placeholder="단위 (+, 개, 명 등)"
                  className="px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white"
                />
                <input
                  type="text"
                  value={stat.label || ''}
                  onChange={(e) => updateArrayItem('content.stats', index, 'label', e.target.value)}
                  placeholder="설명"
                  className="px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // === Social Proof Section Editor ===
  const renderSocialProofEditor = () => {
    const testimonials = currentSection?.content?.testimonials || [];

    return (
      <div className="space-y-4">
        <EditorField
          label="섹션 제목"
          value={currentSection?.content?.title || ''}
          onChange={(v) => updateField('content.title', v)}
          placeholder="예: 고객사 후기"
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">후기 목록</label>
            <button
              onClick={() => addArrayItem('content.testimonials', {
                name: '',
                company: '',
                role: '',
                content: '',
                rating: 5,
                avatar: ''
              })}
              className="flex items-center gap-2 px-3 py-1 bg-electric-600 rounded-lg text-sm hover:bg-electric-700"
            >
              <Plus className="w-4 h-4" />
              후기 추가
            </button>
          </div>

          {testimonials.map((testimonial: any, index: number) => (
            <div key={index} className="p-4 bg-slate-900 rounded-lg border border-slate-600 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-400">후기 #{index + 1}</span>
                <button
                  onClick={() => removeArrayItem('content.testimonials', index)}
                  className="p-1 hover:bg-red-500/20 rounded text-red-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={testimonial.name || ''}
                  onChange={(e) => updateArrayItem('content.testimonials', index, 'name', e.target.value)}
                  placeholder="이름"
                  className="px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white"
                />
                <input
                  type="text"
                  value={testimonial.company || ''}
                  onChange={(e) => updateArrayItem('content.testimonials', index, 'company', e.target.value)}
                  placeholder="회사명"
                  className="px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white"
                />
              </div>

              <input
                type="text"
                value={testimonial.role || ''}
                onChange={(e) => updateArrayItem('content.testimonials', index, 'role', e.target.value)}
                placeholder="직책"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white"
              />

              <textarea
                value={testimonial.content || ''}
                onChange={(e) => updateArrayItem('content.testimonials', index, 'content', e.target.value)}
                placeholder="후기 내용"
                rows={3}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white resize-none"
              />

              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-400">평점:</label>
                <select
                  value={testimonial.rating || 5}
                  onChange={(e) => updateArrayItem('content.testimonials', index, 'rating', Number(e.target.value))}
                  className="px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white"
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{'⭐'.repeat(num)}</option>
                  ))}
                </select>
              </div>

              <IntegratedMediaManager
                currentMedia={testimonial.avatar || ''}
                onMediaSelected={(url) => updateArrayItem('content.testimonials', index, 'avatar', url)}
                label="프로필 이미지"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  // === Products Section Editor ===
  const renderProductsEditor = () => {
    const products = currentSection?.content?.products || [];

    return (
      <div className="space-y-4">
        <EditorField
          label="섹션 제목"
          value={currentSection?.content?.title || ''}
          onChange={(v) => updateField('content.title', v)}
          placeholder="예: 제품 라인업"
        />
        <EditorField
          label="섹션 설명"
          value={currentSection?.content?.description || ''}
          onChange={(v) => updateField('content.description', v)}
          textarea
          rows={2}
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">제품 목록</label>
            <button
              onClick={() => addArrayItem('content.products', {
                title: '',
                description: '',
                features: [],
                image: '',
                link: ''
              })}
              className="flex items-center gap-2 px-3 py-1 bg-electric-600 rounded-lg text-sm hover:bg-electric-700"
            >
              <Plus className="w-4 h-4" />
              제품 추가
            </button>
          </div>

          {products.map((product: any, index: number) => (
            <div key={index} className="p-4 bg-slate-900 rounded-lg border border-slate-600 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-400">제품 #{index + 1}</span>
                <button
                  onClick={() => removeArrayItem('content.products', index)}
                  className="p-1 hover:bg-red-500/20 rounded text-red-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <input
                type="text"
                value={product.title || ''}
                onChange={(e) => updateArrayItem('content.products', index, 'title', e.target.value)}
                placeholder="제품명"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white"
              />

              <textarea
                value={product.description || ''}
                onChange={(e) => updateArrayItem('content.products', index, 'description', e.target.value)}
                placeholder="제품 설명"
                rows={2}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white resize-none"
              />

              <input
                type="text"
                value={product.link || ''}
                onChange={(e) => updateArrayItem('content.products', index, 'link', e.target.value)}
                placeholder="제품 링크"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white"
              />

              <IntegratedMediaManager
                currentMedia={product.image || ''}
                onMediaSelected={(url) => updateArrayItem('content.products', index, 'image', url)}
                label="제품 이미지"
              />

              <div>
                <label className="block text-sm text-gray-400 mb-2">주요 기능 (쉼표로 구분)</label>
                <textarea
                  value={(product.features || []).join(', ')}
                  onChange={(e) => updateArrayItem('content.products', index, 'features',
                    e.target.value.split(',').map(f => f.trim()).filter(Boolean)
                  )}
                  placeholder="예: 실시간 협업, 3D 뷰어, 자동화"
                  rows={2}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // === AI Features Section Editor ===
  const renderAIFeaturesEditor = () => {
    const features = currentSection?.content?.features || [];

    return (
      <div className="space-y-4">
        <EditorField
          label="섹션 제목"
          value={currentSection?.content?.title || ''}
          onChange={(v) => updateField('content.title', v)}
          placeholder="예: AI 기반 스마트 기능"
        />
        <EditorField
          label="섹션 설명"
          value={currentSection?.content?.description || ''}
          onChange={(v) => updateField('content.description', v)}
          textarea
          rows={2}
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">AI 기능 목록</label>
            <button
              onClick={() => addArrayItem('content.features', {
                title: '',
                description: '',
                icon: '🤖',
                benefits: []
              })}
              className="flex items-center gap-2 px-3 py-1 bg-electric-600 rounded-lg text-sm hover:bg-electric-700"
            >
              <Plus className="w-4 h-4" />
              기능 추가
            </button>
          </div>

          {features.map((feature: any, index: number) => (
            <div key={index} className="p-4 bg-slate-900 rounded-lg border border-slate-600 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-400">기능 #{index + 1}</span>
                <button
                  onClick={() => removeArrayItem('content.features', index)}
                  className="p-1 hover:bg-red-500/20 rounded text-red-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <input
                  type="text"
                  value={feature.icon || ''}
                  onChange={(e) => updateArrayItem('content.features', index, 'icon', e.target.value)}
                  placeholder="아이콘"
                  className="px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-center"
                />
                <input
                  type="text"
                  value={feature.title || ''}
                  onChange={(e) => updateArrayItem('content.features', index, 'title', e.target.value)}
                  placeholder="기능명"
                  className="col-span-3 px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white"
                />
              </div>

              <textarea
                value={feature.description || ''}
                onChange={(e) => updateArrayItem('content.features', index, 'description', e.target.value)}
                placeholder="기능 설명"
                rows={2}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white resize-none"
              />

              <div>
                <label className="block text-sm text-gray-400 mb-2">장점 (쉼표로 구분)</label>
                <textarea
                  value={(feature.benefits || []).join(', ')}
                  onChange={(e) => updateArrayItem('content.features', index, 'benefits',
                    e.target.value.split(',').map(b => b.trim()).filter(Boolean)
                  )}
                  placeholder="예: 시간 절약, 정확도 향상, 자동화"
                  rows={2}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // === Features Section Editor ===
  const renderFeaturesEditor = () => {
    const features = currentSection?.content?.features || [];

    return (
      <div className="space-y-4">
        <EditorField
          label="섹션 제목"
          value={currentSection?.content?.title || ''}
          onChange={(v) => updateField('content.title', v)}
          placeholder="예: 주요 기능"
        />
        <EditorField
          label="섹션 설명"
          value={currentSection?.content?.description || ''}
          onChange={(v) => updateField('content.description', v)}
          textarea
          rows={2}
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">기능 목록</label>
            <button
              onClick={() => addArrayItem('content.features', {
                title: '',
                description: '',
                icon: '✨',
                image: ''
              })}
              className="flex items-center gap-2 px-3 py-1 bg-electric-600 rounded-lg text-sm hover:bg-electric-700"
            >
              <Plus className="w-4 h-4" />
              기능 추가
            </button>
          </div>

          {features.map((feature: any, index: number) => (
            <div key={index} className="p-4 bg-slate-900 rounded-lg border border-slate-600 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-400">기능 #{index + 1}</span>
                <button
                  onClick={() => removeArrayItem('content.features', index)}
                  className="p-1 hover:bg-red-500/20 rounded text-red-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <input
                  type="text"
                  value={feature.icon || ''}
                  onChange={(e) => updateArrayItem('content.features', index, 'icon', e.target.value)}
                  placeholder="아이콘"
                  className="px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-center"
                />
                <input
                  type="text"
                  value={feature.title || ''}
                  onChange={(e) => updateArrayItem('content.features', index, 'title', e.target.value)}
                  placeholder="기능명"
                  className="col-span-3 px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white"
                />
              </div>

              <textarea
                value={feature.description || ''}
                onChange={(e) => updateArrayItem('content.features', index, 'description', e.target.value)}
                placeholder="기능 설명"
                rows={2}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white resize-none"
              />

              <IntegratedMediaManager
                currentMedia={feature.image || ''}
                onMediaSelected={(url) => updateArrayItem('content.features', index, 'image', url)}
                label="기능 이미지"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  // === Integration Section Editor ===
  const renderIntegrationEditor = () => {
    const integrations = currentSection?.content?.integrations || [];

    return (
      <div className="space-y-4">
        <EditorField
          label="섹션 제목"
          value={currentSection?.content?.title || ''}
          onChange={(v) => updateField('content.title', v)}
          placeholder="예: 시스템 연동"
        />
        <EditorField
          label="섹션 설명"
          value={currentSection?.content?.description || ''}
          onChange={(v) => updateField('content.description', v)}
          textarea
          rows={2}
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">연동 시스템</label>
            <button
              onClick={() => addArrayItem('content.integrations', {
                name: '',
                logo: '',
                description: '',
                category: ''
              })}
              className="flex items-center gap-2 px-3 py-1 bg-electric-600 rounded-lg text-sm hover:bg-electric-700"
            >
              <Plus className="w-4 h-4" />
              시스템 추가
            </button>
          </div>

          {integrations.map((integration: any, index: number) => (
            <div key={index} className="p-4 bg-slate-900 rounded-lg border border-slate-600 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-400">시스템 #{index + 1}</span>
                <button
                  onClick={() => removeArrayItem('content.integrations', index)}
                  className="p-1 hover:bg-red-500/20 rounded text-red-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={integration.name || ''}
                  onChange={(e) => updateArrayItem('content.integrations', index, 'name', e.target.value)}
                  placeholder="시스템명"
                  className="px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white"
                />
                <input
                  type="text"
                  value={integration.category || ''}
                  onChange={(e) => updateArrayItem('content.integrations', index, 'category', e.target.value)}
                  placeholder="카테고리 (ERP, CAD 등)"
                  className="px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white"
                />
              </div>

              <textarea
                value={integration.description || ''}
                onChange={(e) => updateArrayItem('content.integrations', index, 'description', e.target.value)}
                placeholder="연동 설명"
                rows={2}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white resize-none"
              />

              <IntegratedMediaManager
                currentMedia={integration.logo || ''}
                onMediaSelected={(url) => updateArrayItem('content.integrations', index, 'logo', url)}
                label="시스템 로고"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  // === CTA Section Editor ===
  const renderCTAEditor = () => (
    <div className="space-y-4">
      <EditorField
        label="헤딩"
        value={currentSection?.content?.heading || ''}
        onChange={(v) => updateField('content.heading', v)}
      />
      <EditorField
        label="서브헤딩"
        value={currentSection?.content?.subheading || ''}
        onChange={(v) => updateField('content.subheading', v)}
        textarea
        rows={2}
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">주 버튼 텍스트</label>
          <input
            type="text"
            value={currentSection?.content?.primaryButton?.text || ''}
            onChange={(e) => updateField('content.primaryButton.text', e.target.value)}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">주 버튼 링크</label>
          <input
            type="text"
            value={currentSection?.content?.primaryButton?.link || ''}
            onChange={(e) => updateField('content.primaryButton.link', e.target.value)}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">보조 버튼 텍스트</label>
          <input
            type="text"
            value={currentSection?.content?.secondaryButton?.text || ''}
            onChange={(e) => updateField('content.secondaryButton.text', e.target.value)}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">보조 버튼 링크</label>
          <input
            type="text"
            value={currentSection?.content?.secondaryButton?.link || ''}
            onChange={(e) => updateField('content.secondaryButton.link', e.target.value)}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white"
          />
        </div>
      </div>

      <IntegratedMediaManager
        currentMedia={currentSection?.content?.backgroundImage || ''}
        onMediaSelected={(url) => updateField('content.backgroundImage', url)}
        label="배경 이미지"
      />
    </div>
  );

  // Main render function
  const renderEditor = () => {
    if (!currentSection) return null;

    switch (currentSection.type) {
      case 'hero': return renderHeroEditor();
      case 'stats': return renderStatsEditor();
      case 'social-proof': return renderSocialProofEditor();
      case 'products': return renderProductsEditor();
      case 'ai-features': return renderAIFeaturesEditor();
      case 'features': return renderFeaturesEditor();
      case 'integration': return renderIntegrationEditor();
      case 'cta': return renderCTAEditor();
      default:
        return (
          <div className="p-6 bg-slate-800/30 rounded-lg border border-slate-700">
            <p className="text-gray-400 text-sm">알 수 없는 섹션 타입입니다.</p>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-white text-xl">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-electric-400 to-electric-600 bg-clip-text text-transparent">
              전체 섹션 편집 (V2 - 완전판)
            </h1>
            <p className="text-gray-400 mt-2">홈페이지의 모든 섹션을 관리하세요</p>
          </div>

          <div className="flex gap-3">
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`px-4 py-2 rounded-lg ${
                  message.type === 'success'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}
              >
                {message.text}
              </motion.div>
            )}

            <button
              onClick={handleSave}
              disabled={saving || !currentSection}
              className="flex items-center gap-2 px-6 py-3 bg-electric-600 rounded-lg hover:bg-electric-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              {saving ? '저장 중...' : '저장'}
            </button>
          </div>
        </div>

        {/* 섹션 리스트 */}
        <div className="mb-6 bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-300">섹션 목록</h3>
            <span className="text-xs text-gray-500">총 {sections.length}개</span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all whitespace-nowrap ${
                  currentSection?.id === section.id
                    ? 'bg-electric-600 text-white shadow-lg'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                <button
                  onClick={() => setCurrentSection(section)}
                  className="flex-1 text-left"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs opacity-50">#{index + 1}</span>
                    <span className="font-medium">{getSectionTypeName(section.type)}</span>
                    {!section.isPublished && (
                      <span className="text-xs opacity-50">(비공개)</span>
                    )}
                  </div>
                </button>

                <div className="flex gap-1">
                  <button
                    onClick={() => moveSection(section.id, 'up')}
                    disabled={index === 0}
                    className="p-1 hover:bg-white/10 rounded disabled:opacity-30"
                  >
                    <ChevronUp className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => moveSection(section.id, 'down')}
                    disabled={index === sections.length - 1}
                    className="p-1 hover:bg-white/10 rounded disabled:opacity-30"
                  >
                    <ChevronDown className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {currentSection && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 왼쪽: 편집 폼 */}
            <div className="space-y-6">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">{getSectionTypeName(currentSection.type)}</h2>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={currentSection.isPublished}
                      onChange={(e) => updateField('isPublished', e.target.checked)}
                      className="w-5 h-5 rounded border-slate-600 text-electric-600 focus:ring-electric-500"
                    />
                    <span className="text-sm font-medium">게시</span>
                  </label>
                </div>

                <div className="max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
                  {renderEditor()}
                </div>
              </div>
            </div>

            {/* 오른쪽: 미리보기 */}
            <div className="lg:sticky lg:top-6 h-fit">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  실시간 미리보기
                </h3>

                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-8 min-h-[400px]">
                  <div className="text-gray-400 text-sm text-center">
                    <p className="mb-2">"{getSectionTypeName(currentSection.type)}" 섹션</p>
                    <p className="text-xs">미리보기는 홈페이지에서 확인하세요.</p>
                    <p className="text-xs mt-2">
                      {currentSection.isPublished ? '✅ 게시됨' : '⚠️ 비공개'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper Components
const EditorField: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  textarea?: boolean;
  rows?: number;
}> = ({ label, value, onChange, placeholder, textarea, rows = 4 }) => (
  <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
    <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
    {textarea ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg focus:border-electric-500 focus:ring-2 focus:ring-electric-500/20 outline-none transition-all text-white resize-none"
      />
    ) : (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg focus:border-electric-500 focus:ring-2 focus:ring-electric-500/20 outline-none transition-all text-white"
      />
    )}
  </div>
);

// Helper Functions
const getSectionTypeName = (type: string): string => {
  const names: { [key: string]: string } = {
    'hero': '히어로 섹션',
    'stats': '통계 섹션',
    'social-proof': '고객 후기',
    'products': '제품 쇼케이스',
    'ai-features': 'AI 기능',
    'features': '주요 기능',
    'integration': '시스템 연동',
    'cta': 'CTA 버튼',
  };
  return names[type] || type;
};

export default AllSectionsEditorV2;
