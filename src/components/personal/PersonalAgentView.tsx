import { useState, useCallback } from "react";
import type { PersonalTab, ChatDemoState, ContextConfig } from "../../personalTypes";
import PersonalAgentTopBar from "./PersonalAgentTopBar";
import ChatView from "./ChatView";
import OverviewView from "./OverviewView";
import ContextPanel from "./ContextPanel";
import Splitter from "../shared/Splitter";

export default function PersonalAgentView() {
  const [activeTab, setActiveTab] = useState<PersonalTab>("chat");
  const [chatState, setChatState] = useState<ChatDemoState>("morning_brief");
  const [contextPanel, setContextPanel] = useState<ContextConfig | null>(null);
  const [input, setInput] = useState("");
  const [contextWidth, setContextWidth] = useState(320);

  const handleContextResize = useCallback((delta: number) => {
    setContextWidth((w) => Math.min(500, Math.max(200, w - delta)));
  }, []);

  const handleToggleContext = () => {
    setContextPanel(
      contextPanel ? null : { type: "execution", title: "Контекст" }
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
        {contextPanel && (
          <>
            <Splitter onResize={handleContextResize} />
            <ContextPanel config={contextPanel} onClose={() => setContextPanel(null)} width={contextWidth} />
          </>
        )}
      </div>
    </div>
  );
}
