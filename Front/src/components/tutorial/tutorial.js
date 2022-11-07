import { useEffect, useState } from 'react';
import popupStyles from '../css/Tutorial.module.css';
import PropTypes from 'prop-types';
import Interact from './howToInteract';
import Move from './howToMove';

const Tutorial = (props) => {
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
    <>
    <div
      // style={{
      //   visibility: show ? 'visible' : 'hidden',
      //   opacity: show ? '1' : '0',
      // }}
      // className={popupStyles.overlay}
      style={{position:'absolute', zIndex:'12', left:'35%',scale:"120%",top:'20%'}}
    >
      {/* <div className={popupStyles.close}>
        <img src="/assets/icons/cancel.png" onClick={closeHandler}></img>
      </div> */}
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
                setPage(0);
              }}
            >
              이전
            </button>
          </>
        )}
      </div>
    </div>
    <div style={{backgroundColor:'black',width:'100vw',height:'100vh', opacity:'50%',position:'absolute',zIndex:'7'}}></div>
    </>
  );
};

// Tutorial.propTypes = {
//   show: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
// };

export default Tutorial;
