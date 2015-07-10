/**
 * Created by tangben on 2015/7/10.
 */
var BloodSplatter = cn.geckos.effect.BloodSplatter;
var BloodSplatterTest = (function (_super) {
    __extends(BloodSplatterTest, _super);
    function BloodSplatterTest() {
        _super.call(this);
        this.bloodSplatter = new BloodSplatter(this, "blood");
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var __egretProto__ = BloodSplatterTest.prototype;
    __egretProto__.onAddToStage = function (event) {
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDownHandler, this);
    };
    __egretProto__.mouseDownHandler = function (event) {
        //this.bloodSplatter.clear();
        this.bloodSplatter.doSplatter(event.stageX, event.stageY);
    };
    return BloodSplatterTest;
})(egret.Sprite);
BloodSplatterTest.prototype.__class__ = "BloodSplatterTest";
