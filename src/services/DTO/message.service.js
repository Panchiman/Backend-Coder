export default class ChatDTO{
    constructor(user, email, message) {
        this.user = user
        this.message_datetime = new Date(),
        this.email = email,
        this.message = message
    }
}