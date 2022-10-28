import { useState } from 'react';
import Popup from '../components/mypage/selectCharacter';

function MypageTest() {
  const [visibility, setVisibility] = useState(false);

  return (
    <>
      <button onClick={() => setVisibility(true)}>open</button>
      <Popup onClose={()=> setVisibility(false)} show={visibility}>
      </Popup>
    </>
  );
}
export default MypageTest;
