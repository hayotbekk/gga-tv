// ========================================================
// GGA - GREAT GOAL ACADEMY
// TV Digital Signage Presentation Data (Dark Slate & Emerald Theme)
// Background: #111729 | Accent Green: #55b685 | Text: #ffffff & #94a3b8
// ========================================================

const ACADEMY_CONFIG = {
  name: "GREAT GOAL ACADEMY",
  shortName: "GGA ACADEMY",
  slogan: "Buyuk maqsadlar sari ishonchli qadam!",
  tagline: "Oliy toifali ustozlar, zamonaviy metodika va kafolatlangan natija",
  primaryGreen: "#55b685",
  primaryDark: "#111729",
  logo: "logo.png",
  qrCode: "qr_code_clean.png",
  phone1: "+998 (55) 404-05-04",
  telegram: "@greatgoalacademy",
  instagram: "@greatgoal_academy",
  address: "Koson tumani, Eski voenkomat, Xalq banki yonida",
  defaultSlideDuration: 11000, // 11 soniya har bir slayd uchun
  tickerText: "🔥 DIQQAT: Yangi o‘quv mavsumi guruhlariga qabul davom etmoqda! • 🎯 Matematika, SAT Math, Ona tili va Adabiyot (A+), Tarix A+, Huquqshunoslik, Kimyo va Biologiya, Ingliz tili (IELTS 8.5+ / CEFR), Arab tili, IT va Dasturlash • 🏆 Oliy toifali ustozlar jamoasi • ⚡️ Joylar soni chegaralangan! • 📞 Qabul markazi: +998 (55) 404-05-04 | Telegram: @greatgoalacademy"
};

