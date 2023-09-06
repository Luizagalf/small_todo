export default interface ITask {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  priority: "0" | "1" | "2";
  completed: boolean;
}
