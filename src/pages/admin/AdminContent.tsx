import React, { useEffect, useMemo, useState } from 'react';
import {
  Plus,
  RefreshCcw,
  Search,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Save,
  Filter
} from 'lucide-react';
import { useAdminContentStore, AdminContentItem, ContentTypeOption } from '@/stores/adminContentStore';

const SECTION_OPTIONS = [
  { value: 'home-hero', label: '홈페이지 · 히어로 섹션' },
  { value: 'home-about', label: '홈페이지 · 회사 소개' },
  { value: 'home-main-video', label: '홈페이지 · 메인 영상' },
  { value: 'home-call-to-action', label: '홈페이지 · 주요 CTA' },
  { value: 'home-testimonials', label: '홈페이지 · 고객 후기' },
  { value: 'home-integrations', label: '홈페이지 · 통합 기능' },
  { value: 'header-main', label: '헤더 · 메인 영역 텍스트' },
  { value: 'about-overview', label: 'About · 개요' },
  { value: 'about-history', label: 'About · 연혁' },
  { value: 'case-study-summary', label: 'Case Study · 요약' }
];

const CONTENT_TYPE_OPTIONS: { value: ContentTypeOption; label: string }[] = [
  { value: 'HERO_BANNER', label: 'Hero 배너 문구' },
  { value: 'HERO_HEADING', label: 'Hero 제목' },
  { value: 'HERO_SUBHEADING', label: 'Hero 부제목' },
  { value: 'HERO_CTA', label: 'Hero CTA 버튼' },
  { value: 'HERO_VIDEO', label: 'Hero 영상 URL' },
  { value: 'ANNOUNCEMENT', label: '공지 배너' },
  { value: 'FEATURE_SECTION', label: '제품/기능 섹션' },
  { value: 'FEATURE_TAB', label: '상세 특징 (탭)' },
  { value: 'AI_FEATURE', label: 'AI 특징' },
  { value: 'CTA_SECTION', label: 'Call To Action' },
  { value: 'TESTIMONIAL', label: '고객 후기' },
  { value: 'COMPANY_LOGO', label: '로고/파트너' },
  { value: 'FOOTER_CONTENT', label: '푸터 텍스트' },
  { value: 'INTEGRATION_BENEFIT', label: '연동 이점' },
  { value: 'CUSTOM', label: '커스텀' }
];

