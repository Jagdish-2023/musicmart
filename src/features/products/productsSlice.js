import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

function getAuthHeaders() {
  const token = localStorage.getItem("musicmartToken");
  const headers = {
    "Content-Type": "application/json",
  };

  if (!token) {
    return headers;
  }

  headers.Authorization = `Bearer ${token}`;
  return headers;
}

function removeStorageToken() {
  localStorage.removeItem("musicmartToken");
}

export const registerNewUser = createAsyncThunk(
  "auth/signup",
  async (userInfo) => {
    try {
      const response = await axios.post(
        "https://musicmart-backend.vercel.app/auth/register",
        userInfo
      );

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/signin",
  async (credentials) => {
    try {
      const response = await axios.post(
        "https://musicmart-backend.vercel.app/auth/login",
        credentials
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const fetchProductsAsync = createAsyncThunk(
  "products/fetch",
  async () => {
    try {
      const response = await axios.get(
        "https://musicmart-backend.vercel.app/products"
      );
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        throw new Error("401");
      }

      throw new Error("Failed to get Products");
    }
  }
);

export const updateFavouriteItem = createAsyncThunk(
  "product/favourite",
  async (productId) => {
    try {
      const response = await axios.post(
        `https://musicmart-backend.vercel.app/product/favourite/${productId}`,
        {},
        { headers: getAuthHeaders() }
      );
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        throw new Error("401");
      }

      throw new Error("Failed to add in Wishlist");
    }
  }
);

export const fetchFavouriteItems = createAsyncThunk(
  "products/favourite",
  async () => {
    try {
      const response = await axios.get(
        "https://musicmart-backend.vercel.app/favouriteItems",
        {
          headers: getAuthHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        throw new Error("401");
      }

      throw new Error("Failed to get Wishlist");
    }
  }
);

export const updateCartList = createAsyncThunk(
  "product/cart",
  async ({ productId, isInCart }) => {
    try {
      const response = await axios.post(
        `https://musicmart-backend.vercel.app/product/cart/${productId}`,
        { isInCart },
        { headers: getAuthHeaders() }
      );
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        throw new Error("401");
      }

      throw new Error("Failed to update Cart");
    }
  }
);

export const fetchCartItems = createAsyncThunk("products/cart", async () => {
  try {
    const response = await axios.get(
      "https://musicmart-backend.vercel.app/cartItems",
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error("401");
    }

    throw new Error("Failed to get Cart items");
  }
});

export const fetchProductDetails = createAsyncThunk(
  "product/fetch",
  async (productId) => {
    try {
      const response = await axios.get(
        `https://musicmart-backend.vercel.app/products/${productId}`
      );
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        throw new Error("401");
      }

      throw new Error("Failed to get Product details");
    }
  }
);

export const updateCartQuantity = createAsyncThunk(
  "product/cartQuantity",
  async ({ productId, cartQuantity }) => {
    try {
      const response = await axios.post(
        "https://musicmart-backend.vercel.app/product/cart_quantity",
        { productId, cartQuantity },
        { headers: getAuthHeaders() }
      );
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        throw new Error("401");
      }

      throw new Error("Failed to update Cart");
    }
  }
);

export const fetchShippingAddresses = createAsyncThunk(
  "addresses/fetch",
  async () => {
    try {
      const response = await axios.get(
        "https://musicmart-backend.vercel.app/shipping_addresses",
        { headers: getAuthHeaders() }
      );

      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        throw new Error("401");
      }

      throw new Error("Failed to get Addresses");
    }
  }
);

export const addNewAddress = createAsyncThunk(
  "address/add-new",
  async (address) => {
    try {
      const response = await axios.post(
        "https://musicmart-backend.vercel.app/add_ship_address",
        address,
        { headers: getAuthHeaders() }
      );

      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        throw new Error("401");
      }

      throw new Error("Failed to Add new Address");
    }
  }
);

export const updateDeliveryAddress = createAsyncThunk(
  "address/update",
  async (updatedAddress) => {
    try {
      const response = await axios.post(
        "https://musicmart-backend.vercel.app/update_address_deliver",
        updatedAddress,
        { headers: getAuthHeaders() }
      );
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        throw new Error("401");
      }

      throw new Error("Failed to update Address");
    }
  }
);

