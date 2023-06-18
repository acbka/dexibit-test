import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen } from "@testing-library/react";
import App, { StarshipInterface } from "./App";
import starshipsMock from "./mocks/starships.mock.json";

const server = setupServer(
  rest.get<StarshipInterface[]>(
    "https://swapi.dev/api/starships",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(starshipsMock));
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("spinner is rendered", () => {
  render(<App />);

  const spinner = screen.getByTestId("spinner");
  expect(spinner).toBeInTheDocument();
});

test("renders a page with all details", async () => {
  render(<App />);

  const title = screen.getByText("Star Wars Insights");
  expect(title).toBeInTheDocument();

  const chart = await screen.findByText("Speed by Starship");
  expect(chart).toBeInTheDocument();

  const starship = await screen.findAllByText("CR90 corvette");
  expect(starship).toHaveLength(2);

  const speed = await screen.findAllByText("Speed");
  expect(speed).toHaveLength(2);
});
