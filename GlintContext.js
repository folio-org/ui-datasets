import React from 'react';

const GlintContext = React.createContext({
  glint: 'If you see this, something went wrong. Should have been replaced in constructor.',
});

export default GlintContext;
