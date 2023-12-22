"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[588],{7455:function(e,t,r){r.d(t,{Z:function(){return P}});var n=r(6750),o=r(431),i=r(6006),l=r(3831),a=r(7562),s=r(5698),u=r(2971),c=r(6975),p=r(9268),d=(0,c.Z)((0,p.jsx)("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person"),f=r(8539),h=r(3809);function m(e){return(0,h.Z)("MuiAvatar",e)}(0,f.Z)("MuiAvatar",["root","colorDefault","circular","rounded","square","img","fallback"]);let v=["alt","children","className","component","imgProps","sizes","src","srcSet","variant"],g=e=>{let{classes:t,variant:r,colorDefault:n}=e;return(0,a.Z)({root:["root",r,n&&"colorDefault"],img:["img"],fallback:["fallback"]},m,t)},b=(0,s.ZP)("div",{name:"MuiAvatar",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.root,t[r.variant],r.colorDefault&&t.colorDefault]}})(({theme:e,ownerState:t})=>(0,o.Z)({position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(20),lineHeight:1,borderRadius:"50%",overflow:"hidden",userSelect:"none"},"rounded"===t.variant&&{borderRadius:(e.vars||e).shape.borderRadius},"square"===t.variant&&{borderRadius:0},t.colorDefault&&(0,o.Z)({color:(e.vars||e).palette.background.default},e.vars?{backgroundColor:e.vars.palette.Avatar.defaultBg}:{backgroundColor:"light"===e.palette.mode?e.palette.grey[400]:e.palette.grey[600]}))),Z=(0,s.ZP)("img",{name:"MuiAvatar",slot:"Img",overridesResolver:(e,t)=>t.img})({width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4}),y=(0,s.ZP)(d,{name:"MuiAvatar",slot:"Fallback",overridesResolver:(e,t)=>t.fallback})({width:"75%",height:"75%"}),x=i.forwardRef(function(e,t){let r=(0,u.Z)({props:e,name:"MuiAvatar"}),{alt:a,children:s,className:c,component:d="div",imgProps:f,sizes:h,src:m,srcSet:x,variant:P="circular"}=r,E=(0,n.Z)(r,v),M=null,R=function({crossOrigin:e,referrerPolicy:t,src:r,srcSet:n}){let[o,l]=i.useState(!1);return i.useEffect(()=>{if(!r&&!n)return;l(!1);let o=!0,i=new Image;return i.onload=()=>{o&&l("loaded")},i.onerror=()=>{o&&l("error")},i.crossOrigin=e,i.referrerPolicy=t,i.src=r,n&&(i.srcset=n),()=>{o=!1}},[e,t,r,n]),o}((0,o.Z)({},f,{src:m,srcSet:x})),S=m||x,w=S&&"error"!==R,k=(0,o.Z)({},r,{colorDefault:!w,component:d,variant:P}),T=g(k);return M=w?(0,p.jsx)(Z,(0,o.Z)({alt:a,src:m,srcSet:x,sizes:h,ownerState:k,className:T.img},f)):null!=s?s:S&&a?a[0]:(0,p.jsx)(y,{ownerState:k,className:T.fallback}),(0,p.jsx)(b,(0,o.Z)({as:d,ownerState:k,className:(0,l.Z)(T.root,c),ref:t},E,{children:M}))});var P=x},351:function(e,t,r){r.d(t,{Z:function(){return V}});var n=r(431),o=r(6750),i=r(6006),l=r(3831),a=r(7562),s=r(5698),u=r(2971),c=r(4414),p=r(3631),d=r(7088),f=r(5522),h=r(907);function m(e,t){var r=Object.create(null);return e&&i.Children.map(e,function(e){return e}).forEach(function(e){r[e.key]=t&&(0,i.isValidElement)(e)?t(e):e}),r}function v(e,t,r){return null!=r[t]?r[t]:e.props[t]}var g=Object.values||function(e){return Object.keys(e).map(function(t){return e[t]})},b=function(e){function t(t,r){var n,o=(n=e.call(this,t,r)||this).handleExited.bind(function(e){if(void 0===e)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(n));return n.state={contextValue:{isMounting:!0},handleExited:o,firstRender:!0},n}(0,f.Z)(t,e);var r=t.prototype;return r.componentDidMount=function(){this.mounted=!0,this.setState({contextValue:{isMounting:!1}})},r.componentWillUnmount=function(){this.mounted=!1},t.getDerivedStateFromProps=function(e,t){var r,n,o=t.children,l=t.handleExited;return{children:t.firstRender?m(e.children,function(t){return(0,i.cloneElement)(t,{onExited:l.bind(null,t),in:!0,appear:v(t,"appear",e),enter:v(t,"enter",e),exit:v(t,"exit",e)})}):(Object.keys(n=function(e,t){function r(r){return r in t?t[r]:e[r]}e=e||{},t=t||{};var n,o=Object.create(null),i=[];for(var l in e)l in t?i.length&&(o[l]=i,i=[]):i.push(l);var a={};for(var s in t){if(o[s])for(n=0;n<o[s].length;n++){var u=o[s][n];a[o[s][n]]=r(u)}a[s]=r(s)}for(n=0;n<i.length;n++)a[i[n]]=r(i[n]);return a}(o,r=m(e.children))).forEach(function(t){var a=n[t];if((0,i.isValidElement)(a)){var s=t in o,u=t in r,c=o[t],p=(0,i.isValidElement)(c)&&!c.props.in;u&&(!s||p)?n[t]=(0,i.cloneElement)(a,{onExited:l.bind(null,a),in:!0,exit:v(a,"exit",e),enter:v(a,"enter",e)}):u||!s||p?u&&s&&(0,i.isValidElement)(c)&&(n[t]=(0,i.cloneElement)(a,{onExited:l.bind(null,a),in:c.props.in,exit:v(a,"exit",e),enter:v(a,"enter",e)})):n[t]=(0,i.cloneElement)(a,{in:!1})}}),n),firstRender:!1}},r.handleExited=function(e,t){var r=m(this.props.children);e.key in r||(e.props.onExited&&e.props.onExited(t),this.mounted&&this.setState(function(t){var r=(0,n.Z)({},t.children);return delete r[e.key],{children:r}}))},r.render=function(){var e=this.props,t=e.component,r=e.childFactory,n=(0,o.Z)(e,["component","childFactory"]),l=this.state.contextValue,a=g(this.state.children).map(r);return(delete n.appear,delete n.enter,delete n.exit,null===t)?i.createElement(h.Z.Provider,{value:l},a):i.createElement(h.Z.Provider,{value:l},i.createElement(t,n,a))},t}(i.Component);b.propTypes={},b.defaultProps={component:"div",childFactory:function(e){return e}};var Z=r(2120),y=r(9268),x=r(8539);let P=(0,x.Z)("MuiTouchRipple",["root","ripple","rippleVisible","ripplePulsate","child","childLeaving","childPulsate"]),E=["center","classes","className"],M=e=>e,R,S,w,k,T=(0,Z.F4)(R||(R=M`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`)),C=(0,Z.F4)(S||(S=M`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`)),D=(0,Z.F4)(w||(w=M`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`)),j=(0,s.ZP)("span",{name:"MuiTouchRipple",slot:"Root"})({overflow:"hidden",pointerEvents:"none",position:"absolute",zIndex:0,top:0,right:0,bottom:0,left:0,borderRadius:"inherit"}),F=(0,s.ZP)(function(e){let{className:t,classes:r,pulsate:n=!1,rippleX:o,rippleY:a,rippleSize:s,in:u,onExited:c,timeout:p}=e,[d,f]=i.useState(!1),h=(0,l.Z)(t,r.ripple,r.rippleVisible,n&&r.ripplePulsate),m=(0,l.Z)(r.child,d&&r.childLeaving,n&&r.childPulsate);return u||d||f(!0),i.useEffect(()=>{if(!u&&null!=c){let e=setTimeout(c,p);return()=>{clearTimeout(e)}}},[c,u,p]),(0,y.jsx)("span",{className:h,style:{width:s,height:s,top:-(s/2)+a,left:-(s/2)+o},children:(0,y.jsx)("span",{className:m})})},{name:"MuiTouchRipple",slot:"Ripple"})(k||(k=M`
  opacity: 0;
  position: absolute;

  &.${0} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  &.${0} {
    animation-duration: ${0}ms;
  }

  & .${0} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${0} {
    opacity: 0;
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  & .${0} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${0};
    animation-duration: 2500ms;
    animation-timing-function: ${0};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`),P.rippleVisible,T,550,({theme:e})=>e.transitions.easing.easeInOut,P.ripplePulsate,({theme:e})=>e.transitions.duration.shorter,P.child,P.childLeaving,C,550,({theme:e})=>e.transitions.easing.easeInOut,P.childPulsate,D,({theme:e})=>e.transitions.easing.easeInOut),z=i.forwardRef(function(e,t){let r=(0,u.Z)({props:e,name:"MuiTouchRipple"}),{center:a=!1,classes:s={},className:c}=r,p=(0,o.Z)(r,E),[d,f]=i.useState([]),h=i.useRef(0),m=i.useRef(null);i.useEffect(()=>{m.current&&(m.current(),m.current=null)},[d]);let v=i.useRef(!1),g=i.useRef(0),Z=i.useRef(null),x=i.useRef(null);i.useEffect(()=>()=>{g.current&&clearTimeout(g.current)},[]);let M=i.useCallback(e=>{let{pulsate:t,rippleX:r,rippleY:n,rippleSize:o,cb:i}=e;f(e=>[...e,(0,y.jsx)(F,{classes:{ripple:(0,l.Z)(s.ripple,P.ripple),rippleVisible:(0,l.Z)(s.rippleVisible,P.rippleVisible),ripplePulsate:(0,l.Z)(s.ripplePulsate,P.ripplePulsate),child:(0,l.Z)(s.child,P.child),childLeaving:(0,l.Z)(s.childLeaving,P.childLeaving),childPulsate:(0,l.Z)(s.childPulsate,P.childPulsate)},timeout:550,pulsate:t,rippleX:r,rippleY:n,rippleSize:o},h.current)]),h.current+=1,m.current=i},[s]),R=i.useCallback((e={},t={},r=()=>{})=>{let n,o,i;let{pulsate:l=!1,center:s=a||t.pulsate,fakeElement:u=!1}=t;if((null==e?void 0:e.type)==="mousedown"&&v.current){v.current=!1;return}(null==e?void 0:e.type)==="touchstart"&&(v.current=!0);let c=u?null:x.current,p=c?c.getBoundingClientRect():{width:0,height:0,left:0,top:0};if(!s&&void 0!==e&&(0!==e.clientX||0!==e.clientY)&&(e.clientX||e.touches)){let{clientX:t,clientY:r}=e.touches&&e.touches.length>0?e.touches[0]:e;n=Math.round(t-p.left),o=Math.round(r-p.top)}else n=Math.round(p.width/2),o=Math.round(p.height/2);if(s)(i=Math.sqrt((2*p.width**2+p.height**2)/3))%2==0&&(i+=1);else{let e=2*Math.max(Math.abs((c?c.clientWidth:0)-n),n)+2,t=2*Math.max(Math.abs((c?c.clientHeight:0)-o),o)+2;i=Math.sqrt(e**2+t**2)}null!=e&&e.touches?null===Z.current&&(Z.current=()=>{M({pulsate:l,rippleX:n,rippleY:o,rippleSize:i,cb:r})},g.current=setTimeout(()=>{Z.current&&(Z.current(),Z.current=null)},80)):M({pulsate:l,rippleX:n,rippleY:o,rippleSize:i,cb:r})},[a,M]),S=i.useCallback(()=>{R({},{pulsate:!0})},[R]),w=i.useCallback((e,t)=>{if(clearTimeout(g.current),(null==e?void 0:e.type)==="touchend"&&Z.current){Z.current(),Z.current=null,g.current=setTimeout(()=>{w(e,t)});return}Z.current=null,f(e=>e.length>0?e.slice(1):e),m.current=t},[]);return i.useImperativeHandle(t,()=>({pulsate:S,start:R,stop:w}),[S,R,w]),(0,y.jsx)(j,(0,n.Z)({className:(0,l.Z)(P.root,s.root,c),ref:x},p,{children:(0,y.jsx)(b,{component:null,exit:!0,children:d})}))});var L=r(3809);function N(e){return(0,L.Z)("MuiButtonBase",e)}let A=(0,x.Z)("MuiButtonBase",["root","disabled","focusVisible"]),$=["action","centerRipple","children","className","component","disabled","disableRipple","disableTouchRipple","focusRipple","focusVisibleClassName","LinkComponent","onBlur","onClick","onContextMenu","onDragLeave","onFocus","onFocusVisible","onKeyDown","onKeyUp","onMouseDown","onMouseLeave","onMouseUp","onTouchEnd","onTouchMove","onTouchStart","tabIndex","TouchRippleProps","touchRippleRef","type"],I=e=>{let{disabled:t,focusVisible:r,focusVisibleClassName:n,classes:o}=e,i=(0,a.Z)({root:["root",t&&"disabled",r&&"focusVisible"]},N,o);return r&&n&&(i.root+=` ${n}`),i},H=(0,s.ZP)("button",{name:"MuiButtonBase",slot:"Root",overridesResolver:(e,t)=>t.root})({display:"inline-flex",alignItems:"center",justifyContent:"center",position:"relative",boxSizing:"border-box",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none",textDecoration:"none",color:"inherit","&::-moz-focus-inner":{borderStyle:"none"},[`&.${A.disabled}`]:{pointerEvents:"none",cursor:"default"},"@media print":{colorAdjust:"exact"}}),O=i.forwardRef(function(e,t){let r=(0,u.Z)({props:e,name:"MuiButtonBase"}),{action:a,centerRipple:s=!1,children:f,className:h,component:m="button",disabled:v=!1,disableRipple:g=!1,disableTouchRipple:b=!1,focusRipple:Z=!1,LinkComponent:x="a",onBlur:P,onClick:E,onContextMenu:M,onDragLeave:R,onFocus:S,onFocusVisible:w,onKeyDown:k,onKeyUp:T,onMouseDown:C,onMouseLeave:D,onMouseUp:j,onTouchEnd:F,onTouchMove:L,onTouchStart:N,tabIndex:A=0,TouchRippleProps:O,touchRippleRef:V,type:B}=r,K=(0,o.Z)(r,$),W=i.useRef(null),_=i.useRef(null),U=(0,c.Z)(_,V),{isFocusVisibleRef:q,onFocus:X,onBlur:Y,ref:G}=(0,d.Z)(),[J,Q]=i.useState(!1);v&&J&&Q(!1),i.useImperativeHandle(a,()=>({focusVisible:()=>{Q(!0),W.current.focus()}}),[]);let[ee,et]=i.useState(!1);i.useEffect(()=>{et(!0)},[]);let er=ee&&!g&&!v;function en(e,t,r=b){return(0,p.Z)(n=>(t&&t(n),!r&&_.current&&_.current[e](n),!0))}i.useEffect(()=>{J&&Z&&!g&&ee&&_.current.pulsate()},[g,Z,J,ee]);let eo=en("start",C),ei=en("stop",M),el=en("stop",R),ea=en("stop",j),es=en("stop",e=>{J&&e.preventDefault(),D&&D(e)}),eu=en("start",N),ec=en("stop",F),ep=en("stop",L),ed=en("stop",e=>{Y(e),!1===q.current&&Q(!1),P&&P(e)},!1),ef=(0,p.Z)(e=>{W.current||(W.current=e.currentTarget),X(e),!0===q.current&&(Q(!0),w&&w(e)),S&&S(e)}),eh=()=>{let e=W.current;return m&&"button"!==m&&!("A"===e.tagName&&e.href)},em=i.useRef(!1),ev=(0,p.Z)(e=>{Z&&!em.current&&J&&_.current&&" "===e.key&&(em.current=!0,_.current.stop(e,()=>{_.current.start(e)})),e.target===e.currentTarget&&eh()&&" "===e.key&&e.preventDefault(),k&&k(e),e.target===e.currentTarget&&eh()&&"Enter"===e.key&&!v&&(e.preventDefault(),E&&E(e))}),eg=(0,p.Z)(e=>{Z&&" "===e.key&&_.current&&J&&!e.defaultPrevented&&(em.current=!1,_.current.stop(e,()=>{_.current.pulsate(e)})),T&&T(e),E&&e.target===e.currentTarget&&eh()&&" "===e.key&&!e.defaultPrevented&&E(e)}),eb=m;"button"===eb&&(K.href||K.to)&&(eb=x);let eZ={};"button"===eb?(eZ.type=void 0===B?"button":B,eZ.disabled=v):(K.href||K.to||(eZ.role="button"),v&&(eZ["aria-disabled"]=v));let ey=(0,c.Z)(t,G,W),ex=(0,n.Z)({},r,{centerRipple:s,component:m,disabled:v,disableRipple:g,disableTouchRipple:b,focusRipple:Z,tabIndex:A,focusVisible:J}),eP=I(ex);return(0,y.jsxs)(H,(0,n.Z)({as:eb,className:(0,l.Z)(eP.root,h),ownerState:ex,onBlur:ed,onClick:E,onContextMenu:ei,onFocus:ef,onKeyDown:ev,onKeyUp:eg,onMouseDown:eo,onMouseLeave:es,onMouseUp:ea,onDragLeave:el,onTouchEnd:ec,onTouchMove:ep,onTouchStart:eu,ref:ey,tabIndex:v?-1:A,type:B},eZ,K,{children:[f,er?(0,y.jsx)(z,(0,n.Z)({ref:U,center:s},O)):null]}))});var V=O},8913:function(e,t,r){var n=r(431),o=r(6750),i=r(6006),l=r(2904),a=r(4957),s=r(2215),u=r(4414),c=r(9268);let p=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function d(e){return`scale(${e}, ${e**2})`}let f={entering:{opacity:1,transform:d(1)},entered:{opacity:1,transform:"none"}},h="undefined"!=typeof navigator&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),m=i.forwardRef(function(e,t){let{addEndListener:r,appear:m=!0,children:v,easing:g,in:b,onEnter:Z,onEntered:y,onEntering:x,onExit:P,onExited:E,onExiting:M,style:R,timeout:S="auto",TransitionComponent:w=l.ZP}=e,k=(0,o.Z)(e,p),T=i.useRef(),C=i.useRef(),D=(0,a.Z)(),j=i.useRef(null),F=(0,u.Z)(j,v.ref,t),z=e=>t=>{if(e){let r=j.current;void 0===t?e(r):e(r,t)}},L=z(x),N=z((e,t)=>{let r;(0,s.n)(e);let{duration:n,delay:o,easing:i}=(0,s.C)({style:R,timeout:S,easing:g},{mode:"enter"});"auto"===S?(r=D.transitions.getAutoHeightDuration(e.clientHeight),C.current=r):r=n,e.style.transition=[D.transitions.create("opacity",{duration:r,delay:o}),D.transitions.create("transform",{duration:h?r:.666*r,delay:o,easing:i})].join(","),Z&&Z(e,t)}),A=z(y),$=z(M),I=z(e=>{let t;let{duration:r,delay:n,easing:o}=(0,s.C)({style:R,timeout:S,easing:g},{mode:"exit"});"auto"===S?(t=D.transitions.getAutoHeightDuration(e.clientHeight),C.current=t):t=r,e.style.transition=[D.transitions.create("opacity",{duration:t,delay:n}),D.transitions.create("transform",{duration:h?t:.666*t,delay:h?n:n||.333*t,easing:o})].join(","),e.style.opacity=0,e.style.transform=d(.75),P&&P(e)}),H=z(E);return i.useEffect(()=>()=>{clearTimeout(T.current)},[]),(0,c.jsx)(w,(0,n.Z)({appear:m,in:b,nodeRef:j,onEnter:N,onEntered:A,onEntering:L,onExit:I,onExited:H,onExiting:$,addEndListener:e=>{"auto"===S&&(T.current=setTimeout(e,C.current||0)),r&&r(j.current,e)},timeout:"auto"===S?null:S},k,{children:(e,t)=>i.cloneElement(v,(0,n.Z)({style:(0,n.Z)({opacity:0,transform:d(.75),visibility:"exited"!==e||b?void 0:"hidden"},f[e],R,v.props.style),ref:F},t))}))});m.muiSupportAuto=!0,t.Z=m},2879:function(e,t,r){var n=r(6006);let o=n.createContext({});t.Z=o},772:function(e,t,r){r.d(t,{Z:function(){return ei}});var n=r(431),o=r(6750),i=r(6006);r(9814);var l=r(3831),a=r(7562),s=r(3820),u=r(6319),c=r(5698),p=r(2971),d=r(2879),f=r(8539),h=r(3809);function m(e){return(0,h.Z)("MuiList",e)}(0,f.Z)("MuiList",["root","padding","dense","subheader"]);var v=r(9268);let g=["children","className","component","dense","disablePadding","subheader"],b=e=>{let{classes:t,disablePadding:r,dense:n,subheader:o}=e;return(0,a.Z)({root:["root",!r&&"padding",n&&"dense",o&&"subheader"]},m,t)},Z=(0,c.ZP)("ul",{name:"MuiList",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.root,!r.disablePadding&&t.padding,r.dense&&t.dense,r.subheader&&t.subheader]}})(({ownerState:e})=>(0,n.Z)({listStyle:"none",margin:0,padding:0,position:"relative"},!e.disablePadding&&{paddingTop:8,paddingBottom:8},e.subheader&&{paddingTop:0})),y=i.forwardRef(function(e,t){let r=(0,p.Z)({props:e,name:"MuiList"}),{children:a,className:s,component:u="ul",dense:c=!1,disablePadding:f=!1,subheader:h}=r,m=(0,o.Z)(r,g),y=i.useMemo(()=>({dense:c}),[c]),x=(0,n.Z)({},r,{component:u,dense:c,disablePadding:f}),P=b(x);return(0,v.jsx)(d.Z.Provider,{value:y,children:(0,v.jsxs)(Z,(0,n.Z)({as:u,className:(0,l.Z)(P.root,s),ref:t,ownerState:x},m,{children:[h,a]}))})});var x=r(1249).Z,P=r(4414),E=r(6837);let M=["actions","autoFocus","autoFocusItem","children","className","disabledItemsFocusable","disableListWrap","onKeyDown","variant"];function R(e,t,r){return e===t?e.firstChild:t&&t.nextElementSibling?t.nextElementSibling:r?null:e.firstChild}function S(e,t,r){return e===t?r?e.firstChild:e.lastChild:t&&t.previousElementSibling?t.previousElementSibling:r?null:e.lastChild}function w(e,t){if(void 0===t)return!0;let r=e.innerText;return void 0===r&&(r=e.textContent),0!==(r=r.trim().toLowerCase()).length&&(t.repeating?r[0]===t.keys[0]:0===r.indexOf(t.keys.join("")))}function k(e,t,r,n,o,i){let l=!1,a=o(e,t,!!t&&r);for(;a;){if(a===e.firstChild){if(l)return!1;l=!0}let t=!n&&(a.disabled||"true"===a.getAttribute("aria-disabled"));if(a.hasAttribute("tabindex")&&w(a,i)&&!t)return a.focus(),!0;a=o(e,a,r)}return!1}let T=i.forwardRef(function(e,t){let{actions:r,autoFocus:l=!1,autoFocusItem:a=!1,children:s,className:c,disabledItemsFocusable:p=!1,disableListWrap:d=!1,onKeyDown:f,variant:h="selectedMenu"}=e,m=(0,o.Z)(e,M),g=i.useRef(null),b=i.useRef({keys:[],repeating:!0,previousKeyMatched:!0,lastTime:null});(0,E.Z)(()=>{l&&g.current.focus()},[l]),i.useImperativeHandle(r,()=>({adjustStyleForScrollbar:(e,t)=>{let r=!g.current.style.width;if(e.clientHeight<g.current.clientHeight&&r){let r=`${x((0,u.Z)(e))}px`;g.current.style["rtl"===t.direction?"paddingLeft":"paddingRight"]=r,g.current.style.width=`calc(100% + ${r})`}return g.current}}),[]);let Z=(0,P.Z)(g,t),T=-1;i.Children.forEach(s,(e,t)=>{if(!i.isValidElement(e)){T===t&&(T+=1)>=s.length&&(T=-1);return}e.props.disabled||("selectedMenu"===h&&e.props.selected?T=t:-1!==T||(T=t)),T===t&&(e.props.disabled||e.props.muiSkipListHighlight||e.type.muiSkipListHighlight)&&(T+=1)>=s.length&&(T=-1)});let C=i.Children.map(s,(e,t)=>{if(t===T){let t={};return a&&(t.autoFocus=!0),void 0===e.props.tabIndex&&"selectedMenu"===h&&(t.tabIndex=0),i.cloneElement(e,t)}return e});return(0,v.jsx)(y,(0,n.Z)({role:"menu",ref:Z,className:c,onKeyDown:e=>{let t=g.current,r=e.key,n=(0,u.Z)(t).activeElement;if("ArrowDown"===r)e.preventDefault(),k(t,n,d,p,R);else if("ArrowUp"===r)e.preventDefault(),k(t,n,d,p,S);else if("Home"===r)e.preventDefault(),k(t,null,d,p,R);else if("End"===r)e.preventDefault(),k(t,null,d,p,S);else if(1===r.length){let o=b.current,i=r.toLowerCase(),l=performance.now();o.keys.length>0&&(l-o.lastTime>500?(o.keys=[],o.repeating=!0,o.previousKeyMatched=!0):o.repeating&&i!==o.keys[0]&&(o.repeating=!1)),o.lastTime=l,o.keys.push(i);let a=n&&!o.repeating&&w(n,o);o.previousKeyMatched&&(a||k(t,n,!1,p,R,o))?e.preventDefault():o.previousKeyMatched=!1}f&&f(e)},tabIndex:l?0:-1},m,{children:C}))});var C=r(2071),D=r(1975),j=r(232),F=r(8913),z=r(706),L=r(5991);function N(e){return(0,h.Z)("MuiPopover",e)}(0,f.Z)("MuiPopover",["root","paper"]);let A=["onEntering"],$=["action","anchorEl","anchorOrigin","anchorPosition","anchorReference","children","className","container","elevation","marginThreshold","open","PaperProps","slots","slotProps","transformOrigin","TransitionComponent","transitionDuration","TransitionProps"],I=["slotProps"];function H(e,t){let r=0;return"number"==typeof t?r=t:"center"===t?r=e.height/2:"bottom"===t&&(r=e.height),r}function O(e,t){let r=0;return"number"==typeof t?r=t:"center"===t?r=e.width/2:"right"===t&&(r=e.width),r}function V(e){return[e.horizontal,e.vertical].map(e=>"number"==typeof e?`${e}px`:e).join(" ")}function B(e){return"function"==typeof e?e():e}let K=e=>{let{classes:t}=e;return(0,a.Z)({root:["root"],paper:["paper"]},N,t)},W=(0,c.ZP)(z.Z,{name:"MuiPopover",slot:"Root",overridesResolver:(e,t)=>t.root})({}),_=(0,c.ZP)(L.Z,{name:"MuiPopover",slot:"Paper",overridesResolver:(e,t)=>t.paper})({position:"absolute",overflowY:"auto",overflowX:"hidden",minWidth:16,minHeight:16,maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 32px)",outline:0}),U=i.forwardRef(function(e,t){var r,a,c;let d=(0,p.Z)({props:e,name:"MuiPopover"}),{action:f,anchorEl:h,anchorOrigin:m={vertical:"top",horizontal:"left"},anchorPosition:g,anchorReference:b="anchorEl",children:Z,className:y,container:x,elevation:E=8,marginThreshold:M=16,open:R,PaperProps:S={},slots:w,slotProps:k,transformOrigin:T={vertical:"top",horizontal:"left"},TransitionComponent:z=F.Z,transitionDuration:L="auto",TransitionProps:{onEntering:N}={}}=d,U=(0,o.Z)(d.TransitionProps,A),q=(0,o.Z)(d,$),X=null!=(r=null==k?void 0:k.paper)?r:S,Y=i.useRef(),G=(0,P.Z)(Y,X.ref),J=(0,n.Z)({},d,{anchorOrigin:m,anchorReference:b,elevation:E,marginThreshold:M,externalPaperSlotProps:X,transformOrigin:T,TransitionComponent:z,transitionDuration:L,TransitionProps:U}),Q=K(J),ee=i.useCallback(()=>{if("anchorPosition"===b)return g;let e=B(h),t=e&&1===e.nodeType?e:(0,u.Z)(Y.current).body,r=t.getBoundingClientRect();return{top:r.top+H(r,m.vertical),left:r.left+O(r,m.horizontal)}},[h,m.horizontal,m.vertical,g,b]),et=i.useCallback(e=>({vertical:H(e,T.vertical),horizontal:O(e,T.horizontal)}),[T.horizontal,T.vertical]),er=i.useCallback(e=>{let t={width:e.offsetWidth,height:e.offsetHeight},r=et(t);if("none"===b)return{top:null,left:null,transformOrigin:V(r)};let n=ee(),o=n.top-r.vertical,i=n.left-r.horizontal,l=o+t.height,a=i+t.width,s=(0,j.Z)(B(h)),u=s.innerHeight-M,c=s.innerWidth-M;if(o<M){let e=o-M;o-=e,r.vertical+=e}else if(l>u){let e=l-u;o-=e,r.vertical+=e}if(i<M){let e=i-M;i-=e,r.horizontal+=e}else if(a>c){let e=a-c;i-=e,r.horizontal+=e}return{top:`${Math.round(o)}px`,left:`${Math.round(i)}px`,transformOrigin:V(r)}},[h,b,ee,et,M]),[en,eo]=i.useState(R),ei=i.useCallback(()=>{let e=Y.current;if(!e)return;let t=er(e);null!==t.top&&(e.style.top=t.top),null!==t.left&&(e.style.left=t.left),e.style.transformOrigin=t.transformOrigin,eo(!0)},[er]);i.useEffect(()=>{R&&ei()}),i.useImperativeHandle(f,()=>R?{updatePosition:()=>{ei()}}:null,[R,ei]),i.useEffect(()=>{if(!R)return;let e=(0,D.Z)(()=>{ei()}),t=(0,j.Z)(h);return t.addEventListener("resize",e),()=>{e.clear(),t.removeEventListener("resize",e)}},[h,R,ei]);let el=L;"auto"!==L||z.muiSupportAuto||(el=void 0);let ea=x||(h?(0,u.Z)(B(h)).body:void 0),es=null!=(a=null==w?void 0:w.root)?a:W,eu=null!=(c=null==w?void 0:w.paper)?c:_,ec=(0,s.Z)({elementType:eu,externalSlotProps:(0,n.Z)({},X,{style:en?X.style:(0,n.Z)({},X.style,{opacity:0})}),additionalProps:{elevation:E,ref:G},ownerState:J,className:(0,l.Z)(Q.paper,null==X?void 0:X.className)}),ep=(0,s.Z)({elementType:es,externalSlotProps:(null==k?void 0:k.root)||{},externalForwardedProps:q,additionalProps:{ref:t,slotProps:{backdrop:{invisible:!0}},container:ea,open:R},ownerState:J,className:(0,l.Z)(Q.root,y)}),{slotProps:ed}=ep,ef=(0,o.Z)(ep,I);return(0,v.jsx)(es,(0,n.Z)({},ef,!(0,C.Z)(es)&&{slotProps:ed},{children:(0,v.jsx)(z,(0,n.Z)({appear:!0,in:R,onEntering:(e,t)=>{N&&N(e,t),ei()},onExited:()=>{eo(!1)},timeout:el},U,{children:(0,v.jsx)(eu,(0,n.Z)({},ec,{children:Z}))}))}))});var q=r(4957);function X(e){return(0,h.Z)("MuiMenu",e)}(0,f.Z)("MuiMenu",["root","paper","list"]);let Y=["onEntering"],G=["autoFocus","children","className","disableAutoFocusItem","MenuListProps","onClose","open","PaperProps","PopoverClasses","transitionDuration","TransitionProps","variant","slots","slotProps"],J={vertical:"top",horizontal:"right"},Q={vertical:"top",horizontal:"left"},ee=e=>{let{classes:t}=e;return(0,a.Z)({root:["root"],paper:["paper"],list:["list"]},X,t)},et=(0,c.ZP)(U,{shouldForwardProp:e=>(0,c.FO)(e)||"classes"===e,name:"MuiMenu",slot:"Root",overridesResolver:(e,t)=>t.root})({}),er=(0,c.ZP)(_,{name:"MuiMenu",slot:"Paper",overridesResolver:(e,t)=>t.paper})({maxHeight:"calc(100% - 96px)",WebkitOverflowScrolling:"touch"}),en=(0,c.ZP)(T,{name:"MuiMenu",slot:"List",overridesResolver:(e,t)=>t.list})({outline:0}),eo=i.forwardRef(function(e,t){var r,a;let u=(0,p.Z)({props:e,name:"MuiMenu"}),{autoFocus:c=!0,children:d,className:f,disableAutoFocusItem:h=!1,MenuListProps:m={},onClose:g,open:b,PaperProps:Z={},PopoverClasses:y,transitionDuration:x="auto",TransitionProps:{onEntering:P}={},variant:E="selectedMenu",slots:M={},slotProps:R={}}=u,S=(0,o.Z)(u.TransitionProps,Y),w=(0,o.Z)(u,G),k=(0,q.Z)(),T="rtl"===k.direction,C=(0,n.Z)({},u,{autoFocus:c,disableAutoFocusItem:h,MenuListProps:m,onEntering:P,PaperProps:Z,transitionDuration:x,TransitionProps:S,variant:E}),D=ee(C),j=c&&!h&&b,F=i.useRef(null),z=-1;i.Children.map(d,(e,t)=>{i.isValidElement(e)&&(e.props.disabled||("selectedMenu"===E&&e.props.selected?z=t:-1!==z||(z=t)))});let L=null!=(r=M.paper)?r:er,N=null!=(a=R.paper)?a:Z,A=(0,s.Z)({elementType:M.root,externalSlotProps:R.root,ownerState:C,className:[D.root,f]}),$=(0,s.Z)({elementType:L,externalSlotProps:N,ownerState:C,className:D.paper});return(0,v.jsx)(et,(0,n.Z)({onClose:g,anchorOrigin:{vertical:"bottom",horizontal:T?"right":"left"},transformOrigin:T?J:Q,slots:{paper:L,root:M.root},slotProps:{root:A,paper:$},open:b,ref:t,transitionDuration:x,TransitionProps:(0,n.Z)({onEntering:(e,t)=>{F.current&&F.current.adjustStyleForScrollbar(e,k),P&&P(e,t)}},S),ownerState:C},w,{classes:y,children:(0,v.jsx)(en,(0,n.Z)({onKeyDown:e=>{"Tab"===e.key&&(e.preventDefault(),g&&g(e,"tabKeyDown"))},actions:F,autoFocus:c&&(-1===z||h),autoFocusItem:j,variant:E},m,{className:(0,l.Z)(D.list,m.className),children:d}))}))});var ei=eo},4311:function(e,t){Symbol.for("react.element"),Symbol.for("react.portal"),Symbol.for("react.fragment"),Symbol.for("react.strict_mode"),Symbol.for("react.profiler"),Symbol.for("react.provider"),Symbol.for("react.context"),Symbol.for("react.server_context"),Symbol.for("react.forward_ref"),Symbol.for("react.suspense"),Symbol.for("react.suspense_list"),Symbol.for("react.memo"),Symbol.for("react.lazy"),Symbol.for("react.offscreen"),Symbol.for("react.module.reference")},9814:function(e,t,r){r(4311)}}]);