import { Phones, Laptop, SingleProduct, deleteItem } from "./service.js";

const PhonesBlock = document.querySelector(".box");
const LaptopBlock = document.querySelector(".laptop");
const modal = document.querySelector(".modal_section");
const modalDiv = document.querySelector(".modal_block");
const ModalClose = document.querySelector(".modal_close");
const modalBg = document.querySelector(".modal_bg");
const Drawer = document.querySelector(".Drawer");
const DrawerOpen = document.querySelector(".drawer_open");
const CloseDrawer = document.querySelector(".closeDrawer");
const LocalDiv = document.querySelector(".DataStorageBlock");
const delBtn = document.getElementsByClassName("remove_btn");

const Catalog = async () => {
  const data = await Phones();
  const sliceItem = data.slice(0, 4);
  PhonesBlock.innerHTML = sliceItem
    .map(
      (item) => `

 <div class="py-[10px] px-[10px] w-[250px] h-[450px] grid flex-col bg-teal-700 rounded-[10px]">
 <img class="text-center mx-auto w-[266px] h-[266px]" src="${item.img}" alt="#" />
 <h1 class="mb-[10px] text-white">${item.title}</h1>
 <button class="btns py-[5px] px-[5px] bg-green-400 text-white" data-title="phones" data-id="${item.id}">About Product</button>
 </div>
  `
    )
    .join("");
};

Catalog();

const LaptopEl = async () => {
  const data = await Laptop();
  const sliceItem = data.slice(0, 4);
  LaptopBlock.innerHTML = sliceItem
    .map(
      (item) => `
  
   <div class="grid flex-col py-[10px] px-[10px] w-[250px] h-[450px] justify-between bg-indigo-600 rounded-[10px]">
   <img class="text-center mx-auto" src="${item.img}" alt="#" />
   <h1 class="mb-[10px] text-white">${item.title}</h1>
 <button class="btns py-[5px] px-[5px] bg-green-400 text-white" data-id="${item.id}" data-title="notebook">About Product</button>
   </div>
    `
    )
    .join("");
};

LaptopEl();

const saveLocal = (data) => {
  const oldProducts = JSON.parse(localStorage.getItem("Products"));

  localStorage.setItem(
    "Products",
    JSON.stringify([data, ...(oldProducts || [])])
  );
};

const OpenModal = (data) => {
  modalDiv.style.display = "block";
  ModalClose.style.display = "block";
  modalBg.style.display = "block";
  modalDiv.innerHTML = `
  <div class="text-center grid item-center">
  <img class="mx-auto mb-[10px]" src="${data.img}" alt="#" />
  <h1 class="text-white text-[25px]">${data.title}</h1>
  <p class="text-white text-[20px]">Color : ${data.color}</p>
  <p class="text-white text-[20px]"> Rame : ${data.rame || "No Rame"}</p>
  <p class="text-white text-[20px] mb-[10px]">Price : ${data.price} Sum</p>
  <button class="Local_btn py-[10px] px-[10px] text-white bg-[#333]">Add</button>
  </div>
  `;
  const StorageBtn = document.querySelector(".Local_btn");
  StorageBtn.addEventListener("click", () => {
    saveLocal(data);
  });
};

modal.addEventListener("click", async (e) => {
  const ItemId = e.target.dataset.id;
  const ItemTitle = e.target.dataset.title;
  if (ItemId) {
    const data = await SingleProduct(ItemTitle, ItemId);
    OpenModal(data);
  }
});

ModalClose.addEventListener("click", async (e) => {
  modalDiv.style.display = "none ";
  ModalClose.style.display = "none";
  modalBg.style.display = "none";
});

DrawerOpen.addEventListener("click", () => {
  Drawer.classList.add("open");
});

CloseDrawer.addEventListener("click", () => {
  Drawer.classList.remove("open");
});

//
const LocalInterface = () => {
  const getProducts = localStorage.getItem("Products");
  const products = JSON.parse(getProducts) || [];
  LocalDiv.innerHTML += products
    .map(
      (item) => `
            <div class="mb-[15px] text-center py-[10px] px-[10px] bg-white rounded-[20px]">
              <img class="mx-auto" src="${item.img}" alt="#" width="150">
              <h2 class="text-black text-[25px]">${item.title}</h2>
              <p class="text-black text-[20px]">Color: ${item.color}</p>
              <p class="text-black text-[20px]">Rame: ${
                item.rame || "No rame"
              }</p>
              <p class="text-black text-[20px] mb-[10px]">Price: ${
                item.price
              } Sum</p>
              <button data-delTitle="phones" class="remove_btn py-[10px] px-[10px] bg-red-700 text-white" data-remove="${
                item.id
              }">Remove</button>
            </div> `
    )
    .join("");
};
LocalInterface();

Drawer.addEventListener("click", async (e) => {
  const delItem = e.target.dataset.remove;
  if (delItem) {
    await deleteItem(delItem);
    console.log(await deleteItem(delItem));
  }
  LocalInterface();
});
