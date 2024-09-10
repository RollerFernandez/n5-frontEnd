import logoSanipes from '@/layouts/views/styles/vendor/images/logo-sanipes.png';

const PageNotFound = (): JSX.Element => {
	return (
		<div className="d-flex align-items-center justify-content-center vh-100 bg-sky-blue">
			<div className="card auth-form-card p-5">
				<div className="text-center">
					<div
						className="auth-logo d-flex justify-content-center align-items-center"
						style={{ marginBottom: '0px' }}
					>
						<img src={logoSanipes} alt="Logo" className="img-fluid" />
					</div>
					<span className="display-3 fw-bold">401</span>
					<p className="lead">No tiene acceso a este módulo</p>
					<a href="/" className="btn btn-primary">
						Home
					</a>
				</div>
			</div>
		</div>
	);
};

export default PageNotFound;
