import "@/styles/tailwind.css";
import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen font-sans bg-white">
      <Header />
      <main className="container p-4 mx-auto">{children}</main>
    </div>
  );
}
