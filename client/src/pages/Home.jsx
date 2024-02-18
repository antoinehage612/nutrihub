import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";

export default function Home() {
  const [proteinListings, setProteinListings] = useState([]);
  const [creatineListings, setCreatineListings] = useState([]);
  const [otherListings, setOtherListings] = useState([]);

  console.log(proteinListings, creatineListings, otherListings);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const proteinRes = await fetch("/api/listing/get?type=protein&limit=4");
        const creatineRes = await fetch(
          "/api/listing/get?type=creatine&limit=4"
        );
        const otherRes = await fetch("/api/listing/get?type=others&limit=4");

        const proteinData = await proteinRes.json();
        const creatineData = await creatineRes.json();
        const otherData = await otherRes.json();

        setProteinListings(proteinData);
        setCreatineListings(creatineData);
        setOtherListings(otherData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* top */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Welcome to <span className="text-slate-500">NutriHub</span>
          <br />
          Your Ultimate Destination for Supplements
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          NutriHub is your go-to store for premium-quality supplements.
          <br />
          Explore our diverse selection of products and fuel your journey to
          better health and fitness.
        </div>
        <Link
          to={"/search"}
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
        >
          Let's start shopping at NutriHub...
        </Link>
      </div>

      {/* listing results for protein, creatine, and other */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {proteinListings && proteinListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Top Protein Supplements
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=protein"}
              >
                Show more protein supplements
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {proteinListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {creatineListings && creatineListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Top Creatine Supplements
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=creatine"}
              >
                Show more creatine supplements
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {creatineListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {otherListings && otherListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Other Supplements
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=others"}
              >
                Show more other supplements
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {otherListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
