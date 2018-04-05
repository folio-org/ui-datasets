import React from 'react';
import { Field, reduxForm } from 'redux-form';

import Button from '@folio/stripes-components/lib/Button';
import Pane from '@folio/stripes-components/lib/Pane';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import IconButton from '@folio/stripes-components/lib/IconButton';
import TextField from '@folio/stripes-components/lib/TextField';

const CloseButton = ({ onClose }) => (
  <PaneMenu>
    <IconButton onClick={onClose} title="close" ariaLabel="Close" icon="closeX" />
  </PaneMenu>
);


// redux-form can't cope with a bare input type="file"
const adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);
const FileField = ({
  input: {
    value: omitValue, // eslint-disable-line
    onChange,
    onBlur,
    ...inputProps
  },
  meta: omitMeta, // eslint-disable-line
  ...props
}) => (
  <input
    onChange={adaptFileEventToValue(onChange)}
    onBlur={adaptFileEventToValue(onBlur)}
    type="file"
    {...inputProps}
    {...props}
  />
);

const NewDatasetForm = reduxForm({
  form: 'NewDataset',
})(({ handleSubmit, submitting }) => (
  <form onSubmit={handleSubmit}>
    <Field name="name" placeholder="Dataset name" aria-label="Dataset name" component={TextField} />
    <Field name="file" component={FileField} />
    <Button buttonStyle="primary noRadius" type="submit" disabled={submitting}>+ Add dataset</Button>
  </form>
));


class AddDataset extends React.Component {
  addDataset = (data) => {
    const reader = new FileReader();
    const { glint, user, onSuccess, onClose } = this.props;
    reader.onload = () => {
      fetch(`${glint.url}/${user}/${data.name}`, {
        method: 'PUT',
        headers: glint.headers,
        body: JSON.stringify({ data: reader.result })
      }).then(res => res.text().then((body) => {
        if (res.ok) {
          onSuccess();
          onClose();
        } else {
          throw new Error(`HTTP error ${body}`);
        }
      }));
    };
    reader.readAsText(data.file);
  };

  render() {
    return (
      <Pane
        firstMenu={(<CloseButton onClose={this.props.onClose} />)}
        defaultWidth="fill"
      >
        <NewDatasetForm onSubmit={this.addDataset} />
      </Pane>
    );
  }
}

export default AddDataset;
