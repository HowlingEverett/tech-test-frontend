import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";

import { QuestionOne } from "./QuestionOne";
import { MockDataService } from "../service/DataService.mock";

let searchInput: HTMLElement;

beforeEach(() => {
  render(<QuestionOne service={MockDataService} />);
  searchInput = screen.getByLabelText("Job search");
});

test("renders a job search field", () => {
  expect(searchInput).toBeInTheDocument();
});

test("searches for Jobs when you type in the job search field", async () => {
  fireEvent.change(searchInput, { target: { value: "shed" } });

  await waitFor(() => screen.findByText("Build a shed"));

  fireEvent.change(searchInput, { target: { value: "fenc" } });

  await waitFor(() => screen.findByText("Build a fence"));

  fireEvent.change(searchInput, { target: { value: "build" } });
  await waitFor(() => screen.findByText("Build a shed"));
  expect(screen.queryByText("Build a fence")).toBeInTheDocument();
});

test("renders the job details", async () => {
  fireEvent.change(searchInput, { target: { value: "shed" } });
  await waitFor(() => screen.findByText("Build a shed"));

  expect(
    screen.queryByText("Starts on: Saturday, 1st September, 8:15 pm")
  ).toBeInTheDocument();
  expect(
    screen.queryByText("Ends on: Saturday, 1st September, 9:00 pm")
  ).toBeInTheDocument();
  expect(screen.queryByText("Contact: Jane Smith")).toBeInTheDocument();
});

test("does not search unless search term >= 3 characters", async () => {
  fireEvent.change(searchInput, { target: { value: "sh" } });
  expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  expect(screen.queryByText("Build a shed")).not.toBeInTheDocument();

  fireEvent.change(searchInput, { target: { value: "she" } });
  await waitFor(() => screen.findByText("Build a shed"));
});

test("clears the search results", async () => {
  fireEvent.change(searchInput, { target: { value: "shed" } });
  await waitFor(() => screen.findByText("Build a shed"));

  fireEvent.change(searchInput, { target: { value: "" } });
  await waitForElementToBeRemoved(() => screen.queryByText("Build a shed"));
});
