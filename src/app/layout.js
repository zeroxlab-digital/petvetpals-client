import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PetVetPals - Your Trusted Online Pet Care Platform",
  description: "Find experienced veterinarians, book online consultations, shop pet accessories, and ensure your pet's well-being—all in one place!",
};

const RootLayout = ({ children }) => {

  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          {children}
          <Analytics />
          <SpeedInsights />
        </StoreProvider>
      </body>
    </html>
  );
}
export default RootLayout;