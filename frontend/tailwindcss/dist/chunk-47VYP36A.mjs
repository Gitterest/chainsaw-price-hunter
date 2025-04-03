function W(r){if(arguments.length===0)throw new TypeError("`CSS.escape` requires an argument.");let e=String(r),s=e.length,n=-1,t,l="",o=e.charCodeAt(0);if(s===1&&o===45)return"\\"+e;for(;++n<s;){if(t=e.charCodeAt(n),t===0){l+="\uFFFD";continue}if(t>=1&&t<=31||t===127||n===0&&t>=48&&t<=57||n===1&&t>=48&&t<=57&&o===45){l+="\\"+t.toString(16)+" ";continue}if(t>=128||t===45||t===95||t>=48&&t<=57||t>=65&&t<=90||t>=97&&t<=122){l+=e.charAt(n);continue}l+="\\"+e.charAt(n)}return l}function O(r){return r.replace(/\\([\dA-Fa-f]{1,6}[\t\n\f\r ]?|[\S\s])/g,e=>e.length>2?String.fromCodePoint(Number.parseInt(e.slice(1).trim(),16)):e[1])}var F=new Map([["--font",["--font-weight","--font-size"]],["--inset",["--inset-shadow","--inset-ring"]],["--text",["--text-color","--text-underline-offset","--text-indent","--text-decoration-thickness","--text-decoration-color"]]]);function D(r,e){return(F.get(e)??[]).some(s=>r===s||r.startsWith(`${s}-`))}var P=class{constructor(e=new Map,s=new Set([])){this.values=e;this.keyframes=s}prefix=null;add(e,s,n=0){if(e.endsWith("-*")){if(s!=="initial")throw new Error(`Invalid theme value \`${s}\` for namespace \`${e}\``);e==="--*"?this.values.clear():this.clearNamespace(e.slice(0,-2),0)}if(n&4){let t=this.values.get(e);if(t&&!(t.options&4))return}s==="initial"?this.values.delete(e):this.values.set(e,{value:s,options:n})}keysInNamespaces(e){let s=[];for(let n of e){let t=`${n}-`;for(let l of this.values.keys())l.startsWith(t)&&l.indexOf("--",2)===-1&&(D(l,n)||s.push(l.slice(t.length)))}return s}get(e){for(let s of e){let n=this.values.get(s);if(n)return n.value}return null}hasDefault(e){return(this.getOptions(e)&4)===4}getOptions(e){return e=O(this.#r(e)),this.values.get(e)?.options??0}entries(){return this.prefix?Array.from(this.values,e=>(e[0]=this.prefixKey(e[0]),e)):this.values.entries()}prefixKey(e){return this.prefix?`--${this.prefix}-${e.slice(2)}`:e}#r(e){return this.prefix?`--${e.slice(3+this.prefix.length)}`:e}clearNamespace(e,s){let n=F.get(e)??[];e:for(let t of this.values.keys())if(t.startsWith(e)){if(s!==0&&(this.getOptions(t)&s)!==s)continue;for(let l of n)if(t.startsWith(l))continue e;this.values.delete(t)}}#e(e,s){for(let n of s){let t=e!==null?`${n}-${e}`:n;if(!this.values.has(t))if(e!==null&&e.includes(".")){if(t=`${n}-${e.replaceAll(".","_")}`,!this.values.has(t))continue}else continue;if(!D(t,n))return t}return null}#t(e){let s=this.values.get(e);if(!s)return null;let n=null;return s.options&2&&(n=s.value),`var(${W(this.prefixKey(e))}${n?`, ${n}`:""})`}markUsedVariable(e){let s=O(this.#r(e)),n=this.values.get(s);if(!n)return!1;let t=n.options&16;return n.options|=16,!t}resolve(e,s,n=0){let t=this.#e(e,s);if(!t)return null;let l=this.values.get(t);return(n|l.options)&1?l.value:this.#t(t)}resolveValue(e,s){let n=this.#e(e,s);return n?this.values.get(n).value:null}resolveWith(e,s,n=[]){let t=this.#e(e,s);if(!t)return null;let l={};for(let f of n){let a=`${t}${f}`,u=this.values.get(a);u&&(u.options&1?l[f]=u.value:l[f]=this.#t(a))}let o=this.values.get(t);return o.options&1?[o.value,l]:[this.#t(t),l]}namespace(e){let s=new Map,n=`${e}-`;for(let[t,l]of this.values)t===e?s.set(null,l.value):t.startsWith(`${n}-`)?s.set(t.slice(e.length),l.value):t.startsWith(n)&&s.set(t.slice(n.length),l.value);return s}addKeyframes(e){this.keyframes.add(e)}getKeyframes(){return Array.from(this.keyframes)}};var N=class extends Map{constructor(s){super();this.factory=s}get(s){let n=super.get(s);return n===void 0&&(n=this.factory(s,this),this.set(s,n)),n}};function $(r){return{kind:"word",value:r}}function ae(r,e){return{kind:"function",value:r,nodes:e}}function ue(r){return{kind:"separator",value:r}}function S(r,e,s=null){for(let n=0;n<r.length;n++){let t=r[n],l=!1,o=0,f=e(t,{parent:s,replaceWith(a){l||(l=!0,Array.isArray(a)?a.length===0?(r.splice(n,1),o=0):a.length===1?(r[n]=a[0],o=1):(r.splice(n,1,...a),o=a.length):r[n]=a)}})??0;if(l){f===0?n--:n+=o-1;continue}if(f===2)return 2;if(f!==1&&t.kind==="function"&&S(t.nodes,e,t)===2)return 2}}function fe(r){let e="";for(let s of r)switch(s.kind){case"word":case"separator":{e+=s.value;break}case"function":e+=s.value+"("+fe(s.nodes)+")"}return e}var _=92,ce=41,M=58,B=44,de=34,H=61,G=62,Q=60,j=10,he=40,pe=39,z=47,Y=32,q=9;function X(r){r=r.replaceAll(`\r
`,`
`);let e=[],s=[],n=null,t="",l;for(let o=0;o<r.length;o++){let f=r.charCodeAt(o);switch(f){case _:{t+=r[o]+r[o+1],o++;break}case M:case B:case H:case G:case Q:case j:case z:case Y:case q:{if(t.length>0){let c=$(t);n?n.nodes.push(c):e.push(c),t=""}let a=o,u=o+1;for(;u<r.length&&(l=r.charCodeAt(u),!(l!==M&&l!==B&&l!==H&&l!==G&&l!==Q&&l!==j&&l!==z&&l!==Y&&l!==q));u++);o=u-1;let i=ue(r.slice(a,u));n?n.nodes.push(i):e.push(i);break}case pe:case de:{let a=o;for(let u=o+1;u<r.length;u++)if(l=r.charCodeAt(u),l===_)u+=1;else if(l===f){o=u;break}t+=r.slice(a,o+1);break}case he:{let a=ae(t,[]);t="",n?n.nodes.push(a):e.push(a),s.push(a),n=a;break}case ce:{let a=s.pop();if(t.length>0){let u=$(t);a.nodes.push(u),t=""}s.length>0?n=s[s.length-1]:n=null;break}default:t+=String.fromCharCode(f)}}return t.length>0&&e.push($(t)),e}function J(r){let e=[];return S(X(r),s=>{if(!(s.kind!=="function"||s.value!=="var"))return S(s.nodes,n=>{n.kind!=="word"||n.value[0]!=="-"||n.value[1]!=="-"||e.push(n.value)}),1}),e}var me=64;function Ae(r,e=[]){return{kind:"rule",selector:r,nodes:e}}function V(r,e="",s=[]){return{kind:"at-rule",name:r,params:e,nodes:s}}function te(r,e=[]){return r.charCodeAt(0)===me?k(r,e):Ae(r,e)}function re(r,e,s=!1){return{kind:"declaration",property:r,value:e,important:s}}function ne(r){return{kind:"comment",value:r}}function De(r,e){return{kind:"context",context:r,nodes:e}}function Pe(r){return{kind:"at-root",nodes:r}}function w(r,e,s=[],n={}){for(let t=0;t<r.length;t++){let l=r[t],o=s[s.length-1]??null;if(l.kind==="context"){if(w(l.nodes,e,s,{...n,...l.context})===2)return 2;continue}s.push(l);let f=!1,a=0,u=e(l,{parent:o,context:n,path:s,replaceWith(i){f||(f=!0,Array.isArray(i)?i.length===0?(r.splice(t,1),a=0):i.length===1?(r[t]=i[0],a=1):(r.splice(t,1,...i),a=i.length):(r[t]=i,a=1))}})??0;if(s.pop(),f){u===0?t--:t+=a-1;continue}if(u===2)return 2;if(u!==1&&"nodes"in l){s.push(l);let i=w(l.nodes,e,s,n);if(s.pop(),i===2)return 2}}}function Z(r,e,s=[],n={}){for(let t=0;t<r.length;t++){let l=r[t],o=s[s.length-1]??null;if(l.kind==="rule"||l.kind==="at-rule")s.push(l),Z(l.nodes,e,s,n),s.pop();else if(l.kind==="context"){Z(l.nodes,e,s,{...n,...l.context});continue}s.push(l),e(l,{parent:o,context:n,path:s,replaceWith(f){Array.isArray(f)?f.length===0?r.splice(t,1):f.length===1?r[t]=f[0]:r.splice(t,1,...f):r[t]=f,t+=f.length-1}}),s.pop()}}function Fe(r,e){let s=[],n=new Set,t=new N(()=>new Set),l=new Set,o=new Set,f=new N(()=>new Set);function a(i,c,h={},g=0){if(i.kind==="declaration"){if(i.property==="--tw-sort"||i.value===void 0||i.value===null)return;if(h.theme&&i.property[0]==="-"&&i.property[1]==="-"){if(i.value==="initial"){i.value=void 0;return}h.keyframes||t.get(c).add(i)}if(i.value.includes("var("))if(h.theme&&i.property[0]==="-"&&i.property[1]==="-")for(let p of J(i.value))f.get(p).add(i.property);else e.trackUsedVariables(i.value);if(i.property==="animation")for(let p of ee(i.value))o.add(p);c.push(i)}else if(i.kind==="rule")if(i.selector==="&")for(let p of i.nodes){let d=[];a(p,d,h,g+1),d.length>0&&c.push(...d)}else{let p={...i,nodes:[]};for(let d of i.nodes)a(d,p.nodes,h,g+1);p.nodes.length>0&&c.push(p)}else if(i.kind==="at-rule"&&i.name==="@property"&&g===0){if(n.has(i.params))return;n.add(i.params);let p={...i,nodes:[]};for(let d of i.nodes)a(d,p.nodes,h,g+1);c.push(p)}else if(i.kind==="at-rule"){i.name==="@keyframes"&&(h={...h,keyframes:!0});let p={...i,nodes:[]};for(let d of i.nodes)a(d,p.nodes,h,g+1);i.name==="@keyframes"&&h.theme&&l.add(p),(p.nodes.length>0||p.name==="@layer"||p.name==="@charset"||p.name==="@custom-media"||p.name==="@namespace"||p.name==="@import")&&c.push(p)}else if(i.kind==="at-root")for(let p of i.nodes){let d=[];a(p,d,h,0);for(let m of d)s.push(m)}else if(i.kind==="context"){if(i.context.reference)return;for(let p of i.nodes)a(p,c,{...h,...i.context},g)}else i.kind==="comment"&&c.push(i)}let u=[];for(let i of r)a(i,u,{},0);e:for(let[i,c]of t)for(let h of c){if(se(h.property,e.theme,f)){if(h.property.startsWith(e.theme.prefixKey("--animate-")))for(let d of ee(h.value))o.add(d);continue}let p=i.indexOf(h);if(i.splice(p,1),i.length===0){let d=xe(u,m=>m.kind==="rule"&&m.nodes===i);if(!d||d.length===0)continue e;d.unshift({kind:"at-root",nodes:u});do{let m=d.pop();if(!m)break;let x=d[d.length-1];if(!x||x.kind!=="at-root"&&x.kind!=="at-rule")break;let I=x.nodes.indexOf(m);if(I===-1)break;x.nodes.splice(I,1)}while(!0);continue e}}for(let i of l)if(!o.has(i.params)){let c=s.indexOf(i);s.splice(c,1)}return u.concat(s)}function _e(r){function e(n,t=0){let l="",o="  ".repeat(t);if(n.kind==="declaration")l+=`${o}${n.property}: ${n.value}${n.important?" !important":""};
`;else if(n.kind==="rule"){l+=`${o}${n.selector} {
`;for(let f of n.nodes)l+=e(f,t+1);l+=`${o}}
`}else if(n.kind==="at-rule"){if(n.nodes.length===0)return`${o}${n.name} ${n.params};
`;l+=`${o}${n.name}${n.params?` ${n.params} `:" "}{
`;for(let f of n.nodes)l+=e(f,t+1);l+=`${o}}
`}else if(n.kind==="comment")l+=`${o}/*${n.value}*/
`;else if(n.kind==="context"||n.kind==="at-root")return"";return l}let s="";for(let n of r){let t=e(n);t!==""&&(s+=t)}return s}function xe(r,e){let s=[];return w(r,(n,{path:t})=>{if(e(n))return s=[...t],2}),s}function se(r,e,s,n=new Set){if(n.has(r)||(n.add(r),e.getOptions(r)&24))return!0;{let l=s.get(r)??[];for(let o of l)if(se(o,e,s,n))return!0}return!1}function ee(r){return r.split(/[\s,]+/)}var y=92,C=47,E=42,Ne=34,ke=39,ye=58,R=59,A=10,v=32,T=9,le=123,b=125,U=40,ie=41,ve=91,Se=93,oe=45,K=64,Ce=33;function He(r){r[0]==="\uFEFF"&&(r=r.slice(1)),r=r.replaceAll(`\r
`,`
`);let e=[],s=[],n=[],t=null,l=null,o="",f="",a;for(let u=0;u<r.length;u++){let i=r.charCodeAt(u);if(i===y)o+=r.slice(u,u+2),u+=1;else if(i===C&&r.charCodeAt(u+1)===E){let c=u;for(let g=u+2;g<r.length;g++)if(a=r.charCodeAt(g),a===y)g+=1;else if(a===E&&r.charCodeAt(g+1)===C){u=g+1;break}let h=r.slice(c,u+1);h.charCodeAt(2)===Ce&&s.push(ne(h.slice(2,-2)))}else if(i===ke||i===Ne){let c=u;for(let h=u+1;h<r.length;h++)if(a=r.charCodeAt(h),a===y)h+=1;else if(a===i){u=h;break}else{if(a===R&&r.charCodeAt(h+1)===A)throw new Error(`Unterminated string: ${r.slice(c,h+1)+String.fromCharCode(i)}`);if(a===A)throw new Error(`Unterminated string: ${r.slice(c,h)+String.fromCharCode(i)}`)}o+=r.slice(c,u+1)}else{if((i===v||i===A||i===T)&&(a=r.charCodeAt(u+1))&&(a===v||a===A||a===T))continue;if(i===A){if(o.length===0)continue;a=o.charCodeAt(o.length-1),a!==v&&a!==A&&a!==T&&(o+=" ")}else if(i===oe&&r.charCodeAt(u+1)===oe&&o.length===0){let c="",h=u,g=-1;for(let d=u+2;d<r.length;d++)if(a=r.charCodeAt(d),a===y)d+=1;else if(a===C&&r.charCodeAt(d+1)===E){for(let m=d+2;m<r.length;m++)if(a=r.charCodeAt(m),a===y)m+=1;else if(a===E&&r.charCodeAt(m+1)===C){d=m+1;break}}else if(g===-1&&a===ye)g=o.length+d-h;else if(a===R&&c.length===0){o+=r.slice(h,d),u=d;break}else if(a===U)c+=")";else if(a===ve)c+="]";else if(a===le)c+="}";else if((a===b||r.length-1===d)&&c.length===0){u=d-1,o+=r.slice(h,d);break}else(a===ie||a===Se||a===b)&&c.length>0&&r[d]===c[c.length-1]&&(c=c.slice(0,-1));let p=L(o,g);if(!p)throw new Error("Invalid custom property, expected a value");t?t.nodes.push(p):e.push(p),o=""}else if(i===R&&o.charCodeAt(0)===K)l=k(o),t?t.nodes.push(l):e.push(l),o="",l=null;else if(i===R&&f[f.length-1]!==")"){let c=L(o);if(!c)throw o.length===0?new Error("Unexpected semicolon"):new Error(`Invalid declaration: \`${o.trim()}\``);t?t.nodes.push(c):e.push(c),o=""}else if(i===le&&f[f.length-1]!==")")f+="}",l=te(o.trim()),t&&t.nodes.push(l),n.push(t),t=l,o="",l=null;else if(i===b&&f[f.length-1]!==")"){if(f==="")throw new Error("Missing opening {");if(f=f.slice(0,-1),o.length>0)if(o.charCodeAt(0)===K)l=k(o),t?t.nodes.push(l):e.push(l),o="",l=null;else{let h=o.indexOf(":");if(t){let g=L(o,h);if(!g)throw new Error(`Invalid declaration: \`${o.trim()}\``);t.nodes.push(g)}}let c=n.pop()??null;c===null&&t&&e.push(t),t=c,o="",l=null}else if(i===U)f+=")",o+="(";else if(i===ie){if(f[f.length-1]!==")")throw new Error("Missing opening (");f=f.slice(0,-1),o+=")"}else{if(o.length===0&&(i===v||i===A||i===T))continue;o+=String.fromCharCode(i)}}}if(o.charCodeAt(0)===K&&e.push(k(o)),f.length>0&&t){if(t.kind==="rule")throw new Error(`Missing closing } at ${t.selector}`);if(t.kind==="at-rule")throw new Error(`Missing closing } at ${t.name} ${t.params}`)}return s.length>0?s.concat(e):e}function k(r,e=[]){for(let s=5;s<r.length;s++){let n=r.charCodeAt(s);if(n===v||n===U){let t=r.slice(0,s).trim(),l=r.slice(s).trim();return V(t,l,e)}}return V(r.trim(),"",e)}function L(r,e=r.indexOf(":")){if(e===-1)return null;let s=r.indexOf("!important",e+1);return re(r.slice(0,e).trim(),r.slice(e+1,s===-1?r.length:s).trim(),s!==-1)}export{He as a,W as b,O as c,P as d,N as e,S as f,fe as g,X as h,J as i,Ae as j,V as k,te as l,re as m,ne as n,De as o,Pe as p,w as q,Z as r,Fe as s,_e as t};
