import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Injectable({
  providedIn: 'root'
})

/**
 * This service provides a way to notify the user inside and outside the app
 */
export class NotificationService {

  constructor(
    private toastCtrl: ToastController,
    private localNotifications: LocalNotifications
    ) { }

  /**
   * Display a toast info notification inside the app
   * @param text Text to display
   */
  public async displayInfo(text: string) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 2000,
      color: "primary",
      position: "top"
    });
    toast.present();
  }

  /**
   * Displays a toast error notification inside the app
   * @param text Text to display
   */
  public async displayError(text: string) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 2000,
      color: "danger",
      position: "top"
    });
    toast.present();
  }

  /**
   * Displays a native notification for mobile devices
   * @param title Title of the notification
   * @param text  Text of thenotification
   */
  public displayNotification(title: string, text: string) {
    this.localNotifications.schedule({
      title: title,
      text: text,
      foreground: true
    });
  }
}
