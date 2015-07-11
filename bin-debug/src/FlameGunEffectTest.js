/**
 * Created by kanon on 2015/7/11.
 */
var FlameGunEffect = cn.geckos.effect.FlameGunEffect;
var FlameGunEffectTest = (function (_super) {
    __extends(FlameGunEffectTest, _super);
    function FlameGunEffectTest() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var __egretProto__ = FlameGunEffectTest.prototype;
    __egretProto__.onAddToStage = function (event) {
        this.pMc = new egret.Shape();
        this.pMc.graphics.beginFill(0xff00ff, 1);
        this.pMc.graphics.drawCircle(0, 0, 30);
        this.pMc.graphics.endFill();
        this.pMc.x = 100;
        this.pMc.y = 200;
        this.addChild(this.pMc);
        this.pMc.touchEnabled = true;
        this.fge = new FlameGunEffect(this, "flame", 0, 0, 10, -90, 2, .1, 300);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEndHandler, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
    };
    __egretProto__.touchHandler = function (event) {
        this.mouseX = event.stageX;
        this.mouseY = event.stageY;
        if (!this.isTouched)
            return;
        this.pMc.x = event.stageX;
        this.pMc.y = event.stageY;
    };
    __egretProto__.touchEndHandler = function (event) {
        this.isTouched = false;
        this.fge.status = FlameGunEffect.STOP;
    };
    __egretProto__.touchBeginHandler = function (event) {
        if (event.target instanceof egret.Shape) {
            this.isTouched = true;
            var mc = event.target;
            mc.x = event.stageX;
            mc.y = event.stageY;
        }
        else {
            this.fge.status = FlameGunEffect.FIRE;
            this.mouseX = event.stageX;
            this.mouseY = event.stageY;
        }
    };
    __egretProto__.loop = function (event) {
        var rad = Math.atan2(this.mouseY - this.fge.startY, this.mouseX - this.fge.startX);
        this.fge.rotation = rad / Math.PI * 180;
        this.fge.move(this.pMc.x, this.pMc.y);
        this.fge.update();
    };
    return FlameGunEffectTest;
})(egret.Sprite);
FlameGunEffectTest.prototype.__class__ = "FlameGunEffectTest";
