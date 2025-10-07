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
  Save
} from 'lucide-react';
import {
  useAdminNavigationStore,
  NavigationItem,
  NavigationType
} from '@/stores/adminNavigationStore';

const NAVIGATION_LABEL: Record<NavigationType, string> = {
  MAIN: '메인 메뉴',
  FOOTER: '푸터 메뉴',
  CTA: 'CTA 버튼'
};

const AdminNavigation: React.FC = () => {
  const {
    items,
    isLoading,
    error,
    filters,
    pagination,
    selectedItem,
    loadNavigation,
    setFilters,
    setPage,
    setPageSize,
    setSelectedItem,
    createItem,
    updateItem,
    deleteItem,
    togglePublish,
    reorder
  } = useAdminNavigationStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formState, setFormState] = useState<Partial<NavigationItem>>({
    navigationType: filters.navigationType || 'MAIN',
    text: '',
    href: '',
    displayOrder: 0,
    isExternal: false,
    isPublished: true,
    languageCode: filters.languageCode || 'ko'
  });

  useEffect(() => {
    loadNavigation();
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
      `${item.text} ${item.href}`.toLowerCase().includes(term)
    );
  }, [safeItems, searchTerm]);

  const openCreateModal = () => {
    setSelectedItem(null);
    setFormState({
      navigationType: filters.navigationType || 'MAIN',
      text: '',
      href: '',
      displayOrder: safeItems.length,
      isExternal: false,
      isPublished: true,
      languageCode: filters.languageCode || 'ko'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: NavigationItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleFormChange = (field: keyof NavigationItem, value: unknown) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const payload = {
      ...formState,
      text: formState.text?.trim() || '',
      href: formState.href?.trim() || '',
      navigationType: formState.navigationType || 'MAIN',
      displayOrder: Number(formState.displayOrder ?? 0),
      isExternal: Boolean(formState.isExternal),
      isPublished: Boolean(formState.isPublished)
    };

    if (!payload.text || !payload.href) {
      alert('메뉴 이름과 링크는 필수입니다.');
      return;
    }

    try {
      if (selectedItem) {
        await updateItem(selectedItem.id, payload);
      } else {
        await createItem(payload);
      }
      closeModal();
    } catch (error) {
      console.error('Failed to save navigation item', error);
    }
  };

  const handleMove = async (id: number, direction: 'up' | 'down') => {
    const sectionItems = safeItems
      .filter((item) => item.navigationType === (filters.navigationType || 'MAIN'))
      .sort((a, b) => a.displayOrder - b.displayOrder);

    const currentIndex = sectionItems.findIndex((item) => item.id === id);
    if (currentIndex === -1) return;

    const swapIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (swapIndex < 0 || swapIndex >= sectionItems.length) return;

    const newOrder = [...sectionItems];
    [newOrder[currentIndex], newOrder[swapIndex]] = [newOrder[swapIndex], newOrder[currentIndex]];

    try {
      await reorder(newOrder.map((item) => item.id));
    } catch (error) {
      console.error('Failed to reorder navigation', error);
    }
  };

  return (
    <div className="px-6 py-8 space-y-6">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">네비게이션 관리</h1>
          <p className="text-slate-400 text-sm">
            헤더/사이드 메뉴, CTA 버튼을 편집하고 정렬하세요. 홈페이지 변경을 즉시 반영할 수 있습니다.
          </p>
          {filters.navigationType && (
            <p className="text-xs text-slate-500 mt-1">현재 편집 중: {NAVIGATION_LABEL[filters.navigationType]}</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => loadNavigation()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 transition"
          >
            <RefreshCcw className="w-4 h-4" /> 새로고침
          </button>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg shadow-md"
          >
            <Plus className="w-4 h-4" /> 새 메뉴
          </button>
        </div>
      </header>

      <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <label className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-slate-400 uppercase">메뉴 유형</span>
            <select
              value={filters.navigationType || 'MAIN'}
              onChange={(event) => setFilters({ navigationType: event.target.value as NavigationType })}
              className="w-full rounded-lg border border-slate-700 bg-slate-800/70 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="MAIN">메인 메뉴</option>
              <option value="FOOTER">푸터 메뉴</option>
              <option value="CTA">CTA 버튼</option>
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

          <div className="sm:col-span-2 flex flex-col gap-2">
            <span className="text-xs font-semibold text-slate-400 uppercase">검색</span>
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  type="search"
                  placeholder="메뉴 이름 또는 링크"
                  className="w-full rounded-lg border border-slate-700 bg-slate-800/70 px-3 py-2 pl-10 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>총 {pagination.total}건 · {pagination.page + 1}/{Math.max(pagination.totalPages, 1)} 페이지</span>
          <div className="flex items-center gap-2">
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
          </div>
        </div>
      </section>

      <section className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-800 text-sm">
            <thead className="bg-slate-900/80 text-slate-400 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left">순서</th>
                <th className="px-4 py-3 text-left">메뉴명</th>
                <th className="px-4 py-3 text-left">링크</th>
                <th className="px-4 py-3 text-left">상태</th>
                <th className="px-4 py-3 text-left">타겟</th>
                <th className="px-4 py-3 text-left">언어</th>
                <th className="px-4 py-3 text-right">작업</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-slate-400">
                    <div className="inline-flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                      <span>네비게이션 데이터를 불러오는 중...</span>
                    </div>
                  </td>
                </tr>
              ) : !filteredItems || filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-slate-400">
                    결과가 없습니다. 필터를 변경하거나 새 메뉴를 추가하세요.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3 text-slate-400">
                      <div className="flex items-center gap-1">
                        <span>{item.displayOrder}</span>
                        {filters.navigationType === item.navigationType && (
                          <span className="flex items-center gap-1">
                            <button
                              onClick={() => handleMove(item.id, 'up')}
                              className="p-1 text-slate-500 hover:text-white"
                              title="위로"
                            >
                              <ArrowUp className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleMove(item.id, 'down')}
                              className="p-1 text-slate-500 hover:text-white"
                              title="아래로"
                            >
                              <ArrowDown className="w-3 h-3" />
                            </button>
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-white">
                      <div className="font-medium">{item.text}</div>
                      {item.description && (
                        <p className="text-xs text-slate-500 line-clamp-1">{item.description}</p>
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-300">
                      {item.href}
                      {item.isExternal && <span className="ml-2 rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-400">외부</span>}
                    </td>
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
                    <td className="px-4 py-3 text-slate-400">{item.target || '-'}</td>
                    <td className="px-4 py-3 text-slate-400">{item.languageCode || 'ko'}</td>
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
                            if (confirm('이 메뉴를 삭제하시겠습니까?')) {
                              deleteItem(item.id).catch((error) => console.error(error));
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
              {pagination.page + 1} / {Math.max(pagination.totalPages, 1)} 페이지
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
          <div className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {selectedItem ? '메뉴 편집' : '새 메뉴 생성'}
                </h2>
                <p className="text-xs text-slate-500">헤더/사이드/푸터 메뉴를 생성하거나 편집하세요.</p>
              </div>
              <button onClick={closeModal} className="text-slate-500 hover:text-white" aria-label="닫기">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase">메뉴 유형</span>
                  <select
                    value={formState.navigationType || 'MAIN'}
                    onChange={(event) => handleFormChange('navigationType', event.target.value as NavigationType)}
                    className="rounded-lg border border-slate-700 bg-slate-800/70 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="MAIN">메인 메뉴</option>
                    <option value="FOOTER">푸터 메뉴</option>
                    <option value="CTA">CTA 버튼</option>
                  </select>
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase">언어</span>
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
                  <span className="text-xs font-semibold text-slate-400 uppercase">메뉴 제목</span>
                  <input
                    value={formState.text || ''}
                    onChange={(event) => handleFormChange('text', event.target.value)}
                    type="text"
                    className="rounded-lg border border-slate-700 bg-slate-800/70 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                    placeholder="예: 솔루션"
                    required
                  />
                </label>

                <label className="flex flex-col gap-2 md:col-span-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase">링크</span>
                  <input
                    value={formState.href || ''}
                    onChange={(event) => handleFormChange('href', event.target.value)}
                    type="text"
                    className="rounded-lg border border-slate-700 bg-slate-800/70 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                    placeholder="예: /solutions"
                    required
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
                  <span className="text-xs font-semibold text-slate-400 uppercase">Target</span>
                  <input
                    value={formState.target || ''}
                    onChange={(event) => handleFormChange('target', event.target.value)}
                    type="text"
                    className="rounded-lg border border-slate-700 bg-slate-800/70 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                    placeholder="예: _blank"
                  />
                </label>

                <label className="flex flex-col gap-2 md:col-span-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase">설명</span>
                  <textarea
                    value={formState.description || ''}
                    onChange={(event) => handleFormChange('description', event.target.value)}
                    rows={3}
                    className="rounded-lg border border-slate-700 bg-slate-800/70 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                    placeholder="메뉴에 대한 부가 설명"
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

                <label className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase">뱃지 텍스트</span>
                  <input
                    value={formState.badgeText || ''}
                    onChange={(event) => handleFormChange('badgeText', event.target.value)}
                    type="text"
                    className="rounded-lg border border-slate-700 bg-slate-800/70 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                    placeholder="예: NEW"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase">외부 링크 여부</span>
                  <select
                    value={String(formState.isExternal ?? false)}
                    onChange={(event) => handleFormChange('isExternal', event.target.value === 'true')}
                    className="rounded-lg border border-slate-700 bg-slate-800/70 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="false">내부 링크</option>
                    <option value="true">외부 링크</option>
                  </select>
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

export default AdminNavigation;
