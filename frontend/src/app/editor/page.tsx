'use client';

import * as React from 'react';
import { BaseLayout } from '@/components/layouts/base-layout';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarbershopTemplate } from './templates/barbershop';

export default function Page() {
  const [template, setTemplate] = React.useState('barbershop');

  return (
    <BaseLayout title="Editor">
      <div className="flex flex-col gap-6 px-4 lg:px-6">
        <Select value={template} onValueChange={setTemplate}>
          <SelectTrigger className="w-60">
            <SelectValue placeholder="Select template" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="barbershop">Barbershop</SelectItem>
          </SelectContent>
        </Select>
        {template === 'barbershop' && <BarbershopTemplate />}
      </div>
    </BaseLayout>
  );
}
