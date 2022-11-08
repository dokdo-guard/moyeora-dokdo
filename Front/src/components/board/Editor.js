import { useState, useRef, useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "../../App.js";
import { createBoard } from "../../api/board.js";

const Editor = ({ originData }) => {
  // 오늘 날짜 그대로 출력하기
  const getStringdate = (date) => {
    return date.toISOString().slice(0, 10);
  };

  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [date, setDate] = useState(getStringdate(new Date()));
  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);
  const navigate = useNavigate();

  const [image_url, setImage_url] = useState("");

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImage_url(reader.result);
        resolve();
      };
    });
  };

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    let info = {
      content,
      image_url,
    };

    onCreate(date, content);

    navigate("/home/board", { replace: true });
  };

  const handleRemove = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onRemove(originData.id);
      //   navigate("/", { replace: true });
    }
  };

  return (
    <>
      <input
        type='file'
        onChange={(e) => {
          encodeFileToBase64(e.target.files[0]);
        }}
      />
      <div className='preview'>
        {image_url && <img src={setImage_url} alt='preview-img' />}
      </div>
      <button>취소하기</button>
      <button>이미지 업로드하기</button>

      <input
        ref={contentRef}
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      ></input>
      <button onClick={handleSubmit}>작성하기</button>
    </>
  );
};

export default Editor;
