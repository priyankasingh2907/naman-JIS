akCookie = {
    create: function(e, t, n) {
        var r = "";
        if (n) {
            var i = new Date;
            i.setTime(i.getTime() + n * 24 * 60 * 60 * 1e3);
            r = "; expires=" + i.toGMTString()
        }
        document.cookie = e + "=" + t + r + "; path=/"
    },
    read: function(e) {
        var t = e + "=";
        var n = document.cookie.split(";");
        for (var r = 0; r < n.length; r++) {
            var i = n[r];
            while (i.charAt(0) == " ") i = i.substring(1, i.length);
            if (i.indexOf(t) == 0) return i.substring(t.length, i.length)
        }
        return null
    },
    erase: function(e) {
        akCookie.create(e, "", -1)
    }
};
$(function() {
    $("#accessControl").show();
    akAccess = function() {
        function s(t) {
            $("body").css("font-size", e[t]);
            for (key in e) {
                if (t === key) {
                    n = key
                }
            }
            if (!n) {
                n = "normal"
            }
            $("#font-" + n).addClass("current")
        }

        function o(e) {
            r = e;
            if (!e in t) {
                e = "normal"
            }
            if (e === "normal") {
                $("body").removeClass(t.join(" "))
            } else {
                $("body").addClass(e)
            }
            $("input.contrastChanger").each(function() {
                $(this).removeClass("current")
            });
            $("input#contrast-" + r).addClass("current")
        }

        function u() {
            akCookie.create("akAccessSettings", n + " " + r, 2)
        }
        var e = {
            normal: "65%",
            large: "100%",
            larger: "85%"
        };
        var t = ["normal", "wob"];
        var n;
        var r;
        var i = akCookie.read("akAccessSettings");
        if (i !== null) {
            settings = i.split(" ");
            s(settings[0]);
            o(settings[1])
        } else {
            $("input#font-normal").addClass("current");
            $("input#contrast-normal").addClass("current")
        }
        return {
            handleFontSizeEvent: function(e) {
                var t = e.split("_")[e.split("_").length - 1];
                s(t);
                u();
                return false
            },
            handleContrastEvent: function(e) {
                var t = e.split("_")[e.split("_").length - 1];
                o(t);
                u();
                return false
            }
        }
    }();
    $("#accessControl input.fontScaler").click(function() {
        akAccess.handleFontSizeEvent($(this).attr("id"));
        $("#accessControl input.fontScaler").each(function() {
            $(this).removeClass("current")
        });
        $(this).addClass("current");
        return false
    });
    $("#accessControl input.contrastChanger").click(function() {
        akAccess.handleContrastEvent($(this).attr("id"))
    });
    $("#backToTop").css({
        marginRight: "-200px"
    }, 1e3);
    $("#backToTop").animate({
        marginRight: "0"
    }, 1e3);
    $("body").removeClass("noJS");
});