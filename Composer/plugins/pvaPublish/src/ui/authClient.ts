import { UserAgentApplication } from 'msal';

const loginRequest = {
  scopes: ['96ff4394-9197-43aa-b393-6a41652e21f8/.default'],
};

let instance: AuthClient;
export class AuthClient {
  private msalInstance: UserAgentApplication;
  constructor() {
    this.msalInstance = new UserAgentApplication({
      auth: {
        authority: 'https://login.microsoftonline.com/organizations/',
        clientId: 'ce48853e-0605-4f77-8746-d70ac63cc6bc',
        redirectUri: 'composer://oauth',
      },
    });
  }
  public static getInstance(): AuthClient {
    if (!instance) {
      instance = new AuthClient();
    }
    return instance;
  }
  public async getToken() {
    if (this.msalInstance.getAccount()) {
      // we are logged in
      console.log('logged in');
      try {
        const tokenInfo = await this.msalInstance.acquireTokenSilent(loginRequest);
        await this.msalInstance.acquireTokenSilent(loginRequest);
        console.log('got token: ', tokenInfo);
        return tokenInfo.accessToken;
      } catch (e) {
        console.error('Failed to get token when already logged in: ', e);
        const loginInfo = await this.msalInstance.loginPopup(loginRequest);
        console.log('Successfully logged in: ', loginInfo);
        const tokenInfo = await this.msalInstance.acquireTokenSilent(loginRequest);
        console.log('got token: ', tokenInfo);
        return tokenInfo.accessToken;
      }
    } else {
      // we need to login
      console.log('need to login, showing login popup');
      try {
        const loginInfo = await this.msalInstance.loginPopup(loginRequest);
        console.log('Successfully logged in: ', loginInfo);
        const tokenInfo = await this.msalInstance.acquireTokenSilent(loginRequest);
        console.log('got token: ', tokenInfo);
        return tokenInfo.accessToken;
      } catch (e) {
        console.error('Got some error while logging in and getting token: ', e);
      }
    }
    return '';
  }
}
