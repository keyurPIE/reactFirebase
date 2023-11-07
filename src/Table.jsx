import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./firebase-config";
import Swal from "sweetalert2";

function Table() {
  const [user, setUser] = useState([]);
  const [equalID, setEqualID] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    userName: "",
    userEmail: "",
    userAge: "",
    userTodo: "",
  });

  //Intial data on every render
  useEffect(() => {
    fetchData();
  }, []);

  // Get Data from Firestore
  const fetchData = async () => {
    await getDocs(collection(db, "users")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUser(newData);
      // console.log(user, newData);
    });
  };

  // Update User Data
  // const handleEdit = (e, i) => {
  //   const dd = user.filter((val, index) => {
  //     return index === i;
  //   });
  //   console.log("dd", dd);
  //   dd.map((val) => console.log("val", val.users));
  //   dd.map((val) => console.log("val", val.users.userEmail));
  // };

  const handleEdit = async (userDetails) => {
    setIsEditing(true);
    setEqualID(userDetails.id);
    console.log("userdetails", userDetails);
    setUpdatedData({
      userName: userDetails.users.userName,
      userEmail: userDetails.users.userEmail,
      userAge: userDetails.users.userAge,
      userTodo: userDetails.users.userTodo,
      userCount: userDetails.users.userCount,
    });
  };

  // input onChange
  const handleChange = (event) => {
    const Name = event.target.name;
    const value = event.target.value;
    setUpdatedData((values) => ({ ...values, [Name]: value }));
  };

  //Edit Form Submission
  const handleEdituserForm = async (e) => {
    console.log("edit user submittedd......");
    e.preventDefault();
    console.log("updatedData", updatedData);
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
        try {
          updateDoc(doc(db, "users", equalID), {
            "users.userName": updatedData.userName,
            "users.userEmail": updatedData.userEmail,
            "users.userAge": updatedData.userAge,
            "users.userTodo": updatedData.userTodo,
          });
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
      setIsEditing(false);
      setUpdatedData("");
      fetchData();
    });
  };

  // Delete User Data
  // const handleDelete = (e, i) => {
  //   setUser(
  //     user.filter((val, index) => {
  //       return index !== i;
  //     })
  //   );
  // };

  const handleDelete = async (id) => {
    const userDoc = doc(db, "users", id);
    console.log("Got the Document ID");
    console.log("Deleted the Document");
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
    <>
      {isEditing ? (
        <form
          action=""
          onSubmit={handleEdituserForm}
          id="editform"
          className="row bg-light p-3 position-absolute top-0 end-0"
        >
          <h4 className="text-center mb-2">Update Form</h4>
          <div className="col-md-6">
            <label className="form-label" htmlFor="userName">
              userName :
            </label>
            <input
              type="text"
              name="userName"
              value={updatedData.userName || ""}
              className="input_field form-control"
              id="userName"
              placeholder="Enter Your UserName"
              required
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="Email">
              Email :
            </label>
            <input
              type="email"
              name="userEmail"
              value={updatedData.userEmail || ""}
              className="input_field form-control"
              id="Email"
              placeholder="Enter Your Email"
              required
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="Age">
              Age :
            </label>
            <input
              type="number"
              name="userAge"
              value={updatedData.userAge || ""}
              className="input_field form-control"
              id="Age"
              placeholder="Enter Your Age"
              required
              onChange={handleChange}
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
              value={updatedData.userTodo || ""}
              placeholder="What do you have to do today?"
              id="Todo"
              required
              onChange={handleChange}
            />
          </div>
          <div className="col d-flex">
            <button
              type="submit"
              className="bg-success w-50 text-white fw-bold py-2 my-2"
            >
              Save
            </button>
            <button
              type="submit"
              className="bg-danger w-50 ms-3 text-white fw-bold py-2 my-2"
              onClick={() => {
                setIsEditing(false);
                window.location.reload();
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
          <table className="w-100 border">
            <thead className="text-center">
              <tr>
                <th>No.</th>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Todo</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {user?.map((user, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{user.id}</td>
                  <td>{user.users.userName}</td>
                  <td>{user.users.userEmail}</td>
                  <td>{user.users.userAge}</td>
                  <td>{user.users.userTodo}</td>
                  <td className="d-flex justify-content-around">
                    <button
                      onClick={() => {
                        handleEdit(user);
                      }}
                    >
                      <i className="fa-solid fa-pencil bg-info"></i>
                    </button>
                    <button onClick={() => handleDelete(user.id)}>
                      <i className="fa-solid fa-trash bg-danger"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default Table;
