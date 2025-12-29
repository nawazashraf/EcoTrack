import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import LogIn from "./pages/LogIn";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";

function App() {
  const router = createBrowserRouter([
    // {
    //   path: "/",
    //   element: <AuthLayout />,
    //   children: [
    //     {
    //       path: "login",
    //       element: <LogIn />,
    //     },
    //   ],
    // },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
      ],
    },
  ]);
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
