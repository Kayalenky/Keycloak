
" use client"
export const __useClient = true;
import React, { useState, useEffect } from 'react';
import Keycloak from 'keycloak-js';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [keycloak, setKeycloak] = useState(null);

  useEffect(() => {
    const initKeycloak = async () => {
      const keycloakInstance = new Keycloak({
        url: 'http://localhost:8080',
        realm: 'myrealm',
        clientId: 'myclient'
      });

      try {
        await keycloakInstance.init({ onLoad: 'login-required' });
        setKeycloak(keycloakInstance);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to initialize Keycloak:', error);
        setIsAuthenticated(false);
      }
    };

    initKeycloak();
  }, []);

  const handleTokenRefresh = async () => {
    if (!keycloak) {
      console.error('Keycloak instance not initialized.');
      return;
    }

    try {
      await keycloak.updateToken(30);
      console.log('Token refreshed successfully.');

      const usersResponse = await fetchUsers();
      const users = await usersResponse.json();
      console.log('Users:', users);
    } catch (error) {
      console.error('Failed to refresh token or fetch users:', error);
    }
  };

  const fetchUsers = async () => {
    if (!keycloak || !keycloak.token) {
      console.error('Keycloak token not available.');
      return;
    }

    try {
      const response = await fetch('https://example.com/api/users', {
        headers: {
          Authorization: `Bearer ${keycloak.token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users.');
      }

      return response;
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  if (!keycloak) {
    return (
      <div>
        <h1>Initializing Keycloak...</h1>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div>
        <h1>Unable to authenticate</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome to the Keycloak secured app</h1>
      <p>You are authenticated!</p>
      <button onClick={handleTokenRefresh}>Refresh Token and Fetch Users</button>
    </div>
  );
}

export default App;
