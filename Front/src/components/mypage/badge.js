import { useEffect, useState } from 'react';
import popupStyles from '../css/MyPagePopup.module.css';
import PropTypes from 'prop-types';
import api from '../../api/api';

const Popup = (props) => {
  const [show, setShow] = useState(false);
  const [badge, setBadge] = useState([]);

  const closeHandler = (e) => {
    setShow(false);
    props.onClose(false);
  };

  useEffect(() => {
    setShow(props.show);
    api.get('/badge').then((res) => {
      setBadge(res.data);
    });
  }, [props.show]);

  return (
    <div
      style={{
        visibility: show ? 'visible' : 'hidden',
        opacity: show ? '1' : '0',
      }}
      className={popupStyles.overlay}
    >
      <span className={popupStyles.close} onClick={closeHandler} />
      <div className={popupStyles.popup}>
        <div className={popupStyles.content}>
          {badge.map((item, index) => {
            return (
              <div className={popupStyles.badge} key={index}>
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
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Popup;
