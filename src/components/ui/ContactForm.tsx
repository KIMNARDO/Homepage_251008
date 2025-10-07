import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  subject: string;
  message: string;
  consent: boolean;
}

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => void;
  className?: string;
  title?: string;
  subtitle?: string;
}

type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

const ContactForm: React.FC<ContactFormProps> = ({
  onSubmit,
  className = '',
  title = '문의하기',
  subtitle = '궁금한 사항이 있으시면 언제든지 연락주세요.',
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
    consent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<ContactFormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: ContactFormErrors = {};

    if (!formData.name.trim()) newErrors.name = '이름을 입력해주세요.';
    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다.';
    }
    if (!formData.company.trim()) newErrors.company = '회사명을 입력해주세요.';
    if (!formData.phone.trim()) newErrors.phone = '연락처를 입력해주세요.';
    if (!formData.subject.trim()) newErrors.subject = '문의 제목을 입력해주세요.';
    if (!formData.message.trim()) newErrors.message = '문의 내용을 입력해주세요.';
    if (!formData.consent) newErrors.consent = '개인정보 처리에 동의해주세요.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (onSubmit) {
        onSubmit(formData);
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`bg-gradient-to-b from-gray-900 to-gray-900/50 border border-gray-800 rounded-2xl p-8 text-center ${className}`}
      >
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">문의가 접수되었습니다</h3>
        <p className="text-gray-300 mb-6">
          빠른 시일 내에 담당자가 연락드리겠습니다.<br />
          추가 문의사항이 있으시면 언제든지 연락주세요.
        </p>
        <Button
          variant="primary"
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              name: '',
              email: '',
              company: '',
              phone: '',
              subject: '',
              message: '',
              consent: false,
            });
          }}
        >
          새 문의 작성
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`bg-gradient-to-b from-gray-900 to-gray-900/50 border border-gray-800 rounded-2xl p-8 ${className}`}
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>
        <p className="text-gray-300">{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              이름 *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-gray-800 border ${
                errors.name ? 'border-red-500' : 'border-gray-700'
              } rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors duration-200`}
              placeholder="홍길동"
            />
            {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              이메일 *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-gray-800 border ${
                errors.email ? 'border-red-500' : 'border-gray-700'
              } rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors duration-200`}
              placeholder="hong@company.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Company */}
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
              회사명 *
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-gray-800 border ${
                errors.company ? 'border-red-500' : 'border-gray-700'
              } rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors duration-200`}
              placeholder="회사명"
            />
            {errors.company && <p className="mt-1 text-sm text-red-400">{errors.company}</p>}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
              연락처 *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-gray-800 border ${
                errors.phone ? 'border-red-500' : 'border-gray-700'
              } rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors duration-200`}
              placeholder="010-1234-5678"
            />
            {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
          </div>
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
            문의 제목 *
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-gray-800 border ${
              errors.subject ? 'border-red-500' : 'border-gray-700'
            } rounded-lg text-white focus:border-blue-500 focus:outline-none transition-colors duration-200`}
          >
            <option value="">문의 유형을 선택해주세요</option>
            <option value="product">제품 문의</option>
            <option value="pricing">가격 문의</option>
            <option value="demo">데모 요청</option>
            <option value="support">기술 지원</option>
            <option value="partnership">파트너십</option>
            <option value="other">기타</option>
          </select>
          {errors.subject && <p className="mt-1 text-sm text-red-400">{errors.subject}</p>}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
            문의 내용 *
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={formData.message}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-gray-800 border ${
              errors.message ? 'border-red-500' : 'border-gray-700'
            } rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors duration-200 resize-none`}
            placeholder="문의하실 내용을 자세히 적어주세요..."
          />
          {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
        </div>

        {/* Consent */}
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="consent"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
            className="mt-1 w-4 h-4 text-blue-500 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
          />
          <label htmlFor="consent" className="text-sm text-gray-300">
            개인정보 수집 및 이용에 동의합니다. *
            <br />
            <span className="text-xs text-gray-400">
              수집된 개인정보는 문의 처리 목적으로만 사용되며, 처리 완료 후 파기됩니다.
            </span>
          </label>
        </div>
        {errors.consent && <p className="text-sm text-red-400">{errors.consent}</p>}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              전송 중...
            </div>
          ) : (
            '문의 보내기'
          )}
        </Button>
      </form>
    </motion.div>
  );
};

export default ContactForm;
