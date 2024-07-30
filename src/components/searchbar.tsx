import { FaSearch } from "react-icons/fa";
import { redirect } from "next/navigation";

export default function SearchBar(props: any) {
  const { placeholder, href, bg } = props;

  async function search(formData: FormData) {
    "use server";

    redirect(`${href}?query=${formData.get("searchText")}`);
  }
  return (
    <form
      action={search}
      className={`p-2 rounded-full ${bg}
      } w-1/2 flex flex-row items-center border-2 backdrop-blur-md dark:border-zinc-700`}
    >
      <button
        type="submit"
        value="Submit"
        className="rounded-ful bg-opacity-0 p-3 hover:bg-opacity-50 duration-200 ml-0"
      >
        <FaSearch size="2em" />
      </button>
      <input
        className="focus:outline-none text-3xl bg-transparent w-full"
        name="searchText"
        placeholder={placeholder}
      ></input>
    </form>
  );
}
