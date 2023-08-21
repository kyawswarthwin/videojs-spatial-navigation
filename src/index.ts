import $ from 'cash-dom';
import videojs from 'video.js';

import { version as VERSION } from '../package.json';

const Plugin = videojs.getPlugin('plugin');

const defaults = {};

class SpatialNavigation extends Plugin {
  static defaultState: {};
  static VERSION: string;

  options: any;

  constructor(player: videojs.Player, options: any) {
    super(player);

    this.options = videojs.mergeOptions(defaults, options);

    this.player.ready(() => {
      this.player.on('keydown', (event: KeyboardEvent) => {
        if (event.keyCode === 13) {
          // Enter
          if (!$(':focus').is('li.vjs-menu-item')) {
            $('.vjs-play-control').trigger('focus');
          }
        }
      });

      $('.vjs-control-bar')
        .find('.vjs-button')
        .attr('tabindex', '-1')
        .on('keydown', (event: KeyboardEvent) => {
          event.preventDefault();

          if (event.keyCode === 13) {
            // Enter
            $(':focus').trigger('click');
          } else if (event.keyCode === 37) {
            // ArrowLeft
            $(':focus')
              .prevAll('.vjs-button:not(.vjs-hidden)')
              .first()
              .trigger('focus');
          } else if (event.keyCode === 39) {
            // ArrowRight
            $(':focus')
              .nextAll('.vjs-button:not(.vjs-hidden)')
              .first()
              .trigger('focus');
          }
        });

      $('.vjs-control-bar')
        .find('div.vjs-menu-button')
        .on('keydown', (event: KeyboardEvent) => {
          const node = event.target as HTMLElement;

          if (event.keyCode === 13) {
            // Enter
            $(node).find('button.vjs-button').trigger('click');

            $(node)
              .find('ul.vjs-menu-content > li.vjs-menu-item')
              .on('keydown', (event: KeyboardEvent) => {
                if (event.keyCode === 13) {
                  // Enter
                  $(node).trigger('focus');
                }
              });
          }
        });
    });
  }
}

SpatialNavigation.defaultState = {};

SpatialNavigation.VERSION = VERSION;

videojs.registerPlugin('spatialNavigation', SpatialNavigation);

export default SpatialNavigation;
