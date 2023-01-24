import { save, updateImage, uploadImage } from "@/api/property";
import DropDown from "@/components/dropdown";

import { PlusSmallIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useRouter } from "next/router";
import { Districts } from "@/utils/data";
const types = [{ name: "Villa" }, { name: "Family" }, { name: "single" }];
const states = [{ name: "Rent" }, { name: "Sale" }];

interface IState {
  id?: string;
  title: string;
  status: string;
  type: string;
  slug: string;
  description: string;
  price: number;
  location: string;
  image: string | null;
  area: number;
}

const Admin = () => {
  const AddProperty = () => {
    const [property, setProperty] = useState<IState>({
      title: "",
      slug: "",
      status: states[0].name,
      type: types[0].name,
      description: "",
      price: 0,
      image: null,
      location: Districts[0].name,
      area: 0,
    });
    const selectStatus = (e: any) => {
      setProperty({ ...property, status: e.name });
    };

    const selectType = (e: any) => {
      setProperty({ ...property, type: e.name });
    };

    const selectLocation = (e: any) => {
      setProperty({ ...property, location: e.name });
    };

    const setDescription = (e: any) => {
      setProperty({ ...property, description: e.target.value });
    };

    const setPrice = (e: any) => {
      setProperty({ ...property, price: +e.target.value });
    };
    const setSlug = (e: any) => {
      setProperty({ ...property, slug: e.target.value });
    };
    const setArea = (e: any) => {
      setProperty({ ...property, area: +e.target.value });
    };
    const setTitle = (e: any) => {
      setProperty({ ...property, title: e.target.value });
    };

    const onSave = () => {
      save(property).then((res) => {
        setId(res.data.id);
        setShow(false);
      });
    };

    return (
      <>
        <div className="grid grid-cols-1 pl-10 pr-10 pt-5">
          <div className="font-sans font-family:SFMono-Regular antialiased pb-5 text-3xl text-white  text-center">
            Add a Property
          </div>
        </div>
        <div className="grid grid-cols-3 gap-8 pl-10 pr-10 pt-10">
          <div>
            <input
              className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm text-black"
              type="text"
              placeholder="Title"
              onChange={setTitle}
            />
          </div>
          <div>
            <input
              className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm text-black"
              type="text"
              placeholder="Slug"
              onChange={setSlug}
            />
          </div>

          <div>
            <input
              className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm text-black"
              type="number"
              placeholder="Price in LKR"
              onChange={setPrice}
            />
          </div>
          <div>
            <input
              className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm text-black"
              type="number"
              placeholder="Area in SQ RT"
              onChange={setArea}
            />
          </div>

          <div>
            <input
              className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm text-black"
              type="text"
              placeholder="Description"
              onChange={setDescription}
            />
          </div>

          <div>
            <label className="block text-white text-sm font-bold mb-2">
              Status
            </label>
            <div className="w-72">
              <DropDown onSelect={selectStatus} listItem={states} />
            </div>
          </div>

          <div>
            <label className="block text-white text-sm font-bold mb-2">
              Type
            </label>
            <div className=" w-72">
              <DropDown onSelect={selectType} listItem={types} />
            </div>
          </div>

          <div>
            <label className="block text-white text-sm font-bold mb-2">
              Location
            </label>
            <div className=" w-72">
              <DropDown onSelect={selectLocation} listItem={Districts} />
            </div>
          </div>
          <div></div>
          <div></div>
          <div className="pt-20 pl-10">
            <button
              onClick={onSave}
              className="bg-blue-900 hover:bg-gray-400 text-white-800 font-bold py-2 px-4 rounded inline-flex items-center"
            >
              <span>Next</span>
            </button>
          </div>
        </div>
      </>
    );
  };

  const SaveImage = () => {
    const [image, setImage] = useState<any>();
    const router = useRouter();
    const selectImage = (e: any) => {
      setImage(e.target.files[0]);
    };

    const onUpload = async () => {
      const res = await uploadImage(image);
      updateImage({ id: id, image: res.data }).then((res) => {
        if (res.status === 200) {
          setDone(true);
        }
      });
    };

    return (
      <>
        <div className="font-sans font-family:SFMono-Regular antialiased pb-5 text-3xl text-white  text-center">
          Add an image for Property
        </div>
        <div className="grid grid-cols-3  pl-10 pr-10 pt-5">
          <div></div>
          <div className="">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    aria-hidden="true"
                    className="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  {image ? (
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">{image.name}</span>
                    </p>
                  ) : (
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">browse</span> or drag and
                      drop
                    </p>
                  )}
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={selectImage}
                />
              </label>
            </div>
          </div>
          <div></div>
          <div></div>
          <div className="pt-5 pl-[180px]">
            {done ? (
              <button
                onClick={() => {
                  router.push("/");
                }}
                className="bg-blue-900 hover:bg-gray-400 text-white-800 font-bold py-2 px-4 rounded inline-flex items-center"
              >
                <span>Home</span>
              </button>
            ) : (
              <button
                onClick={onUpload}
                className="bg-blue-900 hover:bg-gray-400 text-white-800 font-bold py-2 px-4 rounded inline-flex items-center"
              >
                <span>Save</span>
              </button>
            )}
          </div>
          <div></div>
        </div>
      </>
    );
  };

  const [show, setShow] = useState<boolean>(true);
  const [id, setId] = useState<string>();
  const [done, setDone] = useState<boolean>(false);

  return <>{show ? <AddProperty /> : <SaveImage />}</>;
};

export default Admin;
