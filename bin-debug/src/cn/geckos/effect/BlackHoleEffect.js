/**
 * Created by tangben on 2015/7/10.
 */
var cn;
(function (cn) {
    var geckos;
    (function (geckos) {
        var effect;
        (function (effect) {
            var BlackHoleEffect = (function (_super) {
                __extends(BlackHoleEffect, _super);
                function BlackHoleEffect(g, range, angleSpeed, time, fps) {
                    if (g === void 0) { g = 10; }
                    if (range === void 0) { range = 400; }
                    if (angleSpeed === void 0) { angleSpeed = 5; }
                    if (time === void 0) { time = 1000; }
                    if (fps === void 0) { fps = 60; }
                    _super.call(this);
                    //最短距离
                    this.minDis = 10;
                    //结束后缓动时间（毫秒）
                    this.overTime = 1000;
                    //摩擦力
                    this.f = .99;
                    this.g = g;
                    this.range = range;
                    this.angleSpeed = angleSpeed;
                    this.time = time;
                    this.fps = fps;
                }
                var __egretProto__ = BlackHoleEffect.prototype;
                /**
                 * 添加黑洞
                 * @param	holePosX	黑洞位置x
                 * @param	holePosY	黑洞位置y
                 */
                __egretProto__.addHole = function (holePosX, holePosY) {
                    this.holePosX = holePosX;
                    this.holePosY = holePosY;
                    this.isStart = true;
                    this.isOver = false;
                    this.timeFrame = this.time / 1000 * this.fps;
                    this.overTimeFrame = this.overTime / 1000 * this.fps;
                };
                /**
                 * 添加被吸引的物质列表
                 * @param	ary		物质列表
                 */
                __egretProto__.addSubstanceList = function (ary) {
                    this.subList = ary;
                };
                /**
                 * 更新
                 */
                __egretProto__.update = function () {
                    if (!this.isStart)
                        return;
                    if (!this.subList)
                        return;
                    var length = this.subList.length;
                    var obj;
                    var dis;
                    for (var i = length - 1; i >= 0; i--) {
                        obj = this.subList[i];
                        dis = this.mathDistance(this.holePosX, this.holePosY, obj.x, obj.y);
                        if (dis <= this.range) {
                            var speed = this.g * (1 - dis / this.range);
                            if (!this.isOver) {
                                if (dis <= this.minDis) {
                                    //小于最短距离
                                    var blackHoleEvent = new BlackHoleEvent(BlackHoleEvent.IN_HOLE, obj);
                                    this.dispatchEvent(blackHoleEvent);
                                    continue;
                                }
                                if (speed > dis)
                                    speed = dis;
                            }
                            else {
                                //黑洞生命周期结束
                                speed = 0;
                                this.angleSpeed = this.angleSpeed * this.f;
                            }
                            //如果在影响范围内
                            var dx = obj.x - this.holePosX;
                            var dy = obj.y - this.holePosY;
                            var radians = Math.atan2(dy, dx);
                            var vx = speed * Math.cos(radians);
                            var vy = speed * Math.sin(radians);
                            obj.x -= vx;
                            obj.y -= vy;
                            //算出角速度
                            radians += Math.PI / 2;
                            vx = this.angleSpeed * Math.cos(radians);
                            vy = this.angleSpeed * Math.sin(radians);
                            obj.x += vx;
                            obj.y += vy;
                            obj.rotation = radians / Math.PI * 180;
                        }
                    }
                    this.timeFrame--;
                    if (this.timeFrame <= 0 && !this.isOver) {
                        this.timeFrame = 0;
                        //黑洞持续时间结束
                        this.isOver = true;
                        this.dispatchEvent(new BlackHoleEvent(BlackHoleEvent.ATTENUATION));
                    }
                    if (this.isOver) {
                        //进入衰减期
                        this.overTimeFrame--;
                        if (this.overTimeFrame <= 0) {
                            //衰减期结束
                            this.overTimeFrame = 0;
                            this.isStart = false;
                            this.dispatchEvent(new BlackHoleEvent(BlackHoleEvent.OVER));
                        }
                    }
                };
                /**
                 * 设置调试容器
                 * @param	container
                 */
                __egretProto__.setDebugContainer = function (c) {
                    this.debugSprite = c;
                };
                /**
                 * 销毁
                 */
                __egretProto__.destroy = function () {
                    this.subList = null;
                    if (this.debugSprite)
                        this.debugSprite.graphics.clear();
                };
                /**
                 * 调试
                 */
                __egretProto__.debug = function () {
                    if (!this.debugSprite)
                        return;
                    if (!this.isStart)
                        return;
                    this.debugSprite.graphics.clear();
                    this.debugSprite.graphics.lineStyle(1, 0xFF0000);
                    this.debugSprite.graphics.drawCircle(this.holePosX, this.holePosY, this.range);
                };
                /**
                 * 计算距离
                 * @param	x1	点1的x坐标
                 * @param	y1	点1的y坐标
                 * @param	x2	点2的x坐标
                 * @param	y2	点2的y坐标
                 * @return	2点之间的距离
                 */
                __egretProto__.mathDistance = function (x1, y1, x2, y2) {
                    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
                };
                return BlackHoleEffect;
            })(egret.EventDispatcher);
            effect.BlackHoleEffect = BlackHoleEffect;
            BlackHoleEffect.prototype.__class__ = "cn.geckos.effect.BlackHoleEffect";
            var BlackHoleEvent = (function (_super) {
                __extends(BlackHoleEvent, _super);
                function BlackHoleEvent(type, obj, bubbles, cancelable) {
                    if (obj === void 0) { obj = null; }
                    if (bubbles === void 0) { bubbles = false; }
                    if (cancelable === void 0) { cancelable = false; }
                    this.dObj = obj;
                    _super.call(this, type, bubbles, cancelable);
                }
                var __egretProto__ = BlackHoleEvent.prototype;
                __egretProto__.clone = function () {
                    return new BlackHoleEvent(this.type, this.dObj, this.bubbles, this.cancelable);
                };
                //进入黑洞消息
                BlackHoleEvent.IN_HOLE = "inHole";
                //结束消息
                BlackHoleEvent.OVER = "over";
                //黑洞衰减消息
                BlackHoleEvent.ATTENUATION = "Attenuation";
                return BlackHoleEvent;
            })(egret.Event);
            effect.BlackHoleEvent = BlackHoleEvent;
            BlackHoleEvent.prototype.__class__ = "cn.geckos.effect.BlackHoleEvent";
        })(effect = geckos.effect || (geckos.effect = {}));
    })(geckos = cn.geckos || (cn.geckos = {}));
})(cn || (cn = {}));
//# sourceMappingURL=BlackHoleEffect.js.map