import { mergeAttributes } from '@tiptap/core';
import CodeBlock from '@tiptap/extension-code-block';

export const Code = CodeBlock.extend({
  name: 'codeBlock',
  content: 'text*',

  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: 'code-block',
      },
    };
  },

  // Define how code blocks should be parsed from HTML
  parseHTML() {
    return [
      {
        tag: 'pre.code-block',
        preserveWhitespace: 'full',
      },
    ];
  },

  // Define how code blocks should be rendered to HTML
  renderHTML({ HTMLAttributes, node }) {
    return [
      'pre',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { class: 'code-block' }),
      ['code', {}, node.textContent],
    ];
  },

  // Custom commands for toggling between Note and CodeBlock
  addCommands() {
    return {
      toggleCodeBlock: () => ({ editor, commands }) => {
        if (editor.isActive('codeBlock')) {
          return commands.setNode('note');
        }
        return commands.setNode('codeBlock');
      },
    };
  },

  addNodeView() {
    return ({ node, HTMLAttributes, getPos, editor }) => {
      // Create the DOM structure
      const dom = document.createElement('pre');

      // Use the HTMLAttributes for proper attribute merging
      Object.entries(HTMLAttributes).forEach(([key, value]) => {
        dom.setAttribute(key, value);
      });
      dom.classList.add('code-block');

      // Create the editable content area
      const content = document.createElement('code');
      content.textContent = node.textContent;
      dom.appendChild(content);

      return {
        dom,
        contentDOM: content,
        update: (updatedNode) => {
          if (updatedNode.type.name !== 'codeBlock') {
            return false;
          }
          content.textContent = updatedNode.textContent;
          return true;
        },
      };
    };
  },
});