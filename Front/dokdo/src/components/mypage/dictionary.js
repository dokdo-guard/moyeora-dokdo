import { useEffect, useState } from 'react';
import popupStyles from '../css/MyPagePopup.module.css';
import PropTypes from 'prop-types';

const Popup = (props) => {
  const dummy_data = [
    {
      name: 'badge1',
      url: '/src/components/imgs/badge1.png',
    },
  ];

  const [show, setShow] = useState(false);
  const closeHandler = (e) => {
    setShow(false);
    props.onClose(false);
  };

  const getBirds = (e) => {}
  const getSeaAnimals = (e) => {}
  const getPlants = (e) => {}

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  return (
    <div
      style={{
        visibility: show ? 'visible' : 'hidden',
        opacity: show ? '1' : '0',
      }}
      className={popupStyles.overlay}
    >
      <div className={popupStyles.popup}>
        <span className={popupStyles.close} onClick={closeHandler} />
        <div className={popupStyles.birds} onClick={getBirds}></div>
        <div className={popupStyles.seaAnimals} onClick={getSeaAnimals}></div>
        <div className={popupStyles.plants} onClick={getPlants}></div>
        <div className={popupStyles.content}>
          {dummy_data.map((item) => {
            return (
              <div className={popupStyles.badge}>
                <img src={item.url}></img>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

Popup.propTypes = {
  title: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Popup;
