import React, { useState } from 'react';
import styled from 'styled-components';
import { TagData } from '../../../constants/Interfaces';
import AddTagModal from './AddTagModal';
import { Blue } from '../../../styles/Colors';

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
	// tags: {
	// 	// eslint-disable-next-line @typescript-eslint/member-delimiter-style
	// 	[tagName: string]: TagData;
	// };
	// onClick: (tagName: string) => void;
}

const Tags: React.FC<Props> = (props: Props) => {
	// const { tags, onClick } = props;
	// const { onClick } = props;
	const [isModalShowing, setIsModalShowing] = useState<boolean>(false);

	const [tags, setTags] = useState<{ [tagName: string]: TagData }>({
		poop: {
			checked: true,
			color: Blue,
		},
		hi2: {
			checked: false,
			color: Blue,
		},
		hello2: {
			checked: true,
			color: Blue,
		},
		hi: {
			checked: false,
			color: Blue,
		},
		hello5: {
			checked: true,
			color: Blue,
		},
		hello4: {
			checked: true,
			color: Blue,
		},
		hello3: {
			checked: true,
			color: Blue,
		},
		hello: {
			checked: true,
			color: Blue,
		},
		hello6: {
			checked: true,
			color: Blue,
		},
		hello7: {
			checked: true,
			color: Blue,
		},
	});

	const onClick = (tagName: string) => {
		console.log(`${tagName} clicked`);
	};

	return (
		<>
			{Object.keys(tags).map(t =>
				tags[t].checked ? (
					<TagBadge
						key={t}
						tagName={t}
						color={tags[t].color}
						checked={tags[t].checked}
						onClick={() => onClick(t)}
					/>
				) : null
			)}

			<TagBadge
				checked={false}
				key='newTag'
				color='#aaa'
				onClick={() => {
					setIsModalShowing(modal => !modal);
				}}
				tagName='New Tag'
			/>

			<AddTagModal
				isModalShowing={isModalShowing}
				tags={tags}
				onToggleTag={() => console.log('x')}
			/>
		</>
	);
};

export default Tags;
