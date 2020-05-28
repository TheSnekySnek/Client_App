import { Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';

@Injectable({
    providedIn: 'root'
})
export class DebateService {

    // We need to save the question between pages
    private savedDebate: any;

    constructor(
        private connection: ConnectionService
    ) { }

    /**
     * Emit an event to the server
     * @param eventName Name of the event
     * @param data      Data needed for the event
     */
    private emitToSocket(eventName: string, data?: any): Promise<any> {
        const that = this;
        return new Promise(async (resolve, reject) => {
            console.log(data)
            if(data)
                that.connection.socket.emit(eventName, data,
                    (debates: any) => {
                        resolve(debates);
                    }
                );
            else
                that.connection.socket.emit(eventName,
                    (debates: any) => {
                        resolve(debates);
                    }
                );
        });
    }

    /**
     * Get the debates available from the server
     */
    public getDebates(): Promise<any[]> {
        return this.emitToSocket('getDebates',);
    }

    /**
     * Get details about a debate from the server
     * @param id Id of the debate
     */
    public getDebateDetails(id: string) {
        return this.emitToSocket('getDebateDetails', id);
    }

    /**
     * Get questions of the debate from the server
     * @param id Id of the debate
     */
    public getDebateQuestions(id: string) {
        return this.emitToSocket('getDebateQuestions', id);
    }

    /**
     * Get questions of the debate from the server
     * @param id Id of the debate
     */
    public getDebateSuggestions(id: string) {
        return this.emitToSocket('getDebateSuggestions', id);
    }

    /**
     * Create a debate on the server
     * @param debate Debate to create
     */
    public createDebate(debate: any) {
        return this.emitToSocket('newDebate', debate);
    }

    /**
     * Approve a question, created by an device (auditor), on the server
     * @param id Id of the question
     */
    public approveQuestion(id: string) {
        return this.emitToSocket('approveQuestion', id);
    }

    /**
     * Close a debate and terminate it
     */
    public closeDebate(debateId : string) {
        return this.emitToSocket('closeDebate', debateId);
    }

    /**
     * Lock a debate
     */
    public lockDebate(debateId : string) {
        return this.emitToSocket('lockDebate', debateId);
    }

    /**
     * Unlock a debate
     */
    public unlockDebate(debateId : string) {
        return this.emitToSocket('unlockDebate', debateId);
    }

    /**
     * Ban a user
     * @param debateId id of the debate
     * @param uuid UUID (identifier) of a user
     */
    public banUser(debateId: string, uuid: string) {
        return this.emitToSocket('banUser', {debateId: debateId, uuid: uuid });
    }

    /**
     * Unban a user
     * @param uuid UUID (identifier) of a user
     */
    public unbanUser(uuid: string) {
        return this.emitToSocket('unbanUser', { uuid: uuid });
    }

    /**
     * Add a question to the debate
     * @param question Question to add
     */
    public addQuestion(question: any) {
        return this.emitToSocket('newQuestion', question );
    }

    /**
     * Add a callback function when there is a new vote
     * @param callback Function to call
     */
    // tslint:disable-next-line:ban-types (disable warning for Function type)
    public onNewVote(callback: Function) {
        this.connection.socket.on('newVote',
            (suggestionId: number) => {
                // Call the callback
                callback(suggestionId);
            }
        );
    }

    /**
     * Add a callback function when there is a new vote
     * @param callback Function to call
     */
    // tslint:disable-next-line:ban-types (disable warning for Function type)
    public onSuggestedQuestion(callback: Function) {
        this.connection.socket.on('newSuggestedQuestion',
          (question: any) => {
              // Call the callback
              callback(question);
          }
        );
    }

    /**
     * Add a callback function when there is a new vote
     * @param callback Function to call
     */
    // tslint:disable-next-line:ban-types (disable warning for Function type)
    public onOpenQuestionAnswer(callback: Function) {
        this.connection.socket.on('newOpenQuestionAnswer',
          (question: any) => {
              // Call the callback
              callback(question);
          }
        );
    }

    /**
     * Add a callback function when a suggestion is deleted
     * @param callback Function to call
     */
    public onDeletedSuggestion(callback: Function) {
        this.connection.socket.on("deletedSuggestion",
          (suggestionId: number) => {
              // Call the callback
              callback(suggestionId)
          }
        );
    }

    /**
     * Add a callback function when there is a new question
     * @param callback Function to call
     */
    // tslint:disable-next-line:ban-types (disable warning for Function type)
    public onNewQuestion(callback: Function) {
        this.connection.socket.on('newQuestion',
            (question: any) => {
                console.log("Received new question");
                // Call the callback
                callback(question);
            }
        );
        this.connection.socket.on('newSuggestedQuestion',
            (question: any) => {
                console.log("Received new question");
                // Call the callback
                callback(question);
            }
        );
    }

    /**
   * Save a debate to have it in the other pages
   * @param debate Function to call
   */
    public saveDebate(debate: any) {
        this.savedDebate = debate;
    }

    /**
     * Get the debate that we saved
     */
    public getSavedDebate() {
        return this.savedDebate;
    }
}
