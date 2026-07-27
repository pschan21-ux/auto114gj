/* =====================================================================
   auto114gj.com 다국어(i18n) 시스템
   - 지원: 한국어(원문)·영어·러시아어·중국어(간체)·베트남어·아랍어
   - 방식: 한국어 원문을 키로 하는 사전 치환 + 패턴 규칙(가격/연식/사진 등)
   - 모든 페이지에 <script src="i18n.js" defer></script> 한 줄만 넣으면 동작
   - 새 차량 페이지도 같은 템플릿이면 자동으로 번역됨
   ===================================================================== */
(function () {
  'use strict';
  var LS_KEY = 'auto114_lang';
  var LANG_META = {
    ko: { label: '한국어', flag: '🇰🇷', locale: 'ko-KR' },
    en: { label: 'English', flag: '🇺🇸', locale: 'en-US' },
    ru: { label: 'Русский', flag: '🇷🇺', locale: 'ru-RU' },
    zh: { label: '中文', flag: '🇨🇳', locale: 'zh-CN' },
    vi: { label: 'Tiếng Việt', flag: '🇻🇳', locale: 'vi-VN' },
    ar: { label: 'العربية', flag: '🇸🇦', locale: 'ar-EG' }
  };
  var ORDER = ['en', 'ru', 'zh', 'vi', 'ar']; // 사전 배열 순서

  /* ================= 사전: 한국어 → [en, ru, zh, vi, ar] ================= */
  var D = {
    /* --- 공통 내비게이션/헤더 --- */
    '차량검색': ['Search Cars', 'Поиск авто', '车辆搜索', 'Tìm xe', 'بحث عن سيارة'],
    '차량 검색': ['Car Search', 'Поиск авто', '车辆搜索', 'Tìm kiếm xe', 'البحث عن سيارة'],
    '차량 검색하기': ['Browse Cars', 'Смотреть авто', '浏览车辆', 'Xem xe', 'تصفح السيارات'],
    '내차팔기': ['Sell My Car', 'Продать авто', '卖车', 'Bán xe của tôi', 'بيع سيارتي'],
    '내차 팔기': ['Sell My Car', 'Продать авто', '卖车', 'Bán xe của tôi', 'بيع سيارتي'],
    '내차 사기': ['Buy a Car', 'Купить авто', '买车', 'Mua xe', 'شراء سيارة'],
    '대표이사소개': ['About the CEO', 'О директоре', '代表介绍', 'Giới thiệu CEO', 'عن المدير'],
    '대표이사 소개': ['About the CEO', 'О директоре', '代表介绍', 'Giới thiệu CEO', 'عن المدير'],
    '공지사항': ['Notices', 'Объявления', '公告', 'Thông báo', 'إشعارات'],
    '고객후기': ['Reviews', 'Отзывы', '客户评价', 'Đánh giá', 'التقييمات'],
    '고객 후기': ['Customer Reviews', 'Отзывы клиентов', '客户评价', 'Đánh giá của khách', 'آراء العملاء'],
    '회원가입/로그인': ['Sign Up / Login', 'Регистрация / Вход', '注册/登录', 'Đăng ký / Đăng nhập', 'تسجيل / دخول'],
    '홈': ['Home', 'Главная', '首页', 'Trang chủ', 'الرئيسية'],
    '홈페이지로': ['Go to Homepage', 'На главную', '回到首页', 'Về trang chủ', 'إلى الصفحة الرئيسية'],
    '맨 위로': ['Back to Top', 'Наверх', '回到顶部', 'Lên đầu trang', 'إلى الأعلى'],
    '유튜브': ['YouTube', 'YouTube', 'YouTube', 'YouTube', 'يوتيوب'],
    '인스타그램': ['Instagram', 'Instagram', 'Instagram', 'Instagram', 'إنستغرام'],
    '인스타': ['Instagram', 'Instagram', 'Instagram', 'Instagram', 'إنستغرام'],
    '블로그': ['Blog', 'Блог', '博客', 'Blog', 'مدونة'],
    '네이버 블로그': ['Naver Blog', 'Блог Naver', 'Naver博客', 'Blog Naver', 'مدونة نافر'],
    '카카오': ['KakaoTalk', 'KakaoTalk', 'KakaoTalk', 'KakaoTalk', 'كاكاو توك'],
    '카카오톡 상담': ['KakaoTalk Chat', 'Чат KakaoTalk', 'KakaoTalk咨询', 'Tư vấn KakaoTalk', 'استشارة كاكاو توك'],
    '💬 카카오톡 상담': ['💬 KakaoTalk Chat', '💬 Чат KakaoTalk', '💬 KakaoTalk咨询', '💬 Tư vấn KakaoTalk', '💬 استشارة كاكاو'],
    '💬 카카오': ['💬 KakaoTalk', '💬 KakaoTalk', '💬 KakaoTalk', '💬 KakaoTalk', '💬 كاكاو'],
    '카카오톡으로 빠른 상담': ['Quick chat on KakaoTalk', 'Быстрая консультация в KakaoTalk', '通过KakaoTalk快速咨询', 'Tư vấn nhanh qua KakaoTalk', 'استشارة سريعة عبر كاكاو توك'],
    '전화상담': ['Call Us', 'Позвонить', '电话咨询', 'Gọi điện', 'اتصل بنا'],
    '전화 상담': ['Phone Consultation', 'Телефонная консультация', '电话咨询', 'Tư vấn qua điện thoại', 'استشارة هاتفية'],
    '📞 전화상담': ['📞 Call Us', '📞 Позвонить', '📞 电话咨询', '📞 Gọi điện', '📞 اتصل بنا'],
    '📞 전화 상담 · 010-3644-3759': ['📞 Call · +82-10-3644-3759', '📞 Тел · +82-10-3644-3759', '📞 电话 · +82-10-3644-3759', '📞 Gọi · +82-10-3644-3759', '📞 اتصال · +82-10-3644-3759'],
    '상담': ['Contact', 'Консультация', '咨询', 'Tư vấn', 'استشارة'],
    '상담 / 오시는 길': ['Contact / Directions', 'Контакты / Как добраться', '咨询/交通指南', 'Liên hệ / Đường đi', 'اتصال / الاتجاهات'],
    '오시는 길': ['Directions', 'Как добраться', '交通指南', 'Đường đi', 'الاتجاهات'],
    '더보기': ['More', 'Ещё', '更多', 'Xem thêm', 'المزيد'],
    '이전': ['Prev', 'Назад', '上一页', 'Trước', 'السابق'],
    '다음': ['Next', 'Далее', '下一页', 'Sau', 'التالي'],
    '로딩 중...': ['Loading...', 'Загрузка...', '加载中...', 'Đang tải...', 'جارٍ التحميل...'],

    /* --- 메인 히어로/소개 --- */
    '★ 업력 18년 · 광주 중고차 전문기업 · 당일매입 당일입금 · 박수현 대표 직통 010-3644-3759': ['★ 18 years in business · Gwangju used-car specialists · Same-day purchase & payment · CEO direct +82-10-3644-3759', '★ 18 лет на рынке · Специалисты по авто с пробегом в Кванджу · Выкуп и оплата в день обращения · Прямой номер +82-10-3644-3759', '★ 18年经验 · 光州二手车专业企业 · 当日收购当日付款 · 代表直线 +82-10-3644-3759', '★ 18 năm kinh nghiệm · Chuyên xe cũ Gwangju · Mua và thanh toán trong ngày · Hotline +82-10-3644-3759', '★ خبرة 18 عامًا · متخصصون في السيارات المستعملة في غوانغجو · شراء ودفع في نفس اليوم · هاتف مباشر +82-10-3644-3759'],
    '광주 중고차 전문 · 업력 18년': ['Gwangju Used Car Experts · 18 Years', 'Эксперты по авто с пробегом · 18 лет', '光州二手车专家 · 18年', 'Chuyên xe cũ Gwangju · 18 năm', 'خبراء السيارات المستعملة · 18 عامًا'],
    '당신을 위한': ['Truly good', 'Действительно', '为您精选的', 'Xe cũ', 'سيارات مستعملة'],
    '진짜 좋은': ['used cars', 'хорошие авто', '真正的好', 'thật sự tốt', 'جيدة حقًا'],
    '중고차': ['for you', 'для вас', '二手车', 'dành cho bạn', 'من أجلك'],
    '2008년부터 18년간 광주·전남 중고차 시장을 지켜온': ['Serving the Gwangju & Jeonnam used-car market for 18 years since 2008.', 'С 2008 года — 18 лет на рынке авто Кванджу и Чоннама.', '自2008年起，18年来深耕光州·全南二手车市场。', 'Phục vụ thị trường xe cũ Gwangju & Jeonnam suốt 18 năm từ 2008.', 'نخدم سوق السيارات المستعملة في غوانغجو وجولانام منذ 2008 — 18 عامًا.'],
    '(주)오토일일사광주입니다.': ['This is Auto114 Gwangju Co., Ltd.', 'Это Auto114 Gwangju Co., Ltd.', '我们是Auto114光州(株)。', 'Chúng tôi là Auto114 Gwangju Co., Ltd.', 'نحن شركة Auto114 غوانغجو.'],
    '직접매입 · 직접판매 · 정직 · 신뢰 · 투명한 거래를 약속드립니다.': ['Direct purchase · Direct sales · Honesty · Trust · Transparent deals.', 'Прямой выкуп · Прямые продажи · Честность · Доверие · Прозрачные сделки.', '直接收购 · 直接销售 · 诚实 · 信赖 · 透明交易。', 'Mua trực tiếp · Bán trực tiếp · Trung thực · Tin cậy · Giao dịch minh bạch.', 'شراء مباشر · بيع مباشر · صدق · ثقة · معاملات شفافة.'],
    '원하는 조건으로 차량을 찾아보세요': ['Find a car that fits your needs', 'Найдите авто по вашим критериям', '按您的条件查找车辆', 'Tìm xe theo điều kiện bạn muốn', 'ابحث عن سيارة حسب رغبتك'],
    '차량명': ['Model Name', 'Модель', '车型名称', 'Tên xe', 'اسم الطراز'],
    '제조사': ['Manufacturer', 'Производитель', '制造商', 'Hãng xe', 'الشركة المصنعة'],
    '제조사 선택': ['Select Manufacturer', 'Выберите марку', '选择制造商', 'Chọn hãng xe', 'اختر الشركة'],
    '차종': ['Type', 'Тип', '车型', 'Loại xe', 'النوع'],
    '차종 선택': ['Select Type', 'Выберите тип', '选择车型', 'Chọn loại xe', 'اختر النوع'],
    '연식': ['Year', 'Год выпуска', '年式', 'Đời xe', 'سنة الصنع'],
    '연식 전체': ['All Years', 'Все годы', '全部年式', 'Tất cả các đời', 'كل السنوات'],
    '연료': ['Fuel', 'Топливо', '燃料', 'Nhiên liệu', 'الوقود'],
    '연료 전체': ['All Fuels', 'Любое топливо', '全部燃料', 'Tất cả nhiên liệu', 'كل أنواع الوقود'],
    '국산차': ['Domestic', 'Корейские', '国产车', 'Xe nội địa', 'سيارات محلية'],
    '수입차': ['Imported', 'Импортные', '进口车', 'Xe nhập khẩu', 'سيارات مستوردة'],
    '화물·특장': ['Truck/Special', 'Грузовые/спец.', '货车/特种车', 'Xe tải/chuyên dụng', 'شاحنات/خاصة'],
    '🔍 검색하기': ['🔍 Search', '🔍 Поиск', '🔍 搜索', '🔍 Tìm kiếm', '🔍 بحث'],
    '2020년 이하': ['2020 or earlier', '2020 и ранее', '2020年以前', '2020 trở về trước', '2020 وما قبل'],
    '예) 그랜저, 카니발, K5...': ['e.g. Grandeur, Carnival, K5...', 'напр. Grandeur, Carnival, K5...', '例如 Grandeur, Carnival, K5...', 'VD: Grandeur, Carnival, K5...', 'مثال: Grandeur, Carnival, K5...'],

    /* --- 트러스트바/스탯 --- */
    '항상 가족같이': ['Like family, always', 'Всегда как семья', '始终如家人', 'Luôn như người nhà', 'دائمًا كالعائلة'],
    '친절히 모시겠습니다': ['We serve you kindly', 'Обслужим доброжелательно', '热情为您服务', 'Phục vụ tận tình', 'نخدمكم بلطف'],
    '부담없이 언제든지': ['Anytime, no pressure', 'В любое время', '随时无压力', 'Bất cứ lúc nào', 'في أي وقت وبدون تردد'],
    '전화주십시오': ['Give us a call', 'Позвоните нам', '请来电', 'Hãy gọi cho chúng tôi', 'اتصلوا بنا'],
    '정직·신뢰·투명': ['Honesty · Trust · Transparency', 'Честность · Доверие · Прозрачность', '诚实·信赖·透明', 'Trung thực · Tin cậy · Minh bạch', 'صدق · ثقة · شفافية'],
    '안심 거래 보장': ['Safe deals guaranteed', 'Гарантия безопасной сделки', '保障安心交易', 'Đảm bảo giao dịch an tâm', 'ضمان معاملة آمنة'],
    '당일매입 당일입금': ['Same-day purchase & payment', 'Выкуп и оплата в тот же день', '当日收购当日付款', 'Mua và thanh toán trong ngày', 'شراء ودفع في نفس اليوم'],
    '당일매입 · 당일입금': ['Same-day purchase · payment', 'Выкуп · оплата в тот же день', '当日收购 · 当日付款', 'Mua · thanh toán trong ngày', 'شراء · دفع في نفس اليوم'],
    '당일매입 · 당일입금 가능': ['Same-day purchase & payment available', 'Выкуп и оплата в тот же день', '可当日收购、当日付款', 'Có thể mua và thanh toán trong ngày', 'شراء ودفع في نفس اليوم ممكن'],
    '빠르고 확실한 처리': ['Fast, reliable handling', 'Быстро и надёжно', '快速可靠的处理', 'Xử lý nhanh chóng, chắc chắn', 'معالجة سريعة وموثوقة'],
    '창업 이래 업력': ['Years in business', 'Лет на рынке', '创业以来', 'Năm hoạt động', 'سنوات الخبرة'],
    '현재 보유 차량': ['Cars in stock', 'Авто в наличии', '现有车辆', 'Xe hiện có', 'سيارات متوفرة'],
    '고객 만족도': ['Customer satisfaction', 'Удовлетворённость клиентов', '客户满意度', 'Mức hài lòng của khách', 'رضا العملاء'],
    '당일': ['Same day', 'В тот же день', '当日', 'Trong ngày', 'نفس اليوم'],
    '매입 · 입금 처리': ['Purchase · payment', 'Выкуп · оплата', '收购·付款处理', 'Mua · thanh toán', 'شراء · دفع'],
    '18년의 신뢰': ['18 Years of Trust', '18 лет доверия', '18年的信赖', '18 năm tin cậy', '18 عامًا من الثقة'],
    '대': ['cars', 'авто', '辆', 'chiếc', 'سيارة'],
    '년': ['yrs', 'лет', '年', 'năm', 'سنة'],

    /* --- 차량 목록/카드 --- */
    '차량매물': ['Our Inventory', 'Наши автомобили', '在售车辆', 'Xe đang bán', 'سياراتنا المعروضة'],
    '차량 목록': ['Car List', 'Список авто', '车辆列表', 'Danh sách xe', 'قائمة السيارات'],
    '차량목록': ['Car List', 'Список авто', '车辆列表', 'Danh sách xe', 'قائمة السيارات'],
    '← 차량 목록': ['← Car List', '← Список авто', '← 车辆列表', '← Danh sách xe', '← قائمة السيارات'],
    '← 차량 목록으로': ['← Back to Car List', '← К списку авто', '← 返回车辆列表', '← Về danh sách xe', '← العودة إلى القائمة'],
    '직접매입으로 검증된 매물 · 총 40대 보유': ['Directly purchased, verified stock', 'Проверенные авто прямого выкупа', '直接收购的认证车源', 'Xe đã kiểm định, mua trực tiếp', 'سيارات موثوقة تم شراؤها مباشرة'],
    '보유 차량 전체 목록': ['Full Inventory List', 'Полный список авто', '全部在库车辆', 'Toàn bộ danh sách xe', 'القائمة الكاملة للسيارات'],
    '자세히 보기': ['View Details', 'Подробнее', '查看详情', 'Xem chi tiết', 'عرض التفاصيل'],
    '대의 차량이 있습니다': ['cars available', 'авто в наличии', '辆车在售', 'xe đang có', 'سيارة متوفرة'],
    '무사고': ['No accidents', 'Без ДТП', '无事故', 'Không tai nạn', 'بدون حوادث'],
    '무사고(단순교환제외)': ['No accidents (excl. simple panel swaps)', 'Без ДТП (кроме замены панелей)', '无事故(单纯更换除外)', 'Không tai nạn (trừ thay thế đơn giản)', 'بدون حوادث (باستثناء استبدال بسيط)'],
    '무사고 (단순수리 있음)': ['No accidents (minor repairs)', 'Без ДТП (мелкий ремонт)', '无事故(有简单维修)', 'Không tai nạn (có sửa chữa nhỏ)', 'بدون حوادث (إصلاحات بسيطة)'],
    '무사고 (단순수리 제외)': ['No accidents (excl. minor repairs)', 'Без ДТП (кроме мелкого ремонта)', '无事故(单纯维修除外)', 'Không tai nạn (trừ sửa chữa nhỏ)', 'بدون حوادث (باستثناء إصلاحات بسيطة)'],
    '무사고 (압류/저당 0건)': ['No accidents (0 liens/mortgages)', 'Без ДТП (без арестов/залогов)', '无事故(无查封/抵押)', 'Không tai nạn (0 tịch biên/thế chấp)', 'بدون حوادث (بدون حجز/رهن)'],
    '무사고(단순교환제외) (압류/저당 0건)': ['No accidents (excl. simple swaps, 0 liens)', 'Без ДТП (кроме замены панелей, без залогов)', '无事故(单纯更换除外，无查封/抵押)', 'Không tai nạn (trừ thay thế, 0 thế chấp)', 'بدون حوادث (باستثناء استبدال بسيط، بدون رهن)'],
    '사고이력 있음': ['Has accident history', 'Есть история ДТП', '有事故记录', 'Có lịch sử tai nạn', 'لها سجل حوادث'],
    '사고이력 있음 (성능점검기록부로 골격 손상 여부 확인 가능)': ['Accident history (frame damage verifiable via inspection report)', 'История ДТП (повреждения рамы — см. акт осмотра)', '有事故记录(可通过检测记录确认骨架损伤)', 'Có lịch sử tai nạn (kiểm tra khung xe qua biên bản)', 'سجل حوادث (يمكن التحقق من الهيكل عبر تقرير الفحص)'],
    '사고': ['Accident', 'ДТП', '事故', 'Tai nạn', 'حادث'],
    '렌트 이력 있음': ['Former rental car', 'Ранее в аренде', '有租赁记录', 'Từng là xe cho thuê', 'كانت سيارة مؤجرة'],
    '가솔린': ['Gasoline', 'Бензин', '汽油', 'Xăng', 'بنزين'],
    '디젤': ['Diesel', 'Дизель', '柴油', 'Dầu diesel', 'ديزل'],
    '하이브리드': ['Hybrid', 'Гибрид', '混合动力', 'Hybrid', 'هجين'],
    '⛽ 가솔린': ['⛽ Gasoline', '⛽ Бензин', '⛽ 汽油', '⛽ Xăng', '⛽ بنزين'],
    '🛢️ 디젤': ['🛢️ Diesel', '🛢️ Дизель', '🛢️ 柴油', '🛢️ Diesel', '🛢️ ديزل'],
    '🔋 하이브리드': ['🔋 Hybrid', '🔋 Гибрид', '🔋 混合动力', '🔋 Hybrid', '🔋 هجين'],
    '⛽ 하이브리드': ['⛽ Hybrid', '⛽ Гибрид', '⛽ 混合动力', '⛽ Hybrid', '⛽ هجين'],
    '승용': ['Passenger', 'Легковой', '轿车', 'Xe con', 'سيارة ركاب'],
    '승합': ['Van/Minibus', 'Микроавтобус', '面包车', 'Xe khách', 'حافلة صغيرة'],
    '화물': ['Truck', 'Грузовой', '货车', 'Xe tải', 'شاحنة'],
    '승용 (중형)': ['Passenger (mid-size)', 'Легковой (средний)', '轿车(中型)', 'Xe con (cỡ trung)', 'سيارة ركاب (متوسطة)'],
    '수동': ['Manual', 'Механика', '手动', 'Số sàn', 'يدوي'],
    '자동': ['Automatic', 'Автомат', '自动', 'Số tự động', 'أوتوماتيك'],
    '자동(7단DCT)': ['Automatic (7-sp DCT)', 'Автомат (7-ст. DCT)', '自动(7速DCT)', 'Tự động (7 cấp DCT)', 'أوتوماتيك (7 سرعات DCT)'],
    '4륜구동': ['4WD', 'Полный привод', '四驱', 'Dẫn động 4 bánh', 'دفع رباعي'],

    /* --- 상세페이지 기본정보 --- */
    '차량 기본 정보': ['Vehicle Information', 'Информация об авто', '车辆基本信息', 'Thông tin cơ bản của xe', 'معلومات السيارة الأساسية'],
    '주행거리': ['Mileage', 'Пробег', '行驶里程', 'Số km đã đi', 'المسافة المقطوعة'],
    '배기량': ['Displacement', 'Объём двигателя', '排气量', 'Dung tích xy-lanh', 'سعة المحرك'],
    '변속기': ['Transmission', 'Коробка передач', '变速箱', 'Hộp số', 'ناقل الحركة'],
    '색상': ['Color', 'Цвет', '颜色', 'Màu sắc', 'اللون'],
    '색상 / 사고': ['Color / Accident', 'Цвет / ДТП', '颜色/事故', 'Màu / Tai nạn', 'اللون / الحوادث'],
    '차량번호': ['Plate No.', 'Гос. номер', '车牌号', 'Biển số', 'رقم اللوحة'],
    '사고이력': ['Accident History', 'История ДТП', '事故记录', 'Lịch sử tai nạn', 'سجل الحوادث'],
    '이력확인': ['History Check', 'Проверка истории', '记录查询', 'Kiểm tra lịch sử', 'فحص السجل'],
    '용도이력': ['Usage History', 'История использования', '用途记录', 'Lịch sử sử dụng', 'سجل الاستخدام'],
    '압류 / 저당': ['Seizure / Mortgage', 'Арест / залог', '扣押/抵押', 'Tịch thu / Thế chấp', 'حجز / رهن'],
    '없음 (0 / 0 건)': ['None (0 / 0)', 'Нет (0 / 0)', '无(0/0)', 'Không (0 / 0)', 'لا يوجد (0 / 0)'],
    '보관장소': ['Location', 'Местонахождение', '存放地点', 'Nơi để xe', 'الموقع'],
    '최초등록': ['First registered', 'Первая регистрация', '首次登记', 'Đăng ký lần đầu', 'أول تسجيل'],
    '광주 서구 풍암자동차매매단지': ['Pungam Auto Complex, Seo-gu, Gwangju', 'Автокомплекс Пунам, Со-гу, Кванджу', '光州西区丰岩汽车交易园区', 'Khu ô tô Pungam, Seo-gu, Gwangju', 'مجمع بونغام للسيارات، غوانغجو'],
    '주요 옵션': ['Key Options', 'Основные опции', '主要配置', 'Trang bị chính', 'التجهيزات الرئيسية'],
    '특이사항': ['Notes', 'Примечания', '特别事项', 'Ghi chú', 'ملاحظات'],
    '해당차량 출고 시 장착한 선택옵션': ['Factory-installed optional equipment', 'Заводские опции автомобиля', '出厂时选装的配置', 'Tùy chọn lắp từ nhà máy', 'تجهيزات اختيارية من المصنع'],
    '성능점검기록부 제공 가능': ['Inspection report available', 'Акт осмотра предоставляется', '可提供性能检测记录', 'Có biên bản kiểm định', 'تقرير الفحص متاح'],
    '타지역 탁송 가능 (별도 비용)': ['Nationwide delivery available (extra cost)', 'Доставка по стране (за доп. плату)', '可跨地区托运(费用另计)', 'Giao xe toàn quốc (phí riêng)', 'توصيل لجميع المناطق (بتكلفة إضافية)'],
    '구매 전 꼭 확인하세요': ['Please check before buying', 'Проверьте перед покупкой', '购买前请务必确认', 'Vui lòng kiểm tra trước khi mua', 'يرجى التحقق قبل الشراء'],
    '· 실제 차량 상태는 직접 방문 확인을 권장드립니다.': ['· We recommend visiting in person to check the actual condition.', '· Рекомендуем лично осмотреть автомобиль.', '· 建议亲自到店确认实车状态。', '· Khuyến nghị đến xem xe trực tiếp.', '· ننصح بزيارة شخصية لمعاينة السيارة.'],
    '· 차량 인도 전 성능·상태 점검 기록부를 제공해드립니다.': ['· An official inspection report is provided before delivery.', '· Перед передачей выдаётся акт технического осмотра.', '· 交车前提供性能·状态检测记录表。', '· Cung cấp biên bản kiểm định trước khi giao xe.', '· يُقدَّم تقرير فحص رسمي قبل التسليم.'],
    '· 보관장소: 광주광역시 서구 매월1로62번길24 (풍암자동차매매단지)': ['· Location: 24, Maewol 1-ro 62beon-gil, Seo-gu, Gwangju (Pungam Auto Complex)', '· Адрес: Кванджу, Со-гу, Мэволь 1-ро 62бон-гиль, 24 (автокомплекс Пунам)', '· 地点：光州广域市西区梅月1路62街24 (丰岩汽车交易园区)', '· Địa điểm: 24, Maewol 1-ro 62beon-gil, Seo-gu, Gwangju (Khu ô tô Pungam)', '· الموقع: غوانغجو، سو-غو، مايول 1-رو 62، رقم 24 (مجمع بونغام)'],
    '· 사고이력이 있는 차량으로, 주요 골격 손상 여부는 성능점검기록부로 투명하게 확인하실 수 있습니다.': ['· This car has accident history; frame damage can be transparently verified in the inspection report.', '· У авто есть история ДТП; состояние силовой структуры видно в акте осмотра.', '· 该车有事故记录，主要骨架损伤情况可通过检测记录表透明确认。', '· Xe có lịch sử tai nạn; hư hại khung xe được ghi minh bạch trong biên bản kiểm định.', '· للسيارة سجل حوادث؛ يمكن التحقق من أضرار الهيكل بشفافية عبر تقرير الفحص.'],
    '차량 상태는 현장 확인을 권장합니다': ['On-site inspection recommended', 'Рекомендуем осмотр на месте', '建议现场确认车况', 'Nên kiểm tra xe tại chỗ', 'يُنصح بالمعاينة في الموقع'],
    '가격은 부가세 포함 기준입니다': ['Prices include VAT', 'Цены с НДС', '价格含增值税', 'Giá đã bao gồm VAT', 'الأسعار شاملة الضريبة'],

    /* --- 상세 버튼/모달 --- */
    '총 구매비용 계산': ['Total Cost Calculator', 'Калькулятор полной стоимости', '总购车费用计算', 'Tính tổng chi phí mua', 'حاسبة التكلفة الإجمالية'],
    '총 구매비용': ['Total Cost', 'Полная стоимость', '总购车费用', 'Tổng chi phí', 'التكلفة الإجمالية'],
    '성능점검상태기록부': ['Inspection Report', 'Акт техосмотра', '性能检测记录表', 'Biên bản kiểm định', 'تقرير الفحص الفني'],
    '사고이력정보': ['Accident History Info', 'История ДТП', '事故记录信息', 'Thông tin lịch sử tai nạn', 'معلومات سجل الحوادث'],
    '중고자동차 성능·상태점검기록부': ['Used Car Performance & Condition Inspection Report', 'Акт проверки состояния подержанного автомобиля', '二手车性能·状态检测记录表', 'Biên bản kiểm định tình trạng xe cũ', 'تقرير فحص حالة السيارة المستعملة'],
    '할부 계산': ['Financing Calculator', 'Кредитный калькулятор', '分期计算', 'Tính trả góp', 'حاسبة التقسيط'],
    '차량가격': ['Car Price', 'Цена авто', '车辆价格', 'Giá xe', 'سعر السيارة'],
    '적용': ['Apply', 'Применить', '应用', 'Áp dụng', 'تطبيق'],
    '거주지': ['Region', 'Регион', '居住地', 'Nơi cư trú', 'المنطقة'],
    '광주': ['Gwangju', 'Кванджу', '光州', 'Gwangju', 'غوانغجو'],
    '전남': ['Jeonnam', 'Чоннам', '全南', 'Jeonnam', 'جولانام'],
    '서울': ['Seoul', 'Сеул', '首尔', 'Seoul', 'سيول'],
    '경기': ['Gyeonggi', 'Кёнги', '京畿', 'Gyeonggi', 'كيونغي'],
    '기타': ['Other', 'Другое', '其他', 'Khác', 'أخرى'],
    '취득세': ['Acquisition Tax', 'Налог на приобретение', '取得税', 'Thuế trước bạ', 'ضريبة الاقتناء'],
    '승용 : 7.5%': ['Passenger: 7.5%', 'Легковой: 7,5%', '轿车：7.5%', 'Xe con: 7,5%', 'سيارة ركاب: 7.5%'],
    '화물 : 5.5%': ['Truck: 5.5%', 'Грузовой: 5,5%', '货车：5.5%', 'Xe tải: 5,5%', 'شاحنة: 5.5%'],
    '공채매입비': ['Public Bond Cost', 'Гос. облигации', '公债购买费', 'Phí trái phiếu', 'تكلفة السندات العامة'],
    '이전등록대행': ['Registration Agency Fee', 'Услуги переоформления', '过户代办费', 'Phí dịch vụ sang tên', 'رسوم وكالة نقل الملكية'],
    '성능보험료': ['Warranty Insurance', 'Страховка гарантии', '性能保险费', 'Bảo hiểm kiểm định', 'تأمين الضمان'],
    '총 구입비용': ['Total Purchase Cost', 'Итоговая стоимость', '总购车费用', 'Tổng chi phí mua', 'إجمالي تكلفة الشراء'],
    '할부이자율': ['Interest Rate', 'Процентная ставка', '分期利率', 'Lãi suất trả góp', 'معدل الفائدة'],
    '보유금액(선수금)': ['Down Payment', 'Первоначальный взнос', '首付款', 'Tiền trả trước', 'الدفعة الأولى'],
    '할부기간': ['Term', 'Срок кредита', '分期期限', 'Thời hạn trả góp', 'مدة التقسيط'],
    '개월': ['months', 'мес.', '个月', 'tháng', 'شهر'],
    '월 할부금': ['Monthly Payment', 'Ежемесячный платёж', '月供', 'Trả góp hàng tháng', 'القسط الشهري'],
    '총 할부금': ['Total Financed', 'Итого по кредиту', '分期总额', 'Tổng tiền trả góp', 'إجمالي التقسيط'],
    '할부원금 / 이자': ['Principal / Interest', 'Основной долг / проценты', '本金/利息', 'Gốc / Lãi', 'أصل المبلغ / الفائدة'],
    '원': ['KRW', 'вон', '韩元', 'KRW', 'وون'],
    '만원': ['×10,000 KRW', '×10 000 вон', '万韩元', '×10.000 KRW', '×10,000 وون'],
    '위 금액은 참고 자료로 실제 구매비용과 다소 차이가 있을 수 있습니다.': ['Figures are for reference; actual costs may differ.', 'Суммы приблизительные; фактические расходы могут отличаться.', '以上金额仅供参考，实际费用可能略有差异。', 'Số liệu chỉ để tham khảo; chi phí thực tế có thể khác.', 'الأرقام للاسترشاد فقط؛ قد تختلف التكاليف الفعلية.'],
    '정확한 금액은 해당 지역 차량 등록과에 문의하세요.': ['For exact amounts, contact your local vehicle registration office.', 'Точные суммы уточняйте в местном отделе регистрации ТС.', '准确金额请咨询当地车辆登记部门。', 'Liên hệ cơ quan đăng ký xe địa phương để biết số tiền chính xác.', 'للمبالغ الدقيقة، راجع مكتب تسجيل المركبات المحلي.'],
    '실제 이전등록비는 5만원 가량의 여유금액을 준비하는 것이 좋습니다.': ['We recommend preparing about 50,000 KRW extra for registration.', 'Рекомендуем иметь запас около 50 000 вон на переоформление.', '建议为过户额外准备约5万韩元。', 'Nên chuẩn bị thêm khoảng 50.000 KRW cho việc sang tên.', 'ننصح بتجهيز نحو 50,000 وون إضافية للتسجيل.'],
    '공채할인율은 등록지역마다 편차가 존재하며, 동일지역도 일 기준으로 변동될 수 있습니다.': ['Bond discount rates vary by region and may change daily.', 'Ставки дисконта по облигациям зависят от региона и меняются ежедневно.', '公债折扣率因地区而异，同一地区也可能每日变动。', 'Tỷ lệ chiết khấu trái phiếu khác nhau theo khu vực và có thể thay đổi hàng ngày.', 'تختلف نسب خصم السندات حسب المنطقة وقد تتغير يوميًا.'],
    '대출시 이용 또는 할부차량의 경우 대략적인 금액을 확인 하실 수 있습니다.': ['For loans or financed cars, you can check approximate amounts here.', 'Для кредита или рассрочки можно оценить примерные суммы.', '贷款或分期购车时可查看大致金额。', 'Có thể xem số tiền ước tính khi vay hoặc mua trả góp.', 'يمكنك التحقق من المبالغ التقريبية للقروض أو التقسيط.'],
    '위 자료는 참고 자료이며, 정확한 금액은 금융기관으로 문의하세요.': ['For reference only; contact your financial institution for exact figures.', 'Данные справочные; точные суммы — в вашем банке.', '以上仅供参考，准确金额请咨询金融机构。', 'Chỉ để tham khảo; liên hệ tổ chức tài chính để biết chính xác.', 'للاسترشاد فقط؛ راجع مؤسستك المالية للأرقام الدقيقة.'],

    /* --- 보증 안내 --- */
    '보증 안내': ['Warranty Guide', 'Гарантия', '保修指南', 'Hướng dẫn bảo hành', 'دليل الضمان'],
    '보증 내용': ['Warranty Coverage', 'Условия гарантии', '保修内容', 'Nội dung bảo hành', 'تغطية الضمان'],
    '보증 기간 / 보증 거리': ['Warranty Period / Distance', 'Срок / пробег гарантии', '保修期限/保修里程', 'Thời hạn / quãng đường bảo hành', 'مدة / مسافة الضمان'],
    '보증유형': ['Warranty Type', 'Тип гарантии', '保修类型', 'Loại bảo hành', 'نوع الضمان'],
    '보험사보증 (KB손보)': ['Insurer warranty (KB Insurance)', 'Гарантия страховщика (KB)', '保险公司保修(KB损保)', 'Bảo hành qua bảo hiểm (KB)', 'ضمان شركة التأمين (KB)'],
    '자동차관리법 시행규칙 제120조의 규정에 따라 별지 제82호서식 『중고자동차성능·상태점검기록부』를 발행한 성능·상태점검자 및 매매업자는 아래의 보증기간 또는 보증거리 이내에 중고자동차성능·상태점검기록부에 기재된 내용과 자동차의 실제 성능·상태가 다른 경우 계약 또는 관계법령에 따라 매수인에 대하여 책임을 집니다.': [
      'Under Article 120 of the Enforcement Rules of the Motor Vehicle Management Act, the inspector and dealer who issued the Used Car Performance & Condition Inspection Report (Form No. 82) are liable to the buyer, per the contract and applicable laws, if the car\'s actual condition differs from the report within the warranty period or distance below.',
      'Согласно ст. 120 Правил применения Закона об управлении автотранспортом, инспектор и дилер, выдавшие Акт проверки состояния (форма № 82), несут ответственность перед покупателем по договору и законодательству, если фактическое состояние автомобиля отличается от указанного в акте в пределах гарантийного срока или пробега.',
      '根据《汽车管理法》施行规则第120条，签发第82号格式《二手车性能·状态检测记录表》的检测人员及经销商，在下述保修期或保修里程内，如车辆实际性能·状态与记录表所载内容不符，将依合同或相关法规对买方承担责任。',
      'Theo Điều 120 Quy tắc thi hành Luật Quản lý ô tô, người kiểm định và đại lý phát hành Biên bản kiểm định (Mẫu số 82) chịu trách nhiệm với người mua theo hợp đồng và pháp luật nếu tình trạng thực tế của xe khác với biên bản trong thời hạn hoặc quãng đường bảo hành dưới đây.',
      'وفقًا للمادة 120 من لائحة تنفيذ قانون إدارة المركبات، يتحمل الفاحص والتاجر اللذان أصدرا تقرير فحص حالة السيارة المستعملة (النموذج رقم 82) المسؤولية تجاه المشتري بموجب العقد والقوانين إذا اختلفت حالة السيارة الفعلية عن التقرير ضمن مدة أو مسافة الضمان أدناه.'],
    '자동차 인도일로부터 30일, 자동차 인도일로부터 2천 킬로미터 (그 중 먼저 도래한 것을 적용합니다.)': ['30 days or 2,000 km from delivery, whichever comes first.', '30 дней или 2 000 км с даты передачи — что наступит раньше.', '自交车之日起30天或2000公里（以先到者为准）。', '30 ngày hoặc 2.000 km kể từ ngày giao xe, tùy điều kiện nào đến trước.', '30 يومًا أو 2,000 كم من تاريخ التسليم، أيهما يأتي أولًا.'],
    '- 중고자동차매매업자를 통해 차량을 구입하실 경우 반드시 "중고자동차성능·상태점검기록부"를 교부 받으셔야 하며 매매업자는 반드시 의무 교부 하여야 합니다.': ['- When buying through a used-car dealer, you must receive the official inspection report; dealers are legally required to provide it.', '- При покупке у дилера вы обязаны получить акт осмотра; дилер обязан его выдать.', '- 通过二手车经销商购车时，必须领取《性能·状态检测记录表》，经销商有义务提供。', '- Khi mua qua đại lý xe cũ, bạn phải nhận biên bản kiểm định; đại lý bắt buộc phải cung cấp.', '- عند الشراء عبر تاجر سيارات مستعملة، يجب أن تتسلم تقرير الفحص الرسمي؛ والتاجر ملزم بتقديمه.'],
    '- 중고자동차의 구조·장치 등의 성능·상태를 고지하지 아니한 자, 거짓으로 점검하거나 거짓 고지한 자는 「자동차관리법」제80조제4호의2 내지 제80조4호의3에 따라 2년 이하의 징역 또는 500만원 이하의 벌금에 처합니다.': ['- Failing to disclose or falsely reporting a used car\'s condition is punishable by up to 2 years in prison or a fine of up to 5,000,000 KRW under the Motor Vehicle Management Act.', '- Сокрытие или ложное указание состояния автомобиля наказывается лишением свободы до 2 лет или штрафом до 5 000 000 вон по Закону об управлении автотранспортом.', '- 未告知或虚假告知二手车性能·状态者，依《汽车管理法》可处2年以下有期徒刑或500万韩元以下罚金。', '- Không khai báo hoặc khai báo sai tình trạng xe có thể bị phạt tù đến 2 năm hoặc phạt tiền đến 5.000.000 KRW theo Luật Quản lý ô tô.', '- عدم الإفصاح عن حالة السيارة أو الإبلاغ الكاذب يعاقب عليه بالسجن حتى سنتين أو غرامة حتى 5,000,000 وون بموجب قانون إدارة المركبات.'],
    '위 게재한 내용은 2010년 3월 31일 현재 사항이며 관계법령의 개정이 있을 수 있으므로 차량 구입일 현재의 법령을 확인하시기 바랍니다.': ['The above reflects the law as of March 31, 2010; regulations may have changed, so please check the laws in effect on your purchase date.', 'Информация актуальна на 31.03.2010; законодательство могло измениться — проверьте нормы на дату покупки.', '以上内容为2010年3月31日的规定，相关法规可能已修订，请确认购车当日的法规。', 'Nội dung trên theo luật ngày 31/3/2010; quy định có thể thay đổi, vui lòng kiểm tra luật hiện hành khi mua xe.', 'المحتوى أعلاه وفق القانون في 31 مارس 2010؛ قد تتغير اللوائح، يرجى التحقق من القوانين السارية عند الشراء.'],
    '책임 및 법적 고지사항': ['Liability & Legal Notice', 'Ответственность и правовая информация', '责任及法律告知', 'Trách nhiệm & thông báo pháp lý', 'المسؤولية والإشعار القانوني'],
    '1. (주)오토일일사광주에 등록된 차량매물에 대해 (주)오토일일사광주는 등록서비스만을 제공하고 있습니다.': ['1. Auto114 Gwangju Co., Ltd. provides listing services only for vehicles registered on this site.', '1. Auto114 Gwangju предоставляет только услуги размещения объявлений.', '1. 对于本站登记的车辆，Auto114光州(株)仅提供登记服务。', '1. Auto114 Gwangju chỉ cung cấp dịch vụ đăng tin cho các xe trên trang này.', '1. توفر شركة Auto114 غوانغجو خدمات الإدراج فقط للسيارات المسجلة على الموقع.'],
    '2. (주)오토일일사광주 통신판매의 중재자로써 매매 및 매매과정에 있어서 어떠한 책임도 지지 않습니다.': ['2. As an intermediary, Auto114 Gwangju bears no liability for transactions or the sales process.', '2. Как посредник, Auto114 Gwangju не несёт ответственности за сделки и процесс продажи.', '2. 作为交易中介，Auto114光州(株)对买卖及交易过程不承担任何责任。', '2. Là bên trung gian, Auto114 Gwangju không chịu trách nhiệm về giao dịch mua bán.', '2. بصفتها وسيطًا، لا تتحمل Auto114 غوانغجو أي مسؤولية عن المعاملات أو عملية البيع.'],
    '3. 상기사항에 의거 매매거래시 반드시 판매자와 직접 통화하여 정보사항을 확인하시기 바랍니다.': ['3. Please verify all details directly with the seller by phone before any transaction.', '3. Перед сделкой обязательно уточняйте информацию напрямую у продавца.', '3. 交易前请务必与卖方直接通话确认相关信息。', '3. Trước khi giao dịch, vui lòng gọi trực tiếp cho người bán để xác nhận thông tin.', '3. يرجى التحقق من جميع التفاصيل مباشرة مع البائع هاتفيًا قبل أي معاملة.'],

    /* --- 내차팔기 섹션 --- */
    '감가 없는 투명한 시세로 내 차를 파세요': ['Sell your car at a transparent, fair market price', 'Продайте авто по честной рыночной цене', '以透明无折价的行情卖掉您的车', 'Bán xe với giá thị trường minh bạch', 'بِع سيارتك بسعر سوق عادل وشفاف'],
    '당일 방문 · 당일 입금. 감가 없는 투명한 시세 산정으로 내 차의 제값을 받으세요.': ['Same-day visit, same-day payment. Get your car\'s true value with transparent pricing.', 'Выезд и оплата в тот же день. Честная оценка без занижения.', '当日上门、当日付款。透明估价，让您的车卖出应有价值。', 'Đến xem và thanh toán trong ngày. Định giá minh bạch, đúng giá trị xe.', 'زيارة ودفع في نفس اليوم. احصل على القيمة الحقيقية لسيارتك بتسعير شفاف.'],
    '전문 감정사 직접 방문': ['Expert appraiser visits you', 'Выезд профессионального оценщика', '专业评估师上门', 'Chuyên gia thẩm định đến tận nơi', 'خبير تقييم يزورك'],
    '당일 방문 견적': ['Same-day visit & quote', 'Оценка в день обращения', '当日上门估价', 'Báo giá trong ngày', 'معاينة وتسعير في نفس اليوم'],
    '계약 당일 바로 입금': ['Payment on contract day', 'Оплата в день договора', '签约当日付款', 'Thanh toán ngay ngày ký', 'الدفع يوم العقد'],
    '당일 입금 완료': ['Same-day payment', 'Оплата в тот же день', '当日付款完成', 'Thanh toán trong ngày', 'دفع في نفس اليوم'],
    '복잡한 서류 대행': ['We handle the paperwork', 'Оформим все документы', '代办繁琐手续', 'Lo mọi giấy tờ', 'نتولى جميع الأوراق'],
    '계약 및 서류처리': ['Contract & documents', 'Договор и документы', '合同及手续办理', 'Hợp đồng & giấy tờ', 'العقد والمستندات'],
    '💰 무료 견적 신청하기': ['💰 Get a Free Quote', '💰 Бесплатная оценка', '💰 免费估价申请', '💰 Nhận báo giá miễn phí', '💰 اطلب تقييمًا مجانيًا'],
    '📋 무료 견적 신청': ['📋 Free Quote Request', '📋 Заявка на оценку', '📋 免费估价申请', '📋 Yêu cầu báo giá miễn phí', '📋 طلب تقييم مجاني'],
    '간편 견적 신청': ['Quick Quote Request', 'Быстрая заявка на оценку', '快捷估价申请', 'Yêu cầu báo giá nhanh', 'طلب تسعير سريع'],
    '견적 신청': ['Quote Request', 'Заявка на оценку', '估价申请', 'Yêu cầu báo giá', 'طلب تسعير'],
    '견적 신청하기': ['Request a Quote', 'Запросить оценку', '申请估价', 'Gửi yêu cầu báo giá', 'اطلب تسعيرًا'],
    '매입 견적 신청': ['Sell-Car Quote Request', 'Заявка на выкуп', '收购估价申请', 'Yêu cầu báo giá thu mua', 'طلب تقييم للشراء'],
    '차량 정보 입력 후 신청': ['Enter car details and apply', 'Заполните данные авто', '填写车辆信息后申请', 'Nhập thông tin xe rồi gửi', 'أدخل بيانات السيارة ثم قدّم الطلب'],
    '✅ 견적 신청이 완료되었습니다!': ['✅ Quote request submitted!', '✅ Заявка отправлена!', '✅ 估价申请已完成！', '✅ Đã gửi yêu cầu báo giá!', '✅ تم إرسال طلب التسعير!'],
    '소유자명': ['Owner Name', 'Имя владельца', '车主姓名', 'Tên chủ xe', 'اسم المالك'],
    '연락처': ['Phone', 'Телефон', '联系电话', 'Số điện thoại', 'رقم الهاتف'],
    '차량명 (선택)': ['Model (optional)', 'Модель (необязательно)', '车型(可选)', 'Tên xe (tùy chọn)', 'الطراز (اختياري)'],
    '예: 투싼 하이브리드': ['e.g. Tucson Hybrid', 'напр. Tucson Hybrid', '例：途胜混动', 'VD: Tucson Hybrid', 'مثال: توسان هايبرد'],
    '예) 85,000': ['e.g. 85,000', 'напр. 85 000', '例：85,000', 'VD: 85.000', 'مثال: 85,000'],
    '옵션, 차량 상태, 기타': ['Options, condition, etc.', 'Опции, состояние и др.', '配置、车况及其他', 'Trang bị, tình trạng xe, v.v.', 'التجهيزات والحالة وغير ذلك'],
    '차량 사진 (선택, 최대 3장)': ['Photos (optional, max 3)', 'Фото (до 3 шт.)', '车辆照片(可选，最多3张)', 'Ảnh xe (tùy chọn, tối đa 3)', 'صور السيارة (اختياري، 3 كحد أقصى)'],
    '📷 사진 첨부하기': ['📷 Attach Photos', '📷 Прикрепить фото', '📷 添加照片', '📷 Đính kèm ảnh', '📷 إرفاق صور'],
    'JPG/PNG 가능 · 업로드 시 자동으로 크기가 조정됩니다': ['JPG/PNG accepted · resized automatically', 'JPG/PNG · размер меняется автоматически', '支持JPG/PNG · 上传时自动调整大小', 'Hỗ trợ JPG/PNG · tự động chỉnh kích thước', 'JPG/PNG مقبولة · يُعدَّل الحجم تلقائيًا'],
    '개인정보 수집 동의(필수)': ['Consent to data collection (required)', 'Согласие на обработку данных (обязательно)', '同意收集个人信息(必填)', 'Đồng ý thu thập thông tin (bắt buộc)', 'الموافقة على جمع البيانات (إلزامي)'],
    '직접 매입한 검증된 차량만 판매합니다. 투명한 이력과 정확한 상태 고지로 안심 구매를 보장합니다.': ['We only sell verified cars we purchased directly. Transparent history and accurate disclosure guarantee safe buying.', 'Продаём только проверенные авто прямого выкупа. Прозрачная история и точное описание гарантируют безопасную покупку.', '只销售直接收购的认证车辆。透明的记录与准确的车况告知，保障安心购车。', 'Chỉ bán xe đã kiểm định do chúng tôi mua trực tiếp. Lịch sử minh bạch, khai báo chính xác, mua xe an tâm.', 'نبيع فقط سيارات موثوقة اشتريناها مباشرة. سجل شفاف وإفصاح دقيق يضمنان شراءً آمنًا.'],
    '차량 구매': ['Buying a Car', 'Покупка авто', '购车', 'Mua xe', 'شراء سيارة'],
    '차량 판매(매입)': ['Selling (We Buy)', 'Продажа (выкуп)', '卖车(收购)', 'Bán xe (thu mua)', 'بيع (نشتري)'],
    '구매 안내': ['Buying Guide', 'Как купить', '购车指南', 'Hướng dẫn mua xe', 'دليل الشراء'],
    '서비스 안내': ['Services', 'Услуги', '服务指南', 'Dịch vụ', 'الخدمات'],
    '할부 · 카드결제 · 신용보증 가능': ['Financing · card payment · credit guarantee available', 'Рассрочка · оплата картой · кредитное поручительство', '可分期·刷卡·信用担保', 'Hỗ trợ trả góp · thẻ · bảo lãnh tín dụng', 'تقسيط · دفع بالبطاقة · ضمان ائتماني'],

    /* --- CEO 소개 --- */
    '2008년부터 18년간 광주·전남 중고차 시장을 지켜온 (주)오토일일사광주입니다.': ['Auto114 Gwangju — serving the Gwangju & Jeonnam market for 18 years since 2008.', 'Auto114 Gwangju — 18 лет на рынке Кванджу и Чоннама с 2008 года.', 'Auto114光州——自2008年起深耕光州·全南市场18年。', 'Auto114 Gwangju — 18 năm phục vụ thị trường Gwangju & Jeonnam từ 2008.', 'Auto114 غوانغجو — 18 عامًا في خدمة السوق منذ 2008.'],
    '2008년 창업 이래 광주·전남 최고의 중고차 전문기업으로 성장해왔습니다': ['Since 2008, we\'ve grown into the leading used-car company in Gwangju & Jeonnam', 'С 2008 года мы стали ведущей компанией по авто с пробегом в регионе', '自2008年创业以来，成长为光州·全南顶尖的二手车企业', 'Từ 2008, chúng tôi đã trở thành công ty xe cũ hàng đầu Gwangju & Jeonnam', 'منذ 2008 نمونا لنصبح الشركة الرائدة للسيارات المستعملة في المنطقة'],
    '2008년 창업 이래 18년간 광주·전남 중고차 시장에서 정직과 신뢰를 바탕으로 고객과 함께해왔습니다. 항상 가족같이 친절하게, 최고의 거래를 약속드립니다.': ['For 18 years since 2008, we\'ve served customers with honesty and trust. Always kind, like family — we promise you the best deal.', '18 лет с 2008 года мы работаем честно и надёжно. Всегда доброжелательны, как семья — обещаем лучшую сделку.', '自2008年创业18年来，以诚实与信赖服务客户。始终如家人般亲切，承诺最好的交易。', 'Suốt 18 năm từ 2008, chúng tôi phục vụ khách hàng bằng sự trung thực và tin cậy. Luôn thân thiện như gia đình — cam kết giao dịch tốt nhất.', 'منذ 2008 وعلى مدى 18 عامًا نخدم عملاءنا بصدق وثقة. دائمًا ودودون كالعائلة — نعدكم بأفضل صفقة.'],
    '박수현 대표이사': ['CEO Park Su-hyun', 'Директор Пак Су Хён', '代表理事 朴洙贤', 'CEO Park Su-hyun', 'المدير باك سو هيون'],
    '박 수 현': ['Park Su-hyun', 'Пак Су Хён', '朴洙贤', 'Park Su-hyun', 'باك سو هيون'],
    '박수현 |': ['Park Su-hyun |', 'Пак Су Хён |', '朴洙贤 |', 'Park Su-hyun |', 'باك سو هيون |'],
    'CEO · 대표이사': ['CEO', 'Генеральный директор', 'CEO · 代表理事', 'CEO · Giám đốc', 'المدير التنفيذي'],
    '대표이사 · (주)오토일일사광주': ['CEO · Auto114 Gwangju Co., Ltd.', 'Директор · Auto114 Gwangju', '代表理事 · Auto114光州(株)', 'CEO · Auto114 Gwangju', 'المدير · Auto114 غوانغجو'],
    '박수현 대표이사 직통': ['CEO direct line', 'Прямой номер директора', '代表直线', 'Số trực tiếp của CEO', 'الخط المباشر للمدير'],
    '대표 직통': ['CEO Direct', 'Прямой номер', '代表直线', 'Hotline CEO', 'الخط المباشر'],
    'MOBILE · 대표직통': ['MOBILE · CEO direct', 'МОБ. · прямой номер', '手机 · 代表直线', 'DI ĐỘNG · CEO', 'جوال · مباشر'],
    'TEL · 대표전화': ['TEL · Main line', 'ТЕЛ · офис', '电话 · 代表电话', 'ĐT · Số chính', 'هاتف · الخط الرئيسي'],
    'KAKAO · 카카오톡 상담': ['KAKAO · KakaoTalk chat', 'KAKAO · чат KakaoTalk', 'KAKAO · KakaoTalk咨询', 'KAKAO · Tư vấn KakaoTalk', 'كاكاو · استشارة'],
    '주요 경력': ['Career Highlights', 'Основные вехи карьеры', '主要经历', 'Kinh nghiệm chính', 'أبرز المسيرة المهنية'],
    '대우그룹 입사 · 대우전자 음향기공장 근무': ['Joined Daewoo Group · Daewoo Electronics audio plant', 'Daewoo Group · завод аудиотехники Daewoo Electronics', '加入大宇集团 · 大宇电子音响工厂', 'Gia nhập Daewoo Group · Nhà máy âm thanh Daewoo Electronics', 'انضم إلى مجموعة دايو · مصنع دايو للإلكترونيات'],
    '대우전자 국내영업본부 광주지사 근무': ['Daewoo Electronics, Gwangju branch, domestic sales', 'Daewoo Electronics, филиал в Кванджу', '大宇电子国内营业本部光州分社', 'Daewoo Electronics, chi nhánh Gwangju', 'دايو للإلكترونيات، فرع غوانغجو'],
    '대우자동차 광주영업소 관리과 근무': ['Daewoo Motors Gwangju office, administration', 'Daewoo Motors, офис в Кванджу', '大宇汽车光州营业所管理科', 'Daewoo Motors, văn phòng Gwangju', 'دايو موتورز، مكتب غوانغجو'],
    '대우자동차 무등영업소 관리과장 역임': ['Admin manager, Daewoo Motors Mudeung office', 'Начальник отдела, Daewoo Motors (Мудын)', '大宇汽车无等营业所管理科长', 'Trưởng phòng quản lý, Daewoo Motors Mudeung', 'مدير إداري، دايو موتورز موديونغ'],
    '대우자동차 택시영업소장 역임': ['Head of taxi sales office, Daewoo Motors', 'Руководитель офиса такси, Daewoo Motors', '大宇汽车出租车营业所长', 'Trưởng văn phòng taxi, Daewoo Motors', 'رئيس مكتب التاكسي، دايو موتورز'],
    '대우자동차 광산지점장 역임': ['Branch manager, Daewoo Motors Gwangsan', 'Директор филиала Кванcан, Daewoo Motors', '大宇汽车光山支店长', 'Giám đốc chi nhánh Gwangsan, Daewoo Motors', 'مدير فرع كوانغسان، دايو موتورز'],
    '대우자동차 익산지점장 역임': ['Branch manager, Daewoo Motors Iksan', 'Директор филиала Иксан, Daewoo Motors', '大宇汽车益山支店长', 'Giám đốc chi nhánh Iksan, Daewoo Motors', 'مدير فرع إيكسان، دايو موتورز'],
    '대우자동차 인천부평지점장 역임': ['Branch manager, Daewoo Motors Incheon Bupyeong', 'Директор филиала Пупхён (Инчхон)', '大宇汽车仁川富平支店长', 'Giám đốc chi nhánh Bupyeong Incheon', 'مدير فرع بوبيونغ إنتشون'],
    '대우자동차 전남본부 채권팀장 역임': ['Credit team lead, Daewoo Motors Jeonnam HQ', 'Руководитель кредитного отдела, Чоннам', '大宇汽车全南本部债权组长', 'Trưởng nhóm tín dụng, Daewoo Motors Jeonnam', 'رئيس فريق الائتمان، دايو موتورز جولانام'],
    '가온누리(대우자동차 산하 중고차 전문기업) 광주점 신규개설 · 지점장 역임': ['Opened & managed Gwangju branch of Gaonnuri (Daewoo used-car unit)', 'Открыл и возглавил филиал Gaonnuri в Кванджу', '开设并任Gaonnuri(大宇旗下二手车企业)光州店店长', 'Mở và quản lý chi nhánh Gwangju của Gaonnuri', 'افتتح وأدار فرع غوانغجو لشركة جاونوري'],
    '(주)오토일일사광주 설립': ['Founded Auto114 Gwangju Co., Ltd.', 'Основал Auto114 Gwangju', '创立Auto114光州(株)', 'Thành lập Auto114 Gwangju', 'أسس شركة Auto114 غوانغجو'],
    '언제든지 편하게 연락 주십시오': ['Feel free to contact us anytime', 'Обращайтесь в любое время', '欢迎随时联系', 'Hãy liên hệ bất cứ lúc nào', 'تواصلوا معنا في أي وقت'],
    '24시간 언제든지': ['24 hours, anytime', 'Круглосуточно', '24小时随时', '24 giờ, mọi lúc', 'على مدار الساعة'],

    /* --- 후기/공지/회원 --- */
    '실제 고객님들이 직접 작성하신 후기입니다': ['Reviews written by real customers', 'Отзывы реальных клиентов', '真实客户撰写的评价', 'Đánh giá do khách hàng thực viết', 'تقييمات كتبها عملاء حقيقيون'],
    '후기 작성하기': ['Write a Review', 'Написать отзыв', '写评价', 'Viết đánh giá', 'اكتب تقييمًا'],
    '고객 후기 작성': ['Write a Review', 'Написать отзыв', '撰写评价', 'Viết đánh giá', 'كتابة تقييم'],
    '후기 등록': ['Submit Review', 'Отправить отзыв', '提交评价', 'Gửi đánh giá', 'إرسال التقييم'],
    '후기 내용': ['Review', 'Текст отзыва', '评价内容', 'Nội dung đánh giá', 'نص التقييم'],
    '구매 경험을 공유해주세요.': ['Share your buying experience.', 'Поделитесь опытом покупки.', '请分享您的购车体验。', 'Hãy chia sẻ trải nghiệm mua xe.', 'شاركنا تجربة الشراء.'],
    '아직 등록된 후기가 없습니다.': ['No reviews yet.', 'Отзывов пока нет.', '暂无评价。', 'Chưa có đánh giá nào.', 'لا توجد تقييمات بعد.'],
    '첫 번째 후기를 작성해 주세요!': ['Be the first to write a review!', 'Оставьте первый отзыв!', '快来写第一条评价吧！', 'Hãy là người đầu tiên đánh giá!', 'كن أول من يكتب تقييمًا!'],
    '후기가 등록되었습니다! 감사합니다.': ['Your review has been posted. Thank you!', 'Отзыв опубликован! Спасибо.', '评价已提交！谢谢。', 'Đã đăng đánh giá! Cảm ơn bạn.', 'تم نشر تقييمك! شكرًا لك.'],
    '전체보기 / 작성하기': ['View All / Write', 'Все отзывы / написать', '查看全部/撰写', 'Xem tất cả / Viết', 'عرض الكل / كتابة'],
    '📢 공지사항': ['📢 Notices', '📢 Объявления', '📢 公告', '📢 Thông báo', '📢 إشعارات'],
    '💬 고객 후기': ['💬 Customer Reviews', '💬 Отзывы', '💬 客户评价', '💬 Đánh giá', '💬 آراء العملاء'],
    '평점': ['Rating', 'Оценка', '评分', 'Điểm đánh giá', 'التقييم'],
    '날짜': ['Date', 'Дата', '日期', 'Ngày', 'التاريخ'],
    '번호': ['No.', '№', '编号', 'Số', 'رقم'],
    '제목': ['Title', 'Заголовок', '标题', 'Tiêu đề', 'العنوان'],
    '이름': ['Name', 'Имя', '姓名', 'Tên', 'الاسم'],
    '이메일': ['Email', 'Эл. почта', '邮箱', 'Email', 'البريد الإلكتروني'],
    '이메일 주소': ['Email Address', 'Адрес эл. почты', '邮箱地址', 'Địa chỉ email', 'عنوان البريد'],
    '이메일 문의': ['Email Us', 'Написать на почту', '邮件咨询', 'Liên hệ qua email', 'راسلنا بالبريد'],
    '비밀번호': ['Password', 'Пароль', '密码', 'Mật khẩu', 'كلمة المرور'],
    '비밀번호 확인': ['Confirm Password', 'Подтвердите пароль', '确认密码', 'Xác nhận mật khẩu', 'تأكيد كلمة المرور'],
    '비밀번호(8자 이상)': ['Password (8+ characters)', 'Пароль (от 8 символов)', '密码(8位以上)', 'Mật khẩu (từ 8 ký tự)', 'كلمة المرور (8 أحرف فأكثر)'],
    '비밀번호 찾기': ['Forgot Password', 'Восстановить пароль', '找回密码', 'Quên mật khẩu', 'استعادة كلمة المرور'],
    '로그인': ['Login', 'Вход', '登录', 'Đăng nhập', 'تسجيل الدخول'],
    '로그아웃': ['Logout', 'Выход', '退出登录', 'Đăng xuất', 'تسجيل الخروج'],
    '회원가입': ['Sign Up', 'Регистрация', '注册', 'Đăng ký', 'إنشاء حساب'],
    '회원가입 완료': ['Registration Complete', 'Регистрация завершена', '注册完成', 'Đăng ký thành công', 'اكتمل التسجيل'],
    '가입 완료! 로그인해 주세요.': ['Done! Please log in.', 'Готово! Войдите в аккаунт.', '注册完成！请登录。', 'Hoàn tất! Vui lòng đăng nhập.', 'تم! يرجى تسجيل الدخول.'],
    '로그인 완료!': ['Logged in!', 'Вы вошли!', '登录成功！', 'Đã đăng nhập!', 'تم تسجيل الدخول!'],
    '아이디 또는 비밀번호가 올바르지 않습니다.': ['Incorrect ID or password.', 'Неверный логин или пароль.', '账号或密码不正确。', 'Sai tài khoản hoặc mật khẩu.', 'المعرف أو كلمة المرور غير صحيحة.'],
    '이미 가입된 이메일입니다.': ['This email is already registered.', 'Эта почта уже зарегистрирована.', '该邮箱已注册。', 'Email này đã được đăng ký.', 'هذا البريد مسجل بالفعل.'],
    '가입된 정보를 찾을 수 없습니다.': ['No matching account found.', 'Аккаунт не найден.', '未找到注册信息。', 'Không tìm thấy tài khoản.', 'لم يتم العثور على الحساب.'],
    '가입 시 입력한 이름': ['Name used at sign-up', 'Имя при регистрации', '注册时填写的姓名', 'Tên khi đăng ký', 'الاسم عند التسجيل'],
    '가입 시 입력한 이메일': ['Email used at sign-up', 'Почта при регистрации', '注册时填写的邮箱', 'Email khi đăng ký', 'البريد عند التسجيل'],
    '가입하신 이름과 이메일을 입력하시면': ['Enter your registered name and email to', 'Введите имя и почту, чтобы', '输入注册的姓名和邮箱即可', 'Nhập tên và email đã đăng ký để', 'أدخل الاسم والبريد المسجلين لكي'],
    '비밀번호를 확인할 수 있습니다.': ['view your password.', 'узнать пароль.', '查看密码。', 'xem mật khẩu.', 'تتمكن من رؤية كلمة المرور.'],
    '재입력': ['Re-enter', 'Повторите', '再次输入', 'Nhập lại', 'أعد الإدخال'],
    '마이페이지': ['My Page', 'Личный кабинет', '我的页面', 'Trang của tôi', 'صفحتي'],
    '관리자': ['Admin', 'Администратор', '管理员', 'Quản trị viên', 'المشرف'],
    '회원 관리': ['Member Management', 'Управление пользователями', '会员管理', 'Quản lý thành viên', 'إدارة الأعضاء'],
    '공지사항 관리': ['Notice Management', 'Управление объявлениями', '公告管理', 'Quản lý thông báo', 'إدارة الإشعارات'],
    '고객 후기 관리': ['Review Management', 'Управление отзывами', '评价管理', 'Quản lý đánh giá', 'إدارة التقييمات'],
    '대시보드': ['Dashboard', 'Панель управления', '仪表盘', 'Bảng điều khiển', 'لوحة التحكم'],
    '홍길동': ['John Doe', 'Иван Иванов', '张三', 'Nguyễn Văn A', 'فلان الفلاني'],

    /* --- 푸터 --- */
    '(주)오토일일사광주': ['Auto114 Gwangju Co., Ltd.', 'Auto114 Gwangju Co., Ltd.', 'Auto114光州(株)', 'Auto114 Gwangju Co., Ltd.', 'شركة Auto114 غوانغجو'],
    '(주)오토일일사광주 · AUTO 114 GWANGJU': ['Auto114 Gwangju Co., Ltd. · AUTO 114 GWANGJU', 'Auto114 Gwangju · AUTO 114 GWANGJU', 'Auto114光州(株) · AUTO 114 GWANGJU', 'Auto114 Gwangju · AUTO 114 GWANGJU', 'Auto114 غوانغجو · AUTO 114 GWANGJU'],
    '대표자:': ['CEO:', 'Директор:', '代表:', 'Giám đốc:', 'المدير:'],
    '주소:': ['Address:', 'Адрес:', '地址:', 'Địa chỉ:', 'العنوان:'],
    '사업자등록번호:': ['Business Reg. No.:', 'Рег. номер компании:', '营业执照号:', 'Mã số kinh doanh:', 'رقم السجل التجاري:'],
    '개업일:': ['Established:', 'Дата основания:', '开业日期:', 'Ngày thành lập:', 'تاريخ التأسيس:'],
    '2008년 05월 01일 (업력 18년)': ['May 1, 2008 (18 years)', '1 мая 2008 (18 лет)', '2008年5月1日(18年)', '01/05/2008 (18 năm)', '1 مايو 2008 (18 عامًا)'],
    '광주광역시 서구 매월1로62번길24': ['24, Maewol 1-ro 62beon-gil, Seo-gu, Gwangju', 'Кванджу, Со-гу, Мэволь 1-ро 62бон-гиль, 24', '光州广域市西区梅月1路62街24', '24, Maewol 1-ro 62beon-gil, Seo-gu, Gwangju', 'غوانغجو، سو-غو، مايول 1-رو 62، رقم 24'],
    '광주광역시 서구 매월1로62번길24 · 풍암자동차매매단지': ['24, Maewol 1-ro 62beon-gil, Seo-gu, Gwangju · Pungam Auto Complex', 'Кванджу, Мэволь 1-ро 62бон-гиль, 24 · автокомплекс Пунам', '光州西区梅月1路62街24 · 丰岩汽车交易园区', '24, Maewol 1-ro 62beon-gil, Gwangju · Khu ô tô Pungam', 'غوانغجو، مايول 1-رو 62، رقم 24 · مجمع بونغام'],
    '이용약관': ['Terms of Service', 'Условия использования', '使用条款', 'Điều khoản sử dụng', 'شروط الاستخدام'],
    '개인정보처리방침': ['Privacy Policy', 'Политика конфиденциальности', '隐私政策', 'Chính sách bảo mật', 'سياسة الخصوصية'],
    '당신을 위한 진짜 좋은 중고차 · © 2026 (주)오토일일사광주. All Rights Reserved.': ['Truly good used cars for you · © 2026 Auto114 Gwangju Co., Ltd. All Rights Reserved.', 'Действительно хорошие авто для вас · © 2026 Auto114 Gwangju. Все права защищены.', '为您精选的好二手车 · © 2026 Auto114光州(株)。版权所有。', 'Xe cũ thật sự tốt dành cho bạn · © 2026 Auto114 Gwangju. Mọi quyền được bảo lưu.', 'سيارات مستعملة جيدة حقًا · © 2026 Auto114 غوانغجو. جميع الحقوق محفوظة.'],
    '© 2026 (주)오토일일사광주. All Rights Reserved.': ['© 2026 Auto114 Gwangju Co., Ltd. All Rights Reserved.', '© 2026 Auto114 Gwangju. Все права защищены.', '© 2026 Auto114光州(株)。版权所有。', '© 2026 Auto114 Gwangju. Mọi quyền được bảo lưu.', '© 2026 Auto114 غوانغجو. جميع الحقوق محفوظة.'],
    '로고': ['Logo', 'Логотип', '标志', 'Logo', 'الشعار'],
    '(주)오토일일사광주 로고': ['Auto114 Gwangju logo', 'Логотип Auto114 Gwangju', 'Auto114光州标志', 'Logo Auto114 Gwangju', 'شعار Auto114 غوانغجو'],
    '(주)오토일일사광주 - 당신을 위한 진짜 좋은 중고차': ['Auto114 Gwangju - Truly good used cars for you', 'Auto114 Gwangju — действительно хорошие авто для вас', 'Auto114光州 - 为您精选的好二手车', 'Auto114 Gwangju - Xe cũ thật sự tốt cho bạn', 'Auto114 غوانغجو - سيارات مستعملة جيدة حقًا'],
    '당신을 위한 진짜 좋은 중고차 · (주)오토일일사광주': ['Truly good used cars for you · Auto114 Gwangju', 'Действительно хорошие авто · Auto114 Gwangju', '为您精选的好二手车 · Auto114光州', 'Xe cũ thật sự tốt · Auto114 Gwangju', 'سيارات مستعملة جيدة حقًا · Auto114 غوانغجو'],

    /* --- 색상 --- */
    '흰색': ['White', 'Белый', '白色', 'Trắng', 'أبيض'],
    '흰색(진주색)': ['White (pearl)', 'Белый (перламутр)', '白色(珍珠)', 'Trắng (ngọc trai)', 'أبيض (لؤلؤي)'],
    '검정': ['Black', 'Чёрный', '黑色', 'Đen', 'أسود'],
    '검정색': ['Black', 'Чёрный', '黑色', 'Đen', 'أسود'],
    '회색': ['Gray', 'Серый', '灰色', 'Xám', 'رمادي'],
    '진회색': ['Dark gray', 'Тёмно-серый', '深灰色', 'Xám đậm', 'رمادي داكن'],
    '미색': ['Ivory', 'Слоновая кость', '米色', 'Màu kem', 'عاجي'],
    '빨강': ['Red', 'Красный', '红色', 'Đỏ', 'أحمر'],
    '파랑': ['Blue', 'Синий', '蓝色', 'Xanh dương', 'أزرق'],
    '파랑(남색,곤색)': ['Blue (navy)', 'Синий (тёмно-синий)', '蓝色(藏青)', 'Xanh (navy)', 'أزرق (كحلي)'],
    '파랑 (남색/곤색)': ['Blue (navy)', 'Синий (тёмно-синий)', '蓝色(藏青)', 'Xanh (navy)', 'أزرق (كحلي)'],
    '초록(연두)': ['Green (light)', 'Зелёный (салатовый)', '绿色(浅绿)', 'Xanh lá (nhạt)', 'أخضر (فاتح)'],
    '회색 / 무사고(단순교환제외)': ['Gray / No accidents (excl. simple swaps)', 'Серый / без ДТП', '灰色 / 无事故(单纯更换除外)', 'Xám / Không tai nạn', 'رمادي / بدون حوادث'],

    /* --- 옵션명 --- */
    '에어컨': ['Air conditioning', 'Кондиционер', '空调', 'Điều hòa', 'مكيف هواء'],
    '자동 에어컨': ['Auto A/C', 'Климат-контроль', '自动空调', 'Điều hòa tự động', 'مكيف أوتوماتيكي'],
    '풀오토 에어컨': ['Full-auto A/C', 'Полный климат-контроль', '全自动空调', 'Điều hòa tự động hoàn toàn', 'مكيف أوتوماتيكي كامل'],
    '파워윈도우': ['Power windows', 'Электростеклоподъёмники', '电动车窗', 'Cửa kính điện', 'نوافذ كهربائية'],
    '파워 윈도우': ['Power windows', 'Электростеклоподъёмники', '电动车窗', 'Cửa kính điện', 'نوافذ كهربائية'],
    '파워 도어록': ['Power door locks', 'Центральный замок', '电动门锁', 'Khóa cửa điện', 'أقفال أبواب كهربائية'],
    '파워 스티어링 휠': ['Power steering', 'Гидроусилитель руля', '助力转向', 'Trợ lực lái', 'مقود معزز'],
    'ABS': ['ABS', 'ABS', 'ABS防抱死', 'ABS', 'نظام ABS'],
    '브레이크 잠김 방지(ABS)': ['Anti-lock brakes (ABS)', 'Антиблокировочная система (ABS)', '防抱死制动(ABS)', 'Chống bó cứng phanh (ABS)', 'مكابح مانعة للانغلاق (ABS)'],
    '브레이크 잠김방지(ABS)': ['Anti-lock brakes (ABS)', 'Антиблокировочная система (ABS)', '防抱死制动(ABS)', 'Chống bó cứng phanh (ABS)', 'مكابح مانعة للانغلاق (ABS)'],
    '미끄럼 방지(TCS)': ['Traction control (TCS)', 'Антипробуксовка (TCS)', '牵引力控制(TCS)', 'Chống trượt (TCS)', 'نظام التحكم بالجر (TCS)'],
    '구동력 제어(TCS)': ['Traction control (TCS)', 'Антипробуксовка (TCS)', '牵引力控制(TCS)', 'Kiểm soát lực kéo (TCS)', 'نظام التحكم بالجر (TCS)'],
    '차체자세 제어장치(ESC)': ['Stability control (ESC)', 'Система стабилизации (ESC)', '车身稳定控制(ESC)', 'Cân bằng điện tử (ESC)', 'نظام الثبات (ESC)'],
    '에어백(운전석)': ['Airbag (driver)', 'Подушка (водитель)', '气囊(驾驶席)', 'Túi khí (ghế lái)', 'وسادة هوائية (السائق)'],
    '에어백(운전석, 동승석)': ['Airbags (front)', 'Подушки (передние)', '气囊(前排)', 'Túi khí (hàng ghế trước)', 'وسائد هوائية (أمامية)'],
    '에어백(사이드)': ['Side airbags', 'Боковые подушки', '侧气囊', 'Túi khí bên', 'وسائد جانبية'],
    '에어백(커튼)': ['Curtain airbags', 'Шторки безопасности', '帘式气囊', 'Túi khí rèm', 'وسائد ستائرية'],
    '에어백(사이드/커튼)': ['Side/curtain airbags', 'Боковые/шторки', '侧/帘式气囊', 'Túi khí bên/rèm', 'وسائد جانبية/ستائرية'],
    '가죽시트': ['Leather seats', 'Кожаные сиденья', '真皮座椅', 'Ghế da', 'مقاعد جلدية'],
    '가죽 시트': ['Leather seats', 'Кожаные сиденья', '真皮座椅', 'Ghế da', 'مقاعد جلدية'],
    '천연 가죽시트 패키지': ['Genuine leather seat package', 'Пакет: натуральная кожа', '真皮座椅套装', 'Gói ghế da thật', 'باقة مقاعد جلد طبيعي'],
    '열선시트(앞좌석)': ['Heated seats (front)', 'Подогрев сидений (перед)', '加热座椅(前排)', 'Ghế sưởi (trước)', 'مقاعد مدفأة (أمامية)'],
    '열선시트(앞좌석, 뒷좌석)': ['Heated seats (front & rear)', 'Подогрев сидений (перед и зад)', '加热座椅(前后排)', 'Ghế sưởi (trước & sau)', 'مقاعد مدفأة (أمامية وخلفية)'],
    '통풍시트(운전석)': ['Ventilated seat (driver)', 'Вентиляция сиденья (водитель)', '通风座椅(驾驶席)', 'Ghế thông gió (ghế lái)', 'مقعد مهوّى (السائق)'],
    '통풍시트(운전석, 동승석)': ['Ventilated seats (front)', 'Вентиляция сидений (перед)', '通风座椅(前排)', 'Ghế thông gió (trước)', 'مقاعد مهوّاة (أمامية)'],
    '통풍시트(뒷좌석)': ['Ventilated seats (rear)', 'Вентиляция сидений (зад)', '通风座椅(后排)', 'Ghế thông gió (sau)', 'مقاعد مهوّاة (خلفية)'],
    '전동시트(운전석)': ['Power seat (driver)', 'Электросиденье (водитель)', '电动座椅(驾驶席)', 'Ghế chỉnh điện (lái)', 'مقعد كهربائي (السائق)'],
    '전동시트(운전석, 동승석)': ['Power seats (front)', 'Электросиденья (перед)', '电动座椅(前排)', 'Ghế chỉnh điện (trước)', 'مقاعد كهربائية (أمامية)'],
    '메모리 시트(운전석)': ['Memory seat (driver)', 'Память сиденья (водитель)', '记忆座椅(驾驶席)', 'Ghế nhớ vị trí (lái)', 'مقعد بذاكرة (السائق)'],
    '마사지 시트': ['Massage seats', 'Массажные сиденья', '按摩座椅', 'Ghế mát-xa', 'مقاعد تدليك'],
    '열선·통풍시트': ['Heated/ventilated seats', 'Подогрев/вентиляция сидений', '加热/通风座椅', 'Ghế sưởi/thông gió', 'مقاعد مدفأة/مهوّاة'],
    '열선 스티어링 휠': ['Heated steering wheel', 'Подогрев руля', '方向盘加热', 'Vô-lăng sưởi', 'مقود مدفأ'],
    '열선스티어링휠': ['Heated steering wheel', 'Подогрев руля', '方向盘加热', 'Vô-lăng sưởi', 'مقود مدفأ'],
    '전동 조절 스티어링 휠': ['Power-adjustable steering wheel', 'Электрорегулировка руля', '电动调节方向盘', 'Vô-lăng chỉnh điện', 'مقود كهربائي الضبط'],
    '스티어링 휠 리모컨': ['Steering wheel controls', 'Кнопки на руле', '方向盘遥控', 'Nút điều khiển trên vô-lăng', 'أزرار تحكم بالمقود'],
    '패들 시프트': ['Paddle shifters', 'Подрулевые лепестки', '换挡拨片', 'Lẫy chuyển số', 'مبدلات سرعة خلف المقود'],
    '전동접이 사이드 미러': ['Power-folding mirrors', 'Электроскладывание зеркал', '电动折叠后视镜', 'Gương gập điện', 'مرايا كهربائية الطي'],
    'ECM 룸미러': ['ECM rear-view mirror', 'Зеркало с автозатемнением', 'ECM防眩目后视镜', 'Gương chống chói ECM', 'مرآة داخلية ECM'],
    '눈부심방지 룸/아웃 미러': ['Anti-glare mirrors', 'Антибликовые зеркала', '防眩目内/外后视镜', 'Gương chống chói trong/ngoài', 'مرايا مضادة للوهج'],
    '하이패스': ['Hi-Pass (toll)', 'Hi-Pass (оплата дорог)', 'Hi-Pass电子收费', 'Hi-Pass (thu phí)', 'Hi-Pass (رسوم الطرق)'],
    '하이패스 시스템(ECM 미적용)20만원': ['Hi-Pass system (no ECM), 200,000 KRW', 'Hi-Pass (без ECM), 200 000 вон', 'Hi-Pass系统(无ECM)，20万韩元', 'Hi-Pass (không ECM), 200.000 KRW', 'نظام Hi-Pass، 200,000 وون'],
    '알루미늄 휠': ['Alloy wheels', 'Легкосплавные диски', '铝合金轮毂', 'Mâm hợp kim', 'عجلات ألمنيوم'],
    '블루투스': ['Bluetooth', 'Bluetooth', '蓝牙', 'Bluetooth', 'بلوتوث'],
    '무선도어 잠금장치': ['Keyless entry', 'Дистанционный замок', '无线门锁', 'Khóa cửa từ xa', 'قفل عن بُعد'],
    '스마트키': ['Smart key', 'Смарт-ключ', '智能钥匙', 'Chìa khóa thông minh', 'مفتاح ذكي'],
    '오토 라이트': ['Auto headlights', 'Автоматический свет', '自动大灯', 'Đèn tự động', 'مصابيح أوتوماتيكية'],
    'USB 단자': ['USB port', 'USB-разъём', 'USB接口', 'Cổng USB', 'منفذ USB'],
    'AUX 단자': ['AUX port', 'AUX-разъём', 'AUX接口', 'Cổng AUX', 'منفذ AUX'],
    'CD 플레이어': ['CD player', 'CD-плеер', 'CD播放器', 'Đầu CD', 'مشغل CD'],
    '후방 카메라': ['Rear camera', 'Камера заднего вида', '倒车影像', 'Camera lùi', 'كاميرا خلفية'],
    '후방카메라': ['Rear camera', 'Камера заднего вида', '倒车影像', 'Camera lùi', 'كاميرا خلفية'],
    '360도 어라운드 뷰': ['360° around view', 'Круговой обзор 360°', '360度全景影像', 'Camera 360°', 'رؤية محيطية 360°'],
    '어라운드뷰': ['Around view', 'Круговой обзор', '全景影像', 'Camera toàn cảnh', 'رؤية محيطية'],
    '내비게이션': ['Navigation', 'Навигация', '导航', 'Dẫn đường', 'ملاحة'],
    '주차감지센서(전방, 후방)': ['Parking sensors (front & rear)', 'Парктроники (перед и зад)', '泊车雷达(前后)', 'Cảm biến đỗ xe (trước & sau)', 'حساسات ركن (أمامية وخلفية)'],
    '주차감지센서(후방)': ['Parking sensors (rear)', 'Парктроники (зад)', '泊车雷达(后)', 'Cảm biến đỗ xe (sau)', 'حساسات ركن (خلفية)'],
    '주차센서(전방, 후방)': ['Parking sensors (front & rear)', 'Парктроники (перед и зад)', '泊车雷达(前后)', 'Cảm biến đỗ (trước & sau)', 'حساسات ركن (أمامية وخلفية)'],
    '주차센서(후방)': ['Parking sensors (rear)', 'Парктроники (зад)', '泊车雷达(后)', 'Cảm biến đỗ (sau)', 'حساسات ركن (خلفية)'],
    '타이어 공기압센서(TPMS)': ['Tire pressure monitoring (TPMS)', 'Датчики давления шин (TPMS)', '胎压监测(TPMS)', 'Cảm biến áp suất lốp (TPMS)', 'مراقبة ضغط الإطارات (TPMS)'],
    '타이어 공기압 모니터링': ['Tire pressure monitoring', 'Контроль давления шин', '胎压监测', 'Giám sát áp suất lốp', 'مراقبة ضغط الإطارات'],
    '차선이탈 경보 시스템(LDWS)': ['Lane departure warning (LDWS)', 'Контроль полосы (LDWS)', '车道偏离预警(LDWS)', 'Cảnh báo lệch làn (LDWS)', 'تنبيه مغادرة المسار (LDWS)'],
    '차선유지보조(LDWS)': ['Lane keeping assist (LDWS)', 'Удержание в полосе (LDWS)', '车道保持辅助(LDWS)', 'Hỗ trợ giữ làn (LDWS)', 'مساعد البقاء في المسار'],
    '차선유지보조': ['Lane keeping assist', 'Удержание в полосе', '车道保持辅助', 'Hỗ trợ giữ làn', 'مساعد البقاء في المسار'],
    '크루즈 컨트롤(일반)': ['Cruise control', 'Круиз-контроль', '定速巡航', 'Ga tự động', 'مثبت سرعة'],
    '크루즈 컨트롤(어댑티브)': ['Adaptive cruise control', 'Адаптивный круиз-контроль', '自适应巡航', 'Ga tự động thích ứng', 'مثبت سرعة تكيفي'],
    '크루즈컨트롤': ['Cruise control', 'Круиз-контроль', '定速巡航', 'Ga tự động', 'مثبت سرعة'],
    '헤드램프(LED)': ['LED headlamps', 'LED-фары', 'LED大灯', 'Đèn pha LED', 'مصابيح LED'],
    '헤드램프(HID)': ['HID headlamps', 'HID-фары', 'HID大灯', 'Đèn pha HID', 'مصابيح HID'],
    'LED헤드램프': ['LED headlamps', 'LED-фары', 'LED大灯', 'Đèn pha LED', 'مصابيح LED'],
    '루프랙': ['Roof rack', 'Рейлинги', '车顶行李架', 'Giá nóc', 'حامل سقف'],
    '선루프': ['Sunroof', 'Люк', '天窗', 'Cửa sổ trời', 'فتحة سقف'],
    '파노라마선루프': ['Panoramic sunroof', 'Панорамная крыша', '全景天窗', 'Cửa sổ trời toàn cảnh', 'فتحة سقف بانورامية'],
    '파노라마': ['Panoramic', 'Панорамная', '全景', 'Toàn cảnh', 'بانورامي'],
    '앞좌석 AV 모니터': ['Front AV monitor', 'AV-монитор (перед)', '前排AV显示屏', 'Màn hình AV trước', 'شاشة AV أمامية'],
    'AV 모니터': ['AV monitor', 'AV-монитор', 'AV显示屏', 'Màn hình AV', 'شاشة AV'],
    '헤드업 디스플레이(HUD)': ['Head-up display (HUD)', 'Проекционный дисплей (HUD)', '抬头显示(HUD)', 'Màn hình HUD', 'شاشة عرض علوية (HUD)'],
    '전자식 주차브레이크(EPB)': ['Electronic parking brake (EPB)', 'Электронный ручник (EPB)', '电子驻车(EPB)', 'Phanh tay điện tử (EPB)', 'فرامل يد إلكترونية (EPB)'],
    '전자동주차시스템(SPAS)': ['Smart parking assist (SPAS)', 'Автопарковка (SPAS)', '自动泊车(SPAS)', 'Hỗ trợ đỗ xe tự động (SPAS)', 'مساعد ركن ذاتي (SPAS)'],
    '후측방 경보 시스템': ['Blind-spot warning', 'Контроль слепых зон', '后侧方预警', 'Cảnh báo điểm mù', 'تنبيه النقطة العمياء'],
    '측후방(사각) 경보': ['Blind-spot warning', 'Контроль слепых зон', '侧后方(盲区)预警', 'Cảnh báo điểm mù', 'تنبيه النقطة العمياء'],
    '후측방충돌경고(후방교차충돌경고포함)40만원': ['Blind-spot collision warning (incl. rear cross-traffic), 400,000 KRW', 'Предупреждение о столкновении сзади/сбоку, 400 000 вон', '后侧方碰撞预警(含后方交叉碰撞预警)，40万韩元', 'Cảnh báo va chạm điểm mù (gồm cắt ngang phía sau), 400.000 KRW', 'تحذير تصادم النقطة العمياء، 400,000 وون'],
    '후방교차충돌방지(RCCW)': ['Rear cross-traffic collision avoidance (RCCW)', 'Предотвращение столкновений сзади (RCCW)', '后方交叉碰撞预防(RCCW)', 'Chống va chạm cắt ngang sau (RCCW)', 'منع تصادم خلفي متقاطع (RCCW)'],
    '전방충돌방지(FCA)': ['Forward collision avoidance (FCA)', 'Предотвращение фронтальных столкновений (FCA)', '前方碰撞预防(FCA)', 'Chống va chạm phía trước (FCA)', 'منع التصادم الأمامي (FCA)'],
    '전방충돌경고': ['Forward collision warning', 'Предупреждение о столкновении', '前方碰撞预警', 'Cảnh báo va chạm trước', 'تحذير تصادم أمامي'],
    '상향등 보조(HBA)': ['High-beam assist (HBA)', 'Ассистент дальнего света (HBA)', '远光灯辅助(HBA)', 'Hỗ trợ đèn pha (HBA)', 'مساعد الضوء العالي (HBA)'],
    '경사로발진 보조': ['Hill-start assist', 'Помощь при старте в гору', '坡道起步辅助', 'Hỗ trợ khởi hành ngang dốc', 'مساعد صعود المرتفعات'],
    '정차 중 엔진멈춤(ISG)': ['Idle stop & go (ISG)', 'Старт-стоп (ISG)', '自动启停(ISG)', 'Ngắt động cơ khi dừng (ISG)', 'نظام التشغيل والإيقاف (ISG)'],
    '운전자세 메모리 기능(IMS)': ['Driver position memory (IMS)', 'Память положения водителя (IMS)', '驾驶位记忆(IMS)', 'Nhớ vị trí lái (IMS)', 'ذاكرة وضعية السائق (IMS)'],
    '레인센서': ['Rain sensor', 'Датчик дождя', '雨量感应', 'Cảm biến mưa', 'حساس مطر'],
    '블랙박스': ['Dashcam', 'Видеорегистратор', '行车记录仪', 'Camera hành trình', 'كاميرا داش'],
    '공기청정기': ['Air purifier', 'Очиститель воздуха', '空气净化器', 'Máy lọc không khí', 'منقي هواء'],
    '파워 전동 트렁크': ['Power tailgate', 'Электропривод багажника', '电动尾门', 'Cốp điện', 'باب خلفي كهربائي'],
    '전동식 트렁크 도어': ['Power trunk door', 'Электропривод багажника', '电动后备箱门', 'Cửa cốp điện', 'باب صندوق كهربائي'],
    '커튼/블라인드(뒷좌석)': ['Rear curtains/blinds', 'Шторки (зад)', '后排遮阳帘', 'Rèm che (sau)', 'ستائر خلفية'],
    '커튼/블라인드(후방)': ['Rear curtain/blind', 'Шторка (зад)', '后窗遮阳帘', 'Rèm che (phía sau)', 'ستارة خلفية'],
    '커튼/블라인드': ['Curtains/blinds', 'Шторки', '遮阳帘', 'Rèm che', 'ستائر'],
    '드라이브 와이즈': ['Drive Wise', 'Drive Wise', 'Drive Wise智能驾驶', 'Drive Wise', 'Drive Wise'],
    '드라이브 와이즈2': ['Drive Wise 2', 'Drive Wise 2', 'Drive Wise 2', 'Drive Wise 2', 'Drive Wise 2'],
    '안전': ['Safety', 'Безопасность', '安全', 'An toàn', 'الأمان'],
    '시트': ['Seats', 'Сиденья', '座椅', 'Ghế', 'المقاعد'],
    '편의/멀티미디어': ['Convenience/Multimedia', 'Комфорт/мультимедиа', '便利/多媒体', 'Tiện nghi/Đa phương tiện', 'الراحة/الوسائط'],
    '7인승': ['7-seater', '7 мест', '7座', '7 chỗ', '7 مقاعد'],

    /* --- 유튜브 모달 (yt.js) --- */
    '유튜브 영상': ['YouTube Videos', 'Видео YouTube', 'YouTube视频', 'Video YouTube', 'فيديوهات يوتيوب'],
    '오토일일사 유튜브': ['Auto114 on YouTube', 'Auto114 на YouTube', 'Auto114油管频道', 'Auto114 trên YouTube', 'Auto114 على يوتيوب'],
    '차량 소개 영상을 바로 확인하세요': ['Watch our car videos right here', 'Смотрите видео о наших авто', '直接观看车辆介绍视频', 'Xem video giới thiệu xe ngay tại đây', 'شاهد فيديوهات سياراتنا هنا'],
    '채널 바로가기': ['Visit Channel', 'Перейти на канал', '前往频道', 'Đến kênh', 'زيارة القناة'],
    '📺 유튜브 영상': ['📺 YouTube', '📺 YouTube', '📺 YouTube视频', '📺 YouTube', '📺 يوتيوب']
  };

  /* ============ 차명/트림 로마자 변환 (모든 외국어 공통) ============ */
  var WORD = {
    '현대': 'Hyundai', '기아': 'Kia', '제네시스': 'Genesis', '쉐보레': 'Chevrolet',
    '르노삼성': 'Renault Samsung', '르노': 'Renault', 'KG모빌리티(쌍용)': 'KG Mobility (SsangYong)', '쌍용': 'SsangYong',
    '봉고3트럭': 'Bongo3 Truck', '봉고': 'Bongo', '포터': 'Porter',
    '렉스턴스포츠': 'Rexton Sports', '렉스턴': 'Rexton', '어드벤처': 'Adventure',
    '그랜저': 'Grandeur', '쏘나타': 'Sonata', '아반떼': 'Avante', '투싼': 'Tucson', '싼타페': 'Santa Fe',
    '팰리세이드': 'Palisade', '코나': 'Kona', '니로': 'Niro', '스포티지': 'Sportage', '쏘렌토': 'Sorento',
    '카니발': 'Carnival', '셀토스': 'Seltos', '스파크': 'Spark', '크루즈': 'Cruze', '토레스': 'Torres',
    '레이': 'Ray', '오피러스': 'Opirus', '아이오닉': 'Ioniq', '캐스퍼': 'Casper', '모닝': 'Morning', '스타렉스': 'Starex',
    '더뉴': 'The New', '디올뉴': 'The All-New', '올뉴': 'All-New', '어메이징 뉴': 'Amazing New', '어메이징': 'Amazing',
    '신형': 'New', '뉴': 'New',
    '럭셔리': 'Luxury', '프레스티지': 'Prestige', '노블레스': 'Noblesse', '캘리그래피': 'Calligraphy',
    '모던테크': 'Modern Tech', '모던': 'Modern', '스마트스페셜': 'Smart Special', '스마트': 'Smart',
    '디럭스팩': 'Deluxe Pack', '디럭스': 'Deluxe', '프리미엄': 'Premium', '인스퍼레이션': 'Inspiration',
    '르블랑': 'Le Blanc', '노바': 'Nova', '스페셜': 'Special', '고급형': 'Deluxe', '기본형': 'Base',
    '초장축': 'Extra-Long', '킹캡': 'King Cab', '밴': 'Van', '트럭': 'Truck',
    '디젤': 'Diesel', '가솔린': 'Gasoline', '하이브리드': 'Hybrid', '터보': 'Turbo',
    '2륜': '2WD', '4륜': '4WD', '1톤': '1-ton'
  };

  /* ============ 단위/패턴 규칙 ============ */
  function fmtNum(n, lang) {
    try { return n.toLocaleString(LANG_META[lang].locale); } catch (e) { return n.toLocaleString('en-US'); }
  }
  var KRW = { en: ' KRW', ru: ' вон', zh: '韩元', vi: ' KRW', ar: ' وون' };
  var RX = [
    // 사진N
    [/^사진\s?(\d+)$/, function (m, l) { return ({ en: 'Photo ', ru: 'Фото ', zh: '照片', vi: 'Ảnh ', ar: 'صورة ' })[l] + m[1]; }],
    // 성능점검기록부 n/m, n페이지
    [/^성능점검기록부 (\d+)\/(\d+)$/, function (m, l) { return ({ en: 'Inspection report ', ru: 'Акт осмотра ', zh: '检测记录 ', vi: 'Biên bản kiểm định ', ar: 'تقرير الفحص ' })[l] + m[1] + '/' + m[2]; }],
    [/^중고자동차 성능·상태점검기록부 (\d+)페이지$/, function (m, l) { return ({ en: 'Inspection report p.', ru: 'Акт осмотра, стр. ', zh: '检测记录第', vi: 'Biên bản kiểm định tr.', ar: 'تقرير الفحص ص' })[l] + m[1] + (l === 'zh' ? '页' : ''); }],
    // 차량번호: XXX
    [/^차량번호:?\s*(.+)$/, function (m, l) { return ({ en: 'Plate No.: ', ru: 'Гос. номер: ', zh: '车牌号：', vi: 'Biển số: ', ar: 'رقم اللوحة: ' })[l] + m[1]; }],
    // 가격 N만원 → 실제 KRW
    [/^([\d,\.]+)\s*만원$/, function (m, l) { var n = parseFloat(m[1].replace(/,/g, '')) * 10000; return fmtNum(n, l) + KRW[l]; }],
    // 전체 (N)
    [/^전체 \((\d+)\)$/, function (m, l) { return ({ en: 'All (', ru: 'Все (', zh: '全部 (', vi: 'Tất cả (', ar: 'الكل (' })[l] + m[1] + ')'; }],
    // 주요 옵션 (N개)
    [/^주요 옵션 \((\d+)개\)$/, function (m, l) { return ({ en: 'Key Options (', ru: 'Опции (', zh: '主要配置 (', vi: 'Trang bị chính (', ar: 'التجهيزات (' })[l] + m[1] + ')'; }],
    // N인승
    [/^(\d+)인승$/, function (m, l) { return m[1] + ({ en: '-seater', ru: ' мест', zh: '座', vi: ' chỗ', ar: ' مقاعد' })[l]; }],
    // 연식: 2016년 (2015.9) / 2015년형 (2014.12) / 2023년형 (최초등록: 2022.5.27) / 2020년 (최초등록: 2019.5)
    [/^(\d{4})년(형)?\s*(?:\((?:최초등록:\s*)?([\d.]+)\))?$/, function (m, l) {
      var fr = { en: 'first reg. ', ru: 'перв. рег. ', zh: '首次登记 ', vi: 'ĐK lần đầu ', ar: 'أول تسجيل ' };
      var s = m[1];
      if (m[3]) s += ' (' + fr[l] + m[3] + ')';
      return s;
    }]
  ];

  /* 부분치환용 후처리 규칙 (문장 안 단위 변환) */
  function postProcess(s, l) {
    s = s.replace(/([\d,\.]+)\s*만원/g, function (_, num) { return fmtNum(parseFloat(num.replace(/,/g, '')) * 10000, l) + KRW[l]; });
    s = s.replace(/(\d{4})년형/g, '$1');
    s = s.replace(/(\d{4})년/g, '$1');
    s = s.replace(/최초등록:/g, { en: 'first reg.:', ru: 'перв. рег.:', zh: '首次登记:', vi: 'ĐK lần đầu:', ar: 'أول تسجيل:' }[l]);
    s = s.replace(/(\d+)인승/g, function (_, n) { return n + ({ en: '-seater', ru: ' мест', zh: '座', vi: ' chỗ', ar: ' مقاعد' })[l]; });
    s = s.replace(/(\d+)개월/g, function (_, n) { return n + ({ en: ' mo.', ru: ' мес.', zh: '个月', vi: ' tháng', ar: ' شهر' })[l]; });
    return s;
  }

  /* 부분치환 키 목록 (긴 것부터) — 사전 + 로마자 맵 */
  var SUB_KEYS = null;
  function buildSubKeys() {
    if (SUB_KEYS) return SUB_KEYS;
    var keys = [];
    for (var k in D) if (k.length >= 2) keys.push(k);
    for (var w in WORD) keys.push(w);
    keys.sort(function (a, b) { return b.length - a.length; });
    SUB_KEYS = keys;
    return keys;
  }
  function subValue(key, lang) {
    if (D[key]) return D[key][ORDER.indexOf(lang)];
    if (WORD[key] !== undefined) return WORD[key];
    return null;
  }

  function translateString(orig, lang) {
    var s = orig.replace(/\s+/g, ' ').trim();
    if (!s || !/[가-힣]/.test(s)) return null;
    var li = ORDER.indexOf(lang);
    // 1) 완전일치
    if (D[s]) return D[s][li];
    // 2) 패턴 규칙
    for (var i = 0; i < RX.length; i++) {
      var m = s.match(RX[i][0]);
      if (m) return RX[i][1](m, lang);
    }
    // 3) 부분치환 (긴 키부터)
    var keys = buildSubKeys();
    var out = s;
    for (var j = 0; j < keys.length; j++) {
      var k = keys[j];
      if (out.indexOf(k) !== -1) out = out.split(k).join(subValue(k, lang));
    }
    out = postProcess(out, lang);
    return out !== s ? out : null;
  }

  /* ============ DOM 적용 ============ */
  var current = 'ko';
  var origText = new WeakMap();   // 텍스트 노드 원문
  var origAttr = new WeakMap();   // 요소 속성 원문 {attr: value}
  var ATTRS = ['placeholder', 'title', 'alt'];
  var docTitleOrig = null, metaDescOrig = null;

  function eachTextNode(root, fn) {
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentNode;
        if (!p) return NodeFilter.FILTER_REJECT;
        var tag = p.nodeName;
        if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT') return NodeFilter.FILTER_REJECT;
        if (p.closest && p.closest('#i18n-switch')) return NodeFilter.FILTER_REJECT;
        return /[가-힣]/.test(n.nodeValue) || origText.has(n) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      }
    });
    var n; var list = [];
    while ((n = w.nextNode())) list.push(n);
    list.forEach(fn);
  }

  /* select 옵션의 value 보존: 검색 로직이 한국어 텍스트 값을 쓰므로 value 속성 고정 */
  function freezeSelectValues(root) {
    (root.querySelectorAll ? root.querySelectorAll('option') : []).forEach ?
      root.querySelectorAll('option').forEach(function (o) {
        if (!o.hasAttribute('value')) o.setAttribute('value', o.textContent.trim());
      }) : null;
  }

  function applyLang(lang, root) {
    root = root || document.body;
    if (root === document.body) freezeSelectValues(document);
    eachTextNode(root, function (n) {
      if (!origText.has(n)) origText.set(n, n.nodeValue);
      var orig = origText.get(n);
      if (lang === 'ko') { n.nodeValue = orig; return; }
      var t = translateString(orig, lang);
      if (t) {
        // 원문 앞뒤 공백 보존
        var pre = (orig.match(/^\s*/) || [''])[0];
        var post = (orig.match(/\s*$/) || [''])[0];
        n.nodeValue = pre + t + post;
      } else {
        n.nodeValue = orig;
      }
    });
    // 속성
    var els = root.querySelectorAll ? root.querySelectorAll('[placeholder],[title],[alt]') : [];
    els.forEach(function (el) {
      if (el.closest && el.closest('#i18n-switch')) return;
      if (!origAttr.has(el)) {
        var saved = {};
        ATTRS.forEach(function (a) { if (el.hasAttribute(a)) saved[a] = el.getAttribute(a); });
        origAttr.set(el, saved);
      }
      var savedAttrs = origAttr.get(el);
      ATTRS.forEach(function (a) {
        if (savedAttrs[a] === undefined) return;
        if (lang === 'ko') { el.setAttribute(a, savedAttrs[a]); return; }
        var t = translateString(savedAttrs[a], lang);
        el.setAttribute(a, t || savedAttrs[a]);
      });
    });
    // 문서 제목/설명
    if (root === document.body) {
      if (docTitleOrig === null) docTitleOrig = document.title;
      document.title = lang === 'ko' ? docTitleOrig : (translateString(docTitleOrig, lang) || docTitleOrig);
      var md = document.querySelector('meta[name="description"]');
      if (md) {
        if (metaDescOrig === null) metaDescOrig = md.getAttribute('content') || '';
        md.setAttribute('content', lang === 'ko' ? metaDescOrig : (translateString(metaDescOrig, lang) || metaDescOrig));
      }
      document.documentElement.setAttribute('lang', lang);
    }
  }

  /* 동적 콘텐츠(후기/공지 등) 자동 번역 */
  var mo = new MutationObserver(function (muts) {
    if (current === 'ko') return;
    muts.forEach(function (m) {
      m.addedNodes.forEach(function (node) {
        if (node.nodeType === 1 && !(node.closest && node.closest('#i18n-switch'))) applyLang(current, node);
        else if (node.nodeType === 3 && /[가-힣]/.test(node.nodeValue)) {
          var t = translateString(node.nodeValue, current);
          if (t) { origText.set(node, node.nodeValue); node.nodeValue = t; }
        }
      });
    });
  });

  function setLang(lang) {
    current = lang;
    try { localStorage.setItem(LS_KEY, lang); } catch (e) {}
    applyLang(lang);
    var cur = document.querySelector('#i18n-switch .i18n-cur span');
    if (cur) cur.textContent = LANG_META[lang].flag + ' ' + LANG_META[lang].label;
    document.querySelectorAll('#i18n-switch .i18n-item').forEach(function (b) {
      b.classList.toggle('on', b.dataset.lang === lang);
    });
    var menu = document.getElementById('i18n-menu');
    if (menu) menu.classList.remove('open');
  }

  /* ============ 언어 선택 UI ============ */
  function buildSwitcher() {
    var css = document.createElement('style');
    css.textContent =
      '#i18n-switch{position:fixed;top:64px;right:14px;z-index:99999;font-family:"Noto Sans KR",sans-serif;}' +
      '#i18n-switch .i18n-cur{display:flex;align-items:center;gap:6px;background:#111417;color:#fff;border:1.5px solid #111417;border-radius:24px;padding:8px 14px;font-size:13px;font-weight:700;cursor:pointer;box-shadow:3px 3px 0 rgba(17,20,23,.25);}' +
      '#i18n-switch .i18n-cur:hover{transform:translate(-1px,-1px);}' +
      '#i18n-menu{display:none;position:absolute;right:0;top:44px;background:#fff;border:1.5px solid #111417;border-radius:10px;overflow:hidden;min-width:150px;box-shadow:4px 4px 0 #111417;}' +
      '#i18n-menu.open{display:block;}' +
      '#i18n-menu .i18n-item{display:block;width:100%;text-align:left;background:none;border:none;padding:10px 14px;font-size:13px;font-weight:600;color:#111417;cursor:pointer;font-family:inherit;}' +
      '#i18n-menu .i18n-item:hover{background:#f0f0ed;}' +
      '#i18n-menu .i18n-item.on{background:#111417;color:#fff;}' +
      '@media(max-width:680px){#i18n-switch{top:auto;bottom:14px;left:14px;right:auto;}#i18n-menu{top:auto;bottom:44px;right:auto;left:0;}}';
    document.head.appendChild(css);

    var box = document.createElement('div');
    box.id = 'i18n-switch';
    var curBtn = document.createElement('button');
    curBtn.className = 'i18n-cur';
    curBtn.type = 'button';
    curBtn.innerHTML = '🌐 <span>' + LANG_META[current].flag + ' ' + LANG_META[current].label + '</span> ▾';
    var menu = document.createElement('div');
    menu.id = 'i18n-menu';
    Object.keys(LANG_META).forEach(function (code) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'i18n-item' + (code === current ? ' on' : '');
      b.dataset.lang = code;
      b.textContent = LANG_META[code].flag + ' ' + LANG_META[code].label;
      b.addEventListener('click', function () { setLang(code); });
      menu.appendChild(b);
    });
    curBtn.addEventListener('click', function (e) { e.stopPropagation(); menu.classList.toggle('open'); });
    document.addEventListener('click', function () { menu.classList.remove('open'); });
    box.appendChild(curBtn);
    box.appendChild(menu);
    document.body.appendChild(box);
  }

  /* ============ 초기화 ============ */
  function init() {
    var saved = 'ko';
    try {
      var q = new URLSearchParams(location.search).get('lang');
      saved = q || localStorage.getItem(LS_KEY) || 'ko';
    } catch (e) {}
    if (!LANG_META[saved]) saved = 'ko';
    current = saved;
    buildSwitcher();
    if (saved !== 'ko') applyLang(saved);
    mo.observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
