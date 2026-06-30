/**
 * Adi Chandra Narayana Dasari — Portfolio v3
 * Built with obsession, powered by React + Canvas 🚀
 */
import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import * as THREE from "three";
import {
  Linkedin, Mail, Phone, MapPin, ExternalLink,
  ChevronDown, ArrowRight, Menu, X, CheckCircle,
  Code2, Layers, Server, Database, Cpu, Globe,
  Heart, Terminal, Box, Zap,
} from "lucide-react";

const G = `
  @keyframes blink     { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes gradient-x{ 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
  @keyframes badge-bob { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-10px)} }
  @keyframes scan-down { 0%{top:-2px} 100%{top:100%} }
  @keyframes slide-up-mob { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }

  html{ scroll-behavior:smooth; -webkit-text-size-adjust:100%; }
  body{ -webkit-tap-highlight-color:transparent; overscroll-behavior-y:contain; }
  *{ -webkit-tap-highlight-color:transparent; box-sizing:border-box; }

  ::-webkit-scrollbar{ width:3px; }
  ::-webkit-scrollbar-thumb{ background:rgba(139,92,246,.45); border-radius:2px; }
  ::-webkit-scrollbar-track{ background:transparent; }

  .fd{ font-family:'Outfit',sans-serif; }
  .fb{ font-family:'Inter',sans-serif; }
  .fm{ font-family:'JetBrains Mono',monospace; }

  .gt{
    background:linear-gradient(135deg,#a78bfa 0%,#22d3ee 55%,#f472b6 100%);
    background-size:200% 200%;
    animation:gradient-x 5s ease infinite;
    -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
  }
  .gt-p{ background:linear-gradient(135deg,#8b5cf6,#c084fc); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }

  .gc{
    background:rgba(255,255,255,.04); backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px);
    border:1px solid rgba(255,255,255,.07); transition:all .32s ease;
  }
  .gc:hover{
    background:rgba(139,92,246,.07); border-color:rgba(139,92,246,.32);
    box-shadow:0 0 0 1px rgba(139,92,246,.1),0 24px 56px rgba(0,0,0,.5); transform:translateY(-3px);
  }
  /* no hover lift on touch devices */
  @media (hover:none){ .gc:hover{ transform:none; box-shadow:none; } }

  .gc-s{ background:rgba(255,255,255,.04); backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px); border:1px solid rgba(255,255,255,.07); }
  .gb{ border:1px solid rgba(139,92,246,.45); box-shadow:0 0 24px rgba(139,92,246,.15); }
  .pbar{ height:2px; background:linear-gradient(90deg,#8b5cf6,#22d3ee,#f472b6); transition:width .08s linear; }
  .dg{ background-image:radial-gradient(rgba(139,92,246,.1) 1px,transparent 1px); background-size:30px 30px; }
  .sw{ position:relative; overflow:hidden; }
  .sl-anim{ position:absolute;left:0;right:0;height:1px;pointer-events:none;background:linear-gradient(90deg,transparent,rgba(139,92,246,.55),rgba(34,211,238,.3),transparent);animation:scan-down 3.5s linear infinite; }

  #cr{ position:fixed;pointer-events:none;z-index:9999;width:34px;height:34px;border-radius:50%;border:1.5px solid rgba(139,92,246,.7);transform:translate(-50%,-50%);transition:width .18s,height .18s; }
  #cd{ position:fixed;pointer-events:none;z-index:9999;width:5px;height:5px;border-radius:50%;background:#8b5cf6;transform:translate(-50%,-50%); }
  /* hide custom cursor on touch */
  @media (hover:none){ #cr,#cd{ display:none; } }

  .bf{ animation:badge-bob var(--d,5s) ease-in-out infinite; animation-delay:var(--dl,0s); }
  .sl2{ font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.2em;color:#4b5563; }
  .tll{ background:linear-gradient(to bottom,rgba(139,92,246,.5),rgba(34,211,238,.15),transparent); }

  /* mobile bottom nav */
  .mob-nav{ position:fixed;bottom:0;left:0;right:0;z-index:50;background:rgba(6,5,15,.92);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,.07);padding:8px 0 max(8px,env(safe-area-inset-bottom));display:flex;align-items:center;justify-content:space-around; }
  /* horizontal scroll for demo tabs */
  .demo-tabs{ display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none; }
  .demo-tabs::-webkit-scrollbar{ display:none; }
  .demo-tab{ flex-shrink:0; }
  /* safe area padding on hero */
  .hero-safe{ padding-top:max(80px,env(safe-area-inset-top,0px)+80px); }

  /* shader uniform sliders */
  .su{ -webkit-appearance:none;appearance:none;width:100%;height:2px;border-radius:1px;background:rgba(139,92,246,.25);outline:none;cursor:pointer; }
  .su::-webkit-slider-thumb{ -webkit-appearance:none;width:13px;height:13px;border-radius:50%;background:#8b5cf6;border:2px solid rgba(255,255,255,.18);cursor:pointer; }
  .su::-moz-range-thumb{ width:13px;height:13px;border-radius:50%;background:#8b5cf6;border:2px solid rgba(255,255,255,.18);cursor:pointer; }
  .su:hover::-webkit-slider-thumb{ background:#a78bfa; }
  .su:hover::-moz-range-thumb{ background:#a78bfa; }
`;

const ME = {
  name:"Adi Chandra Narayana Dasari", title:"Senior Developer",
  email:"chandu46514@gmail.com", phone:"9701320246", location:"Hyderabad, India",
  linkedin:"https://www.linkedin.com/in/adi-chandra-narayana-dasari-232964218/",
  tagline:"I turn coffee ☕ and curiosity into Three.js experiences.",
  bio:"Full Stack Software Engineer with 6+ years of experience developing interactive 3D applications and browser-based visualisation tools using React.js, TypeScript, Three.js, Node.js, Unity3D, and PlayCanvas. I genuinely lose track of time when I'm optimising a WebGL render loop — that's how I know this is the right career.",
  bio2:"I completed my M.Tech while working full-time at Practically (yes, simultaneously 🤓) — which taught me that constraints breed creativity. Today I build everything from GLSL shaders to PostgreSQL schemas, always obsessing over performance, UX, and the tiny details nobody else notices.",
};

const ROLES=["Senior Game Developer","Three.js Specialist","Full Stack Engineer","Interactive 3D Builder","WebGL Enthusiast","React Architect"];

const EDUCATION=[
  { degree:"M.Tech in Computer Science", college:"Kallam Haranadha Institute of Technology", period:"2020 – 2022", note:"Completed simultaneously while working full-time at Practically. My strongest CS fundamentals were built here.", emoji:"🎓" },
  { degree:"B.Tech in Computer Science", college:"Kallam Haranadha Institute of Technology", period:"2016 – 2020", note:"Built my first interactive 3D prototype in final year — got completely hooked.", emoji:"📚" },
];

