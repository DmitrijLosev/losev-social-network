"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[863],{8863:function(e,r,n){n.r(r),n.d(r,{default:function(){return A}});var s=n(2791),o=n(8687),t=n(1413),i=n(9439),a="Paginator_selected__ubo3c",u="Paginator_pagenumber__NHRle",l="Paginator_paginator__ThrKA",c=n(184),d=function(e){for(var r=e.totalItemsCount,n=e.pageSize,o=e.currentPage,t=e.onPageChanged,d=e.portionSize,f=void 0===d?15:d,h=Math.ceil(r/n),m=[],g=1;g<=h;g++)m.push(g);var v=(0,s.useState)(1),p=(0,i.Z)(v,2),x=p[0],P=p[1],j=Math.ceil(r/f),S=f*(x-1)+1,U=f*x;return(0,c.jsxs)("div",{className:l,children:[x>=2&&(0,c.jsx)("button",{onClick:function(){P(1)},children:"First Page"}),x>1&&(0,c.jsx)("button",{onClick:function(){P(x-1)},children:"Preview Page"}),m.filter((function(e){return e>=S&&e<=U})).map((function(e){return(0,c.jsx)("span",{className:"".concat(u," ").concat(o===e?a:""),onClick:function(){t(e)},children:e},e)})),x<j&&(0,c.jsx)("button",{onClick:function(){P(x+1)},children:"Next Page"})]})},f=n(1087),h=n(9682),m=n(5068),g=function(e){var r=e.user,n=e.followingInProgress,s=e.onFollowUser,o=e.onUnfollowUser;return(0,c.jsxs)("div",{children:[(0,c.jsxs)("span",{children:[(0,c.jsx)("div",{children:(0,c.jsx)(f.OL,{to:"/profile/"+r.id,children:(0,c.jsx)("img",{src:null!=r.photos.small?r.photos.small:h,className:m.Z.userFoto,alt:"Photo did not find"})})}),(0,c.jsx)("div",{children:r.followed?(0,c.jsx)("button",{disabled:n.some((function(e){return e===r.id})),onClick:function(){s(r.id)},children:"Unfollow"}):(0,c.jsx)("button",{disabled:n.some((function(e){return e===r.id})),onClick:function(){o(r.id)},children:"Follow"})})]}),(0,c.jsxs)("span",{children:[(0,c.jsxs)("div",{children:["USER NAME:",r.name]}),(0,c.jsxs)("div",{children:["USER ID:",r.id]}),(0,c.jsx)("div",{children:r.status?"STATUS:  "+r.status:"NO STATUS"})]}),(0,c.jsx)("span",{})]})},v=n(1134),p=n(4695),x=n(6727),P=x.Ry({searchName:x.Z_().max(20).default(""),UsersShowProperty:x.Z_().required().nullable()}),j=s.memo((function(e){var r,n,s=e.values,o=e.onFilterChanged,i=(0,v.cI)({resolver:(0,p.X)(P),defaultValues:{searchName:s.searchName,UsersShowProperty:s.UsersShowProperty},values:s}),a=i.register,u=i.handleSubmit,l=i.formState.errors;return(0,c.jsxs)("form",{onSubmit:u((function(e){var r=e.searchName,n="true"===e.UsersShowProperty||"false"!==e.UsersShowProperty&&null;o({term:r,friend:n})})),children:[(0,c.jsx)("input",(0,t.Z)((0,t.Z)({},a("searchName")),{},{placeholder:"Entry Name of search user"})),(0,c.jsxs)("select",(0,t.Z)((0,t.Z)({},a("UsersShowProperty")),{},{children:[(0,c.jsx)("option",{value:"null",children:"Show all users"}),(0,c.jsx)("option",{value:"true",children:"Show followed users"}),(0,c.jsx)("option",{value:"false",children:"Show unfollowed users"})]})),(0,c.jsx)("input",{type:"submit",value:"Accept Searching Property"}),(0,c.jsx)("p",{className:m.Z.error,children:null===(r=l.searchName)||void 0===r?void 0:r.message}),(0,c.jsx)("p",{className:m.Z.error,children:null===(n=l.UsersShowProperty)||void 0===n?void 0:n.message})]})})),S=n(5888),U=function(e){return e.UsersPage.users},w=function(e){return e.UsersPage.pageSize},_=function(e){return e.UsersPage.totalUsersCount},Z=function(e){return e.UsersPage.currentPage},N=function(e){return e.UsersPage.followingInProgress},y=function(e){return e.UsersPage.isFetching},b=function(e){return e.UsersPage.filter},C=n(7689),F=n(5107),k=function(e){var r=(0,o.v9)(_),n=(0,o.v9)(w),a=(0,o.v9)(Z),u=(0,o.v9)(U),l=(0,o.v9)(N),f=(0,o.v9)(b),h=(0,o.I0)(),m=((0,C.s0)(),(0,C.TH)(),{searchName:f.term,UsersShowProperty:String(f.friend)}),v=(0,F.useQueryParam)("term",F.StringParam),p=(0,i.Z)(v,2),x=p[0],P=p[1],y=(0,F.useQueryParam)("friend",F.StringParam),k=(0,i.Z)(y,2),I=k[0],A=k[1],R=(0,F.useQueryParam)("page",F.NumberParam),E=(0,i.Z)(R,2),T=E[0],z=E[1];(0,s.useEffect)((function(){var e=T||a,r=f;x&&(r=(0,t.Z)((0,t.Z)({},r),{},{term:x})),I&&(r=(0,t.Z)((0,t.Z)({},r),{},{friend:"true"===I||"false"!==I&&null})),h((0,S.Rf)(e,n,r))}),[]),(0,s.useEffect)((function(){""===f.term?P(void 0):P(f.term),A(String(f.friend)),z(a)}),[f,a]);var M=function(e){h((0,S.P_)(e))},Q=function(e){h((0,S.F6)(e))};return(0,c.jsxs)("div",{children:[(0,c.jsx)("div",{children:(0,c.jsx)(j,{onFilterChanged:function(e){h((0,S.Rf)(1,n,e))},values:m})}),(0,c.jsx)(d,{totalItemsCount:r,pageSize:n,currentPage:a,onPageChanged:function(e){h((0,S.Rf)(e,n,f))}}),u.map((function(e){return(0,c.jsx)(g,{user:e,followingInProgress:l,onFollowUser:M,onUnfollowUser:Q},e.id)}))]})},I=n(9995),A=function(e){var r=(0,o.v9)((function(e){return e.auth.isAuth})),n=(0,o.v9)(y);return(0,c.jsxs)("div",{children:[!r&&(0,c.jsx)(C.Fg,{to:"/login"}),n&&(0,c.jsx)(I.Z,{}),(0,c.jsx)(k,{})]})}},5068:function(e,r){r.Z={userFoto:"User_userFoto__houx+",error:"User_error__SAXv6"}}}]);
//# sourceMappingURL=863.55c8187c.chunk.js.map