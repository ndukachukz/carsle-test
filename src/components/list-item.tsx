import { VerificationIcon } from "@/assets/icons";
import { useAppStore } from "@/store/app-store";

const ListItem = ({ id, name, photo_url }: User) => {
  const { setCallDialog } = useAppStore();

  return (
    <div
      className="rounded overflow-clip cursor-pointer"
      onClick={() => {
        setCallDialog(true, id);
      }}
    >
      <img src={photo_url} alt="" className="object-contain" />

      <div className="bg-secondary p-2">
        <h2 className="flex items-center justify-between text-xs font-semibold text-primary">
          {name}
          <VerificationIcon className="size-4" />
        </h2>

        <p className="text-[10px] font-thin">Leadership & Business</p>
      </div>
    </div>
  );
};

export default ListItem;
