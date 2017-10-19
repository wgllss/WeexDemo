exports.ubball = function ubball(strContent) {
    if(strContent ==null){
        return;
    }
    strContent = strContent.replace(/\[gguba\](.+?)\[\/gguba\]/ig,function($1){
        $1 = $1.replace("[gguba]","");
        $1 = $1.replace("[/gguba]","");
        return $1;
    });
    strContent = strContent.replace(/\[gubar\](.+?)\[\/gubar\]/ig,function($1){
        $1 = $1.replace("[gubar]","");
        $1 = $1.replace("[/gubar]","");
        return $1;});
    strContent = strContent.replace(/\[tag\](.+?)\[\/tag\]/ig,function($1){
        $1 = $1.replace("[tag]","");
        $1 = $1.replace("[/tag]","");
        return $1;});
    return strContent;
}

//refContent =  utils.replaceAll(refContent,/\[gubar\](.+?)\[\/gubar\]/ig,'','[gubar]','[/gubar]');
exports.replaceAll = function replaceAll(sourcestr,regExp,replacestr,tagstr,tagstr2) {
    if(sourcestr ==null){
        return;
    }
    sourcestr = sourcestr.replace(regExp,function($1){
        if(replacestr==null){
            replacestr='';
        }
        $1 = $1.replace(tagstr,replacestr);
        if(tagstr2!=null){
            $1 = $1.replace(tagstr2,replacestr);
        }
        return $1;
    });

    return sourcestr;
}

// String.prototype.replaceAll = function (FindText, RepText) {
//     var regExp = new RegExp(FindText, "gm");
//     return this.replace(regExp, RepText);
// }

exports.replaceHtmlCode = function replaceHtmlCode(sourcestr) {
    //&amp;lt;br/&amp;gt;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;
    if(sourcestr ==null){
        return;
    }
    sourcestr = sourcestr.replace(/nbsp;/ig,function($1){
            $1 = $1.replace("nbsp;","");
            return $1;
        }
    );
    sourcestr = sourcestr.replace(/&amp;/ig,function($1){
        $1 = $1.replace("&amp;","");
        return $1;});
    sourcestr = sourcestr.replace(/&lt;/ig,function($1){
        $1 = $1.replace("&lt;","");
        return $1;});
    sourcestr = sourcestr.replace(/lt;/ig,function($1){
        $1 = $1.replace("lt;","");
        return $1;});
    sourcestr = sourcestr.replace(/gt;/ig,function($1){
        $1 = $1.replace("gt;","");
        return $1;});
    sourcestr = sourcestr.replace(/br\//ig,function($1){
        $1 = $1.replace("br\/","");
        return $1;});
    sourcestr = sourcestr.replace(/br/ig,function($1){
        $1 = $1.replace("br","");
        return $1;});
    return sourcestr;
}