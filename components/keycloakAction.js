"use client";
import { useRef, useEffect } from "react";
import UserService from "@/app/api/auth/keycloakAdapter";

export default function keycloakAction({ children }) {
  const kcInitializedRef = useRef(false);

  useEffect(() => {
    const init = async () => {
      if (!kcInitializedRef.current) {
        await UserService.initKeycloak(async () => {
          console.log("keycloak init completed");

          try {
            await UserService.updateToken();
            const users = await UserService.fetchUsers();
            console.log("Users:", users);
          } catch (error) {
            console.error("Failed to refresh token or fetch users:", error);
          }
        });
        kcInitializedRef.current = true;
      }
    };
    init();
  }, []);

  return <div>{children}</div>;
}
