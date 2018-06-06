import React from 'react';
import Select from 'react-select';
import '!style-loader!css-loader!react-select/dist/react-select.css'; // eslint-disable-line

import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';

// react-select has no option to just use an array of strings
const selectify = arr => arr.map(el => ({ label: el, value: el }));

class ColumnMd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      md: props.md,
      isLoading: false,
      isDisabled: false,
    };
  }

  handleChange = (newValues) => {
    this.setState({
      isLoading: true,
      isDisabled: true,
    });
    const newMd = newValues.map(obj => obj.value);
    const newMdStr = newMd.length > 0 ? newMd[newMd.length - 1] : '';
    const { glint: { url, headers }, user, dataset, col } = this.props;
    fetch(`${url}/${user}/${dataset}.${col}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ metadata: newMdStr })
    }).then(res => res.text().then((body) => {
      if (res.ok) {
        this.setState({
          isLoading: false,
          isDisabled: false,
          // md: newMd,
          md: [newMdStr],
        });
      } else {
        throw new Error(`HTTP error ${body}`);
      }
    }));
    // TODO: have this work consistently
    // this.props.createOption(newValues);
  }

  render() {
    const { col, options } = this.props;
    const { md, isLoading, isDisabled } = this.state;
    return (
      <div style={{ width: '100%' }}>
        <Row middle="md" key={col}>
          <Col md={3} style={{ textAlign: 'right' }}>
            <label htmlFor={`colmdselect-${col}`}>{col}</label>
          </Col>
          <Col md={9}>
            <Select.Creatable
              id={`colmdselect-${col}`}
              isClearable
              isDisabled={isDisabled}
              isLoading={isLoading}
              multi
              onChange={this.handleChange}
              options={selectify(options)}
              value={selectify(md)}
              key={col}
            />
          </Col>
        </Row>
      </div>
    );
    // ^- can't use end="md" on a Col, see: https://github.com/roylee0704/react-flexbox-grid/issues/142
  }
}

export default ColumnMd;