const AdminContent: React.FC = () => {
  const {
    items,
    isLoading,
    error,
    filters,
    pagination,
    selectedItem,
    loadContent,
    setFilters,
    setPage,
    setPageSize,
    setSelectedItem,
    createContent,
    updateContent,
    deleteContent,
    togglePublish,
    reorderSection
  } = useAdminContentStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formState, setFormState] = useState<Partial<AdminContentItem>>({
    sectionIdentifier: filters.sectionIdentifier || 'home-hero',
    contentType: 'HERO_HEADING',
    languageCode: filters.languageCode || 'ko',
    displayOrder: 0,
    isPublished: true
  });

  useEffect(() => {
    loadContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedItem) {
      setFormState(selectedItem);
    }
  }, [selectedItem]);

  const safeItems = Array.isArray(items) ? items : [];

  const filteredItems = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return safeItems;
    return safeItems.filter((item) =>
      [item.title, item.sectionIdentifier, item.content]
        .join(' ')
        .toLowerCase()
        .includes(term)
    );
  }, [safeItems, searchTerm]);

  const openCreateModal = () => {
    setSelectedItem(null);
    setFormState({
      sectionIdentifier: filters.sectionIdentifier || 'home-hero',
      contentType: 'HERO_HEADING',
      languageCode: filters.languageCode || 'ko',
      displayOrder: safeItems.length,
      isPublished: true
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: AdminContentItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleFormChange = (field: keyof AdminContentItem, value: unknown) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const payload = {
      ...formState,
      title: formState.title?.trim() || '',
      sectionIdentifier: formState.sectionIdentifier?.trim() || '',
      languageCode: formState.languageCode?.trim() || 'ko',
      displayOrder: Number(formState.displayOrder ?? 0),
      isPublished: !!formState.isPublished
    };

    if (!payload.title || !payload.sectionIdentifier || !payload.contentType) {
      alert('제목, 섹션, 유형은 필수입니다.');
      return;
    }

    try {
      if (selectedItem) {
        await updateContent(selectedItem.id, payload);
      } else {
        await createContent(payload);
      }
      closeModal();
    } catch (error) {
      console.error('Failed to save content', error);
    }
  };

  const handleMove = async (itemId: number, direction: 'up' | 'down') => {
    const section = filters.sectionIdentifier;
    if (!section) return;

    const sectionItems = items
      .filter((item) => item.sectionIdentifier === section)
      .sort((a, b) => a.displayOrder - b.displayOrder);

    const currentIndex = sectionItems.findIndex((item) => item.id === itemId);
    if (currentIndex === -1) return;

    const swapIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (swapIndex < 0 || swapIndex >= sectionItems.length) return;

    const newOrder = [...sectionItems];
    [newOrder[currentIndex], newOrder[swapIndex]] = [newOrder[swapIndex], newOrder[currentIndex]];

    try {
      await reorderSection(section, newOrder.map((item) => item.id));
    } catch (error) {
      console.error('Failed to reorder content', error);
    }
  };

  const activeSectionLabel = SECTION_OPTIONS.find((option) => option.value === filters.sectionIdentifier)?.label;

  return (
    <div className="px-6 py-8 space-y-6">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">콘텐츠 관리</h1>
          <p className="text-slate-400 text-sm">
            홈페이지 히어로, 소개, 영상, 메뉴 텍스트 등 주요 섹션을 실시간으로 수정하고 배포하세요.
          </p>
          {activeSectionLabel && (
            <p className="text-xs text-slate-500 mt-1">현재 섹션: {activeSectionLabel}</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => loadContent()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 transition-colors"
          >
            <RefreshCcw className="w-4 h-4" /> 새로고침
          </button>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg shadow-md"
          >
            <Plus className="w-4 h-4" /> 새 콘텐츠
          </button>
        </div>
      </header>

      <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <label className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-slate-400 uppercase">섹션</span>
            <select
              value={filters.sectionIdentifier || ''}
              onChange={(event) => setFilters({ sectionIdentifier: event.target.value })}
              className="w-full rounded-lg border border-slate-700 bg-slate-800/70 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
            >
              {SECTION_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-slate-400 uppercase">콘텐츠 유형</span>
            <select
              value={filters.contentType || ''}
              onChange={(event) => setFilters({ contentType: event.target.value as ContentTypeOption })}
              className="w-full rounded-lg border border-slate-700 bg-slate-800/70 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="">모든 유형</option>
              {CONTENT_TYPE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-slate-400 uppercase">언어</span>
            <select
              value={filters.languageCode || 'ko'}
              onChange={(event) => setFilters({ languageCode: event.target.value })}
              className="w-full rounded-lg border border-slate-700 bg-slate-800/70 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="ko">한국어 (ko)</option>
              <option value="en">영어 (en)</option>
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-slate-400 uppercase">게시 상태</span>
            <select
              value={filters.isPublished === '' || typeof filters.isPublished === 'undefined' ? '' : String(filters.isPublished)}
              onChange={(event) => {
                const value = event.target.value;
                setFilters({ isPublished: value === '' ? '' : value === 'true' });
              }}
              className="w-full rounded-lg border border-slate-700 bg-slate-800/70 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="">전체</option>
              <option value="true">게시됨</option>
              <option value="false">비공개</option>
            </select>
          </label>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                type="search"
                placeholder="제목, 설명으로 검색"
                className="pl-10 pr-4 py-2 rounded-lg border border-slate-700 bg-slate-800/70 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none w-full md:w-80"
              />
            </div>
            <div className="inline-flex items-center gap-2 text-xs text-slate-500">
              <Filter className="w-4 h-4" />
              {filteredItems.length}건 표시 중 / 전체 {pagination.total}건
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>페이지 당</span>
            <select
              value={pagination.size}
              onChange={(event) => setPageSize(Number(event.target.value))}
              className="rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-white"
            >
              {[10, 20, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span>개</span>
          </div>
        </div>
      </section>

      <section className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-800 text-sm">
            <thead className="bg-slate-900/80 text-slate-400 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left">순서</th>
                <th className="px-4 py-3 text-left">제목</th>
                <th className="px-4 py-3 text-left">섹션</th>
                <th className="px-4 py-3 text-left">유형</th>
                <th className="px-4 py-3 text-left">상태</th>
                <th className="px-4 py-3 text-left">업데이트</th>
                <th className="px-4 py-3 text-right">작업</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-slate-400">
                    <div className="inline-flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                      <span>콘텐츠를 불러오는 중...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-slate-400">
                    결과가 없습니다. 필터를 조정하거나 새 콘텐츠를 생성해보세요.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3 text-slate-400">
                      <div className="flex items-center gap-1">
                        <span>{item.displayOrder}</span>
                        {filters.sectionIdentifier === item.sectionIdentifier && (
                          <span className="flex items-center gap-1">
                            <button
                              onClick={() => handleMove(item.id, 'up')}
                              className="p-1 text-slate-500 hover:text-white"
                              title="위로 이동"
                            >
                              <ArrowUp className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleMove(item.id, 'down')}
                              className="p-1 text-slate-500 hover:text-white"
                              title="아래로 이동"
                            >
                              <ArrowDown className="w-3 h-3" />
                            </button>
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-white">
                      <div className="font-medium line-clamp-1">{item.title}</div>
                      {item.content && (
                        <p className="text-xs text-slate-500 line-clamp-1">{item.content}</p>
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-400">{item.sectionIdentifier}</td>
                    <td className="px-4 py-3 text-slate-400">{item.contentType}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => togglePublish(item.id)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold border transition-colors ${
                          item.isPublished
                            ? 'border-green-500/40 bg-green-500/10 text-green-300'
                            : 'border-slate-600 bg-slate-800 text-slate-400'
                        }`}
                      >
                        {item.isPublished ? (
                          <>
                            <Eye className="w-3 h-3" /> 게시됨
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3" /> 비공개
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-slate-400">
                      {item.updatedAt ? new Date(item.updatedAt).toLocaleString() : '-'}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(item)}
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-700 px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:border-slate-500"
                        >
                          <Edit3 className="w-3 h-3" /> 편집
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('이 콘텐츠를 삭제하시겠습니까?')) {
                              deleteContent(item.id).catch((error) => console.error(error));
                            }
                          }}
                          className="inline-flex items-center gap-1 rounded-lg border border-red-600/50 px-3 py-1.5 text-xs text-red-400 hover:text-red-200 hover:border-red-400"
                        >
                          <Trash2 className="w-3 h-3" /> 삭제
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {filteredItems.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-800 text-xs text-slate-400">
            <span>
              {pagination.page + 1} / {Math.max(pagination.totalPages, 1)} 페이지 · 총 {pagination.total} 건
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={pagination.page === 0}
                onClick={() => setPage(Math.max(pagination.page - 1, 0))}
                className="rounded border border-slate-700 px-2 py-1 disabled:opacity-40"
              >
                이전
              </button>
              <button
                disabled={pagination.page + 1 >= pagination.totalPages}
                onClick={() => setPage(pagination.page + 1)}
                className="rounded border border-slate-700 px-2 py-1 disabled:opacity-40"
              >
                다음
              </button>
            </div>
          </div>
        )}
      </section>

      {error && (
        <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-3xl rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {selectedItem ? '콘텐츠 편집' : '새 콘텐츠 생성'}
                </h2>
                <p className="text-xs text-slate-500">히어로, 소개, 영상 등 홈페이지 섹션을 자유롭게 업데이트하세요.</p>
              </div>
              <button
                onClick={closeModal}
                className="text-slate-500 hover:text-white"
                aria-label="닫기"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase">섹션</span>
                  <select
                    value={formState.sectionIdentifier || ''}
                    onChange={(event) => handleFormChange('sectionIdentifier', event.target.value)}
                    className="rounded-lg border border-slate-700 bg-slate-800/70 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                    required
                  >
                    {SECTION_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase">콘텐츠 유형</span>
                  <select
                    value={formState.contentType || 'HERO_HEADING'}
                    onChange={(event) => handleFormChange('contentType', event.target.value as ContentTypeOption)}
                    className="rounded-lg border border-slate-700 bg-slate-800/70 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                    required
                  >
                    {CONTENT_TYPE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase">제목</span>
                  <input
                    value={formState.title || ''}
                    onChange={(event) => handleFormChange('title', event.target.value)}
                    type="text"
                    className="rounded-lg border border-slate-700 bg-slate-800/70 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                    placeholder="예: People and People Solution Networks"
                    required
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase">언어 코드</span>
                  <select
                    value={formState.languageCode || 'ko'}
                    onChange={(event) => handleFormChange('languageCode', event.target.value)}
                    className="rounded-lg border border-slate-700 bg-slate-800/70 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="ko">한국어 (ko)</option>
                    <option value="en">영어 (en)</option>
                  </select>
                </label>

                <label className="flex flex-col gap-2 md:col-span-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase">본문/스크립트</span>
                  <textarea
                    value={formState.content || ''}
                    onChange={(event) => handleFormChange('content', event.target.value)}
                    rows={4}
                    className="rounded-lg border border-slate-700 bg-slate-800/70 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                    placeholder="섹션 소개 문장이나 영상 스크립트 내용을 입력하세요."
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase">영상 URL</span>
                  <input
                    value={formState.videoUrl || ''}
                    onChange={(event) => handleFormChange('videoUrl', event.target.value)}
                    type="url"
                    className="rounded-lg border border-slate-700 bg-slate-800/70 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                    placeholder="https://..."
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase">이미지 URL</span>
                  <input
                    value={formState.imageUrl || ''}
                    onChange={(event) => handleFormChange('imageUrl', event.target.value)}
                    type="url"
                    className="rounded-lg border border-slate-700 bg-slate-800/70 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                    placeholder="https://..."
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase">CTA 텍스트</span>
                  <input
                    value={formState.ctaText || ''}
                    onChange={(event) => handleFormChange('ctaText', event.target.value)}
                    type="text"
                    className="rounded-lg border border-slate-700 bg-slate-800/70 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                    placeholder="예: 지금 문의하기"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase">CTA 링크</span>
                  <input
                    value={formState.ctaHref || ''}
                    onChange={(event) => handleFormChange('ctaHref', event.target.value)}
                    type="text"
                    className="rounded-lg border border-slate-700 bg-slate-800/70 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                    placeholder="/contact"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase">정렬 순서</span>
                  <input
                    value={formState.displayOrder ?? 0}
                    onChange={(event) => handleFormChange('displayOrder', Number(event.target.value))}
                    type="number"
                    min={0}
                    className="rounded-lg border border-slate-700 bg-slate-800/70 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase">게시 여부</span>
                  <select
                    value={String(formState.isPublished ?? true)}
                    onChange={(event) => handleFormChange('isPublished', event.target.value === 'true')}
                    className="rounded-lg border border-slate-700 bg-slate-800/70 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="true">게시</option>
                    <option value="false">비공개</option>
                  </select>
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase">CSS Class</span>
                  <input
                    value={formState.cssClass || ''}
                    onChange={(event) => handleFormChange('cssClass', event.target.value)}
                    type="text"
                    className="rounded-lg border border-slate-700 bg-slate-800/70 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                    placeholder="예: text-electric"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase">아이콘 Class</span>
                  <input
                    value={formState.iconClass || ''}
                    onChange={(event) => handleFormChange('iconClass', event.target.value)}
                    type="text"
                    className="rounded-lg border border-slate-700 bg-slate-800/70 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                    placeholder="예: lucide-bolt"
                  />
                </label>

                <label className="flex flex-col gap-2 md:col-span-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase">메타데이터 (JSON)</span>
                  <textarea
                    value={formState.metadata || ''}
                    onChange={(event) => handleFormChange('metadata', event.target.value)}
                    rows={3}
                    className="rounded-lg border border-slate-700 bg-slate-800/70 px-3 py-2 text-sm font-mono text-white focus:border-blue-500 focus:outline-none"
                    placeholder='{"align":"center"}'
                  />
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:text-white hover:border-slate-500"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
                >
                  <Save className="w-4 h-4" /> 저장
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContent;
