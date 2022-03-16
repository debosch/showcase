import { ReactComponent as TopArrow } from '../../../../../../assets/icons/arrowTop.svg';
import { SerializedStyles } from '@emotion/react';

interface Props {
  className?: SerializedStyles;
  onClick?: () => void;
}

const SortingLetter = (props: Props) => {
  const { className, onClick } = props;
  return (
    <div css={className} onClick={onClick}>
      А-Я &nbsp;
      <span>
        <TopArrow />
      </span>
    </div>
  );
};

export default SortingLetter;
