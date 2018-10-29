import * as React from 'react';

import './Spinner.css';

interface SpinnerProps {
	className?: string;
}

export default ({ className }: SpinnerProps) => {
	return <div className={`spinner ${className || ''}`}>
		<svg className="spinner__circle" viewBox="0 0 32 32">
			<defs>
				<linearGradient id="spinner-gradient-1" gradientUnits="objectBoundingBox" x1="1" y1="0" x2="0" y2="0">
					<stop offset="0%" stopColor="currentColor" stopOpacity="0" />
					<stop offset="100%" stopColor="currentColor" stopOpacity="0.5" />
				</linearGradient>
				<linearGradient id="spinner-gradient-2" gradientUnits="objectBoundingBox" x1="0" y1="0" x2="1" y2="0">
					<stop offset="0%" stopColor="currentColor" stopOpacity="0.5" />
					<stop offset="100%" stopColor="currentColor" stopOpacity="1" />
				</linearGradient>
			</defs>
			<g fill="none" strokeWidth="3">
				<path d="m16,16m-14,0a14,14 0 1,0 28,0" stroke="url(#spinner-gradient-1)" />
				<path d="m30,16a14,14 0 1,0 -28,0" stroke="url(#spinner-gradient-2)" />
			</g>
		</svg>
	</div>;
}
