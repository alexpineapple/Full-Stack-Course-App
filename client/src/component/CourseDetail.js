import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from 'react-markdown';

const CourseDetail = ({ context }) => {

  const [course, setCourse] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  //Setting up context!
  useEffect(() => {
    context.data
      .getCourse(id)
      .then((data) => {
        setCourse(data);
      })
      .catch((error) => {
        if (error.status === 404) {
          navigate("/notfound");
        } else if (error.status === 500) {
          navigate("/error")
        } else {
          navigate("/error");
        }
      });
  }, []);

  //Handle course deletion
  const handleDelete = async (event) => {
    event.preventDefault();
    await context.data
      .deleteCourse(
        id,
        context.authenticatedUser.emailAddress,
        context.authenticatedUser.password
      )
      .then(
        navigate("/"));
  };

  //finished component to render
  return (
    <main>
      <div className="actions--bar">

        {/* Only render update/delete buttons if course creator is logged in! */}
        {context.authenticatedUser && context.authenticatedUser.id === course.userId ? (
          <div className="wrap">
            <Link className="button" to="update">Update Course </Link>
            <Link className="button button-delete" onClick={handleDelete}>
              Delete Course
            </Link>
            <Link className="button button-secondary" to="/">
              Return to List
            </Link>
          </div>
        ) : (
          <div className="wrap">
            <Link className="button button-secondary" to="/">
              Return to List
            </Link>
          </div>
        )}
      </div>
      
      {/* course details to render*/}
      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{course.title}</h4>
              <p>By {course.user?.firstName} {course.user?.lastName}</p>

              <ReactMarkdown children={course.description} />
            </div>
            <div>

              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p>
              <h3 className="course--detail--title">Materials Needed</h3>

              <ul className="course--detail--list">
                <ReactMarkdown children={course.materialsNeeded} />
              </ul>

            </div>
          </div>
        </form>
      </div>
    </main>

  )
};


export default CourseDetail;