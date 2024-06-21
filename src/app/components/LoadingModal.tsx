export const LoadingModal = () => {
    return (
    <dialog id="loading_modal" className="modal">
        <div className="flex items-center justify-center min-w-1/2 min-h-3/4 z-30 border border-green-400">
            <span className="loading loading-spinner loading-lg h-32 w-32"></span>
        </div>
    </dialog>
    )
}