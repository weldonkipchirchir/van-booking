import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import About from "./component/About";
import VanList from "./component/VanList";
import Layout from "./component/Layout";
import VanDetails from "./component/VanDeatails";
import Dashboard from "./component/host/Dashboard";
import Reviews from "./component/host/Reviews";
import Income from "./component/host/Income";
import HostLayout from "./component/host/HostLayout";
import Vans from "./component/host/Vans";
import VanDetail from "./component/host/vanspages/VanDetail";
import VanLayout from "./component/host/vanspages/VanLayout";
import Pricing from "./component/host/vanspages/Pricing";
import Photos from "./component/host/vanspages/Photos";
import "./server";
import SignIn from "./component/auth/SignIn";
import SignUp from "./component/auth/SignUp";
import NotFound from "./utils/NotFound";
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/vans" element={<About />} />
            <Route path="/vans/vans-list" element={<VanList />} />
            <Route path="/vans/vans-list/:id" element={<VanDetails />} />
            <Route path="/host" element={<HostLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="income" element={<Income />} />
              <Route path="vans" element={<Vans />} />
              <Route path="vans/:vanId" element={<VanLayout />}>
                <Route index element={<VanDetail />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="photos" element={<Photos />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
