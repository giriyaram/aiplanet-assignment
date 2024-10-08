import Chat from "@/components/Chat";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { PipelineUI } from "@/ui";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <ToastContainer
        autoClose="3000"
        pauseOnHover={false}
        hideProgressBar={false}
        className="toast-container-custom"
      />
      <Chat />
      <PipelineUI />
    </div>
  );
}
