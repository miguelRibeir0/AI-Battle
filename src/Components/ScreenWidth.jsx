const ScreenWidth = () => {
  return (
    <div className="absolute left-0 top-0 z-30 flex h-screen w-screen flex-col items-center justify-center bg-gray-900">
      <h2 className="w-3/4 text-white">
        This poject is not supported for screens under 1000px sorry!
      </h2>
      <span className="mt-5 rotate-90 text-3xl text-lime-500">:(</span>
    </div>
  );
};

export default ScreenWidth;
