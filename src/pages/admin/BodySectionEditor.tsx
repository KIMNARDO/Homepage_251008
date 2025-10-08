import React, { useState, useEffect } from 'react';
import { adminContent } from '@/services/simpleApi';
import { Save, Eye, Sparkles, Plus, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BodySection {
  id: string;
  type: 'showcase' | 'features' | 'content';
  title: string;
  subtitle?: string;
  description?: string;
  features?: string[];
  media?: any[];
  isPublished: boolean;
  order: number;
}

const BodySectionEditor: React.FC = () => {
  const [sections, setSections] = useState<BodySection[]>([]);
  const [currentSection, setCurrentSection] = useState<BodySection | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // AI State
  const [showAI, setShowAI] = useState(false);
  const [aiProvider, setAiProvider] = useState<'openai' | 'claude' | 'gemini'>('claude');
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    loadSections();
  }, []);

  const loadSections = async () => {
    try {
      setLoading(true);
      const { data } = await adminContent.getSections();
      setSections(data || []);

      // 첫 번째 섹션 자동 선택
      if (data && data.length > 0 && !currentSection) {
        setCurrentSection(data[0]);
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

      // 기존 섹션 업데이트
      const updatedSections = sections.map(s =>
        s.id === currentSection.id ? { ...currentSection, updatedAt: new Date().toISOString() } : s
      );

      await adminContent.updateSections(updatedSections);

      setSections(updatedSections);
      showMessage('success', '✅ 저장되었습니다!');

      // 홈페이지 동기화 - 히어로 섹션과 동일한 패턴
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('sectionsUpdated', {
          detail: updatedSections.filter(s => s.isPublished)
        }));
      }, 500);
    } catch (error: any) {
      console.error('Failed to save section:', error);
      showMessage('error', '❌ 저장 실패: ' + (error.message || '알 수 없는 오류'));
    } finally {
      setSaving(false);
    }
  };

  const createNewSection = async () => {
    try {
      const newSection = {
        type: 'showcase' as const,
        title: '새 섹션',
        subtitle: '',
        description: '',
        features: [''],
        media: [],
        isPublished: false,
        order: sections.length
      };

      const response = await adminContent.addSection(newSection);

      const createdSection = response.data.data;
      setSections([...sections, createdSection]);
      setCurrentSection(createdSection);
      showMessage('success', '새 섹션이 추가되었습니다');
    } catch (error) {
      showMessage('error', '섹션 추가 실패');
    }
  };

  const deleteSection = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      await adminContent.deleteSection(id);

      const newSections = sections.filter(s => s.id !== id);
      setSections(newSections);
      setCurrentSection(newSections[0] || null);
      showMessage('success', '삭제되었습니다');

      // 홈페이지 동기화
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('sectionsUpdated', {
          detail: newSections.filter(s => s.isPublished)
        }));
      }, 500);
    } catch (error) {
      showMessage('error', '삭제 실패');
    }
  };

  const generateAIContent = async () => {
    if (!aiPrompt.trim() || !currentSection) return;

    try {
      setIsGenerating(true);
      // AI 기능은 axios 직접 사용 (simpleApi에 아직 정의되지 않음)
      const token = localStorage.getItem('token');
      const axios = (await import('axios')).default;
      const response = await axios.post(
        'http://localhost:8080/api/admin/ai/generate-text',
        {
          provider: aiProvider,
          prompt: aiPrompt,
          sectionType: currentSection.type,
          options: { maxTokens: 1500, temperature: 0.8 }
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.structuredData) {
        const { title, subtitle, description, features } = response.data.structuredData;
        setCurrentSection({
          ...currentSection,
          title: title || currentSection.title,
          subtitle: subtitle || currentSection.subtitle,
          description: description || currentSection.description,
          features: features || currentSection.features
        });
        showMessage('success', 'AI 콘텐츠가 생성되었습니다!');
        setShowAI(false);
      }
    } catch (error: any) {
      showMessage('error', 'AI 생성 실패: ' + (error.response?.data?.error || error.message));
    } finally {
      setIsGenerating(false);
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const updateField = (field: keyof BodySection, value: any) => {
    if (!currentSection) return;
    setCurrentSection({ ...currentSection, [field]: value });
  };

  const addFeature = () => {
    if (!currentSection) return;
    setCurrentSection({
      ...currentSection,
      features: [...(currentSection.features || []), '']
    });
  };

  const updateFeature = (index: number, value: string) => {
    if (!currentSection) return;
    const newFeatures = [...(currentSection.features || [])];
    newFeatures[index] = value;
    setCurrentSection({ ...currentSection, features: newFeatures });
  };

  const removeFeature = (index: number) => {
    if (!currentSection) return;
    setCurrentSection({
      ...currentSection,
      features: currentSection.features?.filter((_, i) => i !== index)
    });
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
              바디 섹션 편집
            </h1>
            <p className="text-gray-400 mt-2">홈페이지 본문 섹션을 관리하세요</p>
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
              onClick={createNewSection}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              새 섹션
            </button>

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

        {/* 섹션 선택기 */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setCurrentSection(section)}
              className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                currentSection?.id === section.id
                  ? 'bg-electric-600 text-white'
                  : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
              }`}
            >
              {section.title}
              {!section.isPublished && (
                <span className="ml-2 text-xs opacity-50">(비공개)</span>
              )}
            </button>
          ))}
        </div>

        {currentSection && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 편집 폼 */}
            <div className="space-y-6">
              {/* 섹션 타입 */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  섹션 타입
                </label>
                <select
                  value={currentSection.type}
                  onChange={(e) => updateField('type', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg focus:border-electric-500 focus:ring-2 focus:ring-electric-500/20 outline-none transition-all"
                >
                  <option value="showcase">Showcase - 제품/서비스 강조</option>
                  <option value="features">Features - 기능 그리드</option>
                  <option value="content">Content - 자유 형식</option>
                </select>
              </div>

              {/* AI 콘텐츠 생성 */}
              <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
                <button
                  onClick={() => setShowAI(!showAI)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    <span className="font-medium">AI로 콘텐츠 생성</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 transition-transform ${showAI ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {showAI && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-4 space-y-3"
                    >
                      <div className="flex gap-2">
                        {['claude', 'openai', 'gemini'].map((provider) => (
                          <button
                            key={provider}
                            onClick={() => setAiProvider(provider as any)}
                            className={`px-3 py-1 rounded text-sm ${
                              aiProvider === provider
                                ? 'bg-purple-600 text-white'
                                : 'bg-slate-700 text-gray-400'
                            }`}
                          >
                            {provider === 'claude' ? '🤖 Claude' : provider === 'openai' ? '💚 GPT-4' : '🔷 Gemini'}
                          </button>
                        ))}
                      </div>

                      <textarea
                        value={aiPrompt}
                        onChange={(e) => setAiPrompt(e.target.value)}
                        placeholder="AI에게 어떤 콘텐츠를 생성할지 설명하세요..."
                        rows={3}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg focus:border-purple-500 outline-none resize-none"
                      />

                      <button
                        onClick={generateAIContent}
                        disabled={isGenerating || !aiPrompt.trim()}
                        className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 transition-all"
                      >
                        {isGenerating ? '생성 중...' : '✨ AI로 생성'}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 제목 */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                <label className="block text-sm font-medium text-gray-300 mb-2">제목</label>
                <input
                  type="text"
                  value={currentSection.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg focus:border-electric-500 focus:ring-2 focus:ring-electric-500/20 outline-none transition-all text-lg"
                />
              </div>

              {/* 부제목 */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                <label className="block text-sm font-medium text-gray-300 mb-2">부제목</label>
                <input
                  type="text"
                  value={currentSection.subtitle || ''}
                  onChange={(e) => updateField('subtitle', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg focus:border-electric-500 outline-none transition-all"
                />
              </div>

              {/* 설명 */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                <label className="block text-sm font-medium text-gray-300 mb-2">설명</label>
                <textarea
                  value={currentSection.description || ''}
                  onChange={(e) => updateField('description', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg focus:border-electric-500 outline-none transition-all resize-none"
                />
              </div>

              {/* 특징 (Showcase/Features 타입만) */}
              {(currentSection.type === 'showcase' || currentSection.type === 'features') && (
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-gray-300">주요 특징</label>
                    <button
                      onClick={addFeature}
                      className="text-sm text-electric-400 hover:text-electric-300 flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      추가
                    </button>
                  </div>

                  <div className="space-y-2">
                    {currentSection.features?.map((feature, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => updateFeature(index, e.target.value)}
                          placeholder={`특징 ${index + 1}`}
                          className="flex-1 px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg focus:border-electric-500 outline-none"
                        />
                        {(currentSection.features?.length || 0) > 1 && (
                          <button
                            onClick={() => removeFeature(index)}
                            className="p-2 text-red-400 hover:text-red-300"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 게시 상태 & 삭제 */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={currentSection.isPublished}
                      onChange={(e) => updateField('isPublished', e.target.checked)}
                      className="w-5 h-5 rounded border-slate-600 text-electric-600 focus:ring-electric-500"
                    />
                    <span className="text-sm font-medium">홈페이지에 게시</span>
                  </label>

                  <button
                    onClick={() => deleteSection(currentSection.id)}
                    className="px-4 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors"
                  >
                    섹션 삭제
                  </button>
                </div>
              </div>
            </div>

            {/* 실시간 미리보기 */}
            <div className="lg:sticky lg:top-6 h-fit">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  실시간 미리보기
                </h3>

                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-8 min-h-[400px]">
                  {currentSection ? (
                    <motion.div
                      key={currentSection.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {/* 타입 배지 */}
                      <span className="inline-block px-3 py-1 bg-electric-500/20 text-electric-400 rounded-full text-xs font-medium mb-4">
                        {currentSection.type?.toUpperCase() || 'SHOWCASE'}
                      </span>

                      {/* 제목 */}
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-electric-400 to-purple-400 bg-clip-text text-transparent mb-3">
                        {currentSection.title || '제목을 입력하세요'}
                      </h2>

                      {/* 부제목 */}
                      {currentSection.subtitle && (
                        <p className="text-lg text-gray-400 mb-4">{currentSection.subtitle}</p>
                      )}

                      {/* 설명 */}
                      {currentSection.description && (
                        <p className="text-gray-300 mb-6">{currentSection.description}</p>
                      )}

                      {/* 특징 */}
                      {currentSection.features && currentSection.features.length > 0 && (
                        <div className="space-y-2">
                          {currentSection.features.map((feature, index) => (
                            feature && (
                              <div key={index} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-electric-400 rounded-full" />
                                <span className="text-gray-300">{feature}</span>
                              </div>
                            )
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-gray-500">섹션을 선택하거나 새로 만들어주세요</p>
                    </div>
                  )}
                </div>

                <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <p className="text-sm text-blue-400">
                    💡 <strong>Tip:</strong> 저장하면 홈페이지에 자동으로 반영됩니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BodySectionEditor;
