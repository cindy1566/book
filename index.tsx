import React, { useState, useMemo } from 'react';
import { 
  Heart, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Dog, 
  Sun, 
  Sparkles, 
  UtensilsCrossed, 
  Calendar, 
  Users, 
  CheckCircle, 
  Search, 
  ChevronRight, 
  Menu as MenuIcon, 
  X,
  Coffee,
  Flame,
  Leaf
} from 'lucide-react';

// --- 餐廳資料配置 ---
const RESTAURANT_INFO = {
  name: "NORDIC & PAWS 沐光木質餐廳",
  slogan: "日光、暖木，與你和毛孩共度的美味時光",
  address: "臺北市大安區溫州街 86 號 1 樓（台大商圈 / 捷運公館站 3 號出口步行 5 分鐘）",
  phone: "(02) 2368-9888",
  email: "hello@nordicpaws.tw",
  googleMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.427357482352!2d121.5312!3d25.0175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a989d9e68377%3A0x6b4453b3dfa32df4!2sNational%20Taiwan%20University!5e0!3m2!1szh-TW!2stw!4v1710000000000!5m2!1szh-TW!2stw",
  hours: [
    { days: "週一至週五", time: "11:30 - 21:00（供餐至 20:00）" },
    { days: "週六至週日", time: "10:30 - 21:30（供餐至 20:30）" }
  ],
  transport: {
    mrt: "捷運公館站 3 號出口，沿新生南路步行約 5 分鐘轉溫州街即可到達。",
    bus: "搭乘公車至「台大站」或「溫州街口站」，步行約 2 分鐘。",
    parking: "鄰近「台大公館停車場」或「新生南路地下停車場」，步行約 3-5 分鐘。"
  }
};

// --- 菜單資料庫 (至少3分類，此處提供4分類共11產品) ---
const MENU_CATEGORIES = [
  { id: 'all', name: '全部菜單' },
  { id: 'pasta', name: '義大利麵' },
  { id: 'mains', name: '精選排餐' },
  { id: 'dessert', name: '手作甜點' },
  { id: 'beverage', name: '精品飲品' }
];

