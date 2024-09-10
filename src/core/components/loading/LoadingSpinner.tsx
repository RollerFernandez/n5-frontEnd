import Spinner from 'react-bootstrap/Spinner';

const LoadingSpinner = (): JSX.Element => {
	return (
		<div className="d-flex align-align-items-center justify-content-center py-5 ">
			<Spinner animation="border" role="status">
				<span className="visually-hidden">Loading...</span>
			</Spinner>
		</div>
	);
};

export default LoadingSpinner;
