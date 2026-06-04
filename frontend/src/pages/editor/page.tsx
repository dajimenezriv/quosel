import { useGetWebsite } from '@/api/websites/use-get-website';
import { BaseLayout } from '@/components/layouts/base-layout';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BasicTemplate } from '@quosel/templates';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { BarbershopTemplate } from './templates/barbershop';

export default function Page() {
  const { websiteId } = useParams<{ websiteId: string }>();
  const [template, setTemplate] = React.useState('basic');

  const { data } = useGetWebsite(websiteId!);

  return (
    <BaseLayout title="Editor">
      <div className="flex flex-col gap-6">
        <Select value={template} onValueChange={setTemplate}>
          <SelectTrigger className="w-60">
            <SelectValue placeholder="Select template" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="basic">Basic</SelectItem>
            <SelectItem value="barbershop">Barbershop</SelectItem>
          </SelectContent>
        </Select>
        {template === 'basic' && data && <BasicTemplate data={data} />}
        {template === 'barbershop' && <BarbershopTemplate />}
      </div>
    </BaseLayout>
  );
}
