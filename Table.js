import React from 'react';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';

const Table = props => <MultiColumnList contentData={props.data} virtualize autosize />;

export default Table;
