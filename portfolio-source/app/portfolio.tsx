'use client';

import { useEffect, useRef, useState } from 'react';
import type { PointerEvent } from 'react';
import Link from 'next/link';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const storyUrl = process.env.NEXT_PUBLIC_STORY_URL || `${basePath}/hikaye/index.html`;
const storyRepository = 'https://github.com/KerimX54/veri-hikayesi';

const Arrow = ({ diagonal = false }: { diagonal?: boolean }) => <span aria-hidden="true">{diagonal ? '↗' : '↗'}</span>;

function DataSphere() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const ctx = el.getContext('2d');
    if (!ctx) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const dots = Array.from({ length: 650 }, (_, i) => {
      const y = 1 - (i / 649) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = i * Math.PI * (3 - Math.sqrt(5));
      return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
    });
    let frame = 0, rotation = 0;
    const draw = () => {
      const size = el.clientWidth;
      const dpr = Math.min(window.devicePixelRatio, 2);
      if (el.width !== Math.round(size * dpr)) { el.width = Math.round(size * dpr); el.height = el.width; }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);
      rotation += reduced.matches ? 0 : .002;
      const points = dots.map(p => {
        const x = p.x * Math.cos(rotation) + p.z * Math.sin(rotation);
        const z = -p.x * Math.sin(rotation) + p.z * Math.cos(rotation);
        const yy = p.y * .92 - x * .21;
        return { x: size / 2 + x * size * .36, y: size / 2 + yy * size * .36, z };
      });
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        if (p.z > 0.2) {
          for (let j = i + 1; j < Math.min(i + 40, points.length); j++) {
            const q = points[j], dist = Math.hypot(p.x - q.x, p.y - q.y);
            if (dist < size * .078 && q.z > .2) {
              ctx.strokeStyle = `rgba(150,116,255,${.13 * (1 - dist / (size * .078))})`;
              ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
            }
          }
        }
        ctx.fillStyle = `rgba(${p.z > .5 ? '205,184,255' : '123,86,214'},${.18 + (p.z + 1) * .36})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, .7 + (p.z + 1) * .8, 0, Math.PI * 2); ctx.fill();
      }
      if (!reduced.matches) frame = requestAnimationFrame(draw);
    };
    draw();
    const restart = () => { cancelAnimationFrame(frame); draw(); };
    window.addEventListener('resize', restart); reduced.addEventListener('change', restart);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', restart); reduced.removeEventListener('change', restart); };
  }, []);
  return <canvas ref={canvas} className="sphere-canvas" aria-hidden="true" />;
}

export default function Portfolio({ view = 'home' }: { view?: 'home' | 'about' | 'projects' | 'contact' }) {
  const [logo, setLogo] = useState(false);
  const [menu, setMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  useEffect(() => {
    const image = new Image();
    image.onload = () => setLogo(true);
    image.src = `${basePath}/logo.png`;
    return () => { image.onload = null; };
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
    }, { threshold: .12 });
    document.querySelectorAll('.reveal').forEach(el => { el.classList.add('will-reveal'); observer.observe(el); });
    setMenu(false);
    return () => observer.disconnect();
  }, [view]);
  useEffect(() => { if (!copied) return; const id = setTimeout(() => setCopied(false), 2500); return () => clearTimeout(id); }, [copied]);
  const tilt = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--rx', `${-((e.clientY - r.top) / r.height - .5) * 5}deg`);
    e.currentTarget.style.setProperty('--ry', `${((e.clientX - r.left) / r.width - .5) * 5}deg`);
  };
  const resetTilt = (e: PointerEvent<HTMLElement>) => { e.currentTarget.style.setProperty('--rx', '0deg'); e.currentTarget.style.setProperty('--ry', '0deg'); };
  const copy = async () => {
    try { await navigator.clipboard.writeText('kerimtx54@gmail.com'); setCopied(true); setCopyError(false); }
    catch { setCopyError(true); }
  };
  return <>
    <a className="skip-link" href="#main">İçeriğe geç</a>
    <header className="header">
      <Link className="logo" href="/" aria-label="Kerim Tilki, ana sayfa">
        {logo ? <img src={`${basePath}/logo.png`} alt="Kerim Tilki" onError={() => setLogo(false)} /> : <span className="monogram">kt<span>.</span></span>}
      </Link>
      <button className="menu-toggle" aria-expanded={menu} aria-controls="navigation" onClick={() => setMenu(!menu)}>{menu ? 'Kapat ×' : 'Menü +'}</button>
      <nav id="navigation" className={menu ? 'nav open' : 'nav'} aria-label="Ana menü">
        {[['about', '/hakkimda/', 'Hakkımda'], ['projects', '/projeler/', 'Projeler'], ['contact', '/iletisim/', 'İletişim']].map(([id, href, label]) => <Link key={id} href={href} aria-current={view === id ? 'page' : undefined} className={view === id ? 'active' : ''} onClick={() => setMenu(false)}>{label}</Link>)}
      </nav>
      <a className="header-contact" href="mailto:kerimtx54@gmail.com">Bir merhaba de <Arrow /></a>
    </header>
    <main id="main" className={view === 'home' ? '' : 'inner-page'}>
      {view === 'home' && <>
      <section className="hero" id="home">
        <div className="ambient ambient-one" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow intro"><span className="status-dot" /> VERİDEN ANLAMA, FİKİRDEN ÜRETİME.</p>
          <h1 className="intro">Merhaba, ben<br /><span>Kerim Tilki</span><span className="accent">.</span></h1>
          <p className="hero-description intro">Verinin arkasındaki hikâyeyi keşfediyorum.<br />Veri bilimi, analiz ve makine öğrenmesiyle<br className="desktop-break" /> fikirleri anlamlı çözümlere dönüştürüyorum.</p>
          <div className="hero-actions intro"><Link className="button primary" href="/projeler/">Projelerimi keşfet <Arrow /></Link><Link className="text-link" href="/hakkimda/">Beni tanı <span aria-hidden="true">↗</span></Link></div>
          <div className="hero-caption intro"><span>BÜYÜK VERİ ANALİSTLİĞİ ÖĞRENCİSİ</span><span className="caption-line" /> <span>MERAK ET. ANALİZ ET. ÜRET.</span></div>
        </div>
        <div className="hero-art" aria-hidden="true"><div className="orb-glow" /><DataSphere /><div className="orbit orbit-one" /><div className="orbit orbit-two" /><span className="art-label label-top"><i /> data → insight</span><span className="art-label label-bottom">&#123; curiosity: true &#125;</span><span className="coordinate">41° / EXPLORING POSSIBILITIES</span></div>
        <Link href="/hakkimda/" className="scroll-cue">KEŞFETMEYE DEVAM ET <span>↗</span></Link>
        <div className="hero-index">01 <span>/ 04</span></div>
      </section>
      <div className="topic-strip" aria-label="İlgi alanları"><span>VERİ BİLİMİ</span><i>✳</i><span>PYTHON</span><i>✳</i><span>MAKİNE ÖĞRENMESİ</span><i>✳</i><span>VERİ ANALİZİ</span><i>✳</i><span>MERAK & KEŞİF</span></div>
      </>}
      {view === 'about' && <section id="about" className="section about">
        <div className="section-kicker reveal"><span>01 / HAKKIMDA</span><span>BİRKAÇ SATIRDA BEN</span></div>
        <div className="about-grid">
          <div className="reveal"><h2>Her verinin<br />bir <span className="serif">hikâyesi</span> var.</h2><p className="section-subtitle">Ben o hikâyenin peşindeyim.</p></div>
          <div className="about-copy reveal"><p>Ben Kerim, 20 yaşındayım. Meslek lisesinde Bilişim Teknolojileri ile başlayan yolculuğuma, <strong>Büyük Veri Analistliği</strong> öğrencisi olarak devam ediyorum.</p><p>Veri bilimi, veri analizi ve makine öğrenmesiyle ilgileniyorum. Veriler arasındaki ilişkileri anlamak, örüntüleri keşfetmek ve öğrendiklerimi gerçek problemlere uygulamak beni heyecanlandırıyor.</p><div className="about-notes"><div><span>BAŞLANGIÇ NOKTAM</span><strong>Bilişim Teknolojileri</strong></div><div><span>ŞİMDİKİ ODAĞIM</span><strong>Veri & makine öğrenmesi</strong></div></div></div>
        </div>
        <div className="tool-row reveal"><span>ÇALIŞTIĞIM TEKNOLOJİLER</span><div>{['Python', 'Pandas', 'scikit-learn', 'K-Means', 'Agglomerative Clustering'].map(x => <span className="tech" key={x}>{x}</span>)}</div></div>
      </section>
      }
      {view === 'projects' && <section id="projects" className="section projects">
        <div className="section-kicker reveal"><span>02 / PROJELER</span><span>ÖĞRENMENİN EN İYİ YOLU: ÜRETMEK</span></div>
        <div className="section-heading reveal"><h2>Meraktan <span className="serif">uygulamaya.</span></h2><span className="project-count">SEÇİLİ PROJELER / 02</span></div>
        <article className="project-card reveal story-project">
          <div className="project-visual story-preview"><img src={`${basePath}/hikaye/assets/paylasim.png`} alt="Her 100 iadenin yaklaşık 45’i gecikiyor: kütüphane veri hikâyesi" width="1200" height="627" /></div>
          <div className="project-info"><span className="eyebrow">VERİ ANALİZİ · İNTERAKTİF HİKÂYE</span><h3>Kitaplar ne zaman<br />geri dönüyor?</h3><p className="project-name">Gecikmeli iadelerin beş yıllık hikâyesi</p><p>15.000 ödünç işleminde gecikmeli iade oranlarını yıllara, kategorilere ve kütüphanelere göre inceleyen yedi adımlı scrollytelling çalışması. Grafikler kaydırmayla değişir; filtrelerle kendi karşılaştırmanızı yapabilirsiniz.</p><div className="tags"><span>Python</span><span>pandas</span><span>D3.js</span><span>Scrollytelling</span></div><div className="story-actions"><a className="button primary" href={storyUrl}>Hikâyeyi keşfet ↗</a><a className="text-link" href={storyRepository}>GitHub deposu ↗</a></div></div>
        </article>
        <article className="project-card reveal" onPointerMove={tilt} onPointerLeave={resetTilt}>
          <div className="project-visual"><div className="visual-top"><span><i /> ÖNERİ SİSTEMİ</span><span>MODEL GÖRÜNÜMÜ ↗</span></div><div className="recommendation-graphic" aria-hidden="true"><div className="graph-path path-a" /><div className="graph-path path-b" /><div className="graph-node student">◎<small>Öğrenci profili</small></div><div className="graph-node cluster">✳<small>Benzer tercihler</small></div><div className="book-stack"><div className="book b1"><span>01</span>VERİ<br />BİLİMİ</div><div className="book b2"><span>02</span>YENİ<br />BAKIŞLAR</div><div className="book b3"><span>03</span>KEŞİF</div></div><span className="graphic-label">SANA UYAN BİR SONRAKİ KİTAP.</span></div><div className="visual-bottom"><span>PROFİL → KÜMELEME → ÖNERİ</span><span>ŞEMATİK GÖSTERİM</span></div></div>
          <div className="project-info"><span className="eyebrow">MAKİNE ÖĞRENMESİ · VERİ ANALİZİ</span><h3>Bir sonraki kitap,<br />verinin önerisi.</h3><p className="project-name">Kütüphane Kitap Öneri Sistemi</p><p>Kütüphane veri setinden yola çıkarak, yeni gelen öğrencinin bölüm bilgisine ve benzer öğrencilerin geçmiş tercihlerine göre kitap önerileri üreten sistem.</p><div className="tags">{['Python', 'Pandas', 'scikit-learn', 'K-Means', 'Agglomerative Clustering'].map(x => <span key={x}>{x}</span>)}</div><details><summary>Projenin yaklaşımını incele <span aria-hidden="true">+</span></summary><div className="project-details"><p><b>01 — Veriyi anlama</b><br />Kütüphane verisindeki öğrencilerin bölüm bilgileri ve geçmiş kitap tercihleri değerlendirilir.</p><p><b>02 — Benzerlikleri bulma</b><br />K-Means ve Agglomerative Clustering ile benzer tercihleri olan öğrenciler gruplandırılır.</p><p><b>03 — Öneri üretme</b><br />Yeni öğrencinin bölüm bilgisi, benzer öğrencilerin geçmiş tercihleriyle birlikte kullanılarak kitap önerileri oluşturulur.</p></div></details></div>
        </article>
        <p className="project-footnote reveal"><span className="status-dot" /> Her proje, yeni bir şey öğrenmek için bir başlangıç.</p>
      </section>
      }
      {view === 'contact' && <section id="contact" className="section contact"><div className="ambient ambient-two" aria-hidden="true" /><div className="section-kicker reveal"><span>03 / İLETİŞİM</span><span>BİR FİKİRLE BAŞLAR.</span></div><div className="contact-content reveal"><span className="eyebrow">FİKİRLER, PROJELER VE YENİ TANIŞMALAR</span><h2>Güzel bir şey<br /><span className="serif">konuşalım.</span><span className="accent">↗</span></h2><p>Bir proje fikrin varsa ya da sadece merhaba demek<br className="desktop-break" /> istersen, bir e-posta uzağındayım.</p><div className="email-row"><a href="mailto:kerimtx54@gmail.com">kerimtx54@gmail.com <Arrow /></a><button aria-label="E-posta adresini kopyala" title="E-posta adresini kopyala" onClick={copy}>{copied ? '✓' : '⧉'}</button></div><p className="copy-status" role="status">{copied ? 'E-posta adresi kopyalandı.' : copyError ? 'Kopyalanamadı. E-posta adresini seçip kopyalayabilirsin.' : ''}</p></div></section>
      }
    </main>
    <footer><Link href="/" className="footer-name">Kerim Tilki<span>.</span></Link><span>© {new Date().getFullYear()} Kerim Tilki</span><Link href="/">Ana sayfa ↗</Link></footer>
  </>;
}


