import { render, screen } from "@testing-library/react";

import { QuestionTwo } from "./QuestionTwo";
import { MockDataService } from "../service/DataService.mock";

test("fetched and merged data is in the expected shape", async () => {
  render(<QuestionTwo service={MockDataService} />);

  expect(
    await screen.findByText(
      '[{"resourceName":"Sam Seaborn","resourceId":0,"allocations":[{"allocId":0,"allocType":"activity","name":"Meal Break","start":"2018-09-01T12:15:00Z","end":"2018-09-01T13:10:00Z"},{"allocId":1,"allocType":"activity","name":"Meal Break","start":"2018-09-01T12:15:00Z","end":"2018-09-01T13:10:00Z"},{"allocId":0,"allocType":"job","name":"Build a shed","start":"2018-09-01T10:15:00Z","end":"2018-09-01T11:00:00Z"},{"allocId":1,"allocType":"job","name":"Shield some wiring","start":"2018-09-01T09:00:00Z","end":"2018-09-01T13:00:00Z"}]},{"resourceName":"Donna Moss","resourceId":1,"allocations":[{"allocId":0,"allocType":"activity","name":"Meal Break","start":"2018-09-01T12:15:00Z","end":"2018-09-01T13:10:00Z"},{"allocId":1,"allocType":"activity","name":"Meal Break","start":"2018-09-01T12:15:00Z","end":"2018-09-01T13:10:00Z"},{"allocId":0,"allocType":"job","name":"Build a shed","start":"2018-09-01T10:15:00Z","end":"2018-09-01T11:00:00Z"},{"allocId":1,"allocType":"job","name":"Shield some wiring","start":"2018-09-01T09:00:00Z","end":"2018-09-01T13:00:00Z"}]},{"resourceName":"Toby Ziegler","resourceId":2,"allocations":[{"allocId":0,"allocType":"activity","name":"Meal Break","start":"2018-09-01T12:15:00Z","end":"2018-09-01T13:10:00Z"},{"allocId":1,"allocType":"activity","name":"Meal Break","start":"2018-09-01T12:15:00Z","end":"2018-09-01T13:10:00Z"},{"allocId":0,"allocType":"job","name":"Build a shed","start":"2018-09-01T10:15:00Z","end":"2018-09-01T11:00:00Z"},{"allocId":1,"allocType":"job","name":"Shield some wiring","start":"2018-09-01T09:00:00Z","end":"2018-09-01T13:00:00Z"}]}]'
    )
  );
});
