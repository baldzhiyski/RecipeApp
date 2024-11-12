(()=>{var e={};e.id=626,e.ids=[626],e.modules={20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},209:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},79348:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},30412:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},55315:e=>{"use strict";e.exports=require("path")},17360:e=>{"use strict";e.exports=require("url")},22215:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>n.a,__next_app__:()=>p,pages:()=>c,routeModule:()=>u,tree:()=>d});var a=r(49442),s=r(10042),o=r(48190),n=r.n(o),i=r(63289),l={};for(let e in i)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>i[e]);r.d(t,l);let d=["",{children:["login",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,28785)),"C:\\Projects\\team-2\\frontend\\src\\app\\login\\page.tsx"]}]},{metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:"/manifest.webmanifest"}}]},{layout:[()=>Promise.resolve().then(r.bind(r,11112)),"C:\\Projects\\team-2\\frontend\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,6042,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,73881))).default(e)],apple:[],openGraph:[],twitter:[],manifest:"/manifest.webmanifest"}}],c=["C:\\Projects\\team-2\\frontend\\src\\app\\login\\page.tsx"],p={require:r,loadChunk:()=>Promise.resolve()},u=new a.AppPageRouteModule({definition:{kind:s.RouteKind.APP_PAGE,page:"/login/page",pathname:"/login",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},84063:(e,t,r)=>{Promise.resolve().then(r.bind(r,28785))},262:(e,t,r)=>{Promise.resolve().then(r.bind(r,52678))},52678:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>p});var a=r(20149),s=r(21822),o=r(57801),n=r(39581),i=r(43688),l=r(63606),d=r.n(l),c=r(4619);function p(){let[e,t]=d().useState(!1),[r,l]=d().useState(""),[p,u]=d().useState(""),[h,m]=d().useState(null),f=(0,c.useRouter)(),g=e=>e.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i),x=d().useMemo(()=>!!h&&(!r||!g(r)),[r,h]),v=d().useMemo(()=>!!h,[h]),y=async()=>{try{m(null),await i.Z.login(r,p),window.location.href="/recipes"}catch(e){e instanceof Error?m(e.message):m("An unexpected error occurred")}};return(0,a.jsxs)("div",{children:[(0,a.jsx)(o.Y,{label:"Email",type:"email",placeholder:"Enter your name",value:r,variant:"bordered",isInvalid:x,color:x?"danger":"default",onValueChange:l}),(0,a.jsx)(o.Y,{label:"Password",type:e?"text":"password",placeholder:"Enter your password",value:p,variant:"bordered",onValueChange:u,isInvalid:v,color:v?"danger":"default",endContent:(0,a.jsx)(n.A,{isIconOnly:!0,onClick:()=>t(!e),children:(0,a.jsx)(s.Z,{name:"search"})})}),(0,a.jsxs)("div",{className:"flex flex-row",children:[(0,a.jsx)("div",{children:"New Here?"}),(0,a.jsx)("div",{onClick:()=>{f.push("/register")},children:"Register"})]}),(0,a.jsx)(n.A,{onClick:y,children:"Login"})]})}},21822:(e,t,r)=>{"use strict";r.d(t,{Z:()=>s});var a=r(20149);let s=({name:e,className:t="",style:r,size:s})=>(0,a.jsx)("span",{className:`material-symbols-rounded ${t}`,style:{fontSize:s,...r},children:e})},43688:(e,t,r)=>{"use strict";r.d(t,{Z:()=>o});var a=r(37624);class s{constructor(e){if(this.token=null,!e)throw Error("API base URL is not defined.");this.baseUrl=e}setToken(e,t){this.token=e;let r=new Date().getTime()+t;sessionStorage.setItem("authToken",e),sessionStorage.setItem("authTokenExpiration",r.toString())}clearToken(){this.token=null,sessionStorage.removeItem("authToken"),sessionStorage.removeItem("authTokenExpiration")}async fetchApi(e,{method:t="GET",body:r,headers:a={}}={}){let s=`${this.baseUrl}/${e}`,o=r instanceof FormData,n={method:t,headers:{...a,...this.token?{Authorization:`Bearer ${this.token}`}:{},"Content-Type":a["Content-Type"]||"application/json"},body:o?r:r?JSON.stringify(r):void 0},i=await fetch(s,n);if(!i.ok)throw n.body&&console.log(n.body),console.log(await i.text()),Error(`Failed to fetch: ${i.json()}`);return i.json()}async login(e,t){let{token:r,expiresIn:s}=await this.fetchApi("auth/login",{method:"POST",body:{email:e,password:t}});this.setToken(r,s);let o=await this.fetchApi("auth/me",{method:"GET",headers:{Authorization:`Bearer ${r}`}});a.Z.getInstance().setUser(o.id,o.username,o.firstName,o.lastName,o.email,o.profileImageUrl,o.uuid,r)}async register(e,t,r,s,o,n,i){if(await this.fetchApi("auth/register",{method:"POST",body:{firstName:o,lastName:n,username:e,password:r,confirmPassword:s,email:t}}),await this.login(t,r),i){let e=new FormData;e.append("profileImage",i),await this.fetchApi("upload-profile-image",{method:"POST",body:e,headers:{"Content-Type":"multipart/form-data"}});let t=await this.fetchApi("auth/me",{method:"GET",headers:{Authorization:`Bearer ${this.token}`}});a.Z.getInstance().setUser(t.id,t.username,t.firstName,t.lastName,t.email,t.profileImageUrl,t.uuid,this.token)}}async logout(){try{a.Z.getInstance().getUser()?.token&&await this.fetchApi("auth/logout",{method:"POST"})}catch(e){console.error("Failed to log out on server:",e)}a.Z.getInstance().clearUser(),this.clearToken()}async get(e,t){return this.fetchApi(e,{method:"GET",headers:t})}async post(e,t,r){return this.fetchApi(e,{method:"POST",body:t,headers:r})}async put(e,t,r){return this.fetchApi(e,{method:"PUT",body:t,headers:r})}async delete(e,t){return this.fetchApi(e,{method:"DELETE",headers:t})}}let o=new s("https://localhost/apiProd/api")},28785:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>a});let a=(0,r(78105).registerClientReference)(function(){throw Error("Attempted to call the default export of \"C:\\\\Projects\\\\team-2\\\\frontend\\\\src\\\\app\\\\login\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"C:\\Projects\\team-2\\frontend\\src\\app\\login\\page.tsx","default")},73881:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});var a=r(15394);let s=async e=>[{type:"image/x-icon",sizes:"16x16",url:(0,a.fillMetadataSegment)(".",await e.params,"favicon.ico")+""}]}};var t=require("../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[492,611,394,703],()=>r(22215));module.exports=a})();