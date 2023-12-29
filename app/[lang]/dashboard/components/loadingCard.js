const LoadingCard = () => (
    <div className="bg-white p-6 rounded-lg mb-2 shadow-md overflow-x-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-8 py-1">
        <div className="grid grid-cols-2 gap-4">
          <div className="h-6 bg-slate-700 rounded col-span-1"></div>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-4">
              <div className="h-3 bg-slate-600 rounded col-span-1"></div>
              <div className="h-3 bg-slate-600 rounded col-span-1"></div>
              <div className="h-3 bg-slate-600 rounded col-span-1"></div>
              <div className="h-3 bg-slate-600 rounded col-span-1"></div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="h-2 bg-slate-400 rounded col-span-1"></div>
              <div className="h-2 bg-slate-400 rounded col-span-1"></div>
              <div className="h-2 bg-slate-400 rounded col-span-1"></div>
              <div className="h-2 bg-slate-400 rounded col-span-1"></div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="h-2 bg-slate-400 rounded col-span-1"></div>
              <div className="h-2 bg-slate-400 rounded col-span-1"></div>
              <div className="h-2 bg-slate-400 rounded col-span-1"></div>
              <div className="h-2 bg-slate-400 rounded col-span-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  export default LoadingCard