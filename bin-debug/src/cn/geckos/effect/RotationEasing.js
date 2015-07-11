var cn;
(function (cn) {
    var geckos;
    (function (geckos) {
        var effect;
        (function (effect) {
            /**
             *	角度缓动旋转
             * @author Kanon
             */
            var RotationEasing = (function () {
                function RotationEasing() {
                }
                var __egretProto__ = RotationEasing.prototype;
                /**
                 * 缓动旋转
                 * @param	originRot		原始的角度
                 * @param	originX			原点位置x
                 * @param	originY			原点位置y
                 * @param	targetX			目标位置X
                 * @param	targetY			目标位置Y
                 * @param	ease			缓存系数
                 * @return	旋转后的角度
                 */
                RotationEasing.rotate = function (originRot, originX, originY, targetX, targetY, ease) {
                    if (ease === void 0) { ease = .2; }
                    var dx = (originX - targetX);
                    var dy = (originY - targetY);
                    var r = Math.atan2(dy, dx);
                    var targetRotation = r * 180 / Math.PI;
                    if (targetRotation > originRot + 180)
                        targetRotation -= 360;
                    if (targetRotation < originRot - 180)
                        targetRotation += 360;
                    return (targetRotation - originRot) * ease;
                };
                return RotationEasing;
            })();
            effect.RotationEasing = RotationEasing;
            RotationEasing.prototype.__class__ = "cn.geckos.effect.RotationEasing";
        })(effect = geckos.effect || (geckos.effect = {}));
    })(geckos = cn.geckos || (cn.geckos = {}));
})(cn || (cn = {}));
//# sourceMappingURL=RotationEasing.js.map