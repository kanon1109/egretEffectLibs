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
             * 血液飞溅效果
             * @author Kanon
             */
            var BloodSplatter = (function () {
                /**
                 * @param	container		效果外部容器
                 * @param	assest			飞溅资源
                 * @param	width			舞台宽度
                 * @param	height			舞台高度
                 * @param	num				飞溅数量
                 * @param	dis				飞溅距离
                 * @param	intensity		飞溅强度
                 * @param	size			飞溅大小
                 */
                function BloodSplatter(container, assest, stageWidth, stageHeight, num, dis, intensity, size) {
                    if (stageWidth === void 0) { stageWidth = 550; }
                    if (stageHeight === void 0) { stageHeight = 400; }
                    if (num === void 0) { num = 12; }
                    if (dis === void 0) { dis = 65; }
                    if (intensity === void 0) { intensity = .8; }
                    if (size === void 0) { size = 1.6; }
                    this.num = num;
                    this.dis = dis;
                    this.intensity = intensity;
                    this.size = size;
                    this.assest = assest;
                    this.container = container;
                    this.stageWidth = stageWidth;
                    this.stageHeight = stageHeight;
                    this.bloodTextrue = RES.getRes(assest);
                    this.bloodList = [];
                }
                var __egretProto__ = BloodSplatter.prototype;
                /**
                 * 根据位置绘制血迹
                 * @param	targetX		x坐标
                 * @param	targetY		y坐标
                 */
                __egretProto__.doSplatter = function (targetX, targetY) {
                    for (var i = 0; i < this.num; i += 1) {
                        //创建血迹
                        var blood = new egret.Bitmap(this.bloodTextrue);
                        //设置位置
                        blood.x = targetX + Math.random() * (this.dis + 1) - (this.dis / 2);
                        blood.y = targetY + Math.random() * (this.dis + 1) - (this.dis / 2);
                        //trace(Math.random() * (this.dis + 1) - (this.dis / 2));
                        //设置缩放
                        blood.scaleX = Math.random() * this.size + this.size / 4;
                        blood.scaleY = Math.random() * this.size + this.size / 4;
                        //角度
                        blood.rotation = Math.random() * 360;
                        //透明度
                        blood.alpha = Math.random() * this.intensity + this.intensity / 4;
                        this.container.addChild(blood);
                        this.bloodList.push(blood);
                    }
                };
                /**
                 * 清除画布
                 */
                __egretProto__.clear = function () {
                    var count = this.bloodList.length;
                    for (var i = count - 1; i >= 0; --i) {
                        var blood = this.bloodList[i];
                        if (blood && blood.parent)
                            blood.parent.removeChild(blood);
                        this.bloodList.splice(i, 1);
                    }
                };
                return BloodSplatter;
            })();
            effect.BloodSplatter = BloodSplatter;
            BloodSplatter.prototype.__class__ = "cn.geckos.effect.BloodSplatter";
        })(effect = geckos.effect || (geckos.effect = {}));
    })(geckos = cn.geckos || (cn.geckos = {}));
})(cn || (cn = {}));
