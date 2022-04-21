import { Appwrite } from 'appwrite';
import invariant from 'tiny-invariant';

let api = {
  sdk: null as Appwrite | null,

  provider: () => {
    if (api.sdk) {
      return api.sdk;
    }

    const isServer = typeof window === 'undefined';
    let appwrite = new Appwrite();
    if (isServer) {
      invariant(process.env.APPWRITE_ENDPOINT, 'APPWRITE_ENDPOINT is required.');
      invariant(process.env.APPWRITE_PROJECTID, 'APPWRITE_PROJECTID is required.');
      appwrite.setEndpoint(process.env.APPWRITE_ENDPOINT).setProject(process.env.APPWRITE_PROJECTID);
    } else {
      invariant(window.env.APPWRITE_ENDPOINT, 'APPWRITE_ENDPOINT is required.');
      invariant(window.env.APPWRITE_PROJECTID, 'APPWRITE_PROJECTID is required.');
      appwrite.setEndpoint(window.env.APPWRITE_ENDPOINT).setProject(window.env.APPWRITE_PROJECTID);
    }
    api.sdk = appwrite;
    return appwrite;
  },

  createAccount: (email: string, password: string, name: string) => {
    return api.provider().account.create('unique()', email, password, name);
  },

  getAccount: () => {
    return api.provider().account.get();
  },

  createSession: (email: string, password: string) => {
    return api.provider().account.createSession(email, password);
  },

  deleteCurrentSession: () => {
    return api.provider().account.deleteSession('current');
  },
};
export default api;
