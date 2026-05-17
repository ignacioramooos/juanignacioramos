import { Fuel } from "lucide-react";
import { Link } from "react-router-dom";

export const BuyMeGas = () => {
  return (
    <div className="flex justify-center px-4 py-10">
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
