import React from 'react';
import csv from 'csvtojson';
import Paneset from '@folio/stripes-components/lib/Paneset';
import Pane from '@folio/stripes-components/lib/Pane';

import URLClose from './URLClose';

class View extends React.Component {
  componentDidMount() {
    const { glint, match: { params: { user, dataset } } } = this.props;
    fetch(`${glint.url}/${user}/${dataset}`).then(res => res.text().then((body) => {
      if (res.ok) {
        csv().fromString(body).on('end_parsed', data => this.setState({ data }));
      } else {
        throw new Error(`HTTP error ${body}`);
      }
    }));
  }
  render() {
    const { renderer: Renderer } = this.props;
    if (this.state) {
      return (
        <Paneset>
          <Pane
            firstMenu={(<URLClose url={this.props.closeURL} />)}
            defaultWidth="fill"
          >
            <Renderer data={this.state.data} />
          </Pane>
        </Paneset>
      );
    }
    return <div>Loading...</div>;
  }
}

export default View;
