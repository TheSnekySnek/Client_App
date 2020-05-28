import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { ConnectionService } from './services/connection.service';
import { QuestionService } from './services/question.service';
import { IdentificationService } from './services/identification.service';
import { NotificationService } from './services/notification.service';
import { DebateService } from './services/debate.service';
import {QrcodePageModule} from "./pages/admin/qrcode/qrcode.module";
import {QRCodeModule} from "angularx-qrcode";



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    QRCodeModule,
    QrcodePageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    UniqueDeviceID,
    LocalNotifications,
    ConnectionService,
    QuestionService,
    IdentificationService,
    NotificationService,
    DebateService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
