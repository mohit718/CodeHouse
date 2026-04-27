import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createSession,
  getActiveSessions,
  getPastSessions,
  joinSession,
  endSession,
} from "../api/session";
import { toast } from "react-hot-toast";

export const useCreateSession = () =>
  useMutation({
    mutationKey: ["createSession"],
    mutationFn: (problemId) => createSession(problemId),
    onSuccess: (data) => toast.success("Session Created!"),
    onError: (error) =>
      toast.error(error.response?.data?.message || "Error creating session"),
  });

export const useActiveSessions = () =>
  useQuery({
    queryKey: ["activeSessions"],
    queryFn: getActiveSessions,
  });

export const usePastSessions = () =>
  useQuery({
    queryKey: ["pastSessions"],
    queryFn: getPastSessions,
  });

export const useSessionById = (sessionId) =>
  useQuery({
    queryKey: ["session", sessionId],
    queryFn: () => getSessionById(sessionId),
    enabled: !!sessionId,
    refetchInterval: 5000, // Refetch every 5 seconds for real-time updates
  });

export const useJoinSession = (sessionId) =>
  useMutation({
    mutationKey: ["joinSession", sessionId],
    mutationFn: () => joinSession(sessionId),
    enabled: !!sessionId,
    onSuccess: (data) => toast.success("Joined Session!"),
    onError: (error) =>
      toast.error(error.response?.data?.message || "Error joining session"),
  });

export const useEndSession = (sessionId) =>
  useMutation({
    mutationKey: ["endSession", sessionId],
    mutationFn: () => endSession(sessionId),
    enabled: !!sessionId,
    onSuccess: (data) => toast.success("Session Ended!"),
    onError: (error) =>
      toast.error(error.response?.data?.message || "Error ending session"),
  });
