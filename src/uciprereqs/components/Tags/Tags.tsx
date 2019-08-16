import React from 'react';
import styled from 'styled-components';
import { TagData } from '../../../constants/Interfaces';

interface TagDataClickable extends TagData {
	onClick: () => void;
	tagName: string;
}

const TagBadgeStyled = styled.span<{ color: string }>`
	background: ${props => props.color};
	margin: 0.5rem;
	padding: 0.25rem 0.5rem;
	border-radius: 0.25rem;
	:first-of-type {
		margin-left: 0;
	}
`;

const TagBadge: React.FC<TagDataClickable> = (props: TagDataClickable) => (
	<TagBadgeStyled color={props.color}>
		{props.tagName}
		<span onClick={props.onClick}>x</span>
	</TagBadgeStyled>
);

interface Props {
	tags: {
		// eslint-disable-next-line @typescript-eslint/member-delimiter-style
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
						tagName={t}
						color={tags[t].color}
						onClick={() => onClick(t)}
					/>
				) : null
			)}

			<TagBadge
				key="newTag"
				color="#aaa"
				onClick={() => console.log('add new tag!!')}
				tagName="New Tag"
			/>
		</>
	);
};

export default Tags;
