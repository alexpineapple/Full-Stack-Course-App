import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Courses = ({ context }) => {

  const [courses, setCourses] = useState([]);
  let navigate = useNavigate();

  //Setting up context! Get courses and assign to courses variable as an array.
  useEffect(() => {
    context.data
      .getCourses()
      .then((data) => setCourses(data))
      .catch((error) => {
        if (error.status === 500) {
          navigate("/error")
        } else {
          navigate("/error");
        }
      });

  }, []);

  //Finished component to render
  return (
    <main>
      <div className="wrap main--grid">

        {/* Map array of courses into individual modules */}
        {courses?.map((course) => {
          return (
            <Link
              className="course--module course--link" to={`/courses/${course.id}`}
              key={course.id}
            >
              <h2 className="course--label">Course</h2>
              <h3 className="course--title">{course.title}</h3>
            </Link>
          );
        })}

        {/* Module for adding a new course */}
        <Link
          className="course--module course--add--module"
          to="courses/create"
        >
          <span className="course--add--title">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 13 13"
              className="add"
            >
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>
            New Course
          </span>
        </Link>
      </div>
    </main>
  );
};

export default Courses;