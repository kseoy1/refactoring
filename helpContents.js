helpContents = function (wrap) {
    var self = this;
    this.wrap = wrap;
    this.helpwrap, this.helpclose, this.helpbtn, this.helpcon;

    // con => element로 바꿈(헬프콘텐츠에 나올 요소라는 의미로)
    this.init = function (element) {
        this.wrap.find('.helpWrap').remove();
        this.makeHtml();

        // init에 넘어온 제이쿼리선택한애를 helpcon에 넣음
        this.helpcon.html(element);

        this.helpbtn.on('click', this.helpBtnClick);
        this.helpclose.on('click', this.helpCloseClick);
    }

    this.helpBtnClick = function(){
        var h = self.helpcon.css('height')
        $(this).parent().css('bottom', h);
        effectAdo('click');
        self.helpclose.show();
    }

    this.helpCloseClick = function(){
        self.helpclose.hide();
        $(this).parent().css('bottom', 0);
        effectAdo('click');
    }

    this.makeHtml = function () {
        var html =
            '<div class="helpWrap">' +
            '   <div class="helpbtn"></div>' +
            '   <div class="con"></div>' +
            '   <div class="close"></div>' +
            '</div>';
        self.wrap.append(html);

        self.helpwrap = self.wrap.find('.helpWrap');
        self.helpbtn = self.wrap.find('.helpWrap .helpbtn');
        self.helpclose = self.wrap.find('.helpWrap .close');
        self.helpcon = self.wrap.find('.helpWrap .con');
    }
}