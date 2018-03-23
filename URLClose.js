import React from 'react';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import IconButton from '@folio/stripes-components/lib/IconButton';
import { withRouter } from 'react-router';

export default withRouter(({ url, id, history }) => (
  <PaneMenu>
    <IconButton
      id={id}
      onClick={() => history.push(url)}
      title="close"
      ariaLabel="Close"
      icon="closeX"
    />
  </PaneMenu>
));
