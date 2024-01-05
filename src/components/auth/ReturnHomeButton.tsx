import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export const ReturnHomeButton = () => {
  return (
    <Button variant="outline" size="icon" asChild>
      <Link href="/">
        <Home />
      </Link>
    </Button>
  );
};
