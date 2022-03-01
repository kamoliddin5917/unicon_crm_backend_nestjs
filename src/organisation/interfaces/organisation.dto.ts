export interface IOrganisation {
  message: string;
  data: {
    id: string;
    name: string;
    image:string
    created_at: string;
    created_by: string;
    status: boolean;
  };
}
