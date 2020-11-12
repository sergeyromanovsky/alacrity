module.exports = {
  client: {
    service: {
      url: 'http://localhost:4567/graphql',
      addTypename: false,
    },
    includes: ['./src/gql/**/*.ts'],
    excludes: ['**/__tests__/**'],
  },
};
