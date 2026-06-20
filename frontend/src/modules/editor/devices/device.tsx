import type { Website } from '@/api/websites/use-get-website';
import type { Device } from '@/core/editor/use-editor-store';
import { IPhoneDevice } from '@/modules/editor/devices/iphon-device';
import { SafariDevice } from '@/modules/editor/devices/safari-device';

interface Props {
  website: Website;
  device: Device;
}

export function Device({ website, device }: Props) {
  let domain = `https://sites.quosel.com/${website.slug}`;
  if (!website.publishedAt) domain += ' (Not published yet)';

  return (
    <>
      <div className="flex flex-1 items-center justify-center p-6">
        {device === 'laptop' ? <SafariDevice domain={domain} data={website} /> : <IPhoneDevice domain={domain} data={website} />}
      </div>
    </>
  );
}
