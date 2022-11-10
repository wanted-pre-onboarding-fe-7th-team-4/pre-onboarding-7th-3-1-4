import styled from "styled-components";

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  .icon {
    position: absolute;
    width: 16px;
    height: 16px;
    color: ${({ theme }) => theme.color.grey_500};
    left: 24px;
  }

  input {
    padding: 15px 10px 15px 54px;
    background: ${({ theme }) => theme.color.white};
    border: 2px solid ${({ theme }) => theme.color.white};
    border-radius: 42px 0 0 42px;
    width: 100%;
    border: 0;
    outline: 0;
    caret-color: ${({ theme }) => theme.color.primary};
    font-size: 18px;
    line-height: 29px;
    letter-spacing: -0.324px;
    color: ${({ theme }) => theme.color.grey_500};

    &::placeholder {
      color: ${({ theme }) => theme.color.grey_300};
    }

    &:focus {
      &::placeholder {
        visibility: hidden;
      }
    }
  }

  button {
    border-radius: 0 42px 42px 0;
    color: ${({ theme }) => theme.color.white};
    border: 0;
    background: ${({ theme }) => theme.color.primary};
    font-size: 18px;
    line-height: 29px;
    text-align: center;
    letter-spacing: -0.324px;
    padding: 15px 24px;
    cursor: pointer;
    word-break: keep-all;
  }
`;
