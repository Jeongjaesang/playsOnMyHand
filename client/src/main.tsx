// import { createRoot } from "react-dom/client";
// import App from "./App.tsx";

// async function enableMocking(): Promise<void> {
//   if (import.meta.env.MODE === "development") {
//     return;
//   }

//   const { worker } = await import("./mocks/browser");
//   await worker.start(); // 반환값을 명확하게 무시
// }

// enableMocking().then(() => {
//   createRoot(document.getElementById("root")!).render(
//     <>
//       <App />
//     </>
//   );
// });

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const { worker } = await import("./mocks/browser"); //Dynamic import하는 것이 눈에 띄였다.
  return worker.start();
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
