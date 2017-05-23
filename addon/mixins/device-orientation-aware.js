import Ember from 'ember';

const { Mixin, computed, computed: { alias }, getOwner } = Ember;

function injectService(serviceName) {
  return computed(function() {
    return getOwner(this).lookup(`service:${serviceName}`);
  });
}

export default Mixin.create({
  _orientationService: injectService('device-orientation'),

  init() {
    this._super(...arguments);
    this.get('_orientationService').on('tilt', this, this.didTilt);
    this.get('_orientationService').on('debouncedTilt', this, this.debouncedDidTilt);
    this.get('_orientationService').on('deviceMove', this, this.didMove);
    this.get('_orientationService').on('debouncedDeviceMove', this, this.debouncedDidMove);
  },

  tiltAlpha: alias('_orientationService.alpha'),
  tiltBeta: alias('_orientationService.beta'),
  tiltGamma: alias('_orientationService.gamma'),

  didTilt(/* evt*/) {},
  debouncedDidTilt(/* evt*/) {},
  didMove(/* evt*/) {},
  debouncedDidMove(/* evt*/) {}
});
