import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';

import 'react-select/dist/react-select.css';

const Select = (props) => {
	return (
		<ReactSelect.Async {...props} />
	);
};

Select.PropTypes = {
	placeholder: PropTypes.string,
	name: PropTypes.string,
	value: PropTypes.shape({
		label: PropTypes.string.isRequired,
		value: PropTypes.string.isRequired,
	}),
	options: PropTypes.array,
	onChange: PropTypes.func,
};

export default Select;
