import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="flex top-0 left-0 w-full fixed justify-between p-4 bg-white/70 backdrop-blur-lg shadow-md z-50">
      <h1 className="font-bold">Salary</h1>
      <div className="flex gap-4 font-extralight text-sm">
        <Link href="/">Home</Link>
      </div>
    </nav>
  );
}
