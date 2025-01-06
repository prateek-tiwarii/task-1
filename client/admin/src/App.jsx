import { BrowserRouter, Routes, Route } from "react-router"
import { Outlet } from 'react-router-dom';

import Header from "./components/Header"
import { Toaster } from "react-hot-toast"
import Dashboard from "./pages/Dashboard";
import AddLabs from "./pages/AddLabs";
import SideNavigation from "./components/SideNav";

import UserManagement from "./pages/AddUser";
import Login from "./login/login";
import { UserProvider } from "./context/adminContext";





function Layout() {
  return (
    <div className="flex h-screen">
      <SideNavigation />
      <Toaster />
      <div className="flex-grow flex flex-col">
        <Header />
        <main className="flex-grow overflow-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}


function App() {

  return (
    <UserProvider>


      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Login />} />


          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-labs" element={<AddLabs />} />
            <Route path="/add-users" element={<UserManagement />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>

  )
}

export default App