export const updateAddressDetails = createAsyncThunk(
  "update/address-details",
  async ({ dataToUpdate, addressId }) => {
    try {
      const response = await axios.post(
        "https://musicmart-backend.vercel.app/update_address_details",
        { dataToUpdate, addressId },
        { headers: getAuthHeaders() }
      );
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        throw new Error("401");
      }

      throw new Error("Failed to update Address");
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "address/delete",
  async (addressId) => {
    try {
      const response = await axios.delete(
        `https://musicmart-backend.vercel.app/delete_address/${addressId}`,
        { headers: getAuthHeaders() }
      );
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        throw new Error("401");
      }

      throw new Error("Failed to Delete Address");
    }
  }
);

export const fetchUserProfile = createAsyncThunk("profile/fetch", async () => {
  try {
    const response = await axios.get(
      "https://musicmart-backend.vercel.app/user_profile_info",
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error("401");
    }

    throw new Error("Failed to get Profile");
  }
});

export const updateUserProfile = createAsyncThunk(
  "profile/update",
  async (data) => {
    const { profileId, dataToUpdate } = data;
    try {
      const response = await axios.post(
        "https://musicmart-backend.vercel.app/update_user_profile",
        { profileId, dataToUpdate },
        { headers: getAuthHeaders() }
      );
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        throw new Error("401");
      }

      throw new Error("Failed to update Profile");
    }
  }
);

export const fetchAllOrders = createAsyncThunk("orders/fetch", async () => {
  try {
    const response = await axios.get(
      "https://musicmart-backend.vercel.app/order_items",
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error("401");
    }

    throw new Error("Failed to fetch Ordered items");
  }
});

export const addCartItemsToOrders = createAsyncThunk(
  "products/ordered",
  async ({ orderedItems, deliveryAddress }) => {
    try {
      const response = await axios.post(
        "https://musicmart-backend.vercel.app/move_cart_to_order",
        { orderedItems, deliveryAddress },
        { headers: getAuthHeaders() }
      );
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        throw new Error("401");
      }

      throw new Error("Failed to place Order");
    }
  }
);

