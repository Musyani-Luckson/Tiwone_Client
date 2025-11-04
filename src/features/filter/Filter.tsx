import { useEffect, useState } from "react";
import type {
  DealType,
  Filters,
  PriceDuration,
  SpaceCategory,
} from "../../types/search";

import {
  dealTypeOptions,
  priceDurationCountOptions,
  priceDurationOptions,
  spaceCategoryOptions,
} from "../../types/space";

import { BanknoteArrowDown, BanknoteArrowUp } from "lucide-react";
import InputField from "../../components/InputField";
import RadioGroup from "../../components/RadioGroup";
import DistanceSlider from "./Range";
import { useSearch } from "../../hooks/useSearchHook";
import { useUser } from "../../hooks/useAuth";

function Filter() {
  const { isAuthenticated, user } = useUser();
  const { setFilters, setData, loading, error } = useSearch();
  const [userStatus, setUserStatus] = useState<
    "PUBLIC" | "ONBOARD_FREE" | "PAID"
  >("PUBLIC");

  useEffect(() => {
    const status = false;
    if (isAuthenticated) {
      if (user && status) {
        setUserStatus("PAID");
      } else {
        setUserStatus("ONBOARD_FREE");
      }
    } else {
      setUserStatus("PUBLIC");
    }
  }, []);

  const [filterState, setFilterState] = useState<Filters>({
    space_type: "",
    deal_type: "",
    price_amount: {},
    price_duration: "MONTH",
    price_duration_count: 1,
  });

  const [radius, setRadius] = useState<number>(0.5);

  const applyFilters = () => {
    setFilters({ ...filterState });
    setData(
      {
        radius: radius * 1000,
      },
      "NEARBY"
    );
  };

  // useEffect(() => {
  //   console.log("From filter line 63", searchRequest);
  //   // maybe search
  // }, [searchRequest]);

  return (
    <div className="m-4 grid gap-8 overflow-auto">
      <section className="grid gap-5">
        <h2 className="text-lg font-semibold">Place and Deal</h2>

        <div>
          <h3 className="text-gray-700 font-medium mb-1">Space Type</h3>
          <RadioGroup
            name="space_type"
            options={spaceCategoryOptions}
            value={filterState.space_type ?? ""}
            direction="horizontal"
            onChange={(val) =>
              setFilterState((prev) => ({
                ...prev,
                space_type: val as SpaceCategory,
              }))
            }
          />
        </div>

        <div>
          <h3 className="text-gray-700 font-medium mb-1">Deal Type</h3>
          <RadioGroup
            name="deal_type"
            options={dealTypeOptions}
            value={filterState.deal_type ?? ""}
            direction="horizontal"
            onChange={(val) =>
              setFilterState((prev) => ({
                ...prev,
                deal_type: val as DealType,
              }))
            }
          />
        </div>
      </section>

      <section className="grid gap-5">
        <h2 className="text-lg font-semibold">Price and Duration</h2>

        {/* Price */}
        <div className="grid gap-2">
          <h3 className="text-gray-700 font-medium mb-1">Price</h3>
          <div className="flex gap-2">
            <InputField
              name="price_min"
              type="number"
              placeholder="Min"
              icon={<BanknoteArrowDown />}
              value={
                filterState.price_amount?.lte != null
                  ? String(filterState.price_amount.lte)
                  : ""
              }
              onChange={(e) =>
                setFilterState((prev) => ({
                  ...prev,
                  price_amount: {
                    ...(prev.price_amount ?? {}),
                    lte: Number(e.target.value),
                  },
                }))
              }
            />
            <InputField
              name="price_max"
              type="number"
              placeholder="Max"
              icon={<BanknoteArrowUp />}
              value={
                filterState.price_amount?.gte != null
                  ? String(filterState.price_amount.gte)
                  : ""
              }
              onChange={(e) =>
                setFilterState((prev) => ({
                  ...prev,
                  price_amount: {
                    ...(prev.price_amount ?? {}),
                    gte: Number(e.target.value),
                  },
                }))
              }
            />
          </div>
        </div>

        {/* Duration */}
        <div>
          <h3 className="text-gray-700 font-medium mb-1">Duration</h3>
          <RadioGroup
            name="price_duration"
            options={priceDurationOptions}
            value={filterState.price_duration ?? ""}
            direction="horizontal"
            onChange={(val) =>
              setFilterState((prev) => ({
                ...prev,
                price_duration: val as PriceDuration,
              }))
            }
          />
        </div>

        {/* Count */}
        <div>
          <h3 className="text-gray-700 font-medium mb-1">Count</h3>
          <RadioGroup
            name="price_duration_count"
            options={priceDurationCountOptions}
            value={String(filterState.price_duration_count)}
            direction="horizontal"
            onChange={(val) =>
              setFilterState((prev) => ({
                ...prev,
                price_duration_count: Number(val),
              }))
            }
          />
        </div>
      </section>

      {/* -------------------- Location & Distance -------------------- */}
      <section className="grid gap-5">
        <h2 className="text-lg font-semibold">Location & Distance</h2>
        <div>
          <h3 className="text-gray-700 font-medium mb-1">
            Distance ({radius.toFixed(1)} km)
          </h3>
          <DistanceSlider
            userStatus={userStatus}
            value={radius}
            onChange={(val) => setRadius(val)}
          />
        </div>
      </section>

      {/* -------------------- Apply Filters Button -------------------- */}
      <div className="flex justify-end">
        <button
          onClick={applyFilters}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Loading..." : error ? "Error" : "Apply Filters"}
        </button>
      </div>
    </div>
  );
}

export default Filter;
