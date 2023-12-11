(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[204],{3616:function(e,r,a){Promise.resolve().then(a.bind(a,4732))},482:function(e,r,a){"use strict";var s=a(9268);r.Z=function(e){let{message:r,color:a}=e;return(0,s.jsx)("p",{className:"".concat(a||"text-red-600"),children:r})}},6651:function(e,r,a){"use strict";var s=a(6006);r.Z=function(){let[e,r]=(0,s.useState)(!1),[a,t]=(0,s.useState)(null);return(0,s.useEffect)(()=>{let e=localStorage.getItem("token"),a=!!e;r(a),t(e)},[]),[e,a]}},3491:function(e,r,a){"use strict";var s=a(9268);a(6006),r.Z=function(e){return(0,s.jsx)("img",{src:"https://drive.google.com/uc?export=view&id=10ROLMv8jcIpmnLJlKC0vZ0ubQVsGHhTz",width:e.width||40,height:e.height||40,alt:"WFG_LOGO"})}},4732:function(e,r,a){"use strict";a.r(r),a.d(r,{default:function(){return w}});var s=a(9268),t=a(6006),i=a(856),o=a.n(i),d=a(5846),l=a.n(d),n=a(6651),c=a(3491),u=a(6008),m=a(9700),g=a(6628),b=a(6732),x=a(482),f=a(353);let h=f.Ry({firstName:f.Z_().required("Firstname is required"),lastName:f.Z_().required("Lastname is required"),phoneNo:f.Z_().matches(/^[6-9]\d{9}$/,{message:"Please enter valid number.",excludeEmptyString:!1}).required("Phone No is required"),email:f.Z_().email("Please enter a valie email Id").required("Email is required"),password:f.Z_().min(8,"Password shoule have minimum 8 characters"),cpassword:f.Z_().oneOf([f.iH("password")],"Your passwords do not match."),checked:f.O7()}).required();var y=a(4864),p=a(5499),k=function(){let{register:e,handleSubmit:r,formState:{errors:a},watch:i}=(0,m.cI)({resolver:(0,b.X)(h)}),d=i("checked"),f=(0,u.useRouter)(),[k,w]=(0,t.useState)(!1),[j,N]=(0,n.Z)();(0,t.useEffect)(()=>{j&&(0,u.redirect)("/dashboard")},[j]);let v=(0,g.v9)(e=>e.authorization.registrationLoader),Z=(0,g.v9)(e=>e.authorization.registrationSuccess),L=(0,g.v9)(e=>e.authorization.registrationMessage),C=(0,g.I0)();return(0,t.useEffect)(()=>{console.log(v,Z),k&&!v&&Z&&(o().fire({icon:"success",title:L,showConfirmButton:!1,timer:1500}),w(!1),f.push("/dashboard")),!k||v||Z||(o().fire({icon:"error",title:L,showConfirmButton:!1,timer:1500}),w(!1))},[v,Z]),(0,s.jsx)("div",{children:(0,s.jsx)("section",{className:"bg-gray-50 dark:bg-gray-900",children:(0,s.jsx)("div",{className:"flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0",children:(0,s.jsx)("div",{className:"w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700",children:(0,s.jsxs)("div",{className:"p-6 space-y-4 md:space-y-6 sm:p-8",children:[(0,s.jsxs)("div",{className:"flex gap-3 justify-between",children:[(0,s.jsx)("h1",{className:"text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white",children:"Create an account"}),(0,s.jsx)(c.Z,{})]}),(0,s.jsxs)("form",{className:"space-y-4 md:space-y-6",action:"#",onSubmit:r(e=>{w(!0),C((0,p.K1)(e))}),children:[(0,s.jsxs)("div",{className:"flex gap-3",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Firstname"}),(0,s.jsx)("input",{id:"firstName",className:"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",...e("firstName")}),a&&a.firstName&&(0,s.jsx)(x.Z,{message:a.firstName.message})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Lastname"}),(0,s.jsx)("input",{id:"lastName",className:"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",...e("lastName")}),a&&a.lastName&&(0,s.jsx)(x.Z,{message:a.lastName.message})]})]}),(0,s.jsxs)("div",{className:"flex gap-3",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Your email"}),(0,s.jsx)("input",{id:"email",className:"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:"name@company.com",...e("email")}),a&&a.email&&(0,s.jsx)(x.Z,{message:a.email.message})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Phone No"}),(0,s.jsx)("input",{id:"phoneNo",className:"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",...e("phoneNo")}),a&&a.phoneNo&&(0,s.jsx)(x.Z,{message:a.phoneNo.message})]})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Password"}),(0,s.jsx)("input",{type:"password",id:"password",placeholder:"••••••••",...e("password"),className:"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}),a&&a.password&&(0,s.jsx)(x.Z,{message:a.password.message})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Confirm password"}),(0,s.jsx)("input",{id:"confirm-password",placeholder:"••••••••",...e("cpassword"),className:"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}),a&&a.cpassword&&(0,s.jsx)(x.Z,{message:a.cpassword.message})]}),(0,s.jsxs)("div",{className:"flex items-start",children:[(0,s.jsx)("div",{className:"flex items-center h-5",children:(0,s.jsx)("input",{id:"terms","aria-describedby":"terms",type:"checkbox",...e("checked"),className:"w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"})}),(0,s.jsx)("div",{className:"ml-3 text-sm",children:(0,s.jsxs)("label",{className:"font-light text-gray-500 dark:text-gray-300",children:["I accept the"," ",(0,s.jsx)("a",{className:"font-medium text-primary-600 hover:underline dark:text-primary-500",href:"#",children:"Terms and Conditions"})]})})]}),v?(0,s.jsx)("button",{type:"submit",disabled:!0,className:"w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed",children:(0,s.jsx)(y.Z,{color:"secondary",size:20})}):(0,s.jsx)("button",{type:"submit",disabled:!d,className:"w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed",children:"Create an account"}),(0,s.jsxs)("p",{className:"text-sm font-light text-gray-500 dark:text-gray-400",children:["Already have an account?"," ",(0,s.jsxs)(l(),{href:"/login",className:"font-medium text-blue-700 hover:underline",children:[" ","Login here"]})]})]})]})})})})})};function w(){return(0,s.jsx)(k,{})}},5499:function(e,r,a){"use strict";a.d(r,{ZP:function(){return m},CX:function(){return n},K1:function(){return l}});var s=a(7539),t=a(5953);let i=t.Z.create({baseURL:"https://wfg-kol-backend.onrender.com/",timeout:1e4});async function o(e){let r=await i.post("user/create",e);return r.data&&r.data.success?{success:!0,message:"Registration is successfull"}:{success:!1,message:"Registration is failed"}}async function d(e){let r=await i.post("user/login",e);return r.data&&r.data.success?(localStorage.setItem("token",r.data.data.token),{success:!0,message:"Login is successfull",userdata:r.data.data}):{success:!1,message:"".concat(r.data.message?r.data.message:"Login is failed")}}let l=(0,s.hg)("authorization/registration",async e=>{try{let r=await o(e);return r}catch(e){console.log(e)}}),n=(0,s.hg)("authorization/login",async e=>{try{let r=await d(e);return r}catch(e){console.log(e)}}),c=(0,s.oM)({name:"authorization",initialState:{count:1,registrationLoader:!1,registrationSuccess:!1,registrationMessage:"",loginLoader:!1,userDetail:null,loginMessage:""},reducers:{increment:e=>{e.count+=1}},extraReducers:e=>{e.addCase(l.pending,e=>{e.registrationLoader=!0}),e.addCase(l.fulfilled,(e,r)=>{r.payload&&r.payload.success?(e.registrationSuccess=!0,e.registrationMessage=r.payload.message):r.payload&&(e.registrationSuccess=!1,e.registrationMessage=r.payload.message),e.registrationLoader=!1}),e.addCase(n.pending,e=>{e.loginLoader=!0}),e.addCase(n.fulfilled,(e,r)=>{console.log("jwbefj"),r.payload&&r.payload.success?(e.userDetail=r.payload.userdata,e.loginMessage=r.payload.message):r.payload&&(e.userDetail=null,e.loginMessage=r.payload.message),e.loginLoader=!1})}}),{increment:u}=c.actions;var m=c.reducer}},function(e){e.O(0,[987,412,881,131,6,253,769,744],function(){return e(e.s=3616)}),_N_E=e.O()}]);