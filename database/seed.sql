-- Insert categories
INSERT OR IGNORE INTO categories (name_ar, name_en, slug, description_ar, icon, order_index) VALUES 
  ('الرئيسية', 'Home', 'home', 'الصفحة الرئيسية', 'fa-solid fa-house', 1),
  ('أخبار', 'News', 'news', 'آخر الأخبار والمستجدات', 'fa-solid fa-newspaper', 2),
  ('فيديو', 'Videos', 'videos', 'مقاطع الفيديو والبرامج', 'fa-solid fa-circle-play', 3),
  ('بث مباشر', 'Live TV', 'live', 'البث المباشر لقناة مكة', 'fa-solid fa-tower-broadcast', 4),
  ('برامج', 'Programs', 'programs', 'البرامج والمحاضرات', 'fa-solid fa-tv', 5),
  ('الحج والعمرة', 'Hajj & Umrah', 'hajj-umrah', 'أخبار ومعلومات الحج والعمرة', 'fa-solid fa-kaaba', 6),
  ('القرآن الكريم', 'Quran', 'quran', 'تلاوات وتفسير القرآن', 'fa-solid fa-book-quran', 7),
  ('الفتاوى', 'Fatwas', 'fatwas', 'الفتاوى والأحكام الشرعية', 'fa-solid fa-scale-balanced', 8);

-- Insert sample articles
INSERT OR IGNORE INTO articles (title_ar, slug, summary_ar, content_ar, image_url, category_id, is_featured, is_breaking) VALUES 
  (
    'انطلاق موسم الحج لعام 1446هـ',
    'hajj-season-1446-launch',
    'شهدت مكة المكرمة اليوم انطلاق موسم الحج لهذا العام باستقبال أولى طلائع الحجاج',
    'شهدت مكة المكرمة اليوم انطلاق موسم الحج لعام 1446هـ باستقبال أولى طلائع الحجاج القادمين من مختلف دول العالم...',
    'https://media.islamicity.org/wp-content/uploads/2023/04/Eid-fitr-makkah-2023.jpg',
    6,
    1,
    1
  ),
  (
    'خطبة الجمعة من المسجد الحرام',
    'friday-sermon-masjid-haram',
    'ألقى فضيلة إمام وخطيب المسجد الحرام خطبة الجمعة حول أهمية التقوى',
    'ألقى فضيلة الشيخ إمام وخطيب المسجد الحرام خطبة الجمعة...',
    'https://vid.alarabiya.net/images/2017/05/23/16ee67c3-3c5c-4f11-a740-dcd3e664ba5f/16ee67c3-3c5c-4f11-a740-dcd3e664ba5f_16x9_1200x676.jpg?width=801&format=jpg',
    2,
    1,
    0
  ),
  (
    'توسعة المسجد الحرام تدخل مراحلها النهائية',
    'masjid-haram-expansion-final-stages',
    'اقتربت أعمال التوسعة السعودية الثالثة للمسجد الحرام من مراحلها النهائية',
    'أعلنت الجهات المسؤولة عن مشروع توسعة المسجد الحرام...',
    'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80',
    2,
    0,
    0
  ),
  (
    'برنامج خاص عن سيرة الرسول صلى الله عليه وسلم',
    'prophet-biography-special-program',
    'يعرض على قناة مكة برنامج خاص يتناول سيرة النبي محمد صلى الله عليه وسلم',
    'تقدم قناة مكة الفضائية برنامجاً خاصاً يتناول سيرة النبي...',
    'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80',
    5,
    0,
    0
  );

-- Insert sample videos
-- NOTE: include view_count so each seeded video can have an initial popularity value
INSERT OR IGNORE INTO videos (title_ar, slug, description_ar, video_url, thumbnail_url, category_id, is_live, duration, view_count) VALUES 
(
  'الآيات البينات',
  'makkah-tv-live',
  'تلاوة مؤثرة من القرآن الكريم',
  'https://www.youtube.com/watch?v=9mGry50ML7Q',
  'https://www.edarabia.com/wp-content/uploads/2020/02/prayer-times-makkah.jpg',
  4,
  1,
  0,
  2330
),
(
  'إرث الخليلين',
  'fajr-prayer-masjid-haram',
  'تلاوة مؤثرة من القرآن الكريم',
  'https://www.youtube.com/watch?v=example1',
  'https://makkahlive.net/images/MakkahLiveCover.jpg',
  3,
  0,
  1800,
  1980
),
(
  'هذا ديننا',
  'surah-kahf-recitation',
  'برنامج ديني يقدّم دروسًا وإيمانيات بأسلوب مؤثر',
  'https://www.youtube.com/watch?v=example1',
  'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&q=80',
  7,
  0,
  2400,
  1980
),
(
  'أبواب السماء',
  'hajj-rituals-complete-guide',
  'أبواب السماء',
  'https://www.youtube.com/watch?v=example3',
  'https://i.ytimg.com/vi/iKq3DlU1Yjo/maxresdefault.jpg',
  6,
  0,
  3600,
  1650
),
(
  'حنين الأفئدة',
  'haneen-al-afida',
  'حنين الأفئدة',
  'https://www.youtube.com/watch?v=example5',
  'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80',
  6,
  0,
  3600,
  1457
);


-- Insert sample programs
INSERT OR IGNORE INTO programs (name_ar, slug, description_ar, image_url, schedule_time, presenter_ar, is_active) VALUES 
  (
    'في رحاب الحرمين',
    'fi-rehab-alharamain',
    'برنامج يومي يأخذكم في جولة روحانية في رحاب الحرمين الشريفين',
    'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&q=80',
    'يومياً الساعة 9:00 مساءً',
    'د. عبدالله السعيد',
    1
  ),
  (
    'دروس من السيرة',
    'duroos-min-alsirah',
    'برنامج أسبوعي يستعرض دروس وعبر من سيرة النبي صلى الله عليه وسلم',
    'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80',
    'كل جمعة الساعة 8:00 مساءً',
    'الشيخ محمد العريفي',
    1
  ),
  (
    'أحكام وآداب',
    'ahkam-wa-adab',
    'برنامج يجيب على الأسئلة الفقهية والأحكام الشرعية',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSimrqrKsGV2voVAruLAivp8YJEcLfnv8VPWw&s',
    'يومياً الساعة 10:00 صباحاً',
    'د. سعد الشثري',
    1
  );

-- Insert prayer times (sample for today)
INSERT OR IGNORE INTO prayer_times (date, fajr, sunrise, dhuhr, asr, maghrib, isha) VALUES 
  (DATE('now'), '05:15', '06:30', '12:15', '15:45', '18:30', '20:00');
