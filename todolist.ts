type Subject = "home" | "work";
enum Priority {
  HIGH,
  MEDIUM,
  LOW,
}
const taskTypes = ["deadline", "checklist", "progress"] as const;
type TaskTypes = (typeof taskTypes)[number];
interface IBaseTask<T extends TaskTypes> {
  id: number;
  title: string;
  content?: string;
  priority: Priority;
  subject: Subject;
  type: T;
}
interface IDeadlineTask extends IBaseTask<"deadline"> {
  deadlineDate: Date;
}
interface ICheckListTask extends IBaseTask<"checklist"> {
  checkList: Prettify<Record<string, boolean>>;
}
interface IProgressTask extends IBaseTask<"progress"> {
  progress: number;
}

abstract class BaseTask<T extends TaskTypes> implements IBaseTask<T> {
  constructor({ id, title, content, priority, subject, type }: IBaseTask<T>) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.priority = priority;
    this.subject = subject;
    this.type = type;
    BaseTask.counter++;
  }
  readonly id: number;
  title: string;
  content?: string;
  priority: Priority;
  subject: Subject;
  type: T;
  protected notes?: string;
  static counter = 0;
  getNotes(): string | void {
    if (this.notes?.length) {
      return this.notes!.toUpperCase();
    }
  }
  isATask(val: unknown): boolean {
    return typeof val === "object" && val instanceof BaseTask;
  }
  insertVal<P extends Exclude<keyof this, "id">, V extends this[P]>(
    key: P,
    val: V
  ): BaseTask<T> {
    this[key] = val;
    return this;
  }
}
class DeadlineTask extends BaseTask<"deadline"> implements IDeadlineTask {
  constructor(deadlineDate: Date, props: IBaseTask<"deadline">) {
    super(props);
    this.deadlineDate = deadlineDate;
  }
  deadlineDate: Date;
}
class CheckListTask extends BaseTask<"checklist"> implements ICheckListTask {
  constructor(
    checkList: Record<string, boolean>,
    props: IBaseTask<"checklist">
  ) {
    super(props);
    this.checkList = checkList;
  }
  checkList: Record<string, boolean>;
}
class ProgressTask extends BaseTask<"progress"> implements IProgressTask {
  constructor(progress: number, props: IBaseTask<"progress">) {
    super(props);
    this.progress = progress;
  }
  progress: number;
}
type Task = DeadlineTask | CheckListTask | ProgressTask;

abstract class Tasks {
  abstract addTask(task: Task): Task[];
  abstract removeTask(id: number): Task[];
  abstract getTask(id: number): Task[];
  abstract getTasksByType(type: TaskTypes): Task[];
  getTasksOrderedByType(): Task[][] {
    const orderedTasks: Task[][] = [];
    for (const type of taskTypes) {
      orderedTasks.push(this.getTasksByType(type));
    }
    return orderedTasks;
  }
}
function isChecklist(task: Task): task is CheckListTask {
  return task instanceof CheckListTask;
}
class TodoList extends Tasks {
  constructor(tasks: Task[]) {
    super();
    this.toDos = tasks;
  }
  toDos: Task[];
  addTask(task: Task): Task[] {
    this.toDos.push(task);
    return this.toDos;
  }
  removeTask(id: number): Task[] {
    this.toDos = this.toDos.filter((task) => task.id !== id);
    return this.toDos;
  }
  getTask(id: number): ProgressTask[];
  getTask(id: number): CheckListTask[];
  getTask(id: number): DeadlineTask[];
  getTask(id: number): Task[] {
    return this.toDos.filter((task) => task.id === id);
  }
  getTasksByType(type: "deadline"): DeadlineTask[];
  getTasksByType(type: "checklist"): CheckListTask[];
  getTasksByType(type: "progress"): ProgressTask[];
  getTasksByType(type: TaskTypes): Task[] {
    switch (type) {
      case "deadline":
        return this.toDos.filter((toDo) => toDo instanceof DeadlineTask);
      case "checklist":
        return this.toDos.filter((toDo) => "progress" in toDo);
      case "progress":
        return this.toDos.filter((toDo) => isChecklist(toDo));
    }
  }
}
type AllOptionalConstantTask<T extends TaskTypes> = Readonly<
  Partial<Omit<BaseTask<T>, "id" | "title">>
>;
type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
