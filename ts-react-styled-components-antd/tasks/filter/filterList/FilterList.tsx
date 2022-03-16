import React, { FC } from 'react';
import {
  DatePickerSplit,
  List,
  ListItem,
  ListItemText,
  styles,
} from './Styles';
import { Button, Row } from 'antd';
import DatePicker from '../../../../../../components/datePicker/DatePicker';
import Select from '../../../../../../components/select/Select';
import Checkbox from '../../../../../../components/checkbox/Checkbox';
import { useTranslation } from 'react-i18next';
import { ReactComponent as FiltersIcon } from '../../../../../../../assets/icons/filter.svg';
import moment from 'moment';
import PerformersList from '../../performersList/PerformersList';

interface IFilterListProps {
  onDrawerOpen?: () => void;
}

const FilterList: FC<IFilterListProps> = ({ onDrawerOpen }) => {
  const { t } = useTranslation();
  const ns = 'components.projectTasksFilter';

  return (
    <List>
      <ListItem>
        <ListItemText>{t(`${ns}.deadline`)}</ListItemText>
        <Row align='middle'>
          <DatePicker disableDate={moment().add(1, 'day')} />
          <DatePickerSplit>-</DatePickerSplit>
          <DatePicker disableDate={moment().add(1, 'day')} />
        </Row>
      </ListItem>
      <ListItem>
        <ListItemText>{t(`${ns}.performer`)}</ListItemText>
        <PerformersList />
      </ListItem>
      <ListItem>
        <ListItemText>{t(`${ns}.status`)}</ListItemText>
        <Select
          className={styles.select}
          placeholder={t(`${ns}.chooseStatus`)}
        />
      </ListItem>
      <ListItem>
        <Checkbox
          onChange={(event) => console.log(event)}
          className={styles.checkbox}
        />
        {t(`${ns}.importantTask`)}
      </ListItem>
      <ListItem>
        <Button css={styles.clearButton}>{t(`${ns}.clear`)}</Button>
      </ListItem>
      <ListItem showOnMobile>
        <Button css={styles.filterButton} onClick={onDrawerOpen}>
          {t(`${ns}.filters`)}
          <FiltersIcon />
        </Button>
      </ListItem>
    </List>
  );
};

export default FilterList;
