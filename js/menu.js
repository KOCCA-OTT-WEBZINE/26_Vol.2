const spotlightItem = {
  0: {
    title: "AI는 방송을 어떻게 바꾸고 있는가",
    author: { name: "최민근", affiliation: "MBC 글로벌IP 제작팀 PD" },
  },
  1: {
    title: "AI 전환 시대, 공영방송의 전략과 과제",
    author: { name: "한성희", affiliation: "KBS 미디어연구소 미디어기술연구부장" },
  },
  2: {
    title: "AI 시대, 크리에이터는 어떻게 살아남는가 <br>: 유튜브 크리에이터 ‘고몽’의 생성형 AI 활용 전략 10문10답",
    author: { name: "고몽", affiliation: "BEYONDER STUDIO 대표" },
  },
};

const trendItem = {
  0: {
    title: "설렘은 글로벌, “유미의 세포들” 드라마, 어떻게 성공했을까?",
    author: { name: "이재민", affiliation: "서울웹툰인사이트 편집장" },
  },
  1: {
    title: "글로벌 스트리밍 사업자의 라이브 중계 전략<br>: 레거시 미디어는 무엇을 오해하고 있나",
    author: { name: "조영신", affiliation: "미디어연구소 C&X 대표 / 동국대 대우교수" },
  },
  2: {
    title: "획일화된 알고리즘을 넘어<br>: 아시아 로컬 OTT의 틈새 전략과 공존의 기술",
    author: { name: "강보라", affiliation: "연세대학교 커뮤니케이션연구소 전문연구원" },
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
    title: "2025년 글로벌 OTT 사업자 결산 및 향후 투자 전망",
    author: {
      name: "김미선, 정애리",
      affiliation: "이화여자대학교 커뮤니케이션미디어연구소 연구원, 중앙대학교 첨단영상대학원 겸임교수",
    },
  },
  2: {
    title: "숏폼 콘텐츠와 애착자본: 시청 이후 행동의 의미",
    author: {
      name: "김인애",
      affiliation: "한국콘텐츠진흥원 콘텐츠산업정책연구센터 책임연구원",
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