import { VerificationIcon } from "@/assets/icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import Call from "./call";

const ListItem = ({ id, isAgent, name, photo_url }: User) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="rounded overflow-clip ">
          <img src={photo_url} alt="" className="object-contain" />

          <div className="bg-secondary p-2">
            <h2 className="flex items-center justify-between text-xs font-semibold text-primary">
              {name}
              <VerificationIcon className="size-4" />
            </h2>

            <p className="text-[10px] font-thin">Leadership & Business</p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Call Consult</DialogTitle>
          <DialogDescription>Place call to {name}</DialogDescription>
        </DialogHeader>

        <div>
          <Call receiverId={id} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ListItem;
