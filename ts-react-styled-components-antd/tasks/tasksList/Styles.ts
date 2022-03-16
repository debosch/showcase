import styled from '@emotion/styled';
import { breakpoints } from '../../../../../components/ui/Style';

export const STasksList = styled.section`
  padding: 30px 35px 0 15px;

  @media (max-width: ${breakpoints.laptop}) {
    padding: 10px 10px 0 10px;
  }
`;
