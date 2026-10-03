/* ============================================================
   BioSkill-Legacy — Interactions
   Menu, stakeholder tabs, swipe rows, sticky submit bar,
   decision-chain figure, section highlight, progress fallback.
   ============================================================ */
(function () {
'use strict';
document.querySelectorAll('.bsl:not([data-on])').forEach(function (root) {
root.setAttribute('data-on', '');
var menu = root.querySelector('.menu');
if (menu) {
var sum = menu.querySelector('summary');
menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { menu.open = false; }); });
menu.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menu.open) { menu.open = false; sum.focus(); } });
document.addEventListener('pointerdown', function (e) { if (menu.open && !menu.contains(e.target)) { menu.open = false; } });
menu.addEventListener('focusout', function (e) { if (menu.open && e.relatedTarget && !menu.contains(e.relatedTarget)) { menu.open = false; } });
}
var tabs = root.querySelectorAll('.stab');
var stakes = root.querySelectorAll('.stake');
if (tabs.length) {
var pick = function (i, focus) {
tabs.forEach(function (t, j) { t.setAttribute('aria-selected', j === i ? 'true' : 'false'); t.setAttribute('tabindex', j === i ? '0' : '-1'); });
stakes.forEach(function (st, j) { st.classList.toggle('on', j === i); });
if (focus) { tabs[i].focus(); }
};
var strip = root.querySelector('.stabs');
var syncPanels = function () {
var on = strip && getComputedStyle(strip).display !== 'none';
stakes.forEach(function (st, j) {
if (on) { st.setAttribute('role', 'tabpanel'); st.setAttribute('aria-labelledby', 'stab-' + (j + 1)); st.setAttribute('tabindex', '0'); }
else { st.removeAttribute('role'); st.removeAttribute('aria-labelledby'); st.removeAttribute('tabindex'); }
});
};
if ('ResizeObserver' in window) { new ResizeObserver(syncPanels).observe(root); } else { window.addEventListener('resize', syncPanels); }
tabs.forEach(function (t, i) {
t.addEventListener('click', function () { pick(i); });
t.addEventListener('keydown', function (e) { var k = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; if (k) { e.preventDefault(); pick((i + k + tabs.length) % tabs.length, true); } });
});
pick(0);
root.classList.add('tabs-on');
syncPanels();
}
root.classList.add('swipe-on');
if ('ResizeObserver' in window) {
var ro = new ResizeObserver(function (es) { es.forEach(function (e) { var el = e.target; if (el.scrollWidth > el.clientWidth + 1) { el.setAttribute('tabindex', '0'); } else { el.removeAttribute('tabindex'); } }); });
root.querySelectorAll('.swipe').forEach(function (el) { ro.observe(el); });
}
var post = root.querySelector('#post');
var bar = root.querySelector('.mbar');
if (post && bar) {
var go = post.querySelector('.gobtn');
var queued = false;
var check = function () {
queued = false;
var r = post.getBoundingClientRect();
var h = window.innerHeight;
if (!bar.contains(document.activeElement)) { root.classList.toggle('at-post', r.top < h * 0.7 && r.bottom > h * 0.3); }
};
window.addEventListener('scroll', function () { if (!queued) { queued = true; requestAnimationFrame(check); } }, { passive: true });
bar.querySelector('a').addEventListener('click', function () { if (go) { go.focus({ preventScroll: true }); } setTimeout(check, 60); });
check();
}
var rec = root.querySelector('.rec');
var rcards = root.querySelectorAll('.rcard');
var auto = null;
var rio = null;
var manual = false;
if (rec && rcards.length) {
root.classList.add('rec-on');
var setStage = function (i, focus) {
rec.setAttribute('data-s', String(i));
rcards.forEach(function (c, j) { c.setAttribute('aria-checked', j === i ? 'true' : 'false'); c.setAttribute('tabindex', j === i ? '0' : '-1'); });
if (focus) { rcards[i].focus(); }
};
var stopAuto = function () { if (auto) { clearInterval(auto); auto = null; } };
var takeOver = function () { manual = true; stopAuto(); if (rio) { rio.disconnect(); rio = null; } };
var group = root.querySelector('.rcards');
if (group) {
group.addEventListener('focusin', takeOver);
group.addEventListener('pointerdown', takeOver);
}
rcards.forEach(function (c, i) {
c.addEventListener('click', function () { takeOver(); setStage(i); });
c.addEventListener('keydown', function (e) { var k = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; if (k) { e.preventDefault(); takeOver(); setStage((i + k + rcards.length) % rcards.length, true); } });
});
var still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!still && 'IntersectionObserver' in window) {
rio = new IntersectionObserver(function (es) { es.forEach(function (e) {
if (!e.isIntersecting || manual || !rio) { return; }
rio.disconnect();
rio = null;
var seq = [0, 1, 2, 3, 1];
var n = 0;
setStage(seq[n]);
auto = setInterval(function () { n += 1; if (manual || n >= seq.length) { stopAuto(); return; } setStage(seq[n]); }, 2200);
}); }, { threshold: 0.45 });
rio.observe(rec);
}
}
if ('IntersectionObserver' in window) {
var links = root.querySelectorAll('.nav a[href^="#"], .mnav a[href^="#"]');
var secs = root.querySelectorAll('main section[id]');
var spy = null;
var mark = function (es) { es.forEach(function (e) {
if (!e.isIntersecting) { return; }
links.forEach(function (a) { if (a.getAttribute('href') === '#' + e.target.id) { a.setAttribute('aria-current', 'true'); } else { a.removeAttribute('aria-current'); } });
}); };
var buildSpy = function () {
if (spy) { spy.disconnect(); }
var h = window.innerHeight;
spy = new IntersectionObserver(mark, { rootMargin: '-' + Math.round(h * 0.45) + 'px 0px -' + Math.round(h * 0.5) + 'px 0px' });
secs.forEach(function (sec) { spy.observe(sec); });
};
buildSpy();
var spyTimer = null;
window.addEventListener('resize', function () { clearTimeout(spyTimer); spyTimer = setTimeout(buildSpy, 200); });
var loop = root.querySelector('.loop');
if (loop) {
var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { loop.classList.add('run'); io.disconnect(); } }); }, { threshold: 0.4 });
io.observe(loop);
}
}
});

/* Scroll progress fallback where scroll-driven animations are unsupported */
var prog = document.querySelector('.prog');
var calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prog && (calm || !(window.CSS && CSS.supports && CSS.supports('animation-timeline: scroll()')))) {
prog.classList.add('js');
var tick = false;
var upd = function () {
tick = false;
var h = document.documentElement;
var max = h.scrollHeight - h.clientHeight;
prog.style.transform = 'scaleX(' + (max > 0 ? h.scrollTop / max : 0) + ')';
};
window.addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(upd); } }, { passive: true });
upd();
}
})();
