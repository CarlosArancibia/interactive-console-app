const {
  inquirerMain,
  pause,
  readInput,
  listTasksToDelete,
  confirmDelete,
  listTasksChecklist,
} = require("./helpers/inquirer");
const { saveFile, readFile } = require("./helpers/saveFile");
const Tasks = require("./models/tasks");

const main = async () => {
  let option = "";
  const tasks = new Tasks();

  const dataDB = readFile();
  if (dataDB) {
    // console.log(dataDB);
    tasks.loadTasksFromArray(dataDB);
  }
  // await pause();

  do {
    option = await inquirerMain();

    switch (option) {
      case "1":
        let desc = await readInput("Description:");
        tasks.createTask(desc);
        console.log(desc);
        break;
      case "2":
        tasks.listTasks();
        // console.log(tasks.getList);
        break;
      case "3":
        tasks.listPendingOrCompleted();
        break;
      case "4":
        tasks.listPendingOrCompleted(false);
        break;
      case "5":
        const ids = await listTasksChecklist(tasks.getList);
        tasks.toggleTasks(ids);
        break;
      case "6":
        const id = await listTasksToDelete(tasks.getList);
        if (id === "0") break;

        const ok = await confirmDelete("Are you sure?");
        if (ok) {
          tasks.deleteTask(id);
          console.log("The task was deleted");
        }
        break;
    }

    saveFile(tasks.getList);

    await pause();
  } while (option !== "0");
};

main();
