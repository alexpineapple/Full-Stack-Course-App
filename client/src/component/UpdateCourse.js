import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

//this component is used to update a Course
const UpdateCourse = ({ context }) => {

  //set up fields to use the State
  const navigate = useNavigate();
  const { id } = useParams();
  const [errors, setErrors] = useState([]);
  const [course, setCourse] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");

  //Setting up the context!
  useEffect(() => {
    context.data
      .getCourse(id)
      .then((data) => {
        //only user who created the course should be allowed to access!
        if (context.authenticatedUser.id === data.userId) {
          setCourse(data);
          setTitle(data.title);
          setDescription(data.description);
          setEstimatedTime(data.estimatedTime);
          setMaterialsNeeded(data.materialsNeeded);
        } else {
          //access denied
          navigate("/forbidden");
        }
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

  //set up update request
  const handleUpdate = async (e) => {
    e.preventDefault();

    const body = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
    };
    await context.data
      .updateCourse(
        id,
        body,
        context.authenticatedUser.emailAddress,
        context.authenticatedUser.password
      )
      .then((errors) => {
        if (errors.length) {
          setErrors(errors);

        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        navigate("/error");
      });
  };

  //event handler
  const handleChange = (e) => {
    e.preventDefault();

    const name = e.target.name;
    const value = e.target.value;

    switch (name) {
      case "courseTitle":
        setTitle(value);
        break;
      case "courseDescription":
        setDescription(value);
        break;
      case "estimatedTime":
        setEstimatedTime(value);
        break;
      case "materialsNeeded":
        setMaterialsNeeded(value);
        break;
      default:
        return;
    }
  };

  //if cancel button is pressed, navigate back to course screen
  const handleCancel = (e) => {
    e.preventDefault();
    navigate(`/courses/${id}`);
  };

  //render component
  return (
    <main>
      <div className="wrap">
        <h2>Update Course</h2>

        {/* check & display any validation errors */}
        {errors && errors.length ? (
          <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* begin form here */}
        <form onSubmit={handleUpdate}>
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input
                id="courseTitle"
                name="courseTitle"
                type="text"
                value={title}
                onChange={handleChange}
              />

              <p>By {course.user?.firstName} {course.user?.lastName}</p>

              <label htmlFor="courseDescription">Course Description</label>
              <textarea
                id="courseDescription"
                name="courseDescription"
                value={description}
                onChange={handleChange}>
              </textarea>
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input id="estimatedTime" name="estimatedTime" type="text" value={estimatedTime}
                onChange={handleChange}
              />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea
                id="materialsNeeded"
                name="materialsNeeded"
                value={materialsNeeded}
                onChange={handleChange}></textarea>
            </div>
          </div>
          <button className="button" type="submit">Update Course</button>
          <button className="button button-secondary"
            onChange={handleCancel}>Cancel</button>
        </form>
      </div>
    </main>
  );
}

export default UpdateCourse;