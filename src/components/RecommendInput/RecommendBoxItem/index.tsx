import React, { memo, forwardRef, useState } from "react";
import { Link } from "react-router-dom";
import { RecommendItemContainer } from "./styles";
import { ReactComponent as Search } from "@/assets/search.svg";

interface RecommendItemProps {
  keyword: string;
  value: string;
  active?: boolean;
  index: number;
}

const highlightText = (text: string, keyword: string) => {
  const regex = new RegExp(keyword, "i");
  const matchResult = text.match(regex);
  if (matchResult) {
    const index = matchResult.index;
    if (index !== undefined)
      return (
        <>
          {text.substring(0, index)}
          <span className="highlight">{keyword}</span>
          {text.substring(index + keyword.length, text.length)}
        </>
      );
    return text;
  }
  return text;
};

const RecommendItem = forwardRef<HTMLLIElement, RecommendItemProps>(
  ({ keyword, value, active, index }, ref) => {
    const [highlightedNode] = useState<React.ReactNode>(
      highlightText(value, keyword)
    );

    return (
      <RecommendItemContainer active={active} ref={ref} data-index={index}>
        <Search className="icon" />
        <Link
          to={"/"}
          // to={`/?condition=${value}`}
        >
          {highlightedNode}
        </Link>
      </RecommendItemContainer>
    );
  }
);
RecommendItem.displayName = "RecommendItem";
export default memo(RecommendItem);
