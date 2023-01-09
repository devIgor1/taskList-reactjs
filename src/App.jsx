import { BrowserRouter } from "react-router-dom";
import RouterApp from "./routes";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <RouterApp />
      </BrowserRouter>
    </div>
  );
}
