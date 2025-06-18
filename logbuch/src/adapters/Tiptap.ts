import type { Log } from '../models/Log';
import type { Note } from '../models/Note';
import type { JSONContent } from '@tiptap/react';

export function convertLogToJSONContent(log: Log): JSONContent {
  const content: JSONContent[] = [];
  log.notes.forEach((note: Note) => {
    // First, check if the note text contains any formatting information
    // If it's a simple string, we need to create a proper content structure
    let noteContent: JSONContent[] = [];
    
    // If the note already has rich text content stored
    if (note.content && Array.isArray(note.content)) {
      noteContent = note.content;
    } else {
      // Otherwise, create a simple text node
      noteContent = [{
        type: "text",
        text: note.text || ""
      }];
    }
    
    content.push({
      type: "note",
      attrs: {
        id: note.id,
        createdAt: note.createdAt,
        class: 'note'
      },
      content: noteContent
    });
  });
  
  return {
    type: "doc",
    content: content.length > 0 ? content : [{
      type: "note",
      attrs: {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        class: 'note'
      },
      content: [{
        type: "text",
        text: ""
      }]
    }]
  };
};

export function convertJSONContentToLog(log: Log, content: JSONContent): Log {
  const notes: Note[] = [];
  
  content.content?.forEach((node) => {
    if (node.type === "note") {
      const noteId = node.attrs?.id || crypto.randomUUID();
      const createdAt = node.attrs?.createdAt || new Date().toISOString();
      
      // Extract the plain text for backward compatibility
      const text = extractTextFromContent(node.content || []);
      
      // Store the complete content structure to preserve formatting
      notes.push({
        id: noteId,
        createdAt,
        text, // Plain text version
        content: node.content // Store the full content with formatting
      });
    }
  });
  
  return {
    ...log,
    notes
  };
};

// Helper function to extract plain text from formatted content
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