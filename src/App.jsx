import { BrowserRouter } from "react-router-dom";
import RouterApp from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer autoClose={3000} />
        <RouterApp />
      </BrowserRouter>
    </div>
  );
}
