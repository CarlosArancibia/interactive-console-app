const Task = require("./task");
require("colors");

class Tasks {
  constructor() {
    this._list = {};
  }

  loadTasksFromArray(data = []) {
    data.forEach((task) => {
      this._list[task.id] = task;
    });
  }

  get getList() {
    const list = [];
    Object.keys(this._list).forEach((key) => list.push(this._list[key]));
    return list;
  }

  createTask(descrition) {
    const task = new Task(descrition);
    this._list[task.id] = task;
  }

  listTasks() {
    console.log();
    this.getList.forEach(({ description, completedIn }, i) => {
      const idx = `${i + 1}.`.green;
      const statusTask = completedIn ? "Completed".green : "Pending".red;

      console.log(`${idx} ${description} :: ${statusTask}`);
    });
  }

  listPendingOrCompleted(completed = true) {
    let idx = 0;
    this.getList.forEach(({ description, completedIn }) => {
      const statusTask = completedIn ? "Completed".green : "Pending".red;

      if (completed) {
        //show completed
        if (completedIn) {
          idx += 1;
          console.log(`${(idx + ".").green} ${description} :: ${statusTask} : ${completedIn}`);
        }
      } else {
        //show pending
        if (!completedIn) {
          idx += 1;
          console.log(`${(idx + ".").green} ${description} :: ${statusTask}`);
        }
      }
    });
  }

  deleteTask(idTask) {
    delete this._list[idTask];
  }

  toggleTasks(ids) {
    ids.forEach((id) => {
      const task = this._list[id];

      if (!task.completedIn) task.completedIn = new Date().toISOString();
    });

    this.getList.forEach((task) => {
      if (!ids.includes(task.id)) {
        task.completedIn = null;
      }
    });
  }
}

module.exports = Tasks;
