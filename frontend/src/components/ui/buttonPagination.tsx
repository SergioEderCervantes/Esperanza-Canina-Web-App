


export function ButtonPagination({ page }: { page: number }) {
    return (
        <button className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-400">
            {page}
        </button>
    )
}