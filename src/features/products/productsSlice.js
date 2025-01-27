import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductsAsync = createAsyncThunk(
  "products/fetch",
  async () => {
    const response = await axios.get(
      "https://musicmart-backend.vercel.app/products"
    );

    return response.data;
  }
);

export const updateFavouriteItem = createAsyncThunk(
  "product/favourite",
  async ({ productId, isFavourite }) => {
    const response = await axios.post(
      `https://musicmart-backend.vercel.app/product/favourite/${productId}`,
      { isFavourite }
    );

    return response.data;
  }
);

export const fetchFavouriteItems = createAsyncThunk(
  "products/favourite",
  async () => {
    const response = await axios.get(
      "https://musicmart-backend.vercel.app/favouriteItems"
    );

    return response.data;
  }
);

export const updateCartList = createAsyncThunk(
  "product/cart",
  async ({ productId, isInCart }) => {
    const response = await axios.post(
      `https://musicmart-backend.vercel.app/product/cart/${productId}`,
      { isInCart }
    );
    return response.data;
  }
);

export const fetchCartItems = createAsyncThunk("products/cart", async () => {
  const response = await axios.get(
    "https://musicmart-backend.vercel.app/cartItems"
  );
  return response.data;
});

export const fetchProductDetails = createAsyncThunk(
  "product/fetch",
  async (productId) => {
    const response = await axios.get(
      `https://musicmart-backend.vercel.app/products/${productId}`
    );
    return response.data;
  }
);

export const updateCartQuantity = createAsyncThunk(
  "product/cartQuantity",
  async ({ productId, cartQuantity }) => {
    const response = await axios.post(
      "https://musicmart-backend.vercel.app/product/cart_quantity",
      { productId, cartQuantity }
    );
    return response.data;
  }
);

export const fetchShippingAddresses = createAsyncThunk(
  "addresses/fetch",
  async () => {
    const response = await axios.get(
      "https://musicmart-backend.vercel.app/shipping_addresses"
    );

    return response.data;
  }
);

export const addNewAddress = createAsyncThunk(
  "address/add-new",
  async (address) => {
    const response = await axios.post(
      "https://musicmart-backend.vercel.app/add_ship_address",
      address
    );

    return response.data;
  }
);

export const updateDeliveryAddress = createAsyncThunk(
  "address/update",
  async (updatedAddress) => {
    const response = await axios.post(
      "https://musicmart-backend.vercel.app/update_address_deliver",
      updatedAddress
    );
    return response.data;
  }
);

export const updateAddressDetails = createAsyncThunk(
  "update/address-details",
  async ({ dataToUpdate, addressId }) => {
    const response = await axios.post(
      "https://musicmart-backend.vercel.app/update_address_details",
      { dataToUpdate, addressId }
    );
    return response.data;
  }
);

export const deleteAddress = createAsyncThunk(
  "address/delete",
  async (addressId) => {
    const response = await axios.delete(
      `https://musicmart-backend.vercel.app/delete_address/${addressId}`
    );
    return response.data;
  }
);

export const fetchUserProfile = createAsyncThunk("profile/fetch", async () => {
  const response = await axios.get(
    "https://musicmart-backend.vercel.app/user_profile_info"
  );
  return response.data;
});

export const updateUserProfile = createAsyncThunk(
  "profile/update",
  async (data) => {
    const { profileId, dataToUpdate } = data;
    const response = await axios.post(
      "https://musicmart-backend.vercel.app/update_user_profile",
      { profileId, dataToUpdate }
    );
    return response.data;
  }
);

export const fetchAllOrders = createAsyncThunk("orders/fetch", async () => {
  const response = await axios.get(
    "https://musicmart-backend.vercel.app/order_items"
  );
  return response.data;
});

export const addCartItemsToOrders = createAsyncThunk(
  "products/ordered",
  async ({ orderedItems, deliveryAddress }) => {
    const response = await axios.post(
      "https://musicmart-backend.vercel.app/move_cart_to_order",
      { orderedItems, deliveryAddress }
    );
    return response.data;
  }
);

