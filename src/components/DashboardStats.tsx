import type { PropertyItem } from "../types/space";
import { Home, CheckCircle, Clock, DollarSign } from "lucide-react";

interface DashboardStatsProps {
  spaces: PropertyItem[];
}

export function DashboardStats({ spaces }: DashboardStatsProps) {
  const stats = {
    total: spaces.length,
    available: spaces.filter((s) => s.status === "AVAILABLE").length,
    pending: spaces.filter((s) => s.status === "PENDING").length,
    soldRented: spaces.filter(
      (s) => s.status === "SOLD" || s.status === "RENTED"
    ).length,
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      <StatCard
        icon={<Home className="w-6 h-6" />}
        label="Total Properties"
        value={stats.total}
        color="blue"
      />
      <StatCard
        icon={<CheckCircle className="w-6 h-6" />}
        label="Available"
        value={stats.available}
        color="green"
      />
      <StatCard
        icon={<Clock className="w-6 h-6" />}
        label="Pending"
        value={stats.pending}
        color="yellow"
      />
      <StatCard
        icon={<DollarSign className="w-6 h-6" />}
        label="Sold/Rented"
        value={stats.soldRented}
        color="purple"
      />
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: "blue" | "green" | "yellow" | "purple";
}

function StatCard({ icon, label, value, color }: StatCardProps) {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    yellow: "bg-yellow-100 text-yellow-600",
    purple: "bg-purple-100 text-purple-600",
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <div className={`inline-flex p-2 rounded-lg mb-2 ${colorClasses[color]}`}>
        {icon}
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}
