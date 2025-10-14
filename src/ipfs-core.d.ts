declare module 'ipfs-core' {
  export interface IPFS {
    // Add basic IPFS interface methods that are used in the service
    id(): Promise<any>;
    add(data: any, options?: any): Promise<any>;
    cat(cid: any, options?: any): Promise<any>;
    stop(): Promise<void>;
  }

  export function create(options?: any): Promise<IPFS>;
}
