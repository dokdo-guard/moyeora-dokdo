import { useState } from 'react';
import MyPage from '../components/mypage/mypage';

function MypageTest() {
  const [visibility, setVisibility] = useState(false);

  return (
    <>
      <button onClick={() => setVisibility(true)}>open</button>
      <MyPage onClose={()=> setVisibility(false)} show={visibility} title="Hello Siryeong">
        <div>
          안녕하세요
        </div>
      </MyPage>
    </>
  );
}
export default MypageTest;
