import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OauthRedirect = (props) => {
  const navigate = useNavigate();

  const getUrlParameter = (keyVal) => {
    keyVal = keyVal.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + keyVal + '=([^&#]*)');

    let results = regex.exec(window.location);
    return results === null
      ? ''
      : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };

  useEffect(() => {
    const token = getUrlParameter('token');
    const error = getUrlParameter('error');
    if (token) {
      localStorage.setItem('accessToken', token);
      navigate('/main/mainTest');
    } else {
      console.log(error);
      navigate('/login');
    }
  });

  return <div>리다이렉트 페이지</div>;
};

export default OauthRedirect;
