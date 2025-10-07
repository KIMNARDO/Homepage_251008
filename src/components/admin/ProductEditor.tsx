import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Save,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Grid,
  Type,
  X,
  ChevronUp,
  ChevronDown,
  Copy
} from 'lucide-react';
import { useContentStore } from '@/stores/contentStore';

interface ProductContent {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  icon: string;
  color: string;
  stats: Record<string, string>;
  image?: string;
  href?: string;
}

interface ProductSectionContent {
  heading: string;
  subheading: string;
  products: ProductContent[];
}

interface ProductEditorProps {
  onClose?: () => void;
  showPreview?: boolean;
}

const ProductEditor: React.FC<ProductEditorProps> = ({ onClose, showPreview = false }) => {
  const { getProductSectionContent, updateSectionContent, isLoading } = useContentStore();
  const [productSection, setProductSection] = useState<ProductSectionContent>({
    heading: '',
    subheading: '',
    products: []
  });
  const [isPreviewMode, setIsPreviewMode] = useState(showPreview);
  const [activeTab, setActiveTab] = useState<'header' | 'products'>('header');
  const [expandedProduct, setExpandedProduct] = useState<number | null>(null);

  useEffect(() => {
    const content = getProductSectionContent();
    if (content) {
      setProductSection(content);
    }
  }, [getProductSectionContent]);

  const handleSave = () => {
    updateSectionContent('products', productSection);
  };

  const handleAddProduct = () => {
    const newProduct: ProductContent = {
      title: '새 제품',
      subtitle: 'Product Subtitle',
      description: '제품 설명을 입력하세요.',
      features: ['특징 1', '특징 2', '특징 3'],
      icon: '📦',
      color: 'from-blue-400 to-blue-600',
      stats: {
        efficiency: '+50%',
        time: '-40%',
        accuracy: '99%'
      }
    };

    setProductSection(prev => ({
      ...prev,
      products: [...prev.products, newProduct]
    }));
  };

  const handleRemoveProduct = (index: number) => {
    setProductSection(prev => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index)
    }));
    setExpandedProduct(null);
  };

  const handleDuplicateProduct = (index: number) => {
    const product = productSection.products[index];
    const duplicatedProduct = {
      ...product,
      title: `${product.title} (복사본)`
    };

    setProductSection(prev => ({
      ...prev,
      products: [...prev.products, duplicatedProduct]
    }));
  };

  const handleProductUpdate = (index: number, field: string, value: any) => {
    setProductSection(prev => ({
      ...prev,
      products: prev.products.map((product, i) =>
        i === index ? { ...product, [field]: value } : product
      )
    }));
  };

  const handleFeatureAdd = (productIndex: number) => {
    const products = [...productSection.products];
    products[productIndex].features.push('새 특징');
    setProductSection(prev => ({ ...prev, products }));
  };

  const handleFeatureRemove = (productIndex: number, featureIndex: number) => {
    const products = [...productSection.products];
    products[productIndex].features = products[productIndex].features.filter((_, i) => i !== featureIndex);
    setProductSection(prev => ({ ...prev, products }));
  };

  const handleFeatureUpdate = (productIndex: number, featureIndex: number, value: string) => {
    const products = [...productSection.products];
    products[productIndex].features[featureIndex] = value;
    setProductSection(prev => ({ ...prev, products }));
  };

  const handleStatUpdate = (productIndex: number, statKey: string, value: string) => {
    const products = [...productSection.products];
    products[productIndex].stats[statKey] = value;
    setProductSection(prev => ({ ...prev, products }));
  };

  const handleAddStat = (productIndex: number) => {
    const products = [...productSection.products];
    const statKeys = Object.keys(products[productIndex].stats);
    const newKey = `stat${statKeys.length + 1}`;
    products[productIndex].stats[newKey] = '100%';
    setProductSection(prev => ({ ...prev, products }));
  };

  const handleRemoveStat = (productIndex: number, statKey: string) => {
    const products = [...productSection.products];
    delete products[productIndex].stats[statKey];
    setProductSection(prev => ({ ...prev, products }));
  };

  const colorOptions = [
    'from-electric-400 to-electric-600',
    'from-emerald-400 to-emerald-600',
    'from-purple-400 to-purple-600',
    'from-amber-400 to-amber-600',
    'from-cyan-400 to-cyan-600',
    'from-red-400 to-red-600',
    'from-pink-400 to-pink-600',
    'from-indigo-400 to-indigo-600'
  ];

  return (
    <div className="bg-slate-900/95 backdrop-blur-sm border border-slate-800/50 rounded-2xl overflow-hidden" data-testid="product-editor">
      {/* Header */}
      <div className="p-6 border-b border-slate-800/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Grid className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Product Section Editor</h3>
              <p className="text-slate-400 text-sm">제품 쇼케이스 섹션을 편집합니다</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className={`p-2 rounded-lg transition-colors ${
                isPreviewMode
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {isPreviewMode ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              저장
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mt-4 bg-slate-800/50 p-1 rounded-lg">
          {[
            { id: 'header', label: '헤더 설정', icon: Type },
            { id: 'products', label: '제품 관리', icon: Grid }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-slate-700 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
        {/* Header Tab */}
        {activeTab === 'header' && (
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="block text-sm font-medium text-slate-300">섹션 제목</label>
              <input
                type="text"
                value={productSection.heading}
                onChange={(e) => setProductSection(prev => ({ ...prev, heading: e.target.value }))}
                placeholder="제품 섹션 제목"
                className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-slate-300">섹션 부제목</label>
              <textarea
                value={productSection.subheading}
                onChange={(e) => setProductSection(prev => ({ ...prev, subheading: e.target.value }))}
                placeholder="섹션 설명"
                rows={3}
                className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all resize-none"
              />
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-300">
                제품 목록 ({productSection.products.length}개)
              </label>
              <button
                onClick={handleAddProduct}
                className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                제품 추가
              </button>
            </div>

            <div className="space-y-4">
              {productSection.products.map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-slate-700/50 rounded-xl overflow-hidden"
                >
                  {/* Product Header */}
                  <div className="p-4 bg-slate-800/30 border-b border-slate-700/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{product.icon}</span>
                        <div>
                          <h4 className="font-semibold text-white">{product.title}</h4>
                          <p className="text-sm text-slate-400">{product.subtitle}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDuplicateProduct(index)}
                          className="p-2 text-slate-400 hover:text-white transition-colors"
                          title="복제"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setExpandedProduct(expandedProduct === index ? null : index)}
                          className="p-2 text-slate-400 hover:text-white transition-colors"
                        >
                          {expandedProduct === index ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => handleRemoveProduct(index)}
                          className="p-2 text-red-400 hover:text-red-300 transition-colors"
                          title="삭제"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {expandedProduct === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 space-y-6">
                          {/* Basic Info */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-slate-300 mb-2">제품명</label>
                              <input
                                type="text"
                                value={product.title}
                                onChange={(e) => handleProductUpdate(index, 'title', e.target.value)}
                                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-300 mb-2">부제목</label>
                              <input
                                type="text"
                                value={product.subtitle}
                                onChange={(e) => handleProductUpdate(index, 'subtitle', e.target.value)}
                                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">설명</label>
                            <textarea
                              value={product.description}
                              onChange={(e) => handleProductUpdate(index, 'description', e.target.value)}
                              rows={3}
                              className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all resize-none"
                            />
                          </div>

                          {/* Icon and Color */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-slate-300 mb-2">아이콘</label>
                              <input
                                type="text"
                                value={product.icon}
                                onChange={(e) => handleProductUpdate(index, 'icon', e.target.value)}
                                placeholder="🔧"
                                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-300 mb-2">색상</label>
                              <div className="grid grid-cols-4 gap-2">
                                {colorOptions.map((color) => (
                                  <button
                                    key={color}
                                    onClick={() => handleProductUpdate(index, 'color', color)}
                                    className={`h-8 rounded-lg bg-gradient-to-r ${color} ${
                                      product.color === color ? 'ring-2 ring-white' : ''
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Features */}
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <label className="text-sm font-medium text-slate-300">주요 기능</label>
                              <button
                                onClick={() => handleFeatureAdd(index)}
                                className="px-2 py-1 bg-slate-700 hover:bg-slate-600 text-white text-xs rounded-md transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <div className="space-y-2">
                              {product.features.map((feature, featureIndex) => (
                                <div key={featureIndex} className="flex gap-2">
                                  <input
                                    type="text"
                                    value={feature}
                                    onChange={(e) => handleFeatureUpdate(index, featureIndex, e.target.value)}
                                    className="flex-1 px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                                  />
                                  <button
                                    onClick={() => handleFeatureRemove(index, featureIndex)}
                                    className="p-2 text-red-400 hover:text-red-300 transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Stats */}
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <label className="text-sm font-medium text-slate-300">성능 지표</label>
                              <button
                                onClick={() => handleAddStat(index)}
                                className="px-2 py-1 bg-slate-700 hover:bg-slate-600 text-white text-xs rounded-md transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <div className="space-y-2">
                              {Object.entries(product.stats).map(([key, value]) => (
                                <div key={key} className="flex gap-2">
                                  <input
                                    type="text"
                                    value={key}
                                    onChange={(e) => {
                                      const newStats = { ...product.stats };
                                      delete newStats[key];
                                      newStats[e.target.value] = value;
                                      handleProductUpdate(index, 'stats', newStats);
                                    }}
                                    placeholder="지표명"
                                    className="flex-1 px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                                  />
                                  <input
                                    type="text"
                                    value={value}
                                    onChange={(e) => handleStatUpdate(index, key, e.target.value)}
                                    placeholder="값"
                                    className="flex-1 px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                                  />
                                  <button
                                    onClick={() => handleRemoveStat(index, key)}
                                    className="p-2 text-red-400 hover:text-red-300 transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Preview Mode */}
      {isPreviewMode && (
        <div className="border-t border-slate-800/50 p-6">
          <h4 className="text-lg font-semibold text-white mb-4">미리보기</h4>
          <div className="bg-gradient-to-b from-navy-900 to-navy rounded-lg p-6 space-y-6">
            {/* Header */}
            <div className="text-center">
              {productSection.heading && (
                <h2 className="text-3xl font-bold text-white mb-4">{productSection.heading}</h2>
              )}
              {productSection.subheading && (
                <p className="text-gray-400">{productSection.subheading}</p>
              )}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {productSection.products.slice(0, 3).map((product, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl bg-gradient-to-br ${product.color} relative overflow-hidden`}
                >
                  <div className="relative z-10">
                    <div className="text-2xl mb-2">{product.icon}</div>
                    <h3 className="text-lg font-bold text-white mb-1">{product.title}</h3>
                    <p className="text-white/90 text-sm mb-3">{product.subtitle}</p>
                    <p className="text-white/80 text-xs line-clamp-2">{product.description}</p>

                    <div className="mt-3 space-y-1">
                      {Object.entries(product.stats).slice(0, 2).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-xs text-white/90">
                          <span>{key}</span>
                          <span className="font-bold">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductEditor;