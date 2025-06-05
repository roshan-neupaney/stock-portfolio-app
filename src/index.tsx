import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import './index.css';
// import '@/css/satoshi.css';
import { BrowserRouter } from "react-router-dom";
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slide, ToastContainer } from "react-toastify";

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: 1,
//       retryDelay: 2000,
//       refetchOnWindowFocus: false
//     }
//   }
// });

createRoot(document.getElementById("root")!).render(
  // need to disable StrictMode in producition
  //<StrictMode>
  //   <Provider store={store}>
  <>
    <BrowserRouter>
      {/* <QueryClientProvider client={queryClient}> */}
      <App />
      {/* </QueryClientProvider> */}
    </BrowserRouter>

    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Slide}
    />

    {/* </Provider> */}
  </>
  //</StrictMode>,
);
