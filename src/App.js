import { NextUIProvider } from '@nextui-org/react';
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Auth0ProviderWithNavigate } from "./utils/auth/auth0-provider-with-navigate";
import { Routing } from './utils/routing'
import { Layout } from './components/layout';

import { darkTheme } from './utils/theme';

export const App = () => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Auth0ProviderWithNavigate>
          <NextUIProvider theme={darkTheme}>
            <Layout>
              <Routing />
            </Layout>
          </NextUIProvider>
        </Auth0ProviderWithNavigate>
      </BrowserRouter>
    </QueryClientProvider >
  );
};
