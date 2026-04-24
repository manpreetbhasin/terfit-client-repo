import Contact from "./Pages/Contact";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Navbar from "./components/Nav/Navbar";

import { Route, Routes } from "react-router-dom";
import Classes from "./Pages/Classes";
import Price from "./Pages/Price";
import Blog from "./Pages/Blog";
import Schedule from "./Pages/Schedule";
import BookSession from "./Pages/BookSession";
import Gallery from "./Pages/Gallery/Gallery";
import GalleryPage1 from "./Pages/Gallery/GalleryPage1";
import GalleryPage2 from "./Pages/Gallery/GalleryPage2";
import About from "./Pages/About";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="classes" element={<Classes />} />
        <Route path="pricing" element={<Price />} />
        <Route path="blog" element={<Blog />} />
        <Route path="about" element={<About />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="/book/:sessionId" element={<BookSession />} />

 

        <Route path="gallery" element={<Gallery />}>
          <Route path="page-1" element={<GalleryPage1 />} />
          <Route path="page-2" element={<GalleryPage2 />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
