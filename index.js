import Plugin from '@goosemod/plugin';

const parentModule = goosemod.webpackModules.findByProps('useContextMenuMessage', 'useClickMessage');
const originalFunc = useContextMenuMessage;

class WebRightClick extends Plugin {
  onImport() {
    const v = goosemod.webpackModules.findByProps('hasFlag');
    const S = goosemod.webpackModules.findByProps('MessageFlags');
    const _ = goosemod.webpackModules.find((x) => x.default?.toString().includes('type!==r.MessageTypes.APPLICATION_COMMAND||null'));
    const y = {
      default: {
        embedded: true
      }
    };
    const r = goosemod.webpackModules.findByProps('createElement');
    const g = { default: goosemod.webpackModules.findByDisplayName("SystemMessageContextMenu") };
    const E = { default: goosemod.webpackModules.findByDisplayName("MessageContextMenu") };
    const o = goosemod.webpackModules.findByProps('openContextMenu');
    
    const u = { default: goosemod.webpackModules.findByProps('getChannel') };
    const d = { default: goosemod.webpackModules.findByProps('getMessage') };
    const s = { default: goosemod.webpackModules.findByProps('isEditing') };
    
    const C = Object.assign;
    
    function useContextMenuMessage (e, t, n) {
      var a = t.id,
      i = e.id,
      l = e.flags,
      f = (0, v.hasFlag)(l, S.MessageFlags.EPHEMERAL),
      c = (0, _.default)(e);
      return r.useCallback((function (e, t) {
        if (y.default.embedded && !f) {
          var l = u.default.getChannel(a),
          p = d.default.getMessage(a, i),
          v = s.default.isEditing(a, i);
          null == l || null == p || v || (n({
            contextMenu: !0
          }), (0, o.openContextMenu)(e, (function (e) {
            return c ? r.createElement(g.default, C({}, e, {
              message: p,
              channel: l,
              attachment: t
            })) : r.createElement(E.default, C({}, e, {
              message: p,
              channel: l,
              attachment: t
            }))
          }), {
            onClose: function () {
              return n({
                contextMenu: !1
              })
            }
          }))
        }
      }), [f, a, i, n, c])
    }
  
    parentModule.useContextMenuMessage = useContextMenuMessage;
  }
  
  onRemove() {
    parentModule.useContextMenuMessage = originalFunc;
  }
}

export default new WebRightClick();