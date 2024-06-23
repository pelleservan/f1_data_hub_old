import Footer from "./common/footer";
import Header from "./common/header";
import './globals.css';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <div id='header'>
          <Header />
        </div>

        <div id="container" style={{ height: "100%" }}>
          {children}
        </div>

        <div id='footer'>
          <Footer />
        </div>
      </body>
    </html>
  );
};

export default RootLayout;

