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
             * 绳子效果
             * @author Kanon
             */
            var Rope = (function () {
                function Rope(sp, ep, h) {
                    if (h === void 0) { h = 150; }
                    this.sp = sp;
                    this.ep = ep;
                    this.h = h;
                }
                var __egretProto__ = Rope.prototype;
                /**
                 * 更新数据
                 */
                __egretProto__.update = function () {
                    var dis = egret.Point.distance(this.sp, this.ep);
                    //.25和.75 修正绳子下垂后的弧度，.5 控制拉伸后的弧度
                    var cx1 = this.sp.x + (this.ep.x - this.sp.x) * .25;
                    var cy1 = this.sp.y + (this.ep.y - this.sp.y) * .25 + 4 * this.h * Math.exp(-.5 * dis / this.h) / 3;
                    var cx2 = this.sp.x + (this.ep.x - this.sp.x) * .75;
                    var cy2 = this.sp.y + (this.ep.y - this.sp.y) * .75 + 4 * this.h * Math.exp(-.5 * dis / this.h) / 3;
                    if (this.c1) {
                        var cvx1 = cx1 - this.c1.x;
                        var cvy1 = cy1 - this.c1.y;
                        //缓动公式 .95和.9控制绳子下垂后摆动的速度
                        this.v1.x = .95 * (.9 * this.v1.x + .1 * cvx1);
                        this.v1.y = .95 * (.9 * this.v1.y + .1 * cvy1);
                        this.c1.x += this.v1.x;
                        this.c1.y += this.v1.y;
                        var cvx2 = cx2 - this.c2.x;
                        var cvy2 = cy2 - this.c2.y;
                        //缓动公式
                        this.v2.x = .95 * (.9 * this.v2.x + .1 * cvx2);
                        this.v2.y = .95 * (.9 * this.v2.y + .1 * cvy2);
                        this.c2.x += this.v2.x;
                        this.c2.y += this.v2.y;
                    }
                    else {
                        this.c1 = new egret.Point(cx1, cy1);
                        this.c2 = new egret.Point(cx2, cy2);
                        this.v1 = new egret.Point();
                        this.v2 = new egret.Point();
                    }
                };
                /**
                 * 渲染绘制
                 * @param	graphics    绘制的图形
                 * @param	thickness   线宽
                 * @param	color       颜色
                 */
                __egretProto__.render = function (graphics, thickness, color) {
                    graphics.clear();
                    graphics.lineStyle(thickness, color);
                    graphics.moveTo(this.sp.x, this.sp.y);
                    graphics.cubicCurveTo(this.c1.x, this.c1.y, this.c2.x, this.c2.y, this.ep.x, this.ep.y);
                };
                return Rope;
            })();
            effect.Rope = Rope;
            Rope.prototype.__class__ = "cn.geckos.effect.Rope";
        })(effect = geckos.effect || (geckos.effect = {}));
    })(geckos = cn.geckos || (cn.geckos = {}));
})(cn || (cn = {}));
//# sourceMappingURL=Rope.js.map