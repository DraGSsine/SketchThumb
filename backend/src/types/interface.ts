export interface IUser {
  email: string;
  name: string;
  googleId?: string;
  picture?: string;
  authProvider: string;
}

export interface GenerationRequest {
  prompt: string;
  sketch: any;
  targetPlatform: string;
}
