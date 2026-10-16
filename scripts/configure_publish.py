from pathlib import Path
import json,sys,shutil
root=Path(__file__).resolve().parents[1]
base=sys.argv[1].rstrip('/')+'/'
repo=sys.argv[2]
config={'portfolio':base+'portfolyo/','repository':repo,'github':'https://github.com/KerimX54','linkedin':'https://www.linkedin.com/in/kerim-s-a78046267/'}
(root/'site/data/config.json').write_text(json.dumps(config,ensure_ascii=False),encoding='utf-8')
p=root/'site/index.html'
s=p.read_text(encoding='utf-8-sig').replace('content="assets/paylasim.png"','content="'+base+'assets/paylasim.png"')
if 'property="og:url"' not in s:s=s.replace('</head>','<meta property="og:url" content="'+base+'"><link rel="canonical" href="'+base+'"></head>')
p.write_text(s,encoding='utf-8')
# Standalone links still work if the visitor opens the bundled copy inside the portfolio.
shutil.copytree(root/'site',root/'portfolio-source/public/hikaye',dirs_exist_ok=True)

