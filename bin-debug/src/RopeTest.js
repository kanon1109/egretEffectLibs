/**
 * Created by tangben on 2015/7/10.
 */
var Rope = cn.geckos.effect.Rope;
var RopeTest = (function (_super) {
    __extends(RopeTest, _super);
    function RopeTest() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var __egretProto__ = RopeTest.prototype;
    __egretProto__.onAddToStage = function (event) {
        var texture = RES.getRes("mc");
        this.mc1 = new egret.Bitmap(texture);
        this.mc2 = new egret.Bitmap(texture);
        this.addChild(this.mc1);
        this.addChild(this.mc2);
        this.mc1.anchorX = .5;
        this.mc1.anchorY = .5;
        this.mc2.anchorX = .5;
        this.mc2.anchorY = .5;
        this.mc1.touchEnabled = true;
        this.mc2.touchEnabled = true;
        this.mc1.x = 100;
        this.mc1.y = 100;
        this.mc2.x = 300;
        this.mc2.y = 300;
        this.sp = new egret.Point(this.mc1.x, this.mc1.y);
        this.ep = new egret.Point(this.mc2.x, this.mc2.y);
        this.rope = new Rope(this.sp, this.ep);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEndHandler, this);
        this.rope.update();
        this.rope.render(this.graphics, 3, 0x00F0FF);
    };
    __egretProto__.touchHandler = function (event) {
        if (!this.isTouched)
            return;
        this.curMc.x = event.stageX;
        this.curMc.y = event.stageY;
    };
    __egretProto__.touchBeginHandler = function (event) {
        if (event.target instanceof egret.Bitmap) {
            this.isTouched = true;
            var mc = event.target;
            mc.x = event.stageX;
            mc.y = event.stageY;
            this.curMc = mc;
            this.stage.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        }
    };
    __egretProto__.touchEndHandler = function (event) {
        this.isTouched = false;
        this.stage.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
    };
    __egretProto__.enterFrameHandler = function (event) {
        this.sp.x = this.mc1.x;
        this.sp.y = this.mc1.y;
        this.ep.x = this.mc2.x;
        this.ep.y = this.mc2.y;
        this.rope.update();
        this.rope.render(this.graphics, 3, 0x00F0FF);
    };
    return RopeTest;
})(egret.Sprite);
RopeTest.prototype.__class__ = "RopeTest";
//# sourceMappingURL=RopeTest.js.map