export interface ILeader {
  message: string;
  data: {
    projects: any[];
    tasks: any[];
    workers: any[];
    organizations: any[];
  };
}
