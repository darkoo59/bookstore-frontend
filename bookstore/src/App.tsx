import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import './auth/axiosConfig';
import { ShoppingCartProvider } from './context/ShoppingCartContext';
import Books from './pages/Books';
import Home from './pages/Home';
import Login from './pages/Login';
import MyOrders from './pages/MyOrders';
import Registration from './pages/Registration';

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        index: true,
        path: "books",
        element: <Books />
      },
      {
        index: true,
        path: "registration",
        element: <Registration />
      },
      {
        index: true,
        path: "login",
        element: <Login />
      },
      {
        index: true,
        path: "orders",
        element: <MyOrders />
      }
    ]
  },
]);

function App() {
  return (
    <ShoppingCartProvider>
    <div className="App">
      <RouterProvider router={router} />
    </div>
    </ShoppingCartProvider>
  );
}

export default App;