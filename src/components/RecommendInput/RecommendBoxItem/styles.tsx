import styled, { css } from "styled-components";

interface RecommendItemStyleProps {
  active: boolean | undefined;
}

export const RecommendItemContainer = styled.li<RecommendItemStyleProps>`
  display: flex;
  align-items: center;
  padding: 0 24px;
  .icon {
    width: 16px;
    height: 16px;
  }
  &:last-child {
    border-end-end-radius: 18px;
    border-bottom-left-radius: 18px;
  }
  &:hover {
    background-color: ${({ theme }) => theme.color.grey_100};
  }
  a {
    padding: 20px 0 20px 12px;
    display: block;
    flex: 1;
    font-size: 18px;
    line-height: 29px;
    letter-spacing: -0.324px;
    color: ${({ theme }) => theme.color.black};

    .highlight {
      font-weight: 700;
      color: ${({ theme }) => theme.color.primary};
    }
  }
  ${({ active }) =>
    active &&
    css`
      background-color: ${({ theme }) => theme.color.grey_100};
    `}
`;
