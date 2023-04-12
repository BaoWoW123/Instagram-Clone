import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import App from "./App";
import Home from "./components/Home";
import { BrowserRouter, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";

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
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByLabelText("Home").className).toBe("Home");
  });
  test("simulate login with fake account", async () => {
    const submit = jest.fn()
    render(
      <BrowserRouter>
      <App submit={submit}/>
      </BrowserRouter>
    );
    const emailInput = screen.getByPlaceholderText("Email");
    const pwInput = screen.getByPlaceholderText('Password')
    const loginBtn = screen.getByText('Log in')
    userEvent.type(emailInput, 'test@gmail.com');
    userEvent.type(pwInput, 'test123');
    userEvent.click(loginBtn)
    expect((await screen.findByLabelText('Home')).className).toBe('Home')
  });
});
