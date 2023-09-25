import { createRoot } from "react-dom/client";
import AppChat from "./AppChat";
import GlobalStyle from "./styles/global";

const root = createRoot(document.querySelector("#root"));

root.render(
  <>
    <AppChat />
    <GlobalStyle />
  </>
);
