import type { Metadata } from "next";
import { Inter, Poppins, Roboto } from "next/font/google";
import "./globals.css";
import Searchbar from "@/components/App/Searchbar";
import Providers from "@/context/Providers";
import { auth } from "@/auth";
import { AuthProvider } from "@/components/App/AuthProvider";
import Toast from "@/components/Toast";
import CommandPallet from "@/components/CommandPallet/CommandPallet";
import QueryProvider from "@/components/App/QueryProvider";
import Sidebar from "./_components/sidebar/Sidebar";

// fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});
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
    <html lang="en" data-theme="nord">
      <body className={`${inter.variable} ${poppins.variable} ${roboto.variable}`}>
        <Providers>
          <AuthProvider session={session}>
            <QueryProvider>
              <div className="flex flex-row h-full">
                <Sidebar />

                <div className="flex flex-col w-full bg-base-200 px-28 py-8 gap-y-8">
                  <Searchbar />
                  <CommandPallet />
                  {children}
                </div>
                <Toast.Toast />
              </div>
            </QueryProvider>
          </AuthProvider>
        </Providers>

      </body>
    </html>
  );
}