const EXPERIENCE=[
  {
    company:"Cognitivebotics", fullName:"Cognitivebotics Technologies Pvt. Ltd.",
    role:"Senior Game Developer", period:"Apr 2023 — Present", duration:"2+ yrs · Current",
    type:"EdTech · 3D · Full Stack", color:"#8b5cf6", emoji:"🚀",
    summary:"Developing responsive, browser-based interactive educational applications using React.js, TypeScript, Three.js, and PlayCanvas — collaborating with psychologists and designers to ship high-performance learning experiences.",
    bullets:[
      "Built interactive 3D visualisations with camera controls, object transformations, zoom, pan, and rotation for educational content",
      "Developed reusable React components with Hooks and modern state management (Redux / Zustand) used across the entire platform",
      "Built Node.js/Express REST APIs for data management and seamless frontend-backend communication",
      "Optimised rendering performance through code splitting, lazy loading, and asset loading strategies",
      "Collaborated with psychologists, UX designers, and cross-functional teams to deliver scalable high-performance web apps",
    ],
    tech:["React.js","TypeScript","Three.js","PlayCanvas","Node.js","Express","REST APIs","Redux","Zustand","WebGL"],
  },
  {
    company:"Yugasa Software Labs", fullName:"Yugasa Software Labs",
    role:"Senior Associate Software Developer", period:"Oct 2022 — Mar 2023", duration:"6 months",
    type:"3D Interior Design Platform", color:"#22d3ee", emoji:"🏠",
    summary:"Designed and developed a browser-based 3D interior design platform using Unity, Three.js, React.js, and TypeScript — enabling interactive scene visualisation and real-time editing. Led a team of five developers.",
    bullets:[
      "Built the full 3D interior design platform with interactive scene visualisation and real-time editing",
      "Implemented advanced 3D object manipulation: translation, scaling, rotation, snapping, and camera controls using vectors, matrices, and quaternions",
      "Developed Node.js backend services for project storage, scene persistence, and asset management",
      "Built reusable React components for property editing, material selection, and scene management UI",
      "Managed a team of five developers; collaborated with UI/UX designers and clients to gather and refine requirements",
    ],
    tech:["Unity","Three.js","React.js","TypeScript","Node.js","WebGL","Quaternions","3D Mathematics"],
  },
  {
    company:"Practically", fullName:"Practically (EdTech)",
    role:"Unity Developer", period:"Aug 2020 — Oct 2022", duration:"2+ yrs",
    type:"EdTech · Unity · PlayCanvas", color:"#4ade80", emoji:"🎮",
    summary:"Joined as an intern, offered a permanent position within one month, and promoted to Unity Developer within a year. Developed educational games while completing M.Tech simultaneously.",
    bullets:[
      "Joined as intern — offered permanent Junior Developer role within one month based on performance",
      "Promoted to Unity Developer within a year — fastest promotion on the team",
      "Developed educational games and interactive 3D content using Unity3D and C#",
      "Created reusable templates to streamline the game development pipeline across the studio",
      "Gained hands-on PlayCanvas experience — built web-based games with JavaScript for cross-platform delivery",
    ],
    tech:["Unity3D","C#","PlayCanvas","JavaScript","HTML5","Game Development"],
  },
  {
    company:"3rd Flix Visual Effects", fullName:"3rd Flix Visual Effects",
    role:"Junior Unity Developer", period:"Feb 2020 — Jul 2020", duration:"6 months · First Role",
    type:"Visual Effects · Unity", color:"#f472b6", emoji:"🎬",
    summary:"My very first professional role — started as an intern and built a strong foundation in 3D engine mathematics, analytical thinking, and professional software engineering practices.",
    bullets:[
      "Built a strong foundation in 3D mathematics: vectors, matrices, quaternions, coordinate systems",
      "Developed analytical thinking and structured problem-solving through Unity3D projects",
      "Shipped intern projects from brief to final delivery — built ownership habits early",
      "First exposure to professional code reviews, engineering standards, and team collaboration",
    ],
    tech:["Unity3D","C#","3D Mathematics","Linear Algebra","Problem Solving"],
  },
];

const SKILLS_CATS=[
  { cat:"Frontend", icon:Code2, color:"#60a5fa", items:["React.js","TypeScript","JavaScript ES6+","HTML5","CSS3","React Hooks","Context API","Material UI","Tailwind CSS"] },
  { cat:"3D & WebGL", icon:Box, color:"#a78bfa", items:["Three.js","React Three Fiber","WebGL","GLSL Shaders","Unity3D","PlayCanvas","3D Mathematics","Camera Controls","Quaternions"] },
  { cat:"Backend", icon:Server, color:"#4ade80", items:["Node.js","Express.js","REST APIs","GraphQL","WebSockets"] },
  { cat:"Databases", icon:Database, color:"#fb923c", items:["PostgreSQL","MongoDB"] },
  { cat:"State & Tools", icon:Layers, color:"#f472b6", items:["Redux","Zustand","Git","Docker","CI/CD","Vite","Webpack","npm"] },
  { cat:"Practices", icon:Cpu, color:"#22d3ee", items:["Performance Optimisation","Code Splitting","Lazy Loading","Asset Optimisation","Agile","3D Mathematics"] },
];

const PERSONAL_PROJECTS=[
  {
    title:"Browser-Based 3D Visualisation Platform", emoji:"🌐",
    tech:["React.js","TypeScript","Three.js","Node.js","Express.js"], color:"#8b5cf6",
    desc:"An interactive 3D visualisation app with zoom, pan, rotate, and multiple camera views. Built to prove browser-native 3D can rival desktop tools.",
    points:["Interactive 3D scene with zoom, pan, rotate and multiple camera perspectives","Object editing — move, rotate and scale with transform controls","Rendering performance optimised for large 3D scenes using LOD techniques","REST APIs with Express.js for data management and scene persistence"],
  },
  {
    title:"Interactive Interior Design Tool", emoji:"🏠",
    tech:["Unity","React","Node.js","REST APIs"], color:"#22d3ee",
    desc:"A 3D room planner with drag-and-drop furniture placement and real-time manipulation — bridging game-engine tech with a web product.",
    points:["3D room planner with drag-and-drop furniture placement in real time","Real-time object manipulation — move, rotate, scale in 3D space","Backend APIs for project persistence and scene save/load"],
  },
  {
    title:"Educational Interactive Platform", emoji:"🎓",
    tech:["React","TypeScript","Three.js","PlayCanvas"], color:"#f472b6",
    desc:"Browser-based educational experiences with interactive 3D content — the learning tool I wish I had as a student.",
    points:["Immersive browser-based experiences with interactive 3D visualisations","Improved loading performance and rendering efficiency for low-bandwidth users","Cross-platform delivery via PlayCanvas and Three.js with no plugins"],
  },
];

const FREELANCE_PROJECTS=[
  {
    title:"RediHire", sub:"IT Staffing & Recruitment Services", url:"www.redihire.com", emoji:"🤝",
    tech:["Next.js","TypeScript","Node.js","PostgreSQL","React","Tailwind CSS"],
    color:"#8b5cf6", g1:"#7c3aed", g2:"#4f46e5",
    metrics:[{v:"500+",l:"Clients Served"},{v:"10K+",l:"Placements"},{v:"15+",l:"Industry Verticals"},{v:"Pan-India",l:"Reach"}],
    desc:"RediHire is a service-based IT staffing & recruitment company — not a SaaS platform. They connect businesses with pre-vetted tech talent across India. Built their full web presence: service pages, candidate intake flows, employer inquiry portals, and a modern brand identity that converts visitors into leads.",
  },
  {
    title:"VizoCloud", sub:"3D Infrastructure Visualiser", url:"www.vizocloud.com", emoji:"☁️",
    tech:["React","Three.js","WebGL","Node.js","WebSockets","MongoDB"],
    color:"#22d3ee", g1:"#0891b2", g2:"#0e7490",
    metrics:[{v:"2M+",l:"Events/day"},{v:"99.99%",l:"Uptime"},{v:"<100ms",l:"Latency"},{v:"12",l:"F500 Clients"}],
    desc:"Real-time 3D cloud infrastructure visualiser rendering live network topology in WebGL at 60fps. My favourite Three.js project.",
  },
  {
    title:"RHirePro", sub:"Job Portal & Hiring Marketplace", url:"www.rhirepro.com", emoji:"🔍",
    tech:["Next.js","React","Node.js","PostgreSQL","Elasticsearch","AWS"],
    color:"#4ade80", g1:"#16a34a", g2:"#0f766e",
    metrics:[{v:"5K+",l:"Active Jobs"},{v:"50K+",l:"Job Seekers"},{v:"1,200+",l:"Employers"},{v:"30+",l:"Job Categories"}],
    desc:"RHirePro is a Naukri-style job portal and hiring marketplace where employers post vacancies and candidates discover opportunities. Built the full platform — job listings with advanced search & filters, employer dashboards for applicant tracking, candidate profiles with resume upload, and smart job-match recommendations.",
  },
  {
    title:"Lutti Studios", sub:"Award-Winning Creative Agency", url:"www.luttistudios.in", emoji:"🏆",
    tech:["React","Three.js","GSAP","WebGL","GLSL","Vite"],
    color:"#f472b6", g1:"#db2777", g2:"#dc2626",
    metrics:[{v:"3",l:"Awwwards"},{v:"60fps",l:"WebGL"},{v:"<1.2s",l:"Load Time"},{v:"+240%",l:"Conversion"}],
    desc:"Cinematic creative agency portfolio — custom GLSL shaders, GSAP scroll storytelling, physics particles. Won 3 Awwwards distinctions.",
  },
];

