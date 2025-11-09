function heartPoints({ scale = 1, step = 0.02, centerX = 0, centerY = 0 } = {}) {
  const pts = [];
  for (let t = 0; t <= 2 * Math.PI; t += step) {
    const x = 16 * Math.sin(t) ** 3;
    const y = -(13 * Math.cos(t) -
                5 * Math.cos(2 * t) -
                2 * Math.cos(3 * t) -
                Math.cos(4 * t));   // 负号让尖头朝上
    pts.push({
      x: centerX + x * scale,
      y: centerY + y * scale
    });
  }
  return pts;
}
const sweetCoupleWords = [
    "注意保暖~💗",
    "好好吃饭哦~🎃",
    "早点休息🤗",
    "我想你啦💓",
    "抱抱你🤗",
    "晚安宝贝😽",
    "早安亲爱的💖",
    "有你真好🥰",
    "心想事成✨",
    "我在等你~💞",
    "别太累啦~🎄",
    "多喝水哦🎈",
    "爱你每一天🥰",
    "我好想你💖",
    "喜欢你😗",
    "辛苦啦，抱抱你~🤗",
    "天天开心💌",
    "今天要开心哦~💝",
    "心想事成✨",
];
// /* ====== demo：浏览器 Console 验证 ====== */
// console.table(heartPoints({ scale: 5 }));

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// 3. 生成一个“安全”的 left/top
function safePosition(elWidth, elHeight) {
    // 留 10px 边距，防止贴边
    const pad = 10;
    const maxLeft = window.innerWidth  - elWidth  - pad;
    const maxTop  = window.innerHeight - elHeight - pad;

    return {
        left: rand(pad, Math.max(pad, maxLeft)),
        top : rand(pad, Math.max(pad, maxTop))
    };
}
// 情侣清新版：固定 45°，仅允许浅绿/浅粉/浅蓝/青色/浅紫
// 全浅色 45° 渐变生成器
function randomGradient({
  type  = 'linear',
  deg   = 45,
  count = 2
} = {}) {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const h = Math.floor(Math.random() * 360);        // 任意色相
    const s = Math.floor(Math.random() * 21) + 20;    // 20-40% 低饱和
    const l = Math.floor(Math.random() * 16) + 80;    // 80-95% 高明度
    colors.push(`hsl(${h}, ${s}%, ${l}%)`);
  }
  return `linear-gradient(${deg}deg, ${colors.join(', ')})`;
}
// 生成全浅色渐变（可复用）
function randomGradient({ type = 'linear', deg = 45, count = 2 } = {}) {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const h = rand(0, 360);
    const s = rand(20, 40);
    const l = rand(80, 95);
    colors.push(`hsl(${h}, ${s}%, ${l}%)`);
  }
  return `linear-gradient(${deg}deg, ${colors.join(', ')})`;
}
const MAX_BOX = 100; 
function showSweet() {

    if (document.querySelectorAll('.box').length >= MAX_BOX) return;
    const text = sweetCoupleWords[rand(0, sweetCoupleWords.length - 1)];

    const box = document.createElement('div');
    box.className = 'box';
    box.innerHTML = `
    <div class="box-head"><div class="arg"><span class="icon"></span><span class="icon"></span><span class="icon"></span></div><span class="title">温馨提示</span></div>
    <div class="content">${text}</div>`;
    box.style.background = randomGradient({ count: 2 });
    document.body.appendChild(box);


    const pad = 10; // 留边
    const { width: w, height: h } = box.getBoundingClientRect();

    const maxLeft = window.innerWidth - 200 - pad;
    const maxTop  = window.innerHeight - 70 - pad;
    const x = rand(pad, Math.max(pad, maxLeft));
    const y  = rand(pad, Math.max(pad, maxTop));

    const angle = rand(-10, 10); // 角度限制

    box.style.left = x + 'px';
    box.style.top = y + 'px';
    box.style.setProperty('--r', `${angle}deg`);

//   setTimeout(() => {
//     box.style.opacity = 0;
//     setTimeout(() => box.remove(), 800);
//   }, 3000);
}


/******************************************************************
 * 启动：先丢一句，然后每 3 秒再来一句https://gitcode.com/sxww1/loveWindow.git
 * https://gitee.com/sxww1/loveWindow.git
 ******************************************************************/
window.addEventListener('DOMContentLoaded', () => {
  showSweet();
  setInterval(showSweet, 950);
});