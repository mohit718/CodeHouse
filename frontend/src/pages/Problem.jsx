import confetti from "canvas-confetti";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Group, Panel, Separator } from "react-resizable-panels";
import { useNavigate, useParams } from "react-router";
import { CodeEditor, OutputPanel, ProblemDescription } from "../components";
import { LANGUAGE_CONFIG } from "../data/problems";
import { useProblemById } from "../hooks/useProblem";
import { executeCode } from "../libs/piston";
import { checkCodeOutput } from "../libs/utils";

export default function Problem() {
  const [currentProblem, setCurrentProblem] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(
    Object.keys(LANGUAGE_CONFIG)[0],
  );
  const [code, setCode] = useState("");
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const { data: problem, isLoading } = useProblemById(id);

  // update problem when URL param changes
  useEffect(() => {
    if (!isLoading) {
      setCurrentProblem(problem);
      setCode(problem?.starterCode[selectedLanguage] || "");
      setOutput(null);
    }
  }, [problem]);

  if (isLoading) {
    return null;
  }

  if (!problem) {
    navigate("/problems");
  }

  const handleProblemChange = (newProblemId) => {
    navigate(`/problem/${newProblemId}`);
  };

  const handleLanguageChange = (newLanguage) => {
    setSelectedLanguage(newLanguage);
    setCode(currentProblem?.starterCode?.[newLanguage] || "");
    setOutput(null);
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    setOutput(null);
  };

  const handleExecute = async () => {
    setIsRunning(true);
    setOutput(null);

    const result = await executeCode(selectedLanguage, code);

    setOutput(result);
    setIsRunning(false);

    if (result.success) {
      const expectedOutput =
        currentProblem.expectedOutput[selectedLanguage].trim();
      const actualOutput = (result.output || "").trim();
      const passed = checkCodeOutput(expectedOutput, actualOutput);
      if (passed) {
        toast.success("Test case passed!");
        confetti();
      } else {
        toast.error("Test case failed. Try again!");
      }
    } else {
      setOutput(`Error: ${result.error}`);
    }
  };

  return (
    <div className="bg-base-100 h-[calc(100vh-5rem)] flex flex-col">
      <div className="flex-1">
        <Group orientation="horizontal">
          <Panel defaultSize={50} minSize={30}>
            <ProblemDescription
              problem={currentProblem}
              onProblemChange={handleProblemChange}
            />
          </Panel>
          <Separator className="w-2 bg-base-300 hover:bg-primary transition-colors cursor-col-resize" />
          <Panel defaultSize={50} minSize={30}>
            <Group orientation="vertical" className="h-full">
              <Panel defaultSize={"80vh"} minSize={"40vh"}>
                <CodeEditor
                  code={code}
                  running={isRunning}
                  language={selectedLanguage}
                  onLanguageChange={handleLanguageChange}
                  onCodeChange={handleCodeChange}
                  onExecute={handleExecute}
                />
              </Panel>
              <Separator className="h-2 bg-base-300 hover:bg-primary transition-colors cursor-row-resize" />
              <Panel minSize={"10vh"}>
                <OutputPanel output={output} />
              </Panel>
            </Group>
          </Panel>
        </Group>
      </div>
    </div>
  );
}
