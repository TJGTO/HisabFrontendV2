(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[178],{8008:function(e,r,a){Promise.resolve().then(a.bind(a,4932))},6651:function(e,r,a){"use strict";var t=a(6006);r.Z=function(){let[e,r]=(0,t.useState)(void 0),[a,s]=(0,t.useState)(null),[l,d]=(0,t.useState)(null),[i,o]=(0,t.useState)(null);return(0,t.useEffect)(()=>{let e=localStorage.getItem("token"),a=!!e;r(a),s(e),d(localStorage.getItem("fullname")||null),o(localStorage.getItem("email")||null)},[]),[e,a,l,i]}},8059:function(e,r,a){"use strict";a.d(r,{Ip:function(){return l},u_:function(){return i},zP:function(){return o},zl:function(){return d}});var t=a(5326),s=a.n(t);let l=e=>{if(e){var r;return(e.address_line_1+","+(e.address_line_2?e.address_line_2+",":"")+e.city+","+e.pincode+","+(null===(r=e.state)||void 0===r?void 0:r.state_name)).toString()}return""},d=e=>{let r=e.split(" ")[0],a=e.split(" ")[1],t=r.toString().charAt(0).toUpperCase()+a.toString().charAt(0).toUpperCase();return t},i=e=>{let r,a=0;for(r=0;r<e.length;r+=1)a=e.charCodeAt(r)+((a<<5)-a);let t="#";for(r=0;r<3;r+=1){let e=a>>8*r&255;t+="00".concat(e.toString(16)).slice(-2)}return t},o=function(e){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"DD/MM/YYYY",a=s()(e);return a.format(r)}},4932:function(e,r,a){"use strict";a.r(r),a.d(r,{default:function(){return A}});var t=a(9268),s=a(6006),l=a(6651),d=a(8059),i=a(5608),o=a(8173),n=a(3092),c=a(6234),u=a(7288),g=a(9744),m=a(772),b=a(7455),x=a(6008),f=a(5418),p=a(9505),y=a(3470),h=a(583),k=a(1469),v=a(1605),j=a(856),N=a.n(j),w=a(7482),S=a(9376),C=a(3964),_=a(6628),Z=function(e){let{open:r,onClose:a}=e,l=(0,_.v9)(e=>e.profileSection.userProfile),d=(0,_.I0)(),[i,o]=(0,s.useState)(""),[n,c]=(0,s.useState)(""),[u,g]=(0,s.useState)(""),[m,b]=(0,s.useState)(""),[x,f]=(0,s.useState)(""),[p,y]=(0,s.useState)(""),[h,k]=(0,s.useState)(""),[v,j]=(0,s.useState)(""),Z=(0,_.v9)(e=>e.profileSection.updateLoader),P=(0,_.v9)(e=>e.profileSection.updateMessage),D=(0,_.v9)(e=>e.profileSection.errorOnUpdate);(0,s.useEffect)(()=>{l&&(l.academic&&o(l.academic.toString()),l.facebook&&c(l.facebook.toString()),l.instagram&&g(l.instagram.toString()),l.youtube&&b(l.youtube.toString()),l.phone_no&&f(l.phone_no.toString()),l.email&&y(l.email.toString()),l.about&&k(l.about.toString()),l.DOB&&j(l.DOB.toString()))},[l]);let A=()=>{a()};(0,s.useEffect)(()=>{!Z&&P&&N().fire({icon:D?"error":"success",title:P,showConfirmButton:!1,timer:1500})},[Z,P]);let E=e=>{let r={};switch(e){case"academic":r.academic=i;break;case"dob":r.DOB=v;break;case"facebook":r.facebook=n;break;case"instagram":r.instagram=u;break;case"youtube":r.youtube=m;break;case"phone_no":r.phone_no=x;break;case"email":r.email=p;break;case"about":r.about=h}d((0,w.MM)(r))};return(0,t.jsx)(S.Z,{onClose:A,open:r,maxWidth:"md",children:(0,t.jsx)("div",{className:"bg-gray-50 dark:bg-gray-900",children:(0,t.jsx)("div",{className:"flex flex-col items-center justify-center px-6 py-8 mx-auto",children:(0,t.jsxs)("div",{className:"p-6 space-y-4 md:space-y-6 sm:p-8",children:[(0,t.jsxs)("div",{className:"flex gap-3 justify-between",children:[(0,t.jsx)("h1",{className:"text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white",children:"Edit Profile"}),(0,t.jsx)(C.Z,{onClick:A,style:{color:"red",cursor:"pointer"}})]}),(0,t.jsxs)("div",{className:"space-y-4 md:space-y-6",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Academic"}),(0,t.jsxs)("div",{className:"flex gap-3",children:[(0,t.jsx)("div",{className:"flex-1",children:(0,t.jsxs)("select",{id:"question",className:"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",onChange:e=>{o(e.target.value)},value:i,children:[(0,t.jsx)("option",{value:"",children:"Please Select"}),(0,t.jsx)("option",{value:"Working Professional",children:"Working Professional"}),(0,t.jsx)("option",{value:"Student",children:"Student"})]})}),(0,t.jsx)("div",{className:"flex-none",children:(0,t.jsx)("button",{onClick:e=>{e.preventDefault(),E("academic")},disabled:!i,className:"w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed",children:"Add"})})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Date of Birth"}),(0,t.jsxs)("div",{className:"flex gap-3",children:[(0,t.jsx)("div",{className:"flex-1",children:(0,t.jsx)("input",{id:"dob",className:"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",onChange:e=>{j(e.target.value)},type:"date",value:v})}),(0,t.jsx)("div",{className:"flex-none",children:(0,t.jsx)("button",{onClick:e=>{e.preventDefault(),E("dob")},disabled:!v,className:"w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed",children:"Add"})})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Facebook Profile URL"}),(0,t.jsxs)("div",{className:"flex gap-3",children:[(0,t.jsx)("div",{className:"flex-1",children:(0,t.jsx)("input",{id:"facebokkURL",className:"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",onChange:e=>{c(e.target.value)},value:n})}),(0,t.jsx)("div",{className:"flex-none",children:(0,t.jsx)("button",{onClick:e=>{e.preventDefault(),E("facebook")},disabled:!n,className:"w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed",children:"Add"})})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Insta ID"}),(0,t.jsxs)("div",{className:"flex gap-3",children:[(0,t.jsx)("div",{className:"flex-1",children:(0,t.jsx)("input",{id:"instaID",className:"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",onChange:e=>{g(e.target.value)},value:u})}),(0,t.jsx)("div",{className:"flex-none",children:(0,t.jsx)("button",{onClick:e=>{e.preventDefault(),E("instagram")},disabled:!u,className:"w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed",children:"Add"})})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Youtube"}),(0,t.jsxs)("div",{className:"flex gap-3",children:[(0,t.jsx)("div",{className:"flex-1",children:(0,t.jsx)("input",{id:"youtube",className:"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",onChange:e=>{b(e.target.value)},value:m})}),(0,t.jsx)("div",{className:"flex-none",children:(0,t.jsx)("button",{onClick:e=>{e.preventDefault(),E("youtube")},disabled:!m,className:"w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed",children:"Add"})})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Email Id"}),(0,t.jsxs)("div",{className:"flex gap-3",children:[(0,t.jsx)("div",{className:"flex-1",children:(0,t.jsx)("input",{id:"email",className:"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",onChange:e=>{y(e.target.value)},value:p})}),(0,t.jsx)("div",{className:"flex-none",children:(0,t.jsx)("button",{onClick:e=>{e.preventDefault(),E("email")},disabled:!p,className:"w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed",children:"Add"})})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Phone No"}),(0,t.jsxs)("div",{className:"flex gap-3",children:[(0,t.jsx)("div",{className:"flex-1",children:(0,t.jsx)("input",{id:"phone",className:"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",onChange:e=>{f(e.target.value)},value:x})}),(0,t.jsx)("div",{className:"flex-none",children:(0,t.jsx)("button",{onClick:e=>{e.preventDefault(),E("phone_no")},disabled:!x,className:"w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed",children:"Add"})})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"About Yourself"}),(0,t.jsxs)("div",{className:"flex gap-3",children:[(0,t.jsx)("div",{className:"flex-1",children:(0,t.jsx)("input",{id:"about",className:"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",onChange:e=>{k(e.target.value)},value:h})}),(0,t.jsx)("div",{className:"flex-none",children:(0,t.jsx)("button",{onClick:e=>{e.preventDefault(),E("about")},disabled:!h,className:"w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed",children:"Add"})})]})]})]})]})})})})},P=function(e){let{open:r,onClose:a}=e,l=(0,_.v9)(e=>e.profileSection.userProfile),d=(0,_.I0)(),[i,o]=(0,s.useState)(""),[n,c]=(0,s.useState)(""),[u,g]=(0,s.useState)(""),[m,b]=(0,s.useState)(""),[x,f]=(0,s.useState)(""),[p,y]=(0,s.useState)(""),[h,k]=(0,s.useState)(""),v=(0,_.v9)(e=>e.profileSection.states),j=(0,_.v9)(e=>e.profileSection.updateLoader),Z=(0,_.v9)(e=>e.profileSection.updateMessage),P=(0,_.v9)(e=>e.profileSection.errorOnUpdate);(0,s.useEffect)(()=>{if(l){var e,r,a,t,s,d;l.firstName&&o(l.firstName.toString()),l.lastName&&c(l.lastName.toString()),(null===(e=l.address)||void 0===e?void 0:e.address_line_1)&&g(l.address.address_line_1.toString()),(null===(r=l.address)||void 0===r?void 0:r.address_line_2)&&b(l.address.address_line_2.toString()),(null===(a=l.address)||void 0===a?void 0:a.pincode)&&f(l.address.pincode.toString()),(null===(t=l.address)||void 0===t?void 0:t.city)&&y(l.address.city.toString()),(null===(s=l.address)||void 0===s?void 0:s.state)&&k(null===(d=l.address)||void 0===d?void 0:d.state.state_id.toString())}},[l]);let D=()=>{a()};(0,s.useEffect)(()=>{!j&&Z&&(P||D(),N().fire({icon:P?"error":"success",title:Z,showConfirmButton:!1,timer:1500}))},[j,Z]);let A=()=>{var e;if(!h){N().fire({icon:"error",title:"Please select a state",showConfirmButton:!1,timer:1500});return}let r={};r.firstName=i,r.lastName=n,r.address={address_line_1:u,address_line_2:m,pincode:x,city:p,state:{state_id:h,state_name:(null===(e=null==v?void 0:v.find(e=>e._id==h))||void 0===e?void 0:e.stateName)||""}},r.isAddress=!0,d((0,w.MM)(r))};return(0,t.jsx)(S.Z,{onClose:D,open:r,maxWidth:"md",children:(0,t.jsx)("div",{className:"bg-gray-50 dark:bg-gray-900",children:(0,t.jsx)("div",{className:"flex flex-col items-center justify-center px-6 py-8 mx-auto",children:(0,t.jsxs)("div",{className:"p-6 space-y-4 md:space-y-6 sm:p-8",children:[(0,t.jsxs)("div",{className:"flex gap-3 justify-between",children:[(0,t.jsx)("h1",{className:"text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white",children:"Edit Profile"}),(0,t.jsx)(C.Z,{onClick:D,style:{color:"red",cursor:"pointer"}})]}),(0,t.jsxs)("div",{className:"space-y-4 md:space-y-6",children:[(0,t.jsxs)("div",{className:"flex gap-3",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Firstname"}),(0,t.jsx)("input",{id:"firstName",className:"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",onChange:e=>{o(e.target.value)},value:i})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Lastname"}),(0,t.jsx)("input",{id:"lastName",className:"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",onChange:e=>{c(e.target.value)},value:n})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Address Line 1"}),(0,t.jsx)("input",{id:"address1",className:"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",onChange:e=>{g(e.target.value)},value:u})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Address Line 2"}),(0,t.jsx)("input",{id:"address2",className:"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",onChange:e=>{b(e.target.value)},value:m})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"State"}),(0,t.jsxs)("select",{id:"states",className:" bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",onChange:e=>{k(e.target.value)},value:h,children:[(0,t.jsx)("option",{value:"",children:"Please Select"},0),v&&v.map((e,r)=>(0,t.jsx)("option",{value:e._id.toString(),children:e.stateName},r+1))]})]}),(0,t.jsxs)("div",{className:"flex gap-3",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"City"}),(0,t.jsx)("input",{id:"pincode",className:"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",onChange:e=>{y(e.target.value)},value:p})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Pincode"}),(0,t.jsx)("input",{id:"pincode",className:"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",onChange:e=>{f(e.target.value)},value:x})]})]}),(0,t.jsx)("button",{type:"submit",onClick:e=>{e.preventDefault(),console.log("bwfeuib"),A()},disabled:!i&&!n,className:"w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed",children:"Submit"})]})]})})})})},D=function(){let[e,r]=(0,s.useState)(!1),a=(0,_.v9)(e=>e.profileSection.userProfile),[j,S]=(0,s.useState)(null),C=(0,_.I0)(),[D,A,E]=(0,l.Z)(),[M,U]=(0,s.useState)(!1);(0,s.useEffect)(()=>(C((0,w.zx)()),C((0,w.r3)()),()=>{C((0,w.jD)())}),[]),(0,s.useEffect)(()=>{void 0==D||D||(0,x.redirect)("/dashboard"),console.log("isLoggedIn",D)},[D]);let O=()=>{S(null)},L=e=>{N().fire(e||"")};return(0,t.jsxs)("div",{className:"h-screen flex justify-center mt-6 ",children:[(0,t.jsxs)("div",{className:"flex-col gap-6",children:[(0,t.jsx)("div",{className:"p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400",role:"alert",children:(0,t.jsx)("span",{className:"font-medium",children:"Photo Upload will be available Soon"})}),(0,t.jsx)("div",{className:"flex justify-center h-40 w-60",children:(0,t.jsx)(b.Z,{sx:{width:150,height:150,bgcolor:E?(0,d.u_)(E.toString()):""},children:E&&(0,d.zl)(E.toString())})}),(0,t.jsxs)("div",{className:"flex justify-center gap-2 mt-4 w-60",children:[(null==a?void 0:a.firstName)+" "+(null==a?void 0:a.lastName),(null==a?void 0:a.academic)=="Working Professional"&&(0,t.jsx)(g.Z,{title:"Working Professional",children:(0,t.jsx)("div",{onClick:e=>L("Working Professional"),children:(0,t.jsx)(f.Z,{})})}),(null==a?void 0:a.academic)=="Student"&&(0,t.jsx)(g.Z,{title:"Student",children:(0,t.jsx)("div",{onClick:e=>L("Student"),children:(0,t.jsx)(p.Z,{})})}),(0,t.jsx)(g.Z,{title:"Edit Profile",children:(0,t.jsxs)("div",{onClick:e=>{S(e.currentTarget)},children:[" ",(0,t.jsx)(u.Z,{className:"cursor-pointer"})]})}),(0,t.jsxs)(m.Z,{anchorEl:j,id:"account-menu",open:!!j,onClose:O,onClick:O,transformOrigin:{horizontal:"right",vertical:"top"},anchorOrigin:{horizontal:"right",vertical:"bottom"},children:[(0,t.jsx)(y.Z,{onClick:e=>U(!0),children:"Edit Addrerss & Name"}),(0,t.jsx)(y.Z,{onClick:e=>r(!0),children:"Edit Social Media"})]})]}),(null==a?void 0:a.email)&&(0,t.jsxs)("div",{className:"flex justify-center gap-2 mt-4 w-60",children:[(0,t.jsx)(i.Z,{}),null==a?void 0:a.email]}),(null==a?void 0:a.phone_no)&&(0,t.jsxs)("div",{className:"flex justify-center gap-2 mt-4 w-60",children:[(0,t.jsx)(v.Z,{}),null==a?void 0:a.phone_no]}),(0,t.jsxs)("div",{className:"flex justify-center gap-5 mt-4 w-60",children:[(null==a?void 0:a.facebook)&&(0,t.jsx)(o.Z,{style:{color:"#1877f2"},onClick:e=>{var r;L(null==a?void 0:null===(r=a.facebook)||void 0===r?void 0:r.toString())}}),(null==a?void 0:a.instagram)&&(0,t.jsx)(n.Z,{style:{color:"#833AB4"},onClick:e=>{var r;L(null==a?void 0:null===(r=a.instagram)||void 0===r?void 0:r.toString())}}),(null==a?void 0:a.youtube)&&(0,t.jsx)(c.Z,{style:{color:"#FF0000"},onClick:e=>{var r;L(null==a?void 0:null===(r=a.youtube)||void 0===r?void 0:r.toString())}}),(null==a?void 0:a.address)&&(0,t.jsx)(k.Z,{onClick:e=>{L((0,d.Ip)(null==a?void 0:a.address))}})]}),(null==a?void 0:a.DOB)&&(0,t.jsxs)("div",{className:"flex justify-center gap-2 mt-4 w-60",children:[(0,t.jsx)(h.Z,{}),(0,d.zP)(null==a?void 0:a.DOB.toString())]}),(0,t.jsx)("div",{className:"flex flex-wrap gap-5 mt-4 w-60",children:null==a?void 0:a.about})]}),(0,t.jsx)(Z,{open:e,onClose:()=>{r(!1)}}),(0,t.jsx)(P,{open:M,onClose:()=>{U(!1)}})]})};function A(){return(0,t.jsx)(D,{})}},5794:function(e,r,a){"use strict";a.d(r,{Y:function(){return l},p:function(){return d}});var t=a(5953);let s="https://wfg-kol-backend.onrender.com/",l=t.Z.create({baseURL:s,timeout:1e4}),d=t.Z.create({baseURL:s,timeout:1e4,headers:{"Content-Type":"application/json"}});d.interceptors.request.use(e=>{let r=localStorage.getItem("token");return r&&(e.headers.Authorization="Bearer ".concat(r)),e},e=>Promise.reject(e))},7482:function(e,r,a){"use strict";a.d(r,{ZP:function(){return m},zx:function(){return c},r3:function(){return o},jD:function(){return g},MM:function(){return n}});var t=a(7539),s=a(5794);async function l(e){let r=await s.p.patch("user/update",e);return r.data&&r.data.success?{success:!0,message:"Update is successfull",userdata:r.data.data}:{success:!1,message:"".concat(r.data.message?r.data.message:"Failed to Update")}}async function d(){let e=await s.p.get("states");return e.data&&e.data.success?{success:!0,states:e.data.data}:{success:!1,message:"".concat(e.data.message?e.data.message:"Failed to fetch states")}}async function i(){let e=await s.p.get("user/userdetails");return(console.log("fewgergh"),e.data&&e.data.success)?{success:!0,user:e.data.data}:{success:!1,message:"".concat(e.data.message?e.data.message:"Failed to fetch the user detail")}}let o=(0,t.hg)("profileSection/fetchUserDetails",async()=>{try{let e=await i();return e}catch(e){console.log(e)}}),n=(0,t.hg)("profileSection/updateUser",async(e,r)=>{let{getState:a,dispatch:t}=r;try{let r=await l(e);return t(o()),r}catch(e){console.log(e)}}),c=(0,t.hg)("profileSection/fetchAllStates",async()=>{try{let e=await d();return e}catch(e){console.log(e)}}),u=(0,t.oM)({name:"profileSection",initialState:{open:!1,updateLoader:!1,updateMessage:"",errorOnUpdate:!1,states:null,userProfile:{firstName:"",lastName:"",DOB:"",phone_no:"",email:"",academic:"",facebook:"",instagram:"",youtube:"",about:"",address:{address_line_1:"",address_line_2:"",pincode:"",city:"",state:{state_id:"",state_name:""}}}},reducers:{resetFlags:e=>{e.errorOnUpdate=!1,e.updateMessage="",e.updateLoader=!1,e.states=null}},extraReducers:e=>{e.addCase(n.pending,e=>{e.updateLoader=!0}),e.addCase(n.fulfilled,(e,r)=>{e.updateLoader=!1,e.errorOnUpdate=!1,e.updateMessage="",r.payload&&r.payload.success?e.updateMessage=r.payload.message:r.payload&&(e.updateMessage=r.payload.message,e.errorOnUpdate=!0),e.updateLoader=!1}),e.addCase(c.fulfilled,(e,r)=>{r.payload&&r.payload.success&&(e.states=r.payload.states)}),e.addCase(o.fulfilled,(e,r)=>{r.payload&&r.payload.user&&(e.userProfile=r.payload.user)})}}),{resetFlags:g}=u.actions;var m=u.reducer}},function(e){e.O(0,[987,550,412,881,539,485,386,588,73,261,253,769,744],function(){return e(e.s=8008)}),_N_E=e.O()}]);