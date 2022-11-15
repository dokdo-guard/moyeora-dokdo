export const createMatrix = () => {
    const imagePool = ["감태.png", "강치.png", "개볼락.png", "거북손.png", "고랑딱개비.png", "괭생이모자반.png", "구멍갈파래.png", "구슬모자반.png", "기름가자미.png"]
    const randomImages = randomSelect(imagePool, 6); 
    const matrix = [];
    for (let i = 0; i < randomImages.length; i++) {
      const cell = {
        face: randomImages[i].substr(0, randomImages[i].length-4),
        image: randomImages[i],
      };
      let pair = [cell, cell];
      matrix.push(...pair);
    }
    // shuffle array
    for (let i = matrix.length - 1; i > 0; i--) {
      let randomPos = Math.floor(Math.random() * (i + 1));
      [matrix[i], matrix[randomPos]] = [matrix[randomPos], matrix[i]];
    }
    return matrix.map((cell, index) => ({
      ...cell,
      id: index,
      revealed: false,
    }));
  
    function randomSelect(imagePool, number) {
      const max = imagePool.length;
      const list = [];
      while(list.length==number){
        const rand = Math.random() * (max-1) + 1;
        if(!list.includes(rand)){
          list.push(rand);
        }
      }
      const imageList = []
      for (let index = 0; index < number; index++) {
        imageList.push(imagePool[index])
      }
      // console.log("imagePool", imagePool);
      // console.log("imageList", imageList);
      return imageList
    }
  };
  