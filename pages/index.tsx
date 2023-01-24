import { getAll } from "@/api/property";
import HomeCard from "@/components/card";
import Card from "@/components/card";
import SearchBar from "@/components/search-bar";
import { PlusIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";
interface IQuery {
  location?: string;
  type?: string;
  status?: string;
}

const Home = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [query, setQuery] = useState<any>({});
  const router = useRouter();
  const onChangeLocation = (e: any) => {
    if (e !== "--All Locations--") {
      setQuery({ ...query, location: e });
    } else {
      setQuery({ ...query, location: "" });
    }
  };
  const onChangeType = (e: any) => {
    if (e !== "--All Types--") {
      setQuery({ ...query, type: e });
    } else {
      setQuery({ ...query, type: "" });
    }
  };
  const onChangeState = (e: any) => {
    if (e !== "--All Status--") {
      setQuery({ ...query, status: e });
    } else {
      setQuery({ ...query, status: "" });
    }
  };

  useEffect(() => {
    getAll(new URLSearchParams(query).toString()).then((res) => {
      setProperties(res.data);
    });
  }, [query]);

  return (
    <>
      <div className=" text-white text-end ">
        <button
          onClick={() => {
            router.push("/admin");
          }}
          className="bg-blue-900 hover:bg-gray-400 text-white-800 font-bold py-1 px-2 rounded inline-flex items-center"
        >
          <PlusIcon className="fill-current w-4 h-4 mr-2" />
          <span>Add Property</span>
        </button>
      </div>
      <div className="grid grid-cols-1 bg-[url('/head-bg.jpeg')] w-full h-[250px] bg-cover bg-center bg-no-repeat mb-8 md:h-[500px]  ">
        <div className="font-mono antialiased text-4xl text-white pt-40 text-center ">
          Looking To Buy or Rent a Property?
        </div>
        <div className="font-sans font-family:SFMono-Regular antialiased pb-5 text-3xl text-white  text-center">
          Find Your Dream Home
        </div>
        <div className="pl-20 pr-20">
          <div className="bg-white rounded-lg h-20 bg-opacity-60 pt-5 pl-5">
            <SearchBar
              onChangeLocation={onChangeLocation}
              onChangeState={onChangeState}
              onChangeType={onChangeType}
            />
          </div>
        </div>
      </div>
      <div></div>
      <div className="grid grid-cols-6 gap-2 pl-5 pr-5">
        {properties.map((p) => (
          <HomeCard
            id={p.id}
            status={p.status}
            image={p.image}
            slug={p.slug}
            description={p.description}
            title={p.title}
            type={p.type}
            location={p.location}
            price={p.price}
            area={p.area}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
