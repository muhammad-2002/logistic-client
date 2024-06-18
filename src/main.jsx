import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";

import "aos/dist/aos.css";
import { RouterProvider } from "react-router-dom";
import Provider from "./components/Provider/Provider";
import StripeProviderWrapper from "./components/StripeProviderWrapper";
import "./index.css";
import router from "./routes/Router";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StripeProviderWrapper>
      <QueryClientProvider client={queryClient}>
        <Provider>
          <RouterProvider router={router} />
        </Provider>
      </QueryClientProvider>
    </StripeProviderWrapper>
  </React.StrictMode>
);
