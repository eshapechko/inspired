import { hero, TITLE } from "../const";
import { createElement } from "../utils/createElement";

const container = createElement("div", {
  className: "container",
});

const heroContent = createElement(
  "div",
  {
    className: "hero__content",
  },
  {
    parent: container,
  }
);

const heroTitle = createElement(
  "h2",
  {
    className: "hero__title",
    // textContent: "Новая коллекция Бюстгальтер-балконет",
  },
  {
    parent: heroContent,
  }
);

const heroLink = createElement(
  "a",
  {
    className: "hero__link",
    textContent: "Перейти",
  },
  {
    parent: heroContent,
  }
);

export const renderHero = ({ gender, render }) => {
  if (!render) {
    hero.style.display = "none";
    return;
  }

  //   hero.textContent = "";

  hero.style.display = " ";
  hero.className = `hero hero__${gender}`;

  hero.append(container);

  heroTitle.textContent = TITLE[gender].title;
  heroLink.href = `#/product/${TITLE[gender].id}`;
};

//   hero.innerHTML = `
//       <div class="container">
//           <div class="hero__content">
//                 <h2 class="hero__title">Новая коллекция Бюстгальтер-балконет</h2>

//                 <a href="#" class="hero__link">Перейти</a>
//           </div>
//       </div> `;
