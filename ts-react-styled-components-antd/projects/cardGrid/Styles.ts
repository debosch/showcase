import styled from '@emotion/styled';
import { AdaptiveFont, breakpoints } from '../../../../../components/ui/Style';

export const ProjectsGridWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding: 2vh 2vw 0 2vw;

  @media (max-width: ${breakpoints.laptop}) {
    justify-content: center;
  }
`;

export const Card = styled.div`
  height: 173px;
  flex: 0 1 24%;
  flex-wrap: wrap;
  margin: 20px 10px 5px 0;
  padding: 20px 16px;
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.grayLight};
  border: 4px solid ${({ theme }) => theme.colors.whiteMain};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  border-radius: 10px;

  @media (max-width: ${breakpoints.laptopL}) {
    flex: 0 1 32%;
  }
  @media (max-width: ${breakpoints.laptop}) {
    flex: 0 1 45%;
  }
  @media (max-width: ${breakpoints.mobileL}) {
    flex: 0 1 90%;
  }
`;

export const CardStatusWrapper = styled.div`
  ${AdaptiveFont(12, 14)};
  display: flex;
  align-items: center;
  font-weight: 500;
`;

export const Status = styled.div`
  font: inherit;
  margin-right: 1em;
  background: #e2f0c8;
  border: 1px solid #a2e81c;
  border-radius: 16px;
  color: #a2e81c;
  padding: 6px 12px;
  text-align: center;
`;

export const CreatedTime = styled.span`
  color: ${({ theme }) => theme.colors.grayMiddle};
  font: inherit;
  margin-left: 1em;
`;

export const ProjectName = styled.div`
  ${AdaptiveFont(14, 18)};
  color: ${({ theme }) => theme.colors.blackDark};
  padding-top: 10px;
  padding-bottom: 5px;
  font-weight: bold;
`;

export const InfoWrapper = styled.div`
  ${AdaptiveFont(12, 14)};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const DeadlineWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Deadline = styled.span`
  color: ${({ theme }) => theme.colors.blackDark};
  font-weight: 700;
  margin-left: 1em;
`;
