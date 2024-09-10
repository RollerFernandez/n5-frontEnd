import { type FC, type MouseEventHandler } from 'react';
import Button from 'react-bootstrap/Button';
import IconCore from './IconCore';
import { type FlipProp } from '@fortawesome/fontawesome-svg-core';

interface ButtonCoreProps {
	variant: string;
	size?: 'sm' | 'lg';
	title?: string;
	icon?: string;
	flip?: FlipProp;
	text?: string;
	hiddenText?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
	className?: string;
	type?: 'submit' | 'reset' | 'button' | undefined;
	form?: string;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	hidden?: boolean;
	isLoading?: boolean;
	textLoading?: string;
	disabled?: boolean;
}

const ButtonCore: FC<ButtonCoreProps> = ({
	variant,
	size,
	title,
	icon = '',
	flip = '',
	text = '',
	hiddenText,
	className,
	type = 'button',
	form,
	onClick,
	hidden = false,
	isLoading = false,
	textLoading = '',
	disabled = false,
}) => {
	return (
		<Button
			variant={variant}
			size={size}
			title={title}
			onClick={onClick}
			className={className}
			form={form}
			type={type}
			hidden={hidden}
			disabled={disabled || isLoading}
		>
			{isLoading ? (
				<>
					<span className="spinner-grow spinner-grow-sm " role="status" aria-hidden="true" />

					<span
						className={`d-none d-sm-inline-block ${
							text?.trim().length > 0 ? '' : 'visually-hidden'
						}`}
					>
						{textLoading?.trim().length > 0 ? <>{textLoading} </> : 'Loading...'}
					</span>
				</>
			) : (
				<>
					{icon?.trim().length > 0 && <IconCore icon={icon} flip={flip} />}
					{text?.trim().length > 0 && (
						<span
							className={`${
								hiddenText?.length != null ? `d-none d-${hiddenText}-inline-block` : ''
							} ${icon?.trim().length !== 0 ? 'ms-1' : ''}`}
						>
							{text}
						</span>
					)}
				</>
			)}
		</Button>
	);
};

export default ButtonCore;
