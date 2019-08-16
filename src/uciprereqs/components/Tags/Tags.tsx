import React from 'react';
import styled from 'styled-components';
import { TagData } from '../../../constants/Interfaces';

interface TagDataClickable extends TagData {
	onClick: () => void;
}

const TagBadge = styled.span<TagDataClickable>`
	background: ${props => props.color};
`;

interface Props {
	tags: {
		[tagName: string]: TagData;
	};

	onClick: (tagName: string) => void;
}

const Tags: React.FC<Props> = (props: Props) => {
	const { tags, onClick } = props;

	return (
		<>
			{Object.keys(tags).map(t =>
				tags[t].checked ? (
					<TagBadge
						key={t}
						color={tags[t].color}
						onClick={() => onClick(t)}
					>
						{t}
					</TagBadge>
				) : null
			)}
		</>
	);
};

export default Tags;
