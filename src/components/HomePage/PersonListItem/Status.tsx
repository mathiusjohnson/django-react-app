import React from 'react';

interface iStatusProps {
  message: string;
}

const Status: React.FC<iStatusProps> = (props) => {
	return (
		<main className="">
  		<h1 className="">{props.message}</h1>
		</main>
	)
}
export default Status;