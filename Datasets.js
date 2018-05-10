import React from 'react';
import Route from 'react-router-dom/Route';

import Layer from '@folio/stripes-components/lib/Layer';
import Button from '@folio/stripes-components/lib/Button';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import SearchField from '@folio/stripes-components/lib/structures/SearchField';
import Pane from '@folio/stripes-components/lib/Pane';
import Paneset from '@folio/stripes-components/lib/Paneset';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import { modules } from 'stripes-config'; // eslint-disable-line

import Dataset from './Dataset';
import AddDataset from './AddDataset';
import LoginIndicator from './LoginIndicator';

const newDatasetButton = onClick => (
  <PaneMenu>
    <Button
      onClick={onClick}
      title="Add new dataset"
      buttonStyle="primary paneHeaderNewButton"
      marginBottom0
    >+ New
    </Button>
  </PaneMenu>
);

export default class Datasets extends React.Component {
  constructor(props) {
    super(props);
    this.state = { datasets: [] };
  }

  componentDidMount() {
    this.refresh();
  }

  refresh = () => {
    const { glint, match: { params } } = this.props;
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
          <LoginIndicator />
        </Pane>
        <Pane
          padContent={false}
          id="pane-results"
          defaultWidth="fill"
          paneTitle="Datasets"
          lastMenu={newDatasetButton(() => this.setState({ adding: true }))}
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
          render={props => <Dataset glint={this.props.glint} closeURL={match.url} {...props} />}
        />
        {this.state.adding &&
          <Layer isOpen label="View dataset">
            <AddDataset
              onClose={() => this.setState({ adding: false })}
              onSuccess={() => this.refresh()}
              glint={this.props.glint}
              user={match.params.user}
            />
          </Layer>
        }
      </Paneset>
    );
  }
}
