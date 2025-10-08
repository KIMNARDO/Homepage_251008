import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Eye, Sparkles, Plus, X, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

interface SectionContent {
  [key: string]: any;
}

interface Section {
  id: string;
  type: 'hero' | 'stats' | 'social-proof' | 'ai-features' | 'features' | 'integration' | 'cta';
  isPublished: boolean;
  order: number;
  createdAt: string;
  content: SectionContent;
}

const AllSectionsEditor: React.FC = () => {
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

      const response = await fetch('http://localhost:8080/api/admin/all-sections', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(sections)
      });

      if (!response.ok) throw new Error('저장 실패');

      showMessage('success', '✅ 저장되었습니다!');

      // 홈페이지 동기화
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('allSectionsUpdated', {
          detail: sections.filter(s => s.isPublished)
        }));
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
      target = target[keys[i]];
    }
    target[keys[keys.length - 1]] = value;

    setCurrentSection(newSection);
    setSections(sections.map(s => s.id === newSection.id ? newSection : s));
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

  const renderEditor = () => {
    if (!currentSection) return null;

    switch (currentSection.type) {
      case 'hero':
        return renderHeroEditor();
      case 'stats':
        return renderStatsEditor();
      case 'social-proof':
        return renderSocialProofEditor();
      case 'ai-features':
        return renderAIFeaturesEditor();
      case 'features':
        return renderFeaturesEditor();
      case 'integration':
        return renderIntegrationEditor();
      case 'cta':
        return renderCTAEditor();
      default:
        return <div>알 수 없는 섹션 타입</div>;
    }
  };

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
    </div>
  );

  const renderStatsEditor = () => {
    const stats = currentSection?.content?.stats || [];

    return (
      <div className="space-y-4">
        <EditorField
          label="헤딩"
          value={currentSection?.content?.heading || ''}
          onChange={(v) => updateField('content.heading', v)}
        />

        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-300">통계 항목</label>
          {stats.map((stat: any, index: number) => (
            <div key={index} className="bg-slate-900 p-4 rounded-lg space-y-2">
              <input
                type="text"
                value={stat.label || ''}
                onChange={(e) => {
                  const newStats = [...stats];
                  newStats[index] = { ...stat, label: e.target.value };
                  updateField('content.stats', newStats);
                }}
                placeholder="레이블"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white"
              />
              <input
                type="text"
                value={stat.value || ''}
                onChange={(e) => {
                  const newStats = [...stats];
                  newStats[index] = { ...stat, value: e.target.value };
                  updateField('content.stats', newStats);
                }}
                placeholder="값 (예: 500+)"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white"
              />
              <input
                type="text"
                value={stat.description || ''}
                onChange={(e) => {
                  const newStats = [...stats];
                  newStats[index] = { ...stat, description: e.target.value };
                  updateField('content.stats', newStats);
                }}
                placeholder="설명"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white"
              />
              <input
                type="text"
                value={stat.icon || ''}
                onChange={(e) => {
                  const newStats = [...stats];
                  newStats[index] = { ...stat, icon: e.target.value };
                  updateField('content.stats', newStats);
                }}
                placeholder="아이콘 (이모지)"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSocialProofEditor = () => {
    const testimonials = currentSection?.content?.testimonials || [];

    return (
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
        />

        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-300">고객 후기</label>
          {testimonials.map((testimonial: any, index: number) => (
            <div key={index} className="bg-slate-900 p-4 rounded-lg space-y-2">
              <input
                type="text"
                value={testimonial.name || ''}
                onChange={(e) => {
                  const newTestimonials = [...testimonials];
                  newTestimonials[index] = { ...testimonial, name: e.target.value };
                  updateField('content.testimonials', newTestimonials);
                }}
                placeholder="이름"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white"
              />
              <input
                type="text"
                value={testimonial.company || ''}
                onChange={(e) => {
                  const newTestimonials = [...testimonials];
                  newTestimonials[index] = { ...testimonial, company: e.target.value };
                  updateField('content.testimonials', newTestimonials);
                }}
                placeholder="회사"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white"
              />
              <input
                type="text"
                value={testimonial.position || ''}
                onChange={(e) => {
                  const newTestimonials = [...testimonials];
                  newTestimonials[index] = { ...testimonial, position: e.target.value };
                  updateField('content.testimonials', newTestimonials);
                }}
                placeholder="직책"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white"
              />
              <textarea
                value={testimonial.content || ''}
                onChange={(e) => {
                  const newTestimonials = [...testimonials];
                  newTestimonials[index] = { ...testimonial, content: e.target.value };
                  updateField('content.testimonials', newTestimonials);
                }}
                placeholder="후기 내용"
                rows={2}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white resize-none"
              />
              <input
                type="number"
                value={testimonial.rating || 5}
                onChange={(e) => {
                  const newTestimonials = [...testimonials];
                  newTestimonials[index] = { ...testimonial, rating: parseInt(e.target.value) };
                  updateField('content.testimonials', newTestimonials);
                }}
                min="1"
                max="5"
                placeholder="별점 (1-5)"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderAIFeaturesEditor = () => {
    const features = currentSection?.content?.features || [];

    return (
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
        />

        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-300">AI 기능</label>
          {features.map((feature: any, index: number) => (
            <div key={index} className="bg-slate-900 p-4 rounded-lg space-y-2">
              <input
                type="text"
                value={feature.title || ''}
                onChange={(e) => {
                  const newFeatures = [...features];
                  newFeatures[index] = { ...feature, title: e.target.value };
                  updateField('content.features', newFeatures);
                }}
                placeholder="기능 제목"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white"
              />
              <textarea
                value={feature.description || ''}
                onChange={(e) => {
                  const newFeatures = [...features];
                  newFeatures[index] = { ...feature, description: e.target.value };
                  updateField('content.features', newFeatures);
                }}
                placeholder="기능 설명"
                rows={2}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white resize-none"
              />
              <input
                type="text"
                value={feature.icon || ''}
                onChange={(e) => {
                  const newFeatures = [...features];
                  newFeatures[index] = { ...feature, icon: e.target.value };
                  updateField('content.features', newFeatures);
                }}
                placeholder="아이콘 (이모지)"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white"
              />
              <input
                type="text"
                value={feature.badge || ''}
                onChange={(e) => {
                  const newFeatures = [...features];
                  newFeatures[index] = { ...feature, badge: e.target.value };
                  updateField('content.features', newFeatures);
                }}
                placeholder="배지 (예: NEW, HOT)"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderFeaturesEditor = () => {
    const features = currentSection?.content?.features || [];

    return (
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
        />

        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-300">주요 기능</label>
          {features.map((feature: any, index: number) => (
            <div key={index} className="bg-slate-900 p-4 rounded-lg space-y-2">
              <input
                type="text"
                value={feature.title || ''}
                onChange={(e) => {
                  const newFeatures = [...features];
                  newFeatures[index] = { ...feature, title: e.target.value };
                  updateField('content.features', newFeatures);
                }}
                placeholder="기능 제목"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white"
              />
              <textarea
                value={feature.description || ''}
                onChange={(e) => {
                  const newFeatures = [...features];
                  newFeatures[index] = { ...feature, description: e.target.value };
                  updateField('content.features', newFeatures);
                }}
                placeholder="기능 설명"
                rows={2}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white resize-none"
              />
              <input
                type="text"
                value={feature.icon || ''}
                onChange={(e) => {
                  const newFeatures = [...features];
                  newFeatures[index] = { ...feature, icon: e.target.value };
                  updateField('content.features', newFeatures);
                }}
                placeholder="아이콘 (이모지)"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderIntegrationEditor = () => {
    const integrations = currentSection?.content?.integrations || [];

    return (
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
        />

        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-300">연동 시스템</label>
          {integrations.map((integration: any, index: number) => (
            <div key={index} className="bg-slate-900 p-4 rounded-lg space-y-2">
              <input
                type="text"
                value={integration.name || ''}
                onChange={(e) => {
                  const newIntegrations = [...integrations];
                  newIntegrations[index] = { ...integration, name: e.target.value };
                  updateField('content.integrations', newIntegrations);
                }}
                placeholder="시스템 이름"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white"
              />
              <input
                type="text"
                value={integration.description || ''}
                onChange={(e) => {
                  const newIntegrations = [...integrations];
                  newIntegrations[index] = { ...integration, description: e.target.value };
                  updateField('content.integrations', newIntegrations);
                }}
                placeholder="설명"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white"
              />
              <input
                type="text"
                value={integration.category || ''}
                onChange={(e) => {
                  const newIntegrations = [...integrations];
                  newIntegrations[index] = { ...integration, category: e.target.value };
                  updateField('content.integrations', newIntegrations);
                }}
                placeholder="카테고리"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white"
              />
              <input
                type="text"
                value={integration.logo || ''}
                onChange={(e) => {
                  const newIntegrations = [...integrations];
                  newIntegrations[index] = { ...integration, logo: e.target.value };
                  updateField('content.integrations', newIntegrations);
                }}
                placeholder="로고 URL"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

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

      <EditorField
        label="배경 이미지 URL"
        value={currentSection?.content?.backgroundImage || ''}
        onChange={(v) => updateField('content.backgroundImage', v)}
      />
    </div>
  );

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
              전체 섹션 편집
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

                {renderEditor()}
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
                  <div className="text-gray-400 text-sm">
                    {currentSection.type} 섹션의 미리보기는 홈페이지에서 확인하세요.
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
    'ai-features': 'AI 기능',
    'features': '주요 기능',
    'integration': '시스템 연동',
    'cta': 'CTA 버튼',
  };
  return names[type] || type;
};

export default AllSectionsEditor;
