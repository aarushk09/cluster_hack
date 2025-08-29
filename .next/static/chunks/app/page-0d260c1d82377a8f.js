(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{7666:function(e,t,s){Promise.resolve().then(s.bind(s,5685))},5685:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return x}});var r=s(7437),a=s(2265),i={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let o=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),n=(e,t)=>{let s=(0,a.forwardRef)(({color:s="currentColor",size:r=24,strokeWidth:n=2,absoluteStrokeWidth:l,className:c="",children:d,...u},m)=>(0,a.createElement)("svg",{ref:m,...i,width:r,height:r,stroke:s,strokeWidth:l?24*Number(n)/Number(r):n,className:["lucide",`lucide-${o(e)}`,c].join(" "),...u},[...t.map(([e,t])=>(0,a.createElement)(e,t)),...Array.isArray(d)?d:[d]]));return s.displayName=`${e}`,s},l=n("CheckSquare",[["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}],["path",{d:"M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11",key:"1jnkn4"}]]),c=n("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]),d=n("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]),u=n("Flag",[["path",{d:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z",key:"i9b6wo"}],["line",{x1:"4",x2:"4",y1:"22",y2:"15",key:"1cm3nv"}]]),m=n("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]),p=n("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);var f=s(5925);function h(){let[e,t]=(0,a.useState)([]),[s,i]=(0,a.useState)(!1),[o,n]=(0,a.useState)({title:"",description:"",priority:"medium",dueDate:""});(0,a.useEffect)(()=>{let e=localStorage.getItem("tasks");e&&t(JSON.parse(e))},[]),(0,a.useEffect)(()=>{localStorage.setItem("tasks",JSON.stringify(e))},[e]);let h=s=>{t(e.map(e=>e.id===s?{...e,completed:!e.completed}:e))},x=s=>{t(e.filter(e=>e.id!==s)),f.default.success("Task deleted!")},y=e=>{switch(e){case"high":return"text-red-600 bg-red-50 border-red-200";case"medium":return"text-yellow-600 bg-yellow-50 border-yellow-200";case"low":return"text-green-600 bg-green-50 border-green-200"}},g=e.filter(e=>!e.completed),b=e.filter(e=>e.completed);return(0,r.jsxs)("div",{className:"space-y-6",children:[(0,r.jsxs)("div",{className:"flex items-center justify-between",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("h2",{className:"text-3xl font-bold text-gray-900",children:"Tasks"}),(0,r.jsxs)("p",{className:"text-gray-600",children:[g.length," pending • ",b.length," completed"]})]}),(0,r.jsxs)("button",{onClick:()=>i(!0),className:"btn-primary",children:[(0,r.jsx)(c,{size:20}),"Add Task"]})]}),s&&(0,r.jsxs)("div",{className:"card animate-slide-up",children:[(0,r.jsx)("h3",{className:"text-lg font-semibold mb-4",children:"Add New Task"}),(0,r.jsxs)("div",{className:"space-y-4",children:[(0,r.jsx)("input",{type:"text",placeholder:"Task title",value:o.title,onChange:e=>n({...o,title:e.target.value}),className:"input-field"}),(0,r.jsx)("textarea",{placeholder:"Description (optional)",value:o.description,onChange:e=>n({...o,description:e.target.value}),className:"textarea-field h-24"}),(0,r.jsxs)("div",{className:"flex gap-4",children:[(0,r.jsxs)("select",{value:o.priority,onChange:e=>n({...o,priority:e.target.value}),className:"input-field flex-1",children:[(0,r.jsx)("option",{value:"low",children:"Low Priority"}),(0,r.jsx)("option",{value:"medium",children:"Medium Priority"}),(0,r.jsx)("option",{value:"high",children:"High Priority"})]}),(0,r.jsx)("input",{type:"date",value:o.dueDate,onChange:e=>n({...o,dueDate:e.target.value}),className:"input-field flex-1"})]}),(0,r.jsxs)("div",{className:"flex gap-3 justify-end",children:[(0,r.jsx)("button",{onClick:()=>i(!1),className:"btn-secondary",children:"Cancel"}),(0,r.jsx)("button",{onClick:()=>{if(!o.title.trim()){f.default.error("Please enter a task title");return}t([...e,{id:Date.now().toString(),title:o.title,description:o.description,completed:!1,priority:o.priority,dueDate:o.dueDate||void 0,createdAt:new Date().toISOString()}]),n({title:"",description:"",priority:"medium",dueDate:""}),i(!1),f.default.success("Task added successfully!")},className:"btn-primary",children:"Add Task"})]})]})]}),g.length>0&&(0,r.jsxs)("div",{className:"space-y-4",children:[(0,r.jsxs)("h3",{className:"text-xl font-semibold text-gray-900 flex items-center gap-2",children:[(0,r.jsx)(d,{size:20}),"Pending Tasks"]}),(0,r.jsx)("div",{className:"space-y-3",children:g.map(e=>(0,r.jsx)("div",{className:"card hover:shadow-md transition-shadow",children:(0,r.jsxs)("div",{className:"flex items-start gap-4",children:[(0,r.jsx)("button",{onClick:()=>h(e.id),className:"mt-1 w-5 h-5 border-2 border-gray-300 rounded hover:border-primary-500 transition-colors"}),(0,r.jsxs)("div",{className:"flex-1",children:[(0,r.jsx)("h4",{className:"font-medium text-gray-900",children:e.title}),e.description&&(0,r.jsx)("p",{className:"text-gray-600 text-sm mt-1",children:e.description}),(0,r.jsxs)("div",{className:"flex items-center gap-3 mt-2",children:[(0,r.jsxs)("span",{className:"px-2 py-1 rounded text-xs font-medium border ".concat(y(e.priority)),children:[(0,r.jsx)(u,{size:12,className:"inline mr-1"}),e.priority]}),e.dueDate&&(0,r.jsxs)("span",{className:"text-xs text-gray-500",children:["Due: ",new Date(e.dueDate).toLocaleDateString()]})]})]}),(0,r.jsx)("button",{onClick:()=>x(e.id),className:"text-gray-400 hover:text-red-500 transition-colors",children:(0,r.jsx)(m,{size:18})})]})},e.id))})]}),b.length>0&&(0,r.jsxs)("div",{className:"space-y-4",children:[(0,r.jsxs)("h3",{className:"text-xl font-semibold text-gray-900 flex items-center gap-2",children:[(0,r.jsx)(p,{size:20}),"Completed Tasks"]}),(0,r.jsx)("div",{className:"space-y-3",children:b.map(e=>(0,r.jsx)("div",{className:"card opacity-60 hover:opacity-80 transition-opacity",children:(0,r.jsxs)("div",{className:"flex items-start gap-4",children:[(0,r.jsx)("button",{onClick:()=>h(e.id),className:"mt-1 w-5 h-5 bg-green-500 border-2 border-green-500 rounded flex items-center justify-center",children:(0,r.jsx)(p,{size:14,className:"text-white"})}),(0,r.jsxs)("div",{className:"flex-1",children:[(0,r.jsx)("h4",{className:"font-medium text-gray-900 line-through",children:e.title}),e.description&&(0,r.jsx)("p",{className:"text-gray-600 text-sm mt-1 line-through",children:e.description})]}),(0,r.jsx)("button",{onClick:()=>x(e.id),className:"text-gray-400 hover:text-red-500 transition-colors",children:(0,r.jsx)(m,{size:18})})]})},e.id))})]}),0===e.length&&(0,r.jsxs)("div",{className:"text-center py-12",children:[(0,r.jsx)(l,{size:64,className:"mx-auto text-gray-300 mb-4"}),(0,r.jsx)("h3",{className:"text-xl font-medium text-gray-600 mb-2",children:"No tasks yet"}),(0,r.jsx)("p",{className:"text-gray-500 mb-6",children:"Get organized by adding your first task!"}),(0,r.jsxs)("button",{onClick:()=>i(!0),className:"btn-primary",children:[(0,r.jsx)(c,{size:20}),"Add Your First Task"]})]})]})}function x(){return(0,r.jsxs)("div",{className:"min-h-screen bg-gradient-to-br from-slate-50 to-blue-50",children:[(0,r.jsx)("header",{className:"bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50",children:(0,r.jsx)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:(0,r.jsxs)("div",{className:"flex justify-between items-center h-16",children:[(0,r.jsx)("div",{className:"flex items-center gap-3",children:(0,r.jsx)("h1",{className:"text-2xl font-bold bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent",children:"Digital Life Organizer"})}),(0,r.jsx)("div",{className:"text-sm text-gray-600",children:new Date().toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})})]})})}),(0,r.jsx)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",children:(0,r.jsx)("div",{className:"animate-fade-in",children:(0,r.jsx)(h,{})})})]})}},622:function(e,t,s){"use strict";var r=s(2265),a=Symbol.for("react.element"),i=(Symbol.for("react.fragment"),Object.prototype.hasOwnProperty),o=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,n={key:!0,ref:!0,__self:!0,__source:!0};function l(e,t,s){var r,l={},c=null,d=null;for(r in void 0!==s&&(c=""+s),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(d=t.ref),t)i.call(t,r)&&!n.hasOwnProperty(r)&&(l[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps)void 0===l[r]&&(l[r]=t[r]);return{$$typeof:a,type:e,key:c,ref:d,props:l,_owner:o.current}}t.jsx=l,t.jsxs=l},7437:function(e,t,s){"use strict";e.exports=s(622)},5925:function(e,t,s){"use strict";let r,a;s.r(t),s.d(t,{CheckmarkIcon:function(){return K},ErrorIcon:function(){return Y},LoaderIcon:function(){return J},ToastBar:function(){return el},ToastIcon:function(){return es},Toaster:function(){return em},default:function(){return ep},resolveValue:function(){return w},toast:function(){return F},useToaster:function(){return U},useToasterStore:function(){return L}});var i,o=s(2265);let n={data:""},l=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||n,c=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,d=/\/\*[^]*?\*\/|  +/g,u=/\n+/g,m=(e,t)=>{let s="",r="",a="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?s=i+" "+o+";":r+="f"==i[1]?m(o,i):i+"{"+m(o,"k"==i[1]?"":t)+"}":"object"==typeof o?r+=m(o,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=o&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=m.p?m.p(i,o):i+":"+o+";")}return s+(t&&a?t+"{"+a+"}":a)+r},p={},f=e=>{if("object"==typeof e){let t="";for(let s in e)t+=s+f(e[s]);return t}return e},h=(e,t,s,r,a)=>{var i;let o=f(e),n=p[o]||(p[o]=(e=>{let t=0,s=11;for(;t<e.length;)s=101*s+e.charCodeAt(t++)>>>0;return"go"+s})(o));if(!p[n]){let t=o!==e?e:(e=>{let t,s,r=[{}];for(;t=c.exec(e.replace(d,""));)t[4]?r.shift():t[3]?(s=t[3].replace(u," ").trim(),r.unshift(r[0][s]=r[0][s]||{})):r[0][t[1]]=t[2].replace(u," ").trim();return r[0]})(e);p[n]=m(a?{["@keyframes "+n]:t}:t,s?"":"."+n)}let l=s&&p.g?p.g:null;return s&&(p.g=p[n]),i=p[n],l?t.data=t.data.replace(l,i):-1===t.data.indexOf(i)&&(t.data=r?i+t.data:t.data+i),n},x=(e,t,s)=>e.reduce((e,r,a)=>{let i=t[a];if(i&&i.call){let e=i(s),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":m(e,""):!1===e?"":e}return e+r+(null==i?"":i)},"");function y(e){let t=this||{},s=e.call?e(t.p):e;return h(s.unshift?s.raw?x(s,[].slice.call(arguments,1),t.p):s.reduce((e,s)=>Object.assign(e,s&&s.call?s(t.p):s),{}):s,l(t.target),t.g,t.o,t.k)}y.bind({g:1});let g,b,v,j=y.bind({k:1});function k(e,t){let s=this||{};return function(){let r=arguments;function a(i,o){let n=Object.assign({},i),l=n.className||a.className;s.p=Object.assign({theme:b&&b()},n),s.o=/ *go\d+/.test(l),n.className=y.apply(s,r)+(l?" "+l:""),t&&(n.ref=o);let c=e;return e[0]&&(c=n.as||e,delete n.as),v&&c[0]&&v(n),g(c,n)}return t?t(a):a}}var N=e=>"function"==typeof e,w=(e,t)=>N(e)?e(t):e,C=(r=0,()=>(++r).toString()),E=()=>{if(void 0===a&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");a=!e||e.matches}return a},D="default",O=(e,t)=>{let{toastLimit:s}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,s)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return O(e,{type:e.toasts.find(e=>e.id===r.id)?1:0,toast:r});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},z=[],S={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},T={},$=(e,t=D)=>{T[t]=O(T[t]||S,e),z.forEach(([e,s])=>{e===t&&s(T[t])})},_=e=>Object.keys(T).forEach(t=>$(e,t)),I=e=>Object.keys(T).find(t=>T[t].toasts.some(t=>t.id===e)),A=(e=D)=>t=>{$(t,e)},P={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},L=(e={},t=D)=>{let[s,r]=(0,o.useState)(T[t]||S),a=(0,o.useRef)(T[t]);(0,o.useEffect)(()=>(a.current!==T[t]&&r(T[t]),z.push([t,r]),()=>{let e=z.findIndex(([e])=>e===t);e>-1&&z.splice(e,1)}),[t]);let i=s.toasts.map(t=>{var s,r,a;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(s=e[t.type])?void 0:s.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(r=e[t.type])?void 0:r.duration)||(null==e?void 0:e.duration)||P[t.type],style:{...e.style,...null==(a=e[t.type])?void 0:a.style,...t.style}}});return{...s,toasts:i}},M=(e,t="blank",s)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...s,id:(null==s?void 0:s.id)||C()}),R=e=>(t,s)=>{let r=M(t,e,s);return A(r.toasterId||I(r.id))({type:2,toast:r}),r.id},F=(e,t)=>R("blank")(e,t);F.error=R("error"),F.success=R("success"),F.loading=R("loading"),F.custom=R("custom"),F.dismiss=(e,t)=>{let s={type:3,toastId:e};t?A(t)(s):_(s)},F.dismissAll=e=>F.dismiss(void 0,e),F.remove=(e,t)=>{let s={type:4,toastId:e};t?A(t)(s):_(s)},F.removeAll=e=>F.remove(void 0,e),F.promise=(e,t,s)=>{let r=F.loading(t.loading,{...s,...null==s?void 0:s.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?w(t.success,e):void 0;return a?F.success(a,{id:r,...s,...null==s?void 0:s.success}):F.dismiss(r),e}).catch(e=>{let a=t.error?w(t.error,e):void 0;a?F.error(a,{id:r,...s,...null==s?void 0:s.error}):F.dismiss(r)}),e};var H=1e3,U=(e,t="default")=>{let{toasts:s,pausedAt:r}=L(e,t),a=(0,o.useRef)(new Map).current,i=(0,o.useCallback)((e,t=H)=>{if(a.has(e))return;let s=setTimeout(()=>{a.delete(e),n({type:4,toastId:e})},t);a.set(e,s)},[]);(0,o.useEffect)(()=>{if(r)return;let e=Date.now(),a=s.map(s=>{if(s.duration===1/0)return;let r=(s.duration||0)+s.pauseDuration-(e-s.createdAt);if(r<0){s.visible&&F.dismiss(s.id);return}return setTimeout(()=>F.dismiss(s.id,t),r)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[s,r,t]);let n=(0,o.useCallback)(A(t),[t]),l=(0,o.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),c=(0,o.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),d=(0,o.useCallback)(()=>{r&&n({type:6,time:Date.now()})},[r,n]),u=(0,o.useCallback)((e,t)=>{let{reverseOrder:r=!1,gutter:a=8,defaultPosition:i}=t||{},o=s.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=o.findIndex(t=>t.id===e.id),l=o.filter((e,t)=>t<n&&e.visible).length;return o.filter(e=>e.visible).slice(...r?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+a,0)},[s]);return(0,o.useEffect)(()=>{s.forEach(e=>{if(e.dismissed)i(e.id,e.removeDelay);else{let t=a.get(e.id);t&&(clearTimeout(t),a.delete(e.id))}})},[s,i]),{toasts:s,handlers:{updateHeight:c,startPause:l,endPause:d,calculateOffset:u}}},V=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,B=j`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,W=j`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,Y=k("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${V} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${B} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${W} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,q=j`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,J=k("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${q} 1s linear infinite;
`,Z=j`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,G=j`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,K=k("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Z} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${G} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,Q=k("div")`
  position: absolute;
`,X=k("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,ee=j`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,et=k("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${ee} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,es=({toast:e})=>{let{icon:t,type:s,iconTheme:r}=e;return void 0!==t?"string"==typeof t?o.createElement(et,null,t):t:"blank"===s?null:o.createElement(X,null,o.createElement(J,{...r}),"loading"!==s&&o.createElement(Q,null,"error"===s?o.createElement(Y,{...r}):o.createElement(K,{...r})))},er=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ea=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,ei=k("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,eo=k("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,en=(e,t)=>{let s=e.includes("top")?1:-1,[r,a]=E()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[er(s),ea(s)];return{animation:t?`${j(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${j(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},el=o.memo(({toast:e,position:t,style:s,children:r})=>{let a=e.height?en(e.position||t||"top-center",e.visible):{opacity:0},i=o.createElement(es,{toast:e}),n=o.createElement(eo,{...e.ariaProps},w(e.message,e));return o.createElement(ei,{className:e.className,style:{...a,...s,...e.style}},"function"==typeof r?r({icon:i,message:n}):o.createElement(o.Fragment,null,i,n))});i=o.createElement,m.p=void 0,g=i,b=void 0,v=void 0;var ec=({id:e,className:t,style:s,onHeightUpdate:r,children:a})=>{let i=o.useCallback(t=>{if(t){let s=()=>{r(e,t.getBoundingClientRect().height)};s(),new MutationObserver(s).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,r]);return o.createElement("div",{ref:i,className:t,style:s},a)},ed=(e,t)=>{let s=e.includes("top"),r=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:E()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(s?1:-1)}px)`,...s?{top:0}:{bottom:0},...r}},eu=y`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,em=({reverseOrder:e,position:t="top-center",toastOptions:s,gutter:r,children:a,toasterId:i,containerStyle:n,containerClassName:l})=>{let{toasts:c,handlers:d}=U(s,i);return o.createElement("div",{"data-rht-toaster":i||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:l,onMouseEnter:d.startPause,onMouseLeave:d.endPause},c.map(s=>{let i=s.position||t,n=ed(i,d.calculateOffset(s,{reverseOrder:e,gutter:r,defaultPosition:t}));return o.createElement(ec,{id:s.id,key:s.id,onHeightUpdate:d.updateHeight,className:s.visible?eu:"",style:n},"custom"===s.type?w(s.message,s):a?a(s):o.createElement(el,{toast:s,position:i}))}))},ep=F}},function(e){e.O(0,[971,938,744],function(){return e(e.s=7666)}),_N_E=e.O()}]);