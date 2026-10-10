const pages = [
  {
    image: "romina1.jpg",
    kicker: "برای تو، رومینا",
    title: "روز دختر مبارک، دختر قشنگِ قصه‌ی من 🌷",
    message: "امروز بهونه‌ایه برای گفتن چیزی که شاید باید بیشتر بهت بگم:\nبودنت، با تمام جزئیات قشنگ خودت، ارزشمنده.\nامیدوارم همیشه دلیل‌های زیادی برای لبخند زدن داشته باشی."
  },
  {
    image: "romina2.jpg",
    kicker: "برای لبخندت",
    title: "قشنگی فقط به ظاهر نیست",
    message: "قشنگیِ تو توی مهربونی‌هات، توی فکرهایی که می‌کنی، توی چیزهایی که براشون تلاش می‌کنی و توی راهیه که برای خودت می‌سازی هم هست.\nامیدوارم خودت هم این زیبایی‌ها رو همیشه ببینی. 🤍"
  },
  {
    image: "romina3.jpg",
    kicker: "برای دختر پرتلاش من",
    title: "به مسیرت افتخار کن 🎓",
    message: "می‌دونم درس خوندن و دانشگاه همیشه آسون نیست؛ روزهایی هست که خسته می‌شی و کلی فکر توی سرت می‌چرخه.\nاما امیدوارم هیچ‌وقت یادت نره برای آینده‌ای که می‌خوای می‌سازی، قدم‌به‌قدم داری جلو می‌ری.\nروز دختر مبارک، خانمِ پرتلاش!"
  },
  {
    image: "romina4.jpg",
    kicker: "حالا یه حرف از دل خودم",
    title: "من بهت افتخار می‌کنم ❤️",
    message: "به تلاشت، به چیزهایی که از سر می‌گذرونی و به ادامه دادنت افتخار می‌کنم.\nلازم نیست همیشه قوی باشی یا همه‌چیز رو به‌تنهایی از پسش بربیای.\nبرای من، خودِ واقعی تو ارزشمنده."
  },
  {
    image: "together1.jpg",
    kicker: "کنار تو",
    title: "می‌خوام پشتت باشم",
    message: "دلم می‌خواد توی روزهای خوب، از خوشحالی‌هات ذوق کنم و توی روزهای سخت، شنونده‌ات باشم.\nنه برای اینکه به‌جای تو راه رو برم؛ برای اینکه بدونی اگر خواستی، کسی هست که کنارت قدم برداره.\nبه رؤیاها و توانایی‌هات ایمان دارم. 🫶"
  },
  {
    image: "together2.jpg",
    kicker: "آخرین صفحه، اما نه آخر حرفم",
    title: "تا جایی که بتونم، پشتیبانت می‌مونم 🤍",
    message: "رومینای عزیزم، روز دختر مبارک.\nامیدوارم آینده‌ات پر از آرامش، فرصت‌های خوب و رسیدن به آرزوهات باشه.\nبهت افتخار می‌کنم و می‌خوام بدونی که تا وقتی هر دومون بخوایم و کنار هم باشیم، با عشق و احترام پشتیبانت می‌مونم.\nامروز و همیشه، بدرخش دختر قشنگم. 🌷"
  }
];

const body = document.body;
const glass = document.getElementById("glass");
const kicker = document.getElementById("kicker");
const title = document.getElementById("title");
const message = document.getElementById("message");
const pageCount = document.getElementById("pageCount");
const progressFill = document.getElementById("progressFill");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const soundBtn = document.getElementById("soundBtn");
const hint = document.getElementById("hint");
const music = document.getElementById("music");

let current = 0;
let musicStarted = false;

const persianNumbers = n => String(n).replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[d]);

function renderPage(index) {
  current = index;
  const page = pages[index];
  body.style.setProperty("--page-image", `url("${page.image}")`);
  body.style.setProperty("--unused", "0");
  // Background image changes while the frosted-glass card stays consistent.
  kicker.textContent = page.kicker;
  title.textContent = page.title;
  message.textContent = page.message;
  pageCount.textContent = `${persianNumbers(index + 1)} از ${persianNumbers(pages.length)}`;
  progressFill.style.width = `${((index + 1) / pages.length) * 100}%`;
  nextBtn.classList.toggle("hidden", index === pages.length - 1);
  restartBtn.classList.toggle("hidden", index !== pages.length - 1);
  nextBtn.innerHTML = index === pages.length - 2 ? 'رسیدن به حرف آخر <span aria-hidden="true">←</span>' : 'بریم صفحه بعد <span aria-hidden="true">←</span>';
  glass.style.animation = "none";
  void glass.offsetWidth;
  glass.style.animation = "";
  hint.textContent = index === 0 && !musicStarted ? "برای شنیدن موزیک، یک بار روی دکمه موزیک بزن 🎵" : "با آرامش بخون؛ این چند خط برای توئه 🤍";
}

async function toggleMusic() {
  if (music.paused) {
    try {
      await music.play();
      musicStarted = true;
      soundBtn.innerHTML = "♫ <span>موزیک روشن</span>";
      hint.textContent = "موزیک در حال پخشه 🎵";
    } catch (e) {
      hint.textContent = "پخش موزیک شروع نشد؛ یک بار دیگه روی دکمه موزیک بزن.";
    }
  } else {
    music.pause();
    soundBtn.innerHTML = "♫ <span>موزیک خاموش</span>";
    hint.textContent = "هر وقت خواستی، موزیک رو دوباره روشن کن.";
  }
}

nextBtn.addEventListener("click", () => renderPage(Math.min(current + 1, pages.length - 1)));
restartBtn.addEventListener("click", () => renderPage(0));
soundBtn.addEventListener("click", toggleMusic);

// Set the initial background from the first image.
renderPage(0);
