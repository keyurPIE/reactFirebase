import "./App.css";
import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase-config";
import Swal from "sweetalert2";

const Todo = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editableID, setEditableID] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  //Intial data on every render
  useEffect(() => {
    fetchPost();
  }, []);

  //Add Todo Data
  const addTodo = async (e) => {
    e.preventDefault();
    if (todo === "") {
      return alert("Please add something to-do");
    } else {
      console.log(todos);
      const time = new Date();
      try {
        const docRef = await addDoc(collection(db, "todos"), {
          todo: todo,
          time: `${time.getHours()}:${
            time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()
          }`,
        });
        console.log("Document written with ID: ", docRef.id);
        console.log("docRef", docRef);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      // window.location.reload();
      setTodo("");
      fetchPost();
    }
  };

  // Get Todo Data
  const fetchPost = async () => {
    await getDocs(collection(db, "todos")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTodos(newData);
      // console.log(todos, newData, time);
    });
  };

  //Update todo Data
  const handleEditTodo = (todoValue) => {
    setTodo(todoValue.todo);
    setEditableID(todoValue.id);
    setIsEditing(true);
  };

  //save Update Todo Data
  const saveTodo = async () => {
    todos.filter((val, ind) => {
      if (val.id === editableID) {
        const time = new Date();
        try {
          updateDoc(doc(db, "todos", editableID), {
            todo: todo,
            time: `${time.getHours()}:${
              time.getMinutes() < 10
                ? `0${time.getMinutes()}`
                : time.getMinutes()
            }`,
          });
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
      return "";
    });
    setIsEditing(false);
    setTodo("");
    fetchPost();
  };

  //Delete Todo Data
  const deleteTodo = (id) => {
    const userDoc = doc(db, "todos", id);
    // console.log("Got the Document ID");
    // console.log("Deleted the Document");
    // fetchPost();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        deleteDoc(userDoc);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    });
  };

  return (
    <section className="w-50 border m-3 p-2">
      <div>
        <h4 className="text-center my-3">Todo-App</h4>
        <div>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="What do you have to do today?"
              aria-label="What do you have to do today?"
              aria-describedby="button-addon2"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
            {isEditing ? (
              <button
                className="btn btn-outline-success"
                type="submit"
                id="button-addon2"
                onClick={saveTodo}
              >
                save
              </button>
            ) : (
              <button
                className="btn btn-outline-success"
                type="submit"
                id="button-addon2"
                onClick={addTodo}
              >
                Add
              </button>
            )}
          </div>
        </div>
        <div
          className="todo-content border py-3 px-2 overflow-y-scroll"
          style={{ maxHeight: "170px" }}
        >
          {todos?.map((todo, i) => (
            <ul
              className="d-flex justify-content-between bg-light py-2"
              key={i}
            >
              <li>{todo.todo}</li>
              <span className="pe-2">
                {todo.time}
                <i
                  className="fa-solid fa-pencil text-info"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleEditTodo(todo)}
                ></i>
                <i
                  className="fa-solid fa-trash text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => deleteTodo(todo.id)}
                ></i>
              </span>
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Todo;
