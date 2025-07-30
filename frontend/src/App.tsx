import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, Slide } from 'react-toastify';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import Home from "./pages/Home";
import JoinPage from "./pages/JoinPage";
import LoginPage from "./pages/LoginPage";
import ContactPage from "./pages/ContactPage";
import CartPage from "./pages/CartPage";
import CreateGigPage from "./pages/CreateGigPage";
import CreateVenuePage from "./pages/CreateVenuePage";
import AdminPage from "./pages/admin/AdminPage";
import ArtistManagerPage from "./pages/ArtistManagerPage";
import SupportRequestsPage from "./pages/SupportRequestsPage";
import ArtistsPage from "./pages/ArtistsPage";
import ArtistProfilePage from "./pages/ArtistProfilePage";
import GigsPage from "./pages/GigsPage";
import FestivalProfilePage from "./pages/FestivalProfilePage";
import GigProfilePage from "./pages/GigProfilePage";
import RegistrationPage from "./pages/RegistrationPage";
import AdminGigManagerPage from "./pages/admin/AdminGigManagerPage";
import AdminArtistManagerPage from "./pages/admin/AdminArtistManagerPage";
import FestivalsPage from "./pages/FestivalsPage";
import EditArtistProfilePage from "./pages/EditArtistProfilePage";
import EditGigPage from "./pages/EditGigPage";
import AdminGigApprovalPage from "./pages/admin/AdminGigApprovalPage";
import AdminArtistApprovalPage from "./pages/admin/AdminArtistApprovalPage";
import AdminGigDeletionPage from "./pages/admin/AdminGigDeletionPage";
import AdminArtistDeletionPage from "./pages/admin/AdminArtistDeletionPage";
import AdminFestivalManagerPage from "./pages/admin/AdminFestivalManagerPage";

function App() {
  return (
    <GoogleOAuthProvider clientId="916999287173-lepk9gpgkjtvdv77d8e74aa99gbp90sl.apps.googleusercontent.com">
      <Router>
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          limit={3}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Slide}
        />
        <ShoppingCartProvider>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/join" element={<JoinPage/>}/>
            <Route path="/register" element={<RegistrationPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/contact" element={<ContactPage/>}/>
            <Route path="/cart" element={<CartPage/>}/>
            <Route path="/create-gig" element={<CreateGigPage/>}/>
            <Route path="/create-venue" element={<CreateVenuePage/>}/>
            <Route path="/admin" element={<AdminPage/>}/>
            <Route path="/admin/gig/:gig_id" element={<AdminGigManagerPage/>}/>
            <Route path="/admin/artist/:artist_id" element={<AdminArtistManagerPage/>}/>
            <Route path="/admin/festival/:gig_id" element={<AdminFestivalManagerPage/>}/>
            <Route path="/admin/approve-gig/:gig_id" element={<AdminGigApprovalPage/>}/>
            <Route path="/admin/approve-artist/:artist_id" element={<AdminArtistApprovalPage/>}/>
            <Route path="/admin/delete-gig/:gig_id" element={<AdminGigDeletionPage/>}/>
            <Route path="/admin/delete-artist/:artist_id" element={<AdminArtistDeletionPage/>}/>
            <Route path="/profile" element={<ArtistManagerPage/>}/>
            <Route path="/profile/support-requests" element={<SupportRequestsPage/>}/>
            <Route path="/artists" element={<ArtistsPage/>}/>
            <Route path="/artist/:artist_id" element={<ArtistProfilePage/>}/>
            <Route path="/gigs" element={<GigsPage/>}/>
            <Route path="/gigs/:gig_name/:gig_id" element={<GigProfilePage/>}/>
            <Route path="/festivals" element={<FestivalsPage/>}/>
            <Route path="/festivals/:gig_name/:gig_id" element={<FestivalProfilePage/>}/>
            <Route path="/edit-profile" element={<EditArtistProfilePage/>}/>
            <Route path="/edit-gig/:gig_id" element={<EditGigPage/>}/>
          </Routes>
        </ShoppingCartProvider>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
