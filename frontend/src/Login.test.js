import React from "react";
import ReactDOM from "react-dom";
import Login from "./Login";

import auth from "./auth";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Login auth={auth} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
