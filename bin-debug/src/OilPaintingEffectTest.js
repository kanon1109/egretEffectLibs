/**
 * Created by tangben on 2015/7/10.
 */
var OilPaintingEffect = cn.geckos.effect.OilPaintingEffect;
var OilPaintingEffectTest = (function (_super) {
    __extends(OilPaintingEffectTest, _super);
    function OilPaintingEffectTest() {
        _super.call(this);
        this.oilPaintingEffect = new OilPaintingEffect(this.graphics, 0);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var __egretProto__ = OilPaintingEffectTest.prototype;
    __egretProto__.onAddToStage = function (event) {
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDownHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMoveHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUpHandler, this);
    };
    __egretProto__.mouseUpHandler = function (event) {
        this.isDown = false;
    };
    __egretProto__.mouseMoveHandler = function (event) {
        if (this.isDown)
            this.oilPaintingEffect.paintMove(event.stageX, event.stageY);
    };
    __egretProto__.mouseDownHandler = function (event) {
        this.isDown = true;
        this.oilPaintingEffect.color = Math.random() * 0xFFFFFF;
        this.oilPaintingEffect.clear();
    };
    return OilPaintingEffectTest;
})(egret.Sprite);
OilPaintingEffectTest.prototype.__class__ = "OilPaintingEffectTest";
//# sourceMappingURL=OilPaintingEffectTest.js.map