import "@/styles/tailwind.css";
import Header from "./Header";
import { toast } from "sonner";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen font-sans bg-white">
      {/* <button
        onClick={() =>
          toast("안녕하세요!", { description: "Sonner 기반 Toast입니다." })
        }
      >
        Toast 띄우기
      </button>{" "} */}
      <Header />
      <main className="container p-4 mx-auto">{children}</main>
    </div>
  );
}
