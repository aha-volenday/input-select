import React from 'react';
import { Form, Select, Skeleton } from 'antd';

const browser = typeof window !== 'undefined' ? true : false;

if (browser) require('./styles.css');

export default ({
	allowClear = false,
	disabled = false,
	error,
	extra = null,
	id,
	inlineError = true,
	label = '',
	list,
	multiple,
	onChange,
	placeholder = '',
	required = false,
	value = '',
	withLabel = false
}) => {
	let options = [...list];
	if (options.includes('N/A')) options.splice(options.indexOf('N/A'), 1);

	const renderSelect = () => {
		return (
			<Select
				allowClear={allowClear}
				disabled={disabled}
				filterOption={(input, { props }) => props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
				mode={multiple ? 'multiple' : 'default'}
				onChange={e => onChange({ target: { name: id, value: e } }, id, e)}
				onClear={e => onChange({ target: { name: id, value: '' } }, id, '')}
				optionFilterProp="children"
				placeholder={placeholder || label || id}
				showSearch
				style={{ width: '100%' }}
				value={value ? value : ''}>
				{options.map(e => (
					<Select.Option key={e} value={e === 'All' ? 'all' : e}>
						{e}
					</Select.Option>
				))}
			</Select>
		);
	};

	let formItemCommonProps = {
		colon: false,
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
	if (inlineError) formItemCommonProps = { ...formItemCommonProps, help: error ? error : '' };

	return (
		<Form.Item {...formItemCommonProps}>
			{browser ? renderSelect() : <Skeleton active paragraph={{ rows: 1, width: '100%' }} title={false} />}
		</Form.Item>
	);
};