const SLIDES_DATA = [
  // 1. INTRO / WELCOME SLIDE
  {
    id: "welcome",
    type: "hero",
    badge: "O'QUV MARKAZI TAQDIMOTI",
    title: "GREAT GOAL ACADEMY",
    subtitle: "Buyuk Maqsadlar — Buyuk Natijalar Sari!",
    description: "Biz bilan orzuingizdagi oliygoh talabasi bo'ling yoki nufuzli milliy va xalqaro sertifikatlarga (SAT, CEFR, IELTS, A+ 100%) ega bo'ling. Respublika miqyosidagi Oliy toifali ekspert ustozlar sizga ta'lim beradi!",
    logo: "logo.png",
    stats: [
      { value: "8+", label: "Yillik tajribali ustozlar", icon: "bi-award-fill" },
      { value: "Oliy", label: "Toifali pedagoglar", icon: "bi-star-fill" },
      { value: "100%", label: "A+ Darajali natijalar", icon: "bi-patch-check-fill" },
      { value: "95%+", label: "Oliygohga qabul", icon: "bi-graph-up-arrow" }
    ],
    features: [
      "🏛 Davlat grantiga 100% maqsadli tayyorlov",
      "🌐 Xalqaro SAT Math, IELTS 8.5+ va CEFR dasturlari",
      "🏆 Tarix A+, Kimyo A+ va Ona tili 100% A+ natijadorlik",
      "✨ Zamonaviy shinam xonalar, IT laboratoriya va monitoring"
    ]
  },

  // 2. TEAM OVERVIEW GRID (9 MEMBERS)
  {
    id: "team_overview",
    type: "team-grid",
    badge: "BIZNING JAMOAMIZ",
    title: "Oliy Toifali va Tajribali Ekspert Ustozlar",
    subtitle: "Respublika va xalqaro miqyosda eng yuqori natijalar (SAT, IELTS 8.5+, A+ Milliy) ko'rsatgan mutaxassislar",
    teachers: [
      {
        name: "Sardor Sobirov",
        role: "Matematika & SAT Math",
        degree: "O'zMU | Oliy toifa",
        badge: "SAT 950 • A+ Daraja",
        photo: "thumb_sardor.jpg",
        color: "#55b685"
      },
      {
        name: "Mahliyo Sayfiyeva",
        role: "Ona tili va Adabiyot",
        degree: "QarDU | Oliy toifa, PhD",
        badge: "Milliy A+ • 100% Natija",
        photo: "thumb_mahliyo.jpg",
        color: "#55b685"
      },
      {
        name: "Nodir Choriyev",
        role: "Tarix & Huquqshunoslik",
        degree: "TDYuU | Oliy toifa",
        badge: "Tarix A+ • WIPO BMT",
        photo: "thumb_nodir.jpg",
        color: "#55b685"
      },
      {
        name: "Shuxrat Hasanov",
        role: "Kimyo & Biologiya",
        degree: "QarDU | Oliy toifa, Magistr",
        badge: "Kimyo Milliy A+ • Tibbiyot",
        photo: "thumb_shuxrat.jpg",
        color: "#55b685"
      },
      {
        name: "Azizbek Gadoyev",
        role: "Ingliz tili (IELTS / CEFR)",
        degree: "Magistr | C1 Daraja",
        badge: "IELTS 8.5+ • Yuqori Natija",
        photo: "thumb_gadoev.jpg",
        color: "#55b685"
      },
      {
        name: "Hayot Abdiraximov",
        role: "Frontend & Kompyuter Savodxonligi",
        degree: "Qarshi DTU | Kompyuter injiniringi",
        badge: "Frontend • IT Savodxonlik",
        photo: "thumb_hayot.jpg",
        color: "#55b685"
      },
      {
        name: "Aziz Saidniyozov",
        role: "Ingliz tili & Psixologiya",
        degree: "Bakalavr | Psixolog",
        badge: "CEFR B2 • 0 dan Intensive",
        photo: "thumb_saidniyozov.jpg",
        color: "#55b685"
      },
      {
        name: "Shalola Akmalovna",
        role: "Arab tili & Ingliz tili",
        degree: "O'zDJTU | Tarjimon",
        badge: "CEFR B2 (2×) • IELTS 6",
        photo: "thumb_shalola.jpg",
        color: "#55b685"
      },
      {
        name: "Daler Aliyev",
        role: "Matematika & Maktablar",
        degree: "TATUKF | TT va KT",
        badge: "Prezident & Al-Xorazmiy",
        photo: "thumb_daler.jpg",
        color: "#55b685"
      }
    ]
  },

  // 3. SARDOR SOBIROV
  {
    id: "teacher_sardor",
    type: "teacher-slide",
    tag: "EKSPERT O'QITUVCHI",
    name: "Sardor Sobirov",
    desc: "Matematika va SAT bo'yicha yetakchi mutassis va tayyorgarlik murabbiyi",
    stat1_val: "A+ Daraja",
    stat1_lbl: "Matematika Sertifikati",
    stat2_val: "7 Yil",
    stat2_lbl: "Pedagogik Tajriba",
    photo: "sardor.jpeg",
    slideImage: "Sardor.png"
  },

  // 4. MAHLIYO SAYFIYEVA
  {
    id: "teacher_mahliyo",
    type: "teacher-slide",
    tag: "EKSPERT O'QITUVCHI",
    name: "Mahliyo Sayfiyeva",
    desc: "Ona tili va adabiyot fani bo'yicha oliy toifali mutassis hamda metodist",
    stat1_val: "A+ Daraja",
    stat1_lbl: "Milliy Sertifikat",
    stat2_val: "5 Yil",
    stat2_lbl: "Pedagogik Tajriba",
    photo: "mahliyo.jpeg",
    slideImage: "mahliyo.png"
  },

  // 5. NODIR CHORIYEV
  {
    id: "teacher_nodir",
    type: "teacher-slide",
    tag: "EKSPERT O'QITUVCHI",
    name: "Nodir Choriyev",
    desc: "Tarix va Huquq fanlari bo'yicha oliy toifali mutassis hamda metodist",
    stat1_val: "A+ Daraja",
    stat1_lbl: "Milliy Sertifikat",
    stat2_val: "5 Yil",
    stat2_lbl: "Pedagogik Tajriba",
    photo: "Nodir.jpeg",
    slideImage: "Nodir.png"
  },

  // 6. SHUXRAT HASANOV
  {
    id: "teacher_shuxrat",
    type: "teacher-slide",
    tag: "EKSPERT O'QITUVCHI",
    name: "Shuxrat Hasanov",
    desc: "Kimyo va Biologiya fanlari bo'yicha oliy toifali mutassis hamda tajribali pedagog",
    stat1_val: "A+ Daraja",
    stat1_lbl: "Milliy Sertifikat",
    stat2_val: "7 Yil",
    stat2_lbl: "Pedagogik Tajriba",
    photo: "shuxrat.jpeg",
    slideImage: "shuxrat.png"
  },

  // 7. AZIZBEK GADOYEV
  {
    id: "teacher_gadoev",
    type: "teacher-slide",
    tag: "EKSPERT O'QITUVCHI",
    name: "Azizbek Gadoyev",
    desc: "Ingliz tili va IELTS bo'yicha yuqori tajribali mutassis va murabbiy",
    stat1_val: "IELTS 8.5+",
    stat1_lbl: "Yuqori Natija",
    stat2_val: "5+ Yil",
    stat2_lbl: "Pedagogik Tajriba",
    photo: "Azizbek_gadeyev.jpeg",
    slideImage: "Azizbek-gadoyev.png"
  },

  // 8. HAYOT ABDIRAXIMOV
  {
    id: "teacher_hayot",
    type: "teacher-slide",
    tag: "EKSPERT O'QITUVCHI",
    name: "Hayot Abdiraximov",
    desc: "Frontend dasturlash va Kompyuter savodxonligi bo'yicha amaliyotchi o'qituvchi",
    stat1_val: "Frontend",
    stat1_lbl: "va Kompyuter Savodxonligi",
    stat2_val: "1 Yil",
    stat2_lbl: "Pedagogik Tajriba",
    photo: "Hayot.jpeg",
    slideImage: "Hayot.png"
  },

  // 9. AZIZ SAIDNIYOZOV
  {
    id: "teacher_saidniyozov",
    type: "teacher-slide",
    tag: "EKSPERT O'QITUVCHI",
    name: "Aziz Saidniyozov",
    desc: "Ingliz tili va xalqaro baholash tizimlari bo'yicha mutassis hamda amaliyotchi murabbiy",
    stat1_val: "CEFR B2",
    stat1_lbl: "Xalqaro Sertifikat",
    stat2_val: "3 Yil",
    stat2_lbl: "Pedagogik Tajriba",
    photo: "Aziz_saidniyozov.jpeg",
    slideImage: "Aziz-saidniyozov.png"
  },

  // 10. SHALOLA AKMALOVNA
  {
    id: "teacher_shalola",
    type: "teacher-slide",
    tag: "EKSPERT O'QITUVCHI",
    name: "Shalola Akmalovna",
    desc: "Arab tili va Ingliz tili fanlari bo'yicha oliy ma'lumotli tarjimon hamda tajribali o'qituvchi",
    stat1_val: "CEFR B2",
    stat1_lbl: "Arab va Ingliz tili",
    stat2_val: "4 Yil",
    stat2_lbl: "Pedagogik Tajriba",
    photo: "shalola.jpeg",
    slideImage: "shalola.png"
  },

  // 11. DALER ALIYEV
  {
    id: "teacher_daler",
    type: "teacher-slide",
    tag: "EKSPERT O'QITUVCHI",
    name: "Daler Aliyev",
    desc: "Matematika va ixtisoslashtirilgan Prezident hamda Al-Xorazmiy maktablariga tayyorlov ustozi",
    stat1_val: "Prezident Maktabi",
    stat1_lbl: "Ixtisoslashgan Dastur",
    stat2_val: "4 Yil",
    stat2_lbl: "Pedagogik Tajriba",
    photo: "daler.jpeg",
    slideImage: "daler.png"
  },

  // 12. GGA AFZALLIKLARI
  {
    id: "advantages",
    type: "features-grid",
    badge: "NIMA UCHUN AYNAN BIZ?",
    title: "Akademiyamizning Asosiy Afzalliklari",
    subtitle: "Biz faqat dars bermaymiz, balki har bir o'quvchini orzusidagi eng yuqori natijaga yetaklaymiz",
    features: [
      {
        icon: "bi-mortarboard-fill",
        title: "Oliy Toifali Ustozlar",
        desc: "Magistrlar, PhD va xalqaro sertifikatga (SAT, IELTS 8.5+, A+ Milliy) ega respublika miqyosidagi ekspert pedagoglar",
        color: "#55b685"
      },
      {
        icon: "bi-graph-up-arrow",
        title: "Individual Monitoring",
        desc: "Haftalik Mock testlar, oylik reyting tahlili va har bir o'quvchining o'zlashtirishini qat'iy nazorat qilish",
        color: "#55b685"
      },
      {
        icon: "bi-patch-check-fill",
        title: "Kafolatlangan Natija",
        desc: "Davlat grantlariga 100% maqsadli tayyorlov va eng yuqori sertifikat ballariga erishish kafolatlangan tizimi",
        color: "#55b685"
      },
      {
        icon: "bi-laptop",
        title: "Zamonaviy IT va Xonalar",
        desc: "Konditsionerli, multimedia bilan jihozlangan shinam o'quv xonalari va zamonaviy kompyuter laboratoriyasi",
        color: "#55b685"
      },
      {
        icon: "bi-globe2",
        title: "Xalqaro Dasturlar",
        desc: "SAT Math, IELTS 8.5+, CEFR C1/B2 va xorijiy nufuzli universitetlarga maqsadli tayyorlov dasturlari",
        color: "#55b685"
      },
      {
        icon: "bi-geo-alt-fill",
        title: "Qulay Joylashuv",
        desc: "Koson markazida, transport qatnovi juda qulay bo'lgan xavfsiz va shinam bino hududida joylashgan",
        color: "#55b685"
      }
    ]
  },

  // 13. BOG'LANISH VA QABUL MARKAZI
  {
    id: "contact",
    type: "contact-slide",
    badge: "QABUL VA ALOQA",
    title: "Orzuingizdagi Kelajakni Biz Bilan Boshlang!",
    subtitle: "Yangi mavsum guruhlariga qabul davom etmoqda. Joylar soni chegaralangan!",
    ctaText: "Telegram kanalimizga obuna bo'ling va eng so'nggi yangiliklardan xabardor bo'ling!",
    footerNotice: "Kamerangizni QR-kodga yo'naltiring va to'g'ridan-to'g'ri kanalga o'ting",
    contacts: [
      {
        icon: "bi-telephone-fill",
        title: "Telefon Raqamimiz",
        values: ["+998 (55) 404-05-04"],
        color: "#55b685"
      },
      {
        icon: "bi-telegram",
        title: "Telegram Manzilimiz",
        values: ["@greatgoalacademy"],
        color: "#55b685"
      },
      {
        icon: "bi-instagram",
        title: "Instagram Sahifamiz",
        values: ["@greatgoal_academy"],
        color: "#55b685"
      },
      {
        icon: "bi-geo-alt-fill",
        title: "Manzilimiz",
        values: ["Koson tumani, Eski voenkomat, Xalq banki yonida"],
        color: "#55b685"
      }
    ]
  }
];
