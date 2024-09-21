// public method for encoding
function base64Encode(input) {

    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    input = _utf8_encode(input);

    while (i < input.length) {

        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }

        output = output +
            _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
            _keyStr.charAt(enc3) + _keyStr.charAt(enc4);

    }

    return output;
}

// public method for decoding
function base64Decode(input) {

    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    while (i < input.length) {

        enc1 = _keyStr.indexOf(input.charAt(i++));
        enc2 = _keyStr.indexOf(input.charAt(i++));
        enc3 = _keyStr.indexOf(input.charAt(i++));
        enc4 = _keyStr.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        output = output + String.fromCharCode(chr1);

        if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
        }

    }

    output = _utf8_decode(output);

    return output;

}

// private method for UTF-8 encoding
function _utf8_encode(string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "";

    for (var n = 0; n < string.length; n++) {

        var c = string.charCodeAt(n);

        if (c < 128) {
            utftext += String.fromCharCode(c);
        } else if ((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
        } else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
        }

    }

    return utftext;
}

// private method for UTF-8 decoding
function _utf8_decode(utftext) {
    var string = "";
    var i = 0;
    var c = c1 = c2 = 0;

    while (i < utftext.length) {

        c = utftext.charCodeAt(i);

        if (c < 128) {
            string += String.fromCharCode(c);
            i++;
        } else if ((c > 191) && (c < 224)) {
            c2 = utftext.charCodeAt(i + 1);
            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
            i += 2;
        } else {
            c2 = utftext.charCodeAt(i + 1);
            c3 = utftext.charCodeAt(i + 2);
            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }

    }

    return string;
}



function makeHash(a, b) {
    var c = sha256(a.concat(sha256(b)));
    return c;
}



function makeHashCorrespondent(a, b) {
    var c = calcMD5(a.concat(calcMD5(b)));
    return c;
}





function isIntegerString(str, element) {

    if (str.match(/^[0-9]+$/)) // spaces are allowed
        return true;
    return false;

}



//  this function checks the given string is alphanumeric word or not
//  and return true or false accordingly.



function isValidName(str, element) {


    if (str.match(/^[A-Za-z0-9 \.]+$/)) // spaces are allowed
        return true;
    return false;

}


function isValidNameHindi(str, element) {


    if (str.match(/^[A-Za-z0-9\u0900-\u097F \.]+$/)) // spaces are allowed
        return true;
    return false;

}

function isAlphaNumericString(str, element) {


    if (str.match(/^[A-Za-z0-9]+$/)) // spaces are allowed
        return true;
    return false;

}


function isAlphaNumericWithStringSpace(str, element) {


    if (str.match(/^[A-Za-z0-9 ]+$/)) // spaces are allowed
        return true;
    return false;

}

// End of is_alpha_numeric Function




function isValidUserID(str, element) {
    if (str.length > 0) {
        /* if(str.match(/^[A-Za-z0-9\-\_\.\@]+$/))
        	return true;
        return false; */

        if (str.match(/^[A-Za-z0-9\-\_\.]+$/))
            return true;
        return false;
    } else {
        return true;
    }

}



