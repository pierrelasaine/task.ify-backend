class utils {
    /**
     * generates a random code verifier of a specified length
     * 
     * @param length 
     * @returns random code
    */
    static generateRandomString(length: number) {
       let text = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
}

module.exports = utils;