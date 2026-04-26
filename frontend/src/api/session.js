import http from '../libs/http'

export const getSession = () => http.get('/session');

export const getActiveSessions = () => http.get('/session/active');

export const getPastSessions = () => http.get('/session/past');

export const createSession = (problemId) => http.post('/session', { problemId });

export const joinSession = (sessionId) => http.post(`/session/${sessionId}`);

export const endSession = (sessionId) => http.delete(`/session/${sessionId}`);
