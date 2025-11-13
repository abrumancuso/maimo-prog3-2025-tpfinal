import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


export default function RootLayout({ children }) {
  return (
    <html lang="es">
     <body className="bg-orange-50 text-zinc-900 antialiased">
        <Navbar />
        <main className="mx-auto min-h-[calc(100vh-120px)] max-w-5xl px-6 py-10 lg:py-14">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}