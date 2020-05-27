import { Injectable, Inject, Optional } from '@angular/core';
import { NotificationService } from './notification.service'
import { IdentificationService } from './identification.service'
import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { ConfigService } from './config.service';


@Injectable({
  providedIn: 'root'
})

/**
 * This service provides a way to connect to the server and join/leave debates
 */
export class ConnectionService {

  //Prevents from showing the error multiple times
  hasShownConnectError: boolean;
  public socket       : Socket;

  constructor(
    private notification  : NotificationService,
    private identification: IdentificationService,
    private config        : ConfigService
  ) { }

  /**
   * Connects to the server
   * This is usually done automatically after inialising the socket
   */
  public connect() {
    this.socket.connect();
  }

  /**
   * Disconect from the server
   */
  public disconnect() {
    this.socket.disconnect();
  }

  /**
   * Join a debate
   * @param code code used to join the debate
   */
  public async join(code: string) {
    //Keep a reference to this
    var that = this
    return new Promise(async function (resolve, reject) {
      //Get the id of the device
      const uuid = await that.identification.getUUID();
      //Create a new socket to the client endpoint
      if (that.socket) that.disconnect();
      const clientSocketConfig: SocketIoConfig = {
        url:  that.config.getClientConfig()['SOCKET_ADDRESS']  +
              ":"                                              +
              that.config.getClientConfig()['SOCKET_PORT']     +
              that.config.getClientConfig()['SOCKET_NAMESPACE']+
              code,
        options: {
          path: that.config.getClientConfig()["SOCKET_PATH"],
          autoConnect: false,
          query: {
            uuid: uuid
          }
        }
      };

      that.socket = new Socket(clientSocketConfig);

      //Listen for successful connection or failure

      //Socket connected
      that.socket.on('connect', function () {
        //Prevent events for firing again
        that.socket.removeAllListeners();
        that.setupListeners()
        resolve({
          connected: true
        });
      });

      //Socket failed to connect
      that.socket.on('error', function (error) {
        console.log(error)
        //Prevent events for firing again
        that.socket.removeAllListeners();
        resolve({
          connected: false,
          message: error
        });
      });

      that.socket.connect();
    })
  }

  /**
   * Let's an admin login on the server
   * @param username admin username
   * @param password admin password
   */
  public login(username: string, password: string) {
    //Keep a reference to this
    var that = this
    return new Promise(async function (resolve, reject) {
      //Create a new socket to the admin endpoint
      if (that.socket) that.disconnect();
      const adminSocketConfig: SocketIoConfig = {
        url:  that.config.getAdminConfig()['SOCKET_ADDRESS']  +
              ":"                                             +
              that.config.getAdminConfig()['SOCKET_PORT']     +
              that.config.getAdminConfig()['SOCKET_NAMESPACE'],
        options: {
          path: that.config.getAdminConfig()["SOCKET_PATH"],
          autoConnect: false,
          query: {
            username: username,
            password: password
          }
        }
      };

      that.socket = new Socket(adminSocketConfig);

      //Listen for successful connection or failure

      //Socket connected
      that.socket.on('connect', function () {
        //Prevent events for firing again
        that.socket.removeAllListeners();
        that.setupListeners()
        
        resolve({
          connected: true
        });
      });

      //Socket failed to connect
      that.socket.on('error', function (error) {
        //Prevent events for firing again
        that.socket.removeAllListeners();
        resolve({
          connected: false,
          message: error
        });
      });

      that.socket.connect();
    })
  }

  /**
   * Setup listeners to notify the user of the status of the connection
   */
  private setupListeners() {
    //Display an error if we are unable to connect to the server
    this.socket.on('connect_error', (error) => {
      //Only show the error once
      if (!this.hasShownConnectError) {
        this.notification.displayError(error)
        this.hasShownConnectError = true;
      }
    });

    //Display a message if we are connected to the server
    /*this.onConnect(() => {
      this.notification.displayInfo("Connected to server")
    })
    */
    //Display a message if we were disconnected from the server
    this.onDisconnect(() => {
      this.notification.displayInfo("Disconnected from server")
    })
  }

  
  /**
   * Returns true if the client is connected to the server
   */
  public isConnected() {
    return this.socket.ioSocket.connected;
  }

  /**
   * Calls a callback when the client is connected to the server
   * @param callback function to callback
   */
  public onConnect(callback: Function) {
    //Listen for the connect event
    this.socket.on('connect', () => {
      callback()
    });
  }

  /**
   * Calls a callback when the client is disconnected from the server
   * @param callback function to callback
   */
  public onDisconnect(callback: Function) {
    //Listen for the disconnect event
    this.socket.on('disconnect', () => {
      callback()
    });
  }

}
