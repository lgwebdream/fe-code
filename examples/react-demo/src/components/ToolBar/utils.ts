function getClassName(suffixCls: string, prefixCls?: string) {
  return prefixCls ? `${prefixCls}-${suffixCls}` : suffixCls;
}

export { getClassName };
