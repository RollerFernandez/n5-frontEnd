import { type JSX } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const index = (): JSX.Element => {
	return (
		<>
			<h2 className="text-center h1 text-primary-dark">¿Olvidaste tu clave?</h2>
			<p>¡Ingrese su correo electrónico y le enviaremos las instrucciones!</p>
			<Form className="d-grid gap-3 gap-lg-4">
				<Form.Group controlId="exampleForm.ControlInput1">
					<Form.Label>Correo electrónico</Form.Label>
					<Form.Control type="email" placeholder="name@example.com" />
				</Form.Group>
				<Button size="lg" variant="primary">
					Enviar
				</Button>
				<div className="text-center">
					¿Ya tienes una cuenta? <Link to="/login">Iniciar Sesión</Link>
				</div>
			</Form>
		</>
	);
};

export default index;
