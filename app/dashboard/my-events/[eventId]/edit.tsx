import { CgAddR } from "react-icons/cg";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";

export default function Edit({
  func,
  edit,
  setEdit,
}: {
  func: Function;
  edit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
}) {
  if (edit) {
    return (
      <>
        <Button
          className="flex px-1 py-1 rounded-md flex-row items-center gap-1 h-min"
          onClick={() => {
            func();
            setEdit((prev) => !prev);
          }}
          variant="default"
        >
          <CgAddR size={16} />
          <p className="whitespace-nowrap text-xs">Save</p>
        </Button>
        <Button
          className="flex px-1 py-1 rounded-md flex-row items-center gap-1 h-min"
          onClick={() => {
            setEdit((prev) => !prev);
          }}
          variant="destructive"
        >
          <p className="whitespace-nowrap text-xs">Discard Changes</p>
        </Button>
      </>
    );
  } else {
    return (
      <Button
        className="flex px-1 py-1 rounded-md flex-row items-center gap-1 h-min"
        onClick={() => {
          setEdit((prev) => !prev);
        }}
        variant="secondary"
      >
        <CgAddR size={16} />
        <p className="whitespace-nowrap text-xs">Edit</p>
      </Button>
    );
  }
}
