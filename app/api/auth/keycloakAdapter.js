import Keycloak from "keycloak-js";

const kc = new Keycloak({
  url: "http://localhost:8080/",
  realm: "myrealm",
  clientId: "myclient",
});
const initKeycloak = async (onAuthenticatedCallback) => {
  try {
    await kc.init({
      onLoad: "login-required",
      silentCheckSsoRedirectUri: `${location.origin}/silent-check-sso.html`
    });

    kc.onTokenExpired = () => {
      console.log("token expired");
    };

    console.log("User is authenticated");
    onAuthenticatedCallback();
  } catch (error) {
    console.error("Authentication Failed", error);
    throw error;
  }
};
 

const doLogin = kc.login;
const doLogout = kc.logout;
const getToken = async () => kc.token;
const getTokenParsed = () => kc.tokenParsed;
const isLoggedIn = () => !!kc.token;
const updateToken = (successCallback) => kc.updateToken(5).then(successCallback).catch(doLogin);
const getUsername = () => kc.tokenParsed?.preferred_username;
const hasRole = async (roles) => roles.some(async (role) => await kc.hasRealmRole(role));

const fetchUsers = async () => {
  const response = await fetch('/api/users', {
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${kc.token}`
    }
  });

  return response.json();
};

const UserService = {
  initKeycloak,
  doLogin,
  doLogout,
  isLoggedIn,
  getToken,
  getTokenParsed,
  updateToken,
  getUsername,
  hasRole,
  fetchUsers,
};

export default UserService;
