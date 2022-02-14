// import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
// layouts
import MainLayout from "./layouts/main";
// import DashboardLayout from "./layouts/dashboard";
// import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
// components
// import LoadingScreen from "./components/LoadingScreen";
import Homepage from "pages/Homepage";
import Research from "pages/Research";
import Resell from "pages/Resell";
import Dashboard from "pages/Dashboard";
import Minting from "pages/Minting";
// ----------------------------------------------------------------------

// const Loadable = (Component) => (props) => {
//   return (
//     <Suspense fallback={<LoadingScreen />}>
//       <Component {...props} />
//     </Suspense>
//   );
// };

export default function Router() {
  return useRoutes([
    // Main Routes
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "/", element: <Homepage /> },
        { path: "/research", element: <Research /> },
        { path: "/resell", element: <Resell /> },
        { path: "/dashboard", element: <Dashboard /> },
        { path: "/dashboard/minting", element: <Minting /> }
      ],
    },
  ]);
}

// IMPORT COMPONENTS

// Dashboard
// const PageOne = Loadable(lazy(() => import('./pages/PageOne')));
// Main
