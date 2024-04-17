import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AppLayout from "./Layouts/AppLayout/AppLayout";
import Homepage from "./pages/Homepage/Homepage";
import NotFound from "./pages/NotFound/NotFound";
import { BookingCtxProvider } from "./context/booking-context";

import "./App.css";

function App() {
  return (
    <Router>
      <AppLayout>
        <BookingCtxProvider>
          <Routes>
            <Route path="/" element={<Homepage />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BookingCtxProvider>
      </AppLayout>
    </Router>
  );
}

export default App;
