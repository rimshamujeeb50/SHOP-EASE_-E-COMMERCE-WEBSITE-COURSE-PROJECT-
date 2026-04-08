import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ProductCatalog from "./pages/ProductCatalog";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import Account from "./pages/Account";
import Orders from "./pages/Orders";
import Wishlist from "./pages/Wishlist";
import Search from "./pages/Search";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "forgot-password", Component: ForgotPassword },
      { path: "products/:category", Component: ProductCatalog },
      { path: "product/:id", Component: ProductDetails },
      { path: "cart", Component: Cart },
      { path: "checkout", Component: Checkout },
      { path: "payment-success", Component: PaymentSuccess },
      { path: "account", Component: Account },
      { path: "orders", Component: Orders },
      { path: "wishlist", Component: Wishlist },
      { path: "search", Component: Search },
      { path: "support", Component: Support },
      { path: "*", Component: NotFound },
    ],
  },
]);
