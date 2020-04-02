import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/**
 * This service provides constants used by other services or componnents
 */
export class ConfigService {
  private config: any;
  private testConfig: any;

  constructor() {
    //Get the config file
    var globalConfig = require("../../assets/config.json");
    
    //Check the environment
    switch(globalConfig["environment"]){
      case "DEV":
      this.config = globalConfig["constants"]["dev"];
      break;

      case "PROD":
      this.config = globalConfig["constants"]["prod"];
      break;

      //Assume production as default
      default: 
      console.warn("Environment not set. Assuming production")
      this.config = globalConfig["constants"]["prod"];
      break;
    }

    this.testConfig = globalConfig["constants"]["test"]
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
