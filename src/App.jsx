import { Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import { PATHS } from "./contants/paths";
import PrivateRoute from "./components/PrivateRoute";
import { Suspense, lazy } from "react";
import PaymentMethod from "./pages/PaymentMethod";
// import BlogLayout from "./layout/BlogLayout";
const MainLayout = lazy(() => import("./layout/MainLayout"));
const Home = lazy(() => import("./pages/Home"));
const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogSingle = lazy(() => import("./pages/BlogSingle"));
const BlogLayout = lazy(() => import("./layout/BlogLayout"));
const Page404 = lazy(() => import("./pages/Page404"));
const Product = lazy(() => import("./pages/Product"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Cart = lazy(() => import("./pages/Cart"));
const DashboardLayout = lazy(() => import("./layout/DashBoardLayout"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const CheckoutSuccess = lazy(() =>
  import("./pages/CheckoutSuccess/CheckoutSuccess")
);
const CheckoutDetail = lazy(() =>
  import("./pages/CheckoutSuccess/CheckoutDetail")
);
const FAQS = lazy(() => import("./pages/FAQs"));
const Returns = lazy(() => import("./pages/Returns"));
const Shipping = lazy(() => import("./pages/Shipping"));
const Order = lazy(() => import("./pages/Dashboard/Order"));
const Account = lazy(() => import("./pages/Dashboard/Account"));
const Address = lazy(() => import("./pages/Dashboard/Address"));
const WishList = lazy(() => import("./pages/Dashboard/WishList"));
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path={PATHS.PRODUCT.INDEX} element={<Product />} />
          <Route path={PATHS.PRODUCT.DETAIL} element={<ProductDetail />} />
          <Route path={PATHS.FAQ} element={<FAQS />} />
          <Route path={PATHS.RETURN} element={<Returns />} />
          <Route path={PATHS.SHIPPING} element={<Shipping />} />
          <Route path={PATHS.ABOUT} element={<About />} />
          <Route path={PATHS.CONTACT} element={<Contact />} />
          <Route path={PATHS.PRIVACYPOLICY} element={<PrivacyPolicy />} />
          <Route path={PATHS.PAYMENT_METHOD} element={<PaymentMethod />} />
          <Route path={PATHS.BLOG.INDEX} element={<BlogLayout />}>
            <Route index element={<Blog />} />
            <Route path={PATHS.BLOG.DETAIL} element={<BlogSingle />} />
          </Route>
          <Route element={<PrivateRoute redirectPath={PATHS.HOME} />}>
            <Route path={PATHS.CART} element={<Cart />} />
            <Route path={PATHS.CHECKOUT.INDEX} element={<CheckoutSuccess />} />
            <Route path={PATHS.CHECKOUT.DETAIL} element={<CheckoutDetail />} />
            <Route path={PATHS.DASHBOARD.INDEX} element={<DashboardLayout />}>
              <Route index element={<Account />} />
              <Route path={PATHS.DASHBOARD.ORDER} element={<Order />} />
              <Route path={PATHS.DASHBOARD.ADDRESS} element={<Address />} />
              <Route path={PATHS.DASHBOARD.WISHLIST} element={<WishList />} />
            </Route>
          </Route>
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
