import React from 'react';

const Icon = ({color}) => {
	return (
		<>
			<svg
				width="20"
				height="20"
				viewBox="0 0 10 10"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M1.25 0C0.918479 0 0.600537 0.131696 0.366117 0.366117C0.131696 0.600537 0 0.918479 0 1.25L0 8.75C0 9.08152 0.131696 9.39946 0.366117 9.63388C0.600537 9.8683 0.918479 10 1.25 10H8.75C9.08152 10 9.39946 9.8683 9.63388 9.63388C9.8683 9.39946 10 9.08152 10 8.75V1.25C10 0.918479 9.8683 0.600537 9.63388 0.366117C9.39946 0.131696 9.08152 0 8.75 0L1.25 0ZM5.3125 2.8125V4.6875H7.1875C7.27038 4.6875 7.34987 4.72042 7.40847 4.77903C7.46708 4.83763 7.5 4.91712 7.5 5C7.5 5.08288 7.46708 5.16237 7.40847 5.22097C7.34987 5.27958 7.27038 5.3125 7.1875 5.3125H5.3125V7.1875C5.3125 7.27038 5.27958 7.34987 5.22097 7.40847C5.16237 7.46708 5.08288 7.5 5 7.5C4.91712 7.5 4.83763 7.46708 4.77903 7.40847C4.72042 7.34987 4.6875 7.27038 4.6875 7.1875V5.3125H2.8125C2.72962 5.3125 2.65013 5.27958 2.59153 5.22097C2.53292 5.16237 2.5 5.08288 2.5 5C2.5 4.91712 2.53292 4.83763 2.59153 4.77903C2.65013 4.72042 2.72962 4.6875 2.8125 4.6875H4.6875V2.8125C4.6875 2.72962 4.72042 2.65013 4.77903 2.59153C4.83763 2.53292 4.91712 2.5 5 2.5C5.08288 2.5 5.16237 2.53292 5.22097 2.59153C5.27958 2.65013 5.3125 2.72962 5.3125 2.8125Z"
					fill={color}
				/>
			</svg>
		</>
	);
};

const Index = ({list = [], step = 1}) => {
	return (
		<>
			<ul>
				{list?.map((item, i) => (
					<li key={i}>
						<Icon color={step >= i ? '#0072EF' : '#595959'} />{' '}
						<span
							style={{color: step >= i ? '#0072EF' : '#595959'}}
						>
							{item}
						</span>
					</li>
				))}
			</ul>

			<style jsx>{`
				ul {
					padding: 0;
					list-style-type: none;
				}

				li {
					display: flex;
					align-items: center;
				}

				li:not(:first-child) {
					margin-top: 10px;
				}

				li span {
					flex: 1;
					margin-left: 10px;
					line-height: 1;
					font-size: 12px;
				}
			`}</style>
		</>
	);
};

export default Index;
