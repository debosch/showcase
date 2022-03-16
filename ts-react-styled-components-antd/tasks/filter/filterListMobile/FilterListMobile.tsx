import React, { FC } from 'react';
import {
  MobileList,
  MobileListItem,
  MobileListItemText,
  MobileDatePickerSplit,
  MobileListHeader,
  styles,
} from './Styles';
import { useTranslation } from 'react-i18next';
import { Button as AntdButton, Row } from 'antd';
import Button from '../../../../../../components/button/Button';
import DatePicker from '../../../../../../components/datePicker/DatePicker';
import Select from '../../../../../../components/select/Select';
import Checkbox from '../../../../../../components/checkbox/Checkbox';

interface IFilterListMobileProps {
  onDrawerClose?: () => void;
}

const FilterListMobile: FC<IFilterListMobileProps> = () => {
  const { t } = useTranslation();
  const ns = 'components.projectTasksFilter';

  return (
    <>
      <MobileListHeader>{t(`${ns}.filters`)}</MobileListHeader>
      <MobileList>
        <MobileListItem>
          <MobileListItemText>{t(`${ns}.performer`)}</MobileListItemText>
          <Select
            className={styles.select}
            placeholder={t(`${ns}.choosePerformer`)}
          />
        </MobileListItem>
        <MobileListItem>
          <MobileListItemText>{t(`${ns}.deadline`)}</MobileListItemText>
          <Row align='middle'>
            <DatePicker />
            <MobileDatePickerSplit>-</MobileDatePickerSplit>
            <DatePicker />
          </Row>
        </MobileListItem>
        <MobileListItem marginBottom={20}>
          <MobileListItemText>{t(`${ns}.status`)}</MobileListItemText>
          <Select
            className={styles.select}
            placeholder={t(`${ns}.chooseStatus`)}
          />
        </MobileListItem>
        <MobileListItem>
          <Checkbox
            onChange={(event) => console.log(event)}
            className={styles.checkbox}
          />
          {t(`${ns}.importantTask`)}
        </MobileListItem>
        <MobileListItem marginBottom={20}>
          <Button className={styles.mobileAcceptButton}>
            {t(`${ns}.accept`)}
          </Button>
        </MobileListItem>
        <MobileListItem>
          <AntdButton css={styles.mobileClearButton}>
            {t(`${ns}.clear`)}
          </AntdButton>
        </MobileListItem>
      </MobileList>
    </>
  );
};

export default FilterListMobile;
