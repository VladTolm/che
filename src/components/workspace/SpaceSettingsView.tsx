import { useState } from "react";
import type { Workspace, SpaceDocument, SpaceMember, SpaceAccessType, WorkspaceAgent, WorkspaceSubSection } from "../../workspaceTypes";
import {
  spaceDocuments as initialDocs,
  spaceMembers as initialMembers,
  spaceAccessType as initialAccessType,
  wsAgents,
  universalAgent,
} from "../../data/workspaceMock";
import WorkspaceTabBar from "./WorkspaceTabBar";
import SpaceDocumentsSection from "./SpaceDocumentsSection";
import SpaceAgentsSection from "./SpaceAgentsSection";
import SpaceAccessSection from "./SpaceAccessSection";

interface Props {
  workspace: Workspace;
  activeSection: WorkspaceSubSection;
  waitingCount: number;
  onChangeSection: (sub: WorkspaceSubSection) => void;
  onConfigureAgent: (agentId: string) => void;
  onCreateAgent: () => void;
}

export default function SpaceSettingsView({ workspace, activeSection, waitingCount, onChangeSection, onConfigureAgent, onCreateAgent }: Props) {
  const [documents, setDocuments] = useState<SpaceDocument[]>(initialDocs);
  const [members, setMembers] = useState<SpaceMember[]>(initialMembers);
  const [accessType, setAccessType] = useState<SpaceAccessType>(initialAccessType);

  const allAgents: WorkspaceAgent[] = [universalAgent, ...wsAgents];

  function handleDeleteDocument(id: string) {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  }

  function handleChangeRole(memberId: string, role: string) {
    if (role === "remove") {
      setMembers((prev) => prev.filter((m) => m.id !== memberId));
    } else {
      setMembers((prev) =>
        prev.map((m) => m.id === memberId ? { ...m, role: role as "admin" | "member" } : m)
      );
    }
  }

  return (
    <div className="flex-1 flex flex-col min-w-0 min-h-0">
      <WorkspaceTabBar
        workspace={workspace}
        activeSection={activeSection}
        waitingCount={waitingCount}
        onChangeSection={onChangeSection}
      />

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="max-w-3xl mx-auto space-y-8">
          <SpaceDocumentsSection
            documents={documents}
            onAddDocument={() => {/* file dialog stub */}}
            onDeleteDocument={handleDeleteDocument}
          />
          <SpaceAgentsSection
            agents={allAgents}
            onConfigureAgent={onConfigureAgent}
            onCreateAgent={onCreateAgent}
          />
          <SpaceAccessSection
            accessType={accessType}
            members={members}
            currentUserRole="owner"
            onChangeAccessType={setAccessType}
            onChangeRole={handleChangeRole}
            onInvite={() => {/* invite stub */}}
          />
        </div>
      </div>
    </div>
  );
}
