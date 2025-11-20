import "./globals.css";
import { PetifyProvider } from "../contexts/PetifyContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Petify",
  description: "Adoptar es conectar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <PetifyProvider>
          <Navbar />
          {children}
          <Footer />
        </PetifyProvider>
      </body>
    </html>
  );
}

