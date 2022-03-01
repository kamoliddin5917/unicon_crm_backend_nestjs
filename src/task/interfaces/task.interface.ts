export interface ITask {
  message: string;
  data: {
    id: string;
    name: string;
    due_date: number;
    worker_user_id: string;
    status: string;
    prosses_at: string;
    done_at: string;
    created_at: string;
    created_by: string;
    project_id: string;
  };
}
