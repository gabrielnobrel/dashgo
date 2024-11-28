import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from '../styles/theme'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SidebarDrawerProvider } from "@/contexts/SideBarDrawerContext";
import { makeServer } from "@/service/mirage";

// Verificar se a aplicação está rodando dentro do ambiente de desenvolvimento
if (process.env.NODE_ENV === 'development') {
   makeServer()
}

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
   return (
      <QueryClientProvider client={queryClient}>
         <ChakraProvider theme={theme}>
            <SidebarDrawerProvider>
               <Component {...pageProps} />
            </SidebarDrawerProvider>
         </ChakraProvider>
         <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
   )
}

export default MyApp