import "@/styles/tailwind.css";
import Header from "./Header";
import { Toaster } from "sonner";
import { LoginModal } from "./LoginModal";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen font-sans bg-white">
      <LoginModal />
      <Header />
      <Toaster />
      <main className="container p-4 mx-auto">{children}</main>
    </div>
  );
}
