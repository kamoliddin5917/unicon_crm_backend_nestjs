export interface ILogin {
  message: string;
  data: {
    token: string;
    user: {
      id: string;
      name: string;
      username: string;
      role: string;
      role_id: string;
      created_at: string;
      created_by: string;
    };
  };
}
