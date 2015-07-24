/**
 *
 * @author
 *
 */
var SlotsEffect = cn.geckos.effect.SlotsEffect;
var SlotsTest = (function (_super) {
    __extends(SlotsTest, _super);
    function SlotsTest() {
        _super.call(this);
        this.slotsEffect = new SlotsEffect(1, 15, 2, 50);
        this.slotsEffect.push(this.selectMc, this);
        var btn1 = new egret.Shape();
        btn1.graphics.beginFill(0xff00ff, 1);
        btn1.graphics.drawRect(0, 0, 50, 50);
        btn1.graphics.endFill();
        btn1.anchorX = .5;
        btn1.anchorY = .5;
        btn1.x = 200;
        btn1.y = 200;
        btn1.touchEnabled = true;
        this.addChild(btn1);
        var btn2 = new egret.Shape();
        btn2.graphics.beginFill(0xff00ff, 1);
        btn2.graphics.drawRect(0, 0, 50, 50);
        btn2.graphics.endFill();
        btn2.anchorX = .5;
        btn2.anchorY = .5;
        btn2.x = 300;
        btn2.y = 200;
        btn2.touchEnabled = true;
        this.addChild(btn2);
        var btn3 = new egret.Shape();
        btn3.graphics.beginFill(0xff00ff, 1);
        btn3.graphics.drawRect(0, 0, 50, 50);
        btn3.graphics.endFill();
        btn3.anchorX = .5;
        btn3.anchorY = .5;
        btn3.x = 400;
        btn3.y = 200;
        btn3.touchEnabled = true;
        this.addChild(btn3);
        btn1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.btn1ClickHandler, this);
        btn2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.btn2ClickHandler, this);
        btn3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.btn3ClickHandler, this);
        var startX = 100;
        var startY = 300;
        var gapH = 10;
        var gapV = 10;
        var r = 1;
        var c = 1;
        for (var i = 0; i < 15; i++) {
            var mc = new egret.Shape();
            mc.graphics.beginFill(0x00ffff, 1);
            mc.graphics.drawRect(0, 0, 50, 50);
            mc.graphics.endFill();
            mc.anchorX = .5;
            mc.anchorY = .5;
            mc.x = startX + (r - 1) * (50 + gapH);
            mc.y = startY + (c - 1) * (50 + gapV);
            mc.name = "mc" + (i + 1);
            this.addChild(mc);
            r++;
            if (r > 5) {
                r = 1;
                c++;
            }
        }
        this.stopAllMc();
        this.selectMc();
    }
    var __egretProto__ = SlotsTest.prototype;
    __egretProto__.btn2ClickHandler = function (event) {
        this.slotsEffect.splice(this.randomSelect);
        this.slotsEffect.push(this.selectMc, this);
        this.slotsEffect.show(Math.floor(Math.random() * 15 + 1));
    };
    __egretProto__.btn1ClickHandler = function (event) {
        this.slotsEffect.splice(this.selectMc);
        this.slotsEffect.push(this.randomSelect, this);
        this.slotsEffect.show(Math.floor(Math.random() * 15 + 1));
    };
    __egretProto__.btn3ClickHandler = function (event) {
        this.slotsEffect.destroy();
    };
    /**
    * 选中某个mc
    * @param	mc
    */
    __egretProto__.selectMc = function () {
        this.stopAllMc();
        console.log("this.slotsEffect.curIndex " + this.slotsEffect.curIndex);
        var mc = this.getChildByName("mc" + this.slotsEffect.curIndex);
        mc.graphics.clear();
        mc.graphics.beginFill(0xffff00, 1);
        mc.graphics.drawRect(0, 0, 50, 50);
        mc.graphics.endFill();
    };
    __egretProto__.randomSelect = function () {
        this.stopAllMc();
        console.log("randomSelect this.slotsEffect.randomIndex " + this.slotsEffect.randomIndex);
        var mc = this.getChildByName("mc" + this.slotsEffect.randomIndex);
        mc.graphics.clear();
        mc.graphics.beginFill(0xffff00, 1);
        mc.graphics.drawRect(0, 0, 50, 50);
        mc.graphics.endFill();
    };
    __egretProto__.stopAllMc = function () {
        for (var i = 1; this.getChildByName("mc" + i); i++) {
            var mc = this.getChildByName("mc" + i);
            mc.graphics.clear();
            mc.graphics.beginFill(0x00ffff, 1);
            mc.graphics.drawRect(0, 0, 50, 50);
            mc.graphics.endFill();
        }
    };
    return SlotsTest;
})(egret.Sprite);
SlotsTest.prototype.__class__ = "SlotsTest";
