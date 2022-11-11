import { Sick } from "@/lib/typings/db";
import RecommendBoxItem from "../RecommendBoxItem";
import { RecommendAltContainer, RecommendBoxContainer } from "./styles";
import React, { useRef, useEffect } from "react";
import { StateType } from "@/lib/hooks/useSearch";
import { useHandleStatus } from "@/lib/hooks/useHandleStatus";

export interface RecommendBoxProps {
  data: Sick[];
  focusIndex?: number;
  keyword: string;
  status: StateType;
  show: boolean;
  onChangeFocusIndex?: (index: number) => void;
}

const RecommendBox = ({
  data,
  focusIndex,
  keyword,
  status,
  show,
  onChangeFocusIndex
}: RecommendBoxProps) => {
  const itemRef = useRef<HTMLLIElement>(null);
  const statusText = useHandleStatus(status);

  const onClick = (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
    e.preventDefault();
    if (!(e.target instanceof Element)) return;
    const elem = e.target.closest("li");
    if (elem instanceof HTMLLIElement) {
      const dataSetIdx = elem.dataset.index;
      if (dataSetIdx !== undefined) onChangeFocusIndex?.(Number(dataSetIdx));
    }
  };

  useEffect(() => {
    if (focusIndex !== undefined && focusIndex >= 0) {
      if (itemRef.current) {
        itemRef.current.scrollIntoView({
          block: "center"
        });
      }
    }
  }, [focusIndex, itemRef.current]);

  if (!show) return null;
  return (
    <RecommendBoxContainer
      onClick={onClick}
      onMouseDown={(e) => e.preventDefault()}
    >
      <p className="label">추천 검색어</p>
      {data.length ? (
        data.map(({ sickCd, sickNm }, index) => (
          <RecommendBoxItem
            index={index}
            keyword={keyword}
            value={sickNm}
            key={sickCd}
            active={index === focusIndex}
            ref={index === focusIndex ? itemRef : undefined}
          />
        ))
      ) : (
        <RecommendAltContainer>{statusText}</RecommendAltContainer>
      )}
    </RecommendBoxContainer>
  );
};

RecommendBox.Item = RecommendBoxItem;

export default RecommendBox;
