/**
 * Utility functions for parsing and processing code transformations
 */

const parseTransformation = (text) => {
  try {
    return JSON.parse(text);
  } catch (error) {
    console.error('Parse error:', error);
    return null;
  }
};

const highlightDifferences = (original, translated) => {
  // Simple diff highlighting - can be enhanced with diffpatch library
  return {
    original,
    translated,
  };
};

module.exports = {
  parseTransformation,
  highlightDifferences,
};
