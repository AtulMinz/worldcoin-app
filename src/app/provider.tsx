"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import React from "react";

export default function Provider({ children }: { children: React.ReactNode }) {
  const appId = process.env.PRIVY_APP_ID as string;
  return (
    <PrivyProvider
      appId="clzl8mrg4034x1w6409kql67b"
      config={{
        // Customize Privy's appearance in your app
        appearance: {
          theme: "light",
          accentColor: "#676FFF",
        },
        loginMethods: ["wallet", "google", "apple"],
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
