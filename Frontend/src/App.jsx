import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/Niche/About";
import Contact from "./components/Niche/Contact";
import Form from "./components/Form";
import { UserContextProvider } from "./context/UserContext";
import User from "./components/Users/User";
import EditForm from "./components/EditForm";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <div className="flex relative">
          {/* Sidebar */}
          <Sidebar />

          {/* Main content section */}
          <div className="flex-1 transition-all duration-300">
            <Navbar />
            <div className="ml-0 transition-all duration-300">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/create" element={<Form />} />
                <Route path="/user/:id" element={<User />} />
                <Route path="/edit/:id" element={<EditForm />} />
              </Routes>
            </div>
          </div>
        </div>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
