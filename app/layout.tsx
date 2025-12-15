import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlueprintProvider } from "@/components/blueprint-context";
import { NeuralTerminal } from "@/components/NeuralTerminal";


const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "OpenSyntaxHQ | Engineer-first Open Source",
  description: "Building practical, well-documented tools and reference implementations that make software systems easier to design, ship, and maintain.",
  openGraph: {
    title: "OpenSyntaxHQ",
    description: "Engineer-first open-source tools.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <BlueprintProvider>
            <div id="entropy-container" className="relative min-h-screen flex flex-col pb-10">
               <Navbar />
               <main className="flex-1 w-full">{children}</main>
               <Footer />
            </div>
            <NeuralTerminal />
          </BlueprintProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
