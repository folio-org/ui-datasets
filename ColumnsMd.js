import React from 'react';
import ColumnMd from './ColumnMd';

class ColumnsMd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      mdByCol: null,
      mdByColKey: null,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (state.mdByCol !== null
      && props.glint
      && state.mdByColKey !== props.glint.url + props.user + props.dataset) {
      return { mdByCol: null, mdByColKey: null };
    }
    return null;
  }

  componentDidMount() {
    this.fetchColMd();
  }

  componentDidUpdate() {
    if (this.state.mdByColKey === null) this.fetchColMd();
  }

  fetchColMd() {
    const { glint, user, dataset } = this.props;
    this.setState({ mdByColKey: glint.url + user + dataset });
    fetch(`${glint.url}/${user}/${dataset}?md()`).then(res => res.text().then((body) => {
      if (res.ok) {
        const rawCols = body.substr(0, body.indexOf('\n')).split(',');
        const re = /(.*)\{(.*)\}$/;
        const mdByCol = rawCols.reduce((acc, colWithMd) => {
          let col;
          let md = [];
          const match = re.exec(colWithMd);
          if (match === null) {
            col = colWithMd;
          } else if (match.length === 3) {
            col = match[1];
            md = [match[2]];
            this.createOption(md);
          } else {
            throw new Error(`Unexpected column name ${colWithMd}`);
          }
          acc[col] = md;
          return acc;
        }, {});
        this.setState({ mdByCol });
      } else {
        throw new Error(`HTTP error ${body}`);
      }
    }));
  }

  createOption = (opt) => {
    const existing = this.state.options;
    // presumes this is only being called with an object from react-select
    if (Array.isArray(opt)) {
      this.setState({ options: [...existing, ...opt.filter(o => !existing.includes(o))] });
    } else if (typeof opt === 'object') {
      this.setState({ options: [...existing, opt.value] });
    } else if (typeof opt === 'string' && !existing.includes(opt)) {
      this.setState({ options: [...existing, opt] });
    }
  }


  render() {
    if (!this.state.mdByCol) {
      return (
        <div>Loading...</div>
      );
    }
    return (
      <div style={{ width: '100%' }}>
        {Object.keys(this.state.mdByCol).map(col => (
          <ColumnMd
            glint={this.props.glint}
            user={this.props.user}
            dataset={this.props.dataset}
            col={col}
            md={this.state.mdByCol[col]}
            options={this.state.options}
            createOption={this.createOption}
            key={col}
          />
        ))}
        {/* Apparently we need to make room for the dropdowns, this is awkward, hopefully there's a better way */}
        <div style={{ height: '10em' }} />
      </div>
    );
  }
}

export default ColumnsMd;
