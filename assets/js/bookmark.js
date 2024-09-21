function fb_click() {
    var href = jQuery(location).attr('href');
    var title = jQuery('title').text();
    var target = 'http://www.facebook.com/sharer.php?u=' + encodeURIComponent(href) + '&quote=' + encodeURIComponent(title);
    window.open(target, 'sharer', 'toolbar=0,status=0,width=626,height=436');
    return false;
}

function tweet_click() {
    var href = jQuery(location).attr('href');
    var title = jQuery('title').text();
    var target = 'https://twitter.com/share?url=' + encodeURIComponent(href) + '&text=' + encodeURIComponent(title);
    window.open(target, 'sharer', 'toolbar=0,status=0,width=626,height=436');
    return false;
}