import React from 'react';
import Link from 'react-router-dom/Link';
import Route from 'react-router-dom/Route';

import { Accordion } from '@folio/stripes-components/lib/Accordion';
import Layer from '@folio/stripes-components/lib/Layer';
import Pane from '@folio/stripes-components/lib/Pane';

import ColumnsMd from './ColumnsMd';
import View from './View';
import Table from './Table';

const renderers = { table: Table };

class Dataset extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const { history, match, closeURL } = this.props;
    return (
      <Pane
        defaultWidth="44%"
        paneTitle={match.params.dataset}
        dismissible
        onClose={() => history.push(closeURL)}
      >
        <Accordion label="Dataset information">
          ...eventually we will have some information about the dataset here.
        </Accordion>
        <Accordion label="View/filter data">
          <Link to={`${match.url}/view/table`}>Table</Link>
        </Accordion>
        <Accordion label="Column metadata">
          <ColumnsMd
            glint={this.props.glint}
            user={match.params.user}
            dataset={match.params.dataset}
          />
        </Accordion>
        <Route
          path={`${match.path}/view/:type`}
          render={props => (
            <Layer isOpen label="View dataset">
              <View
                renderer={renderers[props.match.params.type]}
                glint={this.props.glint}
                closeURL={match.url}
                {...props}
              />
            </Layer>
          )}
        />
      </Pane>
    );
  }
}

export default Dataset;
