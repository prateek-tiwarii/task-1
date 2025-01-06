import { BrowserRouter, Routes, Route } from "react-router"
import { Outlet } from 'react-router-dom';


import { Toaster } from "react-hot-toast"




import Home from "./pages/home";
import Login from "./login/page";
import Header from "./components/common/header";
import Sidebar from "./components/common/sidebar";
import { UserProvider } from "./context/userContext";






function Layout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
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



    <BrowserRouter>
      <UserProvider>
        <Routes>

          <Route path="/" element={<Login />} />


          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />

          </Route>
        </Routes>
      </UserProvider>

    </BrowserRouter>


  )
}

export default App