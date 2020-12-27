module.exports = pathtoRegexp
function pathtoRegexp(path, keys, options = {}) {
    var strict = options.strict === true, // defaults to false
        start = options.start !== false, // default true
        end = options.end !== false, // default true
        encode = options.encode === undefined || typeof options.encode !== "function" ? function (x) { return x; } : options.encode,
        sensitive = options.sensitive === undefined ? "i" : "",
        prefixes = options.prefixes === undefined ? "./" : options.prefix,
        endsWith = "[" + (options.endsWith || "").replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1") + "]|$",
        delimiter = "[" + (options.delimiter || "/#?").replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1") + "]",
        defaultPattern = "[^" + (options.delimiter || "/#?").replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1") + "]+?",
        route = start ? "^" : "",
        i = 0,
        key = 0,
        tokens = [],
        result = [];
    //regexp to regexp
    if (path instanceof RegExp) {
        if (!keys)
            return path;
        var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
        var execResult = groupsRegex.exec(path.source);
        while (execResult) {
            keys.push({
                // Use parenthesized substring match if available, index otherwise
                name: execResult[1] || i++,
                prefix: "",
                suffix: "",
                modifier: "",
                pattern: ""
            });
            execResult = groupsRegex.exec(path.source);
        }
        return path;
    }
    // string to regexp
    // parse ----------------------
    if ('string' !== typeof path)
        throw new TypeError(`path must be a string or regular expression. Given  ${typeof path}`);
    while (i < path.length) {
        var char = path.charAt(i)
        switch (char) {
            case "*":
                tokens.push({ type: "MODIFIER", index: i, value: path[i++] });
                continue;
            case "\\":
                tokens.push({ type: "ESCAPED_CHAR", index: i++, value: path[i++] });
                continue;
            case "{":
                tokens.push({ type: "OPEN", index: i, value: path[i++] });
                continue;
            case "}":
                tokens.push({ type: "CLOSE", index: i, value: path[i++] });
                continue;
            case ":":
                var name = "";
                var j = i + 1;
                while (j < path.length) {
                    var code = path.charCodeAt(j);
                    if (
                        // `0-9`
                        (code >= 48 && code <= 57) ||
                        // `A-Z`
                        (code >= 65 && code <= 90) ||
                        // `a-z`
                        (code >= 97 && code <= 122) ||
                        // `_`
                        code === 95) {
                        name += path[j++];
                        continue;
                    }
                    break;
                }
                if (!name)
                    throw new TypeError("Missing parameter name at " + i);
                tokens.push({ type: "NAME", index: i, value: name });
                i = j;
                continue;
            case "(":
                var count = 1;
                var pattern = "";
                var j = i + 1;
                if (path[j] === "?") {
                    throw new TypeError("Pattern cannot start with \"?\" at " + j);
                }
                while (j < path.length) {
                    if (path[j] === "\\") {
                        pattern += path[j++] + path[j++];
                        continue;
                    }
                    if (path[j] === ")") {
                        count--;
                        if (count === 0) {
                            j++;
                            break;
                        }
                    }
                    else if (path[j] === "(") {
                        count++;
                        if (path[j + 1] !== "?") {
                            throw new TypeError("Capturing groups are not allowed at " + j);
                        }
                    }
                    pattern += path[j++];
                }
                if (count)
                    throw new TypeError("Unbalanced pattern at " + i);
                if (!pattern)
                    throw new TypeError("Missing pattern at " + i);
                tokens.push({ type: "PATTERN", index: i, value: pattern });
                i = j;
                continue;
            default:
                tokens.push({ type: "CHAR", index: i, value: path[i++] });
        }
    }
    tokens.push({ type: "END", index: i, value: "" });
    //---------------
    var tryConsume = function (type) {
        if (i < tokens.length && tokens[i].type === type)
            return tokens[i++].value;
    };
    var mustConsume = function (type) {
        var value = tryConsume(type);
        if (value !== undefined)
            return value;
        var _a = tokens[i], nextType = _a.type, index = _a.index;
        throw new TypeError("Unexpected " + nextType + " at " + index + ", expected " + type);
    };
    var consumeText = function () {
        var result = "";
        var value;
        // tslint:disable-next-line
        while ((value = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR"))) {
            result += value;
        }
        return result;
    };
    var _path = "";
    i = 0;
    while (i < tokens.length) {
        var char = tryConsume("CHAR");
        var name = tryConsume("NAME");
        var pattern = tryConsume("PATTERN");
        if (name || pattern) {
            var prefix = char || "";
            if (prefixes.indexOf(prefix) === -1) {
                _path += prefix;
                prefix = "";
            }
            if (_path) {
                result.push(_path);
                _path = "";
            }
            result.push({
                name: name || key++,
                prefix: prefix,
                suffix: "",
                pattern: pattern || defaultPattern,
                modifier: tryConsume("MODIFIER") || ""
            });
            continue;
        }
        var value = char || tryConsume("ESCAPED_CHAR");
        if (value) {
            _path += value;
            continue;
        }
        if (_path) {
            result.push(_path);
            _path = "";
        }
        var open = tryConsume("OPEN");
        if (open) {
            var prefix = consumeText();
            var name_1 = tryConsume("NAME") || "";
            var pattern_1 = tryConsume("PATTERN") || "";
            var suffix = consumeText();
            mustConsume("CLOSE");
            result.push({
                name: name_1 || (pattern_1 ? key++ : ""),
                pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
                prefix: prefix,
                suffix: suffix,
                modifier: tryConsume("MODIFIER") || ""
            });
            continue;
        }
        mustConsume("END");
    }
    //---------------------------------------------------result

    // Iterate over the tokens and create our regexp string.
    for (var _i = 0, tokens_1 = result; _i < tokens_1.length; _i++) {
        var token = tokens_1[_i];
        if (typeof token === "string") {
            route += (encode(token)).replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
        }
        else {
            var prefix = (encode(token.prefix)).replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
            var suffix = (encode(token.suffix)).replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
            if (token.pattern) {
                if (keys)
                    keys.push(token);
                if (prefix || suffix) {
                    if (token.modifier === "+" || token.modifier === "*") {
                        var mod = token.modifier === "*" ? "?" : "";
                        route += "(?:" + prefix + "((?:" + token.pattern + ")(?:" + suffix + prefix + "(?:" + token.pattern + "))*)" + suffix + ")" + mod;
                    }
                    else {
                        route += "(?:" + prefix + "(" + token.pattern + ")" + suffix + ")" + token.modifier;
                    }
                }
                else {
                    route += "(" + token.pattern + ")" + token.modifier;
                }
            }
            else {
                route += "(?:" + prefix + suffix + ")" + token.modifier;
            }
        }
    }
    if (end) {
        if (!strict)
            route += delimiter + "?";
        route += options.endsWith ? "(?=" + endsWith + ")" : "$";
    }
    else {
        var endToken = tokens[tokens.length - 1];
        var isEndDelimited = typeof endToken === "string"
            ? delimiter.indexOf(endToken[endToken.length - 1]) > -1
            : // tslint:disable-next-line
            endToken === undefined;
        if (!strict)
            route += "(?:" + delimiter + "(?=" + endsWith + "))?";

        if (!isEndDelimited)
            route += "(?=" + delimiter + "|" + endsWith + ")";

    }
    return new RegExp(route, sensitive);
}
