import { useState } from "react";
import { Plus, ChevronDown, AlertTriangle } from "lucide-react";
import type { SpaceAccessType, SpaceMember, SpaceMemberRole } from "../../workspaceTypes";

interface Props {
  accessType: SpaceAccessType;
  members: SpaceMember[];
  currentUserRole: SpaceMemberRole;
  onChangeAccessType: (type: SpaceAccessType) => void;
  onChangeRole: (memberId: string, role: SpaceMemberRole | "remove") => void;
  onInvite: () => void;
}

const accessTypeLabels: Record<SpaceAccessType, string> = {
  personal: "Персональный",
  "shared-context": "Общий контекст",
  "shared-sessions": "Общие сессии",
};

const accessTypeDescriptions: Record<SpaceAccessType, string> = {
  personal: "Видно только вам",
  "shared-context": "Участники видят агентов и документы. Сессии у каждого свои",
  "shared-sessions": "Всё общее, включая сессии участников",
};

const roleLabels: Record<SpaceMemberRole, string> = {
  owner: "Владелец",
  admin: "Администратор",
  member: "Участник",
};

export default function SpaceAccessSection({ accessType, members, currentUserRole, onChangeAccessType, onChangeRole, onInvite }: Props) {
  const [editing, setEditing] = useState(false);
  const [pendingType, setPendingType] = useState<SpaceAccessType>(accessType);
  const [showDowngradeWarning, setShowDowngradeWarning] = useState(false);
  const [openRoleDropdown, setOpenRoleDropdown] = useState<string | null>(null);

  const isOwner = currentUserRole === "owner";
  const showMembers = accessType !== "personal";

  function handleSaveAccessType() {
    // Check if downgrading
    if (
      (accessType === "shared-sessions" && pendingType !== "shared-sessions") ||
      (accessType === "shared-context" && pendingType === "personal")
    ) {
      setShowDowngradeWarning(true);
    } else {
      onChangeAccessType(pendingType);
      setEditing(false);
    }
  }

  function confirmDowngrade() {
    onChangeAccessType(pendingType);
    setShowDowngradeWarning(false);
    setEditing(false);
  }

  return (
    <div>
      <h3 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-3">Доступ</h3>

      {/* Access type */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-xs font-medium text-gray-700">Тип доступа</p>
            {!editing && (
              <p className="text-xs text-gray-500 mt-0.5">{accessTypeLabels[accessType]} — {accessTypeDescriptions[accessType]}</p>
            )}
          </div>
          {isOwner && !editing && (
            <button
              onClick={() => { setEditing(true); setPendingType(accessType); }}
              className="text-xs text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
            >
              Изменить
            </button>
          )}
        </div>

        {editing && (
          <div className="space-y-2 bg-gray-50 rounded-lg p-3">
            {(["personal", "shared-context", "shared-sessions"] as SpaceAccessType[]).map((type) => (
              <label key={type} className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="radio"
                  name="accessType"
                  checked={pendingType === type}
                  onChange={() => setPendingType(type)}
                  className="mt-0.5 accent-gray-900"
                />
                <div>
                  <p className="text-xs font-medium text-gray-700">{accessTypeLabels[type]}</p>
                  <p className="text-[11px] text-gray-500">{accessTypeDescriptions[type]}</p>
                </div>
              </label>
            ))}
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setEditing(false)}
                className="px-3 py-1.5 text-xs text-gray-500 hover:text-gray-700 cursor-pointer transition-colors"
              >
                Отмена
              </button>
              <button
                onClick={handleSaveAccessType}
                className="px-3 py-1.5 text-xs text-white bg-gray-900 hover:bg-gray-800 rounded-lg cursor-pointer transition-colors"
              >
                Сохранить
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Members */}
      {showMembers && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-gray-700">Участники</p>
            {(isOwner || currentUserRole === "admin") && (
              <button
                onClick={onInvite}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Пригласить
              </button>
            )}
          </div>
          <div className="space-y-1">
            {members.map((member) => (
              <div key={member.id} className="flex items-center gap-3 px-3 py-2.5 bg-gray-50 rounded-lg">
                <div className={`w-7 h-7 rounded-full ${member.avatarColor} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                  {member.avatarInitial}
                </div>
                <span className="text-xs text-gray-700 flex-1">{member.name}</span>

                {member.role === "owner" ? (
                  <span className="text-[10px] text-gray-400 font-medium">{roleLabels[member.role]}</span>
                ) : isOwner ? (
                  <div className="relative">
                    <button
                      onClick={() => setOpenRoleDropdown(openRoleDropdown === member.id ? null : member.id)}
                      className="flex items-center gap-1 text-[10px] text-gray-500 hover:text-gray-700 cursor-pointer"
                    >
                      {roleLabels[member.role]}
                      <ChevronDown className="w-3 h-3" />
                    </button>
                    {openRoleDropdown === member.id && (
                      <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
                        {(["admin", "member"] as SpaceMemberRole[]).map((role) => (
                          <button
                            key={role}
                            onClick={() => { onChangeRole(member.id, role); setOpenRoleDropdown(null); }}
                            className={`w-full text-left px-3 py-1.5 text-xs hover:bg-gray-50 cursor-pointer ${
                              member.role === role ? "text-gray-900 font-medium" : "text-gray-600"
                            }`}
                          >
                            {roleLabels[role]}
                          </button>
                        ))}
                        <div className="border-t border-gray-100 mt-1 pt-1">
                          <button
                            onClick={() => { onChangeRole(member.id, "remove"); setOpenRoleDropdown(null); }}
                            className="w-full text-left px-3 py-1.5 text-xs text-red-500 hover:bg-red-50 cursor-pointer"
                          >
                            Удалить из пространства
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <span className="text-[10px] text-gray-400">{roleLabels[member.role]}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Downgrade warning modal */}
      {showDowngradeWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 animate-modal-enter">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <h3 className="text-sm font-semibold text-gray-900">Изменение типа доступа</h3>
            </div>
            <p className="text-xs text-gray-600 mb-6">
              Сессии других участников перейдут в режим «только чтение». Переназначить их можно в разделе «История».
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowDowngradeWarning(false)}
                className="px-4 py-2 text-xs text-gray-600 hover:text-gray-800 cursor-pointer"
              >
                Отмена
              </button>
              <button
                onClick={confirmDowngrade}
                className="px-4 py-2 text-xs text-white bg-gray-900 hover:bg-gray-800 rounded-lg cursor-pointer"
              >
                Изменить тип
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
