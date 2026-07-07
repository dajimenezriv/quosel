import { buildRootStyles, HomepageBody, type TemplateData } from '@quosel/core/templates';
import Frame from 'react-frame-component';

const FRAME_INITIAL_CONTENT = `<!DOCTYPE html><html lang="es"><head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<base target="_blank">
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
</head><body><div class="frame-root"></div></body></html>`;

export function ContentFrame({ data }: { data: TemplateData }) {
  return (
    <div className="min-h-0 flex-1 bg-white">
      <Frame
        initialContent={FRAME_INITIAL_CONTENT}
        head={<style type="text/tailwindcss" dangerouslySetInnerHTML={{ __html: buildRootStyles(data) }} />}
        className="h-full w-full border-0">
        <HomepageBody data={data} />
      </Frame>
    </div>
  );
}
