import * as signalR from "@microsoft/signalr";

const URL = "https://mercury-ai-app-dev.azurewebsites.net/recipe-generation-hub";

class Connector {
    constructor() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(URL)
            .withAutomaticReconnect()
            .build();
        this.connection.start().catch(err => document.write(err));
        
        this.events = (onMessageReceived) => {
            this.connection.on(this.methods.ReceiveConnectionId, (message) => {
                onMessageReceived(this.methods.ReceiveConnectionId, message);
            });

            this.connection.on(this.methods.ReciveRecipePart, (message) => {
                onMessageReceived(this.methods.ReciveRecipePart, message);
            });
        };
    }

    methods = {
        ReceiveConnectionId: 'ReceiveConnectionId',
        ReciveRecipePart: 'ReciveRecipePart',
    };

    static getInstance() {
        if (!Connector.instance)
            Connector.instance = new Connector();
        return Connector.instance;
    }
}

export default Connector.getInstance;