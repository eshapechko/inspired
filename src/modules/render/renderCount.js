import { countController } from "../controllers/countController";
import { createElement } from "../utils/createElement";

export const renderCount = () => {
  const control = createElement("div", {
    className: "card__count count",
  });

  const minus = createElement(
    "button",
    {
      className: "count__item count__minus",
      type: "button",
      textContent: "-",
    },
    {
      parent: control,
    }
  );

  const number = createElement(
    "span",
    {
      className: "count__item count__number",
      textContent: "1",
    },
    {
      parent: control,
    }
  );

  const plus = createElement(
    "button",
    {
      className: "count__item count__plus",
      type: "button",
      textContent: "+",
    },
    {
      parent: control,
    }
  );

  const input = createElement(
    "input",
    {
      type: "hidden",
      value: "1",
      name: "count",
    },
    {
      parent: control,
    }
  );

  countController(minus, number, plus, input);

  return control;
};
