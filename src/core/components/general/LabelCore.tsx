import { type JSX } from 'react';
import FormLabel, { type FormLabelOwnProps } from 'react-bootstrap/FormLabel';

interface BaseProps extends FormLabelOwnProps {
	required?: boolean;
}

const LabelCore = (props: BaseProps): JSX.Element => {
	return (
		<FormLabel {...props}>
			{props.children}
			{(props.required ?? false) && <span className="text-danger">(*)</span>}
		</FormLabel>
	);
};

export default LabelCore;
