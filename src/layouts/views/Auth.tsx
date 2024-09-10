import { Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { type IconProp } from '@fortawesome/fontawesome-svg-core';
import logo from '@/layouts/views/styles/vendor/images/logo.png';

const Auth = (): JSX.Element => {
	return (
		<div className="auth-wrapper">
			<section className="bg-sky-blue d-flex align-items-center">
				<div className="container-fluid">
					<div className="row justify-content-center">
						<div className="col-12 col-sm-9 col-md-7 col-lg-10 col-xl-8 col-xxl-8">
							<div className="card auth-form-card">
								<div className="card-body p-3 p-sm-4 p-lg-5">
									<Outlet />
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="bg-primary-dark d-flex align-items-center">
				<div className="container-fluid">
					<div className="row justify-content-center auth-content-info">
						<div className="col-12 col-sm-10 col-lg-12 align-self-center">
							<div className="card bg-transparent text-white">
								<div className="card-body">
									<div className="auth-logo">
										<img src={logo} alt="Logo" className="img-fluid" />
									</div>
									<h3>Organismo Nacional de Sanidad Pesquera</h3>
									<div className="auth-detail">
										<p>
											Institución encargada de investigar, normar, supervisar y fiscalizar toda la
											cadena productiva para asegurar la sanidad e inocuidad pesquera y acuícola,
											mediante la habilitación y certificación sanitaria eficaz y oportuna, con el
											propósito de proteger la vida y la salud pública.
										</p>
										<p>
											Cononce más sobre la entidad <a href="#">aquí</a>
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className="col-12 col-sm-10 col-lg-12 align-self-end">
							<div className="card bg-transparent text-white fst-italic">
								<div className="card-body">
									<p>
										Canales de atención: <FontAwesomeIcon icon={'fa-solid fa-phone' as IconProp} />{' '}
										955 659 226
									</p>
									{/* <span className="fs-4">SISA </span> v1.0 Desarrollado por{' '}
									<a
										className="text-white"
										href="https://jazani.pe/"
										target="_blank"
										rel="noopener noreferrer"
									>
										JAZANI Consultora Ambiental
									</a> */}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Auth;
