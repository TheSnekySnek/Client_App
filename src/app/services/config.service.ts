import { Injectable } from '@angular/core';


const GLOBAL_CONFIG = {
  "environment": "PROD",
  "constants": {
      "prod": {
          "admin": {
              "SOCKET_ADDRESS"        : "https://sondage.codeheure.com",
              "SOCKET_PORT"           : 8080,
              "SOCKET_PATH"           : "/socket-io",
              "SOCKET_NAMESPACE"      : "/admin"
          },
          "client": {
              "SOCKET_ADDRESS"        : "https://sondage.codeheure.com",
              "SOCKET_PORT"           : 8080,
              "SOCKET_PATH"           : "/socket-io",
              "SOCKET_NAMESPACE"      : "/DEBATE-"
          }
      },
      "dev": {
          "admin": {
              "SOCKET_ADDRESS"        : "https://sondage.codeheure.com",
              "SOCKET_PORT"           : 8080,
              "SOCKET_PATH"           : "/socket-io",
              "SOCKET_NAMESPACE"      : "/admin"
          },
          "client": {
              "SOCKET_ADDRESS"        : "https://sondage.codeheure.com",
              "SOCKET_PORT"           : 8080,
              "SOCKET_PATH"           : "/socket-io",
              "SOCKET_NAMESPACE"      : "/DEBATE-"
          }
      },
      "test":{
          "TEST_DEBATE_CODE"          : "TEST",
          "TEST_WRONG_DEBATE_CODE"    : "INVALID",
          "TEST_USERNAME"             : "admin",
          "TEST_PASSWORD"             : "passpass",
          "TEST_WRONG_PASSWORD"       : "wrongpass"
      }
  }
}


@Injectable({
  providedIn: 'root'
})

/**
 * This service provides constants used by other services or componnents
 */
export class ConfigService {
  private config    : any;
  private testConfig: any;

  constructor() {
    switch(GLOBAL_CONFIG["environment"]){
      case "DEV":
      this.config = GLOBAL_CONFIG["constants"]["dev"];
      break;

      case "PROD":
      this.config = GLOBAL_CONFIG["constants"]["prod"];
      break;

      // Assume production as default
      default: 
      console.warn("Environment not set. Assuming production")
      this.config = GLOBAL_CONFIG["constants"]["prod"];
      break;
    }

    this.testConfig = GLOBAL_CONFIG["constants"]["test"]
  }


  /**
   * Returns the Cient configuration
   */
  public getClientConfig(){
    return this.config["client"];
  }

  /**
   * Returns the Admin configuration
   */
  public getAdminConfig(){
    return this.config["admin"];
  }

  /**
   * Returns the test configuration
   */
  public getTestConfig(){
    return this.testConfig;
  }

}
