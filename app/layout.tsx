import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js API Data Server",
  description: "A Next.js application that serves and displays mock API data.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="bg-gray-900">{children}</body>
    </html>
  );
}
