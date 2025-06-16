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

  parseHTML() {
    return [
      { tag: 'div.note' },
      { tag: 'p.note' }
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
      Enter: () => this.editor.commands.splitBlock(),
    }
  },
})