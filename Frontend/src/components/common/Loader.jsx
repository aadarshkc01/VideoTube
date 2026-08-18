export const Spinner = () => <span className="spinner" role="status" aria-label="Loading" />;

const Loader = () => (
    <div className="page-loader">
        <Spinner />
    </div>
);

export default Loader;
