var cn;
(function (cn) {
    var geckos;
    (function (geckos) {
        var effect;
        (function (effect) {
            /**
             * 链子效果
             * @author Kanon
             */
            var ChainEffect = (function () {
                function ChainEffect(parent) {
                    //线条颜色和粗细
                    this._lineColor = 0xFFFFFF;
                    this._lineSize = 8;
                    this.parent = parent;
                    this.lineAry = [];
                    this.pool = [];
                    this.prevPos = new egret.Point();
                    this.curPos = new egret.Point();
                }
                var __egretProto__ = ChainEffect.prototype;
                /**
                 * 移动初始点
                 * @param	x	起始点x坐标
                 * @param	y	起始点y坐标
                 */
                __egretProto__.move = function (x, y) {
                    this.prevPos.x = x;
                    this.prevPos.y = y;
                };
                /**
                 * 渲染效果
                 * @param	targetX  链式效果的目标x位置
                 * @param	targetY  链式效果的目标y位置
                 */
                __egretProto__.update = function (targetX, targetY) {
                    this.curPos.x = targetX;
                    this.curPos.y = targetY;
                    if (egret.Point.distance(this.prevPos, this.curPos) > 1) {
                        var line;
                        //如果对象池是空的则新建一个line
                        if (this.pool.length == 0) {
                            line = new Line(this.prevPos.x, this.prevPos.y, this.curPos.x, this.curPos.y, this.lineColor, this.lineSize);
                        }
                        else {
                            //对象池获取
                            line = this.pool.shift();
                            line.init(this.prevPos.x, this.prevPos.y, this.curPos.x, this.curPos.y, this.lineColor, this.lineSize);
                        }
                        if (this.lineAry.indexOf(line) == -1)
                            this.lineAry.push(line);
                        this.parent.addChild(line);
                        this.prevPos.x = targetX;
                        this.prevPos.y = targetY;
                    }
                    this.updateLine();
                };
                /**
                 * 更新线条状态
                 */
                __egretProto__.updateLine = function () {
                    if (!this.lineAry)
                        return;
                    var count = this.lineAry.length;
                    for (var i = count - 1; i >= 0; --i) {
                        var line = this.lineAry[i];
                        line.draw();
                        line.thickness--;
                        if (line.thickness <= 0) {
                            line.remove();
                            this.lineAry.splice(i, 1);
                            this.pool.push(line);
                        }
                    }
                };
                /**
                 * 清除
                 */
                __egretProto__.clear = function () {
                    var line;
                    var length = this.pool.length;
                    for (var i = length - 1; i >= 0; i -= 1) {
                        line = this.pool[i];
                        line.remove();
                        this.pool.splice(i, 1);
                    }
                    var count = this.lineAry.length;
                    for (var i = count - 1; i >= 0; --i) {
                        var line = this.lineAry[i];
                        line.remove();
                        this.lineAry.splice(i, 1);
                    }
                };
                /**
                 * 销毁
                 */
                __egretProto__.destroy = function () {
                    this.clear();
                    this.prevPos = null;
                    this.curPos = null;
                    this.parent = null;
                    this.pool = null;
                    this.lineAry = null;
                };
                Object.defineProperty(__egretProto__, "lineColor", {
                    /**
                     * 设置线条颜色
                     */
                    get: function () {
                        return this._lineColor;
                    },
                    set: function (value) {
                        this._lineColor = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(__egretProto__, "lineSize", {
                    /**
                     * 线条粗细
                     */
                    get: function () {
                        return this._lineSize;
                    },
                    set: function (value) {
                        this._lineSize = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                return ChainEffect;
            })();
            effect.ChainEffect = ChainEffect;
            ChainEffect.prototype.__class__ = "cn.geckos.effect.ChainEffect";
        })(effect = geckos.effect || (geckos.effect = {}));
    })(geckos = cn.geckos || (cn.geckos = {}));
})(cn || (cn = {}));
var Line = (function (_super) {
    __extends(Line, _super);
    function Line(sx, sy, ex, ey, color, thickness) {
        if (thickness === void 0) { thickness = 5; }
        _super.call(this);
        this.init(sx, sy, ex, ey, color, thickness);
    }
    var __egretProto__ = Line.prototype;
    /**
     * 初始化
     * @param	sx
     * @param	sy
     * @param	ex
     * @param	ey
     * @param	color
     * @param	thickness
     */
    __egretProto__.init = function (sx, sy, ex, ey, color, thickness) {
        if (thickness === void 0) { thickness = 5; }
        this.sx = sx;
        this.sy = sy;
        this.ex = ex;
        this.ey = ey;
        this.color = color;
        this.thickness = thickness;
    };
    /**
     * 绘制
     */
    __egretProto__.draw = function () {
        this.graphics.clear();
        this.graphics.lineStyle(this.thickness, this.color);
        this.graphics.moveTo(this.sx, this.sy);
        this.graphics.lineTo(this.ex, this.ey);
    };
    /**
     * 销毁
     */
    __egretProto__.remove = function () {
        this.graphics.clear();
        if (this.parent)
            this.parent.removeChild(this);
    };
    Object.defineProperty(__egretProto__, "thickness", {
        /**
         * 线条粗细
         */
        get: function () {
            return this._thickness;
        },
        set: function (value) {
            this._thickness = value;
        },
        enumerable: true,
        configurable: true
    });
    return Line;
})(egret.Shape);
Line.prototype.__class__ = "Line";
//# sourceMappingURL=ChainEffect.js.map