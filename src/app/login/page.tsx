import AuthForm from "@/components/auth/form";

export default function Login() {

  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Welcome to Fetch
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                Help a lucky dog find their forever home today!
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <AuthForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
