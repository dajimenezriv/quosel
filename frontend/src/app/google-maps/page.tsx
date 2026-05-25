"use client";

import * as React from "react";
import { useNavigate } from "react-router-dom";
import { BaseLayout } from "@/components/layouts/base-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Page() {
  const [url, setUrl] = React.useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<Element>) {
    e.preventDefault();
    // TODO: backend call with url
    navigate("/editor");
  }

  return (
    <BaseLayout title="Google Maps">
      <div className="px-4 lg:px-6">
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-xl">
          <Input
            type="url"
            placeholder="https://maps.google.com/..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </BaseLayout>
  );
}
