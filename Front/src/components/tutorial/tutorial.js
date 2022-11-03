import { useEffect, useState } from 'react';
import popupStyles from '../css/Tutorial.module.css';
import PropTypes from 'prop-types';
import Interact from './howToInteract';
import Move from './howToMove';

const Popup = (props) => {
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(0);

  const closeHandler = (e) => {
    setShow(false);
    props.onClose(false);
    setPage(0);
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
        {page == 0 && (
          <>
            <Move></Move>
            <button
              onClick={() => {
                setPage(1);
              }}
            >
              다 음
            </button>
          </>
        )}
        {page == 1 && (
          <>
            <Interact />
            <button
              onClick={() => {
                closeHandler();
              }}
            >
              완 료
            </button>
          </>
        )}
      </div>
    </div>
  );
};

Popup.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Popup;
