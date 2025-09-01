import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Inter, Baloo_2 } from "next/font/google";
import "./globals.css";
import StoreProvider from "./provider";

const inter = Inter({ subsets: ["latin"] });
const baloo2 = Baloo_2({ subsets: ["latin"], weight: ["400","600","700"] });

export const metadata = {
  title: "PetVetPals – Your Trusted Online Pet Care Platform",
  description: "AI-Powered pet health tools, verified veterinarians, online vet consultations, shop pet accessories, and ensure your pet's well-being—all in one place!",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={`${inter.className} ${baloo2.className}`}>
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
