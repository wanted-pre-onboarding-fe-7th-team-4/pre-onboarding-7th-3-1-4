import styled from "styled-components";

export const MainPageContainer = styled.div`
  min-height: calc(100vh - ${({ theme }) => theme.size.headerH});
  background: ${({ theme }) => theme.color.bg};
  height: 1px;
  & > div {
    margin: 0 auto;
    max-width: ${({ theme }) => theme.size.maxW};
    min-height: 100%;
    height: 1px;
    &::before {
      content: "";
      display: table;
    }
  }
`;

export const Title = styled.div`
  margin: 80px auto 40px;

  h1 {
    font-weight: 700;
    font-size: 34px;
    line-height: 54px;
    text-align: center;
    /* letter-spacing: -0.612px; */
    color: ${({ theme }) => theme.color.black};
  }
`;
