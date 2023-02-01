import { API_URL, card, DATA } from "../const";
import {
    addProductCart,
    calcTotalPrice,
    cartGoodsStore,
} from "../controllers/cartController";
import {
    getFavorite,
    handlerFavorite,
} from "../controllers/favoriteController";
import { createElement } from "../utils/createElement";
import { renderCount } from "./renderCount";

export const renderCard = ({ data, render }) => {
    card.textContent = "";

    if (!render) {
        return;
    }

    const { id, title, description, price, colors, pic, size } = data;

    const container = createElement(
        "div",
        {
            className: "container card__container",
        },
        {
            parent: card,
        }
    );

    createElement(
        "img",
        {
            className: "card__image",
            src: `${API_URL}/${pic}`,
            alt: title,
        },
        { parent: container }
    );

    const form = createElement(
        "form",
        {
            className: "card__content",
            id: "order",
        },
        {
            parent: container,
            // добавить товар в корзину
            cb(elem) {
                elem.addEventListener("submit", (e) => {
                    e.preventDefault();
                    const formData = new FormData(elem);
                    const product = Object.fromEntries(formData);

                    if (product.color && product.size && product.count) {
                        addProductCart(product);
                        calcTotalPrice.updateCount();
                        return;
                    }

                    createElement(
                        "p",
                        {
                            className: "card__alert",
                            textContent: product.size
                                ? product.color
                                    ? product.count
                                        ? "Что-то пошло не так"
                                        : "Количество не корректное"
                                    : "Выберите цвет"
                                : "Выберите размер",
                        },
                        {
                            parent: form,
                            cb(p) {
                                setTimeout(() => {
                                    p.remove();
                                }, 3000);
                            },
                        }
                    );
                });

                // addProductCart()
            },
        }
    );

    form.insertAdjacentHTML(
        "beforeend",
        `
        <h2 class="card__title">${title}</h2>

        <p class="card__price">руб ${price}</p>

        <div class="card__vendor-code">
        <span class="card__subtitle">Артикул</span>
        <span class="card__id">${id}</span>
        <input type="hidden" name="id" value="${id}" />
        </div>
    `
    );

    const cardColor = createElement(
        "div",
        {
            className: "card__color",
            innerHTML: '<p class="card__subtitle card__color-title">Цвет</p>',
        },
        {
            parent: form,
        }
    );

    createElement(
        "div",
        {
            className: "card__color-list",
        },
        {
            parent: cardColor,
            cb(colorList) {
                colors.forEach((colorId, i) => {
                    const color = DATA.colors.find(
                        (color) => color.id === colorId
                    ).title;

                    const label = createElement(
                        "label",
                        {
                            className: `card__color-item color color_${color}`,
                        },
                        {
                            parent: colorList,
                        }
                    );

                    createElement(
                        "input",
                        {
                            className: "color__input input-hide",
                            type: "radio",
                            name: "color",
                            value: color,
                            //   required: true,
                            checked: !i,
                        },
                        {
                            parent: label,
                        }
                    );

                    createElement(
                        "span",
                        {
                            className: "color__check",
                        },
                        {
                            parent: label,
                        }
                    );
                });
            },
        }
    );

    const cardSize = createElement(
        "div",
        {
            className: "card__size",
            innerHTML: '<p class="card__subtitle card__size-title">Размер</p>',
        },
        {
            parent: form,
        }
    );

    createElement(
        "div",
        {
            className: "card__size-list",
        },
        {
            parent: cardSize,
            cb(sizeList) {
                size.forEach((item) => {
                    const label = createElement(
                        "label",
                        {
                            className: `card__size-item size`,
                        },
                        {
                            parent: sizeList,
                        }
                    );

                    createElement(
                        "input",
                        {
                            className: "size__input input-hide",
                            type: "radio",
                            name: "size",
                            value: item,
                        },
                        {
                            parent: label,
                        }
                    );

                    createElement(
                        "span",
                        {
                            className: "size__check",
                            textContent: item,
                        },
                        {
                            parent: label,
                        }
                    );
                });
            },
        }
    );

    form.insertAdjacentHTML(
        "beforeend",
        `
    <div class="card__description">
        <p class="card__subtitle card__description-title">Описание</p>

        <p class="card__description-text">${description}</p>
    </div>
    `
    );

    const count = renderCount(1, "card__count");

    const addCart = createElement("button", {
        className: "card__add-cart main-button",
        type: "submit",
        textContent: "В корзину",
    });

    const favoriteBtn = createElement(
        "button",
        {
            className: `card__favorite favorite
      ${getFavorite().includes(id) ? "favorite_active" : ""}`,
            ariaLabel: "Добавить в избранное",
            type: "button",
        },
        {
            cb(elem) {
                elem.dataset.id = id;
                elem.addEventListener("click", handlerFavorite);
            },
        }
    );

    createElement(
        "div",
        {
            className: "card__control",
        },
        {
            parent: form,
            appends: [count, addCart, favoriteBtn],
        }
    );
};

/*
        <div class="container card__container">
          <img
            class="card__image"
            src="img/card-img.jpg"
            alt="Пижама со штанами шелковая"
          />

          <form class="card__content" id="order">
            <h2 class="card__title">Пижама со штанами шелковая</h2>

            <p class="card__price">руб 6999</p>

            <div class="card__vendor-code">
              <span class="card__subtitle">Артикул</span>
              <span class="card__id">089083</span>
              <input type="hidden" name="id" value="089083" />
            </div>

            <div class="card__color">
              <p class="card__subtitle card__color-title">Цвет</p>

              <div class="card__color-list">
                <label class="card__color-item color color_black color_check">
                  <input
                    class="input-hide"
                    type="radio"
                    name="color"
                    value="black"
                    checked
                  />
                </label>
                <label class="card__color-item color color_red">
                  <input
                    class="input-hide"
                    type="radio"
                    name="color"
                    value="red"
                  />
                </label>
              </div>
            </div>

            <div class="card__size">
              <p class="card__subtitle card__size-title">Размер</p>

              <div class="card__size-list">
                <label class="card__size-item size">
                  <input
                    class="input-hide"
                    type="radio"
                    name="size"
                    value="XS"
                  />XS
                </label>
                <label class="card__size-item size">
                  <input
                    class="input-hide"
                    type="radio"
                    name="size"
                    value="S"
                  />S
                </label>
                <label class="card__size-item size">
                  <input
                    class="input-hide"
                    type="radio"
                    name="size"
                    value="M"
                  />M
                </label>
                <label class="card__size-item size">
                  <input
                    class="input-hide"
                    type="radio"
                    name="size"
                    value="L"
                  />L
                </label>
                <label class="card__size-item size">
                  <input
                    class="input-hide"
                    type="radio"
                    name="size"
                    value="XL"
                  />XL
                </label>
              </div>
            </div>

            <div class="card__description">
              <p class="card__subtitle card__description-title">Описание</p>

              <p class="card__description-text">
                Домашняя женская пижама с сорочкой и штанами из шелка
              </p>
            </div>

            <div class="card__control">
              <div class="card__count count">
                <button class="count__item count__minus">-</button>
                <span class="count__item count__number">1</span>
                <button class="count__item count__plus">+</button>
                <input type="hidden" name="count" value="1" />
              </div>

              <button class="card__add-cart main-button" type="submit">
                В корзину
              </button>
              <button
                class="card__favorite favorite"
                aria-label="Добавить в избранное"
                type="button"
                data-id="321654"
              ></button>
            </div>
          </form>
        </div>
*/
