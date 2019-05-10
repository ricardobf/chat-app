import React from "react";
import ReactDOM from "react-dom";
import Chat from "./Chat";

import auth from "./auth";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Chat auth={auth} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
