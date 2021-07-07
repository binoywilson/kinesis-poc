export interface IFormValues {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken: string;
  endpoint?: string;
  channelName?: string;
  clientId?: string;
  video?: boolean;
  audio?: boolean;
  openDataChannel?: boolean;
  resolution?: string;
  natTraversal?: string;
  useTrickleICE?: boolean;
}

export interface IAppSettings {
  aws: AwsSettings;
  telegram: TelegramSettings;
}

export interface AwsSettings {
  channelARN: string;
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  clientId: string;
  sessionToken?: string;
  endpoint?: string;
  channelName?: string;
}
export interface TelegramSettings {
  app_id: number
  api_hash: string
  test_config_url: string
  prod_config_url: string
}
