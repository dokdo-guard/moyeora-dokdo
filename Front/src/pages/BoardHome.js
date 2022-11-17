import { useEffect, useState, useRef } from "react";
import BoardItem from "../components/board/BoardItem";
import "../../src/components/css/Board.css";
import axios from "axios";

const BoardHome = ({ quitBoard }) => {
  const accessToken = sessionStorage.getItem("accessToken");

  const [page, setPage] = useState(false);

  const NewPage = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
      setIsLoaded(!isLoaded);
    }, []);

    // editor
    var AWS = require("aws-sdk");
    const contentRef = useRef();
    const [content, setContent] = useState("");

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
      setPage(!page);

      // S3
      const upload = new AWS.S3.ManagedUpload({
        params: {
          Bucket: bucket, // 버킷 이름
          Key: file.name, // 유저 아이디
          Body: file, // 파일 객체
        },
      });

      const promise = upload.promise();
      promise
        .then(function () {
          // 이미지 업로드 성공
        })
        .catch((err) => {
          console.log(err);
        });

      // API로 내용, 이미지 저장하기(backend와의 API 상)
      let info = {
        content: content,
        image_url: image_url,
      };

      const createBoard = async (info) => {
        await axios.post(`https://k7d204.p.ssafy.io/api/board`, info, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      };
      createBoard(info);
    };

    return (
      <div className='newPage'>
        <div className='editorTitle'>독도 소통의 공간</div>
        <div className='buttons'>
          <button onClick={handleSubmit} className='write'>
            작성하기
          </button>
          <button
            className='goBack'
            onClick={() => {
              setPage(!page);
            }}
          >
            돌아가기
          </button>
        </div>

        <div className='textareaWrapper'>
          <textarea
            ref={contentRef}
            value={content}
            className='textarea'
            placeholder='독도에 대해 한 마디 작성해 보세요'
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></textarea>
        </div>
        <div className='imageUpload'>
          {imageSrc ? (
            <>
              <div className='preview'>
                {imageSrc && (
                  <img
                    src={imageSrc}
                    alt='preview-img'
                    className='previewImage'
                  />
                )}
              </div>
              <button
                onClick={() => {
                  setImageSrc("");
                }}
              >
                이미지 삭제
              </button>
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
      </div>
    );
  };
  const BoardList = () => {
    const [board, setBoard] = useState([]);
    const getBoard = async () => {
      await axios
        .get(`https://k7d204.p.ssafy.io/api/board`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          setBoard(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    useEffect(() => {
      getBoard();
    }, [board.length]);

    let boardList = board.reverse();

    return (
      <div className='boardHome'>
        <h1 className='title'>여러분의 독도를 꾸며주세요</h1>
        <button
          className='writeButton'
          onClick={() => {
            setPage(!page);
          }}
        >
          새 글 쓰기
        </button>

        {boardList.map((it) => (
          <div style={{ marginLeft: "6vw" }}>
            <BoardItem key={it.id} {...it} className='boardItem'></BoardItem>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {!page ? (
        <>
          <BoardList></BoardList>
        </>
      ) : (
        <>
          <NewPage></NewPage>
        </>
      )}

      <img
        src='/assets/icons/cancel.png'
        onClick={quitBoard}
        className='quitBoard'
        alt='NOIMAGE'
      ></img>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "black",
          opacity: "50%",
          position: "absolute",
          zIndex: "10",
        }}
      ></div>
    </div>
  );
};

export default BoardHome;
