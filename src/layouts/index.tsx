import { Link, Outlet } from "react-router-dom";
import { ReactComponent as Logo } from "@/assets/logo.svg";
import styled from "styled-components";

const Layout = () => {
  return (
    <LayoutContainer>
      <LayoutHeader>
        <div>
          <Link to="/">
            <Logo height={24} />
          </Link>
        </div>
      </LayoutHeader>
      <Outlet />
    </LayoutContainer>
  );
};

export default Layout;

const LayoutContainer = styled.div`
  min-height: 100vh;
`;
export const LayoutHeader = styled.div`
  & > div {
    margin: 0 auto;
    max-width: ${({ theme }) => theme.size.maxW};
    padding: 16px 20px;

    a {
      display: inline-block;
      padding: 0 6px;
    }
  }
`;
