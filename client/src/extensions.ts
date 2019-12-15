import 'extensions-typings';

String.prototype.replaceAll = function(search : string, replacement : string) : string {
    const target = this;
    return target.split(search).join(replacement);
};

String.prototype.removeSpaces = function(character : string) : string {
    const target = this;
    return target.replaceAll(character, '')
};
  