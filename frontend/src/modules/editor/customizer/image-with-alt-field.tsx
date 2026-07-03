import { Input } from '@/components/ui/input';
import type { Me } from '@/old/auth';
import { ImageField } from './image-field';
import { Field } from './utils';

interface Props {
  user: Me | null;
  url: string;
  alt: string;
  onUrlChange: (url: string) => void;
  onAltChange: (alt: string) => void;
}

export function ImageWithAltField({ user, url, alt, onUrlChange, onAltChange }: Props) {
  return (
    <>
      <Field label="Image">
        <ImageField user={user} value={url} onChange={onUrlChange} />
      </Field>
      <Field label="Image description (alt)">
        <Input value={alt} placeholder="Describe the image for SEO" onChange={(e) => onAltChange(e.target.value)} />
      </Field>
    </>
  );
}
