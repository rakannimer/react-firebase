import firebase from "firebase/app";

export interface InitializeAppArgs {
  authDomain: string;
  apiKey: string;
  databaseURL: string;
  firebase: typeof firebase;
  projectId: string;
  messagingSenderId?: string;
  storageBucket?: string;
}
export type FirebaseAuthProviderProps = InitializeAppArgs;
export type AuthEmission = {
  isSignedIn: boolean;
  providerId: ("none" | "google.com" | string) | null;
  user: any;
  firebase: typeof firebase;
};
export type FirebaseAuthProviderState = AuthEmission;

export type ChildFunction = ((authState: AuthEmission) => any);

export type RenderableChildren = ChildFunction;
