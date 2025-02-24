import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Toaster } from "./components/shadcn/sonner.tsx";

createRoot(document.getElementById("root")!).render(
  <>
    {/* <Toaster /> 전역 Toaster 설정 */}
    <App />
  </>
);
