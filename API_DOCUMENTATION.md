Node.js Express Backend - Code Translator API

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication
Currently no authentication required. For production, add JWT or API key auth.

### Endpoints

#### 1. Translate Code
Translate code from one language to another with detailed transformation breakdown.

**Endpoint:** `POST /api/translate`

**Request:**
```json
{
  "code": "def greet(name):\n    return f'Hello, {name}!'",
  "sourceLanguage": "Python",
  "targetLanguage": "JavaScript"
}
```

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| code | string | Yes | Source code to translate (max 10000 chars) |
| sourceLanguage | string | Yes | Programming language of source code |
| targetLanguage | string | Yes | Programming language for translation |

**Success Response (200):**
```json
{
  "success": true,
  "sourceLanguage": "Python",
  "targetLanguage": "JavaScript",
  "translatedCode": "function greet(name) {\n  return `Hello, ${name}!`;\n}",
  "lineByLineTransformation": [
    {
      "originalLine": "def greet(name):",
      "translatedLine": "function greet(name) {",
      "explanation": "Python function definition converted to JavaScript function declaration"
    },
    {
      "originalLine": "    return f'Hello, {name}!'",
      "translatedLine": "  return `Hello, ${name}!`;",
      "explanation": "Python f-string converted to JavaScript template literal with backticks"
    }
  ],
  "summary": "Successfully translated Python function to JavaScript with equivalent functionality..."
}
```

**Error Response (400):**
```json
{
  "error": "Missing required fields",
  "required": ["code", "sourceLanguage", "targetLanguage"]
}
```

**Error Response (400 - Same Language):**
```json
{
  "error": "Source and target languages must be different"
}
```

**Error Response (500 - API Error):**
```json
{
  "error": "Translation failed",
  "message": "Error message details..."
}
```

#### 2. Get Supported Languages
Retrieve list of all supported programming languages.

**Endpoint:** `GET /api/languages`

**Response (200):**
```json
{
  "success": true,
  "languages": [
    "Python",
    "JavaScript",
    "TypeScript",
    "Java",
    "C++",
    "C#",
    "Go",
    "Rust",
    "PHP",
    "Ruby",
    "Swift",
    "Kotlin",
    "R",
    "MATLAB",
    "SQL"
  ]
}
```

#### 3. Health Check
Check if the server is running.

**Endpoint:** `GET /health`

**Response (200):**
```json
{
  "status": "Server is running"
}
```

## Rate Limiting
Currently unlimited. For production, implement:
- Per-minute requests limit
- Per-IP rate limiting
- OpenAI API quota management

## Code Size Limits
- Maximum code length: 10,000 characters
- Recommended: < 500 lines per translation

## Response Times
- Average: 3-8 seconds
- Depends on code complexity and OpenAI API load

## Error Codes
| Code | Message | Solution |
|------|---------|----------|
| 400 | Missing required fields | Include code, sourceLanguage, targetLanguage |
| 400 | Same languages | Choose different source and target |
| 401 | Unauthorized | Check API key |
| 429 | Too many requests | Wait before retrying |
| 500 | Server error | Check server logs |
| 503 | Service unavailable | OpenAI API might be down |

## Example Usage with cURL

```bash
curl -X POST http://localhost:5000/api/translate \
  -H "Content-Type: application/json" \
  -d '{
    "code": "print(\"Hello, World!\")",
    "sourceLanguage": "Python",
    "targetLanguage": "JavaScript"
  }'
```

## Example Usage with Python

```python
import requests

url = "http://localhost:5000/api/translate"
data = {
    "code": "print('Hello, World!')",
    "sourceLanguage": "Python",
    "targetLanguage": "JavaScript"
}

response = requests.post(url, json=data)
result = response.json()

print(result["translatedCode"])
for transformation in result["lineByLineTransformation"]:
    print(f"Original: {transformation['originalLine']}")
    print(f"Translated: {transformation['translatedLine']}")
    print(f"Explanation: {transformation['explanation']}\n")
```

## Example Usage with JavaScript

```javascript
const axios = require('axios');

const data = {
  code: "console.log('Hello, World!');",
  sourceLanguage: "JavaScript",
  targetLanguage: "Python"
};

axios.post('http://localhost:5000/api/translate', data)
  .then(response => {
    console.log(response.data.translatedCode);
    response.data.lineByLineTransformation.forEach(line => {
      console.log(`Original: ${line.originalLine}`);
      console.log(`Translated: ${line.translatedLine}`);
    });
  })
  .catch(error => console.error(error));
```

## Best Practices

1. **Code Quality**: Ensure source code is valid and well-formatted
2. **Comments**: Include comments for better translation context
3. **Size**: Keep code under 500 lines for faster translation
4. **Error Handling**: Always handle API errors gracefully
5. **Caching**: Cache translations to avoid redundant API calls
6. **Testing**: Test critical translations manually

## CORS Policy
Currently allows all origins. For production:
```javascript
cors({
  origin: 'https://yourdomain.com',
  credentials: true
})
```

## Security Considerations
- Implement API key authentication
- Add request size limits
- Use HTTPS in production
- Sanitize user input
- Rate limit per IP/user
- Log all translation requests

## Deployment
For production deployment:
1. Set NODE_ENV=production
2. Use HTTPS/SSL certificate
3. Implement proper authentication
4. Add database for history/analytics
5. Use environment variables for all secrets
6. Enable comprehensive logging
7. Set up monitoring and alerts
