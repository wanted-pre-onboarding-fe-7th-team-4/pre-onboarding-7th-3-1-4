import React, { memo, forwardRef } from "react";

import { RecommendItemContainer } from "./styles";
import { ReactComponent as Search } from "@/components/assets/search.svg";
import { highlightText } from "@/lib/utils/highlightText";

interface RecommendItemProps {
  keyword: string;
  value: string;
  active?: boolean;
  index: number;
}

const RecommendItem = forwardRef<HTMLLIElement, RecommendItemProps>(
  ({ keyword, value, active, index }, ref) => {
    return (
      <RecommendItemContainer active={active} ref={ref} data-index={index}>
        <Search className="icon" />
        <div className="highlightContainer">
          {highlightText(value, keyword)}
        </div>
      </RecommendItemContainer>
    );
  }
);
RecommendItem.displayName = "RecommendItem";
export default memo(RecommendItem);
