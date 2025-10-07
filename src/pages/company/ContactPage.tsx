import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, Headphones } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const contactMethods = [
    {
      icon: Phone,
      title: '전화 상담',
      description: '평일 09:00 - 18:00',
      detail: '02-1234-5678',
      color: 'electric',
    },
    {
      icon: Mail,
      title: '이메일 문의',
      description: '24시간 접수 가능',
      detail: 'info@papsnet.com',
      color: 'emerald',
    },
    {
      icon: MessageSquare,
      title: '실시간 채팅',
      description: '즉시 응답',
      detail: '채팅 시작하기',
      color: 'purple',
    },
  ];

  return (
    <div className="min-h-screen bg-navy">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-electric-400/10 via-transparent to-purple-500/10" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              문의하기
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              PLM 전문가가 귀사의 디지털 전환을 도와드립니다
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-8 relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 hover:border-electric-400/50 transition-all cursor-pointer group"
                >
                  <div className={`mx-auto w-fit p-4 bg-${method.color}-400/10 rounded-xl mb-4 group-hover:bg-${method.color}-400/20 transition-colors`}>
                    <Icon className={`w-6 h-6 text-${method.color}-400`} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{method.title}</h3>
                  <p className="text-white/60 text-sm mb-2">{method.description}</p>
                  <p className="text-electric-400 font-medium">{method.detail}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8"
            >
              <h2 className="text-3xl font-bold text-white mb-2">상담 신청</h2>
              <p className="text-white/60 mb-8">
                전문가가 24시간 내에 답변드립니다
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    이름 *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-electric-400 transition-colors"
                    placeholder="홍길동"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      이메일 *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-electric-400 transition-colors"
                      placeholder="email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      연락처 *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-electric-400 transition-colors"
                      placeholder="010-0000-0000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    회사명
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-electric-400 transition-colors"
                    placeholder="회사명을 입력하세요"
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    문의내용 *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-electric-400 transition-colors resize-none"
                    placeholder="PLM 도입에 대한 문의사항을 상세히 적어주세요"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-electric-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  문의 보내기
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Office Location */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Headphones className="w-6 h-6 text-electric-400" />
                  오시는 길
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-electric-400/10 rounded-xl">
                      <MapPin className="w-5 h-5 text-electric-400" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm mb-1">주소</p>
                      <p className="text-white font-medium leading-relaxed">
                        서울특별시 강남구 테헤란로 123<br />
                        ABC빌딩 15층
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-emerald-400/10 rounded-xl">
                      <Phone className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm mb-1">전화</p>
                      <p className="text-white font-medium">02-1234-5678</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-400/10 rounded-xl">
                      <Mail className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm mb-1">이메일</p>
                      <p className="text-white font-medium">info@papsnet.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-amber-400/10 rounded-xl">
                      <Clock className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm mb-1">업무시간</p>
                      <p className="text-white font-medium">
                        월-금: 09:00 - 18:00<br />
                        토-일: 휴무
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Consultation */}
              <div className="bg-gradient-to-r from-electric-500 to-purple-600 rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-white mb-3">
                  빠른 상담 예약
                </h3>
                <p className="text-white/90 mb-6">
                  PLM 전문가와 1:1 화상 상담을 통해<br />
                  맞춤형 솔루션을 제안받으세요
                </p>
                <button className="w-full py-4 bg-white text-electric-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                  상담 예약하기
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section - Placeholder */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8"
          >
            <div className="aspect-video bg-gradient-to-br from-electric-500/10 to-purple-600/10 rounded-2xl flex items-center justify-center">
              <p className="text-white/60 text-lg">지도 (추후 통합 예정)</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
