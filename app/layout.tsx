import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "ElimuFund — School Fees Emergency Loan Matcher",
  description: "Empowering Kenyan parents with harvest-aligned school fee loans from SASRA-verified SACCOs. Under DPA 2022 compliance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakarta.variable} font-sans bg-cream antialiased min-h-screen flex flex-col`}>
        <LanguageProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
