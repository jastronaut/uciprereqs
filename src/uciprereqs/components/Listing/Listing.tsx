import React from 'react';
import { Card, CardDeck } from '../../../styles/Specials';
import { List, ListItem } from '../../../styles/Elements';
import { CourseInfo } from '../../../Interfaces';

interface Props {
	listing: CourseInfo['listing'];
}

const renderQuarter = (quarter: string, professors: Array<string>) => {
	return (
		<Card title={quarter}>
			<List>
				{professors.map(prof => (
					<ListItem key={prof}>{prof}</ListItem>
				))}
			</List>
		</Card>
	);
};

const Listing: React.FC<Props> = (props: Props) => {
	const { listing } = props;
	return (
		<CardDeck>
			{listing.Fall && renderQuarter('Fall', listing.Fall)}

			{listing.Winter && renderQuarter('Winter', listing.Winter)}

			{listing.Spring && renderQuarter('Winter', listing.Spring)}
		</CardDeck>
	);
};

export default Listing;
