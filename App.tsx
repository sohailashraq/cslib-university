import React from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./src/components/Navbar";
import Footer from "./src/components/Footer";
import Home from "./src/pages/Home";
import AllBooks from "./src/pages/AllBooks";
import Admin from "./src/pages/Admin";

const Layout = ({ children }: { children?: React.ReactNode }) => {
  const location = useLocation();
  const isAdmin = location.pathname === "/admin";

  return (
    <>
      {!isAdmin && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!isAdmin && <Footer />}
    </>
  );
};

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<AllBooks />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
