export interface IAdmin {
  message: string;
  data: {
    id: string;
    name: string;
    username: string;
    role_id: string;
    created_at: string;
    created_by: string;
  };
}

export interface IRefOrgUser {
  message: string;
}
