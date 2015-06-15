export default {
  findNames: (input, callback) => callback(null, ['billy', 'bobby', 'will'])
  , onPartyNameSelect: () => {}
  , party: {
    attending: null
    , names: ['me', 'second', 'third']
    , meals: {
      me: 'cannelloni with spinach, goat cheese, and pine nuts'
      , second: 'cannelloni with spinach, goat cheese, and pine nuts'
    }
  }
}
