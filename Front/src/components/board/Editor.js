import { useState, useRef, useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "../../App.js";
import { createBoard } from "../../api/board.js";

const Editor = ({ originData }) => {


  const contentRef = useRef();
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const [imageSrc, setImageSrc] = useState('');
  const [image_url, setImage_url] = useState('')
  const [file, setFile] = useState({})


  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);

    setImage_url(fileBlob.name)
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);

        resolve();
      };
    });
  };

  // S3에 직접 이미지 올리기
  const region = "ap-northeast-2";
  const bucket = "ssafy-d204-dokdo";

  AWS.config.update({
    region: region,
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
  });

  const handleSubmit = (e) => {
    // 내용 한 자라도 안쓰면 저장 안되도록 막기
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    // S3
    const upload = new AWS.S3.ManagedUpload({
      params: {
          Bucket: bucket, // 버킷 이름
          Key: file.name, // 유저 아이디
          Body: file, // 파일 객체
      },
    });

    const promise = upload.promise();
        promise.then(
            function () {
                // 이미지 업로드 성공
                window.setTimeout(function () {
                    location.reload();
                }, 2000);
                console.log('성공!')
            },
            function (err) {
                // 이미지 업로드 실패
                console.log('에러ㅠㅠ')
            }
        );

    // API로 내용, 이미지 저장하기(backend와의 API 상)
    let info = {
      content,
      image_url
    }

    createBoard(info)
      .then((res) => {
        
      })
      .catch((err) => {
        console.log(err)
      })
    navigate('/home/board')

  
  };

  return (<>

    <input type="file" 
    accept='image/jpg,impge/png,image/jpeg,image/gif' 
    onChange={(e) => {
      encodeFileToBase64(e.target.files[0]);
      setFile(e.target.files[0])
    }} />
    <div className="preview">
      {imageSrc && <img src={imageSrc} alt="preview-img" />}
    </div>

    <input ref={contentRef}
    value={content} onChange={(e) => { setContent(e.target.value) }}></input>
    <button onClick={handleSubmit}>작성하기</button>
  </>)
}


export default Editor;