export const fetchOrderDetails = createAsyncThunk(
  "order-details/fetch",
  async (orderId) => {
    const response = await axios.get(
      `https://musicmart-backend.vercel.app/order-details/${orderId}`
    );
    return response.data;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    cartItems: [],
    favouriteItems: [],
    shipAddresses: [],
    allOrders: [],
    productDetails: null,
    profileInfo: null,
    orderDetails: null,
    searchInputText: "",
    status: "idle",
    error: null,
  },
  reducers: {
    saveSearchInput: (state, action) => {
      state.searchInputText = action.payload.toLowerCase();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductsAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      state.products = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchProductsAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    //favourites
    builder.addCase(fetchFavouriteItems.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchFavouriteItems.fulfilled, (state, action) => {
      state.favouriteItems = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchFavouriteItems.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(updateFavouriteItem.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateFavouriteItem.fulfilled, (state, action) => {
      const updatedItem = action.payload?.updatedItem;
      const newFavouriteItem = action.payload?.newFavouriteItem;

      if (newFavouriteItem) {
        state.favouriteItems.push(newFavouriteItem);
      } else {
        state.favouriteItems = state.favouriteItems.filter(
          (product) => product.item._id !== updatedItem._id
        );
      }

      if (state.products.length > 0) {
        const itemIndex = state.products.findIndex(
          (product) => product._id === updatedItem._id
        );
        if (itemIndex >= 0) {
          state.products[itemIndex].isFavourite = updatedItem.isFavourite;
        }
      }

      if (state.productDetails?._id === updatedItem._id) {
        state.productDetails = updatedItem;
      }

      state.status = "success";
    });
    builder.addCase(updateFavouriteItem.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    //cart
    builder.addCase(fetchCartItems.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchCartItems.fulfilled, (state, action) => {
      state.cartItems = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchCartItems.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(updateCartList.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateCartList.fulfilled, (state, action) => {
      const updatedItemId = action.payload?.updatedItem._id;
      const newCartItem = action.payload?.newCartItem;

      if (newCartItem) {
        const itemMovedToCart = state.favouriteItems.find(
          (product) => product.item._id === newCartItem?.item?._id
        );

        if (itemMovedToCart) {
          itemMovedToCart.item.isInCart = true;
        }
        state.cartItems.push(newCartItem);
      } else {
        state.cartItems = state.cartItems.filter(
          (product) => product.item._id !== updatedItemId
        );
      }

      if (state.products.length > 0) {
        const itemIndex = state.products.findIndex(
          (product) => product._id === updatedItemId
        );

        if (itemIndex >= 0) {
          state.products[itemIndex].isInCart =
            action.payload.updatedItem.isInCart;
        }
      }

      if (state.productDetails?._id === updatedItemId) {
        state.productDetails = action.payload.updatedItem;
      }

      state.status = "success";
    });
    builder.addCase(updateCartList.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(updateCartQuantity.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateCartQuantity.fulfilled, (state, action) => {
      const cartItemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem._id === action.payload._id
      );
      if (cartItemIndex >= 0) {
        state.cartItems[cartItemIndex].cartQuantity =
          action.payload.cartQuantity;
      }
      state.status = "success";
    });
    builder.addCase(updateCartQuantity.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    //product data
    builder.addCase(fetchProductDetails.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchProductDetails.fulfilled, (state, action) => {
      state.productDetails = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchProductDetails.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    //address
    builder.addCase(fetchShippingAddresses.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchShippingAddresses.fulfilled, (state, action) => {
      state.shipAddresses = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchShippingAddresses.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(addNewAddress.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addNewAddress.fulfilled, (state, action) => {
      state.status = "success";
      const { savedAddress, updatedAddress } = action.payload;
      state.shipAddresses.push(savedAddress);
      const addressToUpdate = state.shipAddresses.find(
        (address) => address._id === updatedAddress._id
      );
      if (addressToUpdate) {
        addressToUpdate.isDeliver = updatedAddress.isDeliver;
      }
    });
    builder.addCase(addNewAddress.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(updateDeliveryAddress.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateDeliveryAddress.fulfilled, (state, action) => {
      state.status = "success";
      const toDeliver = action.payload[0];
      const notToDeliver = action.payload[1];
      const toDeliverIndex = state.shipAddresses.findIndex(
        (address) => address._id === toDeliver._id
      );
      const notToDeliverIndex = state.shipAddresses.findIndex(
        (address) => address._id === notToDeliver._id
      );

      if (toDeliverIndex >= 0 || notToDeliver >= 0) {
        state.shipAddresses[toDeliverIndex].isDeliver = toDeliver.isDeliver;
        state.shipAddresses[notToDeliverIndex].isDeliver =
          notToDeliver.isDeliver;
      }
    });
    builder.addCase(updateDeliveryAddress.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(updateAddressDetails.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateAddressDetails.fulfilled, (state, action) => {
      const { updatedAddress } = action.payload;

      const findAddressindex = state.shipAddresses.findIndex(
        (address) => address._id === updatedAddress._id
      );

      if (findAddressindex !== -1) {
        state.shipAddresses[findAddressindex] = updatedAddress;
      }

      state.status = "success";
    });
    builder.addCase(updateAddressDetails.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(deleteAddress.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteAddress.fulfilled, (state, action) => {
      state.shipAddresses = state.shipAddresses.filter(
        (address) => address._id !== action.payload.deletedAddress._id
      );
      state.status = "success";
    });
    builder.addCase(deleteAddress.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    //profile
    builder.addCase(fetchUserProfile.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.profileInfo = action.payload[0];
      state.status = "success";
    });
    builder.addCase(fetchUserProfile.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(updateUserProfile.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.status = "success";
      state.profileInfo = action.payload.updatedData;
    });
    builder.addCase(updateUserProfile.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(addCartItemsToOrders.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addCartItemsToOrders.fulfilled, (state, action) => {
      state.status = "success";
    });
    builder.addCase(addCartItemsToOrders.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(fetchAllOrders.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchAllOrders.fulfilled, (state, action) => {
      state.allOrders = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchAllOrders.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(fetchOrderDetails.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchOrderDetails.fulfilled, (state, action) => {
      state.orderDetails = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchOrderDetails.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export const { saveSearchInput } = productsSlice.actions;

export default productsSlice.reducer;
