import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

describe("App renders component after click event", () => {
  test("snapshot test", () => {
    const { container } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });
  test("show home page", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByRole("heading").textContent).toBe("Home");
  });
  test("simulate Profile link click", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const testLink = screen.getByText("Profile", { type: "a" });
    userEvent.click(testLink);
    expect(screen.getByRole("heading").textContent).toBe("Home");
  });
});
