import firebase from "react-native-firebase";

export interface InitializeAppArgs {
  firebase: typeof firebase;
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
