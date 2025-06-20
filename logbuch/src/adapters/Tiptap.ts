import type { Log } from '../models/Log';
import type { Note } from '../models/Note';
import type { JSONContent } from '@tiptap/react';

export function convertLogToJSONContent(log: Log): JSONContent {
  const content: JSONContent[] = [];
  log.notes.forEach((note: Note) => {
    content.push({
      type: "note",
      attrs: {
        id: note.id,
        createdAt: note.createdAt,
        class: 'note'
      },
      content: [{
        type: "text",
        text: note.text
      }]
    });
  });
  return {
    type: "doc",
    content
  };
};

export function convertJSONContentToLog(log: Log, content: JSONContent): Log {
  const notes: Note[] = [];
  content.content?.forEach((node) => {
    if (node.type === "note") {
      console.log("Note", node);
      notes.push({
        id: node.attrs?.id,
        createdAt: node.attrs?.createdAt,
        text: extractTextFromContent(node.content)
      });
    }
  });
  return {
    ...log,
    notes
  };
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