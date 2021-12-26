import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8081/rest",
  headers: {
    "Content-type": "application/json"
  }
});