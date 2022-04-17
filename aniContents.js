aniContents = function(wrap) {

    var self = this;

    this.wrap = wrap;
	// 사용되는 것 생성자로 선언(가독성)
	this.ani = this.wrap.find(".ani");
	this.item = this.wrap.find(".item");
	this.close = this.wrap.find(".close");

    this.init = function() {
		self.hideItem();
		
		self.ani.on('click', function(e) {
            e.stopPropagation();

			self.hideItem();
            $(this).find('.item').show();
            
			if ($(this).attr('data-ado')) {
                var ado = $(this).attr('data-ado');
                contentAdo(ado);
            }else{
				effectAdo('click');
			}
        });

        self.close.on('click', function(e) {
			e.stopPropagation();
			effectAdo('click');
			self.hideItem();
        });
    }

	this.hideItem = function (){
		self.item.hide();
	}

}