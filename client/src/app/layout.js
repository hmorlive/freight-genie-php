import { Roboto } from "next/font/google";
import "./globals.css";
import Navigation from "./shared/navbar/navigation";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Footer from "./shared/footer/footer";
config.autoAddCss = false;

const font = Roboto({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata = {
  title: "Freight Genie",
  description: "Demo Freight Booking App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${font.className} flex flex-col flex-1 bg-white text-black min-h-screen`}
      >
        <Navigation />
        <main className="flex flex-col flex-1 text-black">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
