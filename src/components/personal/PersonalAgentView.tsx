import { useState } from "react";
import type { PersonalTab, ChatDemoState, ContextConfig } from "../../personalTypes";
import { personalWorkspaces } from "../../data/personalMock";
import PersonalAgentTopBar from "./PersonalAgentTopBar";
import ChatView from "./ChatView";
import OverviewView from "./OverviewView";
import PersonalWorkspacesView from "./PersonalWorkspacesView";
import ContextPanel from "./ContextPanel";

export default function PersonalAgentView() {
  const [activeTab, setActiveTab] = useState<PersonalTab>("chat");
  const [chatState, setChatState] = useState<ChatDemoState>("morning_brief");
  const [contextPanel, setContextPanel] = useState<ContextConfig | null>(null);
  const [input, setInput] = useState("");

  const handleToggleContext = () => {
    setContextPanel(
      contextPanel ? null : { type: "workspace", title: "📦 Закупки", data: { ws: personalWorkspaces[0] } }
    );
  };

  const handleOpenContext = (config: ContextConfig) => {
    setContextPanel(config);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 min-h-0">
      <PersonalAgentTopBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        contextOpen={!!contextPanel}
        onToggleContext={handleToggleContext}
      />
      <div className="flex-1 flex overflow-hidden min-w-0 min-h-0">
        {activeTab === "chat" && (
          <ChatView
            chatState={chatState}
            setChatState={setChatState}
            input={input}
            setInput={setInput}
            onOpenContext={handleOpenContext}
          />
        )}
        {activeTab === "overview" && <OverviewView />}
        {activeTab === "workspaces" && (
          <PersonalWorkspacesView
            workspaces={personalWorkspaces}
            onSelectWorkspace={handleOpenContext}
          />
        )}
        {contextPanel && <ContextPanel config={contextPanel} onClose={() => setContextPanel(null)} />}
      </div>
    </div>
  );
}
