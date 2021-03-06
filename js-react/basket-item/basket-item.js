import './basket-item.scss';
import { ReactComponent as BucketIcon } from '../../../../assets/images/icons/bucket.svg';
import { ReactComponent as MinusIcon } from '../../../../assets/images/icons/minus.svg';
import { ReactComponent as PlusIcon } from '../../../../assets/images/icons/plus.svg';
import routes from '../../../../navigation/routes';
import useClassnames from '../../../../shared/hooks/useClassnames';
import PlanDescription from '../plan-description/plan-description';
import Switch from '../switch/switch';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const BasketItem = ({
  id, className, item, onChange, onDelete,
}) => {
  const containerClass = useClassnames('basket-item', className);
  const [itemData, setItemData] = useState({ planId: id, count: item.count, isEsim: item.isEsim });

  const handleRemove = () => {
    if (itemData.count > 1) {
      setItemData({ ...itemData, count: itemData.count - 1 });
    }
  };

  const handleAddition = () => {
    setItemData({ ...itemData, count: itemData.count + 1 });
  };

  const handleSwitch = (isChecked) => {
    setItemData({ ...itemData, isEsim: isChecked });
  };

  const handleDeletion = () => {
    if (onDelete) {
      onDelete(id);
    }
  };

  const getInternet = () => {
    const internet = get(item, 'internetCount', 0);

    return Math.floor(internet / 1e9);
  };

  useEffect(() => {
    if (onChange) {
      onChange(itemData);
    }
  }, [itemData, onChange]);

  return (
    <article className={containerClass}>
      <div className="basket-item__content">
        <div className="basket-item__header">
          <h3 className="basket-item__header-text">{item.name}</h3>
          <span className="basket_item__controls">
            <button
              onClick={handleRemove}
              aria-label="Remove the item"
              className="basket-item__remove-item"
              type="button"
            >
              <MinusIcon />
            </button>
            <p className="basket-item__total-items">{itemData.count}</p>
            <button
              onClick={handleAddition}
              aria-label="Add the item"
              className="basket-item__add-item"
              type="button"
            >
              <PlusIcon />
            </button>
            <button
              onClick={handleDeletion}
              aria-label="Delete the item"
              className="basket-item__delete-item"
              type="button"
            >
              <BucketIcon />
            </button>
          </span>
        </div>
        <PlanDescription
          containerClass="basket-item__plan-description"
          price={item.costBuyPlan}
          description={item.description}
          characteristics={item.props}
          internet={getInternet()}
          minute={item.minuteCount}
          sms={item.SMSCount}
        />
        <h4 className="basket-item__sim-header">SIM card type</h4>
        <p className="basket-item__sim-subtitle">
          {itemData.isEsim ? (
            <span>
              Connect within 5 mins (
              <NavLink className="basket-item__sim-learn-more" to={routes.works}>
                Learn More
              </NavLink>
              )
            </span>
          ) : (
            'Your sim will arrive via USPS within 2 ??? 4 business days'
          )}
        </p>
        <span className="basket-item__switch-container">
          <Switch
            checked={itemData.isEsim}
            onChange={handleSwitch}
            addClass="basket-item__switch"
            label="Order a Esim"
          />
        </span>
      </div>
      <div className="basket-item__footer">
        <p className="basket-item__footer-fee-text">Monthly fee</p>
        <p className="basket-item__footer-fee">
          $
          {item.costBuyPlan}
        </p>
      </div>
    </article>
  );
};

BasketItem.defaultProps = {
  className: '',
  item: {
    itemHeader: 'Level 1',
    price: 15,
    description: 'For administrators or others requiring full access to all functionality',
    list: [
      'Mollis Ornare Pretium',
      'Aenean Pretium',
      'Donec Convallis Metus',
      'Integer Volutpat',
      'Quis Euismod Pharetra',
    ],
    fee: 15,
  },
  onChange: () => {},
  onDelete: () => {},
};

BasketItem.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  className: PropTypes.string,
  item: PropTypes.object,
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
};

export default BasketItem;
