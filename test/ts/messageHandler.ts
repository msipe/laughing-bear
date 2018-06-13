class MessageHandler {
    public UpdateMessageText(message:string):void {
      $('#message').append("<div>" + message + "</div>");
      $('#message').scrollTop($('#message')[0].scrollHeight);
    }
}