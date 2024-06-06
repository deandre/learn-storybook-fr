var A=Object.defineProperty;var M=(t,e,r)=>e in t?A(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var v=(t,e,r)=>(M(t,typeof e!="symbol"?e+"":e,r),r);var j=/(%?)(%([sdijo]))/g;function U(t,e){switch(e){case"s":return t;case"d":case"i":return Number(t);case"j":return JSON.stringify(t);case"o":{if(typeof t=="string")return t;const r=JSON.stringify(t);return r==="{}"||r==="[]"||/^\[object .+?\]$/.test(r)?t:r}}}function C(t,...e){if(e.length===0)return t;let r=0,n=t.replace(j,(i,c,u,f)=>{const s=e[r],a=U(s,f);return c?i:(r++,a)});return r<e.length&&(n+=` ${e.slice(r).join(" ")}`),n=n.replace(/%{2,2}/g,"%"),n}var F=2;function G(t){if(!t.stack)return;const e=t.stack.split(`
`);e.splice(1,F),t.stack=e.join(`
`)}var $=class extends Error{constructor(t,...e){super(t),this.message=t,this.name="Invariant Violation",this.message=C(t,...e),G(this)}},b=(t,e,...r)=>{if(!t)throw new $(e,...r)};b.as=(t,e,r,...n)=>{if(!e){const i=n.length===0?r:C(r,n);let c;try{c=Reflect.construct(t,[i])}catch{c=t(i)}throw c}};const W="[MSW]";function E(t,...e){const r=C(t,...e);return`${W} ${r}`}function D(t,...e){console.warn(E(t,...e))}function T(t,...e){console.error(E(t,...e))}const oe={formatMessage:E,warn:D,error:T};class ie extends Error{constructor(e){super(e),this.name="InternalError"}}var V=class extends Error{constructor(t,e,r){super(`Possible EventEmitter memory leak detected. ${r} ${e.toString()} listeners added. Use emitter.setMaxListeners() to increase limit`),this.emitter=t,this.type=e,this.count=r,this.name="MaxListenersExceededWarning"}},S=class{static listenerCount(t,e){return t.listenerCount(e)}constructor(){this.events=new Map,this.maxListeners=S.defaultMaxListeners,this.hasWarnedAboutPotentialMemoryLeak=!1}_emitInternalEvent(t,e,r){this.emit(t,e,r)}_getListeners(t){return Array.prototype.concat.apply([],this.events.get(t))||[]}_removeListener(t,e){const r=t.indexOf(e);return r>-1&&t.splice(r,1),[]}_wrapOnceListener(t,e){const r=(...n)=>(this.removeListener(t,r),e.apply(this,n));return Object.defineProperty(r,"name",{value:e.name}),r}setMaxListeners(t){return this.maxListeners=t,this}getMaxListeners(){return this.maxListeners}eventNames(){return Array.from(this.events.keys())}emit(t,...e){const r=this._getListeners(t);return r.forEach(n=>{n.apply(this,e)}),r.length>0}addListener(t,e){this._emitInternalEvent("newListener",t,e);const r=this._getListeners(t).concat(e);if(this.events.set(t,r),this.maxListeners>0&&this.listenerCount(t)>this.maxListeners&&!this.hasWarnedAboutPotentialMemoryLeak){this.hasWarnedAboutPotentialMemoryLeak=!0;const n=new V(this,t,this.listenerCount(t));console.warn(n)}return this}on(t,e){return this.addListener(t,e)}once(t,e){return this.addListener(t,this._wrapOnceListener(t,e))}prependListener(t,e){const r=this._getListeners(t);if(r.length>0){const n=[e].concat(r);this.events.set(t,n)}else this.events.set(t,r.concat(e));return this}prependOnceListener(t,e){return this.prependListener(t,this._wrapOnceListener(t,e))}removeListener(t,e){const r=this._getListeners(t);return r.length>0&&(this._removeListener(r,e),this.events.set(t,r),this._emitInternalEvent("removeListener",t,e)),this}off(t,e){return this.removeListener(t,e)}removeAllListeners(t){return t?this.events.delete(t):this.events.clear(),this}listeners(t){return Array.from(this._getListeners(t))}listenerCount(t){return this._getListeners(t).length}rawListeners(t){return this.listeners(t)}},J=S;J.defaultMaxListeners=10;const K=/[\/\\]msw[\/\\]src[\/\\](.+)/,z=/(node_modules)?[\/\\]lib[\/\\](core|browser|node|native|iife)[\/\\]|^[^\/\\]*$/;function Y(t){const e=t.stack;if(!e)return;const n=e.split(`
`).slice(1).find(c=>!(K.test(c)||z.test(c)));return n?n.replace(/\s*at [^()]*\(([^)]+)\)/,"$1").replace(/^@/,""):void 0}function B(t){return t?typeof t[Symbol.iterator]=="function":!1}const L=class L{constructor(e){v(this,"info");v(this,"isUsed");v(this,"resolver");v(this,"resolverGenerator");v(this,"resolverGeneratorResult");v(this,"options");this.resolver=e.resolver,this.options=e.options;const r=Y(new Error);this.info={...e.info,callFrame:r},this.isUsed=!1}async parse(e){return{}}async test(e){const r=await this.parse({request:e.request,resolutionContext:e.resolutionContext});return this.predicate({request:e.request,parsedResult:r,resolutionContext:e.resolutionContext})}extendResolverArgs(e){return{}}cloneRequestOrGetFromCache(e){const r=L.cache.get(e);if(typeof r<"u")return r;const n=e.clone();return L.cache.set(e,n),n}async run(e){var o,h;if(this.isUsed&&((o=this.options)!=null&&o.once))return null;const r=this.cloneRequestOrGetFromCache(e.request),n=await this.parse({request:e.request,resolutionContext:e.resolutionContext});if(!this.predicate({request:e.request,parsedResult:n,resolutionContext:e.resolutionContext})||this.isUsed&&((h=this.options)!=null&&h.once))return null;this.isUsed=!0;const c=this.wrapResolver(this.resolver),u=this.extendResolverArgs({request:e.request,parsedResult:n}),s=await c({...u,requestId:e.requestId,request:e.request}).catch(l=>{if(l instanceof Response)return l;throw l});return this.createExecutionResult({request:r,requestId:e.requestId,response:s,parsedResult:n})}wrapResolver(e){return async r=>{const n=this.resolverGenerator||await e(r);if(B(n)){this.isUsed=!1;const{value:i,done:c}=n[Symbol.iterator]().next(),u=await i;return c&&(this.isUsed=!0),!u&&c?(b(this.resolverGeneratorResult,"Failed to returned a previously stored generator response: the value is not a valid Response."),this.resolverGeneratorResult.clone()):(this.resolverGenerator||(this.resolverGenerator=n),u&&(this.resolverGeneratorResult=u==null?void 0:u.clone()),u)}return n}}createExecutionResult(e){return{handler:this,request:e.request,requestId:e.requestId,response:e.response,parsedResult:e.parsedResult}}};v(L,"cache",new WeakMap);let R=L;function ae(t){if(typeof location>"u")return t.toString();const e=t instanceof URL?t:new URL(t);return e.origin===location.origin?e.pathname:e.origin+e.pathname}var X=Object.create,P=Object.defineProperty,N=Object.getOwnPropertyDescriptor,q=Object.getOwnPropertyNames,Q=Object.getPrototypeOf,Z=Object.prototype.hasOwnProperty,H=(t,e)=>function(){return e||(0,t[q(t)[0]])((e={exports:{}}).exports,e),e.exports},ee=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of q(e))!Z.call(t,i)&&i!==r&&P(t,i,{get:()=>e[i],enumerable:!(n=N(e,i))||n.enumerable});return t},te=(t,e,r)=>(r=t!=null?X(Q(t)):{},ee(e||!t||!t.__esModule?P(r,"default",{value:t,enumerable:!0}):r,t)),re=H({"node_modules/set-cookie-parser/lib/set-cookie.js"(t,e){var r={decodeValues:!0,map:!1,silent:!1};function n(s){return typeof s=="string"&&!!s.trim()}function i(s,a){var o=s.split(";").filter(n),h=o.shift(),l=c(h),m=l.name,d=l.value;a=a?Object.assign({},r,a):r;try{d=a.decodeValues?decodeURIComponent(d):d}catch(g){console.error("set-cookie-parser encountered an error while decoding a cookie with value '"+d+"'. Set options.decodeValues to false to disable this feature.",g)}var p={name:m,value:d};return o.forEach(function(g){var _=g.split("="),y=_.shift().trimLeft().toLowerCase(),x=_.join("=");y==="expires"?p.expires=new Date(x):y==="max-age"?p.maxAge=parseInt(x,10):y==="secure"?p.secure=!0:y==="httponly"?p.httpOnly=!0:y==="samesite"?p.sameSite=x:p[y]=x}),p}function c(s){var a="",o="",h=s.split("=");return h.length>1?(a=h.shift(),o=h.join("=")):o=s,{name:a,value:o}}function u(s,a){if(a=a?Object.assign({},r,a):r,!s)return a.map?{}:[];if(s.headers)if(typeof s.headers.getSetCookie=="function")s=s.headers.getSetCookie();else if(s.headers["set-cookie"])s=s.headers["set-cookie"];else{var o=s.headers[Object.keys(s.headers).find(function(l){return l.toLowerCase()==="set-cookie"})];!o&&s.headers.cookie&&!a.silent&&console.warn("Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."),s=o}if(Array.isArray(s)||(s=[s]),a=a?Object.assign({},r,a):r,a.map){var h={};return s.filter(n).reduce(function(l,m){var d=i(m,a);return l[d.name]=d,l},h)}else return s.filter(n).map(function(l){return i(l,a)})}function f(s){if(Array.isArray(s))return s;if(typeof s!="string")return[];var a=[],o=0,h,l,m,d,p;function g(){for(;o<s.length&&/\s/.test(s.charAt(o));)o+=1;return o<s.length}function _(){return l=s.charAt(o),l!=="="&&l!==";"&&l!==","}for(;o<s.length;){for(h=o,p=!1;g();)if(l=s.charAt(o),l===","){for(m=o,o+=1,g(),d=o;o<s.length&&_();)o+=1;o<s.length&&s.charAt(o)==="="?(p=!0,o=d,a.push(s.substring(h,m)),h=o):o=m+1}else o+=1;(!p||o>=s.length)&&a.push(s.substring(h,s.length))}return a}e.exports=u,e.exports.parse=u,e.exports.parseString=i,e.exports.splitCookiesString=f}}),k=te(re()),w="MSW_COOKIE_STORE";function I(){try{if(localStorage==null)return!1;const t=w+"_test";return localStorage.setItem(t,"test"),localStorage.getItem(t),localStorage.removeItem(t),!0}catch{return!1}}function O(t,e){try{return t[e],!0}catch{return!1}}var se=class{constructor(){this.store=new Map}add(t,e){if(O(t,"credentials")&&t.credentials==="omit")return;const r=new URL(t.url),n=e.headers.get("set-cookie");if(!n)return;const i=Date.now(),c=(0,k.parse)(n).map(({maxAge:f,...s})=>({...s,expires:f===void 0?s.expires:new Date(i+f*1e3),maxAge:f})),u=this.store.get(r.origin)||new Map;c.forEach(f=>{this.store.set(r.origin,u.set(f.name,f))})}get(t){this.deleteExpiredCookies();const e=new URL(t.url),r=this.store.get(e.origin)||new Map;if(!O(t,"credentials"))return r;switch(t.credentials){case"include":return typeof document>"u"||(0,k.parse)(document.cookie).forEach(i=>{r.set(i.name,i)}),r;case"same-origin":return r;default:return new Map}}getAll(){return this.deleteExpiredCookies(),this.store}deleteAll(t){const e=new URL(t.url);this.store.delete(e.origin)}clear(){this.store.clear()}hydrate(){if(!I())return;const t=localStorage.getItem(w);if(t)try{JSON.parse(t).forEach(([r,n])=>{this.store.set(r,new Map(n.map(([i,{expires:c,...u}])=>[i,c===void 0?u:{...u,expires:new Date(c)}])))})}catch(e){console.warn(`
[virtual-cookie] Failed to parse a stored cookie from the localStorage (key "${w}").

Stored value:
${localStorage.getItem(w)}

Thrown exception:
${e}

Invalid value has been removed from localStorage to prevent subsequent failed parsing attempts.`),localStorage.removeItem(w)}}persist(){if(!I())return;const t=Array.from(this.store.entries()).map(([e,r])=>[e,Array.from(r.entries())]);localStorage.setItem(w,JSON.stringify(t))}deleteExpiredCookies(){const t=Date.now();this.store.forEach((e,r)=>{e.forEach(({expires:n,name:i})=>{n!==void 0&&n.getTime()<=t&&e.delete(i)}),e.size===0&&this.store.delete(r)})}},ce=new se;export{J as E,ie as I,R,oe as d,b as i,ce as s,ae as t};
