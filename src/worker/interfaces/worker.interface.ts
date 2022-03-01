export interface IWorker {
  message: string;
  data: { projects: any[]; tasks: any[] };
}
