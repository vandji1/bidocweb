import type { Metadata } from "next";
import Header from "./components/header"; 
import { Inter } from "next/font/google";
import "./globals.css"; 
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css' 

config.autoAddCss = false

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Oumistore : vente en ligne, electronique, mode, maison, sport, vêtement, beauté",
  description: "Commerce électronique multi-vendeur",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr"> 
      <body className={inter.className}>
        <Header />
        {children} 
      </body>

    </html>
  );
}
