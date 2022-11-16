import axios from "axios";
const accessToken = sessionStorage.getItem("accessToken");

export const EarnTerrianBadge = () => {
  const getBadge = async () => {
    axios
      .get("https://k7d204.p.ssafy.io/api/badge", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        if (!res.data.visitTerrain) {
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getBadge();
};
export const EarnEcoBadge = () => {
  const getBadge = async () => {
    axios
      .get("https://k7d204.p.ssafy.io/api/badge", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        if (!res.data.visitBiology) {
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getBadge();
};
export const EarnHistoryBadge = () => {
  const getBadge = async () => {
    axios
      .get("https://k7d204.p.ssafy.io/api/badge", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        if (!res.data.visitHistory) {
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getBadge();
};
export const EarnQuizFiveBadge = () => {
  const getBadge = async () => {
    axios
      .get("https://k7d204.p.ssafy.io/api/badge", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        if (!res.data.quizFive) {
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getBadge();
};
export const EarnQuizTenBadge = () => {
  const getBadge = async () => {
    axios
      .get("https://k7d204.p.ssafy.io/api/badge", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        if (!res.data.quizTen) {
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getBadge();
};
export const EarnQuizFifteenBadge = () => {
  const getBadge = async () => {
    axios
      .get("https://k7d204.p.ssafy.io/api/badge", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        if (!res.data.quizFifteen) {
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getBadge();
};
