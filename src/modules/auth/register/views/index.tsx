import { type JSX } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';
import { Link } from 'react-router-dom';

const index = (): JSX.Element => {
	return (
		<>
			<h2 className="text-center h1 text-primary-dark">Crear una cuenta</h2>
			<Form className="d-grid gap-2 gap-sm-3">
				<Form.Group>
					<Form.Label className="mb-0">Nombres</Form.Label>
					<Form.Control type="email" placeholder="" />
				</Form.Group>
				<Form.Group>
					<Form.Label className="mb-0">Apellidos</Form.Label>
					<Form.Control type="email" placeholder="" />
				</Form.Group>
				<Form.Group>
					<Form.Label className="mb-0">Perfil</Form.Label>
					<Select
						className="react__select"
						classNamePrefix="rs_react"
						name="perfil"
						placeholder="-Seleccione-"
						isClearable
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label className="mb-0">Modulo</Form.Label>
					<Select
						className="react__select"
						classNamePrefix="rs_react"
						name="modulo"
						placeholder="-Seleccione-"
						isClearable
					/>
				</Form.Group>

				<Form.Group>
					<Form.Label className="mb-0">Usuario</Form.Label>
					<Form.Control type="email" placeholder="name@example.com" />
				</Form.Group>
				<Form.Group>
					<Form.Label className="mb-0">Contraseña</Form.Label>
					<Form.Control type="password" />
				</Form.Group>
				<Form.Group>
					<Form.Label className="mb-0">Confirmar contraseña</Form.Label>
					<Form.Control type="password" />
				</Form.Group>
				<Button size="lg" variant="primary">
					Ingresar
				</Button>
				<div className="text-center">
					¿Ya tienes una cuenta? <Link to="/login">Iniciar Sesión</Link>
				</div>
			</Form>
		</>
	);
};

export default index;
