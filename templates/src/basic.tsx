import type { WebsiteData } from "./types";

export function BasicTemplate({ data }: { data: WebsiteData }) {
  return (
    <div className="min-h-screen bg-white font-sans">
      <header className="bg-zinc-900 px-8 py-20 text-center text-white">
        <h1 className="text-5xl font-bold tracking-tight">{data.place.name}</h1>
        {data.place.rating !== null && (
          <p className="mt-4 text-lg text-amber-400">
            ★ {data.place.rating} · {data.place.userRatingCount} reviews
          </p>
        )}
      </header>
      <main className="mx-auto max-w-xl px-8 py-16 text-center">
        <p className="text-lg text-zinc-600">{data.place.formattedAddress}</p>
        {data.place.internationalPhoneNumber && (
          <p className="mt-2 text-zinc-500">
            {data.place.internationalPhoneNumber}
          </p>
        )}
      </main>
    </div>
  );
}
