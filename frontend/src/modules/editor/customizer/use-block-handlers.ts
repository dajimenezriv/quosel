import { useEditorStore } from '@/core/editor/use-editor-store';
import type { Blocks, WebsiteData } from '@quosel/templates';
import { produce } from 'immer';

type Block = Blocks['blocks'][number];

export function useBlockHandlers<T extends Block>(data: WebsiteData, index: number) {
  const updateDraft = useEditorStore((s) => s.updateDraft);

  function updateBlock(updater: (block: T) => void) {
    updateDraft(
      produce(data, (draft) => {
        updater(draft.blocks.blocks[index] as T);
      }),
    );
  }

  function handleInput(updater: (block: T, value: string) => void) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      updateBlock((block) => updater(block, e.target.value));
    };
  }

  function handleTextArea(updater: (block: T, value: string) => void) {
    return (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      updateBlock((block) => updater(block, e.target.value));
    };
  }

  return { updateBlock, handleInput, handleTextArea };
}