const MENU_ITEMS = [
  // 義大利麵類
  {
    id: 'p1',
    categoryId: 'pasta',
    name: '奶油粉紅醬松露野菇義大利麵',
    price: 280,
    description: '使用義大利進口黑松露醬，搭配現炒綜合野菇與濃郁滑順粉紅醬，學生與家庭最愛的經典口味。',
    tags: ['HOT 人氣首選', '奶素可'],
    spicyLevel: 0,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281273?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p2',
    categoryId: 'pasta',
    name: '蒜香辣味白酒蛤蜊扁麵',
    price: 290,
    description: '產地直送新鮮大蛤蜊，以冷壓初榨橄欖油、蒜片與嚴選白酒大火爆炒，香氣四溢、鮮味十足。',
    tags: ['主廚推薦'],
    spicyLevel: 1,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'p3',
    categoryId: 'pasta',
    name: '慢燉波隆那經典嫩牛肉醬麵',
    price: 310,
    description: '主廚特製紅酒搭配澳洲手切牛肉慢火燉煮 6 小時，蔬菜濃縮甘甜，每一口都是道地北義風味。',
    tags: [],
    spicyLevel: 0,
    isPopular: false,
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80'
  },
  // 排餐類
  {
    id: 'm1',
    categoryId: 'mains',
    name: '北歐迷迭香香草舒肥雞腿排',
    price: 360,
    description: '採用低溫舒肥技術鎖住肉汁，外皮煎至金黃酥翠，搭配烤季節時蔬與特製檸檬優格醬。',
    tags: ['超高CP值', '寵物友善水煮肉可選'],
    spicyLevel: 0,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'm2',
    categoryId: 'mains',
    name: '炙烤頂級安格斯肋眼牛排 (8oz)',
    price: 580,
    description: '濕式熟成安格斯牛排，高溫鎖住肉汁，佐海鹽、烤蒜球與手作紅酒濃縮醬汁，極致滿足感。',
    tags: ['店長大推'],
    spicyLevel: 0,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'm3',
    categoryId: 'mains',
    name: '挪威香煎鮭魚菲力佐蒔蘿白醬',
    price: 420,
    description: '空運空運挪威鮭魚，油脂豐富肉質細緻，搭配清香蒔蘿醬與香草馬鈴薯泥，清新無負擔。',
    tags: [],
    spicyLevel: 0,
    isPopular: false,
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80'
  },
  // 甜點類
  {
    id: 'd1',
    categoryId: 'dessert',
    name: '瑞典手作肉桂捲佐焦糖淋醬',
    price: 130,
    description: '每日現烤，選用錫蘭肉桂粉與天然發酵奶油，口感層次豐富，香氣濃郁不甜膩。',
    tags: ['每日限量'],
    spicyLevel: 0,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'd2',
    categoryId: 'dessert',
    name: '法式濃郁焦糖烤布蕾',
    price: 110,
    description: '嚴選馬達加斯加香草籽與優質鮮奶，表面以有機砂糖炙烤出金黃脆焦糖，滑順細緻。',
    tags: ['蛋奶素'],
    spicyLevel: 0,
    isPopular: false,
    image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'd3',
    categoryId: 'dessert',
    name: '燕麥無糖寵物專屬紫薯小蛋糕',
    price: 90,
    description: '專為毛孩研發！全蒸熟紫薯搭配無糖有機燕麥與雞胸肉餡，無任何添加劑，健康美味。',
    tags: ['毛孩專屬美食'],
    spicyLevel: 0,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80'
  },
  // 飲品類
  {
    id: 'b1',
    categoryId: 'beverage',
    name: '沐光陽光手沖精品咖啡 (燕麥奶可加價)',
    price: 140,
    description: '淺中烘焙中南美洲莊園豆，帶有柑橘香氣與堅果尾韻，口感清爽順口。',
    tags: ['招牌飲品'],
    spicyLevel: 0,
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'b2',
    categoryId: 'beverage',
    name: '接骨木莓果清新氣泡飲',
    price: 130,
    description: '手工熬煮綜合莓果醬搭配有機接骨木花糖漿，沁涼氣泡口感，拍照網美必點。',
    tags: ['無咖啡因'],
    spicyLevel: 0,
    isPopular: false,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80'
  }
];

