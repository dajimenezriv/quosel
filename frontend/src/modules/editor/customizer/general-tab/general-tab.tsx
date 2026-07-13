import type { Website } from '@/api/websites/use-get-website';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useEditorStore } from '@/core/editor/use-editor-store';
import type { Me } from '@/old/auth';
import { BUSINESS_TYPES, type Blocks } from '@quosel/core/templates';
import { produce } from 'immer';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { ImageField } from '../image-field';
import { Field, Subgroup } from '../utils';
import { OpeningHours } from './opening-hours';
import { SetDomain } from './set-domain';

interface Props {
  user: Me | null;
  data: Website;
}

export function GeneralTab({ user, data }: Props) {
  const updateDraft = useEditorStore((s) => s.updateDraft);
  const [domainOpen, setDomainOpen] = useState(false);

  const update = (fn: (blocks: Blocks) => void) => {
    updateDraft(
      produce(data, (draft) => {
        fn(draft.blocks);
      }),
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <Subgroup title="NAP consistency">
        <Field label="Business Name">
          <Input
            value={data.blocks.name}
            onChange={(e) => {
              update((blocks) => {
                blocks.name = e.target.value;
              });
            }}
          />
        </Field>
        <Field label="Business Type">
          <Select
            value={data.blocks.businessType}
            onChange={(e) => {
              update((blocks) => {
                blocks.businessType = e.target.value as Blocks['businessType'];
              });
            }}>
            {BUSINESS_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Street">
          <Input
            value={data.blocks.address.street}
            placeholder="40-41 Rathbone Pl"
            onChange={(e) => {
              update((blocks) => {
                blocks.address.street = e.target.value;
              });
            }}
          />
        </Field>
        <div className="flex gap-2">
          <Field label="City">
            <Input
              value={data.blocks.address.locality}
              placeholder="London"
              onChange={(e) => {
                update((blocks) => {
                  blocks.address.locality = e.target.value;
                });
              }}
            />
          </Field>
          <Field label="Postcode">
            <Input
              value={data.blocks.address.postalCode}
              placeholder="W1T 1HX"
              onChange={(e) => {
                update((blocks) => {
                  blocks.address.postalCode = e.target.value;
                });
              }}
            />
          </Field>
        </div>
        <div className="flex gap-2">
          <Field label="Region">
            <Input
              value={data.blocks.address.region}
              placeholder="Optional"
              onChange={(e) => {
                update((blocks) => {
                  blocks.address.region = e.target.value;
                });
              }}
            />
          </Field>
          <Field label="Country">
            <Input
              value={data.blocks.address.country}
              placeholder="UK"
              onChange={(e) => {
                update((blocks) => {
                  blocks.address.country = e.target.value;
                });
              }}
            />
          </Field>
        </div>
        <Field label="Phone">
          <Input
            value={data.blocks.phone}
            onChange={(e) => {
              update((blocks) => {
                blocks.phone = e.target.value;
              });
            }}
          />
        </Field>
      </Subgroup>

      <OpeningHours data={data} />

      <Subgroup title="Local SEO">
        <p className="text-muted-foreground text-[11px] leading-relaxed">
          Coordinates and profile links are not shown on the page. They tell search engines exactly where you are, and that your Instagram,
          TripAdvisor and Facebook pages are all the same business as this site.
        </p>
        <div className="flex gap-2">
          <Field label="Latitude">
            <Input
              value={data.blocks.geo.latitude}
              placeholder="51.517189"
              onChange={(e) => {
                update((blocks) => {
                  blocks.geo.latitude = e.target.value;
                });
              }}
            />
          </Field>
          <Field label="Longitude">
            <Input
              value={data.blocks.geo.longitude}
              placeholder="-0.134513"
              onChange={(e) => {
                update((blocks) => {
                  blocks.geo.longitude = e.target.value;
                });
              }}
            />
          </Field>
        </div>
        <Field label="Price Range">
          <Input
            value={data.blocks.priceRange}
            placeholder="££"
            onChange={(e) => {
              update((blocks) => {
                blocks.priceRange = e.target.value;
              });
            }}
          />
        </Field>
        <Field label="Profile Links">
          <div className="flex flex-col gap-2">
            {data.blocks.sameAs.map((url, i) => (
              <div key={i} className="flex items-center gap-2">
                <Input
                  value={url}
                  placeholder="https://www.instagram.com/…"
                  onChange={(e) => {
                    update((blocks) => {
                      blocks.sameAs[i] = e.target.value;
                    });
                  }}
                />
                <button
                  onClick={() =>
                    update((blocks) => {
                      blocks.sameAs.splice(i, 1);
                    })
                  }
                  className="text-muted-foreground hover:text-destructive cursor-pointer">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                update((blocks) => {
                  blocks.sameAs.push('');
                })
              }>
              <Plus className="h-4 w-4" />
              Add profile
            </Button>
          </div>
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
