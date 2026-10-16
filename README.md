# Gecikmeli iadelerin beş yıllık hikâyesi

Yakup Kerim TİLKİ · 2516016032 · Kullanıcı Arayüzü Tasarımı · 16 Ekim 2026

SAÜ Kütüphane Veri Seti’nde 2020–2024 yılları arasında gecikmeli iade oranları kitap kategorilerine ve kütüphanelere göre nasıl değişmektedir?

15.000 işlemin 6.707’si gecikmeli (%44,7). Hikâye beş ana bulguyu yedi kaydırma adımında açar. Sabit grafik altı kez değişir. Okuyucu yıl, kütüphane ve gösterge seçebilir. Kütüphanelerin toplam oran farkı 1,3 yüzde puandır; hacim ve oran ayrı gösterilir. Bu sonuçlar sağlanan dosyanın betimleyici analizidir.

## Bağlantılar

Doğrulanmış canlı site, kaynak depo ve güncellenmiş portfolyo adresleri `teslim.txt` dosyasındadır. Yerel önizleme canlı yayın yerine geçmez.

## Yerelde çalıştırma

Python 3.10+ ile proje kökünde:

```sh
python -m http.server 4173 --directory site
```

Tarayıcıda http://localhost:4173 açın. `index.html` dosyasına çift tıklamak JSON isteklerini tarayıcı güvenliği nedeniyle engelleyebilir. Site için paket kurulumu veya derleme gerekmez; D3.js yerel olarak paketlenmiştir.

## Analizi yeniden üretme

```sh
python -m pip install -r requirements.txt
jupyter notebook notebooks/analiz.ipynb
```

Kernel → Restart & Run All çalıştırın. Notebook beş kod hücresinden oluşur; girdi → temizleme → keşif → bulgular → CSV/JSON dışa aktarımı sırasını izler. Paketlenmiş çıktılar yeni bir çekirdekte baştan sona çalıştırıldı. Çalışma dizini proje kökü veya `notebooks/` olabilir. Notebook, `data/processed/` ve `site/data/summary.json` dosyalarını yeniden üretir.

## Kaynak ve izin

Özgün dosya: `SAUKutuphaneVeriSeti.xlsx`; kullanıcı tarafından sağlandı. Erişim: 16 Ekim 2026. Kaynak bağlantısı ve SHA-256 izi: `data/raw/kaynak.json`. Kullanıcı kullanım izni olduğunu bildirdi. Adlandırılmış açık lisans ve veri üreticisinin resmî yayımlama kaydı doğrulanmadı; veri gerçek kurum performansı diye genellenmez. Ödevin açık veri/lisans koşulunun tam doğrulanması için kaynak sahibinin lisans bilgisi gerekir.

Özgün Excel öğrenci adları ve numaraları içerdiğinden pakete ve web sitesine konulmadı. Hazırlıkta yalnızca `OduncIslemleri`, `Kitaplar`, `Kategoriler` ve `Kutuphaneler` sayfaları kullanıldı. Kitap-kategori-kütüphane bağlantıları many-to-one kontrolüyle birleştirildi. İşlem, kitap, öğrenci ve kütüphane kimlikleri kimliksiz CSV’den çıkarıldı. 15.000 işlem satırı korunur; aynı görünen kimliksiz işlemler otomatik silinmez. Siteye yalnızca toplulaştırılmış JSON gönderilir.

## Yöntem ve sınırlar

Gecikme = gerçek iade tarihi > beklenen iade tarihi. Payda tüm gözlenen iadeler; gruplama ödünç yılına göredir. 2024’te başlayıp 2025’te tamamlanan 191 işlem dahildir. Tarih, süre ve gecikme bayraklarında uyumsuzluk yoktur; satır çıkarılmamıştır. Üst uç değerler geçerli tarihler olduğu için tutulmuştur.

Oranlar pay ve paydalar toplanarak hesaplanır; grup oranları ortalanmaz. Wilson %95 aralıkları bağımsız işlem varsayımıyla betimleyici yardımcı göstergedir. Aynı öğrencinin tekrarlı işlemleri ve bilinmeyen veri üretim süreci nedeniyle nedensel sonuç veya kesin kurum sıralaması yapılmaz.

## Teknoloji ve kod kaynakları

- Python, pandas, NumPy: veri işleme ve özetler.
- D3.js 7.9.0 (ISC lisansı): https://d3js.org/ ; lisans `site/js/D3-LICENSE.txt` içinde.
- HTML, CSS, JavaScript ve Intersection Observer. Grafik ve geçiş kodu bu proje için yazıldı; hazır site şablonu veya gömülü görselleştirme kullanılmadı.
- Portfolyo: mevcut Next.js/React projesine kart ve hikâye eklenmiştir.
- İncelenen örnekler: https://pudding.cool/2026/06/menu-collection/ ve https://pudding.cool/2025/04/wine-animals/. R2D3 örneği erişim sırasında sunucu hatası verdi.

## Yapay zekâ kullanım beyanı

OpenAI Codex; analiz kodu, veri doğrulama, D3 görselleştirmeleri, HTML/CSS/JavaScript arayüzü, hata ayıklama, testler, dokümantasyon, hikâye ve LinkedIn metni taslaklarında kullanıldı. Anlatı ve yorumlar öğrencinin teslim öncesi gözden geçirip kendi ifadeleriyle düzenlemesi gereken taslaklardır. Kullanılmayan bir insan incelemesi veya kişisel deneyim varmış gibi beyan edilmez.

## Dosyalar

- `data/raw/`: gzip ile sıkıştırılmış kimliksiz CSV analiz girdisi ve kaynak kaydı.
- `data/processed/`: notebook’tan dışa aktarılan özet CSV/JSON.
- `notebooks/analiz.ipynb`: açıklamalı, çalıştırılmış analiz.
- `site/`: bağımsız statik scrollytelling sitesi.
- `docs/`: storyboard, tasarım kararları, paylaşım metni/görseli, test raporları.
- `portfolio-source/`: güncellenmiş portfolyonun kaynak dosyaları; bağımlılıklar hariç.
- `.github/workflows/pages.yml`: GitHub Pages yayın iş akışı.

## Yayın

GitHub deposunda Settings → Pages → Source bölümünü GitHub Actions yapın. Workflow statik hikâyeyi ve portfolyoyu tek yayın çıktısında birleştirir. Portfolyo derlemesinde alt yol otomatik ayarlanır. GitHub deposunun herkese açık olması gerekir. `teslim.txt` içinde yayın doğrulanmadan başarı iddiası bulunmaz.

## Teslim öncesi

`docs/kontrol_listesi.md` gerçek test sonuçlarını ve kalan işleri gösterir. LinkedIn’e gönderi paylaşılmadı; ödevde bu adım isteğe bağlıdır. Hazırlanan paylaşım metni 150–250 kelime aralığındadır. Kullanım lisansı, yorumların öğrenci incelemesi ve yayımlanmış bağlantıların son kontrolü öğrenci tarafından tamamlanmalıdır.
