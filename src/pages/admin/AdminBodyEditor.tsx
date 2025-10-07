import React, { useState, useEffect } from 'react';
import { adminContent } from '@/services/simpleApi';
import { Save, Plus, Edit, Trash2, Eye, X, Image as ImageIcon, MoveUp, MoveDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BodySection {
  id: string;
  title: string;
  content: string;
  isPublished: boolean;
  order?: number;
  imageUrl?: string;
  createdAt?: string;
}

const AdminBodyEditor: React.FC = () => {
  const [sections, setSections] = useState<BodySection[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingSection, setEditingSection] = useState<BodySection | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const emptySection: BodySection = {
    id: '',
    title: '',
    content: '',
    isPublished: true,
    imageUrl: ''
  };

  useEffect(() => {
    loadSections();
  }, []);

  const loadSections = async () => {
    try {
      setLoading(true);
      const { data } = await adminContent.getSections();
      setSections(data || []);
    } catch (error) {
      console.error('Failed to load sections:', error);
      showMessage('error', '데이터 로드 실패');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editingSection) return;

    try {
      setSaving(true);

      let imageUrl = editingSection.imageUrl;
      if (imageFile) {
        imageUrl = imagePreview;
      }

      const sectionToSave = { ...editingSection, imageUrl };

      if (isCreating) {
        await adminContent.addSection(sectionToSave);
        showMessage('success', '✅ 섹션이 생성되었습니다!');
      } else {
        const updatedSections = sections.map(s =>
          s.id === sectionToSave.id ? sectionToSave : s
        );
        await adminContent.updateSections(updatedSections);
        showMessage('success', '✅ 섹션이 수정되었습니다!');
      }

      await loadSections();
      closeEditor();
    } catch (error: any) {
      console.error('Failed to save section:', error);
      showMessage('error', '❌ 저장 실패: ' + (error.message || '알 수 없는 오류'));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 이 섹션을 삭제하시겠습니까?')) return;

    try {
      await adminContent.deleteSection(id);
      showMessage('success', '✅ 섹션이 삭제되었습니다!');
      await loadSections();
    } catch (error: any) {
      console.error('Failed to delete section:', error);
      showMessage('error', '❌ 삭제 실패: ' + (error.message || '알 수 없는 오류'));
    }
  };

  const handleMoveUp = async (index: number) => {
    if (index === 0) return;
    const newSections = [...sections];
    [newSections[index - 1], newSections[index]] = [newSections[index], newSections[index - 1]];
    setSections(newSections);
    try {
      await adminContent.updateSections(newSections);
      showMessage('success', '✅ 순서가 변경되었습니다!');
    } catch (error) {
      showMessage('error', '❌ 순서 변경 실패');
      await loadSections();
    }
  };

  const handleMoveDown = async (index: number) => {
    if (index === sections.length - 1) return;
    const newSections = [...sections];
    [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
    setSections(newSections);
    try {
      await adminContent.updateSections(newSections);
      showMessage('success', '✅ 순서가 변경되었습니다!');
    } catch (error) {
      showMessage('error', '❌ 순서 변경 실패');
      await loadSections();
    }
  };

  const openEditor = (section?: BodySection) => {
    if (section) {
      setEditingSection(section);
      setImagePreview(section.imageUrl || '');
      setIsCreating(false);
    } else {
      setEditingSection({ ...emptySection, id: Date.now().toString() });
      setImagePreview('');
      setIsCreating(true);
    }
    setImageFile(null);
  };

  const closeEditor = () => {
    setEditingSection(null);
    setIsCreating(false);
    setImageFile(null);
    setImagePreview('');
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
        showMessage('error', '이미지 또는 비디오 파일만 업로드 가능합니다.');
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        showMessage('error', '파일 크기는 10MB 이하여야 합니다.');
        return;
      }

      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview('');
    if (editingSection) {
      setEditingSection({ ...editingSection, imageUrl: '' });
    }
  };

  const updateField = (field: keyof BodySection, value: any) => {
    if (editingSection) {
      setEditingSection({ ...editingSection, [field]: value });
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
              바디 섹션 관리
            </h1>
            <p className="text-gray-400 mt-2">페이지 본문 섹션을 추가, 수정, 삭제하세요</p>
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
              onClick={() => openEditor()}
              className="flex items-center gap-2 px-6 py-3 bg-electric-600 rounded-lg hover:bg-electric-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              새 섹션 추가
            </button>
          </div>
        </div>

        {/* 섹션 리스트 */}
        <div className="space-y-4 mb-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold">{section.title}</h3>
                    {!section.isPublished && (
                      <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded">
                        비공개
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 line-clamp-2">{section.content}</p>
                  {section.imageUrl && (
                    <div className="mt-3">
                      <img
                        src={section.imageUrl}
                        alt={section.title}
                        className="w-32 h-20 object-cover rounded"
                      />
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0}
                    className="p-2 bg-slate-700 rounded hover:bg-slate-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    title="위로 이동"
                  >
                    <MoveUp className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleMoveDown(index)}
                    disabled={index === sections.length - 1}
                    className="p-2 bg-slate-700 rounded hover:bg-slate-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    title="아래로 이동"
                  >
                    <MoveDown className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => openEditor(section)}
                    className="p-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors"
                    title="수정"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(section.id)}
                    className="p-2 bg-red-600 rounded hover:bg-red-700 transition-colors"
                    title="삭제"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          {sections.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <p className="text-lg">등록된 섹션이 없습니다.</p>
              <p className="text-sm mt-2">"새 섹션 추가" 버튼을 클릭하여 섹션을 추가하세요.</p>
            </div>
          )}
        </div>

        {/* 편집 모달 */}
        <AnimatePresence>
          {editingSection && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              onClick={closeEditor}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-slate-800 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">
                    {isCreating ? '새 섹션 추가' : '섹션 수정'}
                  </h2>
                  <button
                    onClick={closeEditor}
                    className="p-2 hover:bg-slate-700 rounded transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* 제목 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      제목
                    </label>
                    <input
                      type="text"
                      value={editingSection.title}
                      onChange={(e) => updateField('title', e.target.value)}
                      placeholder="섹션 제목을 입력하세요"
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg focus:border-electric-500 focus:ring-2 focus:ring-electric-500/20 outline-none transition-all"
                    />
                  </div>

                  {/* 내용 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      내용
                    </label>
                    <textarea
                      value={editingSection.content}
                      onChange={(e) => updateField('content', e.target.value)}
                      placeholder="섹션 내용을 입력하세요"
                      rows={6}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg focus:border-electric-500 focus:ring-2 focus:ring-electric-500/20 outline-none transition-all resize-none"
                    />
                  </div>

                  {/* 이미지/비디오 업로드 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      이미지/비디오 (선택사항)
                    </label>

                    {imagePreview ? (
                      <div className="relative">
                        {imagePreview.startsWith('data:video') ? (
                          <video
                            src={imagePreview}
                            className="w-full h-48 object-cover rounded-lg"
                            controls
                          />
                        ) : (
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        )}
                        <button
                          onClick={handleRemoveImage}
                          className="absolute top-2 right-2 p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-600 rounded-lg cursor-pointer hover:border-electric-500 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <ImageIcon className="w-12 h-12 mb-3 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-400">
                            <span className="font-semibold">클릭하여 업로드</span> 또는 드래그 앤 드롭
                          </p>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF, MP4 (최대 10MB)</p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*,video/*"
                          onChange={handleImageSelect}
                        />
                      </label>
                    )}
                  </div>

                  {/* 공개 여부 */}
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="isPublished"
                      checked={editingSection.isPublished}
                      onChange={(e) => updateField('isPublished', e.target.checked)}
                      className="w-5 h-5 rounded border-slate-600 bg-slate-900 text-electric-600 focus:ring-electric-500"
                    />
                    <label htmlFor="isPublished" className="text-sm text-gray-300 cursor-pointer">
                      이 섹션을 공개합니다
                    </label>
                  </div>

                  {/* 버튼 */}
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleSave}
                      disabled={saving || !editingSection.title || !editingSection.content}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-electric-600 rounded-lg hover:bg-electric-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Save className="w-4 h-4" />
                      {saving ? '저장 중...' : '저장'}
                    </button>

                    <button
                      onClick={closeEditor}
                      className="px-6 py-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                    >
                      취소
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminBodyEditor;
