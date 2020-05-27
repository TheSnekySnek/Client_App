import { Component, OnInit } from '@angular/core';
import {DebateService} from "../../../services/debate.service";
import {ActionSheetController, ModalController} from "@ionic/angular";
import { ActionSheetOptions } from '@ionic/core';
import {QrcodePage} from "../qrcode/qrcode.page";

@Component({
  selector: 'app-debate-details',
  templateUrl: './debate-details.page.html',
  styleUrls: ['./debate-details.page.scss'],
})
export class DebateDetailsPage implements OnInit {
  debateId              : string;
  details               : any;
  debateActionsOptions  : ActionSheetOptions = {
    header: 'Actions sur le débat',
    cssClass: 'action-menu',
    buttons: [{
      text: 'Close debate',
      role: 'destructive',
      icon: 'close-circle-outline',
      handler: () => {
        this.closeDebate();
      }
    }, {
      text: 'Lock debate',
      icon: 'lock-closed-outline',
      handler: () => {
        this.lockDebate();
      }
    }, {
      text: 'Generate QR Code',
      icon: 'aperture-outline',
      handler: () => {
        this.displayQRCode();
      }
    }, {
      text: 'Cancel',
      icon: 'close',
      role: 'cancel'
    }]
  };

  constructor(
    private debateManager         : DebateService,
    private actionSheetController : ActionSheetController,
    private modalController       : ModalController
  ) { }


  async debateActions() {
    const actionSheet = await this.actionSheetController.create(this.debateActionsOptions);
    await actionSheet.present();
  }

  /**
   * Update the debate details
   */
  async updateDetails() {
    this.details = await this.debateManager.getDebateDetails(this.debateId);
  }

  /**
   * Executes on page initialisation
   */
  async ngOnInit() {
  }

  closeDebate() {

  }

  lockDebate() {

  }

  async displayQRCode() {
    const modal = await this.modalController.create({
      component: QrcodePage,
      componentProps: {
        debateId: this.debateId.toString()
      },
      cssClass: 'qrcode-modal'
    });
    await modal.present();
  }

  /**
   * Get the debate id from the debate manager
   */
  ionViewWillEnter(){
    this.debateId = this.debateManager.getSavedDebate()['debateId'];
    this.updateDetails();
  }

}
