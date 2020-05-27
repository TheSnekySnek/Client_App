import { Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';

@Injectable({
    providedIn: 'root'
})
export class StatService {

    constructor(
        private connection: ConnectionService
    ) { }

    /**
     * Emit an event to the server
     * @param eventName Name of the event
     * @param data      Data needed for the event
     * @param data2     Data needed for the event
     */
    private emitToSocket(eventName: string, data?: any): Promise<any> {
        const that = this;
        return new Promise(async (resolve, reject) => {
            if (data) {
                that.connection.socket.emit(eventName, data,
                    (debates: any) => {
                        resolve(debates);
                    }
                );
            } else {
                that.connection.socket.emit(eventName,
                    (debates: any) => {
                        resolve(debates);
                    }
                );
            }
        });
    }

    /**
     * Get the stats for an admin on the server
     */
    public getAdminStats(): Promise<any[]> {
        return this.emitToSocket('getAdminStats',);
    }

    /**
     * Get the stats for a debate in the server
     * @param id Id of the debate
     */
    public getDebateStats(id: string) {
        return this.emitToSocket('getDebateStats', id);
    }

    /**
     * Get the stats for a question on the server
     * @param idQuestion Array containing the id of the question and the id of the discussion
     */
    public getQuestionStats(idQuestion: any) {
        return this.emitToSocket('getQuestionStats', idQuestion);
    }
}
