var PageVm = function () {
    var self = this;
    self.listView = ko.observable(false);
    self.detailView = ko.observable(false);
    self.twirl = ko.pureComputed(function () {
        return self.listView() ? "-" : "+"
    });
    self.currApptHeader = ko.pureComputed(function () {
        return self.detailView() ? "My CURRENT appointment" : "My current appointments"
    });
    self.prevApptHeader = ko.pureComputed(function () {
        return self.detailView() ? "My PREVIOUS appointment" : "My previous appointments"
    });
};

var pageVm = new PageVm();
ko.applyBindings(pageVm);

(function(pageVm) {

    var DISPLAY = "poop";
    $(".toggle+*").addClass("inner");
    $(".toggle").click(accor);
    $(".close").click(function (e) {
        e.preventDefault();
        $(this).closest("li").parent().parent().find(".toggle").click()
    });
    open($("#curr-appt"));
    //open($("#prev-appt"));

    function accor(e) {
        e.preventDefault();
        var $this = $(this),
            twirl = $(this).closest("li").parent().parent().find(".twirl");
        
        if (pageVm.detailView() && $this.parent().parent().hasClass("accordion")) {
            $this.next().find(".inner.show").prev().click();
            return;
        }

        if ($this.next().hasClass('show')) { // hide
            $("li").removeData(DISPLAY);
            pageVm.detailView(false);
            if ($this.find(".twirl").length) {
                $this.find(".twirl").text("+");
            }
            $this.next().removeClass('show').slideUp(350, function () {
                $("li").fadeIn(250, function () {
                    //$(this).css({"visibility":"visible",display:'block'}).slideDown();
                });
            });
        
        } else { // show
            // close all expanded items
            if ($this.hasClass("detail")) {
                $this
                    .parentsUntil($(".accordion"), "li")
                    .data(DISPLAY, true);
                hydee($this.closest('ul'));
                pageVm.detailView(true);
            } else {
                $this.closest('ul').find('li .inner').removeClass('show').slideUp(350);
                $this.closest('ul').find(".twirl").text("+");
            }
            if ($this.find(".twirl").length) {
                $this.find(".twirl").text("-");
            }
            // twirl.text("-");
            // slide up or down
            $this.next().toggleClass('show').slideToggle(350);
        }
    }

    function open($obj) {
        $obj.next().addClass("show").show();
        $obj.find(".twirl").text("-");
    }

    function level($obj) {

    }

    function hydee($ul, lvl) {
        lvl = lvl || 0;
        $ul.children().each(function (i, li) {
            if ($(li).get(0).tagName === "LI" && typeof $(li).data(DISPLAY) === "undefined") {
                $(li).fadeOut(200, function () {
                   // $(this).css({"visibility":"hidden",display:'block'}).slideUp();
                });
            }
        });
        var $parent = $ul.parent().parent();
        if ($parent.get(0).tagName === "UL") {
            hydee($parent, lvl + 1);
        }
    }
})(pageVm);
