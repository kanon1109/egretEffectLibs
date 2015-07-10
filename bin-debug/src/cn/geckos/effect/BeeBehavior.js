/**
 * Created by tangben on 2015/7/10.
 */
var cn;
(function (cn) {
    var geckos;
    (function (geckos) {
        var effect;
        (function (effect) {
            /**
             * 蜜蜂行为
             * @author Kanon
             */
            var BeeBehavior = (function () {
                function BeeBehavior(rangeX, rangeY) {
                    //摩擦力
                    this.friction = .95;
                    this.rangeX = rangeX;
                    this.rangeY = rangeY;
                    this.beeList = [];
                }
                var __egretProto__ = BeeBehavior.prototype;
                /**
                 * 添加蜜蜂
                 * @param	bee 蜜蜂对象
                 */
                __egretProto__.addBee = function (bee) {
                    if (this.beeList.indexOf(bee) == -1)
                        this.beeList.push(bee);
                };
                /**
                 * 去除一个蜜蜂
                 * @param	bee	蜜蜂对象
                 */
                __egretProto__.removeBee = function (bee) {
                    if (!bee)
                        return;
                    if (!this.beeList)
                        return;
                    var index = this.beeList.indexOf(bee);
                    if (index == -1)
                        return;
                    this.beeList.splice(index, 1);
                    if (bee.parent)
                        bee.parent.removeChild(bee);
                };
                //主循环
                __egretProto__.update = function () {
                    if (!this.beeList)
                        return;
                    var count = this.beeList.length;
                    for (var i = 0; i < count; ++i) {
                        var bee = this.beeList[i];
                        if (bee) {
                            bee.vx += Math.random() * this.rangeX - this.rangeX * .5;
                            bee.vy += Math.random() * this.rangeY - this.rangeY * .5;
                            bee.x += bee.vx;
                            bee.y += bee.vy;
                            bee.vx *= this.friction;
                            bee.vy *= this.friction;
                        }
                    }
                };
                /**
                 * 销毁
                 */
                __egretProto__.destroy = function () {
                    var count = this.beeList.length;
                    for (var i = count - 1; i >= 0; --i) {
                        var bee = this.beeList[i];
                        if (bee && bee.parent)
                            bee.parent.removeChild(bee);
                        this.beeList.splice(i, 1);
                    }
                    this.beeList = null;
                };
                return BeeBehavior;
            })();
            effect.BeeBehavior = BeeBehavior;
            BeeBehavior.prototype.__class__ = "cn.geckos.effect.BeeBehavior";
            var Bee = (function (_super) {
                __extends(Bee, _super);
                function Bee(dObj) {
                    _super.call(this);
                    this.vx = 0;
                    this.vy = 0;
                    if (this._dObj && this._dObj.parent)
                        this._dObj.parent.removeChild(this._dObj);
                    this._dObj = dObj;
                    this.addChild(dObj);
                }
                var __egretProto__ = Bee.prototype;
                return Bee;
            })(egret.Sprite);
            effect.Bee = Bee;
            Bee.prototype.__class__ = "cn.geckos.effect.Bee";
        })(effect = geckos.effect || (geckos.effect = {}));
    })(geckos = cn.geckos || (cn.geckos = {}));
})(cn || (cn = {}));
//# sourceMappingURL=BeeBehavior.js.map