import '@/styles/globals.scss';

export const metadata = {
  title: 'Your Name // Developer',
  description: 'Portfolio built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}