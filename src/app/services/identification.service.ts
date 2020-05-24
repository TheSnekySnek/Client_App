import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';

@Injectable({
  providedIn: 'root'
})

/**
 * This service provides a way to identify a device
 */
export class IdentificationService {

  constructor(
    private uniqueDeviceID: UniqueDeviceID,
    private platform      : Platform
  ) { }

  /**
   * Gets the identifier of the device
   */
  public getUUID() {
    // We need to keep a reference to this
    var that = this;
    return new Promise(function (resolve, reject) {
      // Web platforms can't genereate the same id as mobile platforms
      if (that.platform.is("ios") || that.platform.is("android")) {
        // Call the plugin to get the id
        that.uniqueDeviceID.get()
          .then((uuid: any) => {
            resolve(uuid)
          })
          .catch((error: any) => {
            reject(error)
          });
      }
      else {
        var uuid = that.getBrowserUUID()
        resolve(uuid)
      }
    })
  }

  /**
   * Gets the id/fingerprint of the browser
   * by using a combination of screen info,
   * plugins and user agent
   */
  private getBrowserUUID() {
    var navigator_info = window.navigator;
    var screen_info    = window.screen;
    var uuid           = navigator_info.mimeTypes.length.toString();
    uuid += navigator_info.userAgent.replace(/\D+/g, '');
    uuid += navigator_info.plugins.length.toString();
    uuid += screen_info.height.toString() || '';
    uuid += screen_info.width.toString() || '';
    uuid += screen_info.pixelDepth.toString() || '';
    return uuid;
  }
}
