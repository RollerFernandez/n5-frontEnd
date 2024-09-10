import { type JSX } from 'react';
import AppConfig from '../../../../public/config.json';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { BreadcrumbCore } from '@/core/components/general';
import { LocalStorageSession } from '@/core/sessions';



const index = (): JSX.Element => {
	const user = LocalStorageSession.getAuthorization();
	console.log(user);
	console.log(`pruebaaaa  ${AppConfig.urlAlfresco}${user?.email}`)
	return (
		<>
			<BreadcrumbCore>
				<BreadcrumbCore.Items>
					<BreadcrumbCore.Item active>Manuales </BreadcrumbCore.Item>
				</BreadcrumbCore.Items>
			</BreadcrumbCore>
			
			<Row>
				<Col xs={12}>
					<Card className="mb-2">
						<Card.Body>
							<h1 className="text-center">Manuales</h1>
							<div className="row py-3">
								<Col xs={12} sm={12} md={6} xl={4}>
									<a
										className="p-3 my-2 d-flex align-items-center mdc-elevation--z4 text-decoration-none"
										href="/Manuales/Manual_de_usuario_habilitaciones.pdf"
										target="_blank"
									>
										<i className="fa-solid fa-file-pdf"></i>
										<h5 className="mb-0 mr-3">Habilitaciones</h5>
									</a>
								</Col>
								<Col xs={12} sm={12} md={6} xl={4}>
									<div className="">
										<a
											className="p-3 my-2 d-flex align-items-center mdc-elevation--z4 text-decoration-none"
											href="/Manuales/Manual_de_usuario-Certificaciones.pdf"
											target="_blank"
										>
											<i className="fa-solid fa-file-pdf"></i>
											<h5 className="mb-0 mr-3">Certificaciones</h5>
										</a>
									</div>
								</Col>
								<Col xs={12} sm={12} md={6} xl={4}>
									<div className="">
										<a
											className="p-3 my-2 d-flex align-items-center mdc-elevation--z4 text-decoration-none"
											href="/Manuales/Manual_de_usuario-Administración_seguridad_y_tablas_mantedoras.pdf"
											target="_blank"
										>
											<i className="fa-solid fa-file-pdf"></i>
											<h5 className="mb-0 mr-3">Administración y Seguridad</h5>
										</a>
									</div>
								</Col>
							</div>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default index;
