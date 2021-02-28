import { render, screen } from "@testing-library/react";
import { DataService } from "../service/DataService";

import { QuestionOne } from "./QuestionOne";

jest.mock("../service/DataService");

test("renders a job search field", () => {
  render(<QuestionOne service={DataService} />);

  const searchInput = screen.getByLabelText("Search for jobs");
  expect(searchInput).toBeInTheDocument();
});
