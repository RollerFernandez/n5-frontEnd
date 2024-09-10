import { createRef, useRef, type JSX } from 'react';
import Form from 'react-bootstrap/Form';
import { type AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { type UserSecurityResponse, type LoginRequest } from '../domain';
import { type ModalSendResetLinkRef, ModalSendResetLink } from './components';
import useLogin from '../application/hooks/useLogin';
import { LocalStorageSession } from '@/core/sessions';
import {
	STATUS_CODE_NOT_FOUND,
	STATUS_CODE_NOT_FOUND_INCORRECT_PASSWORD,
	STATUS_CODE_NOT_FOUND_MESSAGE_ERROR,
	STATUS_CODE_NOT_FOUND_MESSAGE_WARNING,
} from '@/core/constants';
import { toastError, toastInfo, toastWarning } from '@/core/helpers/ToastHelper';
import { ButtonCore } from '@/core/components/general';
// import { authRepository } from '../infrastructure';
import ReCAPTCHA from 'react-google-recaptcha';
import { KEY_RECAPTCHA } from '@/core/constants/env';
import { authRepository } from '../infrastructure';

interface DataMessage {
	Message: string;
}

const index = (): JSX.Element => {
	const navigate = useNavigate();
	const captcha = useRef<ReCAPTCHA>(null);
	const formik = useFormik<LoginRequest>({
		initialValues: {
			email: '',
			clave: '',
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email('Ingrese un correo valido')
				.required('Correo del usuario es requerido'),
			clave: Yup.string().required('Contraseña es requerida'),
		}),
		onSubmit: values => {
			if (captcha.current?.getValue() !== '') {
				void loginUser(values);
			} else {
				toastWarning('Por favor, verifica que no eres un robot.');
			}
		},
	});

	// React Query
	const { mutateAsync, isPending } = useLogin();

	// Attributes
	const modalRef = createRef<ModalSendResetLinkRef>();

	const loginUser = async (payload: LoginRequest): Promise<void> => {
		try {
			const response: UserSecurityResponse = await mutateAsync(payload);
			// const responseIp = await authRepository.{"ip":"98.207.254.136"};

			const responseIp = await authRepository.getIp();

			LocalStorageSession.saveAuthorization(response);
			LocalStorageSession.saveIp(responseIp);

			navigate('/profile-access');
		} catch (error) {
			const err = error as AxiosError;
			const data = err?.response?.data as DataMessage;

			if (
				err?.response?.status === STATUS_CODE_NOT_FOUND &&
				data.Message === STATUS_CODE_NOT_FOUND_MESSAGE_WARNING
			)
				toastWarning('Recuerda que al tercer intento errado se bloqueará tu usuario.');
			else if (
				err?.response?.status === STATUS_CODE_NOT_FOUND &&
				data.Message === STATUS_CODE_NOT_FOUND_MESSAGE_ERROR
			)
				toastInfo(
					'El usuario está bloqueado, comunícate con el administrador para recuperar tu cuenta.',
				);
			else if (
				err?.response?.status === STATUS_CODE_NOT_FOUND &&
				data.Message === STATUS_CODE_NOT_FOUND_INCORRECT_PASSWORD
			)
				toastError('Contraseña incorrecta.');
		}
	};

	return (
		<>
			<h2 className="text-center h1 text-primary-dark mb-5">Iniciar Sesión</h2>
			<Form className="d-grid gap-3 gap-lg-4" onSubmit={formik.handleSubmit} id="formLogin">
				<Form.Group controlId="exampleForm.ControlInput1">
					<Form.Label>Usuario</Form.Label>
					<Form.Control
						type="email"
						placeholder="Ingrese el usuario"
						name="email"
						value={formik.values.email}
						onChange={formik.handleChange}
					/>
					{(formik.touched.email ?? false) && formik.errors.email != null && (
						<small className="text-danger">{formik.errors.email}</small>
					)}
				</Form.Group>
				<Form.Group controlId="exampleForm.ControlTextarea1">
					<Form.Label>Contraseña</Form.Label>
					<Form.Control
						type="password"
						placeholder="Ingrese la contraseña"
						name="clave"
						value={formik.values.clave}
						onChange={formik.handleChange}
					/>
					{(formik.touched.clave ?? false) && formik.errors.clave != null && (
						<small className="text-danger">{formik.errors.clave}</small>
					)}
				</Form.Group>
				<div className="text-end">
					<>
						<ReCAPTCHA ref={captcha} sitekey={KEY_RECAPTCHA} />
					</>
					<span
						className="text-primary"
						style={{ textDecoration: 'underline', cursor: 'pointer' }}
						onClick={() => modalRef.current?.openModal()}
					>
						¿Olvidaste tu Contraseña?
					</span>
				</div>
				<ButtonCore
					size="lg"
					variant="primary"
					type="submit"
					form="formLogin"
					text="Ingresar"
					isLoading={isPending}
					textLoading="Ingresando..."
				/>
			</Form>

			<ModalSendResetLink ref={modalRef} />
		</>
	);
};

export default index;
