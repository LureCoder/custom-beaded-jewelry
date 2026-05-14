import { Noto_Serif_SC, Noto_Sans_SC, Cormorant_Garamond, Inter } from "next/font/google";

const notoSerifSC = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-noto-serif-sc",
  display: "swap",
});

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-noto-sans-sc",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-inter",
  display: "swap",
});

const fontVariables = [
  notoSerifSC.variable,
  notoSansSC.variable,
  cormorantGaramond.variable,
  inter.variable,
].join(" ");

export { notoSerifSC, notoSansSC, cormorantGaramond, inter, fontVariables };
