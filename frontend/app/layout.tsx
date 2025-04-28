import Header from '../components/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <div>
          <Header />

          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
