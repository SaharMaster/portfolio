import '@/styles/globals.scss';
import Header from '@/components/Header/Header';


export const metadata = {
  title: 'Your Name // Developer',
  description: 'Portfolio built with Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}