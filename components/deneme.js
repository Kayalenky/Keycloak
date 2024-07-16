"use client"
import React, { useState, useEffect } from 'react';
import Keycloak from 'keycloak-js';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [keycloak, setKeycloak] = useState(null);

  useEffect(() => {
    const keycloakInstance = new Keycloak({
      url: 'http://localhost:8080/auth',
      realm: 'myrealm',
      clientId: 'myclient'
    });

    keycloakInstance.init({ onLoad: 'login-required' })
      .then(authenticated => {
        setKeycloak(keycloakInstance);
        setIsAuthenticated(authenticated);
      })
      .catch(error => {
        console.error('Failed to initialize adapter:', error);
      });
  }, []);

  if (!keycloak) {
    return (
      <div>
        <h1>Initializing Keycloak...</h1>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div>
        <h1>Welcome to the Keycloak secured app</h1>
        <p>You are authenticated!</p>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Unable to authenticate</h1>
      </div>
    );
  }
}

export default App;
