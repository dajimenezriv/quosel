import { createRoot } from 'react-dom/client';
import { circoloPopolareBlocks } from './examples/circolo-popolare';
import { claudeStyles } from './styles';
import { buildRootStyles, TemplateBody } from './template';

const data = { blocks: circoloPopolareBlocks, styles: claudeStyles };

const style = document.createElement('style');
style.textContent = buildRootStyles(data);
document.head.appendChild(style);

createRoot(document.getElementById('root')!).render(<TemplateBody data={data} />);
