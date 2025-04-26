export interface IUser {
  email: string;
  name: string;
  googleId?: string;
  picture?: string;
  authProvider: string;
}

export interface ThumbnailSettings {
  style: {
    enabled: boolean;
    type: string;
  };
  colors: {
    enabled: boolean;
    scheme: string;
  };
  quality: {
    enabled: boolean;
    level: number;
  };
  text: {
    enabled: boolean;
    value: string;
    position: string;
  };
  dimensions: {
    enabled: boolean;
    width: number;
    height: number;
    aspectRatio: string;
  };
}

export interface GenerationRequest {
  prompt: string;
  settings: ThumbnailSettings;
  sketch: any;
  timestamp?: string;
}
