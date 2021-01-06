
import './App.css';
import list from "./list"
import { useState } from "react";
import Axios from "axios";


function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  const [newWage, setNewWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {                                  //sending an object to the backend query to add 
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage,
        },
      ]);
    });
  };

  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {              //response is an object having data as a key
      setEmployeeList(response.data);
    });
  };

  const updateEmployeeWage = (id) => {
    Axios.put("http://localhost:3001/update", { wage: newWage, id: id }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {                                    //From node, result was sent so getting it and updating in employee list
            return val.id === id                                        //Getting resut set is not really necessary as json object with message can also be sent
              ? {
                  id: val.id,
                  name: val.name,
                  country: val.country,
                  age: val.age,
                  position: val.position,
                  wage: newWage,
                }
              : val;                                                    //updating wage or returning unchanged previous array of objects
          })
        );
      }
    );
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {             //filtering out non matching ids and updating employee list
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };
    
  return (
    <div className="App">
      <div className="information">
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Age:</label>
        <input
          type="number"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <label>Country:</label>
        <input
          type="text"
          onChange={(event) => {
            setCountry(event.target.value);
          }}
        />
        <label>Position:</label>
        <input
          type="text"
          onChange={(event) => {
            setPosition(event.target.value);
          }}
        />
        <label>Wage (year):</label>
        <input
          type="number"
          onChange={(event) => {
            setWage(event.target.value);
          }}
        />
        <button onClick={addEmployee}>Add Employee</button>
      </div>
      <div className="employees">                                    {/* Main div for printing employee list */}
        <button onClick={getEmployees}>Show Employees</button>
       
        {employeeList.map((val, key) => {
         
            <div className="employee">                                {/* div of one employee*/}
            
            <list val = {val}></list>                                 {/*  Separate list component to return employee list , left side div */}
            
            <div>                                                      {/* Right side div*/}
            
            <input
                type="text"
                placeholder="Enter changed wage"
                onChange={(event) => {
                    setNewWage(event.target.value);
                  }}
                />
            <button
                onClick={() => {
                    updateEmployeeWage(val.id);
                  }}
                >
                {" "}                                          
                Update
            </button>

            <button
                onClick={() => {
                    deleteEmployee(val.id);
                  }}
                >
                Delete
            </button>
            </div>
            </div>
          
        })}
      </div>
    </div>
  );
}

export default App;
