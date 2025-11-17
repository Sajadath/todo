import TaskForm from "@/components/homePage/taskForm/TaskForm";
import TaskList from "@/components/homePage/taskList/TaskList";
import TodoStats from "@/components/homePage/todoStats/TodoStats";

export default function Page() {
  return (
    <div className="w-full px-4 flex flex-col  items-center gap-6 ">
      <TodoStats />
      <TaskForm />
      <TaskList />
    </div>
  );
}
