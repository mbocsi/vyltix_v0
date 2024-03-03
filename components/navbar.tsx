import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 h-12 w-full flex flex-row justify-between items-center px-32 bg-white bg-opacity-50 dark:bg-zinc-950 dark:bg-opacity-60 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-900">
      <Link href="/">Vyltix</Link>
    </nav>
  );
}
