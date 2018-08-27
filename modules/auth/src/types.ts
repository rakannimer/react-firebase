export interface InitializeAppArgs {
  authDomain: string;
  apiKey: string;
  databaseURL: string;
  firebase: any;
  projectId: string;
  messagingSenderId?: string;
  storageBucket?: string;
}
export type FirebaseAuthProviderProps = InitializeAppArgs;
export type AuthEmission = {
  isSignedIn: boolean;
  providerId: ("none" | "google.com" | string) | null;
  user: any;
  firebase: any;
};
export type FirebaseAuthProviderState = AuthEmission;

export type ChildFunction = ((authState: AuthEmission) => any);

export type RenderableChildren = ChildFunction;