const BADGES=[
  { name:"Three.js", color:"#22d3ee", style:{left:"7%",top:"22%"}, d:"5s", dl:"0s" },
  { name:"React.js", color:"#61dafb", style:{left:"80%",top:"18%"}, d:"6s", dl:"-.8s" },
  { name:"WebGL", color:"#a78bfa", style:{left:"86%",top:"58%"}, d:"4.5s", dl:"-1.5s" },
  { name:"TypeScript", color:"#60a5fa", style:{left:"5%",top:"64%"}, d:"5.5s", dl:"-.3s" },
  { name:"Node.js", color:"#4ade80", style:{left:"74%",top:"80%"}, d:"6.5s", dl:"-2s" },
  { name:"Unity3D", color:"#94a3b8", style:{left:"20%",top:"86%"}, d:"4s", dl:"-1s" },
  { name:"PlayCanvas", color:"#f59e0b", style:{left:"50%",top:"91%"}, d:"5s", dl:"-.6s" },
  { name:"GLSL", color:"#f472b6", style:{left:"17%",top:"10%"}, d:"7s", dl:"-3s" },
];

function useVisible(t=0.1){ const ref=useRef<HTMLDivElement>(null); const [v,setV]=useState(false); useEffect(()=>{ const el=ref.current; if(!el)return; const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)setV(true);},{threshold:t}); obs.observe(el); return()=>obs.disconnect(); },[t]); return [ref,v] as const; }
function useScrollPct(){ const [p,setP]=useState(0); useEffect(()=>{ const h=()=>{ const s=document.documentElement.scrollTop; const mx=document.documentElement.scrollHeight-window.innerHeight; setP(mx?(s/mx)*100:0); }; window.addEventListener("scroll",h,{passive:true}); return()=>window.removeEventListener("scroll",h); },[]); return p; }

function Cursor(){ const ring=useRef<HTMLDivElement>(null); const dot=useRef<HTMLDivElement>(null); const pos=useRef({x:0,y:0}); const lag=useRef({x:0,y:0}); useEffect(()=>{ const mv=(e:MouseEvent)=>{ pos.current={x:e.clientX,y:e.clientY}; if(dot.current){dot.current.style.left=`${e.clientX}px`;dot.current.style.top=`${e.clientY}px`;} }; window.addEventListener("mousemove",mv); let raf:number; const loop=()=>{ lag.current.x+=(pos.current.x-lag.current.x)*.11; lag.current.y+=(pos.current.y-lag.current.y)*.11; if(ring.current){ring.current.style.left=`${lag.current.x}px`;ring.current.style.top=`${lag.current.y}px`;} raf=requestAnimationFrame(loop); }; loop(); return()=>{ window.removeEventListener("mousemove",mv); cancelAnimationFrame(raf); }; },[]); return <><div id="cr" ref={ring}/><div id="cd" ref={dot}/></>; }

function Particles(){ const ref=useRef<HTMLCanvasElement>(null); useEffect(()=>{ const c=ref.current!; const ctx=c.getContext("2d")!; let raf:number; const mouse={x:-999,y:-999}; const resize=()=>{c.width=c.offsetWidth;c.height=c.offsetHeight;}; resize(); const ro=new ResizeObserver(resize); ro.observe(c); window.addEventListener("mousemove",e=>{mouse.x=e.clientX;mouse.y=e.clientY;}); interface P{x:number;y:number;vx:number;vy:number;r:number;hue:number;} const pts:P[]=Array.from({length:100},()=>({x:Math.random()*c.width,y:Math.random()*c.height,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4,r:Math.random()*1.4+.4,hue:[260,195,320][Math.floor(Math.random()*3)]})); const draw=()=>{ ctx.clearRect(0,0,c.width,c.height); pts.forEach(p=>{ p.x+=p.vx;p.y+=p.vy; if(p.x<0||p.x>c.width)p.vx*=-1; if(p.y<0||p.y>c.height)p.vy*=-1; const dx=p.x-mouse.x,dy=p.y-mouse.y,d2=dx*dx+dy*dy; if(d2<10000){const d=Math.sqrt(d2);p.x+=dx/d*1.8;p.y+=dy/d*1.8;} ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle=`hsla(${p.hue},80%,70%,.6)`;ctx.fill(); }); for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy); if(d<130){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle=`rgba(139,92,246,${(1-d/130)*.09})`;ctx.lineWidth=.5;ctx.stroke();}} raf=requestAnimationFrame(draw); }; draw(); return()=>{cancelAnimationFrame(raf);ro.disconnect();}; },[]); return <canvas ref={ref} className="absolute inset-0 w-full h-full"/>; }

// ── GLSL shaders ────────────────────────────────────────────────────────────
const VERT=`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`;

const PLASMA_FS=`precision mediump float;
uniform float u_time,uSpeed,uFreq,uIntensity;varying vec2 vUv;
void main(){
  vec2 p=(vUv-.5)*uFreq;float t=u_time*uSpeed;
  float v=sin(p.x*2.+t)+sin(p.y*2.+t*1.3)+sin((p.x+p.y)+t*.9)+sin(sqrt(p.x*p.x+p.y*p.y)*2.+t);
  v=v*.25+.5;
  vec3 c1=vec3(.545,.361,.965),c2=vec3(.133,.827,.933),c3=vec3(.957,.443,.714);
  vec3 col=mix(c1,c2,sin(v*3.14159)*uIntensity*.5+.5);
  col=mix(col,c3,sin(v*6.28318+1.)*.5+.5);
  gl_FragColor=vec4(col,1.);
}`;

const RAYMARCH_FS=`precision mediump float;
uniform float u_time,uSpeed,uSharp,uGlow;varying vec2 vUv;
float sdT(vec3 p,vec2 t){vec2 q=vec2(length(p.xz)-t.x,p.y);return length(q)-t.y;}
float map(vec3 p){
  float a=u_time*uSpeed,ca=cos(a),sa=sin(a);p.xz=mat2(ca,-sa,sa,ca)*p.xz;
  float b=u_time*uSpeed*.7,cb=cos(b),sb=sin(b);p.xy=mat2(cb,-sb,sb,cb)*p.xy;
  return sdT(p,vec2(.35,.13));
}
vec3 norm(vec3 p){vec2 e=vec2(.0005,0.);return normalize(vec3(map(p+e.xyy)-map(p-e.xyy),map(p+e.yxy)-map(p-e.yxy),map(p+e.yyx)-map(p-e.yyx)));}
void main(){
  vec2 uv=(vUv-.5)*2.;vec3 ro=vec3(0.,0.,1.5),rd=normalize(vec3(uv*vec2(1.,.85),-1.));
  float t=0.;for(int i=0;i<56;i++){float d=map(ro+rd*t);if(abs(d)<.001||t>5.)break;t+=d;}
  vec3 col=vec3(.06,.05,.09);
  if(t<5.){vec3 p=ro+rd*t,n=norm(p),ld=normalize(vec3(1.5,2.,3.));
    float diff=max(dot(n,ld),0.),spec=pow(max(dot(reflect(-ld,n),-rd),0.),uSharp);
    vec3 c1=vec3(.545,.361,.965),c2=vec3(.133,.827,.933);
    col=mix(c1,c2,diff)*(.1+diff*.9)+spec*uGlow;}
  col+=vec3(.15,.08,.35)*exp(-3.*length(uv))*uGlow*.5;
  gl_FragColor=vec4(clamp(col,0.,1.),1.);
}`;

const VORONOI_FS=`precision mediump float;
uniform float u_time,uSpeed,uCells,uBright;varying vec2 vUv;
vec2 h2(vec2 p){p=vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)));return fract(sin(p)*43758.5453);}
float vor(vec2 x){
  vec2 n=floor(x),f=fract(x);float d1=8.,d2=8.;
  for(int j=-1;j<=1;j++)for(int i=-1;i<=1;i++){
    vec2 g=vec2(float(i),float(j)),o=h2(n+g);
    o=.5+.5*sin(u_time*uSpeed+6.28318*o);
    float d=length(g+o-f);
    if(d<d1){d2=d1;d1=d;}else if(d<d2)d2=d;}
  return d2-d1;}
void main(){
  vec2 uv=(vUv-.5)*vec2(1.77,1.);float v=vor(uv*uCells);
  vec3 c1=vec3(.545,.361,.965),c2=vec3(.133,.827,.933),c3=vec3(.957,.443,.714);
  vec3 col=mix(c2,c1,smoothstep(0.,.1,v));col=mix(c3,col,smoothstep(0.,.05,v));
  col*=uBright;col=mix(vec3(.06,.05,.09),col,smoothstep(0.,.04,v)*.85+.15);
  gl_FragColor=vec4(col,1.);
}`;

