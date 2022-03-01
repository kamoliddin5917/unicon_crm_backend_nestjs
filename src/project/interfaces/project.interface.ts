export interface IProject {
  message: string;
  data: {
    id: string;
    name: string;
    medias: string[];
    org_id: string;
    created_at: string;
    created_by: string;
  };
}
