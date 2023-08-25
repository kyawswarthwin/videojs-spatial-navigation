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
        const element = event.target as HTMLElement;

        if (event.keyCode === 13) {
          // Enter
          event.preventDefault();

          if (!$(element).is('li.vjs-menu-item')) {
            $('.vjs-play-control').trigger('focus');
          }
        }
      });

      this.player.on('userinactive', () => {
        if (
          (!this.player.paused() || this.player.ended()) &&
          $(':focus').is('.vjs-button')
        ) {
          $('.video-js').trigger('focus');
        }
      });

      $('.vjs-control-bar')
        .find('.vjs-button')
        .attr('tabindex', '-1')
        .on('keydown', (event: KeyboardEvent) => {
          const element = event.target as HTMLElement;

          if (event.keyCode === 13) {
            // Enter
            $(element).trigger('click');
          } else if (event.keyCode === 37) {
            // ArrowLeft
            $(element)
              .prevAll('.vjs-button:not(.vjs-hidden)')
              .first()
              .trigger('focus');
          } else if (event.keyCode === 39) {
            // ArrowRight
            $(element)
              .nextAll('.vjs-button:not(.vjs-hidden)')
              .first()
              .trigger('focus');
          }

          return false;
        });

      $('.vjs-control-bar')
        .find('div.vjs-menu-button')
        .on('keydown', (event: KeyboardEvent) => {
          const element = event.target as HTMLElement;

          if (event.keyCode === 13) {
            // Enter
            $(element).find('button.vjs-button').trigger('click');

            $(element)
              .find('ul.vjs-menu-content > li.vjs-menu-item')
              .on('keydown', (event: KeyboardEvent) => {
                if (event.keyCode === 13) {
                  // Enter
                  $(element).trigger('focus');
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