const FBM_FS=`precision mediump float;
uniform float u_time,uSpeed,uOctaves,uLac;varying vec2 vUv;
float hsh(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float ns(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);return mix(mix(hsh(i),hsh(i+vec2(1,0)),u.x),mix(hsh(i+vec2(0,1)),hsh(i+vec2(1)),u.x),u.y);}
float fbm(vec2 p){float v=0.,a=.5;mat2 m=mat2(1.6,1.2,-1.2,1.6);int oct=int(clamp(uOctaves,1.,8.));for(int i=0;i<8;i++){if(i>=oct)break;v+=a*ns(p);p=m*p*uLac*.5;a*=.5;}return v;}
void main(){
  vec2 st=vUv*3.5;float t=u_time*uSpeed;
  vec2 q=vec2(fbm(st+t),fbm(st+vec2(1.)));
  vec2 r=vec2(fbm(st+q+vec2(1.7,9.2)+t*.15),fbm(st+q+vec2(8.3,2.8)+t*.126));
  float f=fbm(st+r);
  vec3 c1=vec3(.545,.361,.965),c2=vec3(.133,.827,.933),c3=vec3(.957,.443,.714);
  vec3 col=mix(c1,c3,clamp(f*f*4.,0.,1.));col=mix(col,c2,clamp(length(q),0.,1.));col*=f*1.8+.4;
  gl_FragColor=vec4(clamp(col,0.,1.),1.);
}`;

interface CtrlCfg{key:string;label:string;min:number;max:number;step:number;def:number;}
interface DemoCfg{name:string;emoji:string;desc:string;fs:string;controls:CtrlCfg[];}

const SHADER_DEMOS:DemoCfg[]=[
  {name:"Plasma Wave",emoji:"🌊",desc:"Sine-wave plasma — pure GLSL fragment math",fs:PLASMA_FS,controls:[
    {key:"uSpeed",label:"Speed",min:.1,max:5,step:.05,def:1},
    {key:"uFreq",label:"Frequency",min:.5,max:8,step:.1,def:3},
    {key:"uIntensity",label:"Intensity",min:.2,max:3,step:.05,def:1},
  ]},
  {name:"Ray March",emoji:"💎",desc:"SDF ray-marched torus — real-time GLSL lighting",fs:RAYMARCH_FS,controls:[
    {key:"uSpeed",label:"Spin Speed",min:.1,max:3,step:.05,def:.7},
    {key:"uSharp",label:"Specular",min:4,max:64,step:1,def:16},
    {key:"uGlow",label:"Glow",min:0,max:2,step:.05,def:.8},
  ]},
  {name:"Voronoi",emoji:"🔷",desc:"Animated Voronoi cells — GPU crystal patterns",fs:VORONOI_FS,controls:[
    {key:"uCells",label:"Cell Density",min:1,max:12,step:.5,def:4},
    {key:"uSpeed",label:"Speed",min:.1,max:4,step:.1,def:.8},
    {key:"uBright",label:"Brightness",min:.3,max:3,step:.1,def:1.5},
  ]},
  {name:"Fractal FBM",emoji:"🌌",desc:"Fractional Brownian Motion — multi-octave noise",fs:FBM_FS,controls:[
    {key:"uSpeed",label:"Speed",min:.05,max:2,step:.05,def:.3},
    {key:"uOctaves",label:"Octaves",min:1,max:8,step:1,def:5},
    {key:"uLac",label:"Lacunarity",min:1.5,max:3.5,step:.1,def:2},
  ]},
];

function ShaderCanvas({demo,params}:{demo:DemoCfg;params:Record<string,number>}){
  const mountRef=useRef<HTMLDivElement>(null);
  const paramsRef=useRef(params);
  useEffect(()=>{paramsRef.current=params;},[params]);
  useEffect(()=>{
    const el=mountRef.current;if(!el)return;
    const renderer=new THREE.WebGLRenderer({antialias:true});
    renderer.setClearColor(0x06050f);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
    renderer.setSize(el.clientWidth||300,el.clientHeight||300);
    el.appendChild(renderer.domElement);
    const camera=new THREE.OrthographicCamera(-1,1,1,-1,.1,10);
    camera.position.z=1;
    const scene=new THREE.Scene();
    const geo=new THREE.PlaneGeometry(2,2);
    const unis:Record<string,THREE.IUniform>={u_time:{value:0}};
    demo.controls.forEach(c=>{unis[c.key]={value:c.def};});
    const mat=new THREE.ShaderMaterial({vertexShader:VERT,fragmentShader:demo.fs,uniforms:unis});
    scene.add(new THREE.Mesh(geo,mat));
    let raf:number;
    const timer=new THREE.Timer();
    const animate=()=>{
      raf=requestAnimationFrame(animate);
      timer.update();
      unis.u_time.value=timer.getElapsed();
      demo.controls.forEach(c=>{unis[c.key].value=paramsRef.current[c.key];});
      renderer.render(scene,camera);
    };
    animate();
    const ro=new ResizeObserver(()=>{if(el)renderer.setSize(el.clientWidth,el.clientHeight);});
    ro.observe(el);
    return()=>{cancelAnimationFrame(raf);ro.disconnect();mat.dispose();geo.dispose();renderer.dispose();if(el.contains(renderer.domElement))el.removeChild(renderer.domElement);};
  },[demo]);
  return <div ref={mountRef} className="w-full h-full"/>;
}

const NAV_LINKS = ["About","Experience","Skills","Projects","Showcase","Contact"];
const NAV_ICONS: Record<string, React.ReactNode> = {
  About: <User2 size={18}/>, Experience: <Briefcase2 size={18}/>, Skills: <Cpu size={18}/>,
  Projects: <Box size={18}/>, Showcase: <Globe size={18}/>, Contact: <Mail size={18}/>,
};

// tiny icon aliases (lucide exports these names)
function User2({size}:{size:number}){ return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>; }
function Briefcase2({size}:{size:number}){ return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="12"/></svg>; }

function Nav({progress}:{progress:number}){
  const [open,setOpen]=useState(false);
  const [scrolled,setScrolled]=useState(false);
  const [active,setActive]=useState("");
  useEffect(()=>{
    const h=()=>setScrolled(window.scrollY>50);
    window.addEventListener("scroll",h,{passive:true});
    return()=>window.removeEventListener("scroll",h);
  },[]);
  useEffect(()=>{
    const observer=new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting) setActive(e.target.id); });
    },{threshold:0.4});
    NAV_LINKS.forEach(l=>{ const el=document.getElementById(l.toLowerCase()); if(el) observer.observe(el); });
    return()=>observer.disconnect();
  },[]);
  const go=(id:string)=>{ document.getElementById(id.toLowerCase())?.scrollIntoView({behavior:"smooth"}); setOpen(false); };
  return(
    <>
      {/* Top nav */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled?"gc-s border-b border-white/5":""}`}>
        <div className="pbar absolute bottom-0 left-0" style={{width:`${progress}%`}}/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <button onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} className="fd font-black text-xl">
            <span className="gt">adi</span><span className="text-white/30">·dev</span>
          </button>
          <div className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map(l=>(<button key={l} onClick={()=>go(l)} className={`fm text-[12px] transition-colors tracking-wide ${active===l.toLowerCase()?"text-purple-300":"text-slate-500 hover:text-purple-300"}`}>{l}</button>))}
            <button onClick={()=>go("Contact")} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-85 transition-all" style={{background:"linear-gradient(135deg,#8b5cf6,#22d3ee)"}}>Let&apos;s Talk 💬</button>
          </div>
          {/* hamburger only on tablet — hidden on mobile (bottom nav handles it) */}
          <button onClick={()=>setOpen(!open)} className="hidden sm:flex lg:hidden text-slate-400 hover:text-white p-2">{open?<X size={22}/>:<Menu size={22}/>}</button>
        </div>
        {open&&(<div className="hidden sm:flex lg:hidden gc-s border-t border-white/5 px-6 py-5 flex-col gap-4">{NAV_LINKS.map(l=>(<button key={l} onClick={()=>go(l)} className="text-left text-slate-400 hover:text-purple-300 fm text-sm transition-colors">./{l.toLowerCase()}</button>))}</div>)}
      </nav>

      {/* Mobile bottom nav — visible only on xs screens */}
      <div className="mob-nav sm:hidden">
        {NAV_LINKS.map(l=>(
          <button key={l} onClick={()=>go(l)}
            className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-all min-w-[44px] ${active===l.toLowerCase()?"text-purple-300":"text-slate-600"}`}>
            {NAV_ICONS[l]}
            <span className="fm text-[8px] tracking-wide">{l}</span>
          </button>
        ))}
      </div>
    </>
  );
}

