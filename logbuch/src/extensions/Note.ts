import { mergeAttributes, Node } from '@tiptap/core'

export interface NoteOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    note: {
      setNote: () => ReturnType,
    }
  }
}

export const Note = Node.create<NoteOptions>({
  name: 'note',
  group: 'block',
  content: 'inline*',
  defining: true,
  priority: 1000,

  addOptions() {
    return {
      HTMLAttributes: {
        class: 'note',
      },
    }
  },

  addAttributes() {
    return {
      id: {
        default: () => crypto.randomUUID(),
        parseHTML: (element) => element.getAttribute("data-id"),
        renderHTML: (attributes) => ({ "data-id": attributes.id }),
      },
      createdAt: {
        default: () => new Date().toISOString(),
        parseHTML: (element) => element.getAttribute("data-created-at"),
        renderHTML: (attributes) => ({
          "data-created-at": attributes.createdAt,
        }),
      },
    };
  },

  parseHTML() {
    return [
      { tag: 'div.note' },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setNote: () => ({ commands }) => {
        return commands.setNode(this.name)
      },
    }
  },

  addKeyboardShortcuts() {
    return {
      Enter: () => {
        if (this.editor.isActive(this.name)) {
          this.editor.commands.splitBlock();
          this.editor.commands.updateAttributes(this.name, {
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString()
          });
          return true;
        }
        return false;
      }
    }
  },
})