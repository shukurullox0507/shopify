import store from "store2";
export namespace SendEmail {
  export type Request = {
    email: string;
  };
}
export const getSession = (): any =>
  store.get('access') || {};

export const clearSession = () => store.remove('access')!;

export const setSession = (tokens: any) =>
  store.set('access', tokens);