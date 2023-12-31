/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import Header from "./Header";
import { checkoutCart } from "../services/theShop";

jest.mock("../services/theShop.js")

// beforeEach(() => {
//   render(<App />);
// });

let cartItems = [
  {
    id: 1,
    title: "Amazon Kindle E-reader",
    quantity: 5,
    price: 79.99
  },
  {
    id: 2,
    title: "Apple 10.5-Inch iPad Pro",
    quantity: 0,
    price: 649.99
  },
  {
    id: 3,
    title: "Yamaha Portable Keyboard",
    quantity: 2,
    price: 155.99
  },
  {
    id: 4,
    title: "Tinker, Tailor, Soldier, Spy - A John le Carre Novel",
    quantity: 12,
    price: 13.74
  }
];

let isCartEmpty = null

const handleCheckout = () => {
  try {
    console.log('Aha!')
  } catch (e) {
    console.log(e);
  }
}

test("Header - basic h1 test", () => {
  render(<Header cartEmpty={isCartEmpty} cartItems={cartItems} onCheckout={handleCheckout} />);
  const heading = screen.getByRole("heading", {
    name: "The Shop!",
    level: 1,
  });
  expect(heading).toBeInTheDocument();
});

test("Header - zero cart items", () => {
  render(<Header cartEmpty={true} cartItems={[]} onCheckout={handleCheckout} />);
  expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
});

test("Header - has cart items", () => {
  render(<Header cartEmpty={isCartEmpty} cartItems={cartItems} onCheckout={handleCheckout} />);
  expect(screen.getByText("Amazon Kindle E-reader"));
});

test("cartItems is set to an empty array when checkout button is clicked", async () => {
  // checkoutCart.mockResolvedValue(undefined);
  checkoutCart.mockImplementation(() => 'ok...')
  render(<App />)
  const button = await screen.findByRole("button", { name: /Checkout/ });
  const user = userEvent.setup();
  await user.click(button);
  expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
});
