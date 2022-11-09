import { useEffect, useState } from 'react';
import popupStyles from '../css/Tutorial.module.css';
import PropTypes from 'prop-types';

const Move = () => {
  return (
    <>
      <img src="/assets/images/characters/siryeong.png" />
      <img src="/assets/icons/click.png" />
      <span>
        원하는 위치를 클릭해 <br />
        캐릭터를 이동할 수 있습니다.
      </span>
      
    </>
  );
};

export default Move;