import React from 'react';
import { withRouter } from 'react-router';

import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import IconButton from '@folio/stripes-components/lib/IconButton';

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
