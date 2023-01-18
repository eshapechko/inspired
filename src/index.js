import "./index.html";
import "./index.scss";

import { router } from "./modules/router";
import { renderHeader } from "./modules/render/renderHeader";
import { renderFooter } from "./modules/render/renderFooter";
import { mainPage } from "./modules/mainPage/mainPage";
import { womenMainPage } from "./modules/mainPage/womenMainPage";
import { menMainPage } from "./modules/mainPage/menMainPage";
import { getData } from "./modules/getData";
import { API_URL, DATA } from "./modules/const";
import { createCssColors } from "./modules/createCss";

const init = async () => {
  DATA.navigation = await getData(`${API_URL}/api/categories`);
  DATA.colors = await getData(`${API_URL}/api/colors`);

  createCssColors(DATA.colors);

  router.on("*", () => {
    renderHeader();
    renderFooter();
  });

  router.on("/", () => {
    mainPage();
  });

  router.on("women", () => {
    womenMainPage();
  });

  router.on("men", () => {
    menMainPage();
  });

  // setTimeout(() => {
  //   router.navigate("men");
  // }, 3000);

  // setTimeout(() => {
  //   router.navigate("women");
  // }, 6000);

  router.resolve();
};

init();
