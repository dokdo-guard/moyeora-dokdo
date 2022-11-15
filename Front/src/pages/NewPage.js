import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "../components/board/Editor";
import { createBoard } from "../api/board.js";
import '../components/css/Board.css'

const NewPage =() => {
    const [isLoaded, setIsLoaded] = useState(false)
    useEffect(()=> {
        setIsLoaded(!isLoaded)
    },[])




// editor
var AWS = require("aws-sdk");
const contentRef = useRef();
const [content, setContent] = useState("");
const navigate = useNavigate();

const [imageSrc, setImageSrc] = useState("");
const [image_url, setImage_url] = useState("");
const [file, setFile] = useState({});

const encodeFileToBase64 = (fileBlob) => {
  const reader = new FileReader();
  reader.readAsDataURL(fileBlob);

  setImage_url(fileBlob.name);
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
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
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
        window.location.reload();
      }, 2000);
      console.log("성공!");
    },
    function (err) {
      // 이미지 업로드 실패
      console.log("에러ㅠㅠ");
    },
  );

  // API로 내용, 이미지 저장하기(backend와의 API 상)
  let info = {
    content,
    image_url,
  };

  createBoard(info)
    .then((res) => {})
    .catch((err) => {
      console.log(err);
    });
};



    return (<div className="newPage">
        <div className="editorTitle">
            독도 소통의 공간
        </div>
        <div className="buttons">
          <button onClick={handleSubmit} className="write">작성하기</button>
          <button  className="goBack">돌아가기</button>
        </div>
        <textarea
        ref={contentRef}
        value={content}
        className="textarea"
        placeholder="독도에 대해 한 마디 작성해 보세요"
        onChange={(e) => {
            setContent(e.target.value);
        }}
        ></textarea>

        <div className="imageUpload">   
            {imageSrc ? (
            <>
            <div className='preview'>
                {imageSrc && <img src={imageSrc} alt='preview-img' className="previewImage"/>}
            </div>
            <button onClick={() => {setImageSrc("")}}>이미지 삭제</button>
            </>
        ) : (
          <></>
            // <img src="/assets/images/default.png" className="defaultImage"></img>
            )}
            <input
            type='file'
            accept='image/jpg,impge/png,image/jpeg,image/gif'
            onChange={(e) => {
                encodeFileToBase64(e.target.files[0]);
                setFile(e.target.files[0]);
            }}
            />
        </div>

    </div>)
}

export default NewPage