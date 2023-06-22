import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { StarshipInterface } from "./pages/HomePage";
import starshipsMock from "./mocks/starships.mock.json";

const server = setupServer(
  rest.get<StarshipInterface[]>(
    "https://swapi.dev/api/starships",
    (_, res, ctx) => {
      return res(ctx.status(200), ctx.json(starshipsMock));
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("spinner is rendered", () => {
  render(<App />, { wrapper: BrowserRouter });

  const spinner = screen.getByTestId("spinner");
  expect(spinner).toBeInTheDocument();
});

test("renders a page with all details", async () => {
  render(<App />, { wrapper: BrowserRouter });

  const title = screen.getByText("Star Wars Insights");
  expect(title).toBeInTheDocument();

  const chart = await screen.findByText("Speed by Starship");
  expect(chart).toBeInTheDocument();

  const starship = await screen.findAllByText("CR90 corvette");
  expect(starship).toHaveLength(2);

  const speed = await screen.findAllByText("Speed");
  expect(speed).toHaveLength(2);
});

test("an error page renders", async () => {
  server.use(
    rest.get("https://swapi.dev/api/starships", (_, res, ctx) => {
      return res(ctx.status(500));
    })
  );
  render(<App />, { wrapper: BrowserRouter });

  const title = await screen.findByText("500 Error");
  expect(title).toBeInTheDocument();

  const text = await screen.findByText(
    "You underestimate the power of the dark side"
  );
  expect(text).toBeInTheDocument();
});
