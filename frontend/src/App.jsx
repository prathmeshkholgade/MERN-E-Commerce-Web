import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import "remixicon/fonts/remixicon.css";
import Body from "./components/Body";
import Add from "./components/Add";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProductDetails from "./components/ProductDetails";
import CartContainer from "./components/CartContainer";
import SearchResultsPage from "./components/SearchResultsPage";
import CheckOut from "./components/CheckOut";
import Protected from "./components/Protected";
import UserProvider from "./components/UserProvider";
import PaymentSuccess from "./components/PaymentSuccess";
import OrdersDetails from "./components/OrdersDetails";
import AdminPage from "./components/AdminPage";
import TotalOrders from "./components/TotalOrders";

import EditPage from "./components/EditPage";
import OrderInfo from "./components/OrderInfo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Body /> },
      { path: "/products/:id", element: <ProductDetails /> },
      { path: "/order/:id", element: <OrderInfo /> },
      {
        path: "/products/edit/:id",
        element: (
          <Protected adminOnly={true}>
            <EditPage />{" "}
          </Protected>
        ),
      },
      { path: "/search", element: <SearchResultsPage /> },
      {
        path: "/add",
        element: (
          <Protected adminOnly={true}>
            {" "}
            <Add />
          </Protected>
        ),
      },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/cart", element: <CartContainer /> },
      { path: "/paymentsuccess", element: <PaymentSuccess /> },
      { path: "/myorder", element: <OrdersDetails /> },
      {
        path: "/orders",
        element: (
          <Protected adminOnly={true}>
            <TotalOrders />{" "}
          </Protected>
        ),
      },
      {
        path: "/admin",
        element: (
          <Protected adminOnly={true}>
            {" "}
            <AdminPage />
          </Protected>
        ),
      },
      {
        path: "/checkout",
        element: (
          <Protected>
            {" "}
            <CheckOut />{" "}
          </Protected>
        ),
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
