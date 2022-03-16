import React, { FC, useState } from 'react';
import {
  styles,
  SPerformer,
  Image,
  SInput,
  ItemWrapper,
  PerformerName,
} from './Styles';
import { CheckboxEventType } from '../../../../../../../ts/types/input.type';
import { Checkbox } from 'antd';

interface IPerformer {
  performer: any;
  index?: number;
  onChange: (id: number) => void;
  isDropdownItem?: boolean;
}

const Performer: FC<IPerformer> = ({
  performer,
  index,
  onChange,
  isDropdownItem,
}) => {
  const [isChecked, setChecked] = useState<boolean>(false);

  const handleChange = (event: CheckboxEventType) => {
    setChecked(event.target.checked);

    onChange(performer.id);
  };

  return isDropdownItem ? (
    <ItemWrapper onClick={(e) => e.stopPropagation()}>
      <Checkbox css={styles.checkbox} onChange={handleChange}>
        <Image height='24' width='24' src={performer.src} />
        <PerformerName>{performer.name}</PerformerName>
      </Checkbox>
    </ItemWrapper>
  ) : (
    <SPerformer
      isChecked={isChecked}
      key={performer.id}
      zIndex={index || 0}
      index={index || 0}
    >
      <Image height='34' width='34' src={performer.src} alt='Performer photo' />
      <SInput type='checkbox' onChange={handleChange} />
    </SPerformer>
  );
};

export default Performer;
