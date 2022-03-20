var aniCon;

$(window).on('load', function () {

    $('.contents').eq(0).show();

    turnCon = new turnClickContents(3, $(".clickPage1"));
    turnCon.init();

});

turnClickContents = function (items, wrap) {
    var self = this;
    this.wrap = wrap;
    this.itemwrap = '';
    this.clickItems = items;
    this.openItemNum = 0;
    this.items = '';
    this.ansbtn = '';

    this.init = function () {
        this.makeElement();
        this.items.on('click', self.itemClick);
        this.ansbtn.on('click', self.clickBtn);
    }

    this.itemClick = function (){
        if (self.openItemNum === $(this).index() || self.openItemNum - 1 === $(this).index()) {
            self.items.removeClass("turn");
            // 동작
            if ($(this).css('opacity') == '0') {
                $(this).css('opacity', '1');
                self.openItemNum--;
                self.items.eq(self.openItemNum).prev().addClass('turn');
                $(this).addClass('turn');
            } else {
                $(this).css('opacity', '0');
                self.items.eq(self.openItemNum).next().addClass('turn');
                $(this).addClass('turn');
                self.openItemNum++;
            }

            if (self.openItemNum == self.clickItems) {
                self.ansbtn.addClass('re');
            } else {
                self.ansbtn.removeClass('re');
            }

            effectAdo('click');
        }
    }

    this.clickBtn = function () {

        self.reset(true);

        effectAdo('click');
        if ($(this).hasClass('re')) {
            self.items.css('opacity', '1');
            self.openItemNum = 0;
            self.ansbtn.removeClass('re');
            self.reset(false);
        } else {
            self.items.css('opacity', '0');
            self.ansbtn.addClass('re');
            self.openItemNum = self.clickItems;
        }
    }

    this.makeElement = function () {
        
        var html = '';
        html += '<div class="clickContent turn">';
        for (var i = 0; i < this.clickItems; i++) {
            html += '<div class="clickItem clickItem' + (i + 1) + '"></div>';
        }
        html += '<div class="ansbtn"></div>';
        html += '</div>';

        this.wrap.append(html);

        // 생성자 선언
        this.itemwrap = this.wrap.find('.clickContent');
        this.items = this.itemwrap.find('.clickItem');
        this.ansbtn = this.itemwrap.find('.ansbtn');
        // 초기화
        this.reset(false);
    }

    this.reset = function (condition) {
        if (condition) {
            self.items.each(function (index) {
                index === self.clickItems - 1 ? $(this).addClass("turn") : $(this).removeClass("turn");
            });
        } else {
            self.items.each(function (index) {
                index === 0 ? $(this).addClass("turn") : $(this).removeClass("turn");
            });
        }
    }
}