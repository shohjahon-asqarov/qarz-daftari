import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Users, TrendingUp, Shield, Smartphone } from 'lucide-react';

const onboardingSteps = [
  {
    title: "Xush kelibsiz! 👋",
    subtitle: "O'zbekiston uchun eng yaxshi qarz boshqaruv ilovasi",
    description: "Biznesingizni oson va professional tarzda boshqaring",
    icon: "🚀",
    color: "from-blue-500 to-purple-600"
  },
  {
    title: "Mijozlarni boshqaring 👥",
    subtitle: "Barcha mijoz ma'lumotlari bir joyda",
    description: "Dom va xona raqamlari bilan aniq manzillar, telefon raqamlar va qarz tarixi",
    icon: "👥",
    color: "from-green-500 to-blue-500"
  },
  {
    title: "Qarzlarni kuzating 💰",
    subtitle: "Real vaqtda qarz va to'lovlar",
    description: "Kim qancha qarz oldi, qachon to'lashi kerak - hammasi bir ekranda",
    icon: "💰",
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Hisobotlar olish 📊",
    subtitle: "Professional moliyaviy hisobotlar",
    description: "Kim qancha qarz berdi, qancha qaytarildi - to'liq statistika",
    icon: "📊",
    color: "from-orange-500 to-red-500"
  }
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/login');
    }
  };

  const skipOnboarding = () => {
    navigate('/login');
  };

  const currentStepData = onboardingSteps[currentStep];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentStepData.color} flex flex-col items-center justify-center p-6 text-white relative overflow-hidden`}>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-white"></div>
        <div className="absolute top-1/2 right-20 w-16 h-16 rounded-full bg-white"></div>
      </div>

      {/* Skip button */}
      <button
        onClick={skipOnboarding}
        className="absolute top-12 right-6 text-white text-opacity-80 hover:text-opacity-100 text-sm"
      >
        O'tkazib yuborish
      </button>

      {/* Content */}
      <div className="text-center z-10 max-w-sm">
        <div className="text-8xl mb-8 animate-bounce">
          {currentStepData.icon}
        </div>
        
        <h1 className="text-3xl font-bold mb-4">
          {currentStepData.title}
        </h1>
        
        <h2 className="text-xl font-semibold mb-4 text-white text-opacity-90">
          {currentStepData.subtitle}
        </h2>
        
        <p className="text-white text-opacity-80 mb-8 leading-relaxed">
          {currentStepData.description}
        </p>

        {/* Step indicators */}
        <div className="flex justify-center space-x-2 mb-8">
          {onboardingSteps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentStep 
                  ? 'bg-white w-8' 
                  : 'bg-white bg-opacity-40'
              }`}
            />
          ))}
        </div>

        {/* Action button */}
        <button
          onClick={nextStep}
          className="bg-white text-gray-900 font-bold py-4 px-8 rounded-2xl shadow-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center mx-auto"
        >
          <span className="mr-2">
            {currentStep === onboardingSteps.length - 1 ? 'Boshlash' : 'Davom etish'}
          </span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Features preview for last step */}
      {currentStep === onboardingSteps.length - 1 && (
        <div className="absolute bottom-10 left-6 right-6">
          <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-2xl p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <Users className="w-6 h-6 mx-auto mb-2" />
                <p className="text-xs">Mijozlar</p>
              </div>
              <div>
                <TrendingUp className="w-6 h-6 mx-auto mb-2" />
                <p className="text-xs">Statistika</p>
              </div>
              <div>
                <Shield className="w-6 h-6 mx-auto mb-2" />
                <p className="text-xs">Xavfsiz</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
