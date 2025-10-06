import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";


const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar always on top */}
      
      <Nav/>
      

      {/* Main content */}
      <main className="flex-1 pt-[80px]"> {/* pt-[80px] pushes content below fixed navbar */}
        {children}
      </main>

      {/* Footer always at bottom */}
      <Footer/>
    </div>
  );
};

export default Layout;
