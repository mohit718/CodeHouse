import http from '../libs/http'

export const getAllSessions = () => http.get('/session').then(res => res.data);

export const getSessionById = (sessionId) => http.get(`/session/${sessionId}`).then(res => res.data);

export const getActiveSessions = () => http.get('/session/active').then(res => res.data);
    
export const getPastSessions = () => http.get('/session/past').then(res => res.data);

export const createSession = (problemId) => http.post('/session', { problemId }).then(res => res.data);

export const joinSession = (sessionId) => http.post(`/session/${sessionId}`).then(res => res.data);

export const endSession = (sessionId) => http.delete(`/session/${sessionId}`).then(res => res.data);

export const getStreamToken = () => http.get('/chat/token').then(res => res.data);