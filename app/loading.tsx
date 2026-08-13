import { Spinner } from "@/components/ui/spinner";

const GlobalLoading = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <p className="text-5xl font-bold text-center flex items-center justify-center text-primary">
        L
        <Spinner className="size-8 mt-3 mx-1 text-chart-3" />
        ading...
      </p>
    </div>
  );
};

export default GlobalLoading;
