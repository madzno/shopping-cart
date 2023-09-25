/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import axios from "axios";
// import Header from "./Header";
import { checkoutCart, getProducts, getCartItems } from "../services/theShop";

jest.mock("../services/thShop")

test("it works!", async () => {

  render(<App />)

  const heading = screen.getByRole("heading", {
    name: "The Shop!",
    level: 1,
  });
  expect(heading).toBeInTheDocument();
});
