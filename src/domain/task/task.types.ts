
export type TaskFile = {
  name: string;
  type: string;
  size: number;
  data: ArrayBuffer;
}

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  addedAt: Date;
  file?: TaskFile;
}