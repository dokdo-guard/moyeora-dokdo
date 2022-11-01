import { useState } from 'react';
import Popup from '../components/tutorial/tutorial';

function MypageTest() {
  const [visibility, setVisibility] = useState(true);

  return (
    <>
      <button onClick={() => setVisibility(true)}>open</button>
      <Popup onClose={()=> setVisibility(false)} show={visibility}>
      </Popup>
    </>
  );
}
export default MypageTest;
