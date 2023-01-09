import { useState, useEffect } from "react";
import "./admin.css";
import { auth, db } from "../../FirebaseConnection";
import { signOut } from "firebase/auth";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

export default function Admin() {
  const [taskInput, setTaskInput] = useState("");
  const [user, setUser] = useState({});
  const [tasks, setTasks] = useState([]);
  const [edit, setEdit] = useState({});

  useEffect(() => {
    async function loadTasks() {
      const userDetail = localStorage.getItem("@detailUser");
      setUser(JSON.parse(userDetail));

      if (userDetail) {
        const data = JSON.parse(userDetail);

        const taskRef = collection(db, "tasks");

        const q = query(
          taskRef,
          orderBy("created", "desc", where("userId", "==", data?.uid))
        );

        const unsub = onSnapshot(q, snapshot => {
          let list = [];

          snapshot.forEach(doc => {
            list.push({
              id: doc.id,
              task: doc.data().task,
              userId: doc.data().userId,
            });
          });

          setTasks(list);
        });
      }
    }

    loadTasks();
  }, []);

  async function handleRegister(e) {
    e.preventDefault();
    if (taskInput === "") {
      alert("Write your task");
      return;
    }

    if (edit?.id) {
      handleUpdateTask();
      return;
    }

    await addDoc(collection(db, "tasks"), {
      task: taskInput,
      created: new Date(),
      userId: user?.uid,
    })
      .then(() => {
        setTaskInput("");
      })
      .catch(() => {
        alert("error");
      });
  }

  async function handleLogout() {
    await signOut(auth)
      .then(() => {})
      .catch(() => {
        alert("error");
      });
  }

  async function deleteTask(id) {
    const docRef = doc(db, "tasks", id);

    await deleteDoc(docRef);
  }

  async function editTask(item) {
    setTaskInput(item.task);
    setEdit(item);
  }

  async function handleUpdateTask() {
    const docRef = doc(db, "tasks", edit?.id);

    await updateDoc(docRef, {
      task: taskInput,
    })
      .then(() => {
        setTaskInput("");
        setEdit({});
      })
      .catch(() => {
        alert("error");
      });
  }

  return (
    <div className="admin-container">
      <h1>My tasks</h1>
      <form className="form" onSubmit={handleRegister}>
        <textarea
          placeholder="Write your task"
          value={taskInput}
          onChange={e => setTaskInput(e.target.value)}
        />

        {Object.keys(edit).length > 0 ? (
          <button className="btn-register" type="submit">
            Update Task
          </button>
        ) : (
          <button className="btn-register" type="submit">
            Register Task
          </button>
        )}
      </form>

      {tasks.map(item => (
        <article key={item.id} className="list">
          <p>{item.task}</p>
          <div>
            <button className="btn-edit" onClick={() => editTask(item)}>
              Edit
            </button>
            <button className="btn-delete" onClick={() => deleteTask(item.id)}>
              End Task
            </button>
          </div>
        </article>
      ))}

      <button className="btn-logout" onClick={handleLogout}>
        Exit
      </button>
    </div>
  );
}
