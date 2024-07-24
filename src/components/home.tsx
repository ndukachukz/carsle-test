import CategoriesSelect from "./shared/categories-select";
import { Input } from "./ui/input";
import List from "./list";
import { useAuth } from "@/hooks/useAuth";

function Home() {
  const { user } = useAuth();
  return (
    <section>
      {user?.name}
      <div className=" mb-6 md:mb-16 flex flex-col-reverse md:flex-row gap-6 justify-between">
        <CategoriesSelect />

        <Input
          className="max-w-[372px] bg-secondary rounded-full"
          placeholder="Search"
        />
      </div>

      <List />
    </section>
  );
}

export default Home;
