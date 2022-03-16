import styled from '@emotion/styled';
import { baseTheme } from '../../../../../../theme/baseTheme';
import { breakpoints } from '../../../../../components/ui/Style';

export const styles = {
  drawerMask: {
    backdropFilter: 'blur(14px)',
  } as const,

  drawer: {
    position: 'relative',
    backgroundColor: `${baseTheme.colors.whiteDark}`,
  } as const,
};

export const SCTasksFilter = styled.div`
  padding: 50px 40px 0 20px;
  @media (max-width: ${breakpoints.laptopM}) {
    padding-top: 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
    padding-right: 20px;
  }
`;

export const ControlsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${breakpoints.laptopM}) {
    flex-direction: row-reverse;
    justify-content: space-between;
  }
`;

export const DrawerFilter = styled.div`
  position: absolute;
  top: 30%;
  left: 0;
  right: 0;
  bottom: 26px;
`;
