import { useEffect, useState } from "react";
import "./App.css";
import { Display } from "./components/Display";
import { Form } from "./components/Form";
import { Header } from "./components/Header";
import PropsVariable from "./components/PropsVariable";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { fetchAllTasks, postTask, updateTask } from "./helpers/axiosHelper";
import { useDispatch, useSelector } from "react-redux";
import { setTaskList } from "./features/tasks/taskSlice";
import { setBadHour } from "./features/tasks/taskSlice";
import { setTotalHour } from "./features/tasks/taskSlice";

const apiUrl = import.meta.env.VITE_API_URL;

function App() {
  const dispatch = useDispatch();
  // const [taskList, setTaskList] = useState([]);
  const { taskList , totalHour} = useSelector((store) => store.taskStore);

  // const [totalHour, setTotalHour] = useState(0);

  // const [badHour, setBadHour] = useState(0);

  const loadTaskFromAPI = async () => {
    const data = await fetchAllTasks();

    console.log(data);
    const taskDataFromDatabase = data.tasks.map((task) => {
      return { ...task, id: task._id };
    });

    dispatch(setTaskList(taskDataFromDatabase));
  };

  useEffect(() => {
    loadTaskFromAPI();
  }, []);

  const handleOnSwap = async (id) => {
    let updatedTasKType = "";

    const swappedTask = taskList.map((task) => {

      let tempTask = {...task};
      if (tempTask.id == id) {
        tempTask.type = tempTask.type == "good" ? "bad" : "good";
        updatedTasKType = tempTask.type;
      }
      return tempTask;
    });

    // make an update call
    const data = await updateTask(id, {
      type: updatedTasKType,
    });

    dispatch(setTaskList(swappedTask));

    calculateTotalHour(swappedTask);
  };

  const handleOnDelete = (id) => {
    alert("DELETED : " + id);

    // filter task
    const filtertedTask = taskList.filter((task) => task.id != id);
    // console.log(100000, filtertedTask);
    dispatch(setTaskList(filtertedTask));

    calculateTotalHour(filtertedTask);
  };

  const calculateTotalHour = (taskListTemporary) => {
    let hour = taskListTemporary.reduce((accumualtor, item) => {
      return accumualtor + parseFloat(item.hour);
    }, 0);

    dispatch(setTotalHour(hour));

    let bhour = taskListTemporary.reduce((accumualtor, item) => {
      return accumualtor + (item.type == "bad" ? parseFloat(item.hour) : 0);
    }, 0);

    dispatch(setBadHour(bhour));
  };

  const businessRules = (tempTaskList) => {
    //1. Max hour should not exceed weekly hour
    const MAX_WEEKLY_HOUR = 7 * 24;

    const totalHour = tempTaskList.reduce(
      (acc, item) => acc + parseFloat(item.hour),
      0
    );

    if (totalHour > MAX_WEEKLY_HOUR) {
      return false;
    }

    return true;
  };

  const addTask = async (task) => {
    let tempTask = [...taskList, task];

    if (businessRules(tempTask)) {
      // make an create api call
      const data = await postTask(task);

      task.id = data.task._id;
      task._id = data.task._id;

      dispatch(setTaskList(tempTask));
      calculateTotalHour(tempTask);

      toast.success("Task added!");
    } else {
      toast.error("MAX WEEKLY QUOTA EXCEEDED");
    }
  };

  // return <PropsVariable />;
  return (
    <div>
      <ToastContainer />
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div
          id="liveToast"
          className="toast"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header">
            <img src="..." className="rounded me-2" alt="..." />
            <strong className="me-auto">Task Update</strong>
            <small>NOW</small>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body">Task ADDED</div>
        </div>
      </div>

      <div className="wrapper">
        <div className="container">
          {/* <!-- heading row --> */}
          <Header />

          {/* <!-- add form  --> */}
          <Form addFunc={addTask} />

          {/* {Form({ addFunc: addTask })} */}

          {/* <!-- list  --> */}
          <Display
            // taskList={taskList}
            // badHour={badHour}
            handleOnDelete={handleOnDelete}
            handleOnSwap={handleOnSwap}
          />

          {/* <!-- total hours --> */}
          <div className="row">
            <div className="alert alert-success" role="alert">
              The total hours allocated ={totalHour} hrs
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
