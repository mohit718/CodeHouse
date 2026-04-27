import http from "../libs/http";

export const getProblems = () => http.get("/problem").then((res) => res.data);

export const getProblemById = (problemId) =>
  http.get(`/problem/${problemId}`).then((res) => res.data);
