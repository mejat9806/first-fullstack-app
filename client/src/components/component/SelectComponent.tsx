import { UserContext } from "@/context/userContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcnComponent/ui/select";
import { useContext } from "react";

const SelectComponent = () => {
  const { setFetchType } = useContext(UserContext);
  return (
    <Select onValueChange={(newValue) => setFetchType(newValue)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Popular"></SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="popular" defaultChecked>
          Popular
        </SelectItem>
        <SelectItem value="recent">Recent</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectComponent;
