import { useState } from 'react';
import Popup from '../components/mypage/badge';

function MypageTest() {
  const [visibility, setVisibility] = useState(false);

  return (
    <>
      <button onClick={() => setVisibility(true)}>open</button>
      <Popup onClose={()=> setVisibility(false)} show={visibility}>

        <div>
          내용을 적어주세요
        </div>
      </Popup>
    </>
  );
}
export default MypageTest;
