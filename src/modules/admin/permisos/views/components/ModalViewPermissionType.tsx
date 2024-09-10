import { useState, forwardRef, useImperativeHandle, type ReactNode, Fragment } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ModalCore } from '@/core/components/general';
import { Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

interface ModalProps {
	children?: ReactNode;
}

export interface ModalViewPermissionTypeRef {
	openModal: (permissionType?: any) => void;
	closeModal?: () => void;
}

const ModalViewPermissionType = forwardRef<ModalViewPermissionTypeRef, ModalProps>((_, ref) => {
	// Attributes
	const [show, setShow] = useState<boolean>(false);
	const [permissionType, setPermissionType] = useState([]);

	// Methods
	const openModal = (permissionType?: any): void => {
		setShow(true);

		setPermissionType(permissionType);
	};

	const closeModal = (): void => {
		setShow(false);
		setPermissionType([]);
	};

	// ImperativeHandle
	useImperativeHandle(ref, () => {
		return {
			openModal,
			closeModal,
		};
	});

	return (
		<ModalCore show={show} onHide={closeModal} backdrop="static" keyboard={false}>
			<ModalCore.Header
				closeButton
				closeVariant="white"
				className="header-primary-modal text-white"
			>
				<ModalCore.Title>Permisos Asignados</ModalCore.Title>
			</ModalCore.Header>
			<ModalCore.Body>
				<Row className="g-3">
					<Col xs={12}>
						<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
							{permissionType.map((item: any) => (
								<>
									<ListItem key={item.id} alignItems="flex-start">
										<ListItemAvatar></ListItemAvatar>
										<ListItemText
											primary={
												<Fragment>
													<Typography
														component="span"
														variant="body2"
														sx={{ color: 'text.primary', display: 'inline' }}
													>
														{item?.permissionType?.name}
													</Typography>
												</Fragment>
											}
										/>
									</ListItem>
									<Divider variant="inset" component="li" />
								</>
							))}
						</List>
					</Col>
				</Row>
				{/* )} */}
			</ModalCore.Body>
		</ModalCore>
	);
});

ModalViewPermissionType.displayName = 'ModalViewPermissionType';

export default ModalViewPermissionType;
