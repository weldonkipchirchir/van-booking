import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Home from "./component/Home";
import About from "./component/About";
import VanList, { loader as VanListLoader } from "./component/van_list/VanList";
import Layout from "./component/Layout";
import VanDetails, {
  loader as VanDetailLoader,
} from "./component/van_list/VanDeatails";
import Dashboard from "./component/host/Dashboard";
import Reviews from "./component/host/Reviews";
import Income from "./component/host/Income";
import HostLayout from "./component/host/HostLayout";
import Vans, { loader as hostLoader } from "./component/host/Vans";
import VanDetail from "./component/host/vanspages/VanDetail";
import VanLayout from "./component/host/vanspages/VanLayout";
import Pricing from "./component/host/vanspages/Pricing";
import Photos from "./component/host/vanspages/Photos";
import LandingPage from "./component/auth/LandingPage";
import Booking, {
  loader as bookingLoader,
} from "./component/van_list/Bookings";
import EditBooking from "./component/van_list/EditBooking";
// import "./server";
import SignIn from "./component/auth/SignIn";
import SignUp from "./component/auth/SignUp";
import NotFound from "./utils/NotFound";
import Error from "./utils/Error";
import TwoFA from "./utils/TwoFA";
// import { requireAuth } from "./utils/auth";
// import AuthRequired from "./component/auth/AuthRequired";
import VanPhoto, {
  loader as vanPhotoLoader,
} from "./component/host/vanspages/VanPhoto";
import { ProtectedRoute } from "./utils/protectedRoute";
import BookDetails from "./component/van_list/BookDetails";
import CreateVan from "./component/host/CreateVan";
import VanReviews from "./component/van_list/VanReviews";
import UpdateVan from "./component/host/UpdateVan";
import HostBookings, {loader as HostBookingLoader} from "./component/host/HostBookings";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<Error />}>
      <Route index element={<Home />} />
      <Route path="/verify-2fa" element={<TwoFA />} />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/landing-page" element={<LandingPage />} />
      {/* <Route element={<AuthRequired />}> */}

      <Route element={<ProtectedRoute />}>
        <Route
          path="/vans"
          element={<About />}
          // loader={async () => await requireAuth()}
        />
        <Route
          path="/vans/vans-list"
          element={<VanList />}
          loader={VanListLoader}
        />
        <Route
          path="/vans/vans-list/book-details"
          element={<BookDetails />}
          loader={VanListLoader}
        />
        <Route
          path="/vans/vans-list/:id"
          element={<VanDetails />}
          loader={VanDetailLoader}
          // loader={async () => await requireAuth()}
        />
        <Route path="booking" element={<Booking />} loader={bookingLoader} />
        <Route
          path="edit-booking/:id"
          element={<EditBooking />}
          loader={bookingLoader}
        />
        <Route
          path="reviews"
          element={<VanReviews />}
          // loader={bookingLoader}
        />
        <Route
          path="/host"
          element={<HostLayout />}
          // loader={async () => await requireAuth()}
        >
          <Route index element={<Dashboard />} loader={hostLoader} />
          <Route
            path="reviews"
            element={<Reviews />}
            // loader={async () => await requireAuth()}
          />
          <Route
            path="update"
            element={<UpdateVan />}
            // loader={async () => await requireAuth()}
          />
          <Route
            path="income"
            element={<Income />}
            // loader={async () => await requireAuth()}
          />
          <Route
            path="create"
            element={<CreateVan />}
            // loader={async () => await requireAuth()}
          />
          <Route
            path="bookings"
            element={<HostBookings />}
            loader={HostBookingLoader}
          />
          <Route path="vans" element={<Vans />} loader={hostLoader} />
          <Route element={<VanPhoto />} loader={vanPhotoLoader}>
            <Route
              path="vans/:vanId"
              element={<VanLayout />}
              // loader={async () => await requireAuth()}
            >
              <Route
                index
                element={<VanDetail />}
                // loader={async () => await requireAuth()}
              />
              <Route
                path="pricing"
                element={<Pricing />}
                // loader={async () => await requireAuth()}
              />
              <Route
                path="photos"
                element={<Photos />}
                // loader={async () => await requireAuth()}
              />
            </Route>
          </Route>
          {/* </Route> */}
        </Route>
        {/* </Route> */}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
