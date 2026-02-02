export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl">
        <h1 className="flex justify-center text-2xl font-bold mt-4">Sign in</h1>
        <form className="flex flex-col gap-6 p-6">
          <label className="flex flex-col gap-2">
            Email
            <input type="email" className="rounded-md border border-gray-500 px-4" />
          </label>
          <label className="flex flex-col gap-2">
            Password
            <input type="password" className="rounded-md border border-gray-500 px-4" />
          </label>
          <button className="rounded-lg bg-black px-4 py-2 text-white">
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
}
