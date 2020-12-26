var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var cn;
(function (cn) {
    var geckos;
    (function (geckos) {
        var effect;
        (function (effect) {
            var TrackUnit = (function () {
                function TrackUnit() {
                    this.age = 0;
                    this.x = 0;
                    this.y = 0;
                    this.vx = 0;
                    this.vy = 0;
                }
                TrackUnit.prototype.update = function (tx, ty) {
                    this.age++;
                    var dx = tx - this.x;
                    var dy = ty - this.y;
                    var o = this.normalize(dx, dy);
                    dx = o.x;
                    dy = o.y;
                    var rSpeed = (this.age) / 60 + 1.5;
                    rSpeed = rSpeed > 3 ? 3 : rSpeed;
                    this.vx += dx * rSpeed;
                    this.vy += dy * rSpeed;
                    o = this.normalize(this.vx, this.vy);
                    this.vx = o.x;
                    this.vy = o.y;
                    this.vx *= 15;
                    this.vy *= 15;
                    this.x += this.vx;
                    this.y += this.vy;
                    if (this.img) {
                        this.img.x = this.x;
                        this.img.y = this.y;
                    }
                };
                TrackUnit.prototype.normalize = function (x, y) {
                    var distance = Math.sqrt(x * x + y * y);
                    if (distance >= 0.00001) {
                        x /= distance;
                        y /= distance;
                    }
                    return { x: x, y: y };
                };
                return TrackUnit;
            }());
            effect.TrackUnit = TrackUnit;
            __reflect(TrackUnit.prototype, "cn.geckos.effect.TrackUnit");
        })(effect = geckos.effect || (geckos.effect = {}));
    })(geckos = cn.geckos || (cn.geckos = {}));
})(cn || (cn = {}));
//# sourceMappingURL=TrackUnit.js.map