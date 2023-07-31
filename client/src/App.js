import React from "react";
import withContext from "./Context";
import { Route, Routes } from "react-router-dom";

//import all the components
import CourseDetail from "./component/CourseDetail";
import Courses from "./component/Courses";
import Header from "./component/Header";
import UpdateCourse from "./component/UpdateCourse";
import UserSignIn from "./component/UserSignIn";
import UserSignOut from "./component/UserSignOut";
import UserSignUp from "./component/UserSignUp";
import CreateCourse from "./component/CreateCourse";
import PrivateRoute from "./PrivateRoute";
import NotFound from './component/NotFound';
import UnhandledError from './component/UnhandledError';
import Forbidden from './component/Forbidden';

//assign all components with context
const CourseDetailWithContext = withContext(CourseDetail);
const CoursesWithContext = withContext(Courses);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const HeaderWithContext = withContext(Header);
const UserSignOutWithContext = withContext(UserSignOut);
const UpdateCourseWithContext = withContext(UpdateCourse);
const CreateCourseWithContext = withContext(CreateCourse);
const PrivateRouteWithContext = withContext(PrivateRoute);

const App = () => {
  return (
    <React.Fragment>
      <HeaderWithContext />

      <Routes>
        {/* private routes here */}
        <Route path="courses/create"
          element={
            <PrivateRouteWithContext>
              <CreateCourseWithContext />
            </PrivateRouteWithContext>} />

        <Route path="courses/:id/update"
          element={
            <PrivateRouteWithContext>
              <UpdateCourseWithContext />
            </PrivateRouteWithContext>} />

        {/* main route */}
        <Route path="/" element={<CoursesWithContext />} />
        
        {/* user maintenance routes */}
        <Route path="/signin" element={<UserSignInWithContext />} />
        <Route path="/signup" element={<UserSignUpWithContext />} />
        <Route path="/signout" element={<UserSignOutWithContext />} />

        {/* course detail route */}
        <Route path="courses/:id" element={<CourseDetailWithContext />} />
        
        {/* error routes */}
        <Route path="/error" element={<UnhandledError />} />
        <Route path="/forbidden" element={<Forbidden />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="/*" element={<NotFound />} />

      </Routes>

    </React.Fragment>
  );
};

export default App;