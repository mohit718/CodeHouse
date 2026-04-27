import { useQuery } from "@tanstack/react-query";
import { getProblems, getProblemById } from "../api/problem";

export const useProblem = () =>
  useQuery({
    queryKey: ["problems"],
    queryFn: getProblems,
  });

export const useProblemById = (problemId) =>
  useQuery({
    queryKey: ["problem", problemId],
    queryFn: () => getProblemById(problemId),
    enabled: !!problemId,
  });
