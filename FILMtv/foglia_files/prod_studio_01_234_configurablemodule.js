self.studioLoader.context.evalInContext("window.STUDIO_SDK_START=+new Date();var Jj=\"FLASH_LAYOUTS FLASH_CONFIGURABLE_XML FLASH_CONFIGURABLE_JSON HTML5_LAYOUTS HTML5_CONFIGURABLE HTML5_CONFIGURABLE_DAB\".split(\" \");var Kj=function(){};Kj.prototype.a=function(a){a=!hb(Pb(Jg(a)));var b=!hb(Pb(\"HTML5_CONFIGURABLE\"))&&0<=Qa(Jj,\"HTML5_CONFIGURABLE\")?\"HTML5_CONFIGURABLE\":null;return a&&(null===b||\"HTML5_CONFIGURABLE\"==b||\"HTML5_CONFIGURABLE_DAB\"==b||\"HTML5_LAYOUTS\"==b||\"FLASH_CONFIGURABLE_JSON\"==b)};Kj.prototype.b=function(a){a=Jg(a);if(hb(Pb(a)))return null;a=JSON.parse(a);var b;a.Profile&&a.Profile[0]?b=Sa(a.Profile,this.f,this)[0]:b={};D(wb(a,function(a,b){return\"_profileid\"!=b&&\"Profile\"!=b}),function(a,d){b[d+\"Array\"]=Sa(a,this.f,this)},this);return Lj(Jg(b))};Kj.prototype.f=function(a){return xb(wb(a,function(a,c){return\"_index\"!=c}),function(a){if(w(a)){b:{for(b in a)if(!u.call(void 0,a[b])){var b=!1;break b}b=!0}if(b&&1==zb(a)){b:{for(d in a)break b;var d=void 0}a=Sa(a[d],pc(y(Jb,d)))}}return a},this)};var Mj=function(a,b){this.b=$a(a);this.f=!b;this.a=[]},Nj=function(a,b){a.a=[];for(var c=0;c<a.b.length;++c){var d=a.b[c];a.a[c]=!1;if(d.a(b)&&(d=d.b(b),null!==d&&(b=d,a.a[c]=!0,!a.f)))break}return b};var Oj=function(a){I.call(this);this.l=a};z(Oj,I);Oj.prototype.b=function(){wa()};Oj.prototype.g=function(){wa()};Oj.prototype.h=function(a){n(a)&&(a=JSON.parse(a));w(a)&&\"functionName\"in a&&this.l(a.functionName,a.args)};var Pj=function(a){ze.call(this,a)};z(Pj,ze);r(\"studio.sdk.configurable.ConfigurableEvent\",Pj,void 0);Pj.REGISTER=\"register\";var Qj=function(){},Rj=function(a,b,c,d){if(0!=b.length)if(1==b.length){var e=b[0];Fb(c,e,d)}else{e=b[0];var f=parseInt(b[1],10);isNaN(f)?(Fb(c,e,{}),Rj(a,b.slice(1),c[e],d)):(Fb(c,e,[]),2<b.length?(void 0===c[e][f]&&(c[e][f]={}),Rj(a,b.slice(2),c[e][f],d)):void 0===c[e][f]&&(c[e][f]=d))}};var Sj=function(a){this.f=a};xa(Sj);Sj.prototype.a=function(a){return a&&w(a)?!!Bb(a,\"DbmDynamicFeed\",0):!1};Sj.prototype.b=function(a){return Tj(this,a.DbmDynamicFeed[0])};var Tj=function(a,b){var c={};D(b,x(function(a,b){var d=b.split(\"_\").filter(function(a){return!hb(Pb(a))});if(2>d.length)Fb(c,b,a);else try{Rj(this.f,d,c,a)}catch(k){Fb(c,b,a)}},a));return c};var Uj={17:\"mp4v.20.9\",18:\"avc1.42E033\",22:\"avc1.640033\",37:\"avc1.640033\",36:\"mp4v.20.240\",43:\"vp8\",44:\"vp8\",45:\"vp8\",46:\"vp8\",59:\"avc1.4D4033\",133:\"avc1.4D4015\",134:\"avc1.4D401E\",135:\"avc1.4D401F\",136:\"avc1.4D401F\",137:\"avc1.640033\",160:\"avc1.4D400C\",212:\"avc1.4D401F\",309:\"avc1.640033\",342:\"avc1.42E01E\",343:\"avc1.42E01F\",344:\"avc1.42E033\",345:\"avc1.42E033\",346:\"avc1.42E033\",347:\"avc1.4D401F\"};var Xj=function(){var a=Vj,b=Wj;this.l=window.Enabler;this.g=a;this.B=b;this.j=new Xc(h.innerWidth,h.innerHeight)},Yj=[\"video/webm\",\"video/mp4\"],Zj=function(a,b){var c=[],d;for(d in b)w(b[d])&&(\"transcodedVideo\"==b[d][\"@type\"]&&b[d].transcodes&&c.push(b[d]),ab(c,Zj(a,b[d])));return c};Xj.prototype.f=function(a){return!!(a.url&&a.mimeType&&0<a.width&&0<a.height)};var ak=function(a,b){fb(a,function(a,b){return a.height-b.height});var c=Va(a,function(a){return 0>=b-a.height});return-1==c?a[a.length-1]:b==a[c].height?a[c]:0<c?a[c-1]:a[0]};Xj.prototype.h=function(a){var b=Ra(a.transcodes,function(a){var b=a.mimeType;a=a.formatID;a=a+\"\"in Uj?Uj[a+\"\"]:\"\";hb(Pb(a))||(b+='; codecs=\"'+a+'\"');return this.l.ec(b)},this);b=Ra(b,this.f,this);if(0==b.length)return a.url=a.transcodes[0].url,a;for(var c=b,d=this.g?Za(this.g,Yj):Yj,e=0;e<d.length;++e){var f=Ra(b,function(a){return d[e]==a.mimeType});if(f.length){c=f;break}}b=ak(c,this.B||this.j.height);a.url=b.url;return a};Xj.prototype.a=function(a){a=Zj(this,a);return!!a.length&&Ta(a,function(a){a=a.transcodes;return!!(a&&a.length&&Ta(a,this.f,this))},this)};Xj.prototype.b=function(a){B(Zj(this,a),this.h,this);return a};var bk=function(a){this.f=a};bk.prototype.b=function(a){var b=this.g(a);return ck(this,a,b)};var ck=function(a,b,c){var d=wb(b,function(a,b){return!w(a)&&!Cb(c,b)});D(c,x(function(a,b){if(\"Google_Merchant_Center\"!=b){var c=b.split(\"_\");if(3>c.length)Fb(d,b,a);else try{var e=c[c.length-1],f;if(f=e){var q=e.length-3;f=0<=q&&e.indexOf(\"Url\",q)==q}Rj(this.f,c,d,f&&w(a)&&\"Url\"in a?a.Url:a)}catch(E){Fb(d,b,a)}}},a));\"Google_Merchant_Center\"in b&&(d.Product=dk(b.Google_Merchant_Center));\"Retail\"in b&&(d.Product=ek(b.Retail));return d},dk=function(a){return Sa(a,function(a){var b=Bb(a,\"offer_image_derived\",\"image200\",\"url\"),d=Bb(a,\"offer_landing_page_derived\",\"Url\"),e=Bb(a,\"offer_regular_price\",\"formattedPrice\"),f=Bb(a,\"offer_title\");a=Bb(a,\"offer_description\");return{imageUrl:b,url:d,price:e,name:f,description:a}})},ek=function(a){return Sa(a,function(a){var b=Bb(a,\"imageUrl\",\"Url\"),d=Bb(a,\"url\",\"Url\"),e=Bb(a,\"price\"),f=Bb(a,\"name\");a=Bb(a,\"description\");return{imageUrl:b,url:d,price:e,name:f,description:a}})};var fk=function(a){this.f=a};z(fk,bk);fk.prototype.a=function(a){a&&w(a)?(a=null!=a?a.layout:null,a=!(null==a||!n(a)||!a)):a=!1;return a};fk.prototype.g=function(a){a.Headline_0_productClickOnly=!0;return a};var gk=function(a){this.f=a};z(gk,bk);gk.prototype.a=function(a){if(!a||!w(a))return!1;a=Bb(a,\"google_template_data\",\"adData\");return!!a&&1==a.length};gk.prototype.g=function(a){return a.google_template_data.adData[0]};var hk=function(){this.a=null;this.b=!1};xa(hk);hk.prototype.ka=function(a){if(null!=this.a)a(this.a);else{var b=null,c=[],d=void 0,e=new Qj;window.Enabler&&null!=window.Enabler.getParameter(\"AdData\")?(b=window.Enabler.getParameter(\"AdData\"),c.push(new gk(e))):window.Enabler&&null!=window.Enabler.Ua()?(b=window.Enabler.Ua(),d=c.length,c.push(new fk(e)),c.push(new Sj(e)),c.push(new Kj)):window.Enabler&&null!=window.Enabler.ka()?b=window.Enabler.ka():window.GdnLayout&&null!=window.GdnLayout.getConfig()&&(b=JSON.parse(GdnLayout.getConfig()));null!=b&&(c=new Mj(c,!0),this.a=Nj(c,b),p(d)&&(this.b=!!c.a[d]));a(this.a)}};hk.prototype.reset=function(){this.a=null};var Lj=function(a){return JSON.parse(a)||{}};var ik=function(a){Oj.call(this,a);this.b()};z(ik,Oj);ik.prototype.b=function(){window.Enabler.hb(\"livePreviewChannel\",x(this.h,this))};ik.prototype.g=function(a,b){gi(window.Enabler,\"livePreviewMessage\",[{functionName:a,args:b}])};var jk=function(a,b){Oj.call(this,a);this.j=b;this.f=this.a=null;this.b()};z(jk,Oj);jk.prototype.b=function(){if(\"FILLER\"==this.j){var a=kk(),b=a.postMessage?a:a.document;b.postMessage?b.postMessage(\"PreviewHandler.INIT\",\"*\"):window.console.log(\"No postMessage on preview frame\",a);this.a=new Ch({tp:1,role:1,cn:\"livePreviewChannel\",osh:!0});a=kk();this.a.X=a;this.f=new Ag(this.a);xe(this,this.a);xe(this,this.f);a=this.f;b=x(this.h,this);a.g.Ia(\"livePreviewService\",x(a.s,a,b),!0);this.a.connect(x(this.s,this))}};var kk=function(){for(var a=h.Enabler.M(\"PREVIEW_FRAME_DEPTH\")||1,b=window,c=b,d=0;d<a;d++)c=c.parent;for(;c!==window.top;)b=b.parent,c=c.parent;return b};jk.prototype.s=function(){lk(this,\"PreviewHandler.INIT\")};var lk=function(a,b){\"FILLER\"==a.j&&Bg(a.f,\"livePreviewService\",b,va)};jk.prototype.g=function(a,b){lk(this,[{functionName:a,args:b}])};var mk=function(){this.f=this.a=this.b=null};xa(mk);mk.prototype.ka=function(a){if(null===this.f||null===this.b||null===this.a){var b=new Mj([new gk(new Qj)]);h.onAdData=x(function(c,d){if(null===this.f||null===this.b||null===this.a){var e=Nj(b,c);this.b=c;this.a=d;this.f=e;a(e,c,d)}},this)}else a(this.f,this.b,this.a)};mk.prototype.reset=function(){this.f=this.a=this.b=null};var V=function(a){throw new nk(a);},nk=function(a){Na.call(this,a)};z(nk,Na);nk.prototype.name=\"ConfigurableException\";var ok=new H,pk=new H,qk=0,rk=0,sk=!1,tk=/(?:(.*)\\.)?([^\\.\\[]+)(?:\\[(\\d+)\\])?/;r(\"studio.sdk.configurable.config.declare\",function(a,b){ok.P(a)?V(\"Config type \"+(a+\" already exists\")):ok.set(a,new uk(a,b))},void 0);var vk=function(a,b){return ok.P(a)?ok.get(a).create(b):(V(sj(a)),null)};r(\"studio.sdk.configurable.config.instantiate\",vk,void 0);var xk=function(a){if(!sk)return a;null!=a[\"@type\"]||(a[\"@type\"]=\"Root\");wk(a);return vk(a[\"@type\"],a)},wk=function(a,b){D(a,function(a){w(a)&&wk(a)});if(w(a)&&!u(a)){(b=a[\"@type\"]||b)||(b=\"\"+rk++);a[\"@type\"]=b;try{yk(b);return}catch(c){}ok.set(b,new uk(b,a))}},yk=function(a){var b=zk(a);return b||(b=ok.get(a),b)?b:(V(sj(a)),null)},Bk=function(a){return Ak(a,!0)?pk.get(a[\"@id\"]):null},Dk=function(a){return w(a)?(a=Bk(a))?a.a:null:Ck(a)},Ek=function(a){a=Bk(a);return a?a.a.a:(V(\"Attempt to get config type for a non-object\"),null)};r(\"studio.sdk.configurable.config.getType\",Ek,void 0);r(\"studio.sdk.configurable.config.getPath\",function(a){a=Bk(a);return a?Fk(a):(V(\"Attempt to get config type for a non-object\"),null)},void 0);var Hk=function(a,b){var c;if(!Ak(a))return null;if(c=tk.exec(b)){b=parseInt(c[3],10);isNaN(b)&&(b=null);var d=c[1]||\"\";c=c[2]||\"\"}else d=\"\",c=b,b=null;a=Gk(a,d);return Ak(a)?{ra:a,propertyName:c,index:b}:null},Ik=function(a,b,c,d){if(null==b)return null;try{var e=yk(a)}catch(f){if(!sk)throw f;}if(!e&&sk){wk(b,a);e=yk(a);if(!e)return V(sj(a)),null;c=Hk(c,d);d=Bk(c.ra);a=e;c=d.a.b.get(c.propertyName);c.Xa(a)||c.J.add(a)}return e.create(b)},Jk=function(a){this.a=a},uk=function(a,b){this.a=a;this.b=new H;this.f=new Kk;Lk(this,b)};z(uk,Jk);var Lk=function(a,b){b&&D(b,function(a,b){var c=Mk(this.f,b,a);w(a)&&(c=c||Nk(this.f,a));c||gb(b,\"@\")||this.b.set(b,new Ok(this,b,a))},a)};uk.prototype.create=function(a){var b=Pk(this);B(this.b.O(),function(c){var d=this.b.get(c),e=void 0;a&&(e=a[c]);d=Rk(d,e);b[c]=d;Sk(b,c,d)},this);return b};var Sk=function(a,b,c){a=a?Bk(a):null;if(za(c))for(var d=0;d<c.length;d++){var e=d,f=Bk(c[d]);f&&Tk(f,a,b,e)}else(c=Bk(c))&&Tk(c,a,b,void 0)},Uk=function(a,b){this.a=a;this.g=b};z(Uk,Jk);Uk.prototype.create=function(a){return l(a)?a:this.g};var Vk=new Uk(\"string\",\"\"),Wk=new Uk(\"number\",0),Xk=new Uk(\"boolean\",!0),Yk=new Uk(\"url\",null),Zk=new Uk(\"color\",\"#000000\"),$k=new Uk(\"image\",null),al=new Uk(\"video\",null),bl=new Uk(\"asset\",null),zk=function(a){switch(a.toLowerCase()){case \"string\":case \"str\":return Vk;case \"integer\":case \"int\":case \"float\":case \"number\":case \"double\":return Wk;case \"boolean\":case \"bool\":return Xk;case \"url\":return Yk;case \"color\":return Zk;case \"image\":return $k;case \"video\":return al;case \"file\":case \"asset\":return bl}},Ck=function(a){switch(ya(a)){case \"number\":return Wk;case \"boolean\":return Xk;case \"string\":return Vk;default:return V(tj(a)),Vk}},Ok=function(a,b,c){this.h=a;this.f=b;this.J=new Sf;this.g=this.b=!1;this.a=void 0;this.B=new Kk;switch(ya(c)){case \"string\":case \"number\":case \"boolean\":this.b=!1;this.g=!0;this.a=c;this.J.add(Ck(this.a));break;case \"array\":cl(this,c);break;case \"object\":dl(this,c);break;case \"null\":if(sk)break;default:V(uj(a.a,b))}},cl=function(a,b){0!=b.length||sk?(a.b=!0,a.g=!0,a.a=b,B(b,function(a){var b;sk&&w(a)?b=ok.get(a[\"@type\"]):b=Ck(a);b&&this.J.add(b)},a)):V(\"Array property \"+(a.f+(\" on type \"+(a.h.a+\" must have at least one element.\"))))},dl=function(a,b){a.b=!!b[\"@array\"];a.g=!!b[\"@required\"];var c=b[\"@type\"];if(l(c))switch(ya(c)){case \"string\":a.J.add(yk(c));break;case \"array\":B(c,function(a){(a=yk(a))&&this.J.add(a)},a);break;default:V(uj(a.h.a,a.f));return}else a.J.add(Vk);a.a=void 0;b.hasOwnProperty(\"@value\")?(c=b[\"@value\"],l(c)?a.a=Rk(a,c):a.a=void 0):0==a.J.a.f||a.b||(a.a=a.J.K()[0].create(void 0));el(a.B,b)};Ok.prototype.Xa=function(a){return!!a&&this.J.contains(a)};Ok.prototype.j=function(a){if(!w(a))return a;var b=null;Ak(a,!0)?b=Dk(a):a.hasOwnProperty(\"@type\")?(b=ok.get(a[\"@type\"]),null==b&&sk&&(wk(a),b=ok.get(a[\"@type\"]))):1==this.J.V()&&(b=this.J.K()[0]);sk&&!this.Xa(b)&&this.J.add(b);return this.Xa(b)?b.create(a):(V(vj(this.h.a,this.f)),null)};var Rk=function(a,b){b=l(b)?b:a.a;var c=void 0;a.b?l(b)?(u(b)||(b=[b]),c=Sa(b,x(a.j,a))):c=[]:l(b)&&(c=a.j(b));return!l(c)&&a.g?(V(\"No value specified for non-optional property \"+(a.f+(\" on type \"+(a.h.a+\".\")))),null):c},Pk=function(a){var b={};b[\"@id\"]=qk++;a=new fl(a,b);pk.set(a.h,a);return b},Ak=function(a,b){var c=w(a)&&\"@id\"in a;c&&(c=a[\"@id\"],c=pk.P(c)&&pk.get(c).H()==a);c||b||V(\"Attempt to get config type for a non-object\");return c},Gk=function(a,b){a=Bk(a);return a?gl(a,b):(V(\"Attempt to get config type for a non-object\"),null)},fl=function(a,b){this.h=b[\"@id\"];this.a=a;this.j=b;this.g=this.f=this.b=null},hl=function(a,b){return a.a instanceof uk?a.a.b.get(b):null};fl.prototype.H=function(){return this.j};var Fk=function(a){if(!a.b)return\"\";var b=Fk(a.b);b&&(b+=\".\");b+=a.f;p(a.g)&&(b+=\"[\"+a.g+\"]\");return b},Tk=function(a,b,c,d){(a.b=b)?(a.f=c,a.g=p(d)?d:null):(a.f=null,a.g=null)},gl=function(a,b){if(!b)return a.H();if(b){var c=/^(\\w+)(?:\\[(\\d+)\\])?(?:\\.(.*))?$/.exec(b);if(c)var d={qb:c[1],index:c[2]?parseInt(c[2],10):-1,rb:c[3]?c[3]:null};else V(\"Invalid path \"+b),d=null}else d=null;b=d.qb;c=d.index;d=d.rb;var e=a.a;if(!e.b.get(b))return V(\"Property \"+(b+(\" does not exist on type \"+(e.a+\".\")))),null;a=a.H()[b];if(0<=c){if(!za(a))return V(wj(e.a,b)),null;a=a[c]}if(d){a=Bk(a);if(!a)return V(\"Attempt to get config type for a non-object\"),null;a=gl(a,d)}return a},Kk=function(){this.a=new Sf},il=function(a,b,c){u(c)?B(c,function(a){this.a.add(b+\"_\"+a)},a):n(c)&&a.a.add(b+\"_\"+c)},el=function(a,b){b&&D(b,function(a,b){Mk(this,b,a);w(a)&&Nk(this,a)},a)},Nk=function(a,b){try{var c=!1,d=b[\"@type\"],e=b[\"@value\"],f=d&&Xk==yk(String(d)),k=l(e)&&Xk==Dk(e);(f||k)&&D(b,function(a,b){c=c||Mk(this,b,a)},a);return c}catch(m){return!1}},Mk=function(a,b,c){if(!gb(b,\"@\"))return!1;b=b.replace(\"@\",\"\");switch(b){case \"exit\":return il(a,\"exit\",c),!0;case \"counter\":return il(a,\"counter\",c),!0;case \"timer\":return il(a,\"timer\",c),!0}return!1},jl=function(a,b){var c=a[b];return u(c)?c:(V(wj(Ek(a),b)),null)};var ll=function(a){this.a=Bk(a);this.B=new kl;this.f=new H;this.b=new H;this.j=new H;this.g=new H;this.h=new H},ml=new H,nl=function(a){if(!Ak(a))return null;var b=a[\"@id\"];ml.P(b)||ml.set(b,new ll(a));return ml.get(b)},ol=function(a,b,c){a=Hk(a,b);return!a||c&&!jl(a.ra,a.propertyName)?null:(c=nl(a.ra))?{controller:c,propertyName:a.propertyName,index:a.index}:null},W=function(a,b){var c=a.get(b);l(c)||(c=new kl,a.set(b,c));return c},ql=function(a){B(a.f.O(),function(a){var b=this.a.H()[a];W(this.f,a).a(b)},a);B(a.b.O(),function(a){for(var b=this.a.H()[a],d=0;d<b.length;d++){var e=b[d],f=d,k=b;W(this.b,a).a(e,f,k)}},a);B(a.g.O(),function(a){var b=this.a.H()[a];W(this.g,a).a(b)},a);pl(a)},pl=function(a){a.B.a(a.a.H());(a=a.a.b)&&pl(nl(a.H()))},kl=function(){this.b=[]};kl.prototype.add=function(a,b){var c=this.b;a={L:a,scope:b};0<=Qa(c,a)||c.push(a)};var rl=function(a,b,c){var d=Va(a.b,function(a){return a.L==b&&a.scope==c});-1!=d&&Xa(a.b,d)};kl.prototype.a=function(a){var b=arguments;B(this.b,function(a){a.L.apply(a.scope,b)})};r(\"studio.sdk.configurable.binding.addValueChangeListener\",function(a,b,c){(a=nl(a))&&a.B.add(b,c)},void 0);r(\"studio.sdk.configurable.binding.removeValueChangeListener\",function(a,b,c){(a=nl(a))&&rl(a.B,b,c)},void 0);var sl=function(a,b,c,d){(a=ol(a,b))&&W(a.controller.f,a.propertyName).add(c,d)};r(\"studio.sdk.configurable.binding.addPropertyChangeListener\",sl,void 0);r(\"studio.sdk.configurable.binding.removePropertyChangeListener\",function(a,b,c,d){(a=ol(a,b))&&rl(W(a.controller.f,a.propertyName),c,d)},void 0);var tl=function(a,b,c,d){(a=ol(a,b,!0))&&W(a.controller.b,a.propertyName).add(c,d)};r(\"studio.sdk.configurable.binding.addArrayInsertListener\",tl,void 0);r(\"studio.sdk.configurable.binding.removeArrayInsertListener\",function(a,b,c,d){(a=ol(a,b,!0))&&rl(W(a.controller.b,a.propertyName),c,d)},void 0);var ul=function(a,b,c,d){(a=ol(a,b,!0))&&W(a.controller.j,a.propertyName).add(c,d)};r(\"studio.sdk.configurable.binding.addArrayRemoveListener\",ul,void 0);r(\"studio.sdk.configurable.binding.removeArrayRemoveListener\",function(a,b,c,d){(a=ol(a,b,!0))&&rl(W(a.controller.j,a.propertyName),c,d)},void 0);r(\"studio.sdk.configurable.binding.addValueAddedListener\",function(a,b,c,d){(a=ol(a,b))&&W(a.controller.g,a.propertyName).add(c,d)},void 0);r(\"studio.sdk.configurable.binding.removeValueAddedListener\",function(a,b,c,d){(a=ol(a,b))&&rl(W(a.controller.g,a.propertyName),c,d)},void 0);r(\"studio.sdk.configurable.binding.addValueRemovedListener\",function(a,b,c,d){(a=ol(a,b))&&W(a.controller.h,a.propertyName).add(c,d)},void 0);r(\"studio.sdk.configurable.binding.removeValueRemovedListener\",function(a,b,c,d){(a=ol(a,b))&&rl(W(a.controller.h,a.propertyName),c,d)},void 0);var vl=function(a){var b=nl(a);if(b){ql(b);for(var c in a)if(b=a[c],u(b))for(var d=0;d<b.length;d++)w(b[d])&&vl(b[d]);else w(b)&&vl(b)}};r(\"studio.sdk.configurable.binding.fireAllListeners\",vl,void 0);var wl=function(a,b,c){var d=ol(a,b);if(d){a=d.controller;b=d.propertyName;d=d.index;var e=a.a.H(),f=e[b],k=hl(a.a,b);null==c||Dk(c)?(null!=d?(k=f,f=k[d],k[d]=c,c=k):e[b]=c,Sk(null,b,f),Sk(e,b,c),d=c,W(a.f,b).a(d),pl(a)):V(vj(a.a.a.a,k.f))}};r(\"studio.sdk.configurable.binding.update\",wl,void 0);var Bl=function(a,b){if(sk)a=xk(b);else if(!a||!Ak(a))return a;if(!a)return a;var c=Bk(a);B(c.a instanceof uk?c.a.b.O():null,function(d){var e=hl(c,d),f=a[d],k=b[d],m=null!=f?Dk(f):e.J.K()[0];if(e.b){if(u(f))for(;0<f.length;)xl(a,d,0);u(k)?B(k,y(yl,a,d)):null!=k&&yl(a,d,k,0)}else m instanceof Uk?wl(a,d,k):m instanceof uk&&(null!=k?zl(a,d,k):null!=f&&Al(a,d),null!=f&&null!=k&&Bl(f,k))});return a};r(\"studio.sdk.configurable.binding.updateAll\",Bl,void 0);var yl=function(a,b,c,d){if(b=ol(a,b,!0)){a=b.controller;b=b.propertyName;var e=d,f=a.a.H();if(d=jl(f,b)){c=hl(a.a,b).j(c);if(0>e||e>d.length)e=d.length;cb(d,e,0,c);Sk(f,b,d);W(a.b,b).a(c,e,d);pl(a)}}};r(\"studio.sdk.configurable.binding.arrayInsert\",yl,void 0);var xl=function(a,b,c){if(b=ol(a,b,!0)){a=b.controller;b=b.propertyName;var d=a.a.H(),e=jl(d,b);if(e)if(0>c||c>=e.length)a=Ek(d),V(\"Property \"+(b+(\" on type \"+(a+(\" has length \"+(e.length+(\", but invalid index \"+(c+\" was requested.\"))))))));else{var f=e[c];Xa(e,c);Sk(null,b,f);Sk(d,b,e);W(a.j,b).a(f,c,e);pl(a)}}};r(\"studio.sdk.configurable.binding.arrayRemove\",xl,void 0);var zl=function(a,b,c){if(b=ol(a,b)){a=b.controller;b=b.propertyName;var d=a.a.H(),e=d[b],f=hl(a.a,b);f?(c=f.j(c),d[b]=c,Sk(null,b,e),Sk(d,b,c),e&&W(a.h,b).a(e),W(a.g,b).a(c),pl(a)):V(\"The optional property \"+(b+\" must be a reference\"))}};r(\"studio.sdk.configurable.binding.addValue\",zl,void 0);var Al=function(a,b){if(b=ol(a,b)){a=b.controller;b=b.propertyName;var c=a.a.H();if(c[b]){var d=c[b];delete c[b];Sk(null,b,d);Sk(c,b,void 0);W(a.h,b).a(d);pl(a)}}};r(\"studio.sdk.configurable.binding.removeValue\",Al,void 0);var Cl=function(a,b,c,d){I.call(this);this.a=a;this.g=b;this.f=this.b=null;this.f=c?new ik(x(this.h,this)):new jk(x(this.h,this),d)};z(Cl,I);r(\"studio.sdk.configurable.PreviewHandler\",Cl,void 0);Cl.CallbackMethods={Mc:\"showNode\",Kc:\"hideNode\",Jc:\"changeValue\",Lc:\"showMessage\"};var Dl=function(a,b){return a?a+\".\"+b:b};Cl.prototype.h=function(a,b){switch(a){case \"updateValue\":if(3>b.length)break;a=b[0];var c=JSON.parse(b[1]);this.ua(a,c,b[2]);break;case \"addArrayItem\":if(4>b.length)break;a=b[0];var d=b[1],e=JSON.parse(b[2]);c=b[3];a=Dl(a,d);c=Ik(c,e,this.a,a);yl(this.a,a,c,-1);break;case \"removeArrayItem\":if(3>b.length)break;a=b[0];d=b[1];var f=parseInt(b[2],10);xl(this.a,Dl(a,d),f);break;case \"updateArrayValue\":if(5>b.length)break;a=b[0];d=b[1];e=JSON.parse(b[2]);c=b[3];f=parseInt(b[4],10);b=e;e=f;a=Dl(a,d);xl(this.a,a,e);c=Ik(c,b,this.a,a);yl(this.a,a,c,e);break;case \"addValue\":if(4>b.length)break;e=b[0];d=JSON.parse(b[1]);a=b[2];c=b[3];a=Dl(a,e);c=Ik(c,d,this.a,a);zl(this.a,a,c);break;case \"changeInputVariable\":if(2>b.length)break;e=b[0];El(this,e,b[1]);break;case \"removeValue\":2>b.length||(e=b[0],a=b[1],Al(this.a,Dl(a,e)))}};Cl.prototype.ua=function(a,b){D(b,function(b,d){wl(this.a,Dl(a,d),b)},this)};Cl.prototype.updateValue=Cl.prototype.ua;var El=function(a,b,c){switch(b){case \"assets\":a.g&&a.g(c);break;case \"setGdnAction\":b=c,n(b)&&(b=JSON.parse(b)),w(b)&&a.b&&D(a.b(b),function(a,b){\"@\"!=b[0]&&(b=Dl(\"\",b),a=Ik(a[\"@type\"],a,this.a,b),zl(this.a,b,a))},a)}},Gl=function(a,b){Fl.f.g(a,b)};r(\"studio.sdk.configurable.RUNTIME_MODE\",{FILLER:\"FILLER\",PLAY:\"PLAY\",TRAFFICK:\"TRAFFICK\",DEVELOPMENT:\"DEVELOPMENT\"},void 0);r(\"studio.sdk.configurable.FILLER_CONTEXT\",{CREATIVE:\"CREATIVE\",MANAGEMENT:\"MANAGEMENT\",NONE:\"NONE\"},void 0);var Hl=new J,Il=new H,Fl=null,Jl=null,Kl=!1,Ll=null,Ml=new G,Vj=null,Wj=null,Nl=!1;r(\"studio.sdk.configurable.reset\",function(){ue(ok);ue(pk);rk=qk=0;sk=!1;ue(ml);mk.ga().reset();hk.ga().reset();Jl=null;ue(Il);Fl=null;Kl=!1;Ll=null;Nl=!1},void 0);r(\"studio.sdk.configurable.getConfiguration\",function(a){sk=!0;Ol(null,a)},void 0);r(\"studio.sdk.configurable.register\",function(a,b){Ol(a,b)},void 0);var Ol=function(a,b){A(64)||h.Enabler?Pl(y(Ql,a,b)):Rl(y(Sl,a,b))};r(\"studio.sdk.configurable.addRegisterListener\",function(a){Hl.za(\"register\",a)},void 0);var Pl=function(a){if(h.Enabler){var b=h.Enabler;b.isInitialized()?a():Ve(b,\"init\",a)}else ie(Ml,y(Pl,a))};r(\"studio.sdk.configurable.setDefaultVideoPreferences\",function(a,b){Vj=a||null;Wj=b||null},void 0);var Rl=function(a){var b=h.a;mk.ga().ka(function(c,d,e){Nl||(Kl=Nl=!0,Ll=e,a(c),b&&v(b)&&b(d,e))})},Ql=function(a,b){if(!Nl){Nl=!0;var c=new Mj([new Xj],!1);hk.ga().ka(function(d){d=Nj(c,d);Sl(a,b,d)})}},Sl=function(a,b,c){c&&(c=Bl(a,c),a||(a=c));a&&A(16)?Fl=new Cl(a,Tl,!!h.Enabler.getParameter(\"useEnablerMessages\"),Ul()):A(1)||(Jl=a);b&&b(a);Hl.dispatchEvent(new Pj(\"register\"))};r(\"studio.sdk.configurable.exit\",function(a,b,c){(a=Vl(a,b,\"exit\"))&&hk.ga().b?(c=String,b=hk.ga(),b.a?(a=a.split(\"_\"),a=Bb(b.a,a[0],parseInt(a[1],10),a[2])):a=null,c=c(a),h.Enabler.Ta(\"Layout Exit\",c)):a&&h.Enabler?null!=c?h.Enabler.Ta(a,c):h.Enabler.exit(a):Kl&&(a&&0<a.length?Ll.exit(a):Ll.exit())},void 0);var Vl=function(a,b,c){if((!b||0==b.length)&&(Kl||hk.ga().b))return\"\";if(a=Hk(a,\"\")){var d=Bk(a.ra),e=a.propertyName,f=a.index;a=d;e&&(d=d.H()[e],p(f)&&(d=d[f]),(d=Bk(d))&&(a=d));d=!1;a.f&&(d=hl(a.b,a.f).B.a.contains(c+\"_\"+b));b=(d=d||a.a.f.a.contains(c+\"_\"+b))||sk?Qb(Fk(a),\"::\",b):\"\"}else b=\"\";if(!A(64)&&h.Enabler&&h.Enabler.getParameter(\"AdData\")||Kl||hk.ga().b)b?(b=b.replace(\"[\",\"_\"),b=b.replace(\"]::\",\"_\"),b=b.replace(\".\",\"_\"),gb(b,\"::\")&&(b=b.substring(2)),b=b.replace(\"::\",\"_\")):b=null;return b};r(\"studio.sdk.configurable.exitQueryString\",function(a,b,c){(a=Vl(a,b,\"exit\"))&&h.Enabler&&h.Enabler.lb(a,c)},void 0);r(\"studio.sdk.configurable.counter\",function(a,b,c){(a=Vl(a,b,\"counter\"))&&h.Enabler&&h.Enabler.Fa(a,c)},void 0);r(\"studio.sdk.configurable.startTimer\",function(a,b){(a=Vl(a,b,\"timer\"))&&h.Enabler&&h.Enabler.startTimer(a)},void 0);r(\"studio.sdk.configurable.stopTimer\",function(a,b){(a=Vl(a,b,\"timer\"))&&h.Enabler&&h.Enabler.stopTimer(a)},void 0);var Tl=function(a){Ci(h.Enabler,a)};r(\"studio.sdk.configurable.showFiller\",function(a){Fl&&Gl(\"showNode\",[a])},void 0);r(\"studio.sdk.configurable.hideFiller\",function(a){Fl&&Gl(\"hideNode\",[a])},void 0);r(\"studio.sdk.configurable.changeFillerValue\",function(a,b){Fl?(Gl(\"changeValue\",[a,b]),Fl.ua(a,b,!1)):Jl&&D(b,function(b,d){wl(Jl,Dl(a,d),b)})},void 0);r(\"studio.sdk.configurable.setTranslationMethod\",function(a){Fl&&(Fl.b=a)},void 0);r(\"studio.sdk.configurable.showMessage\",function(a){Fl&&Gl(\"showMessage\",[a])},void 0);var Ul=function(){if(!h.Enabler)return\"TRAFFICK\";switch(h.Enabler.getParameter(\"layoutsRuntime\")){case \"AUTHORING\":return\"FILLER\";case \"TESTING\":return\"PLAY\";default:return h.Enabler.isInitialized()?A(1)?\"TRAFFICK\":\"DEVELOPMENT\":\"TRAFFICK\"}};r(\"studio.sdk.configurable.getRuntimeMode\",Ul,void 0);r(\"studio.sdk.configurable.getFillerContext\",function(){if(!h.Enabler)return\"NONE\";switch(h.Enabler.getParameter(\"fillerContext\")){case \"CREATIVE_FILLER\":return\"CREATIVE\";case \"MANAGEMENT_FILLER_PREVIEW\":return\"MANAGEMENT\";default:return\"NONE\"}},void 0);var Wl=function(){zf(\"enabler\",function(){Ml.a||Ml.L()})};mf.configurable=3;if(!A(64)||!h.Enabler){var Xl=ii().f;if(Xl){var Yl=Xl.get(\"e\",null);Yl&&Ka(parseInt(Yl,10)||0)}if(A(64))Wl();else if(!A(128)){var Zl=rf();/html5/.test(Zl)&&re(qd(Zl+\"addata.js\"))}};");