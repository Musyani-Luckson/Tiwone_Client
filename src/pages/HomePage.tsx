import { Link } from "react-router-dom";
import { TrendingUp, Shield, MapPin, Home, Building2 } from "lucide-react";
import { useUser } from "../hooks/useAuth";

function HomePage() {
  const { isAuthenticated } = useUser();

  return (
    <div className="flex flex-col overflow-y-auto h-full">
      {/* Hero Section */}
      <section className="px-4 py-16 md:py-24 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Find Your Perfect Space
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover properties, rooms, and spaces tailored to your needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/explore"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Explore Properties
            </Link>
            <Link
              to={isAuthenticated ? "/dashboard" : "/signup"}
              className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-medium hover:bg-blue-50 transition"
            >
              {isAuthenticated ? "Go to Dashboard" : "List Your Property"}
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Why Choose Tiwone
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Feature
            icon={<MapPin className="w-8 h-8" />}
            title="Location-Based Search"
            description="Find properties near you with advanced filters and interactive map views"
          />
          <Feature
            icon={<TrendingUp className="w-8 h-8" />}
            title="Real-Time Listings"
            description="Get instant access to the latest properties as they become available"
          />
          <Feature
            icon={<Shield className="w-8 h-8" />}
            title="Secure Platform"
            description="Verified listings and secure communication with property owners"
          />
        </div>
      </section>

      {/* Property Types Section */}
      <section className="px-4 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Browse by Property Type
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <PropertyTypeCard
              icon={<Home className="w-8 h-8" />}
              title="Residential"
              count="500+"
            />
            <PropertyTypeCard
              icon={<Building2 className="w-8 h-8" />}
              title="Commercial"
              count="200+"
            />
            <PropertyTypeCard
              icon={<Building2 className="w-8 h-8" />}
              title="Apartments"
              count="350+"
            />
            <PropertyTypeCard
              icon={<Home className="w-8 h-8" />}
              title="Rooms"
              count="150+"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-4 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Step
            number="1"
            title="Search"
            description="Use our advanced search to find properties that match your needs"
          />
          <Step
            number="2"
            title="Discover"
            description="Browse listings with detailed information, photos, and map locations"
          />
          <Step
            number="3"
            title="Connect"
            description="Contact property owners directly to schedule viewings"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-300 mb-8">
            Join thousands of users finding their perfect space
          </p>
          {!isAuthenticated && (
            <Link
              to="/signup"
              className="inline-block px-8 py-3 bg-blue-600 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Create Free Account
            </Link>
          )}
          {isAuthenticated && (
            <Link
              to="/explore"
              className="inline-block px-8 py-3 bg-blue-600 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Start Exploring
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-blue-100 text-blue-600 rounded-full">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function PropertyTypeCard({
  icon,
  title,
  count,
}: {
  icon: React.ReactNode;
  title: string;
  count: string;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
      <div className="text-blue-600 mb-3">{icon}</div>
      <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500">{count} properties</p>
    </div>
  );
}

function Step({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-blue-600 text-white rounded-full text-xl font-bold">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default HomePage;
