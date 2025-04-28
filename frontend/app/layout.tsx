import { ThemeProvider } from "@/components/theme-provider"
import Header from '../components/Header';
import './globals.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <div>
          <Header />
          <main>{children}</main>
        </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
