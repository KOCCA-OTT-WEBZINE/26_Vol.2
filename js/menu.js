const spotlightItem = {
  0: {
    title: "커지는 숏드라마 시장, 한국의 자리는 어디인가",
    author: { name: "최민근", affiliation: "MBC 글로벌IP 제작팀 PD" },
  },
  1: {
    title: "AI로 확장하는 팬덤 IP, <와이낫미디어>, 이민석 대표",
    author: { name: "이민석", affiliation: "㈜와이낫미디어 Founder / CEO" },
  },
  2: {
    title: "AI 시대, 크리에이터는 어떻게 살아남는가 <br>: 유튜브 크리에이터 ‘고몽’의 생성형 AI 활용 전략 10문10답",
    author: { name: "고몽", affiliation: "BEYONDER STUDIO 대표" },
  },
};

const trendItem = {
  0: {
    title: "올드 IP의 귀환은 무얼 말해주는 걸까: 올드 IP의 귀환을 둘러싼 콘텐츠 산업의 변화들",
    author: { name: "정덕현", affiliation: "대중문화평론가" },
  },
  1: {
    title: "글로벌 스트리밍 사업자의 라이브 중계 전략<br>: 레거시 미디어는 무엇을 오해하고 있나",
    author: { name: "반옥숙", affiliation: "한국콘텐츠진흥원 산업정책팀 책임연구원" },
  },
  2: {
    title: "획일화된 알고리즘을 넘어<br>: 아시아 로컬 OTT의 틈새 전략과 공존의 기술",
    author: { name: "이영주", affiliation: "서울과학기술대학교 IT정책전문대학원 융합미디어콘텐츠정책전공 교수" },
  },
};

const peopleItem = {
  0: {
    title: "인간 PD가 경험한 AI 제작의 현재",
    author: { name: "민성원", affiliation: "EBS PD" },
  },
};

const globalItem = {
  0: {
    title: "북미",
    // author: { name: "오창학", affiliation: "광운대학교 미디어커뮤니케이션학부 부교수" },
  },
  1: {
    title: "남중미",
    // author: { name: "김정곤", affiliation: "대외경제정책연구원 연구위원" },
  },
  2: {
    title: "유럽",
    // author: { name: "김정곤", affiliation: "대외경제정책연구원 연구위원" },
  },
  3: {
    title: "아시아",
    // author: { name: "김정곤", affiliation: "대외경제정책연구원 연구위원" },
  },
  4: {
    title: "중동 ∙ 아프리카",
    // author: { name: "김정곤", affiliation: "대외경제정책연구원 연구위원" },
  },
  5: {
    title: "대양주",
    // author: { name: "김정곤", affiliation: "대외경제정책연구원 연구위원" },
  },
};

const dataPointItem = {
  0: {
    title: "데이터로 읽는 글로벌 OTT 콘텐츠 소비 취향",
  },
  1: {
    title: "글로벌 OTT 사업자의 광고 생태계 재편과 경쟁전략: 
‘구독 경쟁’에서 ‘광고수익 경쟁’으로 전환",
    author: {
      name: "김미선, 정애리",
      affiliation: "이화여자대학교 커뮤니케이션미디어연구소 연구원, 중앙대학교 첨단영상대학원 겸임교수",
    },
  },
  2: {
    title: "월드컵 중계권료는 오르는데 TV 시청률은 왜 떨어질까?: 시청자는 사라진 것이 아니라 이동했다",
    author: {
      name: "정애리",
      affiliation: "중앙대학교 첨단영상대학원 겸임교수",
    },
  },
};

const contentMap = [
  { label: "스포트라이트", path: "spotlight", items: spotlightItem },
  { label: "트렌드 하이라이트", path: "trend", items: trendItem },
  { label: "피플 인사이트", path: "people", items: peopleItem },
  { label: "글로벌 마켓 리포트", path: "global", items: globalItem },
  { label: "데이터 포인트", path: "data", items: dataPointItem },
];

function stripFootnotesAndTags(text) {
  if (!text) return "";

  return String(text)
    .replace(/<br\s*\/?>/gi, "__BR__")
    .replace(/<[^>]*>/g, "")
    .replace(/__BR__/g, "<br>")
    .replace(/\[\d+\]/g, "")
    .replace(/\(\d+\)/g, "")
    .replace(/[ \t]+/g, " ")
    .trim();
}

function highlightQuotes(text) {
  const QUOTE_REGEX = /["'「」『』\u2018\u2019\u201C\u201D]/g;
  return String(text).replace(QUOTE_REGEX, (m) => `<span class="bodyQuotes">${m}</span>`);
}

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
  const closeBtn = document.getElementById("menu-close");
  const menu = document.getElementById("mobile-menu");
  const content = document.getElementById("menu-content");

  if (!toggle || !closeBtn || !menu || !content) return;

  toggle.addEventListener("click", () => {
    renderMenu();
    menu.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  closeBtn.addEventListener("click", () => {
    menu.classList.remove("active");
    document.body.style.overflow = "";
  });

  content.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;

    menu.classList.remove("active");
    document.body.style.overflow = "";
  });

  function renderMenu() {
    content.innerHTML = "";

    contentMap.forEach(({ label, path, items }) => {
      const section = document.createElement("div");
      section.className = "menu-section";

      section.innerHTML = `
        <h2 class="section-title">${label}</h2>
        <ul class="section-list">
          ${Object.entries(items)
            .map(([key, item]) => {
              const author = item.author
                ? `<p class="author">${item.author.name} | ${item.author.affiliation}</p>`
                : "";

              return `
                <li class="section-item">
                  <a href="./${path}_${Number(key) + 1}.html" class="menu-link">
                    <p>${highlightQuotes(stripFootnotesAndTags(item.title))}</p>
                    ${author}
                  </a>
                </li>
              `;
            })
            .join("")}
        </ul>
      `;

      content.appendChild(section);
    });
  }
});