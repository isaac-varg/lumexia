import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/App/Sidebar";
import Searchbar from "@/components/App/Searchbar";
import Providers from "@/context/Providers";
import { auth } from "@/auth";
import { AuthProvider } from "@/components/App/AuthProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Lumexia",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable}`}>
        <Providers>
          <AuthProvider session={session}>
            <div className="flex flex-row h-screen">
              <Sidebar />
              <div className="flex flex-col w-full px-8 py-8 gap-y-8">
                <Searchbar />
                {children}
              </div>
            </div>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
