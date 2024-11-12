(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[626],{87035:(e,t,s)=>{Promise.resolve().then(s.bind(s,71193))},16463:(e,t,s)=>{"use strict";s.r(t);var a=s(71169),o={};for(let e in a)"default"!==e&&(o[e]=()=>a[e]);s.d(t,o)},71193:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>h});var a=s(57437),o=s(97831),n=s(62121),r=s(8284),i=s(67671),l=s(2265),c=s(16463);function h(){let[e,t]=l.useState(!1),[s,h]=l.useState(""),[u,d]=l.useState(""),[m,g]=l.useState(null),p=(0,c.useRouter)(),f=e=>e.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i),w=l.useMemo(()=>!!m&&(!s||!f(s)),[s,m]),y=l.useMemo(()=>!!m,[m]),k=async()=>{try{g(null),await i.Z.login(s,u),window.location.href="/recipes"}catch(e){e instanceof Error?g(e.message):g("An unexpected error occurred")}};return(0,a.jsxs)("div",{children:[(0,a.jsx)(n.Y,{label:"Email",type:"email",placeholder:"Enter your name",value:s,variant:"bordered",isInvalid:w,color:w?"danger":"default",onValueChange:h}),(0,a.jsx)(n.Y,{label:"Password",type:e?"text":"password",placeholder:"Enter your password",value:u,variant:"bordered",onValueChange:d,isInvalid:y,color:y?"danger":"default",endContent:(0,a.jsx)(r.A,{isIconOnly:!0,onClick:()=>t(!e),children:(0,a.jsx)(o.Z,{name:"search"})})}),(0,a.jsxs)("div",{className:"flex flex-row",children:[(0,a.jsx)("div",{children:"New Here?"}),(0,a.jsx)("div",{onClick:()=>{p.push("/register")},children:"Register"})]}),(0,a.jsx)(r.A,{onClick:k,children:"Login"})]})}},97831:(e,t,s)=>{"use strict";s.d(t,{Z:()=>o});var a=s(57437);let o=e=>{let{name:t,className:s="",style:o,size:n}=e;return(0,a.jsx)("span",{className:"material-symbols-rounded ".concat(s),style:{fontSize:n,...o},children:t})}},59331:(e,t,s)=>{"use strict";s.d(t,{Z:()=>o});class a{static getInstance(){return a.instance||(a.instance=new a),a.instance}setUser(e,t,s,a,o,n,r,i){this.user={id:e,username:t,firstName:s,lastName:a,email:o,profileImageUrl:n,uuid:r,token:i},sessionStorage.setItem("user",JSON.stringify(this.user))}getUser(){return this.user}isAuthenticated(){return null!==this.user}clearUser(){this.user=null,sessionStorage.removeItem("user")}constructor(){if(this.user=null,window.sessionStorage){let e=sessionStorage.getItem("user");e&&(this.user=JSON.parse(e))}else console.warn("sessionStorage is not available in this environment.")}}let o=a},67671:(e,t,s)=>{"use strict";s.d(t,{Z:()=>n});var a=s(59331);class o{setToken(e,t){this.token=e;let s=new Date().getTime()+t;sessionStorage.setItem("authToken",e),sessionStorage.setItem("authTokenExpiration",s.toString())}clearToken(){this.token=null,sessionStorage.removeItem("authToken"),sessionStorage.removeItem("authTokenExpiration")}async fetchApi(e){let{method:t="GET",body:s,headers:a={}}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o="".concat(this.baseUrl,"/").concat(e),n=s instanceof FormData,r={method:t,headers:{...a,...this.token?{Authorization:"Bearer ".concat(this.token)}:{},"Content-Type":a["Content-Type"]||"application/json"},body:n?s:s?JSON.stringify(s):void 0},i=await fetch(o,r);if(!i.ok)throw r.body&&console.log(r.body),console.log(await i.text()),Error("Failed to fetch: ".concat(i.json()));return i.json()}async login(e,t){let{token:s,expiresIn:o}=await this.fetchApi("auth/login",{method:"POST",body:{email:e,password:t}});this.setToken(s,o);let n=await this.fetchApi("auth/me",{method:"GET",headers:{Authorization:"Bearer ".concat(s)}});a.Z.getInstance().setUser(n.id,n.username,n.firstName,n.lastName,n.email,n.profileImageUrl,n.uuid,s)}async register(e,t,s,o,n,r,i){if(await this.fetchApi("auth/register",{method:"POST",body:{firstName:n,lastName:r,username:e,password:s,confirmPassword:o,email:t}}),await this.login(t,s),i){let e=new FormData;e.append("profileImage",i),await this.fetchApi("upload-profile-image",{method:"POST",body:e,headers:{"Content-Type":"multipart/form-data"}});let t=await this.fetchApi("auth/me",{method:"GET",headers:{Authorization:"Bearer ".concat(this.token)}});a.Z.getInstance().setUser(t.id,t.username,t.firstName,t.lastName,t.email,t.profileImageUrl,t.uuid,this.token)}}async logout(){try{var e;(null===(e=a.Z.getInstance().getUser())||void 0===e?void 0:e.token)&&await this.fetchApi("auth/logout",{method:"POST"})}catch(e){console.error("Failed to log out on server:",e)}a.Z.getInstance().clearUser(),this.clearToken(),window.location.href="/login"}async get(e,t){return this.fetchApi(e,{method:"GET",headers:t})}async post(e,t,s){return this.fetchApi(e,{method:"POST",body:t,headers:s})}async put(e,t,s){return this.fetchApi(e,{method:"PUT",body:t,headers:s})}async delete(e,t){return this.fetchApi(e,{method:"DELETE",headers:t})}constructor(e){if(this.token=null,!e)throw Error("API base URL is not defined.");this.baseUrl=e;{let e=sessionStorage.getItem("authToken"),t=sessionStorage.getItem("authTokenExpiration");e&&t&&new Date().getTime()<Number(t)?this.token=e:this.clearToken()}}}let n=new o("https://localhost/apiProd/api")}},e=>{var t=t=>e(e.s=t);e.O(0,[284,121,130,268,744],()=>t(87035)),_N_E=e.O()}]);