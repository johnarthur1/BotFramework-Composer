// this will be called by composer
function initialize(registration) {
  const plugin = {};
  // hosting UI in publish dialog idea:
  // - giving HTML string to registration method upfront
  //    =VS=
  // - giving HTML string to scoped render call on event trigger
  registration.addPublishMethod(plugin, null, 'Select your dropdown ');
  registration.on('selectPublishTarget', (event) => {
    console.log('plugin got event: ', event);
  });
}

module.exports = {
  initialize,
};
