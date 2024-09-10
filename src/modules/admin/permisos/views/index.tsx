import { createRef, type MouseEvent, type JSX, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import { ButtonCore, BreadcrumbCore, IconCore } from '@/core/components/general';
import { AccordionCore } from '@/core/components/accordion';
import { TableCoreSelectPaginated } from '@/core/components/table';
import { createColumnHelper } from '@tanstack/react-table';
import { dateFormatterToString } from '@/core/helpers/DayjsHelper';
import { LoadingTable } from '@/core/components/loading';
import { type ModalSaveAreaRef, ModalSaveArea } from './components';
import { swalAlertConfirm } from '@/core/helpers/SwalHelper';
import { type RecordState, type FilterPage, type PaginationRequest } from '@/modules/shared/domain';
import { useFormik } from 'formik';
import { RECORD_STATUS, getRecordStateAction } from '@/core/helpers/RecordStateHelper';
import {
	FILTER_PAGE_DEFAUT,
	CHANGE_DEBOUNCE_DELAY,
	START_DATE_DEFAULT,
	END_DATE_DEFAULT,
	STATUS_DEFAUT,
	PAGE_SIZE_DEFAULT,
} from '@/core/constants';
import DatePicker from 'react-datepicker';
import EmployeeFilter from '../domain/EmployeeFilter';
import PermissionResponse from '../domain/EmployeeResponse';
import usePermissionPaginatedSearch from '../application/hooks/usePermissionPaginatedSearch';
import useEmployeeDeleteById from '../application/hooks/useEmployeeDeleteById';
import ModalViewPermissionType, {
	ModalViewPermissionTypeRef,
} from './components/ModalViewPermissionType';

interface EmployeeFilterFormik extends EmployeeFilter {
	recordState: RecordState | null;
}

const index = (): JSX.Element => {
	const [searchFilter, setSearchFilter] = useState<PaginationRequest<EmployeeFilter>>({
		...FILTER_PAGE_DEFAUT,
		filter: {
			startDate: START_DATE_DEFAULT,
			endDate: END_DATE_DEFAULT,
			status: STATUS_DEFAUT.ACTIVE,
		},
	});

	const formik = useFormik<EmployeeFilterFormik>({
		initialValues: {
			startDate: START_DATE_DEFAULT,
			endDate: END_DATE_DEFAULT,
			status: STATUS_DEFAUT.ACTIVE,
			recordState: null,
		},
		onSubmit: values => {
			setSearchFilter(prev => {
				return {
					...prev,
					pageSize: PAGE_SIZE_DEFAULT,
					filter: {
						startDate: values.startDate,
						endDate: values.endDate,
						status: values.recordState?.value,
					},
				};
			});
		},
	});

	const modalRef = createRef<ModalSaveAreaRef>();
	const modalViewRef = createRef<ModalViewPermissionTypeRef>();

	const columnHelper = createColumnHelper<PermissionResponse>();

	const columns = [
		columnHelper.accessor('id', {
			header: 'ID',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('name', {
			header: 'Nombre',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('lastName', {
			header: 'Apellidos',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('email', {
			header: 'Correo',
			cell: info => info.getValue(),
		}),
		columnHelper.accessor('createdAt', {
			header: () => <span className="text-nowrap">F. Registro</span>,
			cell: info => <span className="text-nowrap">{dateFormatterToString(info.getValue())}</span>,
		}),
		columnHelper.display({
			id: 'permisos',
			header: () => <span className="d-block text-center text-nowrap">Permisos</span>,
			cell: ({ row }) => (
				<span className="d-flex align-items-center justify-content-center">
					<ButtonCore
						variant="outline-primary-dark"
						title="Editar"
						size="sm"
						icon="a-solid fa-eye"
						className="border-0"
						onClick={() => modalViewRef.current?.openModal(row.original.Permissions)}
					/>
				</span>
			),
		}),

		columnHelper.display({
			id: 'acciones',
			header: () => <span className="d-block text-center text-nowrap">Acciones</span>,
			cell: ({ row }) => (
				<span className="d-flex align-items-center justify-content-center">
					<Form.Check
						type="switch"
						label=""
						defaultChecked={row.original.status === 'A'}
						onClick={evt => {
							void removeEditorial(evt, row.original);
						}}
					/>{' '}
					<ButtonCore
						variant="outline-primary-dark"
						title="Editar"
						size="sm"
						icon="fa-solid fa-pen-to-square"
						className="border-0"
						onClick={() => modalRef.current?.openModal(row.original.id)}
					/>{' '}
				</span>
			),
		}),
	];

	// Hooks
	const { mutateAsync: mutateAsyncDelete } = useEmployeeDeleteById();
	const { data: employeeData, isFetching: isFetchingemployee } =
		usePermissionPaginatedSearch(searchFilter);

	// Methods
	const removeEditorial = async (
		evt: MouseEvent<HTMLInputElement>,
		payload: PermissionResponse,
	): Promise<void> => {
		evt.preventDefault();
		const action = getRecordStateAction(!(payload.status === STATUS_DEFAUT.ACTIVE));
		const question = `¿Confirmar ${action} <b>${payload.name}</b>?`;

		const optionSelected = await swalAlertConfirm(question);
		if (!optionSelected.isConfirmed) return;

		const modelRequest = {
			id: payload.id,
			status: STATUS_DEFAUT.ACTIVE ? STATUS_DEFAUT.INACTIVE : STATUS_DEFAUT.ACTIVE,
		};

		await mutateAsyncDelete(modelRequest);
	};

	const goToPage = (payload: FilterPage): void => {
		setSearchFilter({
			...searchFilter,
			pageNumber: payload.pageNumber,
			pageSize: payload.pageSize,
		});
		formik.handleSubmit();
	};

	const onRowSelection = (rows: PermissionResponse[]): void => {
		console.log('rows', rows);
		setTimeout(() => {}, CHANGE_DEBOUNCE_DELAY);
	};

	return (
		<>
			<BreadcrumbCore>
				<BreadcrumbCore.Items>
					<BreadcrumbCore.Item href="/">
						<IconCore icon="fa-solid fa-house" />
					</BreadcrumbCore.Item>
					<BreadcrumbCore.Item>Administración</BreadcrumbCore.Item>
					<BreadcrumbCore.Item active>Empleado</BreadcrumbCore.Item>
				</BreadcrumbCore.Items>
				<BreadcrumbCore.Actions>
					<ButtonCore
						variant="primary"
						text="Nuevo Empleado"
						title="Nuevo Empleado"
						size="sm"
						icon="fa-solid fa-circle-plus"
						className="ms-2"
						hiddenText="sm"
						onClick={() => modalRef.current?.openModal()}
					/>
				</BreadcrumbCore.Actions>
			</BreadcrumbCore>

			<Row>
				<Col>
					<AccordionCore className="accordion-spacing" defaultActiveKey={'busquedaBasica'}>
						<AccordionCore.Item eventKey="busquedaBasica">
							<AccordionCore.Header title="Filtros de búsqueda" />
							<AccordionCore.Body>
								<div className="d-flex justify-content-end">
									<div>
										<ButtonCore
											variant="outline-dark"
											size="sm"
											text="Limpiar"
											icon="fa-solid fa-arrows-rotate"
											hiddenText="sm"
											onClick={formik.handleReset}
										/>{' '}
										<ButtonCore
											variant="primary"
											size="sm"
											text="Buscar"
											icon="fa-solid fa-magnifying-glass"
											hiddenText="sm"
											onClick={() => {
												formik.handleSubmit();
											}}
										/>
									</div>
								</div>
								<Row className="g-3">
									<Col xs={12} sm={6} md={4} xxl={3} className="d-flex flex-column">
										<Form.Label>Fecha de registro</Form.Label>
										<DatePicker
											className="form-control form-control-sm"
											dateFormat="dd-MM-yyyy"
											startDate={formik.values?.startDate}
											endDate={formik.values?.endDate}
											selectsRange
											onChange={dates => {
												const [startDate, endDate] = dates;
												void formik.setFieldValue('startDate', startDate);
												void formik.setFieldValue('endDate', endDate);
											}}
											locale="es"
											monthsShown={2}
											isClearable
										/>
									</Col>
									<Col xs={12} sm={6} md={4} xxl={3}>
										<Form.Label>Estado</Form.Label>
										<Select
											className="react__select react__select__sm"
											classNamePrefix="rs_react"
											name="recordState"
											value={formik.values?.recordState}
											options={RECORD_STATUS}
											onChange={(option, target) => {
												void formik.setFieldValue(target?.name ?? '', option);
											}}
											placeholder="Buscar"
											menuPlacement="auto"
											isSearchable={false}
											isClearable
										/>
									</Col>
								</Row>
							</AccordionCore.Body>
						</AccordionCore.Item>
					</AccordionCore>

					<Card className="mt-4 mb-2">
						<Card.Header className="d-flex justify-content-between align-items-center bg-transparent">
							<span>Listado de Empleados</span>
						</Card.Header>
						<Card.Body>
							{isFetchingemployee ? (
								<LoadingTable />
							) : (
								<TableCoreSelectPaginated<PermissionResponse>
									columns={columns}
									data={employeeData ?? []}
									goToPage={goToPage}
									onRowSelection={onRowSelection}
								/>
							)}
						</Card.Body>
					</Card>
				</Col>
			</Row>

			<ModalSaveArea ref={modalRef} />
			<ModalViewPermissionType ref={modalViewRef} />
		</>
	);
};

export default index;
