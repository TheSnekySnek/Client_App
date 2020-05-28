import { Component, OnInit } from '@angular/core';
import {DebateService} from "../../../services/debate.service";
import {ActionSheetController, AlertController, ModalController} from "@ionic/angular";
import { ActionSheetOptions, ActionSheetButton } from '@ionic/core';
import {QrcodePage} from "../qrcode/qrcode.page";
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'app-debate-details',
  templateUrl: './debate-details.page.html',
  styleUrls: ['./debate-details.page.scss'],
})
export class DebateDetailsPage implements OnInit {
  debateId              : string;
  details               : any;
  lockAction            : ActionSheetButton;
  unlockAction          : ActionSheetButton;
  curAction             : ActionSheetButton;

  constructor(
    private debateManager         : DebateService,
    private actionSheetController : ActionSheetController,
    private modalController       : ModalController,
    private alertController       : AlertController,
    private notificationManager   : NotificationService
  ) { }


  async debateActions() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions sur le débat',
      cssClass: 'action-menu',
      buttons: [{
        text: 'Fermer le débat',
        role: 'destructive',
        icon: 'close-circle-outline',
        handler: () => {
          this.closeDebate();
        }
      },
        this.curAction,
        {
          text: 'Générer un code QR',
          icon: 'aperture-outline',
          handler: () => {
            this.displayQRCode();
          }
        }, {
          text: 'Annuler',
          icon: 'close',
          role: 'cancel'
        }]
    });

    await actionSheet.present();
  }

  /**
   * Update the debate details
   */
  async updateDetails() {
    this.details = await this.debateManager.getDebateDetails(this.debateId);
    if (this.details.locked === true)
      this.curAction = this.unlockAction;
    else
      this.curAction = this.lockAction;
  }

  /**
   * Executes on page initialisation
   */
  async ngOnInit() {
    this.lockAction   = {
      text: 'Verrouiller le débat',
      icon: 'lock-closed-outline',
      handler: () => {
        this.lockDebate();
      }
    };
    this.unlockAction = {
      text: 'Déverrouiller le débat',
      icon: 'lock-open-outline',
      handler: () => {
        this.unlockDebate();
      }
    };
    this.curAction = this.lockAction;
  }

  /**
   * Send a popup and close debate
   */
  async closeDebate() {
    const alert = await this.alertController.create({
      cssClass: 'alert',
      header: "Fermer le débat",
      message: 'Cette action est définitive, vous ne pourrez plus ajouter de questions.<br />Aucun utilisateur ne sera capable de répondre ou de se connecter au débat.',
      buttons: [
        {
          text: 'Oui',
          handler: async () => {
            // Close the debate
            let res = await this.debateManager.closeDebate(this.debateId);
            if (res)
              this.notificationManager.displayInfo("Le débat a été fermé.");
            else
              this.notificationManager.displayInfo("Erreur lors de la fermeture du débat.");
          }
        },
        {
          text: 'Non',
          handler: () => {
          }
        },
      ]
    });

    // Display the alert
    await alert.present();
  }

  /**
   * Lock the debate
   */
  async lockDebate() {
    let res = await this.debateManager.lockDebate(this.debateId);
    if (res === true) {
      this.curAction = this.unlockAction;
      this.notificationManager.displayInfo("Le débat a été verrouillé.");
    } else {
      this.notificationManager.displayInfo("Impossible de verrouiller le débat.");
    }
  }

  /**
   * Unlock the debate
   */
  async unlockDebate() {
    let res = await this.debateManager.unlockDebate(this.debateId);
    if (res === true) {
      this.curAction = this.lockAction;
      this.notificationManager.displayInfo("Le débat a été déverrouillé.");
    } else {
      this.notificationManager.displayInfo("Impossible de déverrouiller le débat.")
    }
  }
  /**
   * Display the QRCode to join the debate
   */
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
