import React, { use } from 'react'
import toast from 'react-hot-toast'
import { useCreateSession, useGetActiveSessions, useGetPastSessions, useJoinSession, useEndSession } from '../hooks/useSession'

export default function Dashboard() {
  const {data:activeSessions} = useGetActiveSessions()
  const {data:pastSessions} = useGetPastSessions()
  
  return (
    <main>
        Dashboard
    </main>
  )
}
