import { Scissors, Clock, MapPin, Phone, Mail, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const services = [
  { name: 'Classic Haircut', price: '$25', duration: '30 min' },
  { name: 'Beard Trim', price: '$15', duration: '20 min' },
  { name: 'Hot Towel Shave', price: '$35', duration: '45 min' },
  { name: 'Hair + Beard Combo', price: '$45', duration: '60 min' },
  { name: 'Kids Cut', price: '$18', duration: '25 min' },
  { name: 'Hair Coloring', price: '$60', duration: '90 min' },
];

const barbers = [
  { name: 'Marcus Reed', role: 'Master Barber', years: 15 },
  { name: 'Diego Vargas', role: 'Senior Stylist', years: 10 },
  { name: 'Jamal Carter', role: 'Beard Specialist', years: 8 },
];

const testimonials = [
  {
    name: 'Tom H.',
    text: 'Best fade in town. Marcus knows his craft.',
    rating: 5,
  },
  {
    name: 'Andre L.',
    text: 'Hot towel shave is unmatched. Felt like royalty.',
    rating: 5,
  },
  {
    name: 'Kevin S.',
    text: 'Walked in scruffy, walked out sharp. Highly recommend.',
    rating: 5,
  },
];

export function BarbershopTemplate() {
  return (
    <div className="bg-background overflow-hidden rounded-lg border">
      {/* Header */}
      <header className="flex items-center justify-between border-b bg-zinc-900 px-8 py-4 text-zinc-100">
        <div className="flex items-center gap-2">
          <Scissors className="size-6" />
          <span className="text-xl font-bold tracking-wider">SHARP & CO.</span>
        </div>
        <nav className="hidden gap-6 text-sm md:flex">
          <a href="#services" className="hover:text-amber-400">
            Services
          </a>
          <a href="#about" className="hover:text-amber-400">
            About
          </a>
          <a href="#team" className="hover:text-amber-400">
            Team
          </a>
          <a href="#contact" className="hover:text-amber-400">
            Contact
          </a>
        </nav>
        <Button className="bg-amber-500 text-zinc-900 hover:bg-amber-400">Book Now</Button>
      </header>

      {/* Hero */}
      <section className="relative bg-zinc-900 px-8 py-24 text-center text-zinc-100">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 opacity-90" />
        <div className="relative mx-auto max-w-3xl">
          <p className="mb-4 text-sm tracking-[0.3em] text-amber-400 uppercase">Est. 1987</p>
          <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl">Classic Cuts. Modern Style.</h1>
          <p className="mb-8 text-lg text-zinc-300">
            Three generations of barbers crafting the perfect look. Walk in for a trim, leave with confidence.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-amber-500 text-zinc-900 hover:bg-amber-400">
              Book Appointment
            </Button>
            <Button size="lg" variant="outline" className="border-zinc-100 text-zinc-100 hover:bg-zinc-100 hover:text-zinc-900">
              View Services
            </Button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="px-8 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm tracking-[0.3em] text-amber-600 uppercase">What We Do</p>
            <h2 className="text-4xl font-bold">Services & Pricing</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Card key={s.name} className="border-2">
                <CardContent className="p-6">
                  <div className="mb-3 flex items-start justify-between">
                    <h3 className="text-lg font-semibold">{s.name}</h3>
                    <span className="text-xl font-bold text-amber-600">{s.price}</span>
                  </div>
                  <div className="text-muted-foreground flex items-center gap-1 text-sm">
                    <Clock className="size-4" />
                    {s.duration}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* About */}
      <section id="about" className="bg-zinc-50 px-8 py-20 dark:bg-zinc-900/50">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-2 text-sm tracking-[0.3em] text-amber-600 uppercase">Our Story</p>
            <h2 className="mb-6 text-4xl font-bold">A Cut Above</h2>
            <p className="text-muted-foreground mb-4">
              Founded in 1987 by Frank "The Razor" Sharp, our shop has been a cornerstone of the neighborhood for over three decades.
            </p>
            <p className="text-muted-foreground">
              We blend old-school technique with modern styles. Every chair, a tradition. Every cut, a craft.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-amber-500 p-8 text-center text-zinc-900">
              <div className="text-4xl font-bold">35+</div>
              <div className="text-sm tracking-wider uppercase">Years</div>
            </div>
            <div className="rounded-lg bg-zinc-900 p-8 text-center text-zinc-100">
              <div className="text-4xl font-bold">10K+</div>
              <div className="text-sm tracking-wider uppercase">Cuts</div>
            </div>
            <div className="rounded-lg bg-zinc-900 p-8 text-center text-zinc-100">
              <div className="text-4xl font-bold">5</div>
              <div className="text-sm tracking-wider uppercase">Barbers</div>
            </div>
            <div className="rounded-lg bg-amber-500 p-8 text-center text-zinc-900">
              <div className="text-4xl font-bold">★★★★★</div>
              <div className="text-sm tracking-wider uppercase">Rated</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="px-8 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm tracking-[0.3em] text-amber-600 uppercase">Meet The Crew</p>
            <h2 className="text-4xl font-bold">Our Barbers</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {barbers.map((b) => (
              <div key={b.name} className="text-center">
                <div className="mx-auto mb-4 flex size-32 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-800">
                  <Scissors className="size-12 text-zinc-500" />
                </div>
                <h3 className="text-lg font-semibold">{b.name}</h3>
                <p className="text-amber-600">{b.role}</p>
                <p className="text-muted-foreground text-sm">{b.years} years experience</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* Testimonials */}
      <section className="bg-zinc-50 px-8 py-20 dark:bg-zinc-900/50">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm tracking-[0.3em] text-amber-600 uppercase">Reviews</p>
            <h2 className="text-4xl font-bold">What Clients Say</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.name}>
                <CardContent className="p-6">
                  <div className="mb-3 flex gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="size-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{t.text}"</p>
                  <p className="font-semibold">— {t.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-zinc-900 px-8 py-20 text-zinc-100">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-2 text-sm tracking-[0.3em] text-amber-400 uppercase">Visit Us</p>
          <h2 className="mb-8 text-4xl font-bold">Stop By or Call Ahead</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center gap-2">
              <MapPin className="size-6 text-amber-400" />
              <p className="text-sm">123 Main Street</p>
              <p className="text-sm text-zinc-400">Brooklyn, NY 11201</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Phone className="size-6 text-amber-400" />
              <p className="text-sm">(555) 123-4567</p>
              <p className="text-sm text-zinc-400">Walk-ins welcome</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Mail className="size-6 text-amber-400" />
              <p className="text-sm">hello@sharpco.com</p>
              <p className="text-sm text-zinc-400">Reply within 24h</p>
            </div>
          </div>
          <Button size="lg" className="mt-10 bg-amber-500 text-zinc-900 hover:bg-amber-400">
            Book Your Cut
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-zinc-950 px-8 py-6 text-center text-sm text-zinc-500">
        <div className="flex items-center justify-center gap-2">
          <Scissors className="size-4" />
          <span>SHARP & CO. — © 1987 to present</span>
        </div>
      </footer>
    </div>
  );
}
