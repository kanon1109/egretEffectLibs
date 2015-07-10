/**
 * Created by tangben on 2015/7/10.
 */
var BeeBehavior = cn.geckos.effect.BeeBehavior;
var Bee = cn.geckos.effect.Bee;
var BeeBehaviorTest = (function (_super) {
    __extends(BeeBehaviorTest, _super);
    function BeeBehaviorTest() {
        _super.call(this);
        this.beeBehavior = new BeeBehavior(2, 1);
        this.texture = RES.getRes("bee");
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var __egretProto__ = BeeBehaviorTest.prototype;
    __egretProto__.onAddToStage = function (event) {
        for (var i = 0; i < 200; i++) {
            var beeBitmap = new egret.Bitmap(this.texture);
            beeBitmap.anchorX = .5;
            beeBitmap.anchorY = .5;
            beeBitmap.x = Math.random() * this.stage.stageWidth;
            beeBitmap.y = Math.random() * this.stage.stageHeight;
            var bee = new Bee(beeBitmap);
            this.addChild(bee);
            this.beeBehavior.addBee(bee);
        }
        this.stage.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDownHandler, this);
    };
    __egretProto__.enterFrameHandler = function (event) {
        this.beeBehavior.update();
    };
    __egretProto__.mouseDownHandler = function (event) {
        var beeBitmap = new egret.Bitmap(this.texture);
        beeBitmap.anchorX = .5;
        beeBitmap.anchorY = .5;
        beeBitmap.x = Math.random() * this.stage.stageWidth;
        beeBitmap.y = Math.random() * this.stage.stageHeight;
        var bee = new Bee(beeBitmap);
        this.addChild(bee);
        this.beeBehavior.addBee(bee);
    };
    return BeeBehaviorTest;
})(egret.Sprite);
BeeBehaviorTest.prototype.__class__ = "BeeBehaviorTest";
//# sourceMappingURL=BeeBehaviorTest.js.map