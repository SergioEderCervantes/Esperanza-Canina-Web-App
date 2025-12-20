export default function DogCardSkeleton({ style }: { style?: React.CSSProperties }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-max-80 relative animate-[fadeIn_0.4s_ease-in]" style={style}>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
      <div className="relative h-80 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
      <div className="p-4">
        <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-3/4 mt-2 animate-pulse" />
        <div className="h-4 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 rounded w-full mt-3 animate-pulse" />
        <div className="flex flex-wrap gap-2 my-2">
          <div className="h-6 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 rounded-md w-16 animate-pulse" />
          <div className="h-6 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 rounded-md w-20 animate-pulse" style={{ animationDelay: '0.1s' }} />
          <div className="h-6 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 rounded-md w-14 animate-pulse" style={{ animationDelay: '0.2s' }} />
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="h-10 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 rounded-full w-24 ml-auto animate-pulse" />
        </div>
      </div>
    </div>
  );
}
