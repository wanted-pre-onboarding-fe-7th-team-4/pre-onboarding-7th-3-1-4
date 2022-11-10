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
    const highlightedNode = highlightText(value, keyword);

    return (
      <RecommendItemContainer active={active} ref={ref} data-index={index}>
        <Search className="icon" />
        <div className="highlightContainer">{highlightedNode}</div>
      </RecommendItemContainer>
    );
  }
);
RecommendItem.displayName = "RecommendItem";
export default memo(RecommendItem);
