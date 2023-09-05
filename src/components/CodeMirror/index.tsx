import { defaultKeymap, insertTab } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { basicSetup } from 'codemirror';
import { useEffect, useRef } from 'react';

const script = `function run() {
  console.log(context.task.runTime)
}\n\n\n\n\n\n`;
interface ICodeMirror {
  language?: 'json' | 'javascript';
  value?: string;
  onChange?: (content: string) => void;
}

const Wap = (props: ICodeMirror) => {
  // 编辑器挂载点
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef || !editorRef.current) {
      return;
    }

    const defaultValue = props.value || script;
    // 初始状态
    const startState = EditorState.create({
      doc: props.language === 'json' ? JSON.stringify(defaultValue, null, 2) : defaultValue,
      extensions: [
        basicSetup,
        keymap.of([
          ...defaultKeymap,
          {
            key: 'Tab',
            run: insertTab,
          },
        ]),
        props.language === 'json' ? json() : javascript(),
        EditorView.updateListener.of((v) => {
          if (v.docChanged) {
            props.onChange?.(v.state.toJSON().doc);
          }
        }),
      ],
    });
    const view = new EditorView({
      state: startState,
      parent: editorRef.current,
    });
    return () => view.destroy();
  }, [editorRef]);

  return <div ref={editorRef} />;
};

export default Wap;
