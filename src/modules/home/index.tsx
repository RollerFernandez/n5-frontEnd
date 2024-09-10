import { type JSX } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { BreadcrumbCore } from '@/core/components/general';
import { LocalStorageSession } from '@/core/sessions';

const index = (): JSX.Element => {
	const user = LocalStorageSession.getAuthorization();
	return (
		<>
			<BreadcrumbCore>
				<BreadcrumbCore.Items>
					<BreadcrumbCore.Item active>Home</BreadcrumbCore.Item>
				</BreadcrumbCore.Items>
			</BreadcrumbCore>

			<Row>
				<Col xs={12}>
					<Card className="mb-2">
						<Card.Body>
							<h2 className="text-muted">Bienvenido al sistema</h2>
							<h3 className="h5">
								{user?.persona?.nombres ?? ''} {user?.persona?.apePaternos ?? ''}{' '}
								{user?.persona?.apeMaternos ?? ''}
							</h3>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default index;
