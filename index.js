/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import Link from 'react-router-dom/Link';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';

import Layer from '@folio/stripes-components/lib/Layer';
import Button from '@folio/stripes-components/lib/Button';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import SearchField from '@folio/stripes-components/lib/structures/SearchField';
import Pane from '@folio/stripes-components/lib/Pane';
import Paneset from '@folio/stripes-components/lib/Paneset';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import IconButton from '@folio/stripes-components/lib/IconButton';
import Icon from '@folio/stripes-components/lib/Icon';

import Dataset from './Dataset';

const glint = {
  url: 'http://localhost:8088',
  headers: {
  },
};

const NoMatch = () => <div>No match!</div>;

const newDatasetButton = (
  <PaneMenu>
    <Button
      onClick={this.addNewDataset}
      title="Add new dataset"
      buttonStyle="primary paneHeaderNewButton"
      marginBottom0
    >+ New
    </Button>
  </PaneMenu>
);

class Datasets extends React.Component {
  constructor(props) {
    super(props);
    this.state = { datasets: [] };
  }

  componentDidMount() {
    this.refresh();
  }

  refresh = () => {
    const { match: { params } } = this.props;
    fetch(`${glint.url}/${params.user}`, { headers: glint.headers }).then(res => res.text().then((body) => {
      if (res.ok) {
        this.setState({ datasets: body.split('\n').slice(1, -1) });
      } else {
        throw new Error(`HTTP error ${body}`);
      }
    }));
  }

  onSelectRow = (e, meta) => {
    this.props.history.push(`${this.props.match.url}/${meta.Name}`);
    this.setState({ clicked: { Name: meta.Name } });
  }

  render() {
    const { match } = this.props;
    return (
      <Paneset>
        <Pane
          id="pane-filter"
          defaultWidth="16%"
          paneTitle="Search & Filter"
        >
          <SearchField />
        </Pane>
        <Pane
          padContent={false}
          id="pane-results"
          defaultWidth="fill"
          paneTitle="Datasets"
          lastMenu={newDatasetButton}
          noOverflow
        >
          <MultiColumnList
            contentData={this.state.datasets.map(item => ({ Name: item }))}
            onRowClick={this.onSelectRow}
            selectedRow={this.state.clicked}
            virtualize
            autosize
          />
        </Pane>
        <Route
          path={`${match.path}/:dataset`}
          render={props => <Dataset glint={glint} closeURL={match.url} {...props} />}
        />
      </Paneset>
    );
  }
}

export default props => (
  <Switch>
    <Route
      path={`${props.match.path}/:user`}
      render={props2 => <Datasets glint={glint} stripes={props.stripes} {...props2} />}
    />
    <Route component={() => <div>TODO: listing available datasets from all users</div>} />
  </Switch>
);
