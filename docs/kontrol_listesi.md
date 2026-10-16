# Teslim kontrolü

16 Ekim 2026

| Gereksinim | Doğrulama |
|---|---|
| 1.000+ satır ve 4+ değişken | 15.000 işlem; tarih, kategori, kütüphane, gecikme ve süre alanları |
| Veri izni | Kullanıcı kullanım izni bildirdi. Adlandırılmış lisans/açık veri statüsü doğrulanmadı. |
| Kişisel veriler | Öğrenci tablosu kullanılmadı; kimlik alanları çıkarıldı. Site yalnızca özet JSON kullanır. |
| Çalışma sorusu | Bildirim belgesindeki 2020–2024 kategori/kütüphane sorusu korundu. |
| 3–5 ana bulgu | Beş ana bulgu, yedi kaydırma adımı |
| Sabit grafik ve geçişler | Yedi durum tarayıcıda doğrulandı: stack, line, focus, count, dot, category, hist |
| 4 görselleştirme / 3 tür | Yığılmış çubuk, çizgi, yatay çubuk, nokta-aralık, kategorik frekans çubukları ve keşif grafiği |
| Okuyucu etkileşimi | Yıl/kütüphane/gösterge seçimi; 2024 Tıp filtresi 374/152 ve %40,6 ile doğrulandı. |
| Mobil/tablet/masaüstü | 360, 768, 1280 pikselde scrollWidth = clientWidth; yatay taşma yok. PNG kanıtları docs/ içinde. |
| Klavye ve alternatif metin | Yerel select/button kontrolleri, görünür özetler, SVG aria-label ve veri tablosu var. |
| Hareket azaltma | prefers-reduced-motion kuralı var; geçiş navigasyonu anlık. |
| Veri boyutu | Özet JSON yaklaşık 89 KB; toplam site veri dosyaları 5 MB altında. |
| Notebook | Yeni Python çekirdeğinde 5 kod hücresi baştan sona hatasız çalıştırıldı. |
| Lighthouse mobil | Lighthouse 13.5.0 / Chromium motoru / mobil emülasyon / Slow 4G: Performans 98, Erişilebilirlik 100. CLI raporu ve PNG’ler dahil. Chrome DevTools arayüzünden çalıştırılmadı. |
| Storyboard | Kodlamadan önce hazırlanmış dijital vektör PDF. Kâğıt/Figma yerine PDF çizimi kullanıldı. |
| Tasarım notu | Bir sayfalık PDF |
| Paylaşım görseli | PNG, 1200 × 627 |
| LinkedIn metni | 181 kelime, bulguyla başlar, 5 etiket; gerçekten paylaşılmadı. |
| Portfolyo | Mevcut projeye görsel, açıklama, site ve depo bağlantılı kart eklendi. TypeScript ve üretim derlemesi geçti. |
| Yapay zekâ beyanı | Site, README ve notebook içinde katkı kapsamı açık. Öğrenci yorum/metin incelemesi gerekli. |
| Canlı HTTPS / GitHub / portfolyo | GitHub Actions yayını başarılı; canlı hikâye, filtreler ve portfolyo proje kartı tarayıcıda doğrulandı. Bağlantılar teslim.txt içinde. |
| LinkedIn Post Inspector | Kontrol başlatıldı; Post Inspector oturum açma ekranına yönlendiriyor. Doğrulama sonucu henüz alınamadı; OG alanları ve paylaşım görseli sitede mevcut. |

## Teslimden önce öğrenci tarafından yapılacaklar

- Hikâye, analiz yorumları ve LinkedIn taslağını kendi ifadelerinizle gözden geçirin; ödev bunu istiyor.
- Veri sağlayıcısından lisans adını ve açık veri koşulunu doğrulayın.
- 12 Ekim bildiriminin zamanında teslim edilip edilmediği kontrol edilmedi; eski tarihli teslim yapılmış gibi gösterilmedi.
- Siteyi dönem sonuna kadar yayında tutun.

