import { Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';

@Injectable({
    providedIn: 'root'
})
export class DebateService {

    constructor(
        private connection: ConnectionService
    ) { }

    /**
     * Emit an event to the server
     * @param eventName Name of the event
     * @param data      Data needed for the event
     */
    private emitToSocket(eventName: string, data: {}) {
        const that = this;
        return new Promise(async (resolve, reject) => {
            that.connection.socket.emit(eventName, data,
                (debates: any) => {
                    resolve(debates);
                });
        });
    }

    /**
     * Get the debates available from the server
     */
    public getDebates() {
        return this.emitToSocket('getDebates', {});
    }

    /**
     * Get details about a debate from the server
     * @param id Id of the debate
     */
    public getDebateDetails(id: string) {
        return this.emitToSocket('getDebateDetails', { debateId: id });
    }

    /**
     * Get questions of the debate from the server
     * @param id Id of the debate
     */
    public getDebateQuestions(id: string) {
        return this.emitToSocket('getDebateQuestions', { debateId: id });
    }

    /**
     * Create a debate on the server
     * @param debate Debate to create
     */
    public createDebate(debate: any) {
        return this.emitToSocket('newDebate', { debate });
    }

    /**
     * Approve a question, created by an device (auditor), on the server
     * @param id Id of the question
     */
    public approveQuestion(id: string) {
        return this.emitToSocket('approveQuestion', { questionId: id });
    }

    /**
     * Ban a user
     * @param uuid UUID (identifier) of a user
     */
    public banUser(uuid: string) {
        return this.emitToSocket('banUser', { uuid });
    }

    /**
     * Unban a user
     * @param uuid UUID (identifier) of a user
     */
    public unbanUser(uuid: string) {
        return this.emitToSocket('unbanUser', { uuid });
    }

    /**
     * Add a question to the debate
     * @param question Question to add
     */
    public addQuestion(question: any) {
        return this.emitToSocket('addQuestion', { question });
    }

    /**
     * Add a callback function when there is a new vote
     * @param callback Function to call
     */
    // tslint:disable-next-line:ban-types (disable warning for Function type)
    public onNewVote(callback: Function) {
        this.connection.socket.on('onNewVote',
            (question: any) => {
                // Call the callback
                callback(question);
            }
        );
    }
}
