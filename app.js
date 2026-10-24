"use strict";
const products=[
  {
    "id": 101,
    "name": "Lenços umedecidos",
    "category": "Cuidados infantis",
    "brand": "Essencial",
    "code": "LEN-001",
    "description": "Pacote com 100 unidades · Uso diário.",
    "type": "wipes",
    "color": "#b71927",
    "background": "#fff",
    "tag": "Em destaque"
  },
  {
    "id": 102,
    "name": "Lenços umedecidos infantis",
    "category": "Cuidados infantis",
    "brand": "Cuidado+",
    "code": "LEN-002",
    "description": "Pacote com 50 unidades · Embalagem prática.",
    "type": "wipes",
    "color": "#db3342",
    "background": "#fff",
    "tag": "Em destaque"
  },
  {
    "id": 103,
    "name": "Escova de dentes macia",
    "category": "Higiene bucal",
    "brand": "Dia a Dia",
    "code": "BUC-001",
    "description": "Uma unidade · Cerdas macias.",
    "type": "brush",
    "color": "#961421",
    "background": "#fff",
    "tag": "Linha higiene bucal"
  },
  {
    "id": 104,
    "name": "Kit de escovas de dentes",
    "category": "Higiene bucal",
    "brand": "Essencial",
    "code": "BUC-002",
    "description": "Kit com 3 unidades · Para a rotina da família.",
    "type": "brush",
    "color": "#b71927",
    "background": "#fff",
    "tag": "Linha higiene bucal"
  },
  {
    "id": 105,
    "name": "Kit shampoo e condicionador",
    "category": "Cabelos",
    "brand": "Cuidado+",
    "code": "CAB-001",
    "description": "Shampoo 300 ml + condicionador 300 ml.",
    "type": "kit",
    "color": "#db3342",
    "background": "#fff",
    "tag": "Linha cabelos"
  },
  {
    "id": 106,
    "name": "Shampoo infantil",
    "category": "Cuidados infantis",
    "brand": "Dia a Dia",
    "code": "INF-001",
    "description": "Frasco de 200 ml · Linha infantil.",
    "type": "bottle",
    "color": "#961421",
    "background": "#fff",
    "tag": "Linha cuidados infantis"
  },
  {
    "id": 107,
    "name": "Sabonete líquido para mãos",
    "category": "Banho e corpo",
    "brand": "Essencial",
    "code": "BAN-001",
    "description": "Frasco com válvula · 250 ml.",
    "type": "pump",
    "color": "#b71927",
    "background": "#fff",
    "tag": "Linha banho e corpo"
  },
  {
    "id": 108,
    "name": "Sabonete líquido corporal",
    "category": "Banho e corpo",
    "brand": "Cuidado+",
    "code": "BAN-002",
    "description": "Frasco de 400 ml · Banho e cuidados diários.",
    "type": "pump",
    "color": "#db3342",
    "background": "#fff",
    "tag": "Linha banho e corpo"
  },
  {
    "id": 109,
    "name": "Creme dental",
    "category": "Higiene bucal",
    "brand": "Dia a Dia",
    "code": "BUC-003",
    "description": "Bisnaga de 90 g · Higiene bucal diária.",
    "type": "tube",
    "color": "#961421",
    "background": "#fff",
    "tag": "Linha higiene bucal"
  },
  {
    "id": 110,
    "name": "Hidratante corporal",
    "category": "Banho e corpo",
    "brand": "Essencial",
    "code": "BAN-003",
    "description": "Frasco de 200 ml · Cuidados com a pele.",
    "type": "bottle",
    "color": "#b71927",
    "background": "#fff",
    "tag": "Linha banho e corpo"
  },
  {
    "id": 111,
    "name": "Hastes flexíveis",
    "category": "Acessórios de higiene",
    "brand": "Cuidado+",
    "code": "HIG-001",
    "description": "Embalagem com 75 unidades.",
    "type": "box",
    "color": "#db3342",
    "background": "#fff",
    "tag": "Linha acessórios de higiene"
  },
  {
    "id": 112,
    "name": "Algodão em discos",
    "category": "Acessórios de higiene",
    "brand": "Dia a Dia",
    "code": "HIG-002",
    "description": "Pacote com 50 unidades · Cuidados pessoais.",
    "type": "box",
    "color": "#961421",
    "background": "#fff",
    "tag": "Linha acessórios de higiene"
  }
];
const el=id=>document.getElementById(id);
const config=window.STORE_CONFIG||{};
let cart={},category="Todos",brand="Todas as marcas",toastTimer;
try{const saved=JSON.parse(localStorage.getItem("vitrine-cart")||"{}");if(saved&&typeof saved==="object"&&!Array.isArray(saved))cart=saved;}catch{}
for(const key of Object.keys(cart))if(!products.some(p=>String(p.id)===key)||!Number.isInteger(cart[key])||cart[key]<1||cart[key]>999)delete cart[key];
function illustration(p){
const shapes={"wipes":"<rect x=\"8\" y=\"38\" width=\"104\" height=\"67\" rx=\"16\" fill=\"COLOR\"/><path d=\"M12 51h96M12 94h96\" stroke=\"#fff\" opacity=\".25\"/><rect x=\"31\" y=\"29\" width=\"58\" height=\"27\" rx=\"10\" fill=\"#eee\"/><rect x=\"40\" y=\"35\" width=\"40\" height=\"12\" rx=\"6\" fill=\"#fff\"/><text x=\"60\" y=\"78\" text-anchor=\"middle\" fill=\"#fff\" font-size=\"10\">LENÇOS</text><text x=\"60\" y=\"91\" text-anchor=\"middle\" fill=\"#fff\" font-size=\"8\">UMEDECIDOS</text>","brush":"<g transform=\"rotate(18 60 60)\"><rect x=\"49\" y=\"18\" width=\"19\" height=\"95\" rx=\"9\" fill=\"COLOR\"/><rect x=\"44\" y=\"4\" width=\"29\" height=\"39\" rx=\"10\" fill=\"#eee\"/><path d=\"M49 11v23m6-23v23m6-23v23m6-23v23\" stroke=\"COLOR\" stroke-width=\"3\"/><path d=\"M55 58v39\" stroke=\"#fff\" stroke-width=\"5\" stroke-linecap=\"round\"/></g>","bottle":"<rect x=\"38\" y=\"7\" width=\"44\" height=\"15\" rx=\"4\" fill=\"COLOR\"/><path d=\"M39 22h42l10 17v68q0 10-10 10H39q-10 0-10-10V39z\" fill=\"#f5f5f5\" stroke=\"#ddd\"/><rect x=\"29\" y=\"47\" width=\"62\" height=\"48\" rx=\"4\" fill=\"COLOR\"/><path d=\"M40 58h40m-40 8h30\" stroke=\"#fff\" opacity=\".5\"/><text x=\"60\" y=\"84\" text-anchor=\"middle\" fill=\"#fff\" font-size=\"8\">CUIDADOS</text>","pump":"<path d=\"M61 28V13h30\" stroke=\"COLOR\" stroke-width=\"10\" fill=\"none\" stroke-linecap=\"round\"/><rect x=\"42\" y=\"23\" width=\"35\" height=\"11\" rx=\"3\" fill=\"COLOR\"/><rect x=\"25\" y=\"34\" width=\"70\" height=\"82\" rx=\"15\" fill=\"#f4f4f4\" stroke=\"#ddd\"/><rect x=\"25\" y=\"54\" width=\"70\" height=\"42\" fill=\"COLOR\"/><text x=\"60\" y=\"72\" text-anchor=\"middle\" fill=\"#fff\" font-size=\"8\">SABONETE</text><text x=\"60\" y=\"85\" text-anchor=\"middle\" fill=\"#fff\" font-size=\"8\">LÍQUIDO</text>","tube":"<path d=\"M32 12h56l-8 84H40z\" fill=\"#f5f5f5\" stroke=\"#ddd\"/><path d=\"M35 31h50l-4 46H39z\" fill=\"COLOR\"/><rect x=\"40\" y=\"96\" width=\"40\" height=\"20\" rx=\"4\" fill=\"COLOR\"/><text x=\"60\" y=\"54\" text-anchor=\"middle\" fill=\"#fff\" font-size=\"8\">CREME</text><text x=\"60\" y=\"66\" text-anchor=\"middle\" fill=\"#fff\" font-size=\"8\">DENTAL</text>","box":"<rect x=\"21\" y=\"30\" width=\"78\" height=\"78\" rx=\"10\" fill=\"#f5f5f5\" stroke=\"#ddd\"/><rect x=\"18\" y=\"24\" width=\"84\" height=\"17\" rx=\"5\" fill=\"COLOR\"/><rect x=\"21\" y=\"56\" width=\"78\" height=\"33\" fill=\"COLOR\"/><text x=\"60\" y=\"76\" text-anchor=\"middle\" fill=\"#fff\" font-size=\"8\">HIGIENE</text>","kit":"<g transform=\"translate(-6 4) scale(.82)\"><rect x=\"38\" y=\"7\" width=\"44\" height=\"15\" rx=\"4\" fill=\"COLOR\"/><path d=\"M39 22h42l10 17v68q0 10-10 10H39q-10 0-10-10V39z\" fill=\"#f5f5f5\" stroke=\"#ddd\"/><rect x=\"29\" y=\"47\" width=\"62\" height=\"48\" rx=\"4\" fill=\"COLOR\"/><path d=\"M40 58h40m-40 8h30\" stroke=\"#fff\" opacity=\".5\"/><text x=\"60\" y=\"84\" text-anchor=\"middle\" fill=\"#fff\" font-size=\"8\">CUIDADOS</text></g><g transform=\"translate(47 20) scale(.78)\"><rect x=\"38\" y=\"7\" width=\"44\" height=\"15\" rx=\"4\" fill=\"COLOR\"/><path d=\"M39 22h42l10 17v68q0 10-10 10H39q-10 0-10-10V39z\" fill=\"#f5f5f5\" stroke=\"#ddd\"/><rect x=\"29\" y=\"47\" width=\"62\" height=\"48\" rx=\"4\" fill=\"COLOR\"/><path d=\"M40 58h40m-40 8h30\" stroke=\"#fff\" opacity=\".5\"/><text x=\"60\" y=\"84\" text-anchor=\"middle\" fill=\"#fff\" font-size=\"8\">CUIDADOS</text></g>"};
return '<svg viewBox="0 0 120 125" aria-hidden="true">'+shapes[p.type].replaceAll("COLOR",p.color)+'</svg>';
}
function renderProducts(){
const query=el("search").value.trim().toLocaleLowerCase("pt-BR");
const shown=products.filter(p=>(category==="Todos"||p.category===category)&&(brand==="Todas as marcas"||p.brand===brand)&&(p.name+" "+p.code+" "+p.brand).toLocaleLowerCase("pt-BR").includes(query));
el("count").textContent=shown.length+" produtos";
el("products").innerHTML=shown.map(p=>'<article class="card"><div class="art" style="background:'+p.background+'"><span class="tag">'+p.tag+'</span>'+illustration(p)+'</div><div class="info"><div class="code">'+p.code+' · '+p.brand+'</div><h3>'+p.name+'</h3><div class="description">'+p.description+'</div><div class="price">'+'Consulte'+'</div><button class="add" data-action="add" data-id="'+p.id+'">+ Adicionar ao pedido</button></div></article>').join("")||'<p class="muted">Nenhum produto encontrado. Tente outra busca.</p>';
}
function selected(){return products.filter(p=>cart[p.id]);}
function whatsappAvailable(){return config.whatsappEnabled===true&&/^55[1-9]\d{9,10}$/.test(config.sellerWhatsApp||"");}
function renderCart(){
const items=selected(),quantity=items.reduce((sum,p)=>sum+cart[p.id],0);
el("cart").innerHTML=items.map(p=>'<div class="line"><div class="line-top"><strong>'+p.name+'</strong><button class="remove" data-action="remove" data-id="'+p.id+'" aria-label="Remover '+p.name+'">×</button></div><div class="controls"><button data-action="minus" data-id="'+p.id+'" aria-label="Diminuir quantidade de '+p.name+'">−</button><span>'+cart[p.id]+'</span><button data-action="add" data-id="'+p.id+'" aria-label="Aumentar quantidade de '+p.name+'">+</button><strong>'+'Consulte'+'</strong></div></div>').join("")||'<div class="empty">Sua lista está esperando por você.<br>Adicione seus produtos favoritos.</div>';
el("total").textContent="Consulte";
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
return ["PEDIDO — "+(config.storeName||"Vitrine"),"Cliente: "+(el("customer").value.trim()||"Não informado"),"WhatsApp: "+(el("phone").value.trim()||"Não informado"),"",...selected().map(p=>cart[p.id]+" × "+p.name+" — "+p.brand+" ("+p.code+") — "+'Consulte'),"","Valores: consulte o vendedor","Observações: "+(el("notes").value.trim()||"Sem observações"),"","Disponibilidade, frete e prazo sujeitos à confirmação do vendedor."].join("\n");
}
el("filters").innerHTML=["Todos",...new Set(products.map(p=>p.category))].map(c=>'<button type="button" class="'+(c==="Todos"?"active":"")+'" aria-pressed="'+(c==="Todos")+'">'+c+'</button>').join("");
el("filters").addEventListener("click",event=>{
const button=event.target.closest("button");if(!button)return;
category=button.textContent;
el("filters").querySelectorAll("button").forEach(b=>{b.classList.toggle("active",b===button);b.setAttribute("aria-pressed",String(b===button));});
renderProducts();
});
el("search").addEventListener("input",renderProducts);
el("brandFilter").innerHTML='<option>Todas as marcas</option>'+[...new Set(products.map(p=>p.brand))].map(b=>'<option>'+b+'</option>').join("");
el("brandFilter").addEventListener("change",()=>{brand=el("brandFilter").value;renderProducts();});
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
