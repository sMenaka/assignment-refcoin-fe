import {  useState } from "react";

import {
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import DropDown from "./dropdown";
import { SearchDistricts } from "@/utils/data";

interface IStates {
  type: string;
  state: string;
  location: string;
}

interface IProp {
  onChangeType: (q: any) => void;
  onChangeState: (q: any) => void;
  onChangeLocation: (q: any) => void;
}

const status = [{ name: "--All Status--" }, { name: "Rent" }, { name: "Sale" }];

const types = [
  { name: "--All Types--" },
  { name: "Villa" },
  { name: "Family" },
  { name: "Single" },
];

const SearchBar = ({
  onChangeLocation,
  onChangeState,
  onChangeType,
}: IProp) => {
  const [searchParams, setSearchParams] = useState<IStates>({
    type: types[0].name,
    state: status[0].name,
    location: SearchDistricts[0].name,
  });
  const selectType = (e: any) => {
    setSearchParams({ ...searchParams, type: e.name });
    onChangeType(e.name);
  };
  const selectState = (e: any) => {
    setSearchParams({ ...searchParams, state: e.name });
    onChangeState(e.name);
  };

  const selectLocation = (e: any) => {
    setSearchParams({ ...searchParams, location: e.name });
    onChangeLocation(e.name);
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-5 pl-20">
        <div className="content-center">
          <div className="w-72">
            <DropDown onSelect={selectLocation} listItem={SearchDistricts} />
          </div>
        </div>

        <div className="content-center">
          <div className="w-72">
            <DropDown onSelect={selectType} listItem={types} />
          </div>
        </div>
        <div className="content-center">
          <div className="w-72">
            <DropDown onSelect={selectState} listItem={status} />
          </div>
        </div>
        <div>
          <button className="bg-blue-900 hover:bg-gray-400 text-white-800 font-bold py-2 px-4 rounded inline-flex items-center">
            <MagnifyingGlassIcon className="fill-current w-4 h-4 mr-2" />
            <span>Search</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
