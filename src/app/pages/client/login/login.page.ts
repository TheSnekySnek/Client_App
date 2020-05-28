import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Platform, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

import {NotificationService} from '../../../services/notification.service'
import {ConnectionService} from '../../../services/connection.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //Pin entered by the user
  inputPin: string;

  //Compatibilty with QR code
  isQRCompatible: boolean = false;

  constructor(
    private router        : Router, 
    private barcodeScanner: BarcodeScanner, 
    private platform      : Platform, 
    private notification  : NotificationService,
    private connection    : ConnectionService,
    public menuCtrl       : MenuController
  ) {}
    /**
   * Automatically closes the menu 
   */
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  /**
   * Executes on page initialisation
   */
  ngOnInit() {
    //Check if the device supports QR code scanning
    this.checkQRCompatibility();
  }

  /**
   * Checks if we can use the QR code scanner on the device.
   */
  checkQRCompatibility(){
    //QR code is only supported for ios and android
    if (this.platform.is("cordova") || this.platform.is("capacitor")) {
      this.isQRCompatible = true;
    }
  }

  /**
   * Login with the inputPin
   */
  loginWithPin() {
    this.login(this.inputPin);
  }

  /**
   * Login using a given pin
   * @param pin Pin to login with
   */
  async login(pin : string){
    //Check if the pin format is valid
    if(this.verifyPin(pin)){
      //If we successfuly joined go to question page
      var joinResponse = await this.connection.join(pin);
      if(joinResponse['connected']){
        //this.notification.displayInfo("Connected to debate")
        this.router.navigate(['home']);
        return;
      }else{
        this.notification.displayError(joinResponse['message']);
      }
    }
    else{
      //If pin is invalid show error
      this.notification.displayError("Invalid Pin");
    }
    
  }

  /**
   * Checks the format of a pin
   * @param pin Pin to check
   */
  verifyPin(pin: string) {
    //return (pin && pin.length == 6);
    return true;
  }

  /**
   * Starts the QR scan
   */
  startQR() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);

      //Login using the data
      this.login(barcodeData.text);
    }).catch(err => {
      console.log('Error', err);
    });
  }

}
