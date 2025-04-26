import { Inter, Montserrat } from "next/font/google";
import { ThemeProvider } from "../components/ThemeProvider";
import "../styles/globals.css";
import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata = {
  title: "NikTokenize - Real Estate Tokenization Platform",
  description:
    "Tokenize real estate assets with ERC-3643 compliant security tokens. Invest in property, earn dividends, and unlock liquidity.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} dark`}>
      <body className="flex flex-col min-h-screen bg-base-100">
        <ThemeProvider>
          <ScaffoldEthAppWithProviders>{children}</ScaffoldEthAppWithProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
