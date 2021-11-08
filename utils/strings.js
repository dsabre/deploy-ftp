String.prototype.trimChar = function (character) {
    let string = this;
    while (string.charAt(0) === character) {
        string = string.substring(1);
    }

    while (string.charAt(string.length - 1) === character) {
        string = string.substring(0, string.length - 1);
    }

    return string;
};

exports.strings = {};
