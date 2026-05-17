import { Fuel } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const BuyMeGas = () => {
  const { pathname } = useLocation();
  if (pathname.startsWith("/buygas") || pathname.startsWith("/admin") || pathname === "/login") {
    return null;
  }
  return (
    <div className="flex justify-center px-4 pb-24 pt-10 md:pb-10">
      <Link
        to="/buygas"
        className="inline-flex h-11 items-center gap-2 rounded-full border border-foreground/10 bg-foreground px-5 text-sm font-medium text-background shadow-lg transition-colors hover:bg-foreground/90"
      >
        <Fuel className="h-4 w-4" aria-hidden="true" />
        buy me gas
      </Link>
    </div>
  );
};
