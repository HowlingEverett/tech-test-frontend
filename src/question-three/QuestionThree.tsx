import { FC } from "react";
import { IAppTabContainer } from "../common/types";

import { SectionGroup } from "../components/section/SectionGroup";
import { SectionPanel } from "../components/section/SectionPanel";

import "./QuestionThree.css";

export const QuestionThree: FC<IAppTabContainer> = () => {
  return (
    <SectionGroup>
      <SectionPanel>Please refer to INSTRUCTIONS.md</SectionPanel>
    </SectionGroup>
  );
};
