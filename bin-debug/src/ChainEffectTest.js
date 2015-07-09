/**
 * Created by tangben on 2015/7/9.
 */
var ChainEffect = cn.geckos.effect.ChainEffect;
var ChainEffectTest = (function (_super) {
    __extends(ChainEffectTest, _super);
    function ChainEffectTest() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var __egretProto__ = ChainEffectTest.prototype;
    __egretProto__.onAddToStage = function () {
        this.chainEffect = new ChainEffect(this);
        this.chainEffect.move(0, 0);
        this.chainEffect.lineColor = 0xFFFFFF;
        this.chainEffect.lineSize = 10;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
        this.stage.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
    };
    __egretProto__.touchBeginHandler = function (event) {
        this.mouseX = event.localX;
        this.mouseY = event.localY;
        this.chainEffect.move(this.mouseX, this.mouseY);
    };
    __egretProto__.touchHandler = function (event) {
        this.mouseX = event.localX;
        this.mouseY = event.localY;
    };
    __egretProto__.enterFrameHandler = function (event) {
        this.chainEffect.update(this.mouseX, this.mouseY);
    };
    return ChainEffectTest;
})(egret.Sprite);
ChainEffectTest.prototype.__class__ = "ChainEffectTest";
//# sourceMappingURL=ChainEffectTest.js.map