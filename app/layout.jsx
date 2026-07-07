import "./globals.css";
import Navbar from "./components/Navbar";
import ChatWidget from "./components/ChatWidget";
import { FormProvider } from "./context/FormContext";

export const metadata = {
  title: "Smart Bharat — AI-Powered Civic Platform",
  description:
    "Smart Bharat is a GenAI-powered Civic Companion that simplifies citizen-government interactions through personalized assistance, intelligent recommendations, and a unified digital experience.",
  keywords:
    "government services, schemes, civic platform, India, AI assistant, Smart Bharat",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <FormProvider>
          <Navbar />
          <main className="page-container">{children}</main>
          <ChatWidget />
        </FormProvider>
      </body>
    </html>
  );
}
