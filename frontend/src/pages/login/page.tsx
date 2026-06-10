import loginIllustration from '@/assets/login.png';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/old/auth';

export default function Page() {
  const { login } = useAuth();

  return (
    <div className="flex h-screen w-screen flex-col bg-[#262624] text-white">
      <header className="flex items-center p-6">
        <Logo size={36} />
      </header>
      <main className="flex min-h-0 flex-1">
        <div className="flex w-1/2 items-center justify-center pb-16">
          <div className="flex w-full max-w-xs flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-3 text-center">
              <h1 className="font-serif text-4xl font-bold">Welcome back</h1>
              <p className="text-sm text-neutral-400">Login to your Quosel account</p>
            </div>
            <Button type="button" onClick={login} className="w-full cursor-pointer rounded-full bg-white text-black hover:bg-white/90">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Login with Google
            </Button>
          </div>
        </div>
        <div className="flex w-1/4 items-center justify-center">
          <img src={loginIllustration} className="h-full max-w-none" />
        </div>
      </main>
    </div>
  );
}
