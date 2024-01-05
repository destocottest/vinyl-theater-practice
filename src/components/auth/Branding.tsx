import { Disc } from "lucide-react";

export const Branding = () => {
  return (
    <div className="flex items-center gap-2 bg-primary pr-4 rounded-md text-white">
      <h1 className="text-4xl  font-bold px-4 py-1">Vinyl Theater</h1>
      <Disc size="36" className="animate-slide-left-right" />
    </div>
  );
};
