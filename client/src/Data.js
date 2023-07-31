import { Buffer } from "buffer";

export default class Data {
  //api will handle all calls to the API, reference as this.api
  api(
    path, method = "GET", body = null, requiresAuth = false, credentials = null) {
    const url = `http://localhost:5001/api${path}`;
    const options = {
      method,
      headers: { "Content-Type": "application/json; charset=utf-8", },
    };

    //convert to stringified JSON
    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    //basic authentication for private routes
    if (requiresAuth) {
      const encodedCredentials = Buffer.from(
        `${credentials.username}:${credentials.password}`
      ).toString("base64");
      options.headers["Authorization"] = `Basic ${encodedCredentials}`;
    }

    //finally, submit the fetch request
    return fetch(url, options);
  }

  //GET request to the API for the provided user and password
  async getUser(username, password) {
    const response = await this.api(`/users`, "GET", null, true, {
      username,
      password,
    });
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else if (response.status === 401) {
      return null;
    } else {
      let err = new Error('HTTP error');
      err.status = response.status;
      throw err;
    }
  }

  //POST request to the API to create a new user
  async createUser(user) {
    const response = await this.api("/users", "POST", user);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      let err = new Error('HTTP error');
      err.status = response.status;
      throw err;
    }
  }

  //GET request to the API to get the list of all courses
  async getCourses() {
    const response = await this.api("/courses", "GET");
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else {
      let err = new Error('HTTP error');
      err.status = response.status;
      throw err;
    }
  }

  //GET request to the API to get the course corresponding to the id
  async getCourse(id) {
    const response = await this.api(`/courses/${id}`, "GET");
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else {
      let err = new Error('HTTP error');
      err.status = response.status;
      throw err;
    }
  }

  //POST request to the API to create a new course
  async createCourse(body, username, password) {
    const response = await this.api(`/courses`, "POST", body, true, {
      username,
      password,
    }
    );
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      let err = new Error('HTTP error');
      err.status = response.status;
      throw err;
    }
  }

  //PUT request to the API to update an existing course
  async updateCourse(id, body, username, password) {
    const response = await this.api(`/courses/${id}`, "PUT", body, true, {
      username,
      password,
    });
    if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      let err = new Error('HTTP error');
      err.status = response.status;
      throw err;
    }
  }

  //DELETE request to the API to delete the course with the provided id
  async deleteCourse(id, username, password) {
    const response = await this.api(`/courses/${id}`, "DELETE", null, true, {
      username,
      password,
    });
    if (response.status === 204) {
      return [];
    } else {
      let err = new Error('HTTP error');
      err.status = response.status;
      throw err;
    }
  }
}