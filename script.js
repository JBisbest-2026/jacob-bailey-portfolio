const toggle=document.querySelector(".menu-toggle");
const nav=document.querySelector(".nav");

if(toggle && nav){
  toggle.addEventListener("click",()=>{
    const open=nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded",open);
    toggle.setAttribute("aria-label",open ? "Close navigation" : "Open navigation");
  });
  document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
}

const year=document.getElementById("year");
if(year) year.textContent=new Date().getFullYear();

const sections=[...document.querySelectorAll("main section[id]")];
const links=[...document.querySelectorAll(".nav a")];

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      links.forEach(link=>link.classList.toggle("active",link.getAttribute("href")==="#"+entry.target.id));
    }
  });
},{rootMargin:"-35% 0px -55% 0px",threshold:0});

sections.forEach(section=>observer.observe(section));

const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
},{threshold:.08});

document.querySelectorAll(".section-head,.card,.project-card,.timeline-item,.media-tile,.career-path>div,.band-story,.martial,.companies,.story-copy").forEach(el=>{
  el.classList.add("reveal");
  revealObserver.observe(el);
});
