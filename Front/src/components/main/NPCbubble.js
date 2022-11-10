import { useEffect } from "react";

const NPCBubble = (animalName) => {
  const animalSpeaking = {
    penguin: ["이건 재미있다", "파이팅", "dd", "랜덤가자", "sdf", "1234"],
    rabbit: ["잠온다", "힘내자"],
  };
  console.log(animalName);
  console.log(animalName.animalName);
  if (animalName.animalName === "penguin") {
    console.log("제발 ㅠㅠㅠ");
    // var penguinSaying = animalSpeaking.penguin[Math.floor(Math.random() * animalSpeaking.penguin.length)]
    // console.log(penguinSaying)
  }
  if (animalName.animalName === "강치") {
    // var 강치Saying = animalSpeaking.rabbit[Math.floor(Math.random() * animalSpeaking.rabbit.length)]
    // console.log(강치Saying)
    console.log("강치강치");
  }
  return <></>;
};

export default NPCBubble;
