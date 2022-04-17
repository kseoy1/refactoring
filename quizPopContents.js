var quizPopContents = function(wrap) {
    var self = this;
    this.wrap = wrap;
	this.popBtn, this.solpop, this.close;
	this.data;

    this.makeHtml = function() {
		self.wrap.find('.solpop').remove();
        var html = '<div class="solpop">' +
            '<div class="closeBtn"></div>' +
            '</div>';
        self.wrap.append(html);
    }

    this.init = function() {
		self.makeHtml();

		this.popBtn = self.wrap.find(".popBtn");
        this.solpop = self.wrap.find('.solpop');
		this.close = self.wrap.find('.solpop .closeBtn');
		
		self.solpop.hide();
		self.popBtn.on("click", function(){
			self.solpop.css(self.data);
			self.solpop.show();
		});

		this.data = {
			top : self.solpop.css("top"),
			left : self.solpop.css("left")
		};

		self.setPop();
    }

    this.setPop = function() {
		self.solpop.draggable({
			cursor: 'pointer',
			revert: 'false',
			containment: $('#wrap'),
			start: function(e, obj) {
				var factor = FORTEACHERCD.responsive.baseContainerSize.zoom;

				obj.position.top = Math.round(obj.position.top / factor);
				obj.position.left = Math.round(obj.position.left / factor);
				isRec = $(this);
			},
			drag: function(e, obj) {
				var factor = FORTEACHERCD.responsive.baseContainerSize.zoom;
				obj.position.top = Math.round(obj.position.top / factor);
				obj.position.left = Math.round(obj.position.left / factor);

                var wid = Number(isRec.css('width').replace('px', ''));
                var hei = Number(isRec.css('height').replace('px', ''));

                if(obj.position.left + wid >= 1920) obj.position.left = 1920 - wid
                if(obj.position.top + hei >= 1080) obj.position.top = 1080 - hei
			},
			stop: function(e, obj) {

			}
		});

		self.close.on('click', function(e) {
			e.stopPropagation();
			effectAdo('click');
			self.wrap.find('.solbtn.on').removeClass('on')
			self.solpop.hide();
		})
    }
}