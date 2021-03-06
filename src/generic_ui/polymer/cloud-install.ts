/// <reference path='./context.d.ts' />
/// <reference path='../../../../third_party/typings/es6-promise/es6-promise.d.ts' />
/// <reference path='../../../../third_party/polymer/polymer.d.ts' />

import uproxy_core_api = require('../../interfaces/uproxy_core_api');
import ui_constants = require('../../interfaces/ui');

var ui = ui_context.ui;

const DEFAULT_PROVIDER = 'digitalocean';

Polymer({
  openLoginDialog: function() {
    this.$.loginDialog.open();
  },
  closeDialogs: function() {
    this.$.loginDialog.close();
    this.$.installingDialog.close();
    this.$.successDialog.close();
    this.$.failureDialog.close();
  },
  loginTapped: function() {
    this.closeDialogs();
    ui.cloudInstallStatus = '';
    this.$.installingDialog.open();

    ui.cloudInstall({
      providerName: DEFAULT_PROVIDER,
      region: this.$.regionMenu.selected
    }).then(() => {
      this.closeDialogs();
      this.$.successDialog.open();
    }).catch((e: Error) => {
      // TODO: Figure out which fields in e are set, because message isn't.
      this.closeDialogs();
      this.$.failureDialog.open();
    })
  },
  select: function(e: Event, d: Object, input: HTMLInputElement) {
    input.focus();
    input.select();
  },
  ready: function() {
    this.ui = ui;
  }
});
