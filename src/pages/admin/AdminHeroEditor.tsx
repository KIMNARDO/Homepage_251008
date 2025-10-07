import React, { useState, useEffect } from 'react';
import { adminContent } from '@/services/simpleApi';
import { Save, Upload, Eye, X, Image as ImageIcon, Video as VideoIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroData {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  imageUrl?: string;
}

const AdminHeroEditor: React.FC = () => {
  const [hero, setHero] = useState<HeroData>({
    title: '',
    subtitle: '',
    ctaText: '',
    ctaLink: '',
    imageUrl: ''
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    loadHeroData();
  }, []);

  const loadHeroData = async () => {
    try {
      setLoading(true);
      const { data } = await adminContent.getHero();
      setHero(data || {
        title: '',
        subtitle: '',
        ctaText: '',
        ctaLink: '',
        imageUrl: ''
      });
      setImagePreview(data?.imageUrl || '');
    } catch (error) {
      console.error('Failed to load hero data:', error);
      showMessage('error', '데이터 로드 실패');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      // 이미지 파일이 선택된 경우 먼저 업로드
      let imageUrl = hero.imageUrl;
      if (imageFile) {
        // TODO: 실제 이미지 업로드 구현
        // const uploadedUrl = await uploadImage(imageFile);
        // imageUrl = uploadedUrl;

        // 임시: 로컬 URL 사용
        imageUrl = imagePreview;
      }

      const updatedHero = { ...hero, imageUrl };
      await adminContent.updateHero(updatedHero);

      setHero(updatedHero);
      showMessage('success', '✅ 저장되었습니다!');

      // 메인 페이지 새로고침 (같은 도메인인 경우)
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('heroUpdated', { detail: updatedHero }));
      }, 500);
    } catch (error: any) {
      console.error('Failed to save hero:', error);
      showMessage('error', '❌ 저장 실패: ' + (error.message || '알 수 없는 오류'));
    } finally {
      setSaving(false);
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 이미지 파일인지 확인
      if (!file.type.startsWith('image/')) {
        showMessage('error', '이미지 파일만 업로드 가능합니다.');
        return;
      }

      // 파일 크기 확인 (5MB 제한)
      if (file.size > 5 * 1024 * 1024) {
        showMessage('error', '이미지 크기는 5MB 이하여야 합니다.');
        return;
      }

      setImageFile(file);

      // 미리보기 생성
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
    setHero({ ...hero, imageUrl: '' });
  };

  const updateField = (field: keyof HeroData, value: string) => {
    setHero({ ...hero, [field]: value });
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
              히어로 섹션 편집
            </h1>
            <p className="text-gray-400 mt-2">메인 페이지 첫 화면을 편집하세요</p>
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
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Eye className="w-4 h-4" />
              {showPreview ? '편집' : '미리보기'}
            </button>

            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-electric-600 rounded-lg hover:bg-electric-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              {saving ? '저장 중...' : '저장'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 편집 폼 */}
          <div className="space-y-6">
            {/* 제목 */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                제목 (Title)
              </label>
              <input
                type="text"
                value={hero.title}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="예: PLM 솔루션의 새로운 기준"
                className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg focus:border-electric-500 focus:ring-2 focus:ring-electric-500/20 outline-none transition-all text-lg"
              />
            </div>

            {/* 부제목 */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                부제목 (Subtitle)
              </label>
              <textarea
                value={hero.subtitle}
                onChange={(e) => updateField('subtitle', e.target.value)}
                placeholder="예: 제조 혁신을 위한 디지털 전환의 첫걸음"
                rows={3}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg focus:border-electric-500 focus:ring-2 focus:ring-electric-500/20 outline-none transition-all resize-none"
              />
            </div>

            {/* CTA 버튼 */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
              <label className="block text-sm font-medium text-gray-300 mb-4">
                CTA 버튼 (Call-to-Action)
              </label>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">버튼 텍스트</label>
                  <input
                    type="text"
                    value={hero.ctaText}
                    onChange={(e) => updateField('ctaText', e.target.value)}
                    placeholder="예: 무료 체험 시작"
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg focus:border-electric-500 focus:ring-2 focus:ring-electric-500/20 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1">링크 URL</label>
                  <input
                    type="text"
                    value={hero.ctaLink}
                    onChange={(e) => updateField('ctaLink', e.target.value)}
                    placeholder="예: /demo 또는 /contact"
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg focus:border-electric-500 focus:ring-2 focus:ring-electric-500/20 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* 이미지 업로드 */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
              <label className="block text-sm font-medium text-gray-300 mb-4">
                배경 이미지
              </label>

              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
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
                    <p className="text-xs text-gray-500">PNG, JPG (최대 5MB)</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageSelect}
                  />
                </label>
              )}

              {imageFile && (
                <p className="mt-2 text-sm text-gray-400">
                  선택된 파일: {imageFile.name}
                </p>
              )}
            </div>
          </div>

          {/* 실시간 미리보기 */}
          <div className="lg:sticky lg:top-6 h-fit">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5" />
                실시간 미리보기
              </h3>

              <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg overflow-hidden">
                {/* 배경 이미지 */}
                {imagePreview && (
                  <div className="absolute inset-0">
                    <img
                      src={imagePreview}
                      alt="Background"
                      className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-900/80" />
                  </div>
                )}

                {/* 콘텐츠 */}
                <div className="relative p-12 min-h-[400px] flex flex-col justify-center">
                  <motion.h1
                    key={hero.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-electric-400 to-electric-600 bg-clip-text text-transparent"
                  >
                    {hero.title || '제목을 입력하세요'}
                  </motion.h1>

                  <motion.p
                    key={hero.subtitle}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-gray-300 mb-8"
                  >
                    {hero.subtitle || '부제목을 입력하세요'}
                  </motion.p>

                  {hero.ctaText && (
                    <motion.button
                      key={hero.ctaText}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="px-8 py-4 bg-electric-600 hover:bg-electric-700 rounded-lg font-semibold text-white transition-colors w-fit"
                    >
                      {hero.ctaText}
                    </motion.button>
                  )}
                </div>
              </div>

              <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <p className="text-sm text-blue-400">
                  💡 <strong>Tip:</strong> 왼쪽에서 내용을 수정하면 실시간으로 미리보기가 업데이트됩니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeroEditor;