function isValidPassword(str, element) {
    if (str.length > 0) {
        if (str.match(/^[A-Za-z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\+\_\=\[\]\\\{\}\|\;\'\:\"\,\.\/\<\>\?]+$/))
            return true;
        return false;
    } else {
        return true;
    }

}


function passwordFollowsPolicy(password) {


    var errorMsg = "";
    var space = " ";
    var fieldlength = "";
    fieldlength = password.length;
    //It must not contain a space
    if (password.indexOf(space) > -1) {
        return false;
        //errorMsg += "\nPasswords cannot include a space.\n";
    }

    //It must contain at least one number character
    if (!(password.match(/\d/))) {

        return false;
        //errorMsg += "\nStrong passwords must include at least one number.\n";
    }
    //It must start with at least one letter

    if (!(password.match(/^[a-zA-Z]+/))) {
        return false;
        //errorMsg += "\nStrong passwords must start with a letter.\n";
    }
    //It must contain at least one upper case character
    if (!(password.match(/[A-Z]/))) {

        return false;
        //errorMsg += "\nStrong passwords must include at least one uppercase letter.\n";
    }
    //It must contain at least one lower case character
    if (!(password.match(/[a-z]/))) {

        return false;
        //errorMsg += "\nStrong passwords must include one or more lowercase letters.\n";
    }

    //It must contain at least special character
    if (!(password.match(/[\?\@\$\%\&\*\,\;\:]/))) {

        return false;
        //errorMsg += "\nStrong passwords must include one special char \" ?@$%&*,;:\".\n";
    }

    if (!(fieldlength >= 6)) {

        return false;
        //errorMsg += "\nStrong passwords must be at least 6 characters long.\n";
    }
    return true;

    /* if (errorMsg != "")
    {
    	msg = "______________________________________________________\n\n";
    	msg += "Please correct the problem(s) with your password.\n";
    	msg += "______________________________________________________\n";
    	errorMsg += alert(msg + errorMsg + "\n\n");
    	return false;
    }
    else
    {
    	return true;
    } */
}





function passwordFollowsPolicyEdit(password) {

    if (password == '') {
        return true;
    } else {


        var errorMsg = "";
        var space = " ";
        var fieldlength = "";
        fieldlength = password.length;
        //It must not contain a space
        if (password.indexOf(space) > -1) {
            return false;
            //errorMsg += "\nPasswords cannot include a space.\n";
        }

        //It must contain at least one number character
        if (!(password.match(/\d/))) {

            return false;
            //errorMsg += "\nStrong passwords must include at least one number.\n";
        }
        //It must start with at least one letter

        if (!(password.match(/^[a-zA-Z]+/))) {
            return false;
            //errorMsg += "\nStrong passwords must start with a letter.\n";
        }
        //It must contain at least one upper case character
        if (!(password.match(/[A-Z]/))) {

            return false;
            //errorMsg += "\nStrong passwords must include at least one uppercase letter.\n";
        }
        //It must contain at least one lower case character
        if (!(password.match(/[a-z]/))) {

            return false;
            //errorMsg += "\nStrong passwords must include one or more lowercase letters.\n";
        }

        //It must contain at least special character
        if (!(password.match(/[\?\@\$\%\&\*\,\;\:]/))) {

            return false;
            //errorMsg += "\nStrong passwords must include one special char \" ?@$%&*,;:\".\n";
        }
        return true;

        /* if (errorMsg != "")
        {
        	msg = "______________________________________________________\n\n";
        	msg += "Please correct the problem(s) with your password.\n";
        	msg += "______________________________________________________\n";
        	errorMsg += alert(msg + errorMsg + "\n\n");
        	return false;
        }
        else
        {
        	return true;
        } */
    }
}





function isAllowedCharaterString(str, element) {
    if (str.length > 0) {

        // Allowed charcters: [A-Z] [a-z] [0-9] ` ~ ! @ # $ % ^ & * ( ) - + _ = [ ] \ { } | ; ' : " , . / < > ?

        if (str.match(/^[A-Za-z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\+\_\=\[\]\\\{\}\|\;\'\:\"\,\.\/\<\>\?]+$/))
            return true;
        return false;

    } else {
        return true;
    }

}






function isAllowedCharaterStringWithSpace(str, element) {

    if (str.length > 0) {

        // Allowed charcters: [A-Z] [a-z] [0-9] ` ~ ! @ # $ % ^ & * ( ) - + _ = [ ] \ { } | ; ' : " , . / < > ? \t \r \n and <space>

        if (str.match(/^[A-Za-z0-9 \`\~\!\@\#\$\%\^\&\*\(\)\-\+\_\=\[\]\\\{\}\|\;\'\:\"\,\.\/\<\>\?\t\r\n]+$/))
            return true; //valid charaters
        return false; //invalid characters
    } else {
        return true;
    }

}



function isAllowedPhone(str, element) {

    if (str.length > 0) {

        // Allowed charcters: + - 0-9
        if (str.match(/^[0-9 \-\+]+$/))
            return true; //valid charaters
        return false; //invalid characters
    } else {
        return true;
    }

}


function isAllowedPhone2(str, element) {

    if (str.length > 0) {

        // Allowed charcters: + - 0-9
        if (str.match(/^[0-9 \-\+\(\)]+$/))
            return true; //valid charaters
        return false; //invalid characters
    } else {
        return true;
    }

}


function isAllowedMobile(str, element) {


    if (str.length > 0) {

        // Allowed charcters: 0-9
        if (str.match(/^[0-9]+$/)) {
            return true; //valid charaters
        } else {
            return false; //invalid characters
        }
    } else {
        return true;
    }


}





function allowedCharactersContent(str, element) {

    if (str.length > 0) {
        // valid: abcdefghijklmnopqrstuvwxyz0123456789-+=_.?@$%/\&*,;:'(){}[]<>`~!^|\t\r\n
        // invalid: < > # "
        // spaces are not allowed

        // /^[A-Za-z0-9 \-\+\=\_\.\?\@\$\%\/\\\&\*\,\;\:\'\(\)\{\}\[\]\<\>\`\~\!\^\|\\\t\\\r\\\n]+$/

        if (str.match(/^[A-Za-z0-9 \-\+\=\_\.\?\@\$\%\/\\\&\*\,\;\:\'\/\#\"(\)\{\}\[\]\<\>\`\~\!\^\|\\\t\\\r\\\n]+$/)) {

            document.getElementById("cke_newsContent").style.border = "solid 1px #D3D3D3";

            return true; //valid charaters


        } else {


            document.getElementById("cke_newsContent").style.border = "solid 1px #DD0000";

            return false; //invalid characters
        }
    } else {
        return true;
    }

}








//This file contains the functions for input data validation
//at client side with the help of java script.

//  this function checks the email format is correct or not
//  and return true or false accordingly.
function is_email(email) {
    if (!email.match(/^[A-Za-z0-9\._\-+]+@[A-Za-z0-9_\-+]+(\.[A-Za-z0-9_\-+]+)+$/))
        return false;
    return true;
}



function is_integer_float(number) // allow float and integer number only (decimal representation)
{
    //alert(number);
    //alert("dddd");
    //[0-9]+(\.[0-9]+)?
    if (!number.match(/^[0-9]+(\.[0-9]+)?$/))
        return false;
    return true;
}

function allow_integer_float(number, id) // allow float and integer number only (decimal representation)
{
    //alert(id);
    //alert("dddd");
    //[0-9]+(\.[0-9]+)?
    if (!number.match(/^[0-9]+(\.[0-9]+)?$/)) {
        //return false;
        document.getElementById(id).value = number.replace(/[^0-9.]/g, ''); // allow numers and . only
        return true;
    }
    return true;
}


function allow_integer(number, id) // allow float and integer number only (decimal representation)
{
    //alert(id);
    //alert("dddd");
    //[0-9]+(\.[0-9]+)?
    if (!number.match(/^[\+0-9]+?$/)) {
        //return false;
        document.getElementById(id).value = number.replace(/[^0-9]/g, ''); // allow numers and . only
        return true;
    }
    return true;
}

function stripAlphaChars(pstrSource) // strips alphanumeric characters from a string
{
    var m_strOut = new String(pstrSource);
    m_strOut = m_strOut.replace(/[^0-9]/g, '');

    return m_sOut;
}


function disallow_spaces(fieldvalue, fieldid) {
    //alert(fieldvalue);

    var m_strOut = new String(fieldvalue);
    document.getElementById(fieldid).value = m_strOut.replace(/\s*/g, ''); // g means globally: replace all occurences of spaces


}



function make_username_alphanumeric(fieldvalue, fieldid) {


    var m_strOut = new String(fieldvalue);


    m_strOut = m_strOut.replace(/\s*/g, ''); // g means globally: replace all occurences of spaces

    m_strOut = m_strOut.replace(/[^A-Za-z0-9]/g, '');

    document.getElementById(fieldid).value = m_strOut; // g means globally: replace all occurences of spaces
}


// End of is_email Function

//  this function checks the given number is signed/unsigned number
//  and return true or false accordingly.
function is_number(number) {
    if (!number.match(/^[\-\+0-9e1-9]+$/))
        return false;
    return true;
}
// End of is_number Function

//  this function checks the given number is unsigned number
//  and return true or false accordingly.
function is_unsign_number(number) {
    if (!number.match(/^[\+0-9]+$/))
        return false;
    return true;
}

function is_double(number) {
    if (!number.match(/^[0-9]*\.?[0-9]*$/))
        return false;
    return true;
}
// End of is_unsign_number Function



//  this function checks the given string is empty or not
//  and return true or false accordingly.
function is_empty(str) {
    str = trim(str);
    if ((str.length == 0) || (str == null))
        return true;
    return false;
}
// End of is_empty Function

function trim(inputString) {
    inputString = inputString.replace(/^\s+/g, "");
    inputString = inputString.replace(/\s+$/g, "");
    return inputString;
} // Ends the "trim" function

function convertDate(d, dateformat) {
    if (dateformat == null)
        dateformat = 'dd-mm-yyyy';

    if (dateformat.match(/^dd[-\/]{1}mm[-\/]{1}yyyy$/i)) {
        var T = d.split(/[-\/]/);
        var M = T[1];
        var D = T[0];
        var Y = T[2];
    } else if (dateformat.match(/^yyyy[-\/]{1}mm[-\/]{1}dd$/i)) {
        var T = d.split(/[-\/]/);
        var M = T[1];
        var D = T[2];
        var Y = T[0];
    } else
        return d;

    return (M + "-" + D + "-" + Y);
}

function is_date(d, dateformat) {
    if (dateformat == null)
        dateformat = 'dd-mm-yyyy';

    if (!dateformat.match(/^mm[-\/]{1}dd[-\/]{1}yyyy$/i))
        d = convertDate(d, dateformat);

    if (d.search(/^(\d){1,2}[-\/\\](\d){1,2}[-\/\\]\d{4}$/) != 0)
        return -1; //Bad Date Format

    var T = d.split(/[-\/]/);
    var M = eval(T[0]);
    var D = T[1];
    var Y = T[2];

    return D > 0 && (D <= [, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][M] || D == 29 && Y % 4 == 0 && (Y % 100 != 0 || Y % 400 == 0))
}

/// Usage : daetDiif(FirstDate,SecondDate,dateformat,returnas)
/// returnas=null or 0 //Difrence will return in days
/// returnas=null or 1 //Difrence will return in hours;
/// returnas=null or 2 //Difrence will return in mins;
/// returnas=null or 3 //Difrence will return in secs;
/// returnas=null or 4 //Difrence will return in weeks;
/// returnas=null or 5 //An array will return;


function dateDiff(firstdate, secondate, dateformat, returnas) {
    date1 = new Date();
    date2 = new Date();
    diff = new Date();

    firstdate = convertDate(firstdate, dateformat);
    secondate = convertDate(secondate, dateformat);

    if (is_date(firstdate, 'mm-dd-yyyy')) { // Validates first date 
        date1temp = new Date(firstdate);
        date1.setTime(date1temp.getTime());
    } else
        return false; // otherwise exits

    if (is_date(secondate, 'mm-dd-yyyy')) { // Validates second date 
        date2temp = new Date(secondate);
        date2.setTime(date2temp.getTime());
    } else
        return false; // otherwise exits

    // sets difference date to difference of first date and second date

    diff.setTime(date1.getTime() - date2.getTime());

    timediff = diff.getTime();

    if (returnas == null || returnas == 0)
        return Math.floor(timediff / (1000 * 60 * 60 * 24));
    else if (returnas == 1)
        return Math.floor(timediff / (1000 * 60 * 60));
    else if (returnas == 2)
        return Math.floor(timediff / (1000 * 60));
    else if (returnas == 3)
        return Math.floor(timediff / 1000);
    else if (returnas == 4)
        return Math.floor(timediff / (1000 * 60 * 60 * 24 * 7));
    else if (returnas == 5) {
        weeks = Math.floor(timediff / (1000 * 60 * 60 * 24 * 7));
        timediff -= weeks * (1000 * 60 * 60 * 24 * 7);

        days = Math.floor(timediff / (1000 * 60 * 60 * 24));
        timediff -= days * (1000 * 60 * 60 * 24);

        hours = Math.floor(timediff / (1000 * 60 * 60));
        timediff -= hours * (1000 * 60 * 60);

        mins = Math.floor(timediff / (1000 * 60));
        timediff -= mins * (1000 * 60);

        secs = Math.floor(timediff / 1000);
        timediff -= secs * 1000;

        retval = new Array(weeks, days, hours, mins, secs);

        return retval; // form should never submit, returns false
    }
}

function isPastDate(firstdate, secondate, dateformat) {

    diff = dateDiff(firstdate, secondate);

    if (diff < 0)
        return true;
    return false;
}

function isValidCreditCard(type, ccnum) {
    if (type == "Visa" || type == "VI") {
        // Visa: length 16, prefix 4, dashes optional.
        var re = /^4\d{3}-?\d{4}-?\d{4}-?\d{4}$/;
    } else if (type == "MasterCard" || type == "MC") {
        // Mastercard: length 16, prefix 51-55, dashes optional.
        var re = /^5[1-5]\d{2}-?\d{4}-?\d{4}-?\d{4}$/;
    } else if (type == "Discover" || type == "NO") {
        // Discover: length 16, prefix 6011, dashes optional.
        var re = /^6011-?\d{4}-?\d{4}-?\d{4}$/;
    } else if (type == "AmEx" || type == "AX") {
        // American Express: length 15, prefix 34 or 37.
        var re = /^3[4,7]\d{13}$/;
    } else if (type == "Diners") {
        // Diners: length 14, prefix 30, 36, or 38.
        var re = /^3[0,6,8]\d{12}$/;
    } else if (type == "Bankcard") {
        // Bankcard: length 16, prefix 5610 dashes optional.
        var re = /^5610-?\d{4}-?\d{4}-?\d{4}$/;
    } else if (type == "JCB") {
        // Bankcard: length 16, prefix 5610 dashes optional.
        var re = /^[3088|3096|3112|3158|3337|3528]\d{12}$/;
    } else if (type == "EnRoute") {
        // Bankcard: length 15, prefix 5610 dashes optional.
        var re = /^[2014|2149]\d{11}$/;
    } else if (type == "Switch") {
        // Bankcard: length 16, prefix 5610 dashes optional.
        var re = /^[4903|4911|4936|5641|6333|6759|6334|6767]\d{12}$/;
    }

    if (!re.test(ccnum)) return false;
    // Checksum ("Mod 10")
    // Add even digits in even length strings or odd digits in odd length strings.
    var checksum = 0;
    for (var i = (2 - (ccnum.length % 2)); i <= ccnum.length; i += 2) {
        checksum += parseInt(ccnum.charAt(i - 1));
    }
    // Analyze odd digits in even length strings or even digits in odd length strings.
    for (var i = (ccnum.length % 2) + 1; i < ccnum.length; i += 2) {
        var digit = parseInt(ccnum.charAt(i - 1)) * 2;
        if (digit < 10) {
            checksum += digit;
        } else {
            checksum += (digit - 9);
        }
    }
    if ((checksum % 10) == 0) return true;
    else return false;
}

//Checks the phone number like (001)-330-330 OR 9992592892
///Start Function
function is_phone(varphone) {
    if (!varphone.match(/^(\(?[0-9]*[-#\*\s]*[0-9]+\)?)+$/))
        return false;
    return true
}
//End Function