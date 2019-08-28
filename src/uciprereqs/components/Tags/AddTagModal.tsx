import React from 'react';
import Modal from '../../../styles/Modal';
import { TagData } from '../../../constants/Interfaces';
import {
	TagsArea,
	TagListItemStyled,
	TextInput,
	InputArea,
	GlobalStyleOverride,
} from './style';

interface Props {
	tags: {
		[tagName: string]: TagData;
	};
	onToggleTag: () => void;
	isModalShowing: boolean;
}

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
	<>
		{props.isModalShowing ? <GlobalStyleOverride /> : null}
		<Modal isShowing={props.isModalShowing}>
			<TagsArea>
				{Object.keys(props.tags).map(tag => (
					<TagListItem
						key={tag}
						tagName={tag}
						{...props.tags.tag}
						onChange={props.onToggleTag}
					/>
				))}
			</TagsArea>
			<InputArea>
				<TextInput placeholder='Search or add new tag' />
			</InputArea>
		</Modal>
	</>
);

export default AddTagModal;
