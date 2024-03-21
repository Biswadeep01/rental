import { Navigate, useRoutes } from "react-router-dom";
import PlatformLayout from "../components/Layout/PlatformLayout";
import Layout from "../components/Layout/404";

import AuthWrapper from "../pages/Auth";
import Home from "../pages/Home";
import About from "../pages/About";
import Fleet from "../pages/Fleet";
import FleetItem from "../pages/Fleet/FleetItem";
import BookingForm from "../pages/BookingSection";
import Services from "../pages/Services";
import Blog from "../pages/Blog";
import Testimonials from "../pages/Testimonials";
import Contact from "../pages/Contact";

import Page404 from "../pages/NotFound";

export default function Router() {
  const routes = useRoutes([
    {
      path: "/auth",
      element: <AuthWrapper />,
    },
    {
      path: "/",
      element: <PlatformLayout />,
      children: [
        { element: <Navigate to="/home" />, index: true },
        { path: "home", element: <Home /> },
        { path: "about", element: <About /> },
        { path: "fleet", element: <Fleet /> },
        { path: "fleet/:id", element: <FleetItem /> },
        { path: "booking-form", element: <BookingForm /> },
        { path: "blog", element: <Blog /> },
        { path: "services", element: <Services /> },
        { path: "testimonials", element: <Testimonials /> },
        { path: "contact", element: <Contact /> },
      ],
    },
    {
      element: <Layout />,
      children: [
        { element: <Navigate to="/home" />, index: true },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);
  return routes;
}
