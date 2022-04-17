
function randomRange(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}


stampContents = function (wrap) {
    var self = this;

    this.wrap = wrap;
    this.timer, this.timer2;

    this.init = function () {
        // 역할별로 메소드 정의, 분류
        this.makeHtml();
        this.setTimer();
    }

    this.makeHtml = function () {
        // 공통함수로 빼고, 사용성 개선
        var stampNum = randomRange(1, 8);
        // 클래스 이름 변수로 관리
        // 예시 : ["철수", "영희"].join("와 ") => 철수와 영희
        var stClass = [
            "bounce2", "item", "st", "st" + stampNum].join(" ");

        var html =
            '<div class="stamp"></div>' +
            '<div class="' + stClass + '"></div>';

        self.wrap.append(html);

        // 규칙 이용하여 if문 삭제, 가독성 좋게 변경
        var stamping = stampNum > 4 ? stampNum - 4 : stampNum;
        effectAdo('stamp' + stamping);        
    }

    this.setTimer = function () {
        var time = this.getAnimationDuration(self.wrap.find('.stamp'));

        this.timer = setTimeout(function () {
            self.wrap.find('.st').show();
        }, time);

    }

    this.getAnimationDuration = function (elem) {
        // css를 찾지 못할 경우 기본값 사용
        // Number, 정규식을 사용하여 좀 더 명확한 타입 지정
        var tmp;
        tmp = elem.css('animation-duration');
        // 정규식 /\D/ 
        // g : 글로벌 
        // 숫자가 아닌 것
        tmp = Number(tmp.replace(/\D/g, '')); // 숫자 아닌거 찾아서 '

        if(tmp == 0) tmp = 2;

        tmp = (tmp * 1000) - 700;

        return tmp;
    }
}