"use client"
export const __useClient = true;
import { useRef, useEffect } from "react";
import Keycloak from "keycloak-js";

const keycloak = Keycloak({
  url: "http://localhost:8080/auth",
  realm: "myrealm",
  clientId: "myclient"
});

export default function MyComponent() {
  const kcInitializedRef = useRef(false);
  useEffect(() => {
    const initKeycloak = async () => {
      try {
        await keycloak.init({ onLoad: 'login-required' });
        console.log("User is authenticated:", keycloak.authenticated);
      } catch (error) {
        console.error("Failed to initialize Keycloak:", error);
      }
    };

    if (!kcInitializedRef.current) {
      initKeycloak();
      kcInitializedRef.current = true;
    }
  }, []);

  async function fetchUsers() {
    try {
      const response = await fetch('/api/users', {
        headers: {
          accept: 'application/json',
          authorization: `Bearer ${keycloak.token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return response.json();
    } catch (error) {
      console.error('Failed to fetch users:', error);
      throw error;
    }
  }

  return (
    <div>
      <h1>Welcome to My App</h1>
      <button onClick={fetchUsers}>Fetch Users</button>
    </div>
  );
}
