import { type FlipProp, type IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface BaseProps {
	icon: string;
	className?: string;
	title?: string;
	flip?: string;
}

const IconCore = ({ icon, className, title, flip }: BaseProps): JSX.Element => {
	return (
		<>
			{flip === undefined && (
				<FontAwesomeIcon icon={icon as IconProp} className={className} title={title} />
			)}
			{flip !== undefined && (
				<FontAwesomeIcon
					icon={icon as IconProp}
					className={className}
					title={title}
					flip={flip as FlipProp}
				/>
			)}
		</>
	);
};

export default IconCore;