function Hero(){
  const [ri,setRi]=useState(0); const [txt,setTxt]=useState(""); const [fwd,setFwd]=useState(true);
  useEffect(()=>{
    const target=ROLES[ri];
    if(fwd){ if(txt.length<target.length){const t=setTimeout(()=>setTxt(target.slice(0,txt.length+1)),52);return()=>clearTimeout(t);} const t=setTimeout(()=>setFwd(false),2000);return()=>clearTimeout(t); }
    else{ if(txt.length>0){const t=setTimeout(()=>setTxt(d=>d.slice(0,-1)),24);return()=>clearTimeout(t);} setRi(i=>(i+1)%ROLES.length);setFwd(true); }
  },[txt,fwd,ri]);
  return(
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Particles/>
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[650px] h-[400px] sm:h-[650px] rounded-full" style={{background:"radial-gradient(circle,rgba(139,92,246,.08) 0%,transparent 70%)"}}/>
        <div className="absolute bottom-1/4 right-0 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] rounded-full" style={{background:"radial-gradient(circle,rgba(244,114,182,.05) 0%,transparent 70%)"}}/>
      </div>
      {/* Floating badges — desktop only */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        {BADGES.map((b,i)=>(<div key={i} className="bf absolute" style={{...b.style,"--d":b.d,"--dl":b.dl} as React.CSSProperties}><div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full gc-s fm text-[11px] font-medium" style={{color:b.color,borderColor:`${b.color}25`}}><div className="w-1.5 h-1.5 rounded-full" style={{background:b.color}}/>{b.name}</div></div>))}
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto hero-safe pb-24 sm:pb-10">
        {/* Terminal pill */}
        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:.5}}>
          <div className="inline-flex items-center gap-2 gc-s rounded-full px-4 py-2 mb-6 border border-white/7 max-w-full overflow-hidden">
            <Terminal size={12} className="text-purple-400 shrink-0"/>
            <span className="fm text-[10px] sm:text-[11px] text-slate-400 truncate">
              <span className="text-purple-400">adi@dev</span>
              <span className="text-slate-600">:~$</span>
              <span className="text-green-400 ml-1.5 hidden xs:inline">./run portfolio</span>
              <span className="text-green-400 ml-1.5 xs:hidden">run with passion</span>
            </span>
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1 initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.75,delay:.1}}
          className="fd font-black text-[2.6rem] xs:text-5xl sm:text-6xl md:text-[5.5rem] text-white leading-[1.02] tracking-tight mb-4">
          Adi Chandra<br/><span className="gt">Narayana Dasari</span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.6,delay:.28}}
          className="fm text-base sm:text-xl md:text-2xl text-slate-500 h-7 sm:h-8 flex items-center justify-center gap-1 mb-4">
          <span className="text-purple-300">{txt}</span>
          <span className="text-purple-400" style={{animation:"blink 1s step-end infinite"}}>_</span>
        </motion.div>

        {/* Tagline */}
        <motion.p initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:.38}}
          className="text-slate-400 text-base sm:text-lg md:text-xl max-w-xl mx-auto mb-8 leading-relaxed fb px-2">
          {ME.tagline}
          <br/>
          <span className="text-slate-500 text-sm">6+ yrs · Hyderabad, India · M.Tech + B.Tech CS</span>
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:.48}}
          className="flex flex-col xs:flex-row gap-3 justify-center items-center mb-8 px-4">
          <button onClick={()=>document.getElementById("projects")?.scrollIntoView({behavior:"smooth"})}
            className="group flex items-center gap-2 w-full xs:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-semibold text-white transition-all justify-center"
            style={{background:"linear-gradient(135deg,#8b5cf6,#22d3ee)",boxShadow:"0 0 24px rgba(139,92,246,.3)"}}>
            See My Work <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
          </button>
          <a href={`mailto:${ME.email}`}
            className="flex items-center gap-2 w-full xs:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-semibold text-slate-300 gc border-white/10 transition-all justify-center">
            <Mail size={16}/> Say Hello ✌️
          </a>
        </motion.div>

        {/* Stat pills */}
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1,delay:.65}}
          className="grid grid-cols-2 xs:grid-cols-4 gap-2 max-w-sm xs:max-w-none mx-auto px-4 xs:px-0">
          {[["6+","Years"],["4","Companies"],["60+","Projects"],["M.Tech","Qualified"]].map(([v,l],i)=>(
            <div key={i} className="gc-s rounded-xl px-3 py-2.5 text-center border border-white/7">
              <div className="fd font-bold text-white text-sm sm:text-base">{v}</div>
              <div className="fm text-[9px] sm:text-[10px] text-slate-500">{l}</div>
            </div>
          ))}
        </motion.div>

        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1,delay:.9}}
          className="mt-10 sm:mt-14 flex flex-col items-center gap-2 text-slate-700">
          <ChevronDown size={16} className="animate-bounce"/>
        </motion.div>
      </div>
    </section>
  );
}

const ABOUT_LINES=[
  `{`,
  `  "name":     "Adi Chandra Narayana Dasari",`,
  `  "location": "Hyderabad, India 🇮🇳",`,
  `  "stack":    ["Three.js","React","WebGL","Unity3D"],`,
  `  "edu":      "M.Tech + B.Tech CS @ KHIT",`,
  `  "companies":["3rd Flix","Practically",`,
  `               "Yugasa Software Labs","Cognitivebotics"],`,
  `  "available": true // 👋 Let's build!`,
  `}`,
];

