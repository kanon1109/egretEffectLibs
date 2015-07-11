/**
 * Created by kanon on 2015/7/11.
 */
var cn;
(function (cn) {
    var geckos;
    (function (geckos) {
        var effect;
        (function (effect) {
            /**
             * 火焰枪效果
             * @author Kanon
             */
            var FlameGunEffect = (function () {
                function FlameGunEffect(parent, flameResName, startX, startY, speed, rotation, maxScale, minAlpha, distance, floating, scaleSpeed, alphaSpeed) {
                    if (startX === void 0) { startX = 0; }
                    if (startY === void 0) { startY = 0; }
                    if (speed === void 0) { speed = 5; }
                    if (rotation === void 0) { rotation = 0; }
                    if (maxScale === void 0) { maxScale = 1; }
                    if (minAlpha === void 0) { minAlpha = .1; }
                    if (distance === void 0) { distance = 100; }
                    if (floating === void 0) { floating = 10; }
                    if (scaleSpeed === void 0) { scaleSpeed = .1; }
                    if (alphaSpeed === void 0) { alphaSpeed = .05; }
                    this.parent = parent;
                    this.frameTexture = RES.getRes(flameResName);
                    this.speed = speed;
                    this.rotation = rotation;
                    this.maxScale = maxScale;
                    this.minAlpha = minAlpha;
                    this.distance = distance;
                    this.move(startX, startY);
                    this.flameList = [];
                    this.floating = floating;
                    this.scaleSpeed = scaleSpeed;
                    this.alphaSpeed = alphaSpeed;
                }
                var __egretProto__ = FlameGunEffect.prototype;
                /**
                 * 移动
                 * @param    x    发射位置x坐标
                 * @param    y    发射位置y坐标
                 */
                __egretProto__.move = function (x, y) {
                    if (x === void 0) { x = 0; }
                    if (y === void 0) { y = 0; }
                    this._startX = x;
                    this._startY = y;
                };
                /**
                 * 发射
                 */
                __egretProto__.fire = function () {
                    var rot = this.rotation + this.randnum(-this.floating, this.floating);
                    var rad = rot / 180 * Math.PI;
                    var vx = Math.cos(rad) * this.speed;
                    var vy = Math.sin(rad) * this.speed;
                    var flameSpt = new Flame(this.frameTexture, vx, vy, this.startX, this.startY, this.maxScale, this.minAlpha, this.distance, this.scaleSpeed, this.alphaSpeed);
                    flameSpt.rotation = this.rotation;
                    this.flameList.push(flameSpt);
                    this.parent.addChild(flameSpt);
                };
                /**
                 * 渲染
                 */
                __egretProto__.update = function () {
                    switch (this._status) {
                        case FlameGunEffect.FIRE:
                            this.fire();
                            break;
                    }
                    //更新火焰弹数据
                    var length = this.flameList.length;
                    for (var i = length - 1; i >= 0; i -= 1) {
                        var flame = this.flameList[i];
                        flame.update();
                        if (flame.isOutRange()) {
                            flame.destroy();
                            this.flameList.splice(i, 1);
                        }
                    }
                };
                Object.defineProperty(__egretProto__, "status", {
                    /**
                     * 获取状态
                     */
                    get: function () {
                        return this._status;
                    },
                    /**
                     * 设置状态
                     */
                    set: function (value) {
                        this._status = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(__egretProto__, "rotation", {
                    /**
                     * 获取角度
                     */
                    get: function () {
                        return this._rotation;
                    },
                    /**
                     * 设置角度
                     */
                    set: function (value) {
                        this._rotation = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(__egretProto__, "startX", {
                    /**
                     * 获取起始x位置
                     */
                    get: function () {
                        return this._startX;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(__egretProto__, "startY", {
                    /**
                     * 获取起始y位置
                     */
                    get: function () {
                        return this._startY;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * 返回 a - b之间的随机数，不包括  Math.max(a, b)
                 * @param a
                 * @param b
                 * @return 假设 a < b, [a, b)
                 */
                __egretProto__.randnum = function (a, b) {
                    return Math.random() * (b - a) + a;
                };
                //开火状态
                FlameGunEffect.FIRE = 1;
                //停止状态
                FlameGunEffect.STOP = 0;
                return FlameGunEffect;
            })();
            effect.FlameGunEffect = FlameGunEffect;
            FlameGunEffect.prototype.__class__ = "cn.geckos.effect.FlameGunEffect";
            var Flame = (function (_super) {
                __extends(Flame, _super);
                function Flame(flameTexture, vx, vy, startX, startY, maxScale, minAlpha, distance, scaleSpeed, alphaSpeed) {
                    _super.call(this);
                    this.startX = startX;
                    this.startY = startY;
                    this.vx = vx;
                    this.vy = vy;
                    this.x = startX;
                    this.y = startY;
                    this.scaleX = .2;
                    this.scaleY = this.scaleY;
                    this.maxScale = maxScale;
                    this.minAlpha = minAlpha;
                    this.distance = distance;
                    this.scaleSpeed = scaleSpeed;
                    this.alphaSpeed = alphaSpeed;
                    this.bitmap = new egret.Bitmap(flameTexture);
                    this.bitmap.anchorX = .5;
                    this.bitmap.anchorY = .5;
                    this.addChild(this.bitmap);
                }
                var __egretProto__ = Flame.prototype;
                /**
                 * 更新速度
                 */
                __egretProto__.update = function () {
                    this.x += this.vx;
                    this.y += this.vy;
                    this.scaleX += this.scaleSpeed;
                    this.scaleY = this.scaleX;
                    if (this.scaleX > this.maxScale)
                        this.scaleX = this.maxScale;
                    if (this.mathDistance(this.x, this.y, this.startX, this.startY) >= this.distance * .5)
                        this.alpha -= this.alphaSpeed;
                    if (this.alpha < this.minAlpha)
                        this.alpha = this.minAlpha;
                };
                /**
                 * 是否超过射程
                 * @return
                 */
                __egretProto__.isOutRange = function () {
                    return this.mathDistance(this.x, this.y, this.startX, this.startY) >= this.distance;
                };
                /**
                 * 计算距离
                 * @param    x1    点1的x坐标
                 * @param    y1    点1的y坐标
                 * @param    x2    点2的x坐标
                 * @param    y2    点2的y坐标
                 * @return    2点之间的距离
                 */
                __egretProto__.mathDistance = function (x1, y1, x2, y2) {
                    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
                };
                /**
                 * 销毁
                 */
                __egretProto__.destroy = function () {
                    if (this.bitmap.parent)
                        this.bitmap.parent.removeChild(this.bitmap);
                    if (this.parent)
                        this.parent.removeChild(this);
                    this.bitmap = null;
                };
                return Flame;
            })(egret.Sprite);
            effect.Flame = Flame;
            Flame.prototype.__class__ = "cn.geckos.effect.Flame";
        })(effect = geckos.effect || (geckos.effect = {}));
    })(geckos = cn.geckos || (cn.geckos = {}));
})(cn || (cn = {}));
