import React from "react";
import {
  Wrapper,
  Main,
  LeftColumn,
  RightColumn,
} from "./Styles";

export const TreatmentInfo: React.FC<{
  treatmentItem?: string;
  content?: string;
}> = ({ treatmentItem, content }) => {
  return (
    <Wrapper>
      <Main>
        <LeftColumn>
          <span>진료 항목</span>
          <span aria-label="treatment item">{treatmentItem}</span>
        </LeftColumn>
        <RightColumn>
          <span>증상</span>
          <textarea
            className="textarea"
            value={content ?? ""}
            disabled
          ></textarea>
        </RightColumn>
      </Main>
    </Wrapper>
  );
};
