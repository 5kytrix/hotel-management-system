export default class ValidationText {
    text = ''

    isValid = true

    error = ''

    constructor(text) {
        this.init(text);
    }

    init(text) {
        this.text = text ? String(text) : '';
        return this;
    }

    setInvalid(error) {
        this.error = error;
        this.isValid = false;
    }

    setValid() {
        this.error = '';
        this.isValid = true;
    }

    isEmpty() {
        return !this.text;
    }

    copy() {
        return new ValidationText(this.text);
    }
}
