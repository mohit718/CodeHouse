import { useMutation, useQuery } from "@tanstack/react-query";
import { createSession, getActiveSessions, getPastSessions, joinSession, endSession } from "../api/session";

export const useCreateSession = (problemId) =>
  useMutation({
    mutationKey: ["createSession", problemId],
    mutationFn: () => createSession(problemId),
    onSuccess: (data) => console.log('Session Created',data),
    onError: (error) => console.error('Error creating session', error),
  });

export const useGetActiveSessions = () =>
  useQuery({
    queryKey: ["activeSessions"],
    queryFn: getActiveSessions,
    onSuccess: (data) => console.log('Active Sessions', data),
    onError: (error) => console.error('Error fetching active sessions', error),
  });

export const useGetPastSessions = () =>
  useQuery({
    queryKey: ["pastSessions"],
    queryFn: getPastSessions,
    onSuccess: (data) => console.log('Past Sessions', data),
    onError: (error) => console.error('Error fetching past sessions', error),
  });

export const useJoinSession = (sessionId) =>
  useMutation({
    mutationKey: ["joinSession", sessionId],
    mutationFn: () => joinSession(sessionId),
  });

export const useEndSession = (sessionId) =>
  useMutation({
    mutationKey: ["endSession", sessionId],
    mutationFn: () => endSession(sessionId),
    onSuccess: (data) => console.log('Session Ended', data),
    onError: (error) => console.error('Error ending session', error),
  });
