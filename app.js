"use strict";
const products=[
{id:1,name:"Caneca personalizada",category:"Canecas",price:20,code:"CAN-001",description:"Um presente especial para todos os dias.",type:"mug",color:"#d4b994",background:"#f0e8dd",tag:"Mais vendido"},
{id:2,name:"Chaveiro coração",category:"Chaveiros",price:20,code:"CHA-002",description:"Delicado, prático e cheio de carinho.",type:"heart",color:"#cc8d80",background:"#f5e8e3",tag:"Favorito"},
{id:3,name:"Porta lápis maçã",category:"Organizadores",price:55,code:"ORG-003",description:"Um toque de charme na mesa de trabalho.",type:"apple",color:"#b65b4b",background:"#f0e5df",tag:"Destaque"},
{id:4,name:"Copo personalizado",category:"Copos",price:25,code:"COP-004",description:"Sua bebida favorita com a sua identidade.",type:"cup",color:"#82a495",background:"#e7eee7",tag:"Personalizável"},
{id:5,name:"Chaveiro porta batom",category:"Chaveiros",price:25,code:"CHA-005",description:"Seu batom sempre por perto.",type:"case",color:"#b18ca6",background:"#eee6eb",tag:"Novidade"},
{id:6,name:"Suporte para celular",category:"Organizadores",price:35,code:"ORG-006",description:"Mais conforto para sua rotina.",type:"stand",color:"#bba27f",background:"#ece9df",tag:"Prático"}
];
const el=id=>document.getElementById(id);
const money=value=>value.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const config=window.STORE_CONFIG||{};
let cart={},category="Todos",toastTimer;
try{const saved=JSON.parse(localStorage.getItem("vitrine-cart")||"{}");if(saved&&typeof saved==="object"&&!Array.isArray(saved))cart=saved;}catch{}
for(const key of Object.keys(cart))if(!products.some(p=>String(p.id)===key)||!Number.isInteger(cart[key])||cart[key]<1||cart[key]>999)delete cart[key];
function illustration(p){
const shapes={
mug:'<path d="M75 37h12c25 0 25 38 0 38H75" fill="none" stroke="COLOR" stroke-width="9"/><path d="M22 26h58v67q0 14-14 14H36q-14 0-14-14z" fill="COLOR"/><path d="M33 34h5v57" stroke="#fff" opacity=".3" stroke-width="5"/><text x="50" y="72" text-anchor="middle" fill="#fff" font-size="24">♡</text>',
heart:'<circle cx="60" cy="17" r="12" fill="none" stroke="#bda26b" stroke-width="5"/><path d="M60 35C12 0 0 64 60 103C120 64 108 0 60 35" fill="COLOR"/><path d="M28 48q0-14 14-14" stroke="#fff" opacity=".3" stroke-width="5" fill="none"/>',
apple:'<path d="M60 33C10 8 2 68 30 104q15 15 30 3q15 12 30-3C118 68 110 8 60 33" fill="COLOR"/><ellipse cx="60" cy="32" rx="25" ry="9" fill="#703d37"/><path d="M57 30V7m5 9q16-23 25-10q-4 16-25 10" stroke="#487452" stroke-width="6" fill="#487452"/>',
cup:'<path d="M32 22h56l-7 88H39z" fill="COLOR"/><rect x="28" y="18" width="64" height="8" rx="4" fill="#527b70"/><path d="M64 20V0" stroke="#58796e" stroke-width="5"/><path d="M43 36l4 58" stroke="#fff" opacity=".4" stroke-width="5"/>',
case:'<circle cx="60" cy="15" r="11" fill="none" stroke="#bda26b" stroke-width="4"/><rect x="36" y="32" width="48" height="80" rx="18" fill="COLOR"/><path d="M36 59h48" stroke="#88647f" stroke-width="2"/><text x="60" y="89" text-anchor="middle" font-size="20" fill="white">♡</text>',
stand:'<path d="M24 97h74v12H24zM35 97l26-70h16l-21 70" fill="COLOR"/><rect x="52" y="8" width="39" height="72" rx="7" fill="#364b46" transform="rotate(12 72 44)"/><rect x="58" y="16" width="27" height="51" rx="3" fill="#bcd2c6" transform="rotate(12 72 44)"/>'
};
return '<svg viewBox="0 0 120 125" aria-hidden="true">'+shapes[p.type].replaceAll("COLOR",p.color)+'</svg>';
}
function renderProducts(){
const query=el("search").value.trim().toLocaleLowerCase("pt-BR");
const shown=products.filter(p=>(category==="Todos"||p.category===category)&&(p.name+" "+p.code).toLocaleLowerCase("pt-BR").includes(query));
el("count").textContent=shown.length+" produtos";
el("products").innerHTML=shown.map(p=>'<article class="card"><div class="art" style="background:'+p.background+'"><span class="tag">'+p.tag+'</span>'+illustration(p)+'</div><div class="info"><div class="code">'+p.code+'</div><h3>'+p.name+'</h3><div class="description">'+p.description+'</div><div class="price">'+money(p.price)+'</div><button class="add" data-action="add" data-id="'+p.id+'">+ Adicionar ao pedido</button></div></article>').join("")||'<p class="muted">Nenhum produto encontrado. Tente outra busca.</p>';
}
function selected(){return products.filter(p=>cart[p.id]);}
function whatsappAvailable(){return config.whatsappEnabled===true&&/^55[1-9]\d{9,10}$/.test(config.sellerWhatsApp||"");}
function renderCart(){
const items=selected(),quantity=items.reduce((sum,p)=>sum+cart[p.id],0);
el("cart").innerHTML=items.map(p=>'<div class="line"><div class="line-top"><strong>'+p.name+'</strong><button class="remove" data-action="remove" data-id="'+p.id+'" aria-label="Remover '+p.name+'">×</button></div><div class="controls"><button data-action="minus" data-id="'+p.id+'" aria-label="Diminuir quantidade de '+p.name+'">−</button><span>'+cart[p.id]+'</span><button data-action="add" data-id="'+p.id+'" aria-label="Aumentar quantidade de '+p.name+'">+</button><strong>'+money(p.price*cart[p.id])+'</strong></div></div>').join("")||'<div class="empty">Sua lista está esperando por você.<br>Adicione seus produtos favoritos.</div>';
el("total").textContent=money(items.reduce((sum,p)=>sum+p.price*cart[p.id],0));
el("badge").textContent=quantity;
el("quantity").textContent=quantity+(quantity===1?" item":" itens");
el("copy").disabled=!items.length;
el("send").disabled=!items.length||!whatsappAvailable();
el("send").textContent=whatsappAvailable()?"Enviar pedido pelo WhatsApp ↗":"Envio pelo WhatsApp desativado";
el("configNotice").textContent=whatsappAvailable()?"Revise sua lista e envie para atendimento.":"O envio pelo WhatsApp está desativado. Você pode montar o pedido e copiar sua lista de compras.";
try{localStorage.setItem("vitrine-cart",JSON.stringify(cart));}catch{}
}
function notify(text){el("toast").textContent=text;el("toast").style.display="block";clearTimeout(toastTimer);toastTimer=setTimeout(()=>el("toast").style.display="none",3000);}
function orderMessage(){
return ["PEDIDO — "+(config.storeName||"Vitrine"),"Cliente: "+(el("customer").value.trim()||"Não informado"),"WhatsApp: "+(el("phone").value.trim()||"Não informado"),"",...selected().map(p=>cart[p.id]+" × "+p.name+" ("+p.code+") — "+money(p.price*cart[p.id])),"","Total dos produtos: "+el("total").textContent,"Observações: "+(el("notes").value.trim()||"Sem observações"),"","Disponibilidade, frete e prazo sujeitos à confirmação do vendedor."].join("\n");
}
el("filters").innerHTML=["Todos",...new Set(products.map(p=>p.category))].map(c=>'<button type="button" class="'+(c==="Todos"?"active":"")+'" aria-pressed="'+(c==="Todos")+'">'+c+'</button>').join("");
el("filters").addEventListener("click",event=>{
const button=event.target.closest("button");if(!button)return;
category=button.textContent;
el("filters").querySelectorAll("button").forEach(b=>{b.classList.toggle("active",b===button);b.setAttribute("aria-pressed",String(b===button));});
renderProducts();
});
el("search").addEventListener("input",renderProducts);
document.addEventListener("click",event=>{
const button=event.target.closest("button[data-action]");if(!button)return;
const id=Number(button.dataset.id);if(!products.some(p=>p.id===id))return;
const action=button.dataset.action;
if(action==="add"){if((cart[id]||0)>=999){notify("Limite de 999 unidades por produto.");return;}cart[id]=(cart[id]||0)+1;}
if(action==="minus"){if(cart[id]>1)cart[id]--;else delete cart[id];}
if(action==="remove")delete cart[id];
renderCart();if(action==="add")notify("Produto adicionado ao pedido.");
});
el("checkout").addEventListener("submit",event=>{
event.preventDefault();
if(!whatsappAvailable()||!selected().length)return;
if(!el("customer").value.trim()||el("phone").value.replace(/\D/g,"").length<10){notify("Informe seu nome e um WhatsApp com DDD.");return;}
window.open("https://wa.me/"+config.sellerWhatsApp+"?text="+encodeURIComponent(orderMessage()),"_blank","noopener,noreferrer");
});
el("copy").addEventListener("click",async()=>{
if(!selected().length)return;
try{await navigator.clipboard.writeText(orderMessage());notify("Lista copiada!");}
catch{const field=document.createElement("textarea");field.value=orderMessage();document.body.appendChild(field);field.select();const copied=document.execCommand("copy");field.remove();notify(copied?"Lista copiada!":"Seu navegador não permitiu copiar a lista.");}
});
renderProducts();renderCart();
