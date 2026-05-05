const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ 
  model: 'gemini-flash-latest',
  generationConfig: {
    temperature: 0.1, // Near-zero for strict structure
    topP: 0.8,
    topK: 40,
    maxOutputTokens: 8192, // Increased for deep detail
    responseMimeType: 'application/json',
  },
});

const SUPPORTED_LANGUAGES = [
  'Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'C#', 'Go', 'Rust', 'PHP', 'Ruby', 'Swift', 'Kotlin', 'R', 'MATLAB', 'SQL',
];

exports.translateCode = async (req, res) => {
  try {
    const { code, sourceLanguage, targetLanguage } = req.body;

    if (!code || !sourceLanguage || !targetLanguage) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['code', 'sourceLanguage', 'targetLanguage'],
      });
    }

    const prompt = `You are a Master DSA Instructor. Translate ${sourceLanguage} to ${targetLanguage} and generate ultra-detailed lab documentation.

OUTPUT RULES:
1. Return ONLY a valid JSON object.
2. Escape all double quotes inside strings with backslashes (\\").
3. Use \\n for newlines.

JSON STRUCTURE:
{
  "translatedCode": "...",
  "labExplanation": {
    "objective": "...",
    "algorithm": "...",
    "cleanCode": "...",
    "example": "...",
    "iterationTable": "Generate a raw HTML <table> string with class='iteration-table'. Do NOT use markdown.",
    "complexity": "...",
    "codeExplanation": {
      "totalFunctions": 0,
      "functionDetails": [{ "name": "...", "purpose": "...", "params": "...", "returns": "..." }],
      "variableUsage": [{ "name": "...", "type": "...", "role": "..." }]
    },
    "conclusion": "..."
  },
  "visualization": {
    "steps": [
      {
        "step": 1,
        "title": "...",
        "currentLine": "The exact line of code being executed in this step",
        "description": "Detailed explanation of this specific execution state and what changed",
        "variables": { "var": "val" },
        "mermaid": "graph LR\\nnode1((Value)) --> node2((Value))\\nstyle node1 fill:#667eea,stroke:#333,stroke-width:4px"
      }
    ]
  }
}

VISUALIZATION RULES:
- Use a step-by-step execution tracing format similar to Python Tutor, where the program is visualized one line at a time.
- For each step, include the currently executed line of code, the updated state of all variables, and a clear representation of the data structure in memory.
- Show pointer movements explicitly (e.g., which node temp or head is pointing to) and highlight what changed from the previous step.
- Ensure that only one small change is reflected per step to maintain clarity, and keep the output consistent and deterministic.
- IMPORTANT: Use specific Mermaid node shapes based on the data structure:
  - Linked Lists: Use circles (e.g., \`node1((Value))\`)
  - Arrays/Matrices: Use square boxes (e.g., \`node1[Value]\`)
  - Stacks/Queues: Use cylinders/database shape (e.g., \`node1[(Value)]\`)
  - Trees/Graphs: Use circles or rounded rectangles (e.g., \`node1(Value)\`)
- Highlight the node currently being accessed using: \`style nodeID fill:#667eea,color:#fff\`
- Make diagrams look like PythonTutor (nodes as shapes, arrows as pointers).

CODE TO ANALYZE:
${code}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let content = response.text();
    
    let translationData;
    try {
      translationData = JSON.parse(content);
    } catch (e) {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('Invalid Response');
      translationData = JSON.parse(jsonMatch[0].replace(/,\s*([\]\}])/g, '$1'));
    }

    return res.json({
      success: true,
      sourceLanguage,
      targetLanguage,
      ...translationData
    });
  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({
      error: 'Generation Error',
      message: 'Failed to generate ultra-detailed response. Try shorter code.',
      details: error.message
    });
  }
};

exports.getLanguages = (req, res) => {
  res.json({
    success: true,
    languages: SUPPORTED_LANGUAGES,
  });
};
