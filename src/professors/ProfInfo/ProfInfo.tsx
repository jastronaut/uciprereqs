import React, { useState, useEffect } from 'react';
import { Heading, Text } from '../../styles/Type';
import { Badge } from '../../styles/Specials';
import Listing from '../../uciprereqs/components/Listing';

interface Props {
	prof: string;
}

const ProfInfo: React.FC<Props> = (props: Props) => {
	const { prof } = props;
	const [schedule, setSchedule] = useState<any>({});

	useEffect(() => {
		fetch(`http://127.0.0.1:8000/professors/${encodeURIComponent(prof)}`)
			.then(response => response.json())
			.then(body => setSchedule(body));
	}, [prof]);
	console.log(prof);
	console.log(schedule);

	return (
		<section>
			{schedule ? (
				<>
					<Heading>
						<Badge>{prof}</Badge>
					</Heading>
					<Text>Email, office</Text>
					<Listing listing={schedule} />
				</>
			) : (
				<img
					alt="Loading..."
					src="https://media3.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif?cid=790b76115d22808b5a64535445306a6d&rid=giphy.gif"
				/>
			)}
		</section>
	);
};

export default ProfInfo;
