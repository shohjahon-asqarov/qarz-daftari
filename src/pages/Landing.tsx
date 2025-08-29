import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, Users, TrendingUp, Shield, Smartphone, Clock, DollarSign } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: "Mijozlar boshqaruvi",
      description: "Dom va xona raqamlari bilan aniq manzillar"
    },
    {
      icon: DollarSign,
      title: "Qarz kuzatuvi",
      description: "Kim qancha qarz oldi, real vaqtda yangilanadi"
    },
    {
      icon: TrendingUp,
      title: "Professional hisobotlar",
      description: "Moliyaviy statistika va tahlillar"
    },
    {
      icon: Shield,
      title: "Xavfsiz saqlash",
      description: "Ma'lumotlaringiz xavfsiz LocalStorage'da"
    },
    {
      icon: Smartphone,
      title: "Mobile-first",
      description: "Har qanday qurilmada mukammal ishlaydi"
    },
    {
      icon: Clock,
      title: "Vaqt tejash",
      description: "Qog'oz daftarlar o'rniga raqamli yechim"
    }
  ];

  const testimonials = [
    {
      name: "Ahmad Ali",
      business: "Elektronika do'koni",
      quote: "Bu ilova biznesimni butunlay o'zgartirdi! Endi barcha qarzlarni oson kuzataman.",
      rating: 5
    },
    {
      name: "Malika Usmanova", 
      business: "Kiyim-kechak",
      quote: "Dom va xona raqamlari bilan mijozlarni topish juda oson bo'ldi.",
      rating: 5
    },
    {
      name: "Farrux Karimov",
      business: "Oziq-ovqat",
      quote: "Professional hisobotlar mijozlarga ishonch beradi. Tavsiya qilaman!",
      rating: 5
    }
  ];

  const benefits = [
    "✅ Bepul foydalanish",
    "✅ O'zbek tilida",
    "✅ Oson o'rganish",
    "✅ Professional ko'rinish",
    "✅ Xavfsiz saqlash", 
    "✅ Mobile-friendly"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="max-w-md mx-auto px-6 py-12">
          <div className="text-center">
            <div className="w-24 h-24 bg-white bg-opacity-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">📊</span>
            </div>
            
            <h1 className="text-3xl font-bold mb-4">
              Qarz Daftari
            </h1>
            
            <p className="text-xl mb-6 text-blue-100">
              O'zbekiston uchun #1 qarz boshqaruv ilovasi
            </p>
            
            <p className="text-blue-200 mb-8 leading-relaxed">
              Kichik biznes egallari uchun professional qarz va mijoz boshqaruv tizimi. 
              Dom va xona raqamlari bilan aniq kuzatuv!
            </p>

            <div className="flex flex-col space-y-3">
              <button
                onClick={() => navigate('/onboarding')}
                className="bg-white text-blue-600 font-bold py-4 px-8 rounded-2xl shadow-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center"
              >
                <span className="mr-2">Bepul boshlash</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => navigate('/login')}
                className="bg-white bg-opacity-20 text-white font-medium py-3 px-6 rounded-xl backdrop-blur-md border border-white border-opacity-30 hover:bg-opacity-30 transition-all duration-300"
              >
                Demo ko'rish
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-md mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Nega aynan Qarz Daftari?
        </h2>
        
        <div className="space-y-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
              <div className="p-2 bg-blue-100 rounded-lg">
                <feature.icon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-xs">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-md mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Nima olasiz?
          </h2>
          
          <div className="grid grid-cols-2 gap-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-md mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Mijozlarimiz fikri
        </h2>
        
        <div className="space-y-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-bold text-sm">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-500 text-xs">
                    {testimonial.business}
                  </p>
                </div>
                <div className="ml-auto flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-sm">⭐</span>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 text-sm italic">
                "{testimonial.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-md mx-auto px-6 py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Bugunoq boshlang! 🚀
          </h2>
          
          <p className="text-blue-100 mb-8">
            Minglab biznes egallari allaqachon foydalanmoqda
          </p>
          
          <button
            onClick={() => navigate('/onboarding')}
            className="bg-white text-blue-600 font-bold py-4 px-8 rounded-2xl shadow-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 w-full"
          >
            Bepul ro'yxatdan o'tish 🎉
          </button>
          
          <p className="text-xs text-blue-200 mt-4">
            Kredit karta kerak emas • 30 soniya ichida tayyor
          </p>
        </div>
      </div>
    </div>
  );
}
