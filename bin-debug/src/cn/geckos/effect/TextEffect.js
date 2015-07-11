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
             * 字符串文本工具
             * @author Kanon
             */
            var TextEffect = (function () {
                function TextEffect() {
                }
                var __egretProto__ = TextEffect.prototype;
                /**
                 * 逐行显示
                 * @param	text  	文本
                 * @param	str   	字符串
                 * @param	delay   显示的间隔毫秒数
                 */
                __egretProto__.progressShow = function (text, str, delay) {
                    this.text = text;
                    this.str = str;
                    this.addTimer(delay);
                };
                /**
                 * 创建计时器
                 * @param	delay  间隔毫秒数
                 */
                __egretProto__.addTimer = function (delay) {
                    this.removeTimer();
                    this.index = 0;
                    this.timer = new egret.Timer(delay);
                    this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerHandler, this);
                    this.timer.start();
                };
                __egretProto__.timerHandler = function (event) {
                    var subStr = this.str.charAt(this.index);
                    this.text.appendText(subStr);
                    this.index++;
                    if (this.index == this.str.length) {
                        this.completeFun.call(this.thisObj);
                        this.removeTimer();
                    }
                };
                /**
                 * 销毁计时器
                 */
                __egretProto__.removeTimer = function () {
                    if (this.timer) {
                        this.timer.removeEventListener(egret.TimerEvent.TIMER, this.timerHandler, this);
                        this.timer.stop();
                        this.timer = null;
                    }
                };
                /**
                 * 销毁
                 */
                __egretProto__.destroy = function () {
                    this.text = null;
                    this.removeTimer();
                };
                /**
                 * 设置回调方法
                 */
                __egretProto__.setCallBackFunction = function (fun, thisObj) {
                    this.completeFun = fun;
                    this.thisObj = thisObj;
                };
                return TextEffect;
            })();
            effect.TextEffect = TextEffect;
            TextEffect.prototype.__class__ = "cn.geckos.effect.TextEffect";
        })(effect = geckos.effect || (geckos.effect = {}));
    })(geckos = cn.geckos || (cn.geckos = {}));
})(cn || (cn = {}));
