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
