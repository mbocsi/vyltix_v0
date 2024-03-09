import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { redirect } from "next/navigation";
import { ModeToggle } from "./mode-toggle";
import { currentUser } from "@clerk/nextjs";
import StyledUserButton from "./styled-userbutton";

export default async function Navbar() {
  const user = await currentUser();

  async function search(formData: FormData) {
    "use server";

    redirect(`/search?query=${formData.get("query")}`);
  }
  return (
    <nav className="fixed top-0 h-12 w-full flex flex-row gap-4 justify-between items-center px-24 bg-white bg-opacity-50 dark:bg-zinc-950 dark:bg-opacity-60 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-900 z-10">
      <Link href="/">
        <p className="text-2xl pr-8">Vyltix</p>
      </Link>
      <div className="w-full flex flex-row justify-between items-center">
        <div className="flex flex-row gap-8 items-center">
          <form
            action={search}
            className="flex flex-row items-center border border-zinc-300 dark:border-zinc-800 rounded-full"
          >
            <button
              type="submit"
              value="Submit"
              className="rounded-ful p-3 duration-200 ml-0"
            >
              <FaSearch size="1em" />
            </button>
            <input
              name="query"
              className="focus:outline-none bg-transparent pr-2"
              placeholder="Search"
            ></input>
          </form>

          <Link href="/concerts">Concerts</Link>
          <Link href="/artists">Artists</Link>
          <Link href="/venues">Venues</Link>
        </div>
        <div className="flex flex-row items-center gap-4">
          {!user ? <Link href="/sign-in">Login</Link> : <StyledUserButton />}
          <ModeToggle></ModeToggle>
        </div>
      </div>
    </nav>
  );
}
