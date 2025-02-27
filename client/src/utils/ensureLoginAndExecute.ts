// // 로그인 하지 않은 상태라면 모달을 띄운다.
// // 사용되는 곳1: 홈페이지에서 하트 눌렀을 때, 로그인 안 되어 있으면 로그인 모달 띄우기
// // 사용되는 곳2: 상세 페이지에서 찜 버튼 누를 때, 로그인 안 되어 있으면 로그인 모달 띄우기
// export const ensureLoginAndExecute = (
//   // 너무 과한 걸지도.. 현재로써는 로그인 안했을 때 취할 액션이 모달 여는 것 밖에 없는데,
//   // 굳이 callback을 받아서 실행하는 것이 맞는지 모르겠다.
//   isLoggedin: boolean,
//   openLoginModal: () => void,
//   callback: () => void
// ) => {
//   if (!isLoggedin) {
//     openLoginModal();
//     return;
//   }
//   callback();
// };

export const ensureLoggedIn = (
  isLoggedin: boolean,
  openLoginModal: () => void
) => {
  if (!isLoggedin) {
    openLoginModal();
  }
};
