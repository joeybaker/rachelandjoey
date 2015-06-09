export default {
  findNames: (input, callback) => callback(null, ['billy', 'bobby', 'will'])
  , onPartyNameSelect: () => {}
  , party: {
    attending: true
    , names: ['me']
    , meals: {
      me: 'cannelloni with spinach, goat cheese, and pine nuts'
    }
  }
}
