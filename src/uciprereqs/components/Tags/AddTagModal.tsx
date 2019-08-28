import React from 'react';
import Modal from '../../../styles/Modal';
import { TagData } from '../../../constants/Interfaces';
import styled from 'styled-components';

interface Props {
	tags: {
		[tagName: string]: TagData;
	};
	onToggleTag: () => void;
	isModalShowing: boolean;
}

const TagListItemStyled = styled.div`
	text-align: left;
	padding: 0.5rem 1rem;
`;

interface TagListItemProps extends TagData {
	tagName: string;
	onChange: () => void;
}

const TagListItem: React.FC<TagListItemProps> = (props: TagListItemProps) => (
	<TagListItemStyled>
		<input
			onChange={props.onChange}
			value={props.checked ? 'true' : ''}
			type='checkbox'
		/>
		{props.tagName}
	</TagListItemStyled>
);

const AddTagModal: React.FC<Props> = (props: Props) => (
	<Modal isShowing={props.isModalShowing}>
		{Object.keys(props.tags).map(tag => (
			<TagListItem
				key={tag}
				tagName={tag}
				{...props.tags.tag}
				onChange={props.onToggleTag}
			/>
		))}
	</Modal>
);

export default AddTagModal;
