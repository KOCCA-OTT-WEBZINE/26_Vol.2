// Remove Footnotes and HTML Tags
function stripFootnotesAndTags(text) {
  return text
    .replace(/<^>+>/g, "") // HTML 태그 제거
    .replace(/[\d¹²³⁴⁵⁶⁷⁸⁹⁰]+[⁾)]/g, "") // 각주 숫자 제거
    .trim();
}

// Progress Bar
function updateProgressBar() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  const scrollableHeight = scrollHeight - clientHeight;
  const scrolled = (scrollTop / scrollableHeight) * 100;

  const progressBar = document.getElementById("progress-bar");
  if (progressBar) {
    progressBar.style.width = `${scrolled}%`;
  }
}

window.addEventListener("scroll", updateProgressBar);

// anchorButton
function handleAnchorButtonVisibility() {
  const scrollY = window.scrollY || window.pageYOffset;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const distanceToBottom = documentHeight - (scrollY + windowHeight);

  const anchorButton = document.getElementById("anchor-button");
  if (scrollY > 200 && distanceToBottom > 200) {
    anchorButton?.classList.add("show");
  } else {
    anchorButton?.classList.remove("show");
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function scrollToBottom() {
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
}

window.addEventListener("scroll", handleAnchorButtonVisibility);

// 주석 바텀시트
document.addEventListener("DOMContentLoaded", function () {
  const openBtn = document.getElementById("note-open-btn");
  const closeBtn = document.getElementById("note-close-btn");
  const sheet = document.getElementById("note-sheet");
  const dim = document.getElementById("note-sheet-dim");
  const panel = document.getElementById("note-sheet-panel");

  if (!openBtn || !closeBtn || !sheet || !dim || !panel) return;

  function openSheet() {
    sheet.classList.remove("note-sheet-hidden");

    requestAnimationFrame(() => {
      panel.classList.add("is-open");
    });

    sheet.setAttribute("aria-hidden", "false");
    document.body.classList.add("body-scroll-lock");
  }

  function closeSheet() {
    panel.classList.remove("is-open");
    sheet.setAttribute("aria-hidden", "true");
    document.body.classList.remove("body-scroll-lock");

    setTimeout(() => {
      sheet.classList.add("note-sheet-hidden");
    }, 300);
  }

  openBtn.addEventListener("click", openSheet);
  closeBtn.addEventListener("click", closeSheet);
  dim.addEventListener("click", closeSheet);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && sheet.getAttribute("aria-hidden") === "false") {
      closeSheet();
    }
  });
});

// Header Scroll
const header = document.querySelector(".header");

const handleHeaderScroll = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 20);
};

window.addEventListener("scroll", handleHeaderScroll);
window.addEventListener("load", handleHeaderScroll);