import React, { memo, forwardRef, useState } from "react";
import { Link } from "react-router-dom";
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
    const [highlightedNode] = useState<React.ReactNode>(
      highlightText(value, keyword)
    );

    return (
      <RecommendItemContainer active={active} ref={ref} data-index={index}>
        <Search className="icon" />
        <Link to={"/"}>{highlightedNode}</Link>
      </RecommendItemContainer>
    );
  }
);
RecommendItem.displayName = "RecommendItem";
export default memo(RecommendItem);
