import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "./contexts/ToastContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ContactProvider } from "./contexts/ContactContext";
import ToastContainer from "./components/ui/Toast";
import { useToastContext } from "./contexts/ToastContext";
import AppRoutes from "./routes/AppRoutes";

const AppContent = () => {
  const { toasts, removeToast } = useToastContext();

  return (
    <>
      <AuthProvider>
        <ContactProvider>
          <AppRoutes />
        </ContactProvider>
      </AuthProvider>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </BrowserRouter>
  );
};

export default App;
