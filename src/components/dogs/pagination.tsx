import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useSearchContext } from "./search-context";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const { currentPage, setCurrentPage } = useSearchContext();

  return (
    <div className="flex items-center justify-between">
      <Button
        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        variant="outline"
        className="flex items-center gap-2"
      >
        <ChevronLeft className="h-4 w-4" /> Previous
      </Button>
      <span className="text-sm text-gray-500">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        variant="outline"
        className="flex items-center gap-2"
      >
        Next <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
