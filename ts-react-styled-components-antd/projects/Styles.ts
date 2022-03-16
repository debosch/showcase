import styled from '@emotion/styled';
import { breakpoints } from '../../../../components/ui/Style';

const style = {};

export const Main = styled.main`
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export const FooterMobile = styled.footer`
  display: none;
  margin-top: auto;

  @media (max-width: ${breakpoints.tablet}) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    > ul {
      margin: 20px 0;
    }
  }
`;

export default style;
