function getClassName(suffixCls, prefixCls) {
    return prefixCls ? `${prefixCls}-${suffixCls}` : suffixCls;
}
export { getClassName };
