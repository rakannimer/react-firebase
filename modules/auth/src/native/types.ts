export interface InitializeAppArgs {
  firebase: any;
  authDomain?: string;
  apiKey?: string;
  databaseURL?: string;
  projectId?: string;
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
