import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3000",
  // baseURL: "https://containers-us-west-177.railway.app/api",    try this next
  // baseURL: "https://personal-project-production-cc4d.up.railway.app",
});
