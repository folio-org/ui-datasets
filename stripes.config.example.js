module.exports = {
  config: {
    hasAllPerms: true,
    disableAuth: true,
  },
  modules: {
    '@folio/datasets': {
      glint: {
        url: 'http://localhost:8088',
        debuguser: 'user',
        debugpass: 'password'
      }
    },
  },
};
