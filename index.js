import React from 'react';
import { Form, Select, Skeleton } from 'antd';

const browser = typeof window !== 'undefined' ? true : false;

if (browser) require('./styles.css');

export default ({
	allowClear = false,
	className = '',
	disabled = false,
	error,
	extra = null,
	id,
	label = '',
	list,
	multiple,
	onChange,
	placeholder = '',
	required = false,
	styles = {},
	value = '',
	withLabel = false
}) => {
	let options = [...list];
	if (options.includes('N/A')) options.splice(options.indexOf('N/A'), 1);

	const renderSelect = () => {
		return (
			<Select
				allowClear={allowClear}
				className={className}
				disabled={disabled}
				filterOption={(input, { props }) => props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
				mode={multiple ? 'multiple' : 'default'}
				onChange={e => onChange({ target: { name: id, value: e } }, id, e)}
				onClear={e => onChange({ target: { name: id, value: '' } }, id, '')}
				optionFilterProp="children"
				placeholder={placeholder || label || id}
				showSearch
				style={{ width: '100%', ...styles }}
				value={value ? value : ''}>
				{options.map(e => (
					<Select.Option key={e} value={e === 'All' ? 'all' : e}>
						{e}
					</Select.Option>
				))}
			</Select>
		);
	};

	const formItemCommonProps = {
		colon: false,
		help: error ? error : '',
		label: withLabel ? (
			<>
				<div style={{ float: 'right' }}>{extra}</div> <span class="label">{label}</span>
			</>
		) : (
			false
		),
		required,
		validateStatus: error ? 'error' : 'success'
	};

	return (
		<Form.Item {...formItemCommonProps}>
			{browser ? renderSelect() : <Skeleton active paragraph={{ rows: 1, width: '100%' }} title={false} />}
		</Form.Item>
	);
};
