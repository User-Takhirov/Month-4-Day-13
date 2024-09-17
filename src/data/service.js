const url = "https://data-lesson-13.vercel.app";

export const Phones = async () => {
  try {
    const res = await fetch(`${url}/phones`);
    const data = await res.json();
    return data;
  } catch (error) {
    return error.message;
  }
};

export const Laptop = async () => {
  try {
    const res = await fetch(`${url}/notebook`);
    const data = await res.json();
    return data;
  } catch (error) {
    return error.message;
  }
};

export const SingleProduct = async (name, ItemId) => {
  try {
    const res = await fetch(`${url}/${name}/${ItemId}`);
    const data = await res.json();
    return data;
  } catch (error) {
    return error.message;
  }
};

export const deleteItem = async (delItem) => {
  try {
    const res = await fetch(`${url}/phones/${delItem}`, {
      method: "DELETE",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error.message;
  }
};
