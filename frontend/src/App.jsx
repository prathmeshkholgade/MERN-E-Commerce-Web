import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import "remixicon/fonts/remixicon.css";
import Body from "./components/Body";
import Add from "./components/Add";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProductDetails from "./components/ProductDetails";
import CartContainer from "./components/CartContainer";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Body /> },
      { path: "/products/:id", element: <ProductDetails /> },
      { path: "/add", element: <Add /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/cart", element: <CartContainer /> },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