function About(){
  const [ref,v]=useVisible();
  const [step,setStep]=useState(-1);
  const [done,setDone]=useState(false);

  useEffect(()=>{
    if(step<0||done)return;
    if(step>=ABOUT_LINES.length){setDone(true);return;}
    const t=setTimeout(()=>setStep(s=>s+1),160);
    return()=>clearTimeout(t);
  },[step,done]);

  const runAnim=()=>{setStep(0);setDone(false);};

  return(
  <section id="about" className="py-16 sm:py-28 px-4 sm:px-6 relative overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <div ref={ref} className={`transition-all duration-1000 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-14"}`}>
        <div className="text-center mb-10 sm:mb-16">
          <div className="sl2 mb-3">// 01 — ABOUT ME</div>
          <h2 className="fd text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">The Human Behind <span className="gt">the Code</span></h2>
          <p className="text-slate-500 text-base sm:text-lg max-w-xl mx-auto">Not just a developer — a builder who genuinely loves what they do.</p>
        </div>
        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8">
          <div className="lg:col-span-3 space-y-4 sm:space-y-5">
            {/* Terminal bio card */}
            <div className="gc rounded-2xl p-4 sm:p-7">
              <div className="gc-s rounded-xl p-3 sm:p-4 mb-4 sm:mb-5 border border-white/5">
                {/* Chrome bar */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/70"/>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70"/>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/70"/>
                    <span className="fm text-[10px] text-slate-600 ml-1">about.json</span>
                  </div>
                  {done?(
                    <span className="fm text-[9px] text-green-400 tracking-widest flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"/>done
                    </span>
                  ):(
                    <button onClick={runAnim}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg fm text-[10px] font-semibold transition-all active:scale-95"
                      style={{background:"rgba(34,197,94,.12)",border:"1px solid rgba(34,197,94,.3)",color:"#4ade80"}}>
                      {step>=0?"running…":"▶ run"}
                    </button>
                  )}
                </div>
                {/* Animated output */}
                <pre className="fm text-[9.5px] sm:text-[11px] text-slate-400 leading-relaxed overflow-x-auto" style={{minHeight:"8.5em"}}>
                  {step<0?(
                    <span className="text-slate-600 italic">{"// click ▶ run to execute"}</span>
                  ):(
                    <>
                      {ABOUT_LINES.slice(0,step).map((line,i)=>(
                        <span key={i} className="block" style={{animationName:"slide-up-mob",animationDuration:".18s",animationFillMode:"both"}}>
                          {line.startsWith('  "') ? (
                            <>
                              <span className="text-slate-600">{line.match(/^(\s+)/)?.[1]??""}</span>
                              <span className="text-cyan-400">{line.match(/"[^"]+"/)?.[0]??""}</span>
                              <span className="text-slate-500">{line.includes(":") ? ":" : ""}</span>
                              <span className="text-purple-300">{line.replace(/^\s+"[^"]+"\s*:\s*/,"")}</span>
                            </>
                          ):(
                            <span className="text-slate-400">{line}</span>
                          )}
                        </span>
                      ))}
                      {!done&&<span className="text-purple-400" style={{animation:"blink 1s step-end infinite"}}>▋</span>}
                    </>
                  )}
                </pre>
              </div>
              <p className="text-slate-300 leading-relaxed fb text-sm sm:text-base mb-3">{ME.bio}</p>
              <p className="text-slate-400 leading-relaxed fb text-sm sm:text-base">{ME.bio2}</p>
            </div>
            {/* Contact */}
            <div className="gc rounded-2xl p-4 sm:p-5">
              <div className="sl2 mb-3">// contact</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {[{icon:Mail,v:ME.email,href:`mailto:${ME.email}`},{icon:Phone,v:ME.phone,href:`tel:${ME.phone}`},{icon:MapPin,v:ME.location,href:"#"},{icon:Linkedin,v:"linkedin.com/in/adi-chandra…",href:ME.linkedin}].map(({icon:Icon,v:val,href},i)=>(
                  <a key={i} href={href} className="flex items-center gap-3 text-slate-400 hover:text-purple-300 fm text-[11px] sm:text-[12px] transition-colors min-h-[44px]">
                    <Icon size={14} className="text-purple-400 shrink-0"/><span className="truncate">{val}</span>
                  </a>
                ))}
              </div>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              {[{v:"6+",l:"Years Coding",e:"⚡"},{v:"4",l:"Companies",e:"🏢"},{v:"3",l:"3D Platforms",e:"🌐"},{v:"∞",l:"Bugs Fixed",e:"🐛"}].map((s,i)=>(
                <div key={i} className="gc rounded-xl p-3 sm:p-4 text-center">
                  <div className="text-xl mb-1">{s.e}</div>
                  <div className="fd font-black text-white text-lg sm:text-xl gt-p">{s.v}</div>
                  <div className="fm text-[9px] sm:text-[10px] text-slate-500 mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Education col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="sl2 mb-2">// education</div>
            {EDUCATION.map((ed,i)=>(
              <div key={i} className="gc rounded-2xl p-5 sm:p-6">
                <div className="text-3xl mb-3">{ed.emoji}</div>
                <div className="fm text-[10px] text-purple-400 tracking-widest mb-1">{ed.period}</div>
                <h3 className="fd font-bold text-white text-base sm:text-lg mb-1">{ed.degree}</h3>
                <p className="text-purple-300 text-sm mb-3 fb">{ed.college}</p>
                <p className="fb text-slate-400 text-sm leading-relaxed italic">"{ed.note}"</p>
              </div>
            ))}
            <div className="gc rounded-2xl p-5 sm:p-6 border border-purple-500/20" style={{background:"linear-gradient(135deg,rgba(139,92,246,.06),rgba(34,211,238,.03))"}}>
              <Heart size={18} className="text-pink-400 mb-3"/>
              <div className="fd font-bold text-white mb-2">What drives me</div>
              <p className="fb text-slate-400 text-sm leading-relaxed">I get genuinely excited when a Three.js render finally hits 60fps after hours of shader debugging. That&apos;s the feeling that keeps me going.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}

function Experience(){ const [ref,v]=useVisible(); const [open,setOpen]=useState<number|null>(0); return(
  <section id="experience" className="py-16 sm:py-28 px-4 sm:px-6">
    <div className="max-w-5xl mx-auto">
      <div ref={ref} className={`transition-all duration-1000 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-14"}`}>
        <div className="text-center mb-10 sm:mb-16">
          <div className="sl2 mb-3">// 02 — EXPERIENCE</div>
          <h2 className="fd text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">Where I&apos;ve <span className="gt">Grown</span></h2>
          <p className="text-slate-500 text-base sm:text-lg">From intern to senior — every company shaped who I am as an engineer.</p>
        </div>
        <div className="relative">
          <div className="absolute left-7 top-0 bottom-0 w-px tll hidden md:block"/>
          <div className="space-y-3 sm:space-y-4">
            {EXPERIENCE.map((exp,i)=>(
              <div key={i} className="relative">
                <div className="absolute left-5 top-8 w-5 h-5 rounded-full border-2 hidden md:flex items-center justify-center" style={{borderColor:exp.color,background:`${exp.color}1a`}}>
                  <div className="w-1.5 h-1.5 rounded-full" style={{background:exp.color}}/>
                </div>
                <div className={`md:ml-20 gc rounded-2xl overflow-hidden border transition-all duration-300 ${open===i?"":"border-white/7"}`} style={open===i?{borderColor:`${exp.color}40`,boxShadow:`0 0 28px ${exp.color}10`}:{}}>
                  {/* Tap/click header */}
                  <button onClick={()=>setOpen(open===i?null:i)} className="w-full text-left p-4 sm:p-6 active:bg-white/5 transition-colors min-h-[72px]">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <span className="text-xl sm:text-2xl">{exp.emoji}</span>
                        <div>
                          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1">
                            <h3 className="fd font-bold text-white text-base sm:text-lg leading-tight">{exp.role}</h3>
                            <span className="fm text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full" style={{color:exp.color,background:`${exp.color}18`,border:`1px solid ${exp.color}28`}}>{exp.company}</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5 fm text-[10px] sm:text-[11px] text-slate-500">
                            <span>{exp.period}</span><span>·</span><span>{exp.duration}</span>
                          </div>
                        </div>
                      </div>
                      <ChevronDown size={17} className={`text-slate-600 shrink-0 mt-1.5 transition-transform duration-300 ${open===i?"rotate-180":""}`}/>
                    </div>
                  </button>
                  {open===i&&(
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6 border-t border-white/5">
                      <p className="fb text-slate-300 leading-relaxed pt-4 mb-4 text-sm sm:text-base">{exp.summary}</p>
                      <div className="space-y-2 mb-4">
                        {exp.bullets.map((b,j)=>(
                          <div key={j} className="flex items-start gap-2.5 fb text-[12px] sm:text-[13px] text-slate-400">
                            <CheckCircle size={12} className="shrink-0 mt-0.5" style={{color:exp.color}}/>{b}
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.tech.map(t=>(<span key={t} className="fm text-[9px] sm:text-[10px] px-2 py-0.5 sm:py-1 rounded-lg border" style={{color:exp.color,background:`${exp.color}0d`,borderColor:`${exp.color}22`}}>{t}</span>))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
); }

function Skills(){ const [ref,v]=useVisible(); return(
  <section id="skills" className="py-16 sm:py-28 px-4 sm:px-6">
    <div className="max-w-7xl mx-auto">
      <div ref={ref} className={`transition-all duration-1000 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-14"}`}>
        <div className="text-center mb-10 sm:mb-16">
          <div className="sl2 mb-3">// 03 — SKILLS</div>
          <h2 className="fd text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">My <span className="gt">Toolkit</span></h2>
          <p className="text-slate-500 text-base sm:text-lg">Shaped across 4 companies and 6+ years of real production work.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {SKILLS_CATS.map((cat,i)=>{ const Icon=cat.icon; return(
            <div key={i} className="gc rounded-2xl p-4 sm:p-6 border border-white/7">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{background:`${cat.color}16`,border:`1px solid ${cat.color}28`}}>
                  <Icon size={16} style={{color:cat.color}}/>
                </div>
                <div className="fd font-bold text-white text-sm">{cat.cat}</div>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {cat.items.map(sk=>(
                  <span key={sk} className="fm text-[10px] sm:text-[11px] px-2 sm:px-2.5 py-1 rounded-lg gc-s border border-white/7 text-slate-400 cursor-default transition-all"
                    onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.borderColor=`${cat.color}50`;el.style.color=cat.color;}}
                    onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.borderColor="";el.style.color="";}}>
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          );})}
        </div>
      </div>
    </div>
  </section>
); }

function Projects(){ const [ref,v]=useVisible(); const [tab,setTab]=useState<0|1>(0); const [open,setOpen]=useState<number|null>(null); return(
  <section id="projects" className="py-16 sm:py-28 px-4 sm:px-6">
    <div className="max-w-7xl mx-auto">
      <div ref={ref} className={`transition-all duration-1000 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-14"}`}>
        <div className="text-center mb-8 sm:mb-10">
          <div className="sl2 mb-3">// 04 — PROJECTS</div>
          <h2 className="fd text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">Things I&apos;ve <span className="gt">Built</span></h2>
          <p className="text-slate-500 text-base sm:text-lg">Personal projects for the love of it — and client work delivered with pride.</p>
        </div>
        {/* Tab switcher — full width on mobile */}
        <div className="flex justify-center mb-7 sm:mb-10">
          <div className="gc-s rounded-xl p-1 flex gap-1 border border-white/7 w-full sm:w-auto">
            {["🔨 Personal","💼 Freelance"].map((label,i)=>(
              <button key={i} onClick={()=>{setTab(i as 0|1);setOpen(null);}}
                className={`flex-1 sm:flex-none px-4 sm:px-5 py-2.5 rounded-lg fm text-[11px] sm:text-[12px] font-medium transition-all duration-200 min-h-[44px] ${tab===i?"text-white":"text-slate-500"}`}
                style={tab===i?{background:"linear-gradient(135deg,#8b5cf6,#7c3aed)"}:{}}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Personal projects */}
        {tab===0&&(
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {PERSONAL_PROJECTS.map((p,i)=>(
              <div key={i} className="gc rounded-2xl p-4 sm:p-6 border border-white/7">
                <div className="text-3xl mb-3 sm:mb-4">{p.emoji}</div>
                <h3 className="fd font-bold text-white text-base sm:text-lg mb-2">{p.title}</h3>
                <p className="fb text-slate-400 text-sm leading-relaxed mb-3 sm:mb-4">{p.desc}</p>
                <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-5">
                  {p.points.map((pt,j)=>(
                    <li key={j} className="flex items-start gap-2 fb text-[12px] sm:text-[13px] text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{background:p.color}}/>{pt}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5">
                  {p.tech.map(t=>(<span key={t} className="fm text-[9px] sm:text-[10px] px-2 py-0.5 rounded gc-s border border-white/7 text-slate-400">{t}</span>))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Freelance projects */}
        {tab===1&&(
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
            {FREELANCE_PROJECTS.map((p,i)=>(
              <div key={i} className="gc rounded-2xl overflow-hidden border border-white/7 cursor-pointer active:opacity-90 transition-opacity"
                onClick={()=>setOpen(open===i?null:i)}>
                {/* Gradient header */}
                <div className="h-24 sm:h-28 relative overflow-hidden" style={{background:`linear-gradient(135deg,${p.g1},${p.g2})`}}>
                  <div className="absolute inset-0 dg opacity-30"/>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl sm:text-6xl opacity-20 select-none">{p.emoji}</span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <a href={`https://${p.url}`} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()}
                      className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center text-white">
                      <ExternalLink size={14}/>
                    </a>
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="fd font-bold text-white text-lg sm:text-xl">{p.title}</h3>
                      <p className="fm text-[11px] sm:text-[12px]" style={{color:p.color}}>{p.sub}</p>
                    </div>
                    <ChevronDown size={16} className={`text-slate-600 shrink-0 mt-1 transition-transform ${open===i?"rotate-180":""}`}/>
                  </div>
                  <p className="fb text-slate-400 text-[12px] sm:text-sm leading-relaxed mb-3 sm:mb-4">{p.desc}</p>
                  {/* Metrics — 2-col on mobile, 4-col on sm+ */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3 sm:mb-4">
                    {p.metrics.map((m,j)=>(
                      <div key={j} className="text-center p-2 rounded-lg" style={{background:`${p.color}0d`}}>
                        <div className="fd font-black text-white text-[12px] sm:text-[13px]">{m.v}</div>
                        <div className="fm text-[8px] sm:text-[9px] text-slate-500 mt-0.5 leading-tight">{m.l}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {p.tech.map(t=>(<span key={t} className="fm text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded gc-s border border-white/7 text-slate-400">{t}</span>))}
                  </div>
                  {open===i&&(
                    <div className="mt-4 pt-4 border-t border-white/7">
                      <a href={`https://${p.url}`} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()}
                        className="inline-flex items-center gap-2 fm text-[11px] px-3 py-2.5 rounded-lg min-h-[44px] transition-all"
                        style={{color:p.color,background:`${p.color}14`,border:`1px solid ${p.color}28`}}>
                        <Globe size={12}/> Visit {p.url}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </section>
); }

function Showcase(){
  const [ref,v]=useVisible();
  const [d,setD]=useState(0);
  const demo=SHADER_DEMOS[d];
  const initP=(i:number)=>Object.fromEntries(SHADER_DEMOS[i].controls.map(c=>[c.key,c.def]));
  const [params,setParams]=useState(()=>initP(0));
  const changeDemo=(i:number)=>{setD(i);setParams(initP(i));};
  const setParam=(k:string,val:number)=>setParams(p=>({...p,[k]:val}));

  const Controls=({cls=""}:{cls?:string})=>(
    <div className={cls}>
      <div className="sl2 mb-3">// uniform controls</div>
      {demo.controls.map(c=>(
        <div key={c.key} className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="fm text-[11px] text-slate-400">{c.label}</span>
            <span className="fm text-[11px] text-cyan-400 tabular-nums">{params[c.key].toFixed(2)}</span>
          </div>
          <input type="range" className="su"
            min={c.min} max={c.max} step={c.step} value={params[c.key]}
            onChange={e=>setParam(c.key,parseFloat(e.target.value))}/>
          <div className="flex justify-between mt-0.5">
            <span className="fm text-[9px] text-slate-700 italic">{c.key}</span>
            <span className="fm text-[9px] text-slate-700">{c.min} – {c.max}</span>
          </div>
        </div>
      ))}
    </div>
  );

  return(
  <section id="showcase" className="py-16 sm:py-28 px-4 sm:px-6 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full pointer-events-none opacity-[.04]" style={{background:"radial-gradient(circle,#8b5cf6,transparent)"}}/>
    <div className="max-w-7xl mx-auto">
      <div ref={ref} className={`transition-all duration-1000 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-14"}`}>
        <div className="text-center mb-8 sm:mb-14">
          <div className="sl2 mb-3">// 05 — 3D SHOWCASE</div>
          <h2 className="fd text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">Real <span className="gt">GLSL Shaders</span></h2>
          <p className="text-slate-500 text-base sm:text-lg max-w-xl mx-auto">Live Three.js + GLSL demos. Drag the sliders to change shader uniforms in real time.</p>
        </div>

        {/* Mobile: horizontal scroll tabs */}
        <div className="demo-tabs lg:hidden mb-4 -mx-1 px-1">
          {SHADER_DEMOS.map((dm,i)=>(
            <button key={i} onClick={()=>changeDemo(i)}
              className={`demo-tab flex items-center gap-2 px-4 py-2.5 rounded-xl border fm text-[11px] font-medium whitespace-nowrap min-h-[44px] transition-all ${d===i?"gb gc text-white":"gc-s border-white/7 text-slate-400"}`}>
              <span>{dm.emoji}</span>{dm.name}
              {d===i&&<div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"/>}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-5">
          {/* Desktop sidebar */}
          <div className="hidden lg:flex flex-col gap-3">
            {SHADER_DEMOS.map((dm,i)=>(
              <button key={i} onClick={()=>changeDemo(i)} className={`text-left p-4 rounded-2xl border transition-all duration-300 ${d===i?"gb gc":"gc border-white/7"}`}>
                <div className="flex items-center gap-3 mb-1"><span className="text-xl">{dm.emoji}</span><div className="fd font-semibold text-white text-sm">{dm.name}</div></div>
                <div className="fm text-[11px] text-slate-500 leading-relaxed">{dm.desc}</div>
                {d===i&&(<div className="mt-2 flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"/><span className="fm text-[9px] text-purple-400 tracking-widest">LIVE · GLSL</span></div>)}
              </button>
            ))}
            {/* Uniform controls — desktop */}
            <div className="gc rounded-2xl p-4 border border-purple-500/20" style={{background:"linear-gradient(135deg,rgba(139,92,246,.04),rgba(34,211,238,.02))"}}>
              <Controls/>
            </div>
          </div>

          {/* Shader canvas */}
          <div className="lg:col-span-2 gc-s rounded-2xl overflow-hidden border border-white/7 sw flex flex-col">
            <div className="sl-anim"/>
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/7 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/65"/>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/65"/>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/65"/>
                <span className="fm text-[10px] sm:text-[11px] text-slate-600 ml-2">{demo.name.toLowerCase().replace(/ /g,"_")}.glsl</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"/>
                <span className="fm text-[9px] sm:text-[10px] text-purple-400/60">WebGL · Three.js · 60fps</span>
              </div>
            </div>
            <div className="flex-1" style={{minHeight:"min(360px,52vw)"}}>
              <ShaderCanvas key={d} demo={demo} params={params}/>
            </div>
            {/* Mobile uniform sliders */}
            <div className="lg:hidden border-t border-white/7 px-4 py-4">
              <Controls/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}

function Contact(){
  const [ref,v]=useVisible();
  const [form,setForm]=useState({name:"",email:"",message:""});
  const [status,setStatus]=useState<"idle"|"sending"|"sent"|"error">("idle");

  const submit=async(e:React.FormEvent)=>{
    e.preventDefault();
    setStatus("sending");
    try{
      const res=await fetch("https://formsubmit.co/ajax/chandu46514@gmail.com",{
        method:"POST",
        headers:{"Content-Type":"application/json","Accept":"application/json"},
        body:JSON.stringify({
          name:form.name,
          email:form.email,
          message:form.message,
          _subject:`Portfolio Contact from ${form.name}`,
          _captcha:"false",
        }),
      });
      if(res.ok){setStatus("sent");setForm({name:"",email:"",message:""});}
      else setStatus("error");
    }catch{setStatus("error");}
  };

  return(
    <section id="contact" className="py-16 sm:py-28 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[700px] h-[250px] sm:h-[350px] pointer-events-none" style={{background:"radial-gradient(ellipse,rgba(139,92,246,.06),transparent)"}}/>
      <div className="max-w-5xl mx-auto">
        <div ref={ref} className={`transition-all duration-1000 ${v?"opacity-100 translate-y-0":"opacity-0 translate-y-14"}`}>
          <div className="text-center mb-10 sm:mb-14">
            <div className="sl2 mb-3">// 06 — CONTACT</div>
            <h2 className="fd text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">Let&apos;s Build <span className="gt">Something Together</span> 🚀</h2>
            <p className="text-slate-500 text-base sm:text-lg">I reply fast. Reach out about projects, roles, or just Three.js geekery.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
            {/* Form */}
            <div className="gc rounded-2xl p-5 sm:p-7 border border-white/7">
              {status==="sent"?(
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="text-5xl mb-4">🎉</div>
                  <div className="fd font-bold text-white text-xl mb-2">Message sent!</div>
                  <p className="fb text-slate-400 text-sm">I&apos;ll reply to you within 24 hours.</p>
                  <button onClick={()=>setStatus("idle")} className="mt-6 fm text-[11px] text-purple-400 hover:text-purple-300 underline underline-offset-2">Send another</button>
                </div>
              ):status==="error"?(
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="text-5xl mb-4">⚠️</div>
                  <div className="fd font-bold text-white text-xl mb-2">Something went wrong</div>
                  <p className="fb text-slate-400 text-sm mb-4">Try emailing directly at <a href={`mailto:${ME.email}`} className="text-purple-300 underline">{ME.email}</a></p>
                  <button onClick={()=>setStatus("idle")} className="fm text-[11px] text-purple-400 hover:text-purple-300 underline underline-offset-2">Try again</button>
                </div>
              ):(
                <form onSubmit={submit} className="space-y-4">
                  <div className="sl2 mb-1">// drop me a message</div>
                  {[{k:"name",ph:"Your name",t:"text"},{k:"email",ph:"your@email.com",t:"email"}].map(({k,ph,t})=>(
                    <div key={k}>
                      <label className="fm text-[11px] text-slate-600 block mb-1.5">{k}</label>
                      <input type={t} required value={form[k as keyof typeof form]} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))} placeholder={ph}
                        className="w-full px-4 py-3.5 rounded-xl gc-s border border-white/10 text-white placeholder-slate-700 focus:outline-none focus:border-purple-500/50 transition-all fm text-sm min-h-[48px]"/>
                    </div>
                  ))}
                  <div>
                    <label className="fm text-[11px] text-slate-600 block mb-1.5">message</label>
                    <textarea required rows={4} value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} placeholder="Tell me about your project or opportunity..."
                      className="w-full px-4 py-3.5 rounded-xl gc-s border border-white/10 text-white placeholder-slate-700 focus:outline-none focus:border-purple-500/50 transition-all fm text-sm resize-none"/>
                  </div>
                  <button type="submit" disabled={status==="sending"}
                    className="w-full py-4 rounded-xl font-semibold text-white min-h-[52px] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{background:"linear-gradient(135deg,#8b5cf6,#22d3ee)"}}>
                    {status==="sending"?"Sending…":"Send it! 🚀"}
                  </button>
                </form>
              )}
            </div>
            {/* Info */}
            <div className="space-y-3 sm:space-y-4">
              <div className="gc rounded-2xl p-5 sm:p-6 border border-white/7">
                <div className="flex items-center gap-2 mb-3"><div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"/><span className="fm text-[12px] text-green-400">Available for new projects</span></div>
                <h3 className="fd font-bold text-white text-lg mb-2">Open to Opportunities</h3>
                <p className="fb text-slate-400 text-sm leading-relaxed">Senior engineering roles, Three.js/WebGL projects, full-stack product builds. Remote-first, open to Hyderabad.</p>
              </div>
              {[
                {Icon:Mail,    label:"Email",    val:ME.email,    href:`mailto:${ME.email}`,         target:"_self"},
                {Icon:Phone,   label:"Phone",    val:ME.phone,    href:`tel:+91${ME.phone}`,          target:"_self"},
                {Icon:MapPin,  label:"Location", val:ME.location, href:"#",                           target:"_self"},
                {Icon:Linkedin,label:"LinkedIn", val:"adi-chandra-narayana-dasari", href:ME.linkedin, target:"_blank"},
              ].map(({Icon,label,val,href,target},i)=>(
                <a key={i} href={href} target={target} rel={target==="_blank"?"noopener noreferrer":undefined}
                  className="flex items-center gap-3 gc rounded-xl p-3.5 sm:p-4 border border-white/7 group min-h-[56px]">
                  <div className="w-9 h-9 rounded-lg gc-s border border-white/10 flex items-center justify-center text-slate-500 group-hover:text-purple-400 group-hover:border-purple-500/30 transition-all shrink-0">
                    <Icon size={15}/>
                  </div>
                  <div className="min-w-0">
                    <div className="text-white text-sm font-semibold">{label}</div>
                    <div className="fm text-[10px] sm:text-[11px] text-slate-500 truncate">{val}</div>
                  </div>
                  <ArrowRight size={14} className="ml-auto text-slate-700 group-hover:text-purple-400 shrink-0 transition-all"/>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer(){ const links=["About","Experience","Skills","Projects","Showcase","Contact"]; return(
  <footer className="py-8 sm:py-10 px-4 sm:px-6 border-t border-white/5 pb-[calc(2rem+env(safe-area-inset-bottom))] sm:pb-10">
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-center sm:text-left">
      <div>
        <div className="fd font-black text-xl mb-0.5"><span className="gt">adi</span><span className="text-white/30">·dev</span></div>
        <div className="fm text-[10px] text-slate-600">Adi Chandra Narayana Dasari · Senior Developer · Hyderabad</div>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {links.map(l=>(<button key={l} onClick={()=>document.getElementById(l.toLowerCase())?.scrollIntoView({behavior:"smooth"})} className="fm text-slate-600 hover:text-slate-400 text-[12px] transition-colors">{l}</button>))}
      </div>
      <div className="fb text-slate-500 text-sm">Crafted with <span className="text-pink-400">♥</span> · <span className="fm text-[11px] text-slate-600">v3.0</span></div>
    </div>
  </footer>
); }

export default function App(){ const progress=useScrollPct(); return(
  <div className="min-h-screen bg-[#06050f] text-[#f1f0ff] overflow-x-hidden">
    <style>{G}</style>
    <Cursor/>
    <Nav progress={progress}/>
    <main className="sm:pb-0">
      <Hero/><About/><Experience/><Skills/><Projects/><Showcase/><Contact/>
    </main>
    <Footer/>
  </div>
); }
