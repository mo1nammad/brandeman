"use client";

import { PropsWithChildren } from "react";
import QueryProvider from "./react-query-provider";
import { ThemeProvider } from "./theme-provider";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </QueryProvider>
  );
}
