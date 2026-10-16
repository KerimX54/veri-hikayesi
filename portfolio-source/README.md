# Kerim Tilki — Portfolyo

Next.js App Router, React ve TypeScript ile hazırlanmış Türkçe kişisel portfolyo. Animasyonlar CSS, Intersection Observer ve Canvas ile çalışır; Framer Motion gerekmez.

## Başlatma

Bu bilgisayarda bağımlılıklar kuruldu. `BASLAT.cmd` dosyasını çift tıklayarak geliştirme sunucusunu açabilirsiniz; adres terminalde görünür. Açık bir sunucu 3000 portunu kullanıyorsa Next.js farklı bir port seçer. Kod değişiklikleri otomatik yansır.

VS Code içinde `Ctrl+Shift+B` ile **Portfolyoyu başlat** görevini çalıştırabilirsiniz. `BASLAT.cmd`, Node.js komutu bulunamazsa bu bilgisayardaki Codex Node.js kurulumunu kullanır; ayrıca pnpm komutu gerektirmez. Sunucuyu durdurmak için terminalde `Ctrl+C` kullanın.

Başka bir bilgisayarda kurulum yapmak veya aşağıdaki pnpm komutlarını kullanmak için Node.js 20.9 veya üzeri ve pnpm gereklidir.

```sh
pnpm install
pnpm dev
```

Tarayıcıda http://localhost:3000 adresini açın.

## Üretim

```sh
pnpm build
pnpm start
```

Üretim çıktısı `out/` klasöründedir; statik hosting hizmetlerine de yüklenebilir. `pnpm start` bu çıktıyı yerel olarak sunar.

## Kişiselleştirme

- Logonuzu `public/logo.png` olarak kaydedin ve sayfayı yenileyin. Logo bulunamazsa otomatik olarak `kt.` yazısı gösterilir.
- İçerik, proje açıklaması ve e-posta: `app/portfolio.tsx`.
- Renkler, tipografi, responsive görünüm ve animasyonlar: `app/globals.css`.
- Sayfa başlığı ve arama motoru açıklaması: `app/layout.tsx`.
- Menüde yalnızca Hakkımda, Projeler ve İletişim bulunur.

Kitap görseli projenin işleyişini anlatan temsili bir çizimdir; çalışan bir öneri modeli veya gerçek öneri sonucu değildir. Kaynak kodu/veri seti paylaşılmadığı için proje bağlantısı eklenmemiştir.

E-posta bağlantısı ziyaretçinin e-posta uygulamasını açar. Kopyalama HTTPS veya localhost üzerinde çalışır. Google Fonts yüklenemezse sistem fontları kullanılır. Hareket azaltma tercihi desteklenir.

Menü bağlantıları ayrı App Router sayfalarını açar: /hakkimda/, /projeler/, /iletisim/. Ana sayfa / adresindedir.