export default function App() {
  // 狀態管理
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // 訂位表單狀態
  const [booking, setBooking] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '18:00',
    adults: '2',
    children: '0',
    pets: '0',
    notes: ''
  });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // 菜單過濾邏輯
  const filteredMenuItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.categoryId === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // 處理訂位送出
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!booking.name || !booking.phone || !booking.date) {
      alert("請填寫姓名、電話與訂位日期");
      return;
    }
    setBookingSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#3E3228] font-sans antialiased selection:bg-[#D9C5B2] selection:text-[#3E3228]">
      
      {/* 1. 導覽列 Navigation */}
      <nav className="sticky top-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#EADBC8]/60 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#D9C5B2] flex items-center justify-center text-[#3E3228] shadow-sm">
                <Sun className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-wider block text-[#3E3228]">NORDIC & PAWS</span>
                <span className="text-xs text-[#8A9A86] font-medium tracking-widest block">沐光木質餐廳 · 寵物友善</span>
              </div>
            </div>

            {/* 桌機導覽連結 */}
            <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
              <a href="#about" className="hover:text-[#8A9A86] transition-colors">品牌體驗</a>
              <a href="#menu" className="hover:text-[#8A9A86] transition-colors">美味菜單</a>
              <a href="#space" className="hover:text-[#8A9A86] transition-colors">用餐情境</a>
              <a href="#reservation" className="hover:text-[#8A9A86] transition-colors">線上訂位</a>
              <a href="#contact" className="hover:text-[#8A9A86] transition-colors">營業與交通</a>
              <a 
                href="#reservation" 
                className="bg-[#8A9A86] hover:bg-[#788874] text-white px-5 py-2.5 rounded-full transition-all shadow-sm hover:shadow"
              >
                立即訂位
              </a>
            </div>

            {/* 手機選單開關 */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-[#3E3228] hover:bg-[#EADBC8]/40"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* 手機選單抽屜 */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#FDFBF7] border-b border-[#EADBC8] px-4 pt-2 pb-6 space-y-3">
            <a 
              href="#about" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-base font-medium border-b border-gray-100"
            >
              品牌體驗
            </a>
            <a 
              href="#menu" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-base font-medium border-b border-gray-100"
            >
              美味菜單
            </a>
            <a 
              href="#space" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-base font-medium border-b border-gray-100"
            >
              用餐情境
            </a>
            <a 
              href="#reservation" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-base font-medium border-b border-gray-100"
            >
              線上訂位
            </a>
            <a 
              href="#contact" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-base font-medium"
            >
              營業與交通
            </a>
          </div>
        )}
      </nav>

      {/* 2. 主視覺 Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:py-28 bg-gradient-to-b from-[#FDFBF7] via-[#F7F2EB] to-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-[#EADBC8]/60 text-[#3E3228] px-4 py-1.5 rounded-full text-xs md:text-sm font-medium">
                <Dog className="w-4 h-4 text-[#8A9A86]" />
                <span>台北大安區 · 寵物友善全日光玻璃屋</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#3E3228] leading-tight">
                陽光、木香，<br />
                與你和毛孩的<span className="text-[#8A9A86]">美味幸福時光</span>。
              </h1>
              <p className="text-base sm:text-lg text-[#6E5D4F] leading-relaxed max-w-2xl mx-auto lg:mx-0">
                專為學生、小資族與溫馨家庭打造的高 CP 值北歐風西式餐館。嚴選天然食材、全天候自然採光，還有寵物專屬無鹽健康餐點！
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <a 
                  href="#reservation" 
                  className="w-full sm:w-auto bg-[#3E3228] text-white px-8 py-3.5 rounded-full font-medium hover:bg-[#5A493B] transition-all text-center shadow-md hover:shadow-lg"
                >
                  預約極簡採光席
                </a>
                <a 
                  href="#menu" 
                  className="w-full sm:w-auto border border-[#3E3228] text-[#3E3228] px-8 py-3.5 rounded-full font-medium hover:bg-[#EADBC8]/30 transition-all text-center"
                >
                  探索平價菜單
                </a>
              </div>

              {/* 特色短評標籤 */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#EADBC8]/60 max-w-lg mx-auto lg:mx-0">
                <div>
                  <div className="text-xl md:text-2xl font-bold text-[#8A9A86]">100%</div>
                  <div className="text-xs text-[#6E5D4F]">自然採光空間</div>
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-bold text-[#8A9A86]">NT$280↑</div>
                  <div className="text-xs text-[#6E5D4F]">親民價格義大利麵</div>
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-bold text-[#8A9A86]">Pet-Friendly</div>
                  <div className="text-xs text-[#6E5D4F]">毛孩自由同行</div>
                </div>
              </div>
            </div>

            {/* 右側意象照片格紋 */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <img 
                    src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80" 
                    alt="北歐木質採光餐廳空間" 
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* 浮動卡片 1 */}
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-[#EADBC8]/40 hidden sm:flex items-center space-x-3 max-w-xs">
                  <div className="p-2.5 bg-[#F7F2EB] rounded-xl text-[#8A9A86]">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#3E3228]">學生與家庭小聚首選</p>
                    <p className="text-[11px] text-gray-500">免負擔高昂費用，享受高質感饗宴</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. 品牌體驗與食材特色 About & Concept */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold tracking-widest text-[#8A9A86] uppercase mb-2">BRAND EXPERIENCE</h2>
            <h3 className="text-3xl font-bold text-[#3E3228]">料理風格與純粹食材特色</h3>
            <p className="mt-4 text-[#6E5D4F] leading-relaxed">
              我們相信好的餐飲經驗不該昂貴且繁複。在 NORDIC & PAWS，我們將北歐簡潔生活哲學融入每一道西式料理中，講究食材的原汁原味與溫馨感受。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* 卡片 1 */}
            <div className="bg-[#FDFBF7] p-8 rounded-3xl border border-[#EADBC8]/50 hover:shadow-lg transition-all duration-300 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#D9C5B2]/30 flex items-center justify-center text-[#3E3228]">
                <UtensilsCrossed className="w-6 h-6 text-[#8A9A86]" />
              </div>
              <h4 className="text-xl font-bold text-[#3E3228]">極簡西式經典料理</h4>
              <p className="text-sm text-[#6E5D4F] leading-relaxed">
                主打兼具健康與美味的經典義大利麵與舒肥排餐。沒有過多人工添加物，僅用橄欖油、海鹽與天然香草提味，讓學生與小家庭安心享受美味。
              </p>
            </div>

            {/* 卡片 2 */}
            <div className="bg-[#FDFBF7] p-8 rounded-3xl border border-[#EADBC8]/50 hover:shadow-lg transition-all duration-300 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#D9C5B2]/30 flex items-center justify-center text-[#3E3228]">
                <Leaf className="w-6 h-6 text-[#8A9A86]" />
              </div>
              <h4 className="text-xl font-bold text-[#3E3228]">在地嚴選與履歷食材</h4>
              <p className="text-sm text-[#6E5D4F] leading-relaxed">
                每日由產地直送大安區的有機小農蔬菜、生鮮蛤蜊與嚴選澳洲熟成牛排。即便是平價價位，也堅持絕不對品質妥協。
              </p>
            </div>

            {/* 卡片 3 */}
            <div className="bg-[#FDFBF7] p-8 rounded-3xl border border-[#EADBC8]/50 hover:shadow-lg transition-all duration-300 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#D9C5B2]/30 flex items-center justify-center text-[#3E3228]">
                <Dog className="w-6 h-6 text-[#8A9A86]" />
              </div>
              <h4 className="text-xl font-bold text-[#3E3228]">真誠毛孩友善空間</h4>
              <p className="text-sm text-[#6E5D4F] leading-relaxed">
                歡迎帶貓狗同行！店內備有專屬寵物水碗與寵物防滑地墊，並由專業寵物營養師研發專屬鮮食小蛋糕，讓毛孩子也能共享歡樂餐桌。
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. 用餐情境呈現 Space & Vibe */}
      <section id="space" className="py-20 bg-[#F7F2EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <h2 className="text-xs font-bold tracking-widest text-[#8A9A86] uppercase">SPACE & AMBIANCE</h2>
              <h3 className="text-3xl sm:text-4xl font-bold text-[#3E3228] leading-snug">
                大面玻璃天窗採光<br />溫暖原木質感的無壓空間
              </h3>
              <p className="text-[#6E5D4F] leading-relaxed">
                位於靜謐巷弄角落，全店採用溫潤的大麥木與白橡木傢俱，搭配 360 度大光量玻璃窗設計。清晨至午後，自然日光撒落在餐桌上，創造最適合讀書、讀書會、家庭聚餐與毛孩寫真的愜意氛圍。
              </p>

              <ul className="space-y-3 pt-2">
                {[
                  "桌距寬敞，狗狗貓咪伸展不受限",
                  "設有插座與免費 High-speed Wi-Fi（適合學生讀書）",
                  "兒童高腳椅與幼兒友善餐具完整齊備",
                  "空氣淨化器與寵物除臭全天候運作"
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-3 text-sm text-[#3E3228]">
                    <CheckCircle className="w-5 h-5 text-[#8A9A86] flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 情境圖片網格 */}
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=500&q=80" 
                alt="採光空間" 
                className="rounded-2xl shadow-md object-cover h-48 sm:h-64 w-full"
              />
              <img 
                src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=500&q=80" 
                alt="木質座位區" 
                className="rounded-2xl shadow-md object-cover h-48 sm:h-64 w-full mt-6"
              />
              <img 
                src="https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=500&q=80" 
                alt="精緻西餐" 
                className="rounded-2xl shadow-md object-cover h-48 sm:h-64 w-full"
              />
              <img 
                src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=500&q=80" 
                alt="寵物友善" 
                className="rounded-2xl shadow-md object-cover h-48 sm:h-64 w-full mt-6"
              />
            </div>

          </div>
        </div>
      </section>

      {/* 5. 模組化菜單設計 Interactive Menu */}
      <section id="menu" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold tracking-widest text-[#8A9A86] uppercase mb-2">OUR MENU</h2>
            <h3 className="text-3xl font-bold text-[#3E3228]">美味菜單列表</h3>
            <p className="mt-2 text-[#6E5D4F] text-sm">
              價格透明、品質嚴選。點擊上方分類按鈕或輸入關鍵字搜尋您的想吃的菜色！
            </p>
          </div>

          {/* 搜尋列與分類按鈕互動 */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
            
            {/* 互動按鈕選單 (Category Tabs) */}
            <div className="flex flex-wrap justify-center gap-2 w-full md:w-auto">
              {MENU_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeCategory === cat.id
                      ? 'bg-[#3E3228] text-white shadow-md'
                      : 'bg-[#F7F2EB] text-[#3E3228] hover:bg-[#EADBC8]/60'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* 關鍵字搜尋框 */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="搜尋餐點（如：松露、牛排）..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FDFBF7] border border-[#EADBC8] rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8A9A86]"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            </div>

          </div>

          {/* 菜單列表 (React 迴圈渲染) */}
          {filteredMenuItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMenuItems.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-[#FDFBF7] rounded-3xl overflow-hidden border border-[#EADBC8]/60 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
                >
                  {/* 餐點照片 */}
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    {item.isPopular && (
                      <span className="absolute top-3 left-3 bg-[#8A9A86] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                        人氣 NO.1
                      </span>
                    )}
                    <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-sm font-bold px-3 py-1 rounded-full">
                      NT$ {item.price}
                    </span>
                  </div>

                  {/* 餐點內容細節 */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-lg font-bold text-[#3E3228] leading-snug">{item.name}</h4>
                      </div>
                      
                      <p className="text-xs text-[#6E5D4F] leading-relaxed mb-4">
                        {item.description}
                      </p>
                    </div>

                    {/* 標籤列 (辣度 / 飲食類別) */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#EADBC8]/40">
                      {item.spicyLevel > 0 && (
                        <span className="inline-flex items-center text-[11px] text-red-600 bg-red-50 px-2 py-0.5 rounded-md font-medium">
                          <Flame className="w-3 h-3 mr-0.5 fill-red-600" />
                          辣度 x{item.spicyLevel}
                        </span>
                      )}
                      {item.tags.map((tag, idx) => (
                        <span key={idx} className="text-[11px] bg-[#EADBC8]/40 text-[#3E3228] px-2 py-0.5 rounded-md font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-500">
              <UtensilsCrossed className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>找不到符合「{searchQuery}」的餐點，試試其他關鍵字吧！</p>
            </div>
          )}

        </div>
      </section>

      {/* 6. 線上訂位表單 Reservation Form */}
      <section id="reservation" className="py-20 bg-[#F7F2EB]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-[#EADBC8]">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-xs font-bold tracking-widest text-[#8A9A86] uppercase block mb-1">RESERVATION</span>
              <h2 className="text-3xl font-bold text-[#3E3228]">線上預約座位</h2>
              <p className="text-sm text-[#6E5D4F] mt-2">
                歡迎預約！若需帶毛孩同行，請於備註告知毛孩品種與體型，我們將為您安排最適座位。
              </p>
            </div>

            {bookingSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-[#3E3228]">訂位成功！</h3>
                <p className="text-sm text-[#6E5D4F] max-w-md mx-auto">
                  感謝您的預約，【{booking.name}】先生/小姐！我們已收到您的訂位資訊（{booking.date} {booking.time}，{booking.adults}位大人）。簡訊確認信已發送至 {booking.phone}。
                </p>
                <button
                  onClick={() => setBookingSubmitted(false)}
                  className="mt-4 inline-block bg-[#3E3228] text-white px-6 py-2.5 rounded-full text-sm font-medium"
                >
                  再次預約 / 重新填寫
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                
                {/* 聯絡人基本資料 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-[#3E3228] uppercase mb-2">訂位人姓名 *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="例：陳大明"
                      value={booking.name}
                      onChange={(e) => setBooking({...booking, name: e.target.value})}
                      className="w-full bg-[#FDFBF7] border border-[#EADBC8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#8A9A86]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#3E3228] uppercase mb-2">聯絡電話 *</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="0912-345-678"
                      value={booking.phone}
                      onChange={(e) => setBooking({...booking, phone: e.target.value})}
                      className="w-full bg-[#FDFBF7] border border-[#EADBC8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#8A9A86]"
                    />
                  </div>
                </div>

                {/* 時間與日期 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-[#3E3228] uppercase mb-2">用餐日期 *</label>
                    <input 
                      type="date" 
                      required
                      value={booking.date}
                      onChange={(e) => setBooking({...booking, date: e.target.value})}
                      className="w-full bg-[#FDFBF7] border border-[#EADBC8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#8A9A86]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#3E3228] uppercase mb-2">用餐時段 *</label>
                    <select 
                      value={booking.time}
                      onChange={(e) => setBooking({...booking, time: e.target.value})}
                      className="w-full bg-[#FDFBF7] border border-[#EADBC8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#8A9A86]"
                    >
                      <option value="11:30">11:30 (早午餐)</option>
                      <option value="12:30">12:30 (午餐)</option>
                      <option value="14:00">14:00 (下午茶)</option>
                      <option value="17:30">17:30 (晚餐)</option>
                      <option value="18:30">18:30 (晚餐)</option>
                      <option value="19:30">19:30 (晚晚餐)</option>
                    </select>
                  </div>
                </div>

                {/* 人數與毛孩數 */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#3E3228] uppercase mb-2">大人人數</label>
                    <select 
                      value={booking.adults}
                      onChange={(e) => setBooking({...booking, adults: e.target.value})}
                      className="w-full bg-[#FDFBF7] border border-[#EADBC8] rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#8A9A86]"
                    >
                      {[1,2,3,4,5,6,7,8].map(num => (
                        <option key={num} value={num}>{num} 位</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#3E3228] uppercase mb-2">孩童人數</label>
                    <select 
                      value={booking.children}
                      onChange={(e) => setBooking({...booking, children: e.target.value})}
                      className="w-full bg-[#FDFBF7] border border-[#EADBC8] rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#8A9A86]"
                    >
                      {[0,1,2,3,4].map(num => (
                        <option key={num} value={num}>{num} 位</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#3E3228] uppercase mb-2">同行毛孩</label>
                    <select 
                      value={booking.pets}
                      onChange={(e) => setBooking({...booking, pets: e.target.value})}
                      className="w-full bg-[#FDFBF7] border border-[#EADBC8] rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#8A9A86]"
                    >
                      {[0,1,2,3].map(num => (
                        <option key={num} value={num}>{num} 隻</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 特殊需求備註 */}
                <div>
                  <label className="block text-xs font-bold text-[#3E3228] uppercase mb-2">特殊需求與毛孩備註</label>
                  <textarea 
                    rows="3"
                    placeholder="例：需準備兒童座椅 / 攜帶一隻中型柴犬，需要靠邊寬敞座位..."
                    value={booking.notes}
                    onChange={(e) => setBooking({...booking, notes: e.target.value})}
                    className="w-full bg-[#FDFBF7] border border-[#EADBC8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#8A9A86]"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#3E3228] hover:bg-[#5A493B] text-white py-4 rounded-xl font-medium shadow-md transition-all text-base"
                >
                  確認送出線上預約
                </button>

              </form>
            )}

          </div>

        </div>
      </section>

      {/* 7. 營業資訊與交通聯絡（含 Google Map） Contact & Map */}
      <section id="contact" className="py-20 bg-white border-t border-[#EADBC8]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* 具體聯絡與營業資訊 */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs font-bold tracking-widest text-[#8A9A86] uppercase block mb-1">LOCATION & HOURS</span>
                <h2 className="text-3xl font-bold text-[#3E3228]">營業資訊與交通導引</h2>
              </div>

              {/* 營業時間 */}
              <div className="bg-[#FDFBF7] p-6 rounded-2xl border border-[#EADBC8]/60 space-y-3">
                <div className="flex items-center space-x-3 text-[#8A9A86] font-bold">
                  <Clock className="w-5 h-5" />
                  <span>營業時間</span>
                </div>
                {RESTAURANT_INFO.hours.map((h, i) => (
                  <div key={i} className="flex justify-between text-sm border-b border-gray-100 pb-2 last:border-none last:pb-0">
                    <span className="text-[#3E3228] font-medium">{h.days}</span>
                    <span className="text-[#6E5D4F]">{h.time}</span>
                  </div>
                ))}
              </div>

              {/* 地址與電話 */}
              <div className="space-y-4 text-sm text-[#6E5D4F]">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-[#8A9A86] flex-shrink-0 mt-0.5" />
                  <span>{RESTAURANT_INFO.address}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-[#8A9A86] flex-shrink-0" />
                  <span>訂位專線：{RESTAURANT_INFO.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-[#8A9A86] flex-shrink-0" />
                  <span>聯絡信箱：{RESTAURANT_INFO.email}</span>
                </div>
              </div>

              {/* 交通指引 */}
              <div className="space-y-3 pt-2">
                <h4 className="font-bold text-[#3E3228] text-sm">交通方式指引：</h4>
                <div className="space-y-2 text-xs text-[#6E5D4F]">
                  <p><strong className="text-[#3E3228]">【捷運】</strong> {RESTAURANT_INFO.transport.mrt}</p>
                  <p><strong className="text-[#3E3228]">【公車】</strong> {RESTAURANT_INFO.transport.bus}</p>
                  <p><strong className="text-[#3E3228]">【停車資訊】</strong> {RESTAURANT_INFO.transport.parking}</p>
                </div>
              </div>
            </div>

            {/* Google Map 嵌入 */}
            <div className="lg:col-span-7 h-96 lg:h-auto min-h-[380px] rounded-3xl overflow-hidden shadow-lg border border-[#EADBC8]">
              <iframe
                title="Google Map"
                src={RESTAURANT_INFO.googleMapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

          </div>

        </div>
      </section>

      {/* 8. 頁尾 Footer */}
      <footer className="bg-[#3E3228] text-[#EADBC8] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 border-b border-[#5A493B] pb-8">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white tracking-wider">NORDIC & PAWS 沐光木質餐廳</h3>
              <p className="text-xs text-[#D9C5B2]">© 2026 NORDIC & PAWS Taiwan. All rights reserved.</p>
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#about" className="hover:text-white transition-colors">品牌體驗</a>
              <a href="#menu" className="hover:text-white transition-colors">美味菜單</a>
              <a href="#reservation" className="hover:text-white transition-colors">線上訂位</a>
            </div>
          </div>
          <p className="text-xs text-[#8A9A86] mt-6 text-center">
            友善提醒：攜帶毛孩請維持牽繩或使用寵物籃，共同維護舒適的日光用餐體驗。
          </p>
        </div>
      </footer>

    </div>
  );
}