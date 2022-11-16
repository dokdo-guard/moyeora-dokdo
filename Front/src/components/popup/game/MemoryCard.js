import Logo from './logo.png';

export default function MemoryCard({ data, handleClickCard }) {

  const s3Url = "https://ssafy-d204-dokdo.s3.ap-northeast-2.amazonaws.com/"
  return (
    <div
      className={`memory-card ${data.revealed ? 'flip' : ''}`}
      onClick={handleClickCard}
    >
      <img
        data-cell-index={data.id}
        className='back-face'
        src={Logo}
        alt="Click me!"
      />
      <img
        data-cell-index={data.id}
        className='front-face'
        src={s3Url+data.image}
        alt={data.face}
      />
    </div>
  );
}
