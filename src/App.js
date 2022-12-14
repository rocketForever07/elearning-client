import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import DashBoard from "./pages/DashBoard/Dashboard";
import Settings from "./pages/Settings/Settings";
import Messages from "./pages/Messages/Messages";
import Grades from "./pages/Grades/Grades";
import Profile from "./pages/Profile/Profile";
import Header from "./components/Header/Header";
import CourseInfo from "./pages/CourseInfo/CourseInfo";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import TeacherDashboard from "./pages/Teacher/TeacherDashboard/TeacherDashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard/AdminDashboard";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import StudentRoute from "./components/PrivateRoute/StudentRoute";
import TeacherRoute from "./components/PrivateRoute/TeacherRoute";
import AdminRoute from "./components/PrivateRoute/AdminRoute";
import AdminCourseInfo from "./pages/Admin/Course/AdminCourseInfo";
import StudentInfo from "./pages/Admin/Student/StudentInfo";
import TeacherInfo from "./pages/Admin/Teacher/TeacherInfo";
import AllCourses from "./pages/All-Courses/AllCourses";
import NotFound from "./pages/404NotFoud/NotFound";
import Libray from "./pages/Library/Libray";
import Ucam from "./pages/Ucam/Ucam";
import CallPage from "./pages/CallPage/index";
import HomeCall from "./pages/CallPage/home";
import PDF from "./pages/PDF";

import DetailCourse from "./pages/DetailCourse";
import TeacherCourseInfo from "./pages/Teacher/TeacherCourseInfo";
import TeacherNotification from "./pages/Teacher/TeacherNotification";
import QuizPage from "./pages/Quiz/QuizPage";
import AdminQuizPage from "./pages/Quiz/AdminQuizPage";
import QuizResult from "./pages/Quiz/QuizResult";
import QuizReview from "./pages/Quiz/QuizReview";

const Routing = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user)
  useEffect(() => {
    if (!user) {
      history.push("/login");
    } else {
      dispatch({ type: "SET__USER", payload: user });
    }
  }, []);
  return (
    <Switch>
      <StudentRoute exact path="/">
        <DashBoard />
      </StudentRoute>
      <StudentRoute exact path="/library">
        <Libray />
      </StudentRoute>
      <StudentRoute exact path="/ucam">
        <Ucam />
      </StudentRoute>
      <TeacherRoute exact path="/teacher-dashboard">
        <TeacherDashboard />
      </TeacherRoute>
      <AdminRoute exact path="/admin-dashboard">
        <AdminDashboard />
      </AdminRoute>
      <AdminRoute exact path="/admin/course-info">
        <AdminCourseInfo />
      </AdminRoute>
      <TeacherRoute exact path="/course-info">
        <TeacherCourseInfo />
      </TeacherRoute>
      <TeacherRoute exact path="/course-info-notification">
        <TeacherNotification />
      </TeacherRoute>
      <AdminRoute exact path="/admin/student-info">
        <StudentInfo />
      </AdminRoute>
      <AdminRoute exact path="/admin/teacher-info">
        <TeacherInfo />
      </AdminRoute>
      <StudentRoute exact path="/messages">
        <Messages />
      </StudentRoute>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route exact path="/settings">
        <Settings />
      </Route>
      <Route exact path="/grades">
        <Grades />
      </Route>

      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/register">
        <Register />
      </Route>
      <Route exact path="/all-courses">
        <AllCourses />
      </Route>
      <Route exact path="/detail-courses/:id">
        <DetailCourse />
      </Route>
      {/* <Route exact path="/show-pdf/:id">
        <PDF />
      </Route> */}
      <Route exact path="/course/:courseId">
        <CourseInfo />
      </Route>
      <Route exact path="/quiz/:courseId">
        <QuizPage />
      </Route>
      <Route exact path="/quiz/:courseId/results">
        <QuizResult />
      </Route>
      <Route exact path="/quiz/:courseId/review">
        <QuizReview />
      </Route>
      <Route exact path="/admin-quiz/:id">
        <AdminQuizPage />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
};

function App() {
  console.log(window.location.href);
  return (
    <div className="App">
      <Router>
        {window.location.href.includes("home-call") ? "" : <Header />}
        <Routing />
      </Router>
    </div>
  );
}

export default App;
