import type { Log } from '../models/Log';
import type { JSONContent } from '@tiptap/react';

export function convertLogToJSONContent(log: Log): JSONContent {
  const content: JSONContent[] = [];
  content.push({
    type: "heading",
    attrs: { level: 1 },
    content: [{ type: "text", text: log.filename }]
  });
  return {
    type: "doc",
    content
  };
};

export function convertJSONContentToLog(log: Log, content: JSONContent): Log {
  content.content?.forEach((node) => {
    if (node.type === "heading") {
      log.filename = extractTextFromContent(node.content);
    }
  });
  return log;
};

function extractTextFromContent(content: JSONContent[] | undefined): string {
  if (!content || content.length === 0) {
    return "";
  }

  return content
    .map((node) => {
      if (node.type === "text") {
        return node.text || "";
      }
      if (node.content) {
        return extractTextFromContent(node.content);
      }
      return "";
    })
    .join("");
}