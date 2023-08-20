import $ from 'jquery';
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
      this.player.on('keydown', (event) => {
        if (event.keyCode === 13) {
          // Enter
          if (!$(':focus').is('li.vjs-menu-item')) {
            $('.vjs-play-control').focus();
          }
        }
      });

      $('.vjs-control-bar')
        .find('.vjs-button')
        .attr('tabindex', '-1')
        .keydown((event) => {
          event.preventDefault();

          if (event.keyCode === 13) {
            // Enter
            $(':focus').click();
          } else if (event.keyCode === 37) {
            // ArrowLeft
            $(':focus').prevAll('.vjs-button:not(.vjs-hidden)').first().focus();
          } else if (event.keyCode === 39) {
            // ArrowRight
            $(':focus').nextAll('.vjs-button:not(.vjs-hidden)').first().focus();
          }
        });

      $('.vjs-control-bar')
        .find('div.vjs-menu-button')
        .keydown(function (event) {
          if (event.keyCode === 13) {
            // Enter
            $(this).find('button.vjs-button').click();

            $(this)
              .find('ul.vjs-menu-content > li.vjs-menu-item')
              .keydown((event) => {
                if (event.keyCode === 13) {
                  // Enter
                  $(this).focus();
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
