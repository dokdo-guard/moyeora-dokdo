import { useEffect, useState } from 'react';
import popupStyles from '../css/Tutorial.module.css';
import PropTypes from 'prop-types';

const Popup = (props) => {
  const [show, setShow] = useState(false);

  const closeHandler = (e) => {
    setShow(false);
    props.onClose(false);
  };

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
      <div className={popupStyles.close}>
        <img src="/assets/icons/cancel.png" onClick={closeHandler}></img>
      </div>
      <div className={popupStyles.contents}>
        <div>

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