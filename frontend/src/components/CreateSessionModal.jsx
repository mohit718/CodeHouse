import { Code2Icon, LoaderIcon, PlusIcon } from "lucide-react";
import { useProblem } from "../hooks/useProblem";
import { useState } from "react";

export default function CreateSessionModal({
  isOpen,
  onClose,
  onCreate,
  isCreating,
}) {
  const { data: problems, isLoading } = useProblem();
  const [selectedProblem, setSelectedProblem] = useState(null);

  if (isLoading || !isOpen) return null;

  const handleProblemChange = (problemId) => {
    const newProblem = problems.find((p) => p._id == problemId);
    setSelectedProblem(newProblem);
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <h3 className="font-bold text-2xl mb-6">Create New Session</h3>

        <div className="space-y-8">
          {/* PROBLEM SELECTION */}
          <div className="space-y-2">
            <label className="label">
              <span className="label-text font-semibold">Select Problem</span>
              <span className="label-text-alt text-error">*</span>
            </label>

            <select
              className="select w-full"
              value={selectedProblem?._id}
              onChange={(e) => handleProblemChange(e.target.value)}
            >
              <option value="" disabled>
                Choose a coding problem...
              </option>

              {problems.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.title} ({p.difficulty})
                </option>
              ))}
            </select>
          </div>

          {/* ROOM SUMMARY */}
          {selectedProblem && (
            <div className="alert alert-success">
              <Code2Icon className="size-5" />
              <div>
                <p className="font-semibold">Room Summary:</p>
                <p>
                  Problem:{" "}
                  <span className="font-medium">{selectedProblem.title}</span>
                </p>
                <p>
                  Max Participants:{" "}
                  <span className="font-medium">2 (1-on-1 session)</span>
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>

          <button
            className="btn btn-primary gap-2"
            onClick={() => onCreate(selectedProblem._id)}
            disabled={isCreating || !selectedProblem}
          >
            {isCreating ? (
              <LoaderIcon className="size-5 animate-spin" />
            ) : (
              <PlusIcon className="size-5" />
            )}

            {isCreating ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
}
