import React, { useState } from 'react';
import { Share2, Copy, MessageCircle, Check } from 'lucide-react';

export default function ShareButton() {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareText = `🚀 Qarz Daftari ilovasini sinab ko'ring!

📊 O'zbekiston uchun eng yaxshi qarz boshqaruv tizimi
✅ Bepul va oson foydalanish
🏠 Dom va xona raqamlari bilan aniq kuzatuv
📱 Professional mobile design

Demo: http://localhost:5174

#QarzDaftari #Biznes #Uzbekistan`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  const shareVia = (platform: string) => {
    const encodedText = encodeURIComponent(shareText);
    const url = window.location.href;
    
    const shareUrls = {
      telegram: `https://t.me/share/url?url=${url}&text=${encodedText}`,
      whatsapp: `https://wa.me/?text=${encodedText}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}`
    };

    if (shareUrls[platform as keyof typeof shareUrls]) {
      window.open(shareUrls[platform as keyof typeof shareUrls], '_blank');
    }
    setShowShareMenu(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowShareMenu(!showShareMenu)}
        className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95"
      >
        <Share2 className="w-5 h-5" />
      </button>

      {showShareMenu && (
        <div className="absolute bottom-full right-0 mb-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 min-w-48">
          <h3 className="font-bold text-gray-900 text-sm mb-3">
            Do'stlarga ulashing 🎉
          </h3>
          
          <div className="space-y-2">
            <button
              onClick={copyToClipboard}
              className="w-full flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-gray-600" />}
              <span className="text-sm text-gray-700">
                {copied ? 'Nusxalandi!' : 'Link nusxalash'}
              </span>
            </button>
            
            <button
              onClick={() => shareVia('telegram')}
              className="w-full flex items-center space-x-3 p-2 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <div className="w-4 h-4 bg-blue-500 rounded text-white text-xs flex items-center justify-center">
                T
              </div>
              <span className="text-sm text-gray-700">Telegram</span>
            </button>
            
            <button
              onClick={() => shareVia('whatsapp')}
              className="w-full flex items-center space-x-3 p-2 hover:bg-green-50 rounded-lg transition-colors"
            >
              <div className="w-4 h-4 bg-green-500 rounded text-white text-xs flex items-center justify-center">
                W
              </div>
              <span className="text-sm text-gray-700">WhatsApp</span>
            </button>
          </div>

          <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
            <p className="text-xs text-yellow-700 text-center">
              🎁 Har bir taklif uchun bonus funksiyalar!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
