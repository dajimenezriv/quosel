import type { Website } from '@/api/websites/use-get-website';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useEditorStore } from '@/core/editor/use-editor-store';
import type { Me } from '@/old/auth';
import { produce } from 'immer';
import { useState } from 'react';
import { ImageField } from '../image-field';
import { Field, Subgroup } from '../utils';
import { SetDomain } from './set-domain';

interface Props {
  user: Me | null;
  data: Website;
}

export function GeneralTab({ user, data }: Props) {
  const updateDraft = useEditorStore((s) => s.updateDraft);
  const [domainOpen, setDomainOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <Subgroup title="NAP consistency">
        <Field label="Business Name">
          <Input
            value={data.blocks.name}
            onChange={(e) => {
              updateDraft(
                produce(data, (draft) => {
                  draft.blocks.name = e.target.value;
                }),
              );
            }}
          />
        </Field>
        <Field label="Address">
          <Input
            value={data.blocks.address}
            onChange={(e) => {
              updateDraft(
                produce(data, (draft) => {
                  draft.blocks.address = e.target.value;
                }),
              );
            }}
          />
        </Field>
        <Field label="Phone">
          <Input
            value={data.blocks.phone}
            onChange={(e) => {
              updateDraft(
                produce(data, (draft) => {
                  draft.blocks.phone = e.target.value;
                }),
              );
            }}
          />
        </Field>
      </Subgroup>
      <Field label="Meta Title">
        <Input
          value={data.blocks.metaTitle}
          placeholder="Title shown in browser tabs and search results. Defaults to the website name."
          onChange={(e) => {
            updateDraft(
              produce(data, (draft) => {
                draft.blocks.metaTitle = e.target.value;
              }),
            );
          }}
        />
      </Field>
      <Field label="Meta Description">
        <Textarea
          value={data.blocks.metaDescription}
          placeholder="Short summary shown in search results."
          rows={3}
          onChange={(e) => {
            updateDraft(
              produce(data, (draft) => {
                draft.blocks.metaDescription = e.target.value;
              }),
            );
          }}
        />
      </Field>
      <Field label="Favicon">
        <ImageField
          user={user}
          value={data.blocks.logoUrl}
          onChange={(url) => {
            updateDraft(
              produce(data, (draft) => {
                draft.blocks.logoUrl = url;
              }),
            );
          }}
        />
      </Field>
      <Field label="Slug">
        <Input value={data.slug} disabled readOnly />
      </Field>
      <Field
        label="Custom domain"
        action={
          <button onClick={() => setDomainOpen(true)} className="text-primary cursor-pointer text-xs font-medium">
            Manage
          </button>
        }>
        <Input value={data.domain.replace(/^https?:\/\//, '')} disabled readOnly />
      </Field>

      {domainOpen && <SetDomain websiteId={data.id} currentDomain={data.domain} close={() => setDomainOpen(false)} />}

      <Field label="AI Context">
        <Textarea
          value={data.context}
          placeholder="Describe the business (what it offers, tone, audience). Used when generating field text."
          rows={4}
          onChange={(e) => {
            updateDraft(
              produce(data, (draft) => {
                draft.context = e.target.value;
              }),
            );
          }}
        />
      </Field>
    </div>
  );
}
