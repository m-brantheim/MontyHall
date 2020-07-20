import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders Run simulation button", () => {
  const { getByText } = render(<App />);
  const buttonElement = getByText(/Run simulation/i);
  expect(buttonElement).toBeInTheDocument();
});
