import { useState, forwardRef, useImperativeHandle, type ReactNode, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ButtonCore, ModalCore } from '@/core/components/general';
import { LoadingForm } from '@/core/components/loading';
import { toastSuccess, toastError } from '@/core/helpers/ToastHelper';
import Select from 'react-select';
import EmployeeRequest from '../../domain/EmployeeRequest';
import useEmployeeCreate from '../../application/hooks/useEmployeeCreate';
import useEmployeeUpdate from '../../application/hooks/useEmployeeUpdate';
import { usePermissionTypeFindAll } from '@/modules/admin/permissionType/application/hooks';
import useEmployeeFindById from '../../application/hooks/useEmployeeFindById';

interface ModalProps {
	children?: ReactNode;
}

export interface ModalSaveAreaRef {
	openModal: (id?: number) => void;
	closeModal?: () => void;
}

const ModalSaveEmployee = forwardRef<ModalSaveAreaRef, ModalProps>((_, ref) => {
	// Attributes
	const [show, setShow] = useState<boolean>(false);
	const [id, setId] = useState<number>();

	const formik = useFormik<EmployeeRequest>({
		initialValues: {
			id: 0,
			name: '',
			lastName: '',
			status: '',
			email: '',
			recordState: null,
			permissions: [],
		},
		validationSchema: Yup.object().shape({
			name: Yup.string()
				.trim()
				.nullable()
				.required('Nombre es requerido')
				.min(4, 'Nombre debe tener al menos 3 caracteres')
				.max(250, 'Nombre debe tener máximo 100 caracteres'),
			lastName: Yup.string()
				.trim()
				.nullable()
				.required('Nombre es requerido')
				.min(3, 'Nombre debe tener al menos 3 caracteres')
				.max(250, 'Nombre debe tener máximo 100 caracteres'),
			email: Yup.string()
				.email('Ingrese un email valido')
				.trim()
				.nullable()
				.required('Email es requerido')
				.min(3, 'Nombre debe tener al menos 3 caracteres')
				.max(250, 'Nombre debe tener máximo 100 caracteres'),
			permissions: Yup.array()
				.required('Campo requerido')
				.test('permissions-check', 'Debe seleccionar al menos un permiso', value => {
					return value && value.length > 0;
				}),
		}),
		onSubmit: values => {
			void saveEmployee(values);
		},
	});

	// Hooks
	const { data: employee, isFetching: isFetchingEmployee } = useEmployeeFindById(id);
	const { data: permissionType } = usePermissionTypeFindAll();

	const { mutateAsync: mutateAsyncCreate } = useEmployeeCreate();
	const { mutateAsync: mutateAsyncEdit } = useEmployeeUpdate();

	useEffect(() => {
		if (employee != null)
			void formik.setValues({
				id: employee.id,
				name: employee.name,
				lastName: employee.lastName,
				email: employee.email,
				status: '',
				permissions: employee.Permissions,
				recordState: null,
			});
	}, [employee]);

	// Methods
	const openModal = (id?: number): void => {
		setShow(true);

		setId(id);
	};

	const closeModal = (): void => {
		setShow(false);
		setId(undefined);
		formik.resetForm();
	};

	const saveEmployee = async (payload: EmployeeRequest): Promise<void> => {
		try {
			if (id != null) {
				const payload_ = {
					...payload,
					permissions: payload.permissions.map(permission => ({
						permissionTypeId: permission.hasOwnProperty('permissionTypeId')
							? permission.permissionTypeId
							: permission.id,
					})),
				};

				await mutateAsyncEdit({ id, employee: payload_ });
				toastSuccess('Empleado actualizado correctamente');
			} else {
				await mutateAsyncCreate(payload);
				toastSuccess('Empleado registrado correctamente');
			}

			closeModal();
		} catch (error) {
			toastError('Error al registrar empleado');
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
		<ModalCore show={show} onHide={closeModal} backdrop="static" keyboard={false}>
			<ModalCore.Header
				closeButton
				closeVariant="white"
				className="header-primary-modal text-white"
			>
				<ModalCore.Title>Nuevo Empleado</ModalCore.Title>
			</ModalCore.Header>
			<ModalCore.Body>
				{isFetchingEmployee ? (
					<LoadingForm />
				) : (
					<Row className="g-3">
						<Col xs={12}>
							<Form.Label>
								Nombre<span className="text-danger">(*)</span>
							</Form.Label>
							<Form.Control
								type="text"
								size="sm"
								name="name"
								disabled={!!formik.values.id}
								value={formik.values.name ?? ''}
								onChange={formik.handleChange}
							/>
							{(formik.touched.name ?? false) && formik.errors.name != null && (
								<small className="text-danger">{formik.errors.name}</small>
							)}
						</Col>
						<Col xs={12}>
							<Form.Label>
								Apellidos<span className="text-danger">(*)</span>
							</Form.Label>
							<Form.Control
								type="text"
								size="sm"
								name="lastName"
								disabled={!!formik.values.id}
								value={formik.values.lastName ?? ''}
								onChange={formik.handleChange}
							/>
							{(formik.touched.lastName ?? false) && formik.errors.lastName != null && (
								<small className="text-danger">{formik.errors.lastName}</small>
							)}
						</Col>
						<Col xs={12}>
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="text"
								size="sm"
								name="email"
								value={formik.values.email ?? ''}
								onChange={formik.handleChange}
							/>
							{(formik.touched.email ?? false) && formik.errors.email != null && (
								<small className="text-danger">{formik.errors.email}</small>
							)}
						</Col>
						<Col xs={12}>
							<Form.Label>Permisos</Form.Label>
							<Select
								defaultValue={employee?.Permissions.map(item => ({
									id: item.permissionTypeId,
									name: item.permissionType.name,
								}))}
								name="permissions"
								isMulti
								options={permissionType ?? []}
								onChange={(option, target) => {
									formik.setFieldValue(target?.name ?? '', option);
								}}
								getOptionLabel={option => option.name}
								getOptionValue={option => option.id.toString()}
								placeholder="Buscar"
								menuPlacement="auto"
								isSearchable={true}
								isClearable
								className="basic-multi-select"
								classNamePrefix="select"
							/>
							{formik.touched.permissions && formik.errors.permissions ? (
								<div style={{ color: 'red' }}>{formik.errors.permissions.toString()}</div>
							) : null}
						</Col>
					</Row>
				)}
			</ModalCore.Body>
			<ModalCore.Footer>
				<ButtonCore
					variant="primary"
					text="Guardar"
					title="Guardar"
					size="sm"
					onClick={() => {
						formik.handleSubmit();
					}}
				/>
			</ModalCore.Footer>
		</ModalCore>
	);
});

ModalSaveEmployee.displayName = 'ModalSaveEmployee';

export default ModalSaveEmployee;
