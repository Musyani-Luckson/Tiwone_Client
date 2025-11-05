import Error from "../components/Error";
import { Loader } from "../components/Loader";
import SpaceCard from "../components/SpaceCard";
import { useSpace } from "../hooks/useSpaceHook";
import CreateProperty from "../features/listing/CreateProperty";
import { useEffect } from "react";
import { DashboardStats } from "../components/DashboardStats";

// Dashboard Component
function Dashboard() {
  const { spaces, loading, error, readSpaces, deleteSpace } = useSpace();

  useEffect(() => {
    readSpaces();
  }, [readSpaces]);

  // Loading state
  if (loading && !error) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  // Error state
  if (!loading && error) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Error />
      </div>
    );
  }

  // Empty state: no spaces
  if (spaces?.length === 0) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center gap-8">
        <div className="text-lg font-medium text-gray-600">
          No spaces listed
        </div>
        <CreateProperty />
      </div>
    );
  }

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      deleteSpace(id);
    }
  };

  // Normal state: display spaces with stats and grid
  return (
    <div className="overflow-y-auto h-full">
      {/* Dashboard Stats */}
      <DashboardStats spaces={spaces} />

      {/* Properties Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {spaces &&
          spaces.map((space) => (
            <SpaceCard
              onDelete={handleDelete}
              key={space.id}
              space={space}
              useCase="owner"
            />
          ))}
      </div>

      {/* Floating Add Property Button */}
      <CreateProperty />
    </div>
  );
}

export default Dashboard;
