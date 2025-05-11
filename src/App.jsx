import { useState, useEffect } from "react";
import Split from "react-split";
import Header from "./components/Header";
import CodeEditorPane from "./components/CodeEditorPane";
import OutputPane from "./components/OutputPane";
import InputPane from "./components/InputPane";
import Footer from "./components/Footer";
import { executeCode } from "./services/codeService";
import { LANGUAGES, DEFAULT_CODE } from "./constants/editorConstants";
import "./styles/App.css";
import "./styles/Split.css";
import { analyzeCodeForInputs } from "./constants/codeAnalyzer";

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);
  const [code, setCode] = useState(DEFAULT_CODE[LANGUAGES[0].id]);
  const [output, setOutput] = useState("");
  const [input, setInput] = useState(""); // New state for user input
  const [isRunning, setIsRunning] = useState(false);
  const [stats, setStats] = useState({
    executionTime: null,
    memoryUsage: null,
  });
  const [theme, setTheme] = useState("dark");
  const [inputSuggestion, setInputSuggestion] = useState(null);
  const handleLanguageChange = (languageId) => {
    const language = LANGUAGES.find((lang) => lang.id === languageId);
    setSelectedLanguage(language);
    setCode(DEFAULT_CODE[languageId] || "");
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleInputChange = (newInput) => {
    setInput(newInput);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput("Running code...");
    setStats({ executionTime: null, memoryUsage: null });

    try {
      const response = await executeCode(code, selectedLanguage.id, input);
      setOutput(response.output);
      setStats({
        executionTime: response.executionTime,
        memoryUsage: response.memoryUsage,
      });
    } catch (error) {
      setOutput(`Error: ${error.message || "Failed to execute code"}`);
    } finally {
      setIsRunning(false);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const analysis = analyzeCodeForInputs(code, selectedLanguage.id);
    setInputSuggestion(analysis.suggestion);
  }, [code, selectedLanguage]);

  return (
    <div className={`app ${theme}`}>
      <Header
        selectedLanguage={selectedLanguage}
        onLanguageChange={handleLanguageChange}
        onRun={handleRunCode}
        isRunning={isRunning}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <div className="content">
        <Split
          sizes={[60, 40]}
          minSize={300}
          expandToMin={false}
          gutterSize={10}
          gutterAlign="center"
          snapOffset={30}
          dragInterval={1}
          direction="horizontal"
          cursor="col-resize"
          className="split-container"
        >
          <CodeEditorPane
            code={code}
            language={selectedLanguage}
            onChange={handleCodeChange}
            theme={theme}
          />
          <div className="right-pane">
            <Split
              sizes={[60, 40]}
              minSize={100}
              expandToMin={false}
              gutterSize={10}
              gutterAlign="center"
              snapOffset={30}
              dragInterval={1}
              direction="vertical"
              cursor="row-resize"
            >
              <OutputPane output={output} stats={stats} isRunning={isRunning} />
              <InputPane
                input={input}
                onInputChange={handleInputChange}
                language={selectedLanguage.id}
                suggestion={inputSuggestion}
              />
            </Split>
          </div>
        </Split>
      </div>
      <Footer />
    </div>
  );
}

export default App;
