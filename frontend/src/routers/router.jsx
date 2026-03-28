import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import CartPage from "../pages/books/CartPage";
import CheckoutPage from "../pages/books/CheckoutPage";
import SingleBook from "../pages/books/SingleBook";
import PrivateRoute from "./PrivateRoute";
import OrderPage from "../pages/books/OrderPage";
import AdminRoute from "./AdminRoute";
import AdminLogin from "../components/AdminLogin";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import ManageBooks from "../pages/dashboard/manageBooks/ManageBooks";
import AddBook from "../pages/dashboard/addBook/AddBook";
import UpdateBook from "../pages/dashboard/EditBook/UpdateBook";
import UserDashboard from "../pages/dashboard/users/UserDashboard";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsOfService from "../pages/TermsOfService";
import About from "../pages/About";
import Services from "../pages/Services";
import Contact from "../pages/Contact";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {
            path: "/",
            element: <Home/>,
        },
        {
            path: "/orders",
            element: <PrivateRoute><OrderPage/></PrivateRoute>
        },
        // {
        //     path: "/about",
        //     element: (
        //       <div className="max-w-screen-2xl mx-auto px-4 py-20 text-center">
        //         <h1 className="text-3xl font-bold mb-4">About Us</h1>
        //         <p className="text-gray-600">We are a book store dedicated to bringing you the best books at the best prices.</p>
        //       </div>
        //     )
        // },
        {
          path: "/about",
          element: <About/>
        },
        // {
        //     path: "/services",
        //     element: (
        //       <div className="max-w-screen-2xl mx-auto px-4 py-20 text-center">
        //         <h1 className="text-3xl font-bold mb-4">Our Services</h1>
        //         <p className="text-gray-600">We offer a wide range of books, fast delivery, and excellent customer support.</p>
        //       </div>
        //     )
        // },
        {
          path: "/services",
          element: <Services/>
        },
        {
          path: "/contact",
          element: <Contact/>
        },
        // {
        //     path: "/contact",
        //     element: (
        //       <div className="max-w-screen-2xl mx-auto px-4 py-20 text-center">
        //         <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        //         <p className="text-gray-600">
        //           Email us at:{" "}
        //           <a href="mailto:support@bookstore.com" className="text-blue-600">
        //             support@bookstore.com
        //           </a>
        //         </p>
        //       </div>
        //     )
        // },
        {
          path: "/login",
          element: <Login/>
        },
        {
          path: "/register",
          element: <Register/>
        },
        {
          path: "/cart",
          element: <CartPage/>
        },
        {
          path: "/checkout",
          element: <PrivateRoute><CheckoutPage/></PrivateRoute>
        },
        {
          path: "/books/:id",
          element: <SingleBook/>
        },
        {
          path: "/user-dashboard",
          element: <PrivateRoute><UserDashboard/></PrivateRoute>
        },
        {
          path: "/privacy-policy",
          element: <PrivacyPolicy/>
        },
        {
          path: "/terms-of-service",
          element: <TermsOfService/>
        }
      ]
    },
    {
      path: "/admin",
      element: <AdminLogin/>
    },
    {
      path: "/dashboard",
      element: <AdminRoute>
        <DashboardLayout/>
      </AdminRoute>,
      children:[
        {
          path: "",
          element: <AdminRoute><Dashboard/></AdminRoute>
        },
        {
          path: "add-new-book",
          element: <AdminRoute>
            <AddBook/>
          </AdminRoute>
        },
        {
          path: "edit-book/:id",
          element: <AdminRoute>
            <UpdateBook/>
          </AdminRoute>
        },
        {
          path: "manage-books",
          element: <AdminRoute>
            <ManageBooks/>
          </AdminRoute>
        }
      ]
    }
  ]);

export default router;