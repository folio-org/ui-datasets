/* eslint-disable react/prop-types */

import React from 'react';
import Link from 'react-router-dom/Link';
import Route from 'react-router-dom/Route';

import { Accordion } from '@folio/stripes-components/lib/Accordion';
import Layer from '@folio/stripes-components/lib/Layer';
import Pane from '@folio/stripes-components/lib/Pane';

import View from './View';
import Table from './Table';

const renderers = { table: Table };

class Dataset extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <Pane defaultWidth="44%" paneTitle={this.props.match.params.dataset}>
        <Accordion label="Dataset information">
          ...eventually we will have some information about the dataset here.
        </Accordion>
        <Accordion label="View/filter data">
          <Link to={`${this.props.match.url}/view/table`}>Table</Link>
        </Accordion>
        <Accordion label="Column metadata">
          Accordion components cannot be empty?
        </Accordion>
        <Route
          path={`${this.props.match.path}/view/:type`}
          render={props => (
            <Layer isOpen label="View dataset">
              <View renderer={renderers[props.match.params.type]} glint={this.props.glint} {...props} />
            </Layer>
          )}
        />
      </Pane>
    );
  }
}

export default Dataset;
