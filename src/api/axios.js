import axios from "axios";

// const BASE_URL = process.env.BASE_URL;
export default axios.create({
  baseURL: "http://localhost:3000",
});

// baseURL: "http://localhost:3000",
// baseURL: "containers-us-west-177.railway.app/",
// baseURL: "https://personal-project-production-cc4d.up.railway.app",
// baseURL: "https://cynical-birthday-production.up.railway.app",
