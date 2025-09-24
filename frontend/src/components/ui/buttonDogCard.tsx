


export function ButtonDogCard({ text }: { text: string }) {
  return (
   <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700">
        {text}
    </button>
  );
}