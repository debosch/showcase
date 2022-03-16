import React, { FC, useState } from 'react';
import { DisplayButtons, SInput, SLabel } from './Styles';
import { ReactComponent as DeskIcon } from '../../../../../../assets/icons/desk.svg';
import { ReactComponent as ListIcon } from '../../../../../../assets/icons/list.svg';
import { useTranslation } from 'react-i18next';
import { InputEventType } from '../../../../../../ts/types/input.type';

interface IDisplayTypeProps {
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DisplayType: FC<IDisplayTypeProps> = ({ name, onChange }) => {
  const [displayType, setDisplayType] = useState<string>('list');
  const { t } = useTranslation();
  const ns = 'components.projectTasksFilter';

  const handleChange = (event: InputEventType): void => {
    setDisplayType(event.target.value);
    onChange && onChange(event);
  };

  return (
    <DisplayButtons>
      <SLabel isChecked={displayType === 'list'}>
        <SInput
          onChange={handleChange}
          checked={displayType === 'list'}
          type='radio'
          value='list'
          name={name}
        />
        <ListIcon />
        {t(`${ns}.list`)}
      </SLabel>
      <SLabel isChecked={displayType === 'desk'}>
        <SInput
          onChange={handleChange}
          checked={displayType === 'desk'}
          type='radio'
          value='desk'
          name={name}
        />
        <DeskIcon />
        {t(`${ns}.desk`)}
      </SLabel>
    </DisplayButtons>
  );
};

export default DisplayType;
