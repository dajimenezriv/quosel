import type { WebsiteData } from '@/api/websites/use-update-website';
import { useEditorStore } from '@/core/editor/use-editor-store';
import type { Blocks } from '@quosel/core/templates';
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

  function removeBlock() {
    updateDraft(
      produce(data, (draft) => {
        draft.blocks.blocks.splice(index, 1);
      }),
    );
  }

  function moveBlock(offset: -1 | 1) {
    updateDraft(
      produce(data, (draft) => {
        const [block] = draft.blocks.blocks.splice(index, 1);
        draft.blocks.blocks.splice(index + offset, 0, block);
      }),
    );
  }

  const moveUp = index > 0 ? () => moveBlock(-1) : undefined;
  const moveDown = index < data.blocks.blocks.length - 1 ? () => moveBlock(1) : undefined;

  return { updateBlock, handleInput, handleTextArea, removeBlock, moveUp, moveDown };
}