export const fetchOrderDetails = createAsyncThunk(
  "order-details/fetch",
  async (orderId) => {
    try {
      const response = await axios.get(
        `https://musicmart-backend.vercel.app/order-details/${orderId}`,
        { headers: getAuthHeaders() }
      );
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        throw new Error("401");
      }

      throw new Error("Failed to get Order details");
    }
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    storageToken: localStorage.getItem("musicmartToken"),
    products: [],
    cartItems: [],
    favouriteItems: [],
    shipAddresses: [],
    allOrders: [],
    productDetails: null,
    profileInfo: null,
    orderDetails: null,
    searchInputText: "",
    isRegistered: false,
    status: "idle",
    error: null,
  },
  reducers: {
    saveSearchInput: (state, action) => {
      state.searchInputText = action.payload.toLowerCase();
    },
    toggleSignup: (state) => {
      state.isRegistered = false;
    },
    handleLogout: (state) => {
      localStorage.removeItem("musicmartToken");
      state.storageToken = null;
      state.favouriteItems = [];
      state.cartItems = [];
      state.shipAddresses = [];
      state.allOrders = [];
      state.profileInfo = null;
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerNewUser.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(registerNewUser.fulfilled, (state) => {
      state.status = "success";
      state.error = null;
      state.isRegistered = true;
    });
    builder.addCase(registerNewUser.rejected, (state) => {
      state.status = "error";
      state.error = "Failed to create your account";
    });

    builder.addCase(loginUser.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.status = "success";
      state.error = null;
      state.storageToken = action.payload.token;
      localStorage.setItem("musicmartToken", action.payload.token);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    //products
    builder.addCase(fetchProductsAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      state.products = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchProductsAsync.rejected, (state, action) => {
      state.status = "error";
      if (action.error.message === "401") {
        removeStorageToken();
        state.storageToken = null;
        state.error = "Unauthorized";
      } else {
        state.error = action.error.message;
      }
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
      if (action.error.message === "401") {
        removeStorageToken();
        state.storageToken = null;
        state.error = "Unauthorized";
      } else {
        state.error = action.error.message;
      }
    });

    builder.addCase(updateFavouriteItem.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateFavouriteItem.fulfilled, (state, action) => {
      const { savedFavouriteItem, removedFavouriteItem } = action.payload;

      if (savedFavouriteItem) {
        state.favouriteItems.push(savedFavouriteItem);
      }

      if (removedFavouriteItem) {
        state.favouriteItems = state.favouriteItems.filter(
          (item) => item.item._id !== removedFavouriteItem.item
        );
      }

      state.status = "success";
    });
    builder.addCase(updateFavouriteItem.rejected, (state, action) => {
      state.status = "error";
      if (action.error.message === "401") {
        removeStorageToken();
        state.storageToken = null;
        state.error = "Unauthorized";
      } else {
        state.error = action.error.message;
      }
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
      if (action.error.message === "401") {
        removeStorageToken();
        state.storageToken = null;
        state.error = "Unauthorized";
      } else {
        state.error = action.error.message;
      }
    });

    builder.addCase(updateCartList.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateCartList.fulfilled, (state, action) => {
      const { savedCartItem, removedCartItem } = action.payload;

      if (savedCartItem) {
        state.cartItems.push(savedCartItem);
      }

      if (removedCartItem) {
        state.cartItems = state.cartItems.filter(
          (item) => item.item._id !== removedCartItem.item
        );
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
      if (action.error.message === "401") {
        removeStorageToken();
        state.storageToken = null;
        state.error = "Unauthorized";
      } else {
        state.error = action.error.message;
      }
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
      if (action.error.message === "401") {
        removeStorageToken();
        state.storageToken = null;
        state.error = "Unauthorized";
      } else {
        state.error = action.error.message;
      }
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
      if (action.error.message === "401") {
        removeStorageToken();
        state.storageToken = null;
        state.error = "Unauthorized";
      } else {
        state.error = action.error.message;
      }
    });

    builder.addCase(addNewAddress.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addNewAddress.fulfilled, (state, action) => {
      state.status = "success";
      const { savedAddress, updatedAddress } = action.payload;
      if (savedAddress) {
        state.shipAddresses.push(savedAddress);

        return;
      }
      const addressToUpdate = state.shipAddresses.find(
        (address) => address._id === updatedAddress._id
      );
      if (addressToUpdate) {
        addressToUpdate.isDeliver = updatedAddress.isDeliver;
      }
    });
    builder.addCase(addNewAddress.rejected, (state, action) => {
      state.status = "error";
      if (action.error.message === "401") {
        removeStorageToken();
        state.storageToken = null;
        state.error = "Unauthorized";
      } else {
        state.error = action.error.message;
      }
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
      if (action.error.message === "401") {
        removeStorageToken();
        state.storageToken = null;
        state.error = "Unauthorized";
      } else {
        state.error = action.error.message;
      }
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
      if (action.error.message === "401") {
        removeStorageToken();
        state.storageToken = null;
        state.error = "Unauthorized";
      } else {
        state.error = action.error.message;
      }
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
      if (action.error.message === "401") {
        removeStorageToken();
        state.storageToken = null;
        state.error = "Unauthorized";
      } else {
        state.error = action.error.message;
      }
    });

    //profile
    builder.addCase(fetchUserProfile.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.profileInfo = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchUserProfile.rejected, (state, action) => {
      state.status = "error";
      if (action.error.message === "401") {
        removeStorageToken();
        state.storageToken = null;
        state.error = "Unauthorized";
      } else {
        state.error = action.error.message;
      }
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
      if (action.error.message === "401") {
        removeStorageToken();
        state.storageToken = null;
        state.error = "Unauthorized";
      } else {
        state.error = action.error.message;
      }
    });

    builder.addCase(addCartItemsToOrders.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addCartItemsToOrders.fulfilled, (state, action) => {
      state.status = "success";
    });
    builder.addCase(addCartItemsToOrders.rejected, (state, action) => {
      state.status = "error";
      if (action.error.message === "401") {
        removeStorageToken();
        state.storageToken = null;
        state.error = "Unauthorized";
      } else {
        state.error = action.error.message;
      }
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
      if (action.error.message === "401") {
        removeStorageToken();
        state.storageToken = null;
        state.error = "Unauthorized";
      } else {
        state.error = action.error.message;
      }
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
      if (action.error.message === "401") {
        removeStorageToken();
        state.storageToken = null;
        state.error = "Unauthorized";
      } else {
        state.error = action.error.message;
      }
    });
  },
});

export const { saveSearchInput, toggleSignup, handleLogout } =
  productsSlice.actions;

export default productsSlice.reducer;
