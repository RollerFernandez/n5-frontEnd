import { useState, forwardRef, useImperativeHandle, type ReactNode } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ButtonCore, ModalCore } from '@/core/components/general';
import { toastError, toastSuccess } from '@/core/helpers/ToastHelper';
import useSendMail from '../../application/hooks/useSendMail';
import { type MailRequest } from '../../domain';

interface ModalProps {
	children?: ReactNode;
}

export interface ModalSendResetLinkRef {
	openModal: (correo?: string) => void;
	closeModal?: () => void;
}

const ModalSendResetLink = forwardRef<ModalSendResetLinkRef, ModalProps>((_, ref) => {
	// Attributes
	const [show, setShow] = useState<boolean>(false);
	const [validate, setValidate] = useState<boolean>(false);

	const formik = useFormik({
		initialValues: {
			correo: '',
		},
		validationSchema: Yup.object().shape({
			correo: Yup.string().trim().nullable().required('Correo es requerido'),
		}),
		onSubmit: values => {
			const mail: MailRequest = {
				email: values.correo,
			};
			void sendMail(mail);
		},
	});

	// React Query
	const { mutateAsync, isPending: isPendingSendMail } = useSendMail();

	// Methods
	const openModal = (correo?: string): void => {
		console.log('correo', correo);
		void formik.setFieldValue('correo', correo ?? '');
		if (correo != null) {
			setValidate(true);
		}
		setShow(true);
	};

	const closeModal = (): void => {
		setShow(false);
		formik.resetForm();
	};

	const sendMail = async (mail: MailRequest): Promise<void> => {
		try {
			await mutateAsync(mail);
			toastSuccess('Correo enviado con éxito!');
			closeModal();
		} catch (error) {
			toastError('Ocurrió un error.');
		}
	};

	// ImperativeHandle
	useImperativeHandle(ref, () => {
		return {
			openModal,
			closeModal,
		};
	});

	return (
		<ModalCore show={show} onHide={closeModal} centered keyboard={false}>
			<ModalCore.Header closeButton closeVariant="white" className="bg-primary-dark text-white">
				<ModalCore.Title>Verificación de correo</ModalCore.Title>
			</ModalCore.Header>
			<ModalCore.Body>
				<Row className="g-3">
					<Col xs={12}>
						<span>
							Te enviaremos un correo para verificar tu cuenta y proceder con el cambio de
							contraseña.
						</span>
					</Col>
					<Col xs={12}>
						<Form.Label>Correo</Form.Label>
						<Form.Control
							type="email"
							size="sm"
							name="correo"
							placeholder="Ingrese el correo registrado"
							value={formik.values.correo ?? ''}
							onChange={formik.handleChange}
							disabled={validate}
						/>
						{(formik.touched.correo ?? false) && formik.errors.correo != null && (
							<small className="text-danger">{formik.errors.correo}</small>
						)}
					</Col>
				</Row>
			</ModalCore.Body>
			<ModalCore.Footer>
				<ButtonCore
					variant="primary"
					text="Enviar"
					title="Enviar"
					textLoading="Enviando"
					isLoading={isPendingSendMail}
					size="sm"
					icon="fa-solid fa-paper-plane"
					onClick={() => {
						formik.handleSubmit();
					}}
				/>
			</ModalCore.Footer>
		</ModalCore>
	);
});

ModalSendResetLink.displayName = 'ModalSendResetLink';

export default ModalSendResetLink;
