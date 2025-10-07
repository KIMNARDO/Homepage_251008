import React, { useState, useEffect } from 'react';
import { adminContent } from '@/services/simpleApi';
import { Save, Plus, Trash2 } from 'lucide-react';

interface Section {
  id: string;
  title: string;
  content: string;
  isPublished: boolean;
}

const SimpleAdminContent: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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
      setSections([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await adminContent.updateSections(sections);
      setMessage('저장되었습니다!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Failed to save sections:', error);
      setMessage('저장 실패');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    const newSection = {
      id: `section-${Date.now()}`,
      title: '새 섹션',
      content: '내용을 입력하세요',
      isPublished: false
    };

    try {
      await adminContent.addSection(newSection);
      await loadSections();
    } catch (error) {
      console.error('Failed to add section:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await adminContent.deleteSection(id);
      await loadSections();
    } catch (error) {
      console.error('Failed to delete section:', error);
    }
  };

  const updateSection = (id: string, field: keyof Section, value: any) => {
    setSections(sections.map(s =>
      s.id === id ? { ...s, [field]: value } : s
    ));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">콘텐츠 관리</h1>
          <div className="flex gap-4">
            {message && (
              <span className="text-green-400">{message}</span>
            )}
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              새 섹션
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 rounded hover:bg-green-700 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              저장
            </button>
          </div>
        </div>

        {loading && <div className="text-center py-8">로딩 중...</div>}

        {!loading && (
          <div className="space-y-4">
            {sections.map((section) => (
              <div key={section.id} className="bg-slate-800 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => updateSection(section.id, 'title', e.target.value)}
                    className="text-xl font-semibold bg-transparent border-b border-slate-600 focus:border-blue-500 outline-none"
                  />
                  <button
                    onClick={() => handleDelete(section.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <textarea
                  value={section.content}
                  onChange={(e) => updateSection(section.id, 'content', e.target.value)}
                  className="w-full p-3 bg-slate-700 rounded resize-none h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="mt-4 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`published-${section.id}`}
                    checked={section.isPublished}
                    onChange={(e) => updateSection(section.id, 'isPublished', e.target.checked)}
                    className="w-4 h-4"
                  />
                  <label htmlFor={`published-${section.id}`}>
                    게시됨
                  </label>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && sections.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            섹션이 없습니다. 새 섹션을 추가하세요.
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleAdminContent;