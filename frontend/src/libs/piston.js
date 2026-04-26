const PISTON_URL = "/piston/v2";

const LANGUAGE_VERSIONS = {
  javascript: { language: "javascript", version: "20.11.1", ext: "js" },
  python: { language: "python", version: "3.9.4", ext: "py" },
  java: { language: "java", version: "15.0.2", ext: "java" },
  typescript: { language: "typescript", version: "4.2.3", ext: "ts" },
};

/**
 *
 * @param {string} language
 * @param {string} code
 * @returns {Promise<{success: boolean, output?: string, error?: string}>}
 */
export async function executeCode(language, code) {
  try {
    const languageConfig = LANGUAGE_VERSIONS[language];

    if (!languageConfig) {
      return { success: false, error: `Unsupported language: ${language}` };
    }


    const response = await fetch(`${PISTON_URL}/execute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...languageConfig,
        files: [{ name: `main.${languageConfig.ext}`, content: code }],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, error: errorData.message || "Execution failed" };
    }

    const data = await response.json();
    const output = data.run.output || "";
    const stderr = data.run.stderr || "";

    return { success: true, output, stderr };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
