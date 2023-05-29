import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { PaySalary } from "../actions/teacherActions";
import { TEACHER_SALARY_RESET } from "../constants/teacherConstants";
import "./Student.css";
const TeacherSalary = ({ history }) => {
  const [teachername, setTeachername] = useState("");
  const [id, setId] = useState("");
  const [valid, setValid] = useState(false);
  const [year, setYear] = useState("");
  const [salary, setSalary] = useState("");
  const [month, setMonth] = useState("");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    setValid(true);
    setTimeout(() => {
      setValid(false);
    }, 10000);
    dispatch(PaySalary(teachername.trim(), id, year, month, salary));
    setTeachername("");
    setId("");
    setYear("");
    setSalary("");
  };
  const userLogin = useSelector((state) => state.userLogin);
  // const userLogin = useSelector((state) => state.userLogin)

  const { userCred } = userLogin;

  // const studentRegister = useSelector((state) => state.studentRegister)
  const teacherSalary = useSelector((state) => state.teacherSalary);

  const { loading, success, error } = teacherSalary;
  useEffect(() => {
    dispatch({
      type: TEACHER_SALARY_RESET,
    });
    if (!userCred) {
      history.push("/login");
    }
  }, [userCred, history]);
  return (
    <div className="container1" style={{ marginTop: "10px" }}>
      <div className="outer-layout">
        <h1>Teacher Salary Section</h1>
        {valid && success && (
          <Message variant="success" message={success.message} />
        )}
        {valid && error && <Message variant="danger" message={error} />}

        {loading ? (
          <Loader />
        ) : (
          <form onSubmit={submitHandler}>
            <div className="form-inner">
              <div className="form-control">
                <label for="name">Teacher Name</label>
                <input
                  type="text"
                  value={teachername}
                  onChange={(e) => setTeachername(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label for="name">Teacher ID</label>
                <input
                  type="number"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label for="year">Salary for Year</label>
                <input
                  type="string"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>{" "}
              <div className="form-control">
                <label for="name">Salary for Month</label>
                <select
                  id="class"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  required
                >
                  <option value="">Select Month</option>

                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                  {/* <option value='Ten'>Ten</option> */}
                </select>
              </div>{" "}
              <div className="form-control">
                <label for="name">Salary Amount</label>
                <input
                  type="number"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  required
                />
              </div>{" "}
              {/* <div className="register-btn"> */}
              {/* </div> */}
            </div>

            <button className="btn-register" type="submit">
              Pay Now
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default TeacherSalary;
