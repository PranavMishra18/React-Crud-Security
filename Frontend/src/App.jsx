import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import About from "./components/Niche/About";
import Contact from "./components/Niche/Contact";
import Form from "./components/Form";
import User from "./components/Users/User";
import EditForm from "./components/EditForm";
import LoginForm from "./components/common/LoginForm";
import PrivateRoute from "./components/common/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <div className="flex relative">
          <Sidebar />
          <div className="flex-1 transition-all duration-300">
            <Navbar />
            <div className="ml-0 transition-all duration-300">
              <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route
                  path="/"
                  element={
                    <PrivateRoute allowedRoles={["ROLE_USER", "ROLE_ADMIN"]}>
                      <Home />
                    </PrivateRoute>
                  }
                />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route
                  path="/create"
                  element={
                    <PrivateRoute allowedRoles={["ROLE_ADMIN"]}>
                      <Form />
                    </PrivateRoute>
                  }
                />
                <Route path="/user/:id" element={<User />} />
                <Route
                  path="/edit/:id"
                  element={
                    <PrivateRoute allowedRoles={["ROLE_ADMIN"]}>
                      <EditForm />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </div>
          </div>
        </div>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
