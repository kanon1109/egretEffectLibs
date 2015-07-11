/**
 *
 * @author Kanon
 *
 */
var RotationEasing = cn.geckos.effect.RotationEasing;
var RotationEasingTest = (function (_super) {
    __extends(RotationEasingTest, _super);
    function RotationEasingTest() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var __egretProto__ = RotationEasingTest.prototype;
    __egretProto__.onAddToStage = function (event) {
        this.mc = new egret.Shape();
        this.mc.graphics.beginFill(0xff00ff, 1);
        this.mc.graphics.drawRect(0, 0, 230, 50);
        this.mc.graphics.endFill();
        this.mc.anchorX = .5;
        this.mc.anchorY = .5;
        this.mc.x = 200;
        this.mc.y = 200;
        this.addChild(this.mc);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
    };
    __egretProto__.loop = function (event) {
        this.mc.rotation += RotationEasing.rotate(this.mc.rotation, this.mc.x, this.mc.y, this.mouseX, this.mouseY);
    };
    __egretProto__.touchHandler = function (event) {
        this.mouseX = event.stageX;
        this.mouseY = event.stageY;
    };
    return RotationEasingTest;
})(egret.Sprite);
RotationEasingTest.prototype.__class__ = "RotationEasingTest";
//# sourceMappingURL=RotationEasingTest.js.map