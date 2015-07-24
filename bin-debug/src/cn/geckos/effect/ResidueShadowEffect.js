var cn;
(function (cn) {
    var geckos;
    (function (geckos) {
        var effect;
        (function (effect) {
            /**
             * 残影效果
             * @author	Kanon
             */
            var ResidueShadowEffect = (function () {
                /**
                 * 构造
                 * @param parent        父级容器
                 * @param attenuation   衰减时间（毫秒）
                 */
                function ResidueShadowEffect(parent, attenuation) {
                    if (attenuation === void 0) { attenuation = 500; }
                    this.goodsList = [];
                    this.goodsDataList = [];
                    this.parent = parent;
                    this.attenuation = attenuation;
                }
                var __egretProto__ = ResidueShadowEffect.prototype;
                /**
                 * 添加物品
                 * @param dspObj   需要加残影的物品
                 */
                __egretProto__.addGoods = function (dspObj) {
                    if (!this.goodsList)
                        return;
                    var index = this.goodsList.indexOf(dspObj);
                    if (index == -1) {
                        this.goodsList.push(dspObj);
                        var obj = { "x": dspObj.x, "y": dspObj.y };
                        this.goodsDataList.push(obj);
                    }
                };
                /**
                 * 删除物品
                 * @param dspObj   需要删除的物品
                 */
                __egretProto__.removeGoods = function (dspObj) {
                    if (!this.goodsList)
                        return;
                    var index = this.goodsList.indexOf(dspObj);
                    if (index != -1) {
                        this.goodsList.splice(index, 1);
                        this.goodsDataList.splice(index, 1);
                    }
                };
                /**
                 * 渲染
                 */
                __egretProto__.renderer = function () {
                    if (!this.goodsList)
                        return;
                    for (var i = 0; i < this.goodsList.length; ++i) {
                        var goodsObj = this.goodsList[i];
                        var obj = this.goodsDataList[i];
                        var x = obj["x"];
                        var y = obj["y"];
                        var dis = this.mathDistance(x, y, goodsObj.x, goodsObj.y);
                        if (dis > 0)
                            this.createShadow(goodsObj);
                        obj["x"] = goodsObj.x;
                        obj["y"] = goodsObj.y;
                    }
                };
                /**
                 * 创建阴影
                 * @param obj
                 */
                __egretProto__.createShadow = function (obj) {
                    if (!obj)
                        return;
                    var texture;
                    if (obj instanceof egret.Bitmap) {
                        texture = obj.texture;
                    }
                    else if (obj instanceof egret.MovieClip) {
                        var mc = obj;
                        texture = mc.movieClipData.getTextureByFrame(mc.currentFrame);
                    }
                    if (texture) {
                        var shadowBmp = new egret.Bitmap(texture);
                        shadowBmp.x = obj.x;
                        shadowBmp.y = obj.y;
                        shadowBmp.anchorX = obj.anchorX;
                        shadowBmp.anchorY = obj.anchorY;
                        shadowBmp.alpha = obj.alpha;
                        shadowBmp.skewX = obj.skewX;
                        shadowBmp.skewY = obj.skewY;
                        shadowBmp.rotation = obj.rotation;
                        shadowBmp.anchorOffsetX = obj.anchorOffsetX;
                        shadowBmp.anchorOffsetY = obj.anchorOffsetY;
                        shadowBmp.scaleX = obj.scaleX;
                        shadowBmp.scaleY = obj.scaleY;
                        this.parent.addChild(shadowBmp);
                        egret.Tween.get(shadowBmp).to({ alpha: 0 }, this.attenuation).call(this.hideComplete, this, [shadowBmp]);
                    }
                };
                /**
                 * 隐藏结束
                 */
                __egretProto__.hideComplete = function (shadowBmp) {
                    if (shadowBmp && shadowBmp.parent)
                        shadowBmp.parent.removeChild(shadowBmp);
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
                    if (!this.goodsList)
                        return;
                    var length = this.goodsList.length;
                    for (var i = length - 1; i >= 0; --i) {
                        this.goodsList.splice(i, 1);
                    }
                    this.goodsList = null;
                    length = this.goodsDataList.length;
                    for (var i = length - 1; i >= 0; --i) {
                        this.goodsDataList.splice(i, 1);
                    }
                    this.goodsDataList = null;
                };
                return ResidueShadowEffect;
            })();
            effect.ResidueShadowEffect = ResidueShadowEffect;
            ResidueShadowEffect.prototype.__class__ = "cn.geckos.effect.ResidueShadowEffect";
        })(effect = geckos.effect || (geckos.effect = {}));
    })(geckos = cn.geckos || (cn.geckos = {}));
})(cn || (cn = {}));
//# sourceMappingURL=ResidueShadowEffect.js.map