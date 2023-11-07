import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "./firebase-config";

function User() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userAge, setUserAge] = useState("");
  const [userTodo, setUserTodo] = useState("");

  //Submit data to firestoer
  const handleSubmit = async (e) => {
    console.log("form submitted...!");
    e.preventDefault();
    try {
      const docuRef = await addDoc(collection(db, "users"), {
        users: {
          userName: userName,
          userEmail: userEmail,
          userAge: userAge,
          userTodo: userTodo,
        },
      });
      console.log("Document written with ID: ", docuRef.id);
      console.log("docuRef", docuRef);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    console.log(userAge, userEmail, userName, userTodo);
    document.getElementById("form").reset();
    window.location.reload();
  };

  return (
    <>
      <div className="border w-50 m-3 p-3">
        <h4 className="text-center">User Form</h4>
        <form
          action=""
          onSubmit={handleSubmit}
          id="form"
          className="row bg-light p-3"
        >
          <div className="col-md-6">
            <label className="form-label" htmlFor="userName">
              userName :
            </label>
            <input
              type="text"
              name="userName"
              value={userName}
              className="input_field form-control"
              id="userName"
              placeholder="Enter Your UserName"
              required
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="Email">
              Email :
            </label>
            <input
              type="email"
              name="userEmail"
              value={userEmail}
              className="input_field form-control"
              id="Email"
              placeholder="Enter Your Email"
              required
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="Age">
              Age :
            </label>
            <input
              type="number"
              name="userAge"
              value={userAge}
              className="input_field form-control"
              id="Age"
              placeholder="Enter Your Age"
              required
              onChange={(e) => setUserAge(e.target.value)}
            />
          </div>
          <div className="col-md-8">
            <label className="form-label" htmlFor="Todo">
              Todo :
            </label>
            <input
              type="text"
              className="input_field form-control"
              name="userTodo"
              value={userTodo}
              placeholder="What do you have to do today?"
              id="Todo"
              required
              onChange={(e) => setUserTodo(e.target.value)}
            />
          </div>

          <button type="submit" className="bg-success text-white fw-bold py-2">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default User;
