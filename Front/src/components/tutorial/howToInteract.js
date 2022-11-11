import "../css/Tutorial.module.css";

const Interact = () => {
  return (
    <>
      <img src='/assets/images/characters/siryeong2.png' />
      <img
        style={{
          width: 200,
          top: 100,
        }}
        src='/assets/images/characters/penguin.png'
      />
      <span>
        다양한 NPC들과 <br />
        상호작용 해보세요!
      </span>
    </>
  );
};

export default Interact;
