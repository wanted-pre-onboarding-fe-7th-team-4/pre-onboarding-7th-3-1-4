import styled from "styled-components";

export const RecommendBoxContainer = styled.ul`
  background: ${({ theme }) => theme.color.white};
  box-shadow: 0px 4px 4px ${({ theme }) => theme.color.shadow};
  border-radius: 18px;
  overflow: auto;
  max-height: 100%;
  .label {
    padding: 20px 24px 10px;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.324px;
    color: ${({ theme }) => theme.color.grey_500};
  }
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    height: 30%;
    background: ${({ theme }) => theme.color.grey_300};
    border-radius: 4px;
    background-clip: padding-box;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export const RecommendAltContainer = styled.div`
  padding: 20px 24px;
`;
