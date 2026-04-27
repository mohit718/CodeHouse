import { useState } from "react";
import { useNavigate } from "react-router";
import {
  useActiveSessions,
  useCreateSession,
  usePastSessions
} from "../hooks/useSession";

import {
  ActiveSessions,
  CreateSessionModal,
  PastSessions,
  StatsCards,
  WelcomeSection,
} from "../components";



export default function Dashboard() {
  const { data: activeSessionsData, isLoading: loadingActiveSessions } =
    useActiveSessions();
  const { data: pastSessionsData, isLoading: loadingPastSessions } = usePastSessions();

  const navigate = useNavigate();

  const [showCreateModal, setShowCreateModal] = useState(false);

  const createSession = useCreateSession();

  const activeSessions = activeSessionsData?.session || [];
  const pastSessions = pastSessionsData?.session || [];

  const handleCreateRoom = (problemId) => {
    if (!problemId) return;
    createSession.mutate(problemId, {
      onSuccess: (data) => {
        setShowCreateModal(false);
        navigate(`/session/${data.session._id}`);
      },
    });
  };

  return (
    <>
      <div className="min-h-screen bg-base-300">
        <WelcomeSection onCreateSession={() => setShowCreateModal(true)} />

        {/* Grid layout */}
        <div className="container mx-auto px-6 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <StatsCards
              activeSessionsCount={activeSessions.length}
              pastSessionsCount={pastSessions.length}
            />
            {/* TODO: Understand Active session component */}
            <ActiveSessions
              sessions={activeSessions}
              isLoading={loadingActiveSessions}
            />
          </div>
          
          {/* TODO: Understand Past session component */}
          <PastSessions
            sessions={pastSessions}
            isLoading={loadingPastSessions}
          />
        </div>
      </div>

      <CreateSessionModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateRoom}
        isCreating={createSession.isPending}
      />
    </>
  );
}
