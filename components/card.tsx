import { deleteProperty } from "@/api/property";
import { MapPinIcon } from "@heroicons/react/20/solid";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { useRouter } from "next/router";
import { useState } from "react";

interface IProp {
  id: string;
  image: string;
  title: string;
  description: string;
  status: string;
  price: string;
  location: string;
  type: string;
  area: number;
  slug: string;
}
const HomeCard = ({
  id,
  image,
  title,
  description,
  status,
  price,
  location,
  type,
  area,
  slug,
}: IProp) => {
  const [show, setShow] = useState<boolean>(false);
  const router = useRouter();
  const deletePro =  () => {
     deleteProperty(id).then(res=>{
      if(res.status ===200){
        router.push("/");
      }
      setShow(false);
      router.reload();
     })
  };
  return (
    <>
      <div
        className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-400 pointer-events-auto"
        onClick={() => setShow(true)}
      >
        <img className="w-full" src={image} alt="Sunset in the mountains" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base">
            {description}
            <br />
            {slug}
          </p>
        </div>
        <div className="px-6 pt-6 pb-2">
          <span className="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-200 mr-1 mb-1">
            {price}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {status}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {type}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {`${area} sq ft`}
          </span>
          <span className="h-auto bg-gray-200 rounded-full text-sm  text-gray-700 py-1 px-2  inline-flex items-center">
            <MapPinIcon className="fill-current w-4 h-4 mr-2" />
            {location}
          </span>
        </div>
      </div>
      {show ? (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setShow(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="mt-3 sm:flex">
                  <Card className="w-96">
                    <CardHeader color="blue" className="relative h-56">
                      <img
                        src={image}
                        alt="img-blur-shadow"
                        className="h-full w-full"
                      />
                    </CardHeader>
                    <CardBody className="text-center">
                      <Typography variant="h5" className="mb-2">
                        {title}
                      </Typography>
                      <Typography>{description} </Typography>
                      <Typography>{slug} </Typography>
                      <Typography variant="small">
                        Type:{type} &nbsp; Status:{status}
                      </Typography>
                    </CardBody>
                    <CardFooter
                      divider
                      className="flex items-center justify-between py-3"
                    >
                      <Typography variant="small">{price}</Typography>
                      <Typography
                        variant="small"
                        color="gray"
                        className="flex gap-1"
                      >
                        <MapPinIcon className="fas fa-map-marker-alt fa-sm mt-[3px]" />
                        {location}
                      </Typography>
                    </CardFooter>
                  </Card>

                  <div className="mt-2 text-center sm:ml-4 sm:text-left">
                    <div className="items-center gap-2 mt-3 sm:flex">
                      <button
                        className="w-full mt-2 p-2.5 flex-1 text-white bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                        onClick={() => deletePro()}
                      >
                        Delete
                      </button>
                      <button
                        className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                        onClick={() => setShow(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default HomeCard;
