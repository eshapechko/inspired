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

const init = async () => {
  DATA.navigation = await getData(`${API_URL}/api/categories`);

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
