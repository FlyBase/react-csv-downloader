import React, { PropTypes, Component } from 'react';
import csv from './lib/csv';

class CsvDownload extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.state = {
			csv: csv(props.columns, props.data, props.separator, props.noHeader)
		};
	}

	componentWillReceiveProps(props) {
		this.setState({
			...this.state,
			csv: csv(props.columns, props.data, props.separator, props.noHeader)
		});
	}

	handleClick() {
		const { suffix, prefix, bom } = this.props;

		let bomCode = '';
		let filename = this.props.filename;

		if (filename.indexOf('.csv') === -1) {
			filename += '.csv';
		}

		if (bom) {
			bomCode = '%EF%BB%BF';
		}

		if (suffix) {
			if (typeof suffix === 'string' || typeof suffix === 'number') {
				filename = filename.replace('.csv', `_${suffix}.csv`);
			}
			else {
				filename = filename.replace('.csv', `_${(new Date()).getTime()}.csv`);
			}
		}

		if (prefix) {
			if (typeof prefix === 'string' || typeof prefix === 'number') {
				filename = `${prefix}_${filename}`;
			}
			else {
				filename = `${(new Date()).getTime()}_${filename}`;
			}
		}

		const a = document.createElement('a');
		a.textContent = 'download';
		a.download = filename;
		a.href = `data:text/csv;charset=utf-8,${bomCode}${encodeURIComponent(this.state.csv)}`;
		a.click();
	}

	render() {
		const { children, text } = this.props;

		if (typeof children === 'undefined') {
			return (
				<button onClick={this.handleClick}>
				{(() => (text) ? text : 'Download')}
				</button>
			);
		}

		return (
			<div onClick={this.handleClick}>
				{children}
			</div>
		);
	}
};

const PrefixSuffixType = PropTypes.oneOfType([
                                             PropTypes.bool,
																						 PropTypes.string,
																						 PropTypes.number
]);

CsvDownload.propTypes = {
  bom: PropTypes.bool,
  children: PropTypes.oneOfType([
                                PropTypes.array,
                                PropTypes.string,
                                PropTypes.element
  ]),
  columns: PropTypes.oneOfType([
                               PropTypes.bool,
                               PropTypes.array,
                               PropTypes.arrayOf(PropTypes.object)
  ]),
  data: PropTypes.arrayOf(PropTypes.oneOfType([
                                               PropTypes.object,
                                               PropTypes.array
  ])).isRequired,
  filename: PropTypes.string.isRequired,
  noHeader: PropTypes.bool,
  prefix: PrefixSuffixType,
  separator: PropTypes.string,
  text: PropTypes.string,
  suffix: PrefixSuffixType
};

CsvDownload.defaultProps = {
  separator: ',',
  columns: false,
  bom: true,
  noHeader: false
};

export default CsvDownload;
