import "./App.css";
import Table from "./Table";
import Todo from "./Todo";
import User from "./User";

function App() {
  return (
    <>
      <div className="d-flex" style={{ maxHeight: "335px" }}>
        <Todo />
        <User />
      </div>
      <Table />
    </>
  );
}

export default App;